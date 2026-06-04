import styles from "./TaskCard.module.css";

type Props = {
  id: number;
  title: string;
  position: number;
  columnId: number;
};

export const TaskCard = ({ title }: Props) => {
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};
