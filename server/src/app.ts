import "@/lib/zod-openapi";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { taskRouter, authRouter } from "./routes";
import { requireAuth, errorHandler } from "./middlewares";
import swaggerUi from "swagger-ui-express";
import { getOpenApiDocumentation } from "./openapi";

const app = express();

app.use(cors());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());

const spec = getOpenApiDocumentation();
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec));
app.use("/api/docs.json", (req, res) => res.json(spec));
app.use("/api/auth", authRouter);

app.use(requireAuth);

app.use("/api/tasks", taskRouter);

app.use(errorHandler);

export { app };
