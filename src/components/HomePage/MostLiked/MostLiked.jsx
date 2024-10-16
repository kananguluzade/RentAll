import React, { useEffect, useState } from "react";
import styles from "./MostLiked.module.css";
import Card from "../../Card/Card";
import { Link } from "react-router-dom";

const MostLiked = () => {
  const [mostLiked, setMostLiked] = useState([]);
  const [visibleSharesCount, setVisibleSharesCount] = useState(4);
  const [showMore, setShowMore] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();
        const sortedShares = data.sort((a, b) => b.likes - a.likes);
        setMostLiked(sortedShares);
      } catch (error) {
        console.error("Error fetching shares:", error);
      }
    };

    fetchShares();
  }, [BASE_URL]);

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
        <h3>Ən çox bəyənilənlər</h3>
      </div>
      <div className={styles.shares__list}>
        {mostLiked.slice(0, visibleSharesCount).map((share) => (
          <Link key={share.id} to={`/product/${share.id}`}>
            <Card share={share} />
          </Link>
        ))}
      </div>
      <div className={styles.more__shares}>
        {mostLiked.length > 4 && (
          <button onClick={loadMoreShares}>
            {showMore ? "Daha az göstər" : "Daha çox göstər"}
          </button>
        )}
      </div>
    </div>
  );
};

export default MostLiked;
