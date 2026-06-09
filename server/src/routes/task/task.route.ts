import { Router } from "express";
import { taskService } from "@/services/task.service";
import {
  TaskParamsSchema,
  CreateTaskRequestSchema,
  UpdateTaskRequestSchema,
  MoveTaskRequestSchema,
} from "@/schemas/task.schema";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const allTasks = await taskService.getAll(userId);
  res.json(allTasks);
});

router.post("/", async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const data = CreateTaskRequestSchema.parse(req.body);
  const newTask = await taskService.create(userId, data);
  res.status(201).json(newTask);
});

router.patch("/:id", async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const { id } = TaskParamsSchema.parse(req.params);
  const data = UpdateTaskRequestSchema.parse(req.body);
  const task = await taskService.update(id, data, userId);
  res.json(task);
});

router.patch("/:id/move", async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const { id } = TaskParamsSchema.parse(req.params);
  const data = MoveTaskRequestSchema.parse(req.body);
  const task = await taskService.move(id, data, userId);
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const { id } = TaskParamsSchema.parse(req.params);
  await taskService.delete(id, userId);
  res.status(204).send();
});

export { router };
