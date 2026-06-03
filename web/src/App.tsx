import { TaskCard } from "./components/TaskCard/TaskCard";
import styles from "./App.module.css";
import { useStores } from "./stores/rootContext";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  const [value, setValue] = useState("");

  const {
    tasksStore: { data: tasks, isLoading, error, fetchTasks, addTask },
  } = useStores();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSubmit = () => {
    addTask(value);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ backgroundColor: "red" }}>{error.message}</p>;
  }

  return (
    <div className={styles.tasks}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button>add</button>
      </form>
      {tasks.map((task) => (
        <TaskCard {...task} key={task.id} />
      ))}
    </div>
  );
});

export default App;

// const Draggable = ({ id, title }: { id: number; title: string }) => {
//   const { ref } = useDraggable({ id });

//   return <button ref={ref}>{title}</button>;
// };

// const Droppable = ({ id, children }: { id: number; children: ReactNode }) => {
//   const { ref } = useDroppable({ id });

//   return (
//     <div
//       ref={ref}
//       style={{ width: 400, height: 400, backgroundColor: "lightblue" }}
//     >
//       {children}
//     </div>
//   );
// };

// const App = () => {
//   const [columns, setColumns] = useState({
//     col1: {
//       id: 0,
//       data: [
//         { id: 0, title: "title 0" },
//         { id: 1, title: "title 1" },
//       ],
//     },
//     col2: {
//       id: 1,
//       data: [{ id: 3, title: "title 3" }],
//     },
//   });

//   const handleDragEnd = (event) => {
//     const { operation } = event;

//     const itemId = operation.source?.id;
//     const containerId = operation.target?.id;

//     setColumns((prevColumns) => {
//       const sourceKey = Object.keys(prevColumns).find((key) =>
//         prevColumns[key as keyof typeof prevColumns].data.some((task) => task.id === itemId),
//       ) as keyof typeof prevColumns | undefined;

//       const targetKey = Object.keys(prevColumns).find(
//         (key) => prevColumns[key as keyof typeof prevColumns].id === containerId,
//       ) as keyof typeof prevColumns | undefined;

//       if (!sourceKey || !targetKey || sourceKey === targetKey) return prevColumns;

//       const item = prevColumns[sourceKey].data.find((task) => task.id === itemId)!;

//       return {
//         ...prevColumns,
//         [sourceKey]: {
//           ...prevColumns[sourceKey],
//           data: prevColumns[sourceKey].data.filter((task) => task.id !== itemId),
//         },
//         [targetKey]: {
//           ...prevColumns[targetKey],
//           data: [...prevColumns[targetKey].data, item],
//         },
//       };
//     });
//   };

//   return (
//     <DragDropProvider onDragEnd={handleDragEnd}>
//       <div style={{ display: "flex", gap: 16 }}>
//         {Object.values(columns).map((col) => (
//           <Droppable id={col.id}>
//             {col.data.map((task) => (
//               <Draggable {...task} />
//             ))}
//           </Droppable>
//         ))}
//       </div>
//     </DragDropProvider>
//   );
// };

// export default App;
