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
  const allTasks = await taskService.getAll();
  res.json(allTasks);
});

router.post("/", async (req, res) => {
  const data = CreateTaskRequestSchema.parse(req.body);
  const newTask = await taskService.create(data);
  res.status(201).json(newTask);
});

router.patch("/:id", async (req, res) => {
  const { id } = TaskParamsSchema.parse(req.params);
  const data = UpdateTaskRequestSchema.parse(req.body);
  const task = await taskService.update(id, data);
  res.json(task);
});

router.patch("/:id/move", async (req, res) => {
  const { id } = TaskParamsSchema.parse(req.params);
  const data = MoveTaskRequestSchema.parse(req.body);
  const task = await taskService.move(id, data);
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  const { id } = TaskParamsSchema.parse(req.params);
  const task = await taskService.delete(id);
  res.json(task);
});

export { router };
