import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.module.css";
import { AuthContext } from "../Services/authContext";
import Validation from "../Validation/Validation";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

const Login = ({ onForgotPassword, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "", general: "" }));
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, password: "", general: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess(false);

    const validationErrors = Validation({ email, password }, "login");

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const user = users.find((user) => user.email === email);

      if (user && user.password === password) {
        login(user);

        setTimeout(() => {
          setSuccess(true);
          setLoading(false);

          notification.success({
            message: "Uğurla Giriş Etdiniz!",
            description: "Yönləndirilirsiniz...",
            duration: 2,
          });

          setEmail("");
          setPassword("");

          setTimeout(() => {
            navigate("/");
            onClose();
          }, 2000);
        }, 2000);
      } else {
        setErrors({
          general:
            "Yanlış e-mail və ya şifrə. Zəhmət olmasa, yenidən cəhd edin.",
        });
        setLoading(false);
      }
    } catch (error) {
      setErrors({
        general:
          "Giriş edərkən bir səhv baş verdi. Zəhmət olmasa, yenidən cəhd edin.",
      });
      console.error("Giriş xətası:", error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className={styles.login__form}>
        <div className={styles.login__email}>
          <h4>E-mail</h4>
          <div className={styles.form__input}>
            <FontAwesomeIcon icon={faEnvelope} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="E-mail ünvanınızı daxil edin"
              aria-label="Email"
            />
          </div>
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        <div className={styles.password}>
          <h4>Şifrə</h4>
          <div className={styles.form__input}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Şifrənizi daxil edin"
              aria-label="Password"
            />
          </div>
          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        {errors.general && <p className={styles.error}>{errors.general}</p>}

        <div className={styles.form__save}>
          <input type="checkbox" name="rules" id="remember" />
          <label htmlFor="remember">Yadda Saxla</label>
        </div>

        <div className={styles.forgot__password}>
          <p onClick={onForgotPassword} style={{ cursor: "pointer" }}>
            Şifrənizi unutmusunuz?
          </p>
        </div>

        <div className={styles.other}>
          <h4>Və ya</h4>
        </div>

        <div className={styles.form__submit}>
          {loading ? (
            <div className={styles.loader}></div>
          ) : (
            !success && <input type="submit" value="Giriş" />
          )}
          {success && (
            <svg
              width="24"
              height="24"
              className={styles.success__icon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.5 12.2381L10 17L19.5 7"
                stroke="#FAFAFA"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
