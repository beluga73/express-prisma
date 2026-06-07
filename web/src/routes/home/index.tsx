import { Box, Card, Typography } from "@mui/material";
import { useStores } from "@/stores/StoresContext";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Column } from "./components";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import type { DragEndEvent, DragStartEvent } from "@dnd-kit/react";
import { isSortableOperation } from "@dnd-kit/react/sortable";
import type { Task } from "@/types/schema";

const App = observer(() => {
  const { BoardStore } = useStores();
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  useEffect(() => {
    BoardStore.getAllTasks();
  }, [BoardStore]);

  const handleDragStart = (event: DragStartEvent) => {
    const task = event.operation.source?.data as Task | undefined;
    if (task) setDraggedTask(task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedTask(null);

    const { operation, canceled } = event;
    if (canceled || !operation.source || !operation.target) return;

    const taskId = operation.source.id as number;
    const sourceColumnId = operation.source.initialGroup as number;
    const initialIndex = operation.source.initialIndex as number;

    if (isSortableOperation(operation)) {
      const targetColumnId = operation.target.group as number;
      const targetIndex = operation.target.index as number;

      if (targetIndex === initialIndex && targetColumnId === sourceColumnId) return;

      BoardStore.updateTask(taskId, {
        position: targetIndex,
        ...(targetColumnId !== sourceColumnId && { columnId: targetColumnId }),
      });
    } else {
      // Dropped onto a column container (empty column or column background)
      const targetColumnId = operation.target.id as number;
      const targetColumn = BoardStore.tasks.find((col) => col.id === targetColumnId);
      BoardStore.updateTask(taskId, {
        columnId: targetColumnId,
        position: targetColumn?.tasks.length ?? 0,
      });
    }
  };

  if (BoardStore.getAllState.loading) {
    return <p>Loading...</p>;
  }

  if (BoardStore.getAllState.error) {
    return <p>Error: {BoardStore.getAllState.error.message}</p>;
  }

  return (
    <DragDropProvider onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Box sx={{ display: "flex", gap: 1 }}>
        {BoardStore.tasks.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </Box>
      <DragOverlay>
        {draggedTask && (
          <Card sx={{ px: 1.5, py: 1, cursor: "grabbing", boxShadow: 6 }}>
            <Typography variant="body2">{draggedTask.title}</Typography>
          </Card>
        )}
      </DragOverlay>
    </DragDropProvider>
  );
});

export default App;
