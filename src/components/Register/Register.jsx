import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Register.module.css";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullname || !phone || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    setError("");

    console.log("Registering with:", { fullname, phone, email, password });
  };

  return (
    <div className="container">
      <div className={styles.register}>
        <form onSubmit={handleSubmit} className={styles.register__form}>
          <div className={styles.regiser__fullname}>
            <h4>Ad və soyad</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
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
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
    </div>
  );
};

export default Register;
