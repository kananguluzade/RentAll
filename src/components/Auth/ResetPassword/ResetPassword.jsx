import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import styles from "./ResetPassword.module.css";

const ResetPassword = ({ token, onClose, onSuccess }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Şifrələr uyğun gəlmir. Zəhmət olmasa, yenidən daxil edin.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/auth/reset-password?token=${encodeURIComponent(token)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (response.ok) {
        notification.success({
          message: "Şifrə uğurla yeniləndi",
          description: "Ana səhifəyə yönləndirilirsiniz...",
          duration: 2,
        });

        setTimeout(() => {
          navigate("/", { state: { openLoginModal: true } });
        }, 2000);

        if (onSuccess) {
          onSuccess();
        }
      } else {
        const errorData = await response.json();
        setError(
          errorData.message ||
            "Bir səhv baş verdi. Zəhmət olmasa, yenidən cəhd edin."
        );
      }
    } catch (err) {
      setError(
        "Şifrə yeniləmə zamanı bir səhv baş verdi. Zəhmət olmasa, yenidən cəhd edin."
      );
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.modal}>
        <div className={styles.modal__title}>
          <h3>Yeni parol təyin edin</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.reset__form}>
          <div className={styles.password__input}>
            <p>Parol</p>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Yeni şifrənizi daxil edin"
                required
              />
            </div>
          </div>
          <div className={styles.password__input}>
            <p>Parolu təsdiqləyin</p>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faLock} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Yeni şifrənizi təsdiqləyin"
                required
              />
            </div>
          </div>
          <div className={styles.form__submit}>
            <input
              type="submit"
              value={loading ? "Yenilənir..." : "Yenilə"}
              disabled={loading}
            />
          </div>
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
