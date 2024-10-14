import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./CategoriesDropdown.module.css";

const CategoriesDropdown = ({ categories, isOpen, toggleDropdown }) => (
  <div className={styles.dropdown}>
    <label
      className={`${styles.dropdown__label} ${isOpen ? styles.active : ""}`}
      onClick={toggleDropdown}
    >
      <span>Categories</span>
      <FontAwesomeIcon
        icon="angle-down"
        className={
          isOpen ? styles.icon__rotate__true : styles.icon__rotate__false
        }
      />
    </label>
    <ul className={`${styles.dropdown__menu} ${isOpen ? styles.show : ""}`}>
      {categories.map((item, index) => (
        <li key={index} className={styles.dropdown__item}>
          <FontAwesomeIcon icon={item.icon} /> {item.label}
        </li>
      ))}
    </ul>
  </div>
);

export default CategoriesDropdown;
