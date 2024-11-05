import React from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    <div className={styles.loadWrapp}>
      <div className={styles.load1}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
