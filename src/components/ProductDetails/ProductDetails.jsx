import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import img from "/logo.png";
import img2 from "/logo-dark.png";
import img3 from "/heroslides/first-hero.jpg";
import img4 from "/heroslides/second-hero.jpg";
import { Carousel } from "rsuite";
import Review from "../Review/Review";

const ProductDetails = () => {
  const images = [img, img2, img3, img4];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageChange = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="container">
      <div className={styles.product__details}>
        <div className={styles.product__img}>
          <div className={styles.img__sidebar}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => handleImageChange(index)}
                className={styles.thumbnail}
              />
            ))}
          </div>
          <div className={styles.img__active}>
            <Carousel
              className="custom-slider"
              activeIndex={activeIndex}
              onSelect={(index) => setActiveIndex(index)}
            >
              {images.map((image, index) => (
                <img key={index} src={image} alt={`Slide ${index + 1}`} />
              ))}
            </Carousel>
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
        <Review/>
      </div>
      <div className={styles.similar__products}>
        <div className={styles.similar__product}></div>
        <div className={styles.similar__product}></div>
      </div>
    </div>
  );
};

export default ProductDetails;
