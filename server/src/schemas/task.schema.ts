import * as z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3).max(50),
  position: z.coerce.number(),
  columnId: z.coerce.number(),
});
export type CreateTask = z.infer<typeof createTaskSchema>;
