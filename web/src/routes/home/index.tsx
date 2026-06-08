import { Box, Card, Typography } from "@mui/material";
import { useStores } from "@/stores/StoresContext";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Column } from "./components";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/react";
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

  const handleDragOver = (event: DragOverEvent) => {
    const { operation } = event;
    if (
      !isSortableOperation(operation) ||
      !operation.source ||
      !operation.target
    )
      return;

    // OptimisticSortingPlugin physically relocates the dragged DOM node into the
    // target column's container while hovering over a different column. That move
    // happens outside React's view of the DOM and conflicts with the re-render we
    // trigger from BoardStore.moveTask once the drop completes ("removeChild: not
    // a child of this node"). Same-column reordering is fine — it only repositions
    // siblings within a container React already owns — so we only block the
    // cross-column relocation by marking the event as handled.
    if (operation.source.sortable.group !== operation.target.sortable.group) {
      event.preventDefault();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDraggedTask(null);

    const { operation, canceled } = event;
    if (canceled || !operation.source || !operation.target) return;

    const taskId = operation.source.id as number;
    const sourceColumnId = operation.source.initialGroup as number;
    console.log(sourceColumnId);
    const initialIndex = operation.source.initialIndex as number;

    if (isSortableOperation(operation)) {
      const targetColumnId = operation.target.group as number;
      const targetIndex = operation.target.index as number;

      if (targetIndex === initialIndex && targetColumnId === sourceColumnId)
        return;

      BoardStore.moveTask(taskId, { columnId: targetColumnId, targetIndex });
    } else {
      // Dropped onto a column container (empty column or column background)
      const targetColumnId = operation.target.id as number;
      const targetColumn = BoardStore.columns.find(
        (col) => col.id === targetColumnId,
      );

      BoardStore.moveTask(taskId, {
        columnId: targetColumnId,
        targetIndex: targetColumn?.tasks.length ?? 0,
      });
    }
  };

  if (BoardStore.getAllState.loading) {
    return <p>Loading...</p>;
  }

  return (
    <DragDropProvider
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        {BoardStore.columns.map((column) => (
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
