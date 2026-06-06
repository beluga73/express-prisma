import { useDraggable } from "@dnd-kit/react";
import { Card, Typography } from "@mui/material";
import type { Task } from "@/types/schema";

type Props = {
  task: Task;
};

export const TaskCard = ({ task }: Props) => {
  const { handleRef, isDragging } = useDraggable({ id: task.id, data: task });

  return (
    <Card
      ref={handleRef}
      sx={{
        px: 1.5,
        py: 1,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0.4 : 1,
        transition: "opacity 0.2s, box-shadow 0.2s",
        "&:hover": { boxShadow: 2 },
      }}
    >
      <Typography variant="body2">{task.title}</Typography>
    </Card>
  );
};
