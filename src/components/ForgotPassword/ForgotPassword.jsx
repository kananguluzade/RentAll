import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot password for:", email);
    onClose();
  };

  return (
    <div className="container">
      <div className={styles.modal}>
        <h3>Şifrənizi unutmusunuz?</h3>
        <form onSubmit={handleSubmit} className={styles.forgot__form}>
          <div className={styles.forgot__header}>
            <h4>E-mail</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail ünvanınızı daxil edin"
                required
              />
            </div>
          </div>
          <div className={styles.form__submit}>
            <input type="submit" value="Davam edin" />
          </div>
        </form>
        <button
          className={styles.return}
          onClick={() => {
            onClose();
            onSwitchToLogin();
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
          Girişə qayıt
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
