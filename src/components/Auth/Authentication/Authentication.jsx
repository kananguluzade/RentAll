import React, { useContext, useState } from "react";
import styles from "./Authentication.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { notification } from "antd";
import { AuthContext } from "../Services/authContext";

function Authentication({ email, password, onClose }) {
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleChange = (index, e) => {
    const newValue = e.target.value;
    if (/^\d?$/.test(newValue)) {
      const updatedValues = [...values];
      updatedValues[index] = newValue;
      setValues(updatedValues);
      if (newValue && index < values.length - 1) {
        document.getElementById(`input-${index + 1}`).disabled = false;
        document.getElementById(`input-${index + 1}`).focus();
      } else if (!newValue && index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !values[index] && index > 0) {
      document.getElementById(`input-${index - 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = values.join("");

    if (verificationCode.length !== 4) {
      notification.error({
        message: "Kod Tam Deyil",
        description: "Zəhmət olmasa, 4 rəqəmli təsdiq kodunu daxil edin.",
      });
      return;
    }

    setLoading(true);

    try {
      const verifyResponse = await fetch(`${BASE_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, verificationCode }),
      });

      if (verifyResponse.ok) {
        notification.success({
          message: "Təsdiq Uğurla Tamamlandı",
          description: "Təsdiq kodu uğurla qəbul edildi.",
        });

        const loginResponse = await fetch(`${BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (loginResponse.ok) {
          const loginData = await loginResponse.json();
          login({ token: loginData.token });
          onClose();
        } else {
          const loginError = await loginResponse.json();
          notification.error({
            message: "Login Xətası",
            description: loginError.message || "Giriş uğursuz oldu.",
          });
        }
      } else {
        const errorData = await verifyResponse.json();
        notification.error({
          message: "Təsdiq Xətası",
          description:
            errorData.message || "Kod təsdiqlənmədi. Yenidən cəhd edin.",
        });
      }
    } catch (error) {
      notification.error({
        message: "Bağlantı Xətası",
        description: "Bir xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.modal}>
        <h3>Emailinizi təsdiqləyin</h3>
        <p>
          <span className={styles.verification__email}>{email} </span> ünvanına
          kod göndərdik
        </p>
        <form onSubmit={handleSubmit} className={styles.forgot__form}>
          <div className={styles.forgot__header}>
            <div className={styles.form__input}>
              {values.map((value, index) => (
                <input
                  key={index}
                  id={`input-${index}`}
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(index, e)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  disabled={index !== 0 && !values[index - 1]}
                  style={{ width: "30px", marginRight: "5px" }}
                />
              ))}
            </div>
          </div>
          <div className={styles.form__submit}>
            <button type="submit" disabled={loading}>
              {loading ? "Yüklənir..." : "Doğrula"}
            </button>
          </div>
        </form>
        <button onClick={onClose} className={styles.return}>
          <FontAwesomeIcon icon={faAngleLeft} />
          Girişə qayıt
        </button>
      </div>
    </div>
  );
}

export default Authentication;
