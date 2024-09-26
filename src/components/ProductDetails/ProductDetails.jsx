import React, { useState, useRef, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import img from "/test.png";
import img2 from "/test.png";
import img3 from "/test.png";
import img4 from "/test.png";
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

const ProductDetails = () => {
  const images = [img, img2, img3, img4];
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

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

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(activeIndex);
    }
  }, [activeIndex]);

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
                <img src={img} alt="" />
                <span>Seyid Hüseyinov</span>
              </div>
              <div className={styles.details}>
                <h4>Kirayə ev</h4>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faHouse} />
                    <p>Evlər və mənzillər</p>
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
        <div className={styles.product__comments}>
          <div className={styles.comment}></div>
          <div className={styles.comment}></div>
        </div>
        <div className={styles.similar__products}>
          <div className={styles.similar__product}></div>
          <div className={styles.similar__product}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
