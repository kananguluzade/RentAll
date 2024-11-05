import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styles from "./Search.module.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `${BASE_URL}/products/search?name=${searchTerm.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setIsSearching(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, BASE_URL]);

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={styles.searchComponent}>
      <div className={styles.header__search}>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className={styles.searchIcon}
        />
        <input
          type="text"
          name="search"
          placeholder="Axtarış..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className={styles.searchInput}
        />
      </div>
      <div className={styles.search__results}>
        {isSearching && <div className={styles.loading}>Axtarılır...</div>}
        {!isSearching && searchTerm && searchResults.length === 0 && (
          <div className={styles.noResults}>
            <p>Axtarışınıza uyğun nəticə tapılmadı</p>
          </div>
        )}
        {searchResults.length > 0 && (
          <ul className={styles.searchResults}>
            {searchResults.map((product) => (
              <li>
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={styles.searchResultItem}
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
