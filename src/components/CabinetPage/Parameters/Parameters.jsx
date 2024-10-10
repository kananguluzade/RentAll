import React, { useContext, useState, useEffect } from "react";
import styles from "./Parameters.module.css";
import { AuthContext } from "../../Services/authContext";
import { notification } from "antd";

const Parameters = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phone_number: user?.phone_number || "",
    name: user?.name || "",
    surname: user?.surname || "",
    about: user?.about || "",
    profile_image: user?.profile_image || "",
    fullname: `${user?.name || ""} ${user?.surname || ""}`.trim(),
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phone_number: user.phone_number || "",
        name: user.name || "",
        surname: user.surname || "",
        about: user.about || "",
        profile_image: user.profile_image || "",
        fullname: `${user.name || ""} ${user.surname || ""}`.trim(),
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      updatedData.fullname =
        `${updatedData.name} ${updatedData.surname}`.trim();
      return updatedData;
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "sharecare");

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/difymycwt/image/upload`,
          {
            method: "POST",
            body: imageData,
          }
        );

        if (!res.ok) throw new Error("Resim yükleme başarısız.");

        const data = await res.json();
        const newProfileImage = data.secure_url;

        setFormData((prevData) => ({
          ...prevData,
          profile_image: newProfileImage,
        }));

        const updatedUser = {
          ...user,
          profile_image: newProfileImage,
          updated_at: new Date().toISOString(),
        };

        await fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedUser),
        });

        login(updatedUser);
        openNotification("success", "Profil şəkli güncellenmişdir!");
      } catch (error) {
        console.error("Güncelleme hatası:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      ...user,
      ...formData,
      updated_at: new Date().toISOString(),
    };

    try {
      const res = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Yeniləmə uğursuz oldu.");
      const data = await res.json();
      login(data);
      openNotification("success", "Profiliniz uğurla yeniləndi!");
      setIsEditing(false);
    } catch (error) {
      console.error("Yeniləmə xətası:", error);
      openNotification("error", "Yeniləmə zamanı xəta baş verdi.");
    }
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 2,
    });
  };

  const getUserInitials = () => {
    const [first, last] = [user?.name || "", user?.surname || ""];
    return `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`;
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
        <div className={styles.name}>
          <h4>Adınız</h4>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </div>
        <div className={styles.surname}>
          <h4>Soyadınız</h4>
          <input
            type="text"
            name="surname"
            value={formData.surname}
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
