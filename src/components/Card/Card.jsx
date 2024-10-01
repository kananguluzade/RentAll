import React from "react";
import styles from "./Card.module.css";

const Card = ({ share, isLoading }) => {
  return (
    <div className={styles.share}>
      {isLoading ? (
        <div className={styles.card}></div>
      ) : (
        <>
          <div className={styles.share__img}>
            <img src={share.image} alt={share.description} />
          </div>
          <div className={styles.share__desc}>
            <div className={styles.share__category}>
              <h4>{share.category}</h4>
              <svg
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.heart__icon}
              >
                <path
                  d="M19 5.88722C19 0.430447 12 -0.569537 10.0063 3.80562C8 -0.569501 1 0.430542 1 5.88722C1 11.3439 7.00635 15.1142 10.0063 16.9305C14.0001 14.0584 19 9.95018 19 5.88722Z"
                  stroke="#EB4A4A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className={styles.share__info}>
              <p>{share.description}</p>
            </div>
            <div className={styles.share__author}>
              <img src={share.authorImage} alt={share.author} />
              <p>{share.author}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
