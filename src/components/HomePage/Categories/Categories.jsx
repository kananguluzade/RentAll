import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Categories.module.css";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const getRandomGradient = () => {
    const colors = [
      "rgba(255, 182, 193, 0.7)",
      "rgba(144, 238, 144, 0.7)",
      "rgba(173, 216, 230, 0.7)",
      "rgba(255, 192, 203, 0.7)",
      "rgba(255, 222, 173, 0.7)",
      "rgba(175, 238, 238, 0.7)",
      "rgba(221, 160, 221, 0.7)",
      "rgba(240, 230, 140, 0.7)",
      "rgba(250, 250, 210, 0.7)",
      "rgba(255, 239, 213, 0.7)",
    ];

    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(135deg, ${color1}, ${color2})`;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/all`);
        const data = await response.json();

        const categoriesWithBackground = data.map((category) => ({
          ...category,
          background: getRandomGradient(),
        }));

        const sortedCategories = [
          ...categoriesWithBackground.filter(
            (category) => category.name !== "Əlavə (Digər)"
          ),
          categoriesWithBackground.find(
            (category) => category.name === "Əlavə (Digər)"
          ),
        ];

        setCategories(sortedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [BASE_URL]);

  const handleCategoryClick = (category) => {
    window.scrollTo(0, 0);
    navigate(`/allproducts?category=${category.id}`);
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
            <img src={category.imageUrl} alt={category.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
