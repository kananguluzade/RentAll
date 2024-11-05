import React, { useState, useEffect } from "react";
import { Modal } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Authentication from "../Authentication/Authentication";
import ResetPassword from "../ResetPassword/ResetPassword";
import { useLocation } from "react-router-dom";
import styles from "./AuthModals.module.css";

const AuthModals = ({
  isRegisterOpen,
  isForgotPasswordOpen,
  activeTab,
  setActiveTab,
  onClose,
  handleRegisterSuccess,
  handleForgotPasswordOpen,
  handleLoginSuccess,
  isAuthentication,
  setIsAuthentication,
  isResetPasswordOpen,
  token,
}) => {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [password, setPassword] = useState("");
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(isResetPasswordOpen);

  useEffect(() => {
    if (isResetPasswordOpen) {
      setIsResetPasswordModalOpen(true);
    }
  }, [isResetPasswordOpen]);

  useEffect(() => {
    if (location.state?.openLoginModal) {
      setActiveTab("login");
    }
  }, [location]);

  const openForgotPasswordModal = () => {
    setIsForgotPasswordModalOpen(true);
  };

  const handleAuthenticationClose = () => {
    setIsAuthentication(false);
  };

  return (
    <>
      <Modal size="full" open={isRegisterOpen} onClose={onClose}>
        <Modal.Body className={`${styles.modal__form} ${activeTab}`}>
          <div className="container">
            <div className={styles.form__close}>
              <FontAwesomeIcon icon={faCircleXmark} onClick={onClose} />
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
            <Register
              onRegisterSuccess={(email, password) => {
                handleRegisterSuccess();
                setEmail(email);
                setPassword(password);
                setIsAuthentication(true);
              }}
              onClose={onClose}
              isAuthentication={isAuthentication}
              setIsAuthentication={setIsAuthentication}
              email={email}
              setEmail={setEmail}
            />
          ) : (
            <Login
              onForgotPassword={openForgotPasswordModal}
              onClose={onClose}
              onLoginSuccess={(email, password) => {
                handleLoginSuccess();
                setEmail(email);
                setPassword(password);
              }}
            />
          )}
        </Modal.Body>
      </Modal>

      <Modal size="full" open={isForgotPasswordModalOpen} onClose={onClose}>
        <Modal.Body className={styles.modal__form}>
          <ForgotPassword
            onClose={() => {
              setIsForgotPasswordModalOpen(false);
            }}
            onSwitchToLogin={() => {
              setIsForgotPasswordModalOpen(false);
              setActiveTab("login");
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="full"
        open={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
      >
        <Modal.Body className={styles.modal__form}>
          <ResetPassword
            token={token}
            onClose={() => setIsResetPasswordModalOpen(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="full"
        open={isAuthentication}
        onClose={handleAuthenticationClose}
      >
        <Modal.Body className={styles.modal__form}>
          <Authentication
            email={email}
            password={password}
            onClose={handleAuthenticationClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModals;
