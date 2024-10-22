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
import MostLiked from "../HomePage/MostLiked/MostLiked";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [users, setUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products`);
        const data = await response.json();

        const selectedProduct = data.find((product) => product.id === id);
        setProduct(selectedProduct);

        const usersResponse = await fetch(`${BASE_URL}/users`);
        const usersData = await usersResponse.json();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching product:", error);
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

  if (!product || users.length === 0) {
    return <div>Loading...</div>;
  }

  const productOwner = users.find((user) => user.id === product.owner_id);

  const zoomProps = {
    width: 450,
    height: 360,
    zoomWidth: 500,
    zoomPosition: "original",
    img: product.otherImages[activeIndex],
  };

  return (
    <div className={styles.detail__container}>
      <div className="container">
        <div className={styles.product__detail}>
          <div className={styles.top__detail}>
            <div className={styles.product__img}>
              <div className={styles.img__sidebar}>
                {product.otherImages.map((image, index) => (
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
                  {product.otherImages.map((image, index) => (
                    <SwiperSlide key={index} className={styles.carousel__img}>
                      <ReactImageZoom
                        key={activeIndex}
                        {...zoomProps}
                        img={image}
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
                  <img src={productOwner?.profile_image} alt="" />
                  <span>{`${productOwner?.name} ${productOwner?.surname}`}</span>
                </div>
                <div className={styles.details}>
                  <h4>{product.title}</h4>
                  <ul>
                    <li>
                      <FontAwesomeIcon icon={faHouse} />
                      <p>{product.category}</p>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>{productOwner?.email}</p>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faLocationDot} />
                      <p>{product.place}</p>
                    </li>
                  </ul>
                  <button>
                    <FontAwesomeIcon icon={faPhone} />
                    Zəng et
                  </button>
                </div>
              </div>
              {/* <div className={styles.product__fav}>
              <FontAwesomeIcon icon={faHeart} />
            </div> */}
            </div>
          </div>
          <div className={styles.product__description}>
            <p>{product.content}</p>
          </div>
        </div>
        <Review productId={product.id} />
        <MostLiked />
      </div>
    </div>
  );
};

export default ProductDetails;
