import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { notification } from "antd";
import styles from "./Register.module.css";
import Validation from "../../Validation/Validation";
const Register = ({
  isAuthentication,
  setIsAuthentication,
  onClose,
  email,
  setEmail,
}) => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [roleType, setRoleType] = useState("user");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };
  const openNotification = () => {
    notification.success({
      message: "Qeydiyyat uğurlu oldu",
      description: "Təbrik edirik! Qeydiyyatdan keçdiniz. Yönlədirilirsiniz...",
      placement: "topRight",
    });
  };

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Validation(
      { fullname, phone, email, password, confirmPassword },
      "register"
    );
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setLoading(true);
      setSuccess(false);
      setErrors({});
      const [name, surname] = fullname.split(" ");
      const newUser = {
        name: name,
        email: email,
        password: password,
        phoneNumber: `+994${phone}`,
        username: "ssdsdsds",
      };

      console.log("Gönderilen veri:", newUser);

      const registerResponse = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      setLoading(false);
      if (registerResponse.ok) {
        openNotification();
        setFullname("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setProfileImage("");
        setRoleType("user");
        setIsAuthentication(true);
        onClose();
      } else {
        const errorData = await registerResponse.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error) {
      setErrors({
        general: error.message || "An error occurred during registration.",
      });
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className={styles.register}>
        <form onSubmit={handleSubmit} className={styles.register__form}>
          <div className={styles.register__fullname}>
            <h4>Ad və soyad</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faUser} />
              <input
                type="text"
                name="fullname"
                value={fullname}
                onChange={handleChange(setFullname)}
                placeholder="Ad və soyadınızı daxil edin"
              />
            </div>
            {errors.fullname && (
              <p className={styles.error}>{errors.fullname}</p>
            )}
          </div>
          <div className={styles.register__phone}>
            <h4>Telefon</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faPhone} />
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange(setPhone)}
                placeholder="Telefon nömrənizi daxil edin"
                maxLength={9}
              />
            </div>
            {errors.phone && <p className={styles.error}>{errors.phone}</p>}
          </div>
          <div className={styles.register__email}>
            <h4>E-mail</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faEnvelope} />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange(setEmail)}
                placeholder="E-mail ünvanınızı daxil edin"
              />
            </div>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>
          <div className={styles.password}>
            <h4>Şifrə</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faLock} />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange(setPassword)}
                placeholder="Şifrənizi daxil edin"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className={styles.password__toggle}
              >
                <FontAwesomeIcon icon={passwordVisible ? faEye : faEyeSlash} />
              </button>
            </div>
            {errors.password && (
              <p className={styles.error}>{errors.password}</p>
            )}
          </div>
          <div className={styles.password}>
            <h4>Şifrənizi təsdiqləyin</h4>
            <div className={styles.form__input}>
              <FontAwesomeIcon icon={faLock} />
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange(setConfirmPassword)}
                placeholder="Şifrənizi təkrar daxil edin"
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                className={styles.password__toggle}
              >
                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEye : faEyeSlash}
                />
              </button>
            </div>
            {errors.confirmPassword && (
              <p className={styles.error}>{errors.confirmPassword}</p>
            )}
          </div>
          <div className={styles.form__rules}>
            <input type="checkbox" name="rules" />
            <p>
              “Qeydiyyatdan keç” düyməsini klikləməklə siz səhifəmizin “İstifadə
              şərtləri” və məxfilik ilə razılaşırsınız.
            </p>
          </div>
          {errors.general && <p className={styles.error}>{errors.general}</p>}
          <div className={styles.form__submit}>
            {loading ? (
              <div className={styles.loader}></div>
            ) : (
              !success && <input type="submit" value="Qeydiyyat" />
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
    </div>
  );
};
export default Register;
