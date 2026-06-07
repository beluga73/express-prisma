import { useSortable } from "@dnd-kit/react/sortable";
import { Card, Typography } from "@mui/material";
import type { Task } from "@/types/schema";
import { observer } from "mobx-react-lite";

type Props = {
  task: Task;
  index: number;
};

export const TaskCard = observer(({ task, index }: Props) => {
  const { ref, handleRef, isDragging } = useSortable({
    id: task.id,
    index,
    group: task.columnId,
    data: task,
  });

  return (
    <Card
      ref={(el) => {
        ref(el);
        handleRef(el);
      }}
      sx={{
        px: 1.5,
        py: 1,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0 : 1,
        transition: "opacity 0.2s, box-shadow 0.2s",
        "&:hover": { boxShadow: 2 },
      }}
    >
      <Typography variant="body2">{task.title}</Typography>
    </Card>
  );
});
