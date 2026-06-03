import { Router } from "express";
import { taskService } from "../services/task.service.js";

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
  const { title } = req.body;

  if (!title) {
    return res.status(400).send({ error: "please include title property" });
  }

  const newTask = await taskService.create({ title });

  res.status(201).json(newTask);
});

export { router };
