import { clsx } from "clsx";
import type { HTMLAttributes } from "react";
import styles from "./Badge.module.css";

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "success" | "warning" | "danger";
};

export const Badge = ({ variant = "default", className, ...props }: Props) => (
  <span className={clsx(styles.badge, styles[variant], className)} {...props} />
);
