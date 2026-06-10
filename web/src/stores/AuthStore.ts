import type { SignInRequest, SignUpRequest, User } from "@/types/schema";
import { makeAutoObservable, reaction, runInAction } from "mobx";
import { api, authToken } from "@/services/api";
import { RequestState } from "./RequestState";

export class AuthStore {
  user: User | null = null;
  accessToken: string | null = null;
  initialized = false;
  signUpState = new RequestState();
  signInState = new RequestState();
  refreshState = new RequestState();
  meState = new RequestState();
  logoutState = new RequestState();

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => this.accessToken,
      (accessToken) => (authToken.current = accessToken),
      { fireImmediately: true },
    );
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

  async refreshSession() {
    await this.refreshState.run(() => this.apiRefreshSession());
    runInAction(() => (this.initialized = true));
  }

  private async apiFetchUser() {
    const { data, error } = await api.GET("/auth/me");

    if (error) return error;

    runInAction(() => (this.user = data));
  }

  fetchUser() {
    return this.meState.run(() => this.apiFetchUser());
  }

  private async apiSignUp(signUpData: SignUpRequest) {
    const { data, error } = await api.POST("/auth/sign-up", {
      body: signUpData,
      credentials: "include",
    });

    if (error) return error;

    runInAction(() => {
      this.accessToken = data.accessToken;
      this.user = data.user;
    });
  }

  signUp(signUpData: SignUpRequest) {
    return this.signUpState.run(() => this.apiSignUp(signUpData));
  }

  private async apiSignIn(signInData: SignInRequest) {
    const { data, error } = await api.POST("/auth/sign-in", {
      body: signInData,
      credentials: "include",
    });

    if (error) return error;

    runInAction(() => {
      this.accessToken = data.accessToken;
      this.user = data.user;
    });
  }

  signIn(signInData: SignInRequest) {
    return this.signInState.run(() => this.apiSignIn(signInData));
  }

  private async apiLogout() {
    const { error } = await api.POST("/auth/logout", {
      credentials: "include",
    });

    if (error) return error;

    runInAction(() => {
      this.accessToken = null;
      this.user = null;
    });
  }

  logout() {
    return this.logoutState.run(() => this.apiLogout());
  }
}
