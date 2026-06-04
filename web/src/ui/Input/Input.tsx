import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const Input = ({ label, id, ...props }: Props) => (
  <div className={styles.wrapper}>
    {label && <label className={styles.label} htmlFor={id}>{label}</label>}
    <input className={styles.input} id={id} {...props} />
  </div>
);
