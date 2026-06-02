import styles from "./TaskCard.module.css";
import type { Status, Task } from "../../types";

const STATUS_COLORS: Record<Status, string> = {
  TODO: "blue",
  IN_PROGRESS: "yellow",
  DONE: "green",
};

export function TaskCard({ title, status }: Task) {
  const statusColor = STATUS_COLORS[status];

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>
        Status: {status}
        <span
          style={{ backgroundColor: statusColor }}
          className={styles.cardStatus}
        ></span>
      </p>
    </div>
  );
}
