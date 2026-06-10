import { AuthStore } from "./AuthStore";
import { BoardStore } from "./BoardStore";

export class RootStore {
  authStore = new AuthStore();
  BoardStore = new BoardStore();

  getStores() {
    return {
      authStore: this.authStore,
      BoardStore: this.BoardStore,
    };
  }
}
