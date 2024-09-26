import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.module.css";

const Login = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
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
    console.log("Logging in with:", { email, password });
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
            />
          </div>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.form__save}>
          <input type="checkbox" name="rules" />
          <p>Yadda Saxla</p>
        </div>

        <div className={styles.forgot__password}>
          <p onClick={onForgotPassword}>Şifrənizi unutmusunuz?</p>
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
