import { BoardStore } from "./BoardStore";

export class RootStore {
  BoardStore = new BoardStore();

  getStores() {
    return {
      BoardStore: this.BoardStore,
    };
  }
}
