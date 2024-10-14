import React from "react";
import { Modal } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Register from "../Register/Register";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
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
  handleSwitchToLogin,
}) => (
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
            onRegisterSuccess={handleRegisterSuccess}
            onClose={onClose}
          />
        ) : (
          <Login
            onForgotPassword={handleForgotPasswordOpen}
            onClose={onClose}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </Modal.Body>
    </Modal>

    <Modal size="full" open={isForgotPasswordOpen} onClose={onClose}>
      <Modal.Body className={styles.modal__form}>
        <ForgotPassword
          onClose={onClose}
          onSwitchToLogin={handleSwitchToLogin}
        />
      </Modal.Body>
    </Modal>
  </>
);

export default AuthModals;
