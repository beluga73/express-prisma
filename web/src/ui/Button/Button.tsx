import { clsx } from "clsx";
import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md";
};

export const Button = ({ variant = "primary", size = "md", className, ...props }: Props) => (
  <button
    className={clsx(styles.button, styles[variant], styles[size], className)}
    {...props}
  />
);
