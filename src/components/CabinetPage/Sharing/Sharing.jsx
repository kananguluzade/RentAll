import React, { useEffect, useState, useContext } from "react";
import styles from "./Sharing.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "rsuite";
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

  const token = localStorage.getItem("token");

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

  const handleDelete = (shareId) => {
    setDeleteProductId(shareId);
    setShowModal(true);
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
        throw new Error("Failed to delete the product");
      }

      setSharedProducts((prev) =>
        prev.filter((product) => product.id !== deleteProductId)
      );
      console.log("Deleted product ID:", deleteProductId);
    } catch (error) {
      console.error("Error deleting product:", error);
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
          <FontAwesomeIcon icon={faChevronLeft} /> geriye qayit
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
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xs">
        <Modal.Header>
          <Modal.Title>Onayla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bu ürünü silmek istediğinize emin misiniz?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowModal(false)} appearance="subtle">
            İptal
          </Button>
          <Button onClick={confirmDelete} appearance="primary" color="red">
            Sil
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sharing;
