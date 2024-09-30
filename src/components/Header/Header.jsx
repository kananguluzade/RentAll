import React, { useState, useRef, useEffect } from "react";
import logo from "../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faBars,
  faTimes,
  faCircleXmark,
  faHeart,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "rsuite";
import styles from "./Header.module.css";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userimg, setUserimg] = useState("");

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

  const handleLoginSuccess = (userImage) => {
    setIsLoggedIn(true);
    setUserimg(userImage);
    handleClose();
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
              <Link to="/">
                <img src={logo} alt="Second Life Logo" />
              </Link>
            </div>
            <div className={styles.hamburger} onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </div>
            <div
              className={`${styles.hamburger__buttons} ${
                isMenuOpen ? styles.active : ""
              }`}
            >
              {!isLoggedIn && (
                <>
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
                </>
              )}
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
            {isLoggedIn && userimg && (
              <div className={styles.user__panel}>
                <div className={styles.user__img}>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21.0527 8.88722C21.0527 3.43045 14.0527 2.43046 12.0591 6.80562C10.0527 2.4305 3.05273 3.43054 3.05273 8.88722C3.05273 14.3439 9.05908 18.1142 12.0591 19.9305C16.0528 17.0584 21.0527 12.9502 21.0527 8.88722Z"
                      stroke="#585A5C"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <svg
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.05451 16.9935H5.04724C4.30136 16.9935 4.06736 16.3404 4.05273 16.0138C4.05273 15.9456 4.05273 15.7301 4.05273 15.4143C4.05273 15.0195 4.27211 14.8002 4.34524 14.7124C4.37899 14.6719 4.65236 14.3907 4.85711 14.2006C5.02091 14.0486 5.04724 13.8497 5.04724 13.7181V10.0041C5.04724 5.03025 9.32405 3 12.0527 3C14.9427 3 19.0581 5.3645 19.0581 10.0041C19.0581 11.169 19.0581 13.5426 19.0581 13.7181C19.0581 13.9374 19.2043 14.1275 19.2482 14.186C19.2921 14.2445 19.4676 14.3907 19.7601 14.6978C20.0087 14.9588 20.0526 15.2535 20.0526 15.4143V16.0138C20.0643 16.7391 19.4237 16.9935 19.0581 16.9935H15.0508M9.05451 16.9935V18.0024C9.05451 19.0549 9.87887 21 12.0673 21C14.7875 21 15.0654 18.6309 15.0654 18.0024L15.0508 16.9935M9.05451 16.9935H15.0508"
                      stroke="#585A5C"
                      stroke-width="2"
                      stroke-linecap="round"
                    />
                  </svg>

                  <img src={userimg} alt="User" />
                </div>
              </div>
            )}
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
            <Login
              onForgotPassword={handleForgotPasswordOpen}
              onClose={handleClose}
              onLoginSuccess={handleLoginSuccess}
            />
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
