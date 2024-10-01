import React from "react";
import styles from "./CardSkeleton.module.css";

const CardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__img}></div>
      <div className={styles.skeleton__desc}>
        <div className={styles.skeleton__category}>
          <div className={styles.skeleton__line} style={{ width: "60%" }}></div>
          <div className={styles.skeleton__line} style={{ width: "20%" }}></div>
        </div>
        <div className={styles.skeleton__line} style={{ width: "100%" }}></div>
        <div className={styles.skeleton__author}>
          <div className={styles.skeleton__img}></div>
          <div className={styles.skeleton__line} style={{ width: "30%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
