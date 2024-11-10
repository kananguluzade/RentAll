import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import styles from "./AllProducts.module.css";
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
  const [selectedCityName, setSelectedCityName] = useState("");
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
        const response = await fetch(`${BASE_URL}/products/all`);
        const data = await response.json();
        setShares(data);
        setFilteredShares(data);
        setTotalShares(data.length);
      } catch (error) {
        console.error("Error fetching shares:", error);
      }
    };

    fetchShares();
  }, [BASE_URL]);

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
        const matchesCategory = selectedCategory
          ? share.categoryId === parseInt(selectedCategory)
          : true;
        const matchesCity = selectedCity ? share.place === selectedCity : true;
        const matchesStatus =
          selectedStatus === "Yeni"
            ? share.status === "Yeni"
            : selectedStatus === "İşlənmiş"
            ? share.status === "İşlənmiş"
            : true;

        return matchesCategory && matchesCity && matchesStatus;
      });
      setTotalShares(filtered.length);
      const startIdx = (activePage - 1) * itemsPerPage;
      const paginatedShares = filtered.slice(startIdx, startIdx + itemsPerPage);
      setFilteredShares(paginatedShares);
    };

    filterShares();
  }, [selectedCategory, selectedCity, selectedStatus, shares, activePage]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category.id);
    setSelectedCategoryName(category.name);
    setIsCategoryOpen(false);
    navigate(`/allproducts?category=${category.id}`);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city.label);
    setSelectedCityName(city.label);
    setIsCityOpen(false);
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
                <span>
                  {selectedCategoryName
                    ? selectedCategoryName
                    : "Kateqoriyalar"}
                </span>
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
                <span>
                  {selectedCityName ? selectedCityName : "Ərazi seçin"}
                </span>
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
                    onClick={() => handleCitySelect(item)}
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
                      setSelectedCategoryName("Kateqoriyalar");
                      setSelectedCity(null);
                      setSelectedCityName("Ərazi seçin");
                      setSelectedStatus(null);
                      setActivePage(1);
                      setFilteredShares(shares);
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
