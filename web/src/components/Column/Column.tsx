import { TaskCard } from "../TaskCard/TaskCard";
import styles from "./Column.module.css";

type Task = {
  id: number;
  title: string;
  position: number;
  columnId: number;
};

type Props = {
  id: number;
  title: string;
  position: number;
  tasks: Task[];
};

export const Column = ({ title, tasks }: Props) => {
  return (
    <div className={styles.column}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.count}>{tasks.length}</span>
      </div>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
};
