import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null); // State for the product data
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  const images = ["/test.png", "/test.png", "/test.png", "/test.png"]; // Example images

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/db.json"); // Fetch the data
        const data = await response.json();
        const selectedProduct = data.shares.find((share) => share.id === id); // Find the product by id
        setProduct(selectedProduct); // Set the product data in the state
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(activeIndex); // Sync Swiper with active image
    }
  }, [activeIndex]);

  if (!product) {
    return <div>Loading...</div>; // Show loading state if product is not yet loaded
  }

  const props = {
    width: 450,
    height: 360,
    zoomWidth: 500,
    zoomPosition: "original",
    img: images[activeIndex],
  };

  const handleImageChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={styles.detail__container}>
      <div className="container">
        <div className={styles.product__detail}>
          <div className={styles.product__img}>
            <div className={styles.img__sidebar}>
              {images.map((image, index) => (
                <div key={index} className={styles.sidebar__img}>
                  <img
                    src={image}
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
                {images.map((image, index) => (
                  <SwiperSlide key={index} className={styles.carousel__img}>
                    <ReactImageZoom
                      {...props}
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
                <img src={product.image} alt="" />
                <span>{product.author}</span>
              </div>
              <div className={styles.details}>
                <h4>{product.description}</h4>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faHouse} />
                    <p>{product.category}</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>seyid.hüseyinov@gmail.com</p>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>Bakı, Nizami rayonu, Moskva pr.</p>
                  </li>
                </ul>
                <button>
                  <FontAwesomeIcon icon={faPhone} />
                  Zəng et
                </button>
              </div>
            </div>
            <div className={styles.product__fav}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        </div>
        <Review productId={product.id} />
      </div>
    </div>
  );
};

export default ProductDetails;
