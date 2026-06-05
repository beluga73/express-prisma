import { makeAutoObservable, runInAction } from "mobx";

export class RequestState {
  loading = false;
  error: string | null = "";

  constructor() {
    makeAutoObservable(this);
  }

  async run(asyncFn: () => Promise<void>) {
    this.loading = true;
    this.error = null;

    try {
      await asyncFn();
    } catch (err) {
      runInAction(() => {
        this.error = err instanceof Error ? err.message : "An error occurred";
      });
    } finally {
      runInAction(() => (this.loading = false));
    }
  }
}
