import React, { useEffect, useState } from "react";
import styles from "./NewShares.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const NewShares = () => {
  const [shares, setShares] = useState([]);
  const [visibleSharesCount, setVisibleSharesCount] = useState(4);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setShares(data.shares);
      } catch (error) {
        console.error("Error fetching shares:", error);
      }
    };

    fetchShares();
  }, []);

  const loadMoreShares = () => {
    if (showMore) {
      setVisibleSharesCount(4);
    } else {
      setVisibleSharesCount((prevCount) => prevCount + 8);
    }
    setShowMore(!showMore);
  };

  return (
    <div className={styles.new__shares}>
      <div className={styles.shares__title}>
        <h3>Yeni paylaşılanlar</h3>
      </div>
      <div className={styles.shares__list}>
        {shares.slice(0, visibleSharesCount).map((share) => (
          <div key={share.id} className={styles.share}>
            <div className={styles.share__img}>
              <img src={share.image} alt="" />
            </div>
            <div className={styles.share__desc}>
              <div className={styles.share__price}>
                <h4>{share.price}</h4>
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div className={styles.share__info}>
                <p>{share.description}</p>
              </div>
              <div className={styles.share__author}>
                <img src={share.image} alt="" />
                <p>{share.author}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.more__shares}>
        <button onClick={loadMoreShares}>
          {showMore ? "Daha az göstər" : "Daha çox göstər"}
        </button>
      </div>
    </div>
  );
};

export default NewShares;
