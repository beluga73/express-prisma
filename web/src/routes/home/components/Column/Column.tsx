import { useState } from "react";
import { useDroppable } from "@dnd-kit/react";
import {
  Paper,
  Box,
  Chip,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TaskCard } from "../TaskCard";
import { useStores } from "@/stores/StoresContext";
import type { Column as ColumnType } from "@/types/schema";
import { observer } from "mobx-react-lite";

type Props = {
  column: ColumnType;
};

export const Column = observer(({ column }: Props) => {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    data: { columnId: column.id },
  });

  console.log(column.tasks.map((task) => task.columnId));
  // console.log(column.tasks[0]);

  const { BoardStore } = useStores();
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async () => {
    if (!title.trim()) return;
    await BoardStore.createTask({ title: title.trim(), columnId: column.id });
    setTitle("");
    setAdding(false);
  };

  const handleCancel = () => {
    setTitle("");
    setAdding(false);
  };

  return (
    <Paper
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
        p: 2,
        width: 300,
        minHeight: 400,
        transition: "background-color 0.15s",
        bgcolor: isDropTarget ? "action.hover" : "background.paper",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {column.title}
        </Typography>
        <Chip label={column.tasks.length} size="small" />
      </Box>

      <Stack spacing={1} sx={{ flex: 1 }}>
        {column.tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
      </Stack>

      {adding ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TextField
            size="small"
            fullWidth
            autoFocus
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
              if (e.key === "Escape") handleCancel();
            }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              onClick={handleSubmit}
              disabled={!title.trim() || BoardStore.createState.loading}
            >
              Add
            </Button>
            <Button size="small" onClick={handleCancel}>
              Cancel
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setAdding(true)}
          sx={{ justifyContent: "flex-start", color: "text.secondary" }}
        >
          Add a task
        </Button>
      )}
    </Paper>
  );
});
