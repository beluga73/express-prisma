import { makeAutoObservable, runInAction } from "mobx";
import { RequestState } from "./RequestState";
import { api } from "@/services/api";
import type {
  CreateTaskRequest,
  GetTasksResponse,
  TaskId,
  UpdateTaskRequest,
} from "@/types/schema";

type TaskMove = {
  columnId: number;
  targetIndex: number;
};

export class BoardStore {
  tasks: GetTasksResponse = [];
  getAllState = new RequestState();
  createState = new RequestState();
  updateState = new RequestState();

  constructor() {
    makeAutoObservable(this);
  }

  private async apiGetAllTasks() {
    const { data, error } = await api.GET("/tasks");

    if (error) return error;

    runInAction(() => (this.tasks = data));
  }
  async getAllTasks() {
    this.getAllState.run(() => this.apiGetAllTasks());
  }

  private async apiCreateTask(task: CreateTaskRequest) {
    const { data, error } = await api.POST("/tasks", {
      body: task,
    });

    if (error) return error;

    runInAction(() => {
      const column = this.tasks.find((column) => column.id === data.columnId)!;
      column.tasks.push(data);
    });
  }
  async createTask(task: CreateTaskRequest) {
    this.createState.run(() => this.apiCreateTask(task));
  }

  private async apiUpdateTask(id: TaskId, task: UpdateTaskRequest) {
    const sourceColumn = this.tasks.find((col) =>
      col.tasks.some((t) => t.id === id),
    )!;
    const oldTask = sourceColumn.tasks.find((t) => t.id === id)!;
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
  async updateTask(id: TaskId, task: UpdateTaskRequest) {
    this.updateState.run(() => this.apiUpdateTask(id, task));
  }

  private async apiMoveTask(id: TaskId, move: TaskMove) {
    const sourceColumn = this.tasks.find((col) =>
      col.tasks.some((t) => t.id === id),
    )!;
    const destColumn = this.tasks.find((col) => col.id === move.columnId)!;
    const oldTask = sourceColumn.tasks.find((t) => t.id === id)!;

    const oldTaskCopy = { ...oldTask };
    const originalIndex = sourceColumn.tasks.indexOf(oldTask);

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
  async moveTask(id: TaskId, move: TaskMove) {
    this.updateState.run(() => this.apiMoveTask(id, move));
  }
}
