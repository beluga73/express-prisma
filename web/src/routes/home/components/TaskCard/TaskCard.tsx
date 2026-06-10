import { useSortable } from "@dnd-kit/react/sortable";
import { Card, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Task } from "@/types/schema";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/StoresContext";

type Props = {
  task: Task;
  index: number;
};

export const TaskCard = observer(({ task, index }: Props) => {
  const { boardStore } = useStores();
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
        position: "relative",
        px: 1.5,
        py: 1,
        cursor: isDragging ? "grabbing" : "grab",
        opacity: isDragging ? 0 : 1,
        transition: "opacity 0.2s, box-shadow 0.2s",
        "&:hover": { boxShadow: 2 },
        "&:hover .delete-task-button": { opacity: 1 },
      }}
    >
      <IconButton
        className="delete-task-button"
        size="small"
        aria-label="Delete task"
        onPointerDownCapture={(e) => e.stopPropagation()}
        onClick={() => boardStore.deleteTask(task)}
        sx={{
          position: "absolute",
          top: 4,
          right: 4,
          opacity: 0,
          transition: "opacity 0.15s",
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <Typography variant="body2" sx={{ pr: 4 }}>
        {task.title}
      </Typography>
    </Card>
  );
});
