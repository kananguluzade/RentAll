import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = ({ onClose, onSwitchToLogin }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${BASE_URL}/auth/update-password?email=${encodeURIComponent(email)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setMessage(
          "Şifrə yeniləmə linki e-mail ünvanınıza göndərildi. Zəhmət olmasa, e-poçtunuzu yoxlayın."
        );
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            "Bir səhv baş verdi. Zəhmət olmasa, yenidən cəhd edin."
        );
      }
    } catch (err) {
      setError(
        "Şifrə sıfırlama sırasında bir səhv baş verdi. Zəhmət olmasa, yenidən cəhd edin."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
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
            <input
              type="submit"
              value={loading ? "Göndərilir..." : "Davam edin"}
              disabled={loading}
            />
          </div>
        </form>
        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}
        <button
          className={styles.return}
          onClick={() => {
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
