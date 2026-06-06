import { makeAutoObservable, runInAction } from "mobx";
import type { ApiError } from "@/types/schema";

export class RequestState {
  loading = false;
  error: ApiError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async run(asyncFn: () => Promise<ApiError | undefined>) {
    this.loading = true;
    this.error = null;

    try {
      const error = await asyncFn();
      if (error) {
        runInAction(() => (this.error = error));
      }
    } catch {
      runInAction(() => (this.error = { code: "NETWORK_ERROR", message: "Network connection failed" }));
    } finally {
      runInAction(() => (this.loading = false));
    }
  }
}
