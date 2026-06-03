import express from "express";
import cors from "cors";
import { taskRouter } from "./routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);

export { app };
