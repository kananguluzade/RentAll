import React, { useContext, useState, useEffect } from "react";
import styles from "./Parameters.module.css";
import { AuthContext } from "../../Services/authContext";

const Parameters = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    username: user?.username || "",
    about: user?.about || "",
    profile_image: user?.profile_image || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phone_number: user.phone_number || "",
        username: user.username || "",
        about: user.about || "",
        profile_image: user.profile_image || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newProfileImage = reader.result;

        setFormData((prevData) => ({
          ...prevData,
          profile_image: newProfileImage,
        }));

        const updatedUser = {
          ...user,
          profile_image: newProfileImage,
          updated_at: new Date().toISOString(),
        };

        fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        })
          .then((res) => {
            if (!res.ok) throw new Error("Güncelleme başarısız.");
            return res.json();
          })
          .then((data) => {
            login(data);
            alert("Profil güncellendi!");
          })
          .catch((error) => console.error("Güncelleme hatası:", error));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...formData,
      updated_at: new Date().toISOString(),
    };

    fetch(`http://localhost:3000/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Güncelleme başarısız.");
        return res.json();
      })
      .then((data) => {
        login(data);
        alert("Profil güncellendi!");
        setIsEditing(false);
      })
      .catch((error) => console.error("Güncelleme hatası:", error));
  };

  const getUserInitials = () => {
    if (!user?.username) return "";
    return user.username
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  };

  return (
    <div className={styles.parameters__container}>
      <div className={styles.user__img}>
        <p>Profil şəkli</p>
        <div className={styles.add__preview}>
          {formData.profile_image ? (
            <img src={formData.profile_image} alt="User" />
          ) : (
            <span className={styles.user__initials}>{getUserInitials()}</span>
          )}
          <input
            type="file"
            onChange={handleImageChange}
            id="files"
            className="hidden"
          />
          <label htmlFor="files">Fayıl seçin</label>
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.form__container}>
        <div className={styles.form__head}>
          <div className={styles.email}>
            <h4>E-mailiniz</h4>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className={styles.phone}>
            <h4>Telefonunuz</h4>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>
        <div className={styles.fullname}>
          <h4>Adınız və soyadınız</h4>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.about}>
          <h4>Haqqınızda</h4>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Haqqınızda qısa bir məlumat yazın..."
          />
        </div>
        <div className={styles.form__submit}>
          {isEditing ? (
            <div className={styles.form__save}>
              <input type="submit" value="Yadda saxla" />
              <p onClick={() => setIsEditing(false)}>Ləğv Elə</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={styles.edit__btn}
            >
              Redaktə et
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Parameters;
