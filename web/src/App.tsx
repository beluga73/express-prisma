import { Box } from "@mui/material";
import { useStores } from "./stores/StoresContext";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Column } from "./components";

const App = observer(() => {
  const { BoardStore } = useStores();

  useEffect(() => {
    BoardStore.getAllTasks();
  }, [BoardStore]);

  if (BoardStore.getAllState.loading) {
    return <p>Loading...</p>;
  }

  if (BoardStore.getAllState.error) {
    return <p>Error: {BoardStore.getAllState.error.message}</p>;
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {BoardStore.tasks.map((column) => (
        <Column key={column.id} column={column} />
      ))}
      {/* columns will go here */}
    </Box>
  );
});

export default App;
