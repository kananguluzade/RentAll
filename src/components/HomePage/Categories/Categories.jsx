import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    window.scrollTo(0, 0);
    navigate(`/allproducts?category=${category.name}`);
  };

  return (
    <div className={styles.categories}>
      <div className={styles.categories__title}>
        <h3>Kateqoriyalar</h3>
      </div>
      <div className={styles.categories__list}>
        {categories.map((category) => (
          <div
            key={category.id}
            className={styles.categorie}
            style={{ background: category.background }}
            onClick={() => handleCategoryClick(category)}
          >
            <p>{category.name}</p>
            <img src={category.image} alt={category.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
