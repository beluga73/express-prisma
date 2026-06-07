import { RequestState } from "./RequestState";

describe("RequestState", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should successfuly change loading state", async () => {
    const requestState = new RequestState();
    requestState.run(() => new Promise((r) => setTimeout(r, 10)));

    expect(requestState.loading).toBe(true);

    await vi.advanceTimersByTimeAsync(10);

    expect(requestState.loading).toBe(false);
    expect(requestState.error).toBeNull();
  });

  it("should have error if api call returns error", async () => {
    const mockError = { code: "VALIDATION_ERROR", message: "Invalid title" };

    const requestState = new RequestState();
    await requestState.run(async () => mockError);

    expect(requestState.error).toEqual(mockError);
  });

  it("should have error NETWORK_ERROR if api call fails", async () => {
    const requestState = new RequestState();
    await requestState.run(async () => {
      throw new Error();
    });

    const netowrkError = {
      code: "NETWORK_ERROR",
      message: "Network connection failed",
    };
    expect(requestState.error).toEqual(netowrkError);
  });

  it("should have error empty if first api call failed and second api call succeeds", async () => {
    const requestState = new RequestState();
    const mockError = { code: "VALIDATION_ERROR", message: "Invalid title" };

    await requestState.run(async () => mockError);

    const promise = requestState.run(async () => {});

    expect(requestState.loading).toBe(true);
    expect(requestState.error).toBeNull();

    await promise;

    expect(requestState.loading).toBe(false);
    expect(requestState.error).toBeNull();
  });
});
