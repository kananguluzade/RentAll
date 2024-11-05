import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "./AllProducts.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faTv } from "@fortawesome/free-solid-svg-icons";
import Card from "../../components/Card/Card";
import notfound from "/not-found.png";
import { Divider, Pagination } from "rsuite";

const AllProducts = () => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [cities, setCities] = useState([]);
  const [shares, setShares] = useState([]);
  const [filteredShares, setFilteredShares] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [activePage, setActivePage] = useState(1);
  const [totalShares, setTotalShares] = useState(0);
  const itemsPerPage = 5;

  const BASE_URL = import.meta.env.VITE_API_URL;

  const location = useLocation();
  const navigate = useNavigate();
  const categoryParam = new URLSearchParams(location.search).get("category");

  const categoryDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);

  const toggleCategoryDropdown = () => setIsCategoryOpen((prev) => !prev);
  const toggleCityDropdown = () => setIsCityOpen((prev) => !prev);

  useEffect(() => {
    const fetchShares = async () => {
      try {
        let response;
        if (selectedCategory) {
          response = await fetch(
            `${BASE_URL}/products/category/${selectedCategory}`
          );
        } else {
          response = await fetch(`${BASE_URL}/products/all`);
        }
        const data = await response.json();
        setShares(data);
        setFilteredShares(data);
        setTotalShares(data.length);
      } catch (error) {
        console.error("Error fetching shares:", error);
      }
    };

    fetchShares();
  }, [BASE_URL, selectedCategory]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

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
    if (categories.length > 0 && selectedCategory) {
      const category = categories.find(
        (category) => String(category.id) === String(selectedCategory)
      );
      setSelectedCategoryName(category ? category.name : "Unknown Category");
    } else {
      setSelectedCategoryName("");
    }
  }, [selectedCategory, categories]);

  useEffect(() => {
    const loadCities = () => {
      const regions = [
        "Bakı, Yasamal rayonu",
        "Bakı, Binəqədi rayonu",
        // other regions
      ];

      const bakuCity = regions.filter((region) => region.startsWith("Bakı"));
      const otherCities = regions.filter(
        (region) => !region.startsWith("Bakı")
      );

      const formattedRegions = [...bakuCity, ...otherCities].map((region) => ({
        label: region,
      }));
      setCities(
        formattedRegions.sort((a, b) => a.label.localeCompare(b.label))
      );
    };

    loadCities();
  }, []);

  useEffect(() => {
    const filterShares = () => {
      const filtered = shares.filter((share) => {
        const matchesCity = selectedCity ? share.place === selectedCity : true;
        const matchesStatus =
          selectedStatus === "Yeni"
            ? share.status === "Yeni"
            : selectedStatus === "İşlənmiş"
            ? share.status === "İşlənmiş"
            : true;

        return matchesCity && matchesStatus;
      });
      setTotalShares(filtered.length);
      const startIdx = (activePage - 1) * itemsPerPage;
      const paginatedShares = filtered.slice(startIdx, startIdx + itemsPerPage);
      setFilteredShares(paginatedShares);
    };

    filterShares();
  }, [selectedCity, selectedStatus, shares, activePage]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setSelectedCategoryName(category.name);
    setIsCategoryOpen(false);
    navigate(`/allproducts?category=${category.id}`);
  };

  return (
    <div className={styles.allproducts}>
      <div className="container">
        <div className={styles.allproducts__head}>
          <h3>
            {selectedCategoryName
              ? `“${selectedCategoryName}” üçün axtarış`
              : "Bütün Kateqoriyalar üzrə axtarış"}
          </h3>
          <p>{totalShares} elan tapıldı</p>
        </div>
        <div className={styles.allproducts__container}>
          <div className={styles.allproducts__filter}>
            <h5>Filter</h5>

            <div className={styles.status}>
              <p>Vəziyyəti</p>
              <ul>
                <li>
                  <input
                    type="radio"
                    name="status"
                    value="Yeni"
                    checked={selectedStatus === "Yeni"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  Yeni
                </li>
                <li>
                  <input
                    type="radio"
                    name="status"
                    value="İşlənmiş"
                    checked={selectedStatus === "İşlənmiş"}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  />
                  İşlənmiş
                </li>
              </ul>
            </div>

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
                <span>Kateqoriyalar</span>
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
                {categories.map((item) => (
                  <li
                    key={item.id}
                    className={styles.dropdown__item}
                    onClick={() => handleCategorySelect(item)}
                  >
                    <FontAwesomeIcon icon={faTv} />
                    {item.name}
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
                <span>Ərazi seçin</span>
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
                      setSelectedCity(item.label);
                      setIsCityOpen(false);
                    }}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.product__container}>
            <div className={styles.product__list}>
              {filteredShares.length > 0 ? (
                filteredShares.map((share) => (
                  <Link key={share.id} to={`/product/${share.id}`}>
                    <Card share={share} />
                  </Link>
                ))
              ) : (
                <div className={styles.not__found}>
                  <div className={styles.notfoun__img}>
                    <img src={notfound} alt="Not Found" />
                  </div>
                  <h3>Nəticə tapılmadı</h3>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedCity(null);
                      setSelectedStatus(null);
                    }}
                  >
                    Yenidən axtarın
                  </button>
                </div>
              )}
            </div>
            <div className={styles.pagination}>
              <Pagination
                prev
                last
                next
                first
                size="md"
                total={totalShares}
                limit={itemsPerPage}
                activePage={activePage}
                onChangePage={setActivePage}
              />
              <Divider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
