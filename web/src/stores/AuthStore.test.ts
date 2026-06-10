import { api, authToken } from "@/services/api";
import { AuthStore } from "./AuthStore";

vi.mock("@/services/api", () => {
  return {
    api: {
      GET: vi.fn(),
      POST: vi.fn(),
    },
    authToken: { current: null as string | null },
  };
});

const createMockUser = (overrides = {}) => ({
  id: "user-1",
  name: "Jane Doe",
  email: "jane@example.com",
  ...overrides,
});

describe("AuthStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    authToken.current = null;
  });

  it("is not authenticated by default", () => {
    const authStore = new AuthStore();

    expect(authStore.isAuthenticated()).toBe(false);
    expect(authStore.user).toBeNull();
  });

  it("keeps authToken in sync with accessToken", () => {
    const authStore = new AuthStore();

    authStore.setToken("access-token");

    expect(authToken.current).toBe("access-token");
    expect(authStore.isAuthenticated()).toBe(true);
  });

  describe("signUp", () => {
    it("stores the user and access token on success", async () => {
      const authStore = new AuthStore();
      const mockUser = createMockUser();

      vi.mocked(api.POST).mockResolvedValue({
        data: { user: mockUser, accessToken: "access-token" },
        response: new Response(),
      });

      await authStore.signUp({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "Password123!",
      });

      expect(authStore.user).toEqual(mockUser);
      expect(authStore.accessToken).toBe("access-token");
      expect(authStore.isAuthenticated()).toBe(true);
      expect(authStore.signUpState.error).toBeNull();
    });

    it("sets the error and leaves the user signed out on failure", async () => {
      const authStore = new AuthStore();
      const mockError = {
        code: "EMAIL_ALREADY_EXISTS",
        message: "An account with this email already exists",
      };

      vi.mocked(api.POST).mockResolvedValue({
        error: mockError,
        response: new Response(),
      });

      await authStore.signUp({
        name: "Jane Doe",
        email: "jane@example.com",
        password: "Password123!",
      });

      expect(authStore.signUpState.error).toEqual(mockError);
      expect(authStore.user).toBeNull();
      expect(authStore.isAuthenticated()).toBe(false);
    });
  });

  describe("signIn", () => {
    it("stores the user and access token on success", async () => {
      const authStore = new AuthStore();
      const mockUser = createMockUser();

      vi.mocked(api.POST).mockResolvedValue({
        data: { user: mockUser, accessToken: "access-token" },
        response: new Response(),
      });

      await authStore.signIn({
        email: "jane@example.com",
        password: "Password123!",
      });

      expect(authStore.user).toEqual(mockUser);
      expect(authStore.accessToken).toBe("access-token");
      expect(authStore.isAuthenticated()).toBe(true);
    });

    it("sets the error and leaves the user signed out on failure", async () => {
      const authStore = new AuthStore();
      const mockError = {
        code: "INVALID_CREDENTIALS",
        message: "Invalid email or password",
      };

      vi.mocked(api.POST).mockResolvedValue({
        error: mockError,
        response: new Response(),
      });

      await authStore.signIn({
        email: "jane@example.com",
        password: "wrong-password",
      });

      expect(authStore.signInState.error).toEqual(mockError);
      expect(authStore.user).toBeNull();
      expect(authStore.isAuthenticated()).toBe(false);
    });
  });

  describe("refreshSession", () => {
    it("restores the session and marks the store as initialized on success", async () => {
      const authStore = new AuthStore();
      const mockUser = createMockUser();

      vi.mocked(api.POST).mockResolvedValue({
        data: { user: mockUser, accessToken: "access-token" },
        response: new Response(),
      });

      await authStore.refreshSession();

      expect(authStore.user).toEqual(mockUser);
      expect(authStore.accessToken).toBe("access-token");
      expect(authStore.isAuthenticated()).toBe(true);
      expect(authStore.initialized).toBe(true);
    });

    it("marks the store as initialized without authenticating when there's no session", async () => {
      const authStore = new AuthStore();
      const mockError = { code: "FORBIDDEN", message: "Access denied" };

      vi.mocked(api.POST).mockResolvedValue({
        error: mockError,
        response: new Response(),
      });

      await authStore.refreshSession();

      expect(authStore.initialized).toBe(true);
      expect(authStore.isAuthenticated()).toBe(false);
      expect(authStore.refreshState.error).toEqual(mockError);
    });
  });

  describe("fetchUser", () => {
    it("stores the user on success", async () => {
      const authStore = new AuthStore();
      const mockUser = createMockUser();

      vi.mocked(api.GET).mockResolvedValue({
        data: mockUser,
        response: new Response(),
      });

      await authStore.fetchUser();

      expect(authStore.user).toEqual(mockUser);
      expect(authStore.meState.error).toBeNull();
    });

    it("sets the error on failure", async () => {
      const authStore = new AuthStore();
      const mockError = { code: "UNAUTHORIZED", message: "Session expired" };

      vi.mocked(api.GET).mockResolvedValue({
        error: mockError,
        response: new Response(),
      });

      await authStore.fetchUser();

      expect(authStore.user).toBeNull();
      expect(authStore.meState.error).toEqual(mockError);
    });
  });

  describe("logout", () => {
    it("clears the user and access token on success", async () => {
      const authStore = new AuthStore();
      authStore.setToken("access-token");
      authStore.user = createMockUser();

      vi.mocked(api.POST).mockResolvedValue({
        data: undefined,
        response: new Response(),
      });

      await authStore.logout();

      expect(authStore.user).toBeNull();
      expect(authStore.accessToken).toBeNull();
      expect(authStore.isAuthenticated()).toBe(false);
      expect(authToken.current).toBeNull();
    });

    it("keeps the session intact on failure", async () => {
      const authStore = new AuthStore();
      const mockUser = createMockUser();
      authStore.setToken("access-token");
      authStore.user = mockUser;

      const mockError = {
        code: "NETWORK_ERROR",
        message: "Network connection failed",
      };
      vi.mocked(api.POST).mockResolvedValue({
        error: mockError,
        response: new Response(),
      });

      await authStore.logout();

      expect(authStore.user).toEqual(mockUser);
      expect(authStore.accessToken).toBe("access-token");
      expect(authStore.logoutState.error).toEqual(mockError);
    });
  });
});
