import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPhone,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Register.module.css";
import Validation from "../Validation/Validation";

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [roleType, setRoleType] = useState("user");
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (setter) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = Validation(
      { fullname, phone, email, password },
      "register"
    );

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users");
      const users = await response.json();

      const emailExists = users.some((user) => user.gmail === email);
      if (emailExists) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Bu e-mail artıq istifadə olunur.",
        }));
        return;
      }

      setErrors({}); // Clear previous errors

      const [name, surname] = fullname.split(" "); // Extract name and surname
      const newUser = {
        name,
        surname,
        fullname,
        gmail: email,
        password,
        phone_number: phone,
        profile_image: profileImage || "",
        role_type: roleType,
        token: "",
        is_verified: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        uploaded_at: new Date().toISOString(),
      };

      const registerResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      if (registerResponse.ok) {
        console.log("User registered successfully:", newUser);
        setFullname("");
        setPhone("");
        setEmail("");
        setPassword("");
        setProfileImage("");
        setRoleType("user");
      } else {
        throw new Error("Failed to register user");
      }
    } catch (error) {
      setErrors({
        general: error.message || "An error occurred during registration.",
      });
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
                maxLength={10}
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

          <div className={styles.form__rules}>
            <input type="checkbox" name="rules" />
            <p>
              “Qeydiyyatdan keç” düyməsini klikləməklə siz səhifəmizin “İstifadə
              şərtləri” və məxfilik ilə razılaşırsınız.
            </p>
          </div>

          {errors.general && <p className={styles.error}>{errors.general}</p>}

          <div className={styles.form__submit}>
            <input type="submit" value="Qeydiyyat" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
