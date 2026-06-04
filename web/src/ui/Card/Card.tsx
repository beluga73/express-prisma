import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";

type Props = HTMLAttributes<HTMLDivElement>;

export const Card = ({ className, ...props }: Props) => (
  <div className={clsx(styles.card, className)} {...props} />
);
