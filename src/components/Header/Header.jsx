import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/Services/authContext";
import logo from "/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import UserMenu from "../UserMenu/UserMenu";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import AuthModals from "../Auth/AuthModals/AuthModals";
import LogoutModal from "../Auth/LogoutModal/LogoutModal";
import Search from "../Search/Search";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, isUserLoading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userFullName = `${user?.name || ""} ${user?.surname || ""}`;
  const userPhoneNumber = user?.phoneNumber || "";
  const userimg = user?.photoUrl || "";

  const userMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  const getUserInitials = () => {
    const [first, last] = [user?.name || "", user?.surname || ""];
    return `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`;
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
    setShowLogoutModal(false);
  };

  const handleRegisterSuccess = () => {
    setActiveTab("login");
    setIsRegisterOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const confirmLogout = () => {
    setShowLogoutModal(true);
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleCloseCategory = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mousedown", handleCloseCategory);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleCloseCategory);
    };
  }, [isOpen, userMenuRef]);

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
                  <HamburgerMenu
                    user={user}
                    userFullName={userFullName}
                    userPhoneNumber={userPhoneNumber}
                    userimg={userimg}
                    confirmLogout={confirmLogout}
                    setIsUserMenuOpen={setIsUserMenuOpen}
                  />
                </div>
              )}
            </div>
            <div className={styles.header__search}>
              <Search />
            </div>

            <div className={`fade-in ${!isUserLoading ? "active" : ""}`}>
              {user ? (
                <div className={styles.user__panel}>
                  <div className={styles.user__img} onClick={toggleUserMenu}>
                    {userimg ? (
                      <img src={userimg} alt="User" />
                    ) : (
                      <span className={styles.user__initials}>
                        {getUserInitials()}
                      </span>
                    )}
                  </div>
                  <UserMenu
                    isUserMenuOpen={isUserMenuOpen}
                    userMenuRef={userMenuRef}
                    userFullName={userFullName}
                    userPhoneNumber={userPhoneNumber}
                    userimg={userimg}
                    getUserInitials={getUserInitials}
                    confirmLogout={confirmLogout}
                    setIsUserMenuOpen={setIsUserMenuOpen}
                  />
                </div>
              ) : (
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
      </div>

      <LogoutModal
        showLogoutModal={showLogoutModal}
        handleLogout={handleLogout}
        handleCloseLogoutModal={handleCloseLogoutModal}
      />

      <AuthModals
        isRegisterOpen={isRegisterOpen}
        isForgotPasswordOpen={isForgotPasswordOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onClose={() => setIsRegisterOpen(false)}
        handleRegisterSuccess={handleRegisterSuccess}
        isAuthentication={isAuthentication}
        setIsAuthentication={setIsAuthentication}
      />
    </>
  );
};

export default Header;
