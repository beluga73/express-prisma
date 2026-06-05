import { Router } from "express";
import { taskService } from "@/services/task.service";
import { createTaskSchema } from "@/schemas/task.schema";

const router = Router();

router.get("/", async (req, res) => {
  const allTasks = await taskService.getAll();
  res.json(allTasks);
});

router.post("/", async (req, res) => {
  const data = createTaskSchema.parse(req.body);
  const newTask = await taskService.create(data);
  res.status(201).json(newTask);
});

export { router };
