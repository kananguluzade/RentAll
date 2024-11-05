import React, { useContext, useState, useEffect } from "react";
import styles from "./Parameters.module.css";
import { notification } from "antd";
import { AuthContext } from "../../Auth/Services/authContext";

const Parameters = () => {
  const { user, login } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    name: user?.name || "",
    surname: user?.surname || "",
    username: user?.username || "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        name: user.name || "",
        surname: user.surname || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email || !formData.phoneNumber || !formData.name) {
      openNotification("error", "Bütün sahələr doldurulmalıdır.");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append(
        "request",
        new Blob(
          [
            JSON.stringify({
              email: formData.email,
              phoneNumber: formData.phoneNumber,
              name: formData.name,
              surname: formData.surname,
              username: formData.username,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (selectedImage) {
        data.append("image", selectedImage);
      }

      const res = await fetch(`${BASE_URL}/users/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error response:", errorText);
        openNotification(
          "error",
          errorText || "Yeniləmə zamanı səhv baş verdi."
        );
        throw new Error("Unexpected server response format.");
      }

      try {
        const responseData = await res.json();
        login(responseData);
        openNotification("success", "Profil uğurla yeniləndi!");
        setIsEditing(false);
      } catch (error) {
        openNotification("success", "Profil uğurla yeniləndi!");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update error:", error);
      openNotification(
        "error",
        error.message || "Yeniləmə zamanı səhv baş verdi."
      );
    } finally {
      setLoading(false);
    }
  };

  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 2,
    });
  };

  return (
    <div className={styles.parameters__container}>
      <div className={styles.user__img}>
        <p>Profile Image</p>
        <div className={styles.add__preview}>
          {selectedImage ? (
            <img src={URL.createObjectURL(selectedImage)} alt="User" />
          ) : user?.photoUrl ? (
            <img src={user.photoUrl} alt="User" />
          ) : (
            <span className={styles.user__initials}>
              {`${user?.name?.[0] || ""}${user?.surname?.[0] || ""}`}
            </span>
          )}
          <input
            type="file"
            onChange={handleImageChange}
            id="files"
            className="hidden"
          />
          <label htmlFor="files">Select File</label>
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
              name="phoneNumber"
              value={formData.phoneNumber}
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
        <div className={styles.about}>
          <h4>Haqqınızda</h4>
          <textarea
            name="about"
            value={formData.about || ""}
            onChange={handleInputChange}
            disabled={!isEditing}
            placeholder="Write a short description about yourself..."
          />
        </div>
        <div className={styles.form__submit}>
          {isEditing ? (
            <div className={styles.form__save}>
              <input type="submit" value="Save" />
              <p onClick={() => setIsEditing(false)}>Cancel</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className={styles.edit__btn}
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Parameters;
