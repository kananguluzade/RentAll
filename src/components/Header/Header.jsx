import React, { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Auth/Services/authContext";
import logo from "../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
  faBars,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "../Notifications/Notifications";
import styles from "./Header.module.css";
import UserMenu from "../UserMenu/UserMenu";
import AuthModals from "../Auth/AuthModals/AuthModals";
import LogoutModal from "../Auth/LogoutModal/LogoutModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [userComments, setUserComments] = useState([]);
  const [shareComments, setShareComments] = useState([]);
  const [shareProductImgs, setShareProductImgs] = useState([]);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const userFullName = `${user?.name || ""} ${user?.surname || ""}`;
  const userPhoneNumber = user?.phone_number || "";
  const userimg = user?.profile_image || "";

  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const notificationsMenuRef = useRef(null);

  const [notificationCount, setNotificationCount] = useState(
    parseInt(localStorage.getItem("notificationCount"), 10) || 0
  );

  useEffect(() => {
    const storedCount =
      parseInt(localStorage.getItem("notificationCount"), 10) || 0;
    setNotificationCount(storedCount);

    fetchUserNotifications();
    fetchUserSharesAndComments();
  }, []);

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

  const formatRelativeDate = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      const seconds = diffInSeconds;
      return `${seconds === 1 ? "1 saniyə" : seconds + " saniyə"} əvvəl`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes === 1 ? "1 dəqiqə" : minutes + " dəqiqə"} əvvəl`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours === 1 ? "1 saat" : hours + " saat"} əvvəl`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days === 1 ? "1 gün" : days + " gün"} əvvəl`;
    }
  };

  const fetchUserNotifications = () => {
    if (!user || !user.email) return;

    fetch(`http://localhost:3000/comments?creatorByEmail=${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        const readNotifications =
          JSON.parse(localStorage.getItem("readNotifications")) || {};
        const updatedUserComments = data.map((comment) => ({
          ...comment,
          read: readNotifications[comment.id] || false,
        }));

        setUserComments(updatedUserComments);
        updateNotificationCount(updatedUserComments, shareComments);
      })
      .catch((error) => console.error("Error fetching comments:", error));
  };

  const fetchUserSharesAndComments = () => {
    if (!user || !user.id) return;

    fetch(`http://localhost:3000/products?owner_id=${user.id}`)
      .then((response) => response.json())
      .then((products) => {
        const productIds = products.map((product) => product.id);
        const productImages = products.map((product) => ({
          id: product.id,
          image: product.image,
        }));

        setShareProductImgs(productImages);

        Promise.all(
          productIds.map((id) =>
            fetch(`http://localhost:3000/comments?productId=${id}`).then(
              (response) => response.json()
            )
          )
        )
          .then((commentsArray) => {
            const allComments = commentsArray.flat();
            const readNotifications =
              JSON.parse(localStorage.getItem("readNotifications")) || {};
            const updatedShareComments = allComments.map((comment) => ({
              ...comment,
              read: readNotifications[comment.id] || false,
            }));

            setShareComments(updatedShareComments);
            updateNotificationCount(userComments, updatedShareComments);
          })
          .catch((error) =>
            console.error("Error fetching comments for products:", error)
          );
      })
      .catch((error) => console.error("Error fetching products:", error));
  };

  const handleNotificationsToggle = () => {
    setIsNotificationsOpen((prev) => {
      if (prev) {
        setNotificationCount(0);
        localStorage.setItem("notificationCount", 0);
      }
      return !prev;
    });
  };

  const handleNotificationClick = (productId) => {
    const readNotifications =
      JSON.parse(localStorage.getItem("readNotifications")) || {};

    const updatedUserComments = userComments.map((comment) => {
      if (comment.productId === productId) {
        readNotifications[comment.id] = true;
        return { ...comment, read: true };
      }
      return comment;
    });

    const updatedShareComments = shareComments.map((comment) => {
      if (comment.productId === productId) {
        readNotifications[comment.id] = true;
        return { ...comment, read: true };
      }
      return comment;
    });

    localStorage.setItem(
      "readNotifications",
      JSON.stringify(readNotifications)
    );
    setUserComments(updatedUserComments);
    setShareComments(updatedShareComments);

    updateNotificationCount(updatedUserComments, updatedShareComments);

    setIsNotificationsOpen(false);
    navigate(`/product/${productId}`);
  };

  const updateNotificationCount = (userComments, shareComments) => {
    const unreadCount = [...userComments, ...shareComments].filter(
      (comment) => !comment.read
    ).length;
    setNotificationCount(unreadCount);
    localStorage.setItem("notificationCount", unreadCount);
  };

  useEffect(() => {
    fetchUserNotifications();
    fetchUserSharesAndComments();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsMenuRef.current &&
        !notificationsMenuRef.current.contains(event.target)
      ) {
        setIsNotificationsOpen(false);
      }
    };

    const handleCloseMenu = (event) => {
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
    document.addEventListener("mousedown", handleCloseMenu);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mousedown", handleCloseCategory);
      document.removeEventListener("mousedown", handleCloseMenu);
    };
  }, [isOpen, notificationsMenuRef, userMenuRef]);

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
                  <div className={styles.user__img}>
                    {userimg ? (
                      <img src={userimg} alt="User" />
                    ) : (
                      <span className={styles.user__initials}>
                        {getUserInitials()}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.header__search}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input type="text" name="search" placeholder="Axtarış..." />
            </div>

            {user ? (
              <div className={styles.user__panel}>
                <div
                  className={styles.notification__icon}
                  onClick={handleNotificationsToggle}
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.50178 17.4935H5.49451C4.74863 17.4935 4.51463 16.8404 4.5 16.5138C4.5 16.4456 4.5 16.2301 4.5 15.9143C4.5 15.5195 4.71938 15.3002 4.7925 15.2124C4.82626 15.1719 5.09963 14.8907 5.30438 14.7006C5.46818 14.5486 5.49451 14.3497 5.49451 14.2181V10.5041C5.49451 5.53025 9.77132 3.5 12.4999 3.5C15.3899 3.5 19.5053 5.8645 19.5053 10.5041C19.5053 11.669 19.5053 14.0426 19.5053 14.2181C19.5053 14.4374 19.6516 14.6275 19.6955 14.686C19.7393 14.7445 19.9148 14.8907 20.2073 15.1978C20.456 15.4588 20.4998 15.7535 20.4998 15.9143V16.5138C20.5115 17.2391 19.871 17.4935 19.5053 17.4935H15.4981M9.50178 17.4935V18.5024C9.50178 19.5549 10.3261 21.5 12.5145 21.5C15.2348 21.5 15.5127 19.1309 15.5127 18.5024L15.4981 17.4935M9.50178 17.4935H15.4981"
                      stroke="#252525"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>

                  {notificationCount > 0 && (
                    <span className={styles.notification__badge}>
                      {notificationCount}
                    </span>
                  )}
                </div>

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

      <Notifications
        isNotificationsOpen={isNotificationsOpen}
        notificationsMenuRef={notificationsMenuRef}
        userComments={userComments}
        shareComments={shareComments}
        formatRelativeDate={formatRelativeDate}
        getInitials={(name) => name.charAt(0)}
        shareProductImgs={shareProductImgs}
        user={user}
        handleNotificationClick={handleNotificationClick}
      />

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
      />
    </>
  );
};

export default Header;
