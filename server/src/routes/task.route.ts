import { Router } from "express";
import { taskService } from "../services/task.service.js";
import { createTaskSchema } from "../schemas/task.schema.js";
import { idParamSchema } from "../schemas/common.schema.js";

const router = Router();

router.get("/", async (req, res) => {
  const allTasks = await taskService.getAll();
  res.json(allTasks);
});

// I think it's useless & can possible be removed
router.get("/:id", async (req, res) => {
  const { id } = idParamSchema.parse(req.params);
  const task = await taskService.getById(id);
  res.json(task);
});

router.post("/", async (req, res) => {
  const data = createTaskSchema.parse(req.body);
  const newTask = await taskService.create(data);
  res.status(201).json(newTask);
});

export { router };
