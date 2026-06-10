import type { paths, components } from "./api";

// GET /tasks
export type GetTasksResponse =
  paths["/tasks"]["get"]["responses"]["200"]["content"]["application/json"];

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

// PATCH /tasks/{id}/move - Move
export type MoveTaskRequest = Exclude<
  paths["/tasks/{id}/move"]["patch"]["requestBody"],
  undefined
>["content"]["application/json"];
export type MoveTaskResponse = Exclude<
  paths["/tasks/{id}/move"]["patch"]["responses"]["200"],
  undefined
>["content"]["application/json"];

// POST /auth/sign-up
export type SignUpRequest = Exclude<
  paths["/auth/sign-up"]["post"]["requestBody"],
  undefined
>["content"]["application/json"];
export type SignUpResponse = Exclude<
  paths["/auth/sign-up"]["post"]["responses"]["201"],
  undefined
>["content"]["application/json"];

// GET /auth/me
export type User =
  paths["/auth/me"]["get"]["responses"]["200"]["content"]["application/json"];

// POST /auth/refresh
export type RefreshResponse =
  paths["/auth/refresh"]["post"]["responses"]["200"]["content"]["application/json"];

// Component schemas
export type Task = components["schemas"]["Task"];

// DELETE /tasks/{id}
export type DeleteTaskRequest = Pick<Task, "id" | "columnId">;
export type Column = GetTasksResponse[number];

// Params
export type TaskId = paths["/tasks/{id}"]["patch"]["parameters"]["path"]["id"];

// Errors
export type ApiGenericError =
  paths["/tasks"]["get"]["responses"]["500"]["content"]["application/json"];
export type ApiValidationError =
  paths["/tasks"]["post"]["responses"]["400"]["content"]["application/json"];
export type ApiError = ApiGenericError | ApiValidationError;
