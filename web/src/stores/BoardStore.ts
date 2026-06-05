import { makeAutoObservable, runInAction } from "mobx";
import { RequestState } from "./RequestState";
import { api } from "@/services/api";
import type { GetTasksResponse } from "@/types/schema";

export class BoardStore {
  tasks: GetTasksResponse = [];
  tasksFetchState: RequestState = new RequestState();

  constructor() {
    makeAutoObservable(this);
  }

  async _fetchAllTasks() {
    const { data, error, response } = await api.GET("/tasks");

    if (!response.ok || !data) {
      const errorMsg = error?.message || "Failed to fetch tasks";
      throw new Error(errorMsg);
    }

    runInAction(() => (this.tasks = data));
  }

  async getAllTasks() {
    this.tasksFetchState.run(() => this._fetchAllTasks());
  }
}
