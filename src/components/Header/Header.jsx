import React, { useState } from "react";
import logo from "../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const categories = [
    { label: "Evlər və mənzillər", icon: "fa-code" },
    { label: "Avtomobillər", icon: "fa-arrows-alt" },
    { label: "Əyləncə", icon: "fa-cog" },
  ];

  return (
    <div className="header-border">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.header__logo}>
            <img src={logo} alt="Second Life Logo" />
          </div>
          <div className={styles.hamburger} onClick={toggleMenu}>
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </div>
          <div className={styles.header__categories}>
            <div className={styles.dropdown}>
              <label
                className={`${styles.dropdown__label} ${
                  isOpen ? styles.active : ""
                }`}
                onClick={toggleDropdown}
              >
                Kateqoriyalar <FontAwesomeIcon icon={faAngleDown} />
              </label>
              <ul
                className={`${styles.dropdown__menu} ${
                  isOpen ? styles.show : ""
                }`}
              >
                {categories.map((item, index) => (
                  <li key={index} className={styles.dropdown__item}>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.header__search}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" name="search" placeholder="Axtarış..." />
          </div>
          <div className={styles.header__buttons}>
            <button className={styles.button__register}>Qeydiyyat</button>
            <button className={styles.button__login}>Giriş</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
