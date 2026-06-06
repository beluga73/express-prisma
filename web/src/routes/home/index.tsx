import { Box } from "@mui/material";
import { useStores } from "@/stores/StoresContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Column } from "./components";
import { DragDropProvider } from "@dnd-kit/react";
import type { DragEndEvent } from "@dnd-kit/react";

const App = observer(() => {
  const { BoardStore } = useStores();

  useEffect(() => {
    BoardStore.getAllTasks();
  }, [BoardStore]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation, canceled } = event;
    if (canceled || !operation.source || !operation.target) return;

    const taskId = operation.source.id as number;
    const targetColumnId = operation.target.id as number;

    BoardStore.updateTask(taskId, { columnId: targetColumnId });
  };

  if (BoardStore.getAllState.loading) {
    return <p>Loading...</p>;
  }

  if (BoardStore.getAllState.error) {
    return <p>Error: {BoardStore.getAllState.error.message}</p>;
  }

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <Box sx={{ display: "flex", gap: 1 }}>
        {BoardStore.tasks.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </Box>
    </DragDropProvider>
  );
});

export default App;
