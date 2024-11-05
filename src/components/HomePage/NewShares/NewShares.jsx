import React, { useEffect, useState } from "react";
import styles from "./NewShares.module.css";
import Card from "../../Card/Card";
import { Link } from "react-router-dom";

const NewShares = () => {
  const [products, setProducts] = useState([]);
  const [visibleProductsCount, setVisibleProductsCount] = useState(4);
  const [showMore, setShowMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/all`);

        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status} - ${response.statusText}`
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [BASE_URL]);

  const loadMoreProducts = () => {
    setVisibleProductsCount(showMore ? 4 : visibleProductsCount + 8);
    setShowMore(!showMore);
  };

  return (
    <div className={styles.new__shares}>
      <div className={styles.shares__title}>
        <h3>Yeni paylaşılanlar</h3>
      </div>
      <div className={styles.shares__list}>
        {isLoading
          ? Array.from({ length: visibleProductsCount }).map((_, index) => (
              <Card key={index} isLoading={true} />
            ))
          : products.slice(0, visibleProductsCount).map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <Card share={product} isLoading={false} />
              </Link>
            ))}
      </div>
      <div className={styles.more__shares}>
        {products.length > 4 && (
          <button onClick={loadMoreProducts}>
            {showMore ? "Daha az göstər" : "Daha çox göstər"}
          </button>
        )}
      </div>
    </div>
  );
};

export default NewShares;
