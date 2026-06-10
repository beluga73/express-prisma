import { AuthStore } from "./AuthStore";
import { BoardStore } from "./BoardStore";

export class RootStore {
  authStore = new AuthStore();
  boardStore = new BoardStore();

  getStores() {
    return {
      authStore: this.authStore,
      boardStore: this.boardStore,
    };
  }
}
