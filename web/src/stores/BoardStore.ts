import { makeAutoObservable, runInAction } from "mobx";
import { RequestState } from "./RequestState";
import { api } from "@/services/api";
import type {
  CreateTaskRequest,
  DeleteTaskRequest,
  GetTasksResponse,
  TaskId,
  UpdateTaskRequest,
} from "@/types/schema";

type TaskMove = {
  columnId: number;
  targetIndex: number;
};

export class BoardStore {
  columns: GetTasksResponse = [];
  getAllState = new RequestState();
  createState = new RequestState();
  updateState = new RequestState();
  moveState = new RequestState();
  deleteState = new RequestState();

  constructor() {
    makeAutoObservable(this);
  }

  private async apiGetAllTasks() {
    const { data, error } = await api.GET("/tasks");

    if (error) return error;

    runInAction(() => (this.columns = data));
  }
  getAllTasks() {
    return this.getAllState.run(() => this.apiGetAllTasks());
  }

  // Local board state can drift from the server (stale tab, concurrent
  // session, etc.). When that happens mid-action, refetch instead of
  // crashing on a missing column/task.
  private resync() {
    void this.getAllTasks();
  }

  private async apiCreateTask(task: CreateTaskRequest) {
    const { data, error } = await api.POST("/tasks", {
      body: task,
    });

    if (error) return error;

    runInAction(() => {
      const column = this.columns.find((column) => column.id === data.columnId);
      if (!column) {
        this.resync();
        return;
      }
      column.tasks.push(data);
    });
  }
  createTask(task: CreateTaskRequest) {
    return this.createState.run(() => this.apiCreateTask(task));
  }

  private async apiUpdateTask(id: TaskId, task: UpdateTaskRequest) {
    const sourceColumn = this.columns.find((col) =>
      col.tasks.some((t) => t.id === id),
    );
    const oldTask = sourceColumn?.tasks.find((t) => t.id === id);
    if (!sourceColumn || !oldTask) {
      this.resync();
      return;
    }
    const oldTaskCopy = { ...oldTask };

    Object.assign(oldTask, task);

    const { data, error } = await api.PATCH("/tasks/{id}", {
      params: { path: { id } },
      body: task,
    });

    if (error) {
      runInAction(() => Object.assign(oldTask, oldTaskCopy));
      return error;
    }

    runInAction(() => Object.assign(oldTask, data));
  }
  updateTask(id: TaskId, task: UpdateTaskRequest) {
    return this.updateState.run(() => this.apiUpdateTask(id, task));
  }

  private async apiMoveTask(id: TaskId, move: TaskMove) {
    const sourceColumn = this.columns.find((col) =>
      col.tasks.some((t) => t.id === id),
    );
    const destColumn = this.columns.find((col) => col.id === move.columnId);
    if (!sourceColumn || !destColumn) {
      this.resync();
      return;
    }
    const originalIndex = sourceColumn.tasks.findIndex((t) => t.id === id);
    const oldTask = sourceColumn.tasks[originalIndex];
    const oldTaskCopy = { ...oldTask };

    const hasLayoutChanged =
      destColumn.id !== sourceColumn.id || move.targetIndex !== originalIndex;
    if (!hasLayoutChanged) return;

    // dnd-kit reports targetIndex against the destination list with the
    // dragged task already removed from its old slot, so we mirror that here
    const destTasks = destColumn.tasks.filter((t) => t.id !== id);
    const prevTask = destTasks[move.targetIndex - 1];
    const nextTask = destTasks[move.targetIndex];

    sourceColumn.tasks.splice(originalIndex, 1);
    Object.assign(oldTask, { columnId: destColumn.id });
    destColumn.tasks.splice(move.targetIndex, 0, oldTask);

    const { data, error } = await api.PATCH("/tasks/{id}/move", {
      params: { path: { id } },
      body: {
        columnId: move.columnId,
        prevId: prevTask?.id,
        nextId: nextTask?.id,
      },
    });

    if (error) {
      runInAction(() => {
        Object.assign(oldTask, oldTaskCopy);

        const currentIndex = destColumn.tasks.indexOf(oldTask);
        destColumn.tasks.splice(currentIndex, 1);
        sourceColumn.tasks.splice(originalIndex, 0, oldTask);
      });
      return error;
    }

    runInAction(() => Object.assign(oldTask, data));
  }
  moveTask(id: TaskId, move: TaskMove) {
    return this.moveState.run(() => this.apiMoveTask(id, move));
  }

  private async apiDeleteTask(task: DeleteTaskRequest) {
    const sourceColumn = this.columns.find((col) => col.id === task.columnId);
    const originalIndex =
      sourceColumn?.tasks.findIndex((t) => t.id === task.id) ?? -1;
    if (!sourceColumn || originalIndex === -1) {
      this.resync();
      return;
    }
    const [removedTask] = sourceColumn.tasks.splice(originalIndex, 1);

    const { error } = await api.DELETE("/tasks/{id}", {
      params: { path: { id: task.id } },
    });

    if (error) {
      runInAction(() => {
        sourceColumn.tasks.splice(originalIndex, 0, removedTask);
      });
      return error;
    }
  }

  deleteTask(task: DeleteTaskRequest) {
    return this.deleteState.run(() => this.apiDeleteTask(task));
  }
}
