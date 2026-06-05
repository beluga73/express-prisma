import type { paths, components } from "./api";

// GET /tasks
export type GetTasksResponse = paths["/tasks"]["get"]["responses"]["200"]["content"]["application/json"];

// POST /tasks - Create
export type CreateTaskRequest = Exclude<
  paths["/tasks"]["post"]["requestBody"],
  undefined
>["content"]["application/json"];
export type CreateTaskResponse = Exclude<
  paths["/tasks"]["post"]["responses"]["201"],
  undefined
>["content"]["application/json"];

// PATCH /tasks/{id} - Update
export type UpdateTaskRequest = Exclude<
  paths["/tasks/{id}"]["patch"]["requestBody"],
  undefined
>["content"]["application/json"];
export type UpdateTaskResponse = Exclude<
  paths["/tasks/{id}"]["patch"]["responses"]["200"],
  undefined
>["content"]["application/json"];

// DELETE /tasks/{id}
export type DeleteTaskResponse = Exclude<
  paths["/tasks/{id}"]["delete"]["responses"]["200"],
  undefined
>["content"]["application/json"];

// Component schemas
export type Task = components["schemas"]["Task"];
