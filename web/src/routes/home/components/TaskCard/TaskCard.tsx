import { useDraggable } from "@dnd-kit/react";
import { Card, Typography } from "@mui/material";
import type { Task } from "@/types/schema";
import { observer } from "mobx-react-lite";

type Props = {
  task: Task;
};

// Apprantely 'observer' is needed here when we update the task paritally, as the column won't re-render
// check it by swapping removing 'observer'
export const TaskCard = observer(({ task }: Props) => {
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
});
