import { useEffect, useState } from "react";
import { type Task } from "../types";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    };

    fetchData();
  }, []);

  return { tasks };
};
