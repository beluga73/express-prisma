import { action, observable } from "mobx";
import type { Task } from "../types";

export class TasksStore {
  @observable accessor data: Task[] = [];
  @observable accessor isLoading = false;
  @observable accessor error: Error | null = null;

  constructor() {}

  @action setFetchResults(data: Task[] | null, error: Error | null) {
    if (data) this.data = data;
    this.isLoading = false;
    this.error = error;
  }

  @action async fetchTasks() {
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

  @action addTask(title: string) {
    // implement
  }
}
