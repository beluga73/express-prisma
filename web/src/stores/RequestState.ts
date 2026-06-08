import { makeAutoObservable, runInAction } from "mobx";
import { ERRORS, handleError } from "@/errors";
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
        handleError(error);
      }
    } catch {
      const error: ApiError = { code: "NETWORK_ERROR", message: ERRORS.NETWORK_ERROR.message };
      runInAction(() => (this.error = error));
      handleError(error);
    } finally {
      runInAction(() => (this.loading = false));
    }
  }
}
