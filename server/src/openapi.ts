import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { registerTaskDocs, registerAuthDocs } from "./routes";

export const registry = new OpenAPIRegistry();

registerTaskDocs(registry);
registerAuthDocs(registry);

export function getOpenApiDocumentation() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: "3.0.0",
    info: { title: "Kanban Board API", version: "1.0.0" },
    servers: [{ url: "/api" }],
  });
}
