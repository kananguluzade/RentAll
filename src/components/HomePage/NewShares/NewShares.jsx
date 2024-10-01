import React, { useEffect, useState } from "react";
import styles from "./NewShares.module.css";
import Card from "../../Card/Card";
import { Link } from "react-router-dom";

const NewShares = () => {
  const [shares, setShares] = useState([]);
  const [visibleSharesCount, setVisibleSharesCount] = useState(4);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setShares(data.shares);
      } catch (error) {
        console.error("Error fetching shares:", error);
      } finally {
        setIsLoading(false);
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
        {isLoading
          ? Array.from({ length: visibleSharesCount }).map((_, index) => (
              <Card key={index} isLoading={true} />
            ))
          : shares.slice(0, visibleSharesCount).map((share) => (
              <Link key={share.id} to={`/product/${share.id}`}>
                <Card share={share} isLoading={false} />
              </Link>
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
