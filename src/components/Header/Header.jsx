import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Services/authContext";
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
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const { user, logout } = useContext(AuthContext);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const getUserInitials = (fullName) => {
    if (!fullName) return "";
    const nameParts = fullName.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
    return initials;
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const userimg = user?.profile_image || "";
  const userFullName = user?.username;

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setIsUserMenuOpen((prev) => !prev);

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
              {!user && (
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

              {user && (
                <div className={styles.hamburger__panels}>
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

                  <div className={styles.user__img}>
                    {userimg ? (
                      <img src={userimg} alt="User" />
                    ) : (
                      <span className={styles.user__initials}>
                        {getUserInitials(userFullName)}
                      </span>
                    )}
                  </div>
                </div>
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
            {user && (
              <div className={styles.user__panel}>
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

                <div className={styles.user__profile}>
                  <div className={styles.user__img} onClick={toggleUserMenu}>
                    {userimg ? (
                      <img src={userimg} alt="User" />
                    ) : (
                      <span className={styles.user__initials}>
                        {getUserInitials(userFullName)}
                      </span>
                    )}
                  </div>
                  {isUserMenuOpen && (
                    <div className={styles.user__menu}>
                      <div className={styles.menu__head}>
                        {userimg ? (
                          <img src={userimg} alt="User" />
                        ) : (
                          <span className={styles.user__initials}>
                            {getUserInitials(userFullName)}
                          </span>
                        )}
                        <ul>
                          <li>{userFullName}</li>
                          <li>{user?.phone_number}</li>
                        </ul>
                      </div>
                      <div className={styles.user__settings}>
                        <p>Menu</p>
                        <ul className={styles.setting__list}>
                          <NavLink to="/settings">
                            <li>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20.3499 8.92293L19.9837 8.7192C19.9269 8.68756 19.8989 8.67169 19.8714 8.65524C19.5983 8.49165 19.3682 8.26564 19.2002 7.99523C19.1833 7.96802 19.1674 7.93949 19.1348 7.8831C19.1023 7.82677 19.0858 7.79823 19.0706 7.76998C18.92 7.48866 18.8385 7.17515 18.8336 6.85606C18.8331 6.82398 18.8332 6.79121 18.8343 6.72604L18.8415 6.30078C18.8529 5.62025 18.8587 5.27894 18.763 4.97262C18.6781 4.70053 18.536 4.44993 18.3462 4.23725C18.1317 3.99685 17.8347 3.82534 17.2402 3.48276L16.7464 3.1982C16.1536 2.85658 15.8571 2.68571 15.5423 2.62057C15.2639 2.56294 14.9765 2.56561 14.6991 2.62789C14.3859 2.69819 14.0931 2.87351 13.5079 3.22396L13.5045 3.22555L13.1507 3.43741C13.0948 3.47091 13.0665 3.48779 13.0384 3.50338C12.7601 3.6581 12.4495 3.74365 12.1312 3.75387C12.0992 3.7549 12.0665 3.7549 12.0013 3.7549C11.9365 3.7549 11.9024 3.7549 11.8704 3.75387C11.5515 3.74361 11.2402 3.65759 10.9615 3.50224C10.9334 3.48658 10.9056 3.46956 10.8496 3.4359L10.4935 3.22213C9.90422 2.86836 9.60915 2.69121 9.29427 2.62057C9.0157 2.55807 8.72737 2.55634 8.44791 2.61471C8.13236 2.68062 7.83577 2.85276 7.24258 3.19703L7.23994 3.1982L6.75228 3.48124L6.74688 3.48454C6.15904 3.82572 5.86441 3.99672 5.6517 4.23614C5.46294 4.4486 5.32185 4.69881 5.2374 4.97018C5.14194 5.27691 5.14703 5.61896 5.15853 6.3027L5.16568 6.72736C5.16676 6.79166 5.16864 6.82362 5.16817 6.85525C5.16343 7.17499 5.08086 7.48914 4.92974 7.77096C4.9148 7.79883 4.8987 7.8267 4.86654 7.88237C4.83436 7.93809 4.81877 7.96579 4.80209 7.99268C4.63336 8.26452 4.40214 8.49186 4.12733 8.65572C4.10015 8.67193 4.0715 8.68752 4.01521 8.71871L3.65365 8.91908C3.05208 9.25245 2.75137 9.41928 2.53256 9.65669C2.33898 9.86672 2.19275 10.1158 2.10349 10.3872C2.00259 10.6939 2.00267 11.0378 2.00424 11.7255L2.00551 12.2877C2.00706 12.9708 2.00919 13.3122 2.11032 13.6168C2.19979 13.8863 2.34495 14.134 2.53744 14.3427C2.75502 14.5787 3.05274 14.7445 3.64974 15.0766L4.00808 15.276C4.06907 15.3099 4.09976 15.3266 4.12917 15.3444C4.40148 15.5083 4.63089 15.735 4.79818 16.0053C4.81625 16.0345 4.8336 16.0648 4.8683 16.1255C4.90256 16.1853 4.92009 16.2152 4.93594 16.2452C5.08261 16.5229 5.16114 16.8315 5.16649 17.1455C5.16707 17.1794 5.16658 17.2137 5.16541 17.2827L5.15853 17.6902C5.14695 18.3763 5.1419 18.7197 5.23792 19.0273C5.32287 19.2994 5.46484 19.55 5.65463 19.7627C5.86915 20.0031 6.16655 20.1745 6.76107 20.5171L7.25478 20.8015C7.84763 21.1432 8.14395 21.3138 8.45869 21.379C8.73714 21.4366 9.02464 21.4344 9.30209 21.3721C9.61567 21.3017 9.90948 21.1258 10.4964 20.7743L10.8502 20.5625C10.9062 20.5289 10.9346 20.5121 10.9626 20.4965C11.2409 20.3418 11.5512 20.2558 11.8695 20.2456C11.9015 20.2446 11.9342 20.2446 11.9994 20.2446C12.0648 20.2446 12.0974 20.2446 12.1295 20.2456C12.4484 20.2559 12.7607 20.3422 13.0394 20.4975C13.0639 20.5112 13.0885 20.526 13.1316 20.5519L13.5078 20.7777C14.0971 21.1315 14.3916 21.3081 14.7065 21.3788C14.985 21.4413 15.2736 21.4438 15.5531 21.3855C15.8685 21.3196 16.1657 21.1471 16.7586 20.803L17.2536 20.5157C17.8418 20.1743 18.1367 20.0031 18.3495 19.7636C18.5383 19.5512 18.6796 19.3011 18.764 19.0297C18.8588 18.7252 18.8531 18.3858 18.8417 17.7119L18.8343 17.2724C18.8332 17.2081 18.8331 17.1761 18.8336 17.1445C18.8383 16.8247 18.9195 16.5104 19.0706 16.2286C19.0856 16.2007 19.1018 16.1726 19.1338 16.1171C19.166 16.0615 19.1827 16.0337 19.1994 16.0068C19.3681 15.7349 19.5995 15.5074 19.8744 15.3435C19.9012 15.3275 19.9289 15.3122 19.9838 15.2818L19.9857 15.2809L20.3472 15.0805C20.9488 14.7472 21.2501 14.5801 21.4689 14.3427C21.6625 14.1327 21.8085 13.8839 21.8978 13.6126C21.9981 13.3077 21.9973 12.9658 21.9958 12.2861L21.9945 11.7119C21.9929 11.0287 21.9921 10.6874 21.891 10.3828C21.8015 10.1133 21.6555 9.86561 21.463 9.65685C21.2457 9.42111 20.9475 9.25526 20.3517 8.92378L20.3499 8.92293Z"
                                  stroke="#252525"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                                <path
                                  d="M8.00033 12C8.00033 14.2091 9.79119 16 12.0003 16C14.2095 16 16.0003 14.2091 16.0003 12C16.0003 9.79082 14.2095 7.99996 12.0003 7.99996C9.79119 7.99996 8.00033 9.79082 8.00033 12Z"
                                  stroke="#252525"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                />
                              </svg>
                              Settings
                            </li>
                          </NavLink>
                          <li>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21 8.88722C21 3.43045 14 2.43046 12.0063 6.80562C10 2.4305 3 3.43054 3 8.88722C3 14.3439 9.00635 18.1142 12.0063 19.9305C16.0001 17.0584 21 12.9502 21 8.88722Z"
                                stroke="#252525"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </svg>
                            Favorites
                          </li>
                          <li>
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9.00178 16.9935H4.99451C4.24863 16.9935 4.01463 16.3404 4 16.0138C4 15.9456 4 15.7301 4 15.4143C4 15.0195 4.21938 14.8002 4.2925 14.7124C4.32626 14.6719 4.59963 14.3907 4.80438 14.2006C4.96818 14.0486 4.99451 13.8497 4.99451 13.7181V10.0041C4.99451 5.03025 9.27132 3 11.9999 3C14.8899 3 19.0053 5.3645 19.0053 10.0041C19.0053 11.169 19.0053 13.5426 19.0053 13.7181C19.0053 13.9374 19.1516 14.1275 19.1955 14.186C19.2393 14.2445 19.4148 14.3907 19.7073 14.6978C19.956 14.9588 19.9998 15.2535 19.9998 15.4143V16.0138C20.0115 16.7391 19.371 16.9935 19.0053 16.9935H14.9981M9.00178 16.9935V18.0024C9.00178 19.0549 9.82613 21 12.0145 21C14.7348 21 15.0127 18.6309 15.0127 18.0024L14.9981 16.9935M9.00178 16.9935H14.9981"
                                stroke="#252525"
                                stroke-width="2"
                                stroke-linecap="round"
                              />
                            </svg>
                            Notifications
                          </li>
                        </ul>
                      </div>
                      <div onClick={handleLogout} className={styles.log__out}>
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75"
                            stroke="#EB4A4A"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>

                        <p>Log out</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {!user && (
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
