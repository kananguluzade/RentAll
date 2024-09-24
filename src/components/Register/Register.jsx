import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Register.module.css";

const Register = () => {
  return (
    <>
      <div className={styles.register}>
        <form action="" className={styles.register__form}>
          <div className={styles.regiser__fullname}>
            <h4>Ad və soyad</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                name="fullname"
                placeholder="Ad və soyadınızı daxil edin"
              />
            </div>
          </div>

          <div className={styles.regiser__phone}>
            <h4>Telefon</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faPhone} />
              <input
                type="text"
                name="phone"
                placeholder="Telefon nömrənizi daxil edin"
              />
            </div>
          </div>

          <div className={styles.regiser__email}>
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

          <div className={styles.form__rules}>
            <input type="checkbox" name="rules" />
            <p>
              “Qeydiyyatdan keç” düyməsini klikləməklə siz səhifəmizin “İstifadə
              şərtləri” və məxfilik ilə razılaşırsınız.
            </p>
          </div>

          <div className={styles.form__submit}>
            <input type="submit" value="Qeydiyyat" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
