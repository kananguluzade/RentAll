import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./AddProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notification, Form } from "antd";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import img from "/test.png";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Services/authContext";

const AddProduct = ({ editProductInfo }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    name: editProductInfo?.name || "",
    description: editProductInfo?.description || "",
    location: editProductInfo?.location || "",
    categoryId: editProductInfo?.categoryId || "",
    isOld: editProductInfo?.isOld || false,
    categoryName: editProductInfo?.category?.name || "",
  });

  const BASE_URL = import.meta.env.VITE_API_URL;

  const [loading, setLoading] = useState(false);

  const [images, setImages] = useState(
    editProductInfo?.images?.filter((img) => img.main).map((img) => img.path) ||
      []
  );
  const [otherImages, setOtherImages] = useState(
    editProductInfo?.images
      ?.filter((img) => !img.main)
      .map((img) => img.path) || []
  );

  const categoryDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const otherFileInputRef = useRef(null);

  const [form] = Form.useForm();

  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/categories/all`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [BASE_URL]);

  useEffect(() => {
    const loadCities = () => {
      const regions = [
        "Bakı, Yasamal rayonu",
        "Bakı, Binəqədi rayonu",
        "Bakı, Nərimanov rayonu",
        "Bakı, Nəsimi rayonu",
        "Bakı, Nizami rayonu",
        "Bakı, Sabunçu rayonu",
        "Bakı, Səbail rayonu",
        "Bakı, Suraxanı rayonu",
        "Bakı, Xətai rayonu",
        "Bakı, Xəzər rayonu",
        "Bakı, Qaradağ rayonu",
        "Gəncə şəhəri",
        "Sumqayıt şəhəri",
        "Mingəçevir şəhəri",
        "Naftalan şəhəri",
        "Naxçıvan şəhəri",
        "Abşeron rayonu",
        "Ağcabədi rayonu",
        "Ağdam rayonu",
        "Ağdaş rayonu",
        "Ağstafa rayonu",
        "Astara rayonu",
        "Babək rayonu",
        "Balakən rayonu",
        "Beyləqan rayonu",
        "Bərdə rayonu",
        "Biləsuvar rayonu",
        "Cəlilabad rayonu",
        "Culfa rayonu",
        "Daşkəsən rayonu",
        "Füzuli rayonu",
        "Gədəbəy rayonu",
        "Goranboy rayonu",
        "Göygöl rayonu",
        "Göyçay rayonu",
        "Hacıqabul rayonu",
        "İmişli rayonu",
        "İsmayıllı rayonu",
        "Kəngərli rayonu",
        "Kəlbəcər rayonu",
        "Kürdəmir rayonu",
        "Laçın rayonu",
        "Lerik rayonu",
        "Lənkəran rayonu",
        "Masallı rayonu",
        "Naftalan şəhəri",
        "Naxçıvan şəhəri",
        "Neftçala rayonu",
        "Oğuz rayonu",
        "Ordubad rayonu",
        "Qax rayonu",
        "Qazax rayonu",
        "Qobustan rayonu",
        "Quba rayonu",
        "Qubadlı rayonu",
        "Qusar rayonu",
        "Sabirabad rayonu",
        "Salyan rayonu",
        "Samux rayonu",
        "Saatlı rayonu",
        "Sədərək rayonu",
        "Siyəzən rayonu",
        "Şabran rayonu",
        "Şahbuz rayonu",
        "Şamaxı rayonu",
        "Şəmkir rayonu",
        "Şəki rayonu",
        "Şəki şəhəri",
        "Şirvan şəhəri",
        "Şuşa rayonu",
        "Tərtər rayonu",
        "Tovuz rayonu",
        "Ucar rayonu",
        "Xaçmaz rayonu",
        "Xankəndi şəhəri",
        "Xızı rayonu",
        "Xocalı rayonu",
        "Xocavənd rayonu",
        "Yardımlı rayonu",
        "Yevlax şəhəri",
        "Zaqatala rayonu",
        "Zəngilan rayonu",
        "Zərdab rayonu",
      ];

      const formattedRegions = regions.map((region) => ({ label: region }));
      setCities(
        formattedRegions.sort((a, b) => a.label.localeCompare(b.label))
      );
    };

    loadCities();
  }, []);

  useEffect(() => {
    if (editProductInfo) {
      setNewProduct({
        name: editProductInfo.name || "",
        description: editProductInfo.description || "",
        location: editProductInfo.location || "",
        categoryId: editProductInfo.categoryId || "",
        isOld: editProductInfo.isOld || false,
        categoryName: editProductInfo.category?.name || "",
      });
    }
  }, [editProductInfo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setNewProduct((prev) => ({ ...prev, [name]: checked }));
    } else {
      setNewProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleOtherImageChange = (e) => {
    const files = Array.from(e.target.files);
    setOtherImages(files);
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleOtherFileInputClick = () => {
    otherFileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const productRequestBlob = new Blob(
      [
        JSON.stringify({
          name: newProduct.name,
          description: newProduct.description,
          location: newProduct.location,
          categoryId: newProduct.categoryId,
          isOld: newProduct.isOld,
        }),
      ],
      { type: "application/json" }
    );

    formData.append("productRequest", productRequestBlob);

    images.forEach((img) => formData.append("images", img));
    otherImages.forEach((img) => formData.append("images", img));

    const response = await fetch(`${BASE_URL}/products/${editProductInfo.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      notification.success({
        message: "Uğurlu",
        description: "Məhsul uğurla yeniləndi!",
      });
      setTimeout(() => navigate("/cabinet/elanlar"), 2000);
    } else {
      const errorResponse = await response.json();
      console.error("Backend error:", errorResponse);
      notification.error({
        message: "Xəta",
        description:
          errorResponse.message || "Zəhmət olmasa admin ilə əlaqə saxlayın.",
      });
    }
  };

  return (
    <div className="container">
      <div className={styles.add__product}>
        <div className={styles.product__img}>
          <div className={styles.product__main__img}>
            {images.length == 0 ? (
              <div
                className={styles.product__no__img}
                onClick={handleFileInputClick}
              >
                <h4>Fotoşəkil əlavə edin</h4>
              </div>
            ) : (
              images.map((image, index) => (
                <img
                  key={index}
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
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
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt={`Other uploaded preview ${index + 1}`}
                  className={styles.uploadedImage}
                />
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
                  <span>{newProduct.categoryName || "Kateqoriyalar"}</span>
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
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className={styles.dropdown__item}
                      onClick={() => {
                        setNewProduct((prev) => ({
                          ...prev,
                          categoryId: category.id,
                          categoryName: category.name,
                        }));
                        setIsCategoryOpen(false);
                      }}
                    >
                      {category.name}
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
                  <span>{newProduct.location || "Ərazi seçin"}</span>
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
                        setNewProduct((prev) => ({
                          ...prev,
                          location: item.label,
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
                  name="name"
                  value={newProduct.name}
                  onChange={handleChange}
                  placeholder="Xananı doldurun"
                  disabled={loading}
                />
              </div>
            </div>

            <div className={styles.product__desc}>
              <h6>Məzmun</h6>
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                placeholder="Xananı doldurun"
                disabled={loading}
              ></textarea>
            </div>

            <div className={styles.product__condition}>
              <label htmlFor="c1">Kohnedir?</label>
              <input
                id="c1"
                type="checkbox"
                name="isOld"
                checked={newProduct.isOld}
                onChange={handleChange}
              />
            </div>

            <div className={styles.product__buttons}>
              <span className={styles.save__button}>
                {loading ? (
                  <div className={styles.loader}></div>
                ) : (
                  <input type="submit" value="Yadda saxla" />
                )}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
