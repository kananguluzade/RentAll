import React, { useState, useEffect } from "react";
import styles from "./Card.module.css";

const Card = ({ share, isLoading }) => {
  const [owner, setOwner] = useState(null);
  const [likes, setLikes] = useState(share ? share.likes : 0);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOwner = async () => {
      try {
        if (share && share.owner_id) {
          const response = await fetch(`${BASE_URL}/users/${share.owner_id}`);
          const ownerData = await response.json();
          setOwner(ownerData);
        }
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };

    fetchOwner();
  }, [share, BASE_URL]);

  const handleLike = async () => {
    try {
      const updatedLikes = likes + 1;
      setLikes(updatedLikes);

      // Send a request to update likes if needed
      // Example: await fetch(`${BASE_URL}/products/${share.id}`, { method: "PATCH", body: JSON.stringify({ likes: updatedLikes }) });
    } catch (error) {
      console.error("Error liking the product:", error);
    }
  };

  return (
    <div className={styles.share}>
      {isLoading ? (
        <div className={styles.card}></div>
      ) : (
        <>
          {share && (
            <>
              <div className={styles.share__img}>
                <img src={share.image} alt={share.description} />
              </div>
              <div className={styles.share__desc}>
                <div className={styles.share__info}>
                  <p>{share.title}</p>
                </div>
                <div className={styles.share__category}>
                  <p>{share.category}</p>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Card;
