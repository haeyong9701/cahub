import styles from "./Spinner.module.scss";

export default function Spinner({ className }: { className?: string }) {
  const spinnerClassName = className ? `${styles["spinner"]} ${className}` : styles["spinner"];
  return <div className={spinnerClassName}></div>;
}
