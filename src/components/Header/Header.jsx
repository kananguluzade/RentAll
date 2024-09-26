import React, { useState, useRef, useEffect } from "react";
import logo from "../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faBars,
  faTimes,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "rsuite";
import styles from "./Header.module.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("register");

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const handleRegisterOpen = () => {
    setActiveTab("register");
    setIsRegisterOpen(true);
  };
  const handleLoginOpen = () => {
    setActiveTab("login");
    setIsRegisterOpen(true);
  };
  const handleClose = () => {
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const handleForgotPasswordOpen = () => {
    setIsForgotPasswordOpen(true);
  };

  const handleSwitchToLogin = () => {
    setActiveTab("login");
    setIsRegisterOpen(true);
    setIsForgotPasswordOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const categories = [
    { label: "Evlər və mənzillər", icon: "fa-code" },
    { label: "Avtomobillər", icon: "fa-arrows-alt" },
    { label: "Əyləncə", icon: "fa-cog" },
  ];

  return (
    <>
      <div className="header-border">
        <div className="container">
          <div className={styles.header}>
            <div className={styles.header__logo}>
              <img src={logo} alt="Second Life Logo" />
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </div>
            <div
              className={`${styles.hamburger__buttons} ${
                isMenuOpen ? styles.active : ""
              }`}
            >
              <button
                className={styles.button__register}
                onClick={handleRegisterOpen}
              >
                Qeydiyyat
              </button>
              <button
                className={styles.button__login}
                onClick={handleLoginOpen}
              >
                Giriş
              </button>
            </div>
            <div className={styles.header__categories}>
              <div className={styles.dropdown} ref={dropdownRef}>
                <label
                  className={`${styles.dropdown__label} ${
                    isOpen ? styles.active : ""
                  }`}
                  onClick={toggleDropdown}
                >
                  Kateqoriyalar
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`${
                      isOpen
                        ? styles.icon__rotate__true
                        : styles.icon__rotate__false
                    }`}
                  />
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
              <button
                className={styles.button__register}
                onClick={handleRegisterOpen}
              >
                Qeydiyyat
              </button>
              <button
                className={styles.button__login}
                onClick={handleLoginOpen}
              >
                Giriş
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal size="full" open={isRegisterOpen} onClose={handleClose}>
        <Modal.Body className={`${styles.modal__form} ${activeTab}`}>
          <div className="container">
            <div className={styles.form__close}>
              <FontAwesomeIcon icon={faCircleXmark} onClick={handleClose} />
            </div>
            <div className={styles.form__header}>
              <h3
                className={`${activeTab === "register" ? styles.active : ""}`}
                onClick={() => setActiveTab("register")}
              >
                Qeydiyyat
              </h3>
              <h3
                className={`${activeTab === "login" ? styles.active : ""}`}
                onClick={() => setActiveTab("login")}
              >
                Giriş
              </h3>
            </div>
          </div>
          {activeTab === "register" ? (
            <Register />
          ) : (
            <Login onForgotPassword={handleForgotPasswordOpen} />
          )}
        </Modal.Body>
      </Modal>

      <Modal size="full" open={isForgotPasswordOpen} onClose={handleClose}>
        <Modal.Body className={styles.modal__form}>
          <ForgotPassword
            onClose={handleClose}
            onSwitchToLogin={handleSwitchToLogin}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
