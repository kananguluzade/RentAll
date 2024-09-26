import React, { useState, useRef, useEffect } from "react";
import styles from "./ProductDetails.module.css";
import img from "/logo.png";
import img2 from "/logo-dark.png";
import img3 from "/heroslides/first-hero.jpg";
import img4 from "/heroslides/second-hero.jpg";
import { Carousel } from "rsuite";

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
        </div>
        <div className={styles.product__info}>
          <h1>Bonsai</h1>
          <h2>$19.99</h2>
          <div className={styles.product__desc}>
            <p>
              The purposes of bonsai are primarily contemplation for the viewer,
              and the pleasant exercise of effort and ingenuity for the grower.
            </p>
            <p>
              By contrast with other plant cultivation practices, bonsai is not
              intended for production of food or for medicine. Instead, bonsai
              practice focuses on long-term cultivation and shaping of one or
              more small trees growing in a container.
            </p>
          </div>
          <button className={styles.addToCart}>Add To Cart</button>
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
  );
};

export default ProductDetails;
