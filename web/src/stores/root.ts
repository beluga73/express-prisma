import { TasksStore } from "./tasks";

export class RootStore {
  tasksStore: TasksStore;

  constructor() {
    this.tasksStore = new TasksStore();
  }

  getStores() {
    return {
      tasksStore: this.tasksStore,
    };
  }
}
