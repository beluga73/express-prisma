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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ backgroundColor: "red" }}>{error.message}</p>;
  }

  return (
    <div className={styles.tasks}>
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => addTask(value)}>add</button>
      </div>
      {tasks.map((task) => (
        <TaskCard {...task} key={task.id} />
      ))}
    </div>
  );
});

export default App;
