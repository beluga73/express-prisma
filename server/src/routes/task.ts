import { Router } from "express";

const tasks = [
  { id: 1, title: "Setup backend routes", status: "DONE" },
  { id: 2, title: "Connect MobX store", status: "IN_PROGRESS" },
  { id: 3, title: "Connect PostgreSQL via Prisma", status: "TODO" },
];

const router = Router();

router.get("/", (req, res) => {
  res.json(tasks);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const task = tasks.find((t) => t.id === Number(id));

  res.json(task);
});

router.post("/", (req, res) => {
  const { title } = req.body;

  if (title == null) {
    return res.status(400).send({ error: "please include title property" });
  }

  const lastTask = tasks.at(-1);
  const newId = lastTask ? lastTask.id + 1 : 1;
  const newTask = { id: newId, title, status: "TODO" };
  tasks.push(newTask);

  res.status(201).json(newTask);
});

export { router };
