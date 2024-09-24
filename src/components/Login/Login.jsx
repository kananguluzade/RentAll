import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import styles from "./Login.module.css";

const Login = ({ onForgotPassword }) => {
  return (
    <form action="" className={styles.login__form}>
      <div className={styles.login__email}>
        <h4>E-mail</h4>
        <div className={styles.form__input}>
          <FontAwesomeIcon icon={faEnvelope} />
          <input
            type="email"
            name="email"
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
            placeholder="Şifrənizi daxil edin"
          />
        </div>
      </div>

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
  );
};

export default Login;
