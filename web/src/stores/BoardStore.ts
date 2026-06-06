import { makeAutoObservable, runInAction } from "mobx";
import { RequestState } from "./RequestState";
import { api } from "@/services/api";
import type {
  CreateTaskRequest,
  GetTasksResponse,
  TaskId,
} from "@/types/schema";

export class BoardStore {
  tasks: GetTasksResponse = [];
  getAllState = new RequestState();
  createState = new RequestState();

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

  async apiCreateTask(task: CreateTaskRequest) {
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
}
