import { action, observable, runInAction } from "mobx";
import type { Task } from "../types";

export class TasksStore {
  @observable accessor data: Task[] = [];
  @observable accessor isLoading = false;
  @observable accessor error: Error | null = null;

  constructor() {}

  @action.bound setFetchResults(data: Task[] | null, error: Error | null) {
    if (data) this.data = data;
    this.isLoading = false;
    this.error = error;
  }

  @action.bound async fetchTasks() {
    this.isLoading = true;
    this.error = null;

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data = await res.json();
      this.setFetchResults(data, null);
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown Error");
      this.setFetchResults(null, error);
    }
  }

  async addTask(title: string) {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      runInAction(() => (this.data = data));
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown Error");
      runInAction(() => (this.error = error));
    }
  }
}
