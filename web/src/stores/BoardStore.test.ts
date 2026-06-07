import { api } from "@/services/api";
import { BoardStore } from "./BoardStore";

vi.mock("@/services/api", () => {
  return {
    api: {
      GET: vi.fn(),
      POST: vi.fn(),
      PATCH: vi.fn(),
      DELETE: vi.fn(),
    },
  };
});

const createMockColumn = (overrides = {}) => ({
  id: 1,
  title: "Column",
  position: 0,
  tasks: [],
  ...overrides,
});

const createMockTodo = (overrides = {}) => ({
  id: 1,
  title: "Todo",
  position: "0|i00007:",
  columnId: 1,
  ...overrides,
});

describe("BoardStore", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all tasks", async () => {
    const boardStore = new BoardStore();

    const mockColumns = [createMockColumn()];

    vi.mocked(api.GET).mockResolvedValue({
      data: mockColumns,
      response: new Response(),
    });

    await boardStore.getAllTasks();

    expect(boardStore.tasks).toEqual(mockColumns);
  });

  it("should create a task", async () => {
    const boardStore = new BoardStore();

    const mockColumns = [createMockColumn()];
    boardStore.tasks = mockColumns;

    const mockTask = createMockTodo();

    vi.mocked(api.POST).mockResolvedValue({
      data: mockTask,
      response: new Response(),
    });

    await boardStore.createTask(mockTask);

    expect(boardStore.tasks[0].tasks[0]).toEqual(mockTask);
  });

  it("should update a task", async () => {
    const boardStore = new BoardStore();

    const mockTask = createMockTodo();
    const mockColumns = [createMockColumn({ tasks: [mockTask] })];
    boardStore.tasks = mockColumns;

    const newTodo = createMockTodo({ title: "new title" });

    vi.mocked(api.PATCH).mockResolvedValue({
      data: newTodo,
      response: new Response(),
    });

    await boardStore.updateTask(1, newTodo);

    expect(boardStore.tasks[0].tasks[0]).toEqual(newTodo);
  });

  it("should roll back a task update if the request fails", async () => {
    const boardStore = new BoardStore();

    const mockTask = createMockTodo({ title: "original title" });
    const mockColumns = [createMockColumn({ tasks: [mockTask] })];
    boardStore.tasks = mockColumns;

    const mockError = { code: "VALIDATION_ERROR", message: "Invalid title" };
    vi.mocked(api.PATCH).mockResolvedValue({
      error: mockError,
      response: new Response(),
    });

    await boardStore.updateTask(1, { title: "new title" });

    expect(boardStore.tasks[0].tasks[0].title).toBe("original title");
    expect(boardStore.updateState.error).toEqual(mockError);
  });

  it("should reorder a task within the same column", async () => {
    const boardStore = new BoardStore();

    const tasks = [
      createMockTodo({ id: 1, position: "a", columnId: 1 }),
      createMockTodo({ id: 2, position: "b", columnId: 1 }),
      createMockTodo({ id: 3, position: "c", columnId: 1 }),
    ];
    boardStore.tasks = [createMockColumn({ tasks })];

    const movedTodo = createMockTodo({ id: 1, position: "d", columnId: 1 });
    vi.mocked(api.PATCH).mockResolvedValue({
      data: movedTodo,
      response: new Response(),
    });

    await boardStore.moveTask(1, { columnId: 1, targetIndex: 2 });

    const column = boardStore.tasks[0];
    expect(column.tasks.map((t) => t.id)).toEqual([2, 3, 1]);
    expect(column.tasks[2].position).toBe("d");
    expect(api.PATCH).toHaveBeenCalledWith("/tasks/{id}/move", {
      params: { path: { id: 1 } },
      body: { columnId: 1, prevId: 3, nextId: undefined },
    });
  });

  it("should move a task into another column", async () => {
    const boardStore = new BoardStore();

    const sourceTasks = [
      createMockTodo({ id: 1, position: "a", columnId: 1 }),
      createMockTodo({ id: 2, position: "b", columnId: 1 }),
    ];
    const destTasks = [createMockTodo({ id: 4, position: "a", columnId: 2 })];
    boardStore.tasks = [
      createMockColumn({ id: 1, tasks: sourceTasks }),
      createMockColumn({ id: 2, tasks: destTasks }),
    ];

    const movedTodo = createMockTodo({ id: 1, position: "0", columnId: 2 });
    vi.mocked(api.PATCH).mockResolvedValue({
      data: movedTodo,
      response: new Response(),
    });

    await boardStore.moveTask(1, { columnId: 2, targetIndex: 0 });

    const [sourceColumn, destColumn] = boardStore.tasks;
    expect(sourceColumn.tasks.map((t) => t.id)).toEqual([2]);
    expect(destColumn.tasks.map((t) => t.id)).toEqual([1, 4]);
    expect(destColumn.tasks[0].columnId).toBe(2);
    expect(api.PATCH).toHaveBeenCalledWith("/tasks/{id}/move", {
      params: { path: { id: 1 } },
      body: { columnId: 2, prevId: undefined, nextId: 4 },
    });
  });

  it("should not call the API when a task is dropped back in its original spot", async () => {
    const boardStore = new BoardStore();

    const tasks = [
      createMockTodo({ id: 1, position: "a", columnId: 1 }),
      createMockTodo({ id: 2, position: "b", columnId: 1 }),
    ];
    boardStore.tasks = [createMockColumn({ id: 1, tasks })];

    await boardStore.moveTask(1, { columnId: 1, targetIndex: 0 });

    expect(api.PATCH).not.toHaveBeenCalled();
    expect(boardStore.tasks[0].tasks.map((t) => t.id)).toEqual([1, 2]);
  });

  it("should roll back a move if the request fails", async () => {
    const boardStore = new BoardStore();

    const sourceTasks = [
      createMockTodo({ id: 1, position: "a", columnId: 1 }),
      createMockTodo({ id: 2, position: "b", columnId: 1 }),
    ];
    const destTasks = [createMockTodo({ id: 4, position: "a", columnId: 2 })];
    boardStore.tasks = [
      createMockColumn({ id: 1, tasks: sourceTasks }),
      createMockColumn({ id: 2, tasks: destTasks }),
    ];

    const mockError = { code: "VALIDATION_ERROR", message: "Invalid move" };
    vi.mocked(api.PATCH).mockResolvedValue({
      error: mockError,
      response: new Response(),
    });

    await boardStore.moveTask(1, { columnId: 2, targetIndex: 0 });

    const [sourceColumn, destColumn] = boardStore.tasks;
    expect(sourceColumn.tasks.map((t) => t.id)).toEqual([1, 2]);
    expect(destColumn.tasks.map((t) => t.id)).toEqual([4]);
    expect(sourceColumn.tasks[0].columnId).toBe(1);
    expect(boardStore.moveState.error).toEqual(mockError);
  });

  it("should delete a task", async () => {
    const boardStore = new BoardStore();

    const mockTask = createMockTodo();
    const mockColumns = [createMockColumn({ tasks: [mockTask] })];
    boardStore.tasks = mockColumns;

    vi.mocked(api.POST).mockResolvedValue({
      data: mockTask,
      response: new Response(),
    });

    await boardStore.deleteTask(mockTask);

    expect(boardStore.tasks[0].tasks.length).toBe(0);
  });

  it("should rollback delete if request fails", async () => {
    const boardStore = new BoardStore();

    const mockTask = createMockTodo();
    const mockColumns = [createMockColumn({ tasks: [mockTask] })];
    boardStore.tasks = mockColumns;

    const mockError = {
      code: "NETWORK_ERROR",
      message: "Network connection failed",
    };

    vi.mocked(api.DELETE).mockResolvedValue({
      error: mockError,
      response: new Response(),
    });

    await boardStore.deleteTask(mockTask);

    expect(boardStore.tasks[0].tasks[0]).toEqual(mockTask);
  });
});
