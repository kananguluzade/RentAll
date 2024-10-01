import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AddProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faHouse,
  faCar,
  faGamepad,
  faFutbol,
  faStore,
  faTv,
  faCamera,
  faCashRegister,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../components/Services/authContext";
import img from "/test.png";

const AddProduct = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const [shares, setShares] = useState([]);
  const [newShare, setNewShare] = useState({
    id: "",
    category: "",
    title: "",
    place: "",
    author_phone: "",
    image: "",
    image2: "",
    image3: "",
    image4: "",
    content: "",
  });

  const [images, setImages] = useState([]);
  const [otherImages, setOtherImages] = useState([]);

  const categoryDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const otherFileInputRef = useRef(null);

  const toggleCategoryDropdown = () => setIsCategoryOpen((prev) => !prev);
  const toggleCityDropdown = () => setIsCityOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false);
      }
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setIsCityOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = [
    { label: "Evlər və mənzillər", icon: faHouse },
    { label: "Avtomobillər", icon: faCar },
    { label: "Əyləncə", icon: faGamepad },
    { label: "İdman", icon: faFutbol },
    { label: "Ticarət sahələri", icon: faStore },
    { label: "Elektronika", icon: faTv },
    { label: "Məişət texnikası", icon: faCashRegister },
    { label: "Tədbir avadanlığı", icon: faCamera },
  ];

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://api.opendata.az/v2/az/json/map/geographic/district"
        );
        const data = await response.json();
        const districts = data.districts
          .map((district) => ({ label: district.name }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCities(districts);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await fetch("http://localhost:3000/shares");
        const data = await response.json();
        setShares(data || []);
      } catch (error) {
        console.error("Error fetching shares:", error);
      }
    };
    fetchShares();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewShare((prev) => ({ ...prev, [name]: value }));
  };

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      for (let i = 0; i < newImages.length && i < 4; i++) {
        updatedImages[i] = newImages[i];
      }
      return updatedImages;
    });

    setNewShare((prev) => ({
      ...prev,
      image: newImages[0] || "",
      image2: newImages[1] || "",
      image3: newImages[2] || "",
      image4: newImages[3] || "",
    }));
  };

  const handleOtherImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newOtherImages = files.map((file) => URL.createObjectURL(file));

    setOtherImages((prevImages) => {
      const updatedImages = [...prevImages];
      for (
        let i = 0;
        i < newOtherImages.length && updatedImages.length < 4;
        i++
      ) {
        updatedImages.push(newOtherImages[i]);
      }
      return updatedImages.slice(0, 4);
    });
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleOtherFileInputClick = () => {
    otherFileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newId = (shares.length + 1).toString();
    const newEntry = {
      ...newShare,
      id: newId,
      otherImages: otherImages,
      author: user.username,
      authorImg: user.profile_image,
    };

    try {
      const response = await fetch("http://localhost:3000/shares", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (response.ok) {
        const savedEntry = await response.json();
        setShares((prev) => [...prev, savedEntry]);
        setNewShare({
          id: "",
          category: "",
          title: "",
          place: "",
          author_phone: "",
          image: "/logo.png",
          content: "",
        });
        setImages([]);
        setOtherImages([]);
      } else {
        console.error("Error saving new share");
      }
    } catch (error) {
      console.error("Error saving share:", error);
    }
  };

  return (
    <div className="container">
      <div className={styles.tutorial__container}>
        <div className={styles.tutorial__text}>
          <h4>Necə istifadə etməli?</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua.
          </p>
        </div>
        <div className={styles.tutorial__video}>
          <img src={img} alt="" />
        </div>
      </div>
      <div className={styles.add__product}>
        <div className={styles.product__img}>
          <div className={styles.product__main__img}>
            {images.length === 0 ? (
              <div
                className={styles.product__no__img}
                onClick={handleFileInputClick}
              >
                <svg
                  width="100"
                  height="92"
                  viewBox="0 0 100 92"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.59766 22.4347C6.59766 18.7905 9.55185 15.8364 13.196 15.8364H25.9145C27.8446 15.8364 29.678 14.9913 30.9316 13.5237L34.8717 8.91125C36.1254 7.44371 37.9587 6.59863 39.8888 6.59863H59.9375C61.9661 6.59863 63.882 7.53176 65.1327 9.12895L68.4035 13.306C69.6542 14.9032 71.5701 15.8364 73.5987 15.8364H86.8025C90.4467 15.8364 93.4009 18.7905 93.4009 22.4347V79.1808C93.4009 82.8249 90.4467 85.7791 86.8025 85.7791H13.196C9.55185 85.7791 6.59766 82.8249 6.59766 79.1807V22.4347Z"
                    fill="#585A5C"
                  />
                  <path
                    d="M71.9223 48.8283C71.9223 60.8541 62.1735 70.603 50.1477 70.603C38.1219 70.603 28.373 60.8541 28.373 48.8283C28.373 36.8025 38.1219 27.0537 50.1477 27.0537C62.1735 27.0537 71.9223 36.8025 71.9223 48.8283ZM35.6967 48.8283C35.6967 56.8094 42.1666 63.2794 50.1477 63.2794C58.1287 63.2794 64.5987 56.8094 64.5987 48.8283C64.5987 40.8473 58.1287 34.3773 50.1477 34.3773C42.1666 34.3773 35.6967 40.8473 35.6967 48.8283Z"
                    fill="#FAFAFA"
                  />
                </svg>

                <h4>Fotoşəkil əlavə edin</h4>
              </div>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded preview ${index + 1}`}
                  className={styles.uploadedImage}
                />
              ))
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleMainImageChange}
              className={styles.imageInput}
              style={{ display: "none" }}
            />
          </div>
          <div className={styles.product__img__sidebar}>
            <div
              className={styles.product__img__other}
              onClick={handleOtherFileInputClick}
            >
              {otherImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Other uploaded preview ${index + 1}`}
                  className={styles.uploadedImage}
                />
              ))}
              {otherImages.length < 4 &&
                [...Array(4 - otherImages.length)].map((_, index) => (
                  <div key={index} className={styles.placeholderImage}>
                    <svg
                      width="100"
                      height="92"
                      viewBox="0 0 100 92"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6.59766 22.4347C6.59766 18.7905 9.55185 15.8364 13.196 15.8364H25.9145C27.8446 15.8364 29.678 14.9913 30.9316 13.5237L34.8717 8.91125C36.1254 7.44371 37.9587 6.59863 39.8888 6.59863H59.9375C61.9661 6.59863 63.882 7.53176 65.1327 9.12895L68.4035 13.306C69.6542 14.9032 71.5701 15.8364 73.5987 15.8364H86.8025C90.4467 15.8364 93.4009 18.7905 93.4009 22.4347V79.1808C93.4009 82.8249 90.4467 85.7791 86.8025 85.7791H13.196C9.55185 85.7791 6.59766 82.8249 6.59766 79.1807V22.4347Z"
                        fill="#585A5C"
                      />
                      <path
                        d="M71.9223 48.8283C71.9223 60.8541 62.1735 70.603 50.1477 70.603C38.1219 70.603 28.373 60.8541 28.373 48.8283C28.373 36.8025 38.1219 27.0537 50.1477 27.0537C62.1735 27.0537 71.9223 36.8025 71.9223 48.8283ZM35.6967 48.8283C35.6967 56.8094 42.1666 63.2794 50.1477 63.2794C58.1287 63.2794 64.5987 56.8094 64.5987 48.8283C64.5987 40.8473 58.1287 34.3773 50.1477 34.3773C42.1666 34.3773 35.6967 40.8473 35.6967 48.8283Z"
                        fill="#FAFAFA"
                      />
                    </svg>
                  </div>
                ))}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={otherFileInputRef}
              onChange={handleOtherImageChange}
              multiple
              className={styles.imageInput}
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className={styles.product__info}>
          <form onSubmit={handleSubmit}>
            <div className={styles.select__options}>
              <div
                className={styles.category__dropdown}
                ref={categoryDropdownRef}
              >
                <label
                  className={`${styles.dropdown__label} ${
                    isCategoryOpen ? styles.active : ""
                  }`}
                  onClick={toggleCategoryDropdown}
                >
                  <span>{newShare.category || "Kateqoriyalar"}</span>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`${
                      isCategoryOpen
                        ? styles.icon__rotate__true
                        : styles.icon__rotate__false
                    }`}
                  />
                </label>
                <ul
                  className={`${styles.dropdown__menu} ${
                    isCategoryOpen ? styles.show : ""
                  }`}
                >
                  {categories.map((item, index) => (
                    <li
                      key={index}
                      className={styles.dropdown__item}
                      onClick={() => {
                        setNewShare((prev) => ({
                          ...prev,
                          category: item.label,
                        }));
                        setIsCategoryOpen(false);
                      }}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cities__dropdown} ref={cityDropdownRef}>
                <label
                  className={`${styles.dropdown__label} ${
                    isCityOpen ? styles.active : ""
                  }`}
                  onClick={toggleCityDropdown}
                >
                  <span>{newShare.place || "Ərazi seçin"}</span>
                  <FontAwesomeIcon
                    icon={faAngleDown}
                    className={`${
                      isCityOpen
                        ? styles.icon__rotate__true
                        : styles.icon__rotate__false
                    }`}
                  />
                </label>
                <ul
                  className={`${styles.dropdown__menu} ${
                    isCityOpen ? styles.show : ""
                  }`}
                >
                  {cities.map((item, index) => (
                    <li
                      key={index}
                      className={styles.dropdown__item}
                      onClick={() => {
                        setNewShare((prev) => ({
                          ...prev,
                          place: item.label,
                        }));
                        setIsCityOpen(false);
                      }}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.product__head}>
              <div className={styles.product__title}>
                <h6>Elanın adı</h6>
                <input
                  type="text"
                  name="title"
                  value={newShare.title}
                  onChange={handleChange}
                  placeholder="Xananı doldurun"
                  required
                />
              </div>
              <div className={styles.product__phone}>
                <h6>Telefon</h6>
                <input
                  type="text"
                  name="author_phone"
                  value={newShare.author_phone}
                  onChange={handleChange}
                  placeholder="Xananı doldurun"
                  required
                />
              </div>
            </div>

            <div className={styles.product__desc}>
              <h6>Məzmun</h6>
              <textarea
                name="content"
                value={newShare.content}
                onChange={handleChange}
                placeholder="Xananı doldurun"
                required
              ></textarea>
            </div>

            <div className={styles.product__buttons}>
              <input
                type="button"
                value="Redaktə et"
                className={styles.edited__button}
              />
              <input
                type="submit"
                className={styles.save__button}
                value="Yadda saxla"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
