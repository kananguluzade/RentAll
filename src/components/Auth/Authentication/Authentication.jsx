import React, { useState } from "react";
import styles from "./Authentication.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Authentication({ email }) {
  const [values, setValues] = useState(["", "", "", ""]);

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

  return (
    <div className="container">
      <div className={styles.modal}>
        <h3>Paroluzu sıfırlayın</h3>
        <p>
          <span className={styles.verification__email}>{email} </span> ünvanına
          kod göndərdik
        </p>
        <form className={styles.forgot__form}>
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
            <input type="submit" value="Parolu sıfırlayın" />
          </div>
        </form>
        <button className={styles.return}>
          <FontAwesomeIcon icon={faAngleLeft} />
          Girişə qayıt
        </button>
      </div>
    </div>
  );
}

export default Authentication;
