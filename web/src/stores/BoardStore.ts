import { makeAutoObservable, runInAction } from "mobx";
import { RequestState } from "./RequestState";
import { api } from "@/services/api";
import type {
  CreateTaskRequest,
  GetTasksResponse,
  TaskId,
  UpdateTaskRequest,
} from "@/types/schema";

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

  // completely rewrite it, we don't generate postion on frontendc, we send nextId and previd and receive position frontend backend
  private async apiUpdateTask(id: TaskId, task: UpdateTaskRequest) {
    const sourceColumn = this.tasks.find((col) =>
      col.tasks.some((t) => t.id === id),
    )!;
    const oldTask = sourceColumn.tasks.find((t) => t.id === id)!;

    const oldTaskCopy = { ...oldTask };
    const originalIndex = sourceColumn.tasks.indexOf(oldTask);

    const targetColumnId = task.columnId ?? oldTaskCopy.columnId;
    const targetIndex = task.position ?? originalIndex;

    const hasLayoutChanged =
      targetColumnId !== oldTaskCopy.columnId || targetIndex !== originalIndex;

    Object.assign(oldTask, task);

    if (hasLayoutChanged) {
      sourceColumn.tasks.splice(originalIndex, 1);
      const destColumn = this.tasks.find((col) => col.id === targetColumnId)!;
      destColumn.tasks.splice(targetIndex, 0, oldTask);
    }

    const { data, error } = await api.PATCH("/tasks/{id}", {
      params: { path: { id } },
      body: task,
    });

    if (error) {
      runInAction(() => {
        Object.assign(oldTask, oldTaskCopy);

        if (hasLayoutChanged) {
          const currentColumn = this.tasks.find(
            (col) => col.id === targetColumnId,
          )!;
          const currentIndex = currentColumn.tasks.indexOf(oldTask);
          currentColumn.tasks.splice(currentIndex, 1);

          sourceColumn.tasks.splice(originalIndex, 0, oldTask);
        }
      });
      return error;
    } else {
      runInAction(() => Object.assign(oldTask, data));
    }
  }
  async updateTask(id: TaskId, task: UpdateTaskRequest) {
    this.updateState.run(() => this.apiUpdateTask(id, task));
  }
}
