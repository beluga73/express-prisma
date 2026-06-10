import type { User } from "@/types/schema";
import { makeAutoObservable, runInAction } from "mobx";
import { api } from "@/services/api";
import { RequestState } from "./RequestState";

export class AuthStore {
  user: User | null = null;
  accessToken: string | null = null;
  refreshState = new RequestState();
  meState = new RequestState();

  constructor() {
    makeAutoObservable(this);
  }

  isAuthenticated() {
    return this.accessToken !== null;
  }

  setToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async apiRefreshSession() {
    const { data, error } = await api.POST("/auth/refresh", {
      credentials: "include",
    });

    if (error) return error;

    runInAction(() => {
      this.accessToken = data.accessToken;
      this.user = data.user;
    });
  }

  refreshSession() {
    return this.refreshState.run(() => this.apiRefreshSession());
  }

  private async apiFetchUser() {
    const { data, error } = await api.GET("/auth/me", {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    if (error) return error;

    runInAction(() => (this.user = data));
  }

  fetchUser() {
    return this.meState.run(() => this.apiFetchUser());
  }
}
