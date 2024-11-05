import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner"; // LoadingSpinner bileşenini import ettik
import styles from "./ProductDetails.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ReactImageZoom from "react-image-zoom";
import { Navigation, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faEnvelope,
  faHeart,
  faHouse,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import Review from "../Review/Review";
import MostLiked from "../HomePage/MostLiked/MostLiked";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, BASE_URL]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(activeIndex);
    }
  }, [activeIndex]);

  const handleImageChange = (index) => {
    setActiveIndex(index);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { owner, category, images } = product;

  const zoomProps = {
    width: 450,
    height: 360,
    zoomWidth: 500,
    zoomPosition: "original",
    img: images?.[activeIndex]?.path || "",
  };

  return (
    <div className={styles.detail__container}>
      <div className="container">
        <div className={styles.product__detail}>
          <div className={styles.top__detail}>
            <div className={styles.product__img}>
              <div className={styles.img__sidebar}>
                {images?.map((image, index) => (
                  <div key={index} className={styles.sidebar__img}>
                    <img
                      src={image.path}
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleImageChange(index)}
                      className={`${styles.thumbnail} ${
                        activeIndex === index ? styles.active : ""
                      }`}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.img__active}>
                <Swiper
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  ref={swiperRef}
                  spaceBetween={10}
                  pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                  }}
                  modules={[Pagination, Navigation]}
                  navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                  }}
                  loop={false}
                  initialSlide={activeIndex}
                >
                  {images?.map((image, index) => (
                    <SwiperSlide key={index} className={styles.carousel__img}>
                      <ReactImageZoom
                        key={activeIndex}
                        {...zoomProps}
                        img={image.path}
                        className={styles.carousel__img}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className={`custom-pagination`} />
                <div className={`custom-prev`}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
                <div className={`custom-next`}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              </div>
            </div>
            <div className={styles.product__info}>
              <div className={styles.info__container}>
                <div className={styles.product__author}>
                  <img src={owner?.photoUrl} alt="" />
                  <span>{`${owner?.name} ${owner?.surname}`}</span>
                </div>
                <div className={styles.details}>
                  <h4>{product.name}</h4>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faHouse} />
                      <p>{category.name}</p>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>{owner?.email}</p>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p>{product.location}</p>
                    </li>
                  </ul>
                  <button>
                    <FontAwesomeIcon icon={faPhone} />
                    {owner?.phoneNumber}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.product__description}>
            <p>{product.description}</p>
          </div>
        </div>
        <Review productId={product.id} />
        <MostLiked />
      </div>
    </div>
  );
};

export default ProductDetails;
