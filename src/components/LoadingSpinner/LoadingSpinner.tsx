import styles from "./LoadingSpinner.module.scss";

export default function LoadingSpinner({ className }: { className?: string }) {
  const spinnerClassName = className ? `${styles["spinner"]} ${className}` : styles["spinner"];
  return <div className={spinnerClassName}></div>;
}
