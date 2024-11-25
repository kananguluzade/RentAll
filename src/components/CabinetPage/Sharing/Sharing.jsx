import React, { useEffect, useState, useContext } from "react";
import styles from "./Sharing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "rsuite";

import { AuthContext } from "../../Auth/Services/authContext";
import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import AddorEditProduct from "../../../pages/AddProduct/AddorEditProduct";

const Sharing = () => {
  const { user } = useContext(AuthContext);
  const [sharedProducts, setSharedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(false);
  const [editProductInfo, setEditProductInfo] = useState({});
  const [isEditProductId, setIsEditProductId] = useState(null);

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSharedProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/user/${user.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch shared products");
        }
        const data = await response.json();
        setSharedProducts(data);
      } catch (error) {
        console.error("Error fetching shared products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchSharedProducts();
    }
  }, [user, BASE_URL]);

  const handleDelete = (shareId) => {
    setDeleteProductId(shareId);
    setShowModal(true);
  };

  const handleEdit = async (shareId) => {
    setEditProduct(true);
    try {
      const response = await fetch(`${BASE_URL}/products/${shareId}`, {
        method: "GET",
      });
      const data = await response.json();
      setEditProductInfo(data);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products/${deleteProductId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error detail:", errorData);
        throw new Error(
          `Failed to delete the product. Status: ${response.status}, Message: ${
            errorData.message || "Unknown error"
          }`
        );
      }

      setSharedProducts((prev) =>
        prev.filter((product) => product.id !== deleteProductId)
      );
    } catch (error) {
      console.error("Error deleting product:", error.message);
    } finally {
      setShowModal(false);
      setDeleteProductId(null);
    }
  };

  if (editProduct) {
    return (
      <div>
        <button
          className={styles.previous__button}
          onClick={() => setEditProduct(false)}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Geriyə Qayıt
        </button>

        <AddorEditProduct editProductInfo={editProductInfo} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (sharedProducts.length === 0) {
    return (
      <div className={styles.noProducts}>Hələ paylaşılan məhsul yoxdur.</div>
    );
  }

  return (
    <div className={styles.share}>
      {sharedProducts.map((share) => (
        <div key={share.id} className={styles.share__card}>
          <div className={styles.share__img}>
            <img
              src={
                share.images && share.images.length > 0
                  ? share.images[0].path
                  : "defaultImagePath.jpg"
              }
              alt={share.description}
            />
          </div>
          <div className={styles.share__desc}>
            <div className={styles.share__place}>
              <h6>{share.location}</h6>
            </div>
            <div className={styles.share__info}>
              <p>{share.category.name}</p>
              <p>{share.name}</p>
            </div>
            <div className={styles.share__buttons}>
              <button onClick={() => handleEdit(share.id)}>Düzenle</button>
              <button onClick={() => handleDelete(share.id)}>Sil</button>
            </div>
          </div>
        </div>
      ))}

      <Modal
        className={styles.remove__modal}
        open={showModal}
        onHide={() => setShowModal(false)}
        backdrop="static"
      >
        <Modal.Body>
          <div className={styles.remove__container}>
            <div className={styles.remove__title}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 8V12.5M12 3.5C8 3.5 3.5 6.5 3.5 12C3.5 17.5 8 20.5 12 20.5C16 20.5 20.5 17.5 20.5 12C20.5 6.5 16 3.5 12 3.5ZM12 15C11.8333 15 11.5 15.1 11.5 15.5C11.5 15.9 11.8333 16 12 16C12.1667 16 12.5 15.9 12.5 15.5C12.5 15.1 12.1667 15 12 15Z"
                  stroke="#FAFAFA"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <h5>Silmək istədiyinizə əminsiniz?</h5>
            </div>
            <div className={styles.remove__submit}>
              <button
                onClick={() => setShowModal(false)}
                className={styles.cancel__button}
              >
                Xeyr
              </button>
              <button onClick={confirmDelete} className={styles.remove__button}>
                Bəli
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Sharing;
