import express from "express";
import cors from "cors";
import { taskRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRouter);

app.use(errorHandler);

export { app };
