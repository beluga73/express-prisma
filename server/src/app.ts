import "@/lib/zod.js";
import express from "express";
import cors from "cors";
import { taskRouter } from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import swaggerUi from "swagger-ui-express";
import { getOpenApiDocumentation } from "./openapi.js";

const app = express();

app.use(cors());
app.use(express.json());

const spec = getOpenApiDocumentation();
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(spec));
app.use("/api/docs.json", (req, res) => res.json(spec));

app.use("/api/tasks", taskRouter);

app.use(errorHandler);

export { app };
