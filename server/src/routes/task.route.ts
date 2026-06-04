import { Router } from "express";
import { taskService } from "../services/task.service.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get("/", async (req, res) => {
  const allTasks = await taskService.getAll();
  res.json(allTasks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send();

  const task = await taskService.getById(Number(id));

  res.json(task);
});

router.post("/", async (req, res) => {
  const { success, data, error } = createTaskSchema.safeParse(req.body);

  if (!success) {
    console.log(error);
    return res.status(400).send({ errors: error.issues });
  }

  const newTask = await taskService.create({ ...data });

  res.status(201).json({ ...newTask });
});

export { router };
