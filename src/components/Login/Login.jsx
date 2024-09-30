import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { loginUser as loginService } from "../Services/authService";
import styles from "./Login.module.css";
import { AuthContext } from "../Services/authContext";

const Login = ({ onForgotPassword, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    try {
      const user = await loginService(email, password);
      login(user);
      onClose();
      setEmail("");
      setPassword("");
    } catch (error) {
      setError(error.message || "An error occurred during login.");
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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail ünvanınızı daxil edin"
              aria-label="Email"
              required
            />
          </div>
        </div>

        <div className={styles.password}>
          <h4>Şifrə</h4>
          <div className={styles.form__input}>
            <FontAwesomeIcon icon={faLock} />
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrənizi daxil edin"
              aria-label="Password"
              required
            />
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

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
          <input type="submit" value="Giriş" />
        </div>
      </form>
    </div>
  );
};

export default Login;
