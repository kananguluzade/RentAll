import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import styles from "./Hero.module.css";

const Hero = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setSlides(data.heroSlides);
      } catch (error) {
        console.error("Error fetching hero slides:", error);
      }
    };

    fetchHero();
  }, []);

  return (
    <Carousel
      autoplay
      autoplaySpeed={3000}
      arrows
      infinite={true}
      draggable={true}
      className={styles.carousel}
    >
      {slides.map((slide, index) => (
        <div key={index} className={styles.heroPage}>
          <div className={styles.heroLeftContent}>
            <h3 className={styles.mainContent}>{slide.title}</h3>
            <p className={styles.helperContent}>{slide.description}</p>
          </div>
          <div className={styles.heroRightContent}>
            <img src={slide.image} alt={`Hero Slide ${index + 1}`} />
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Hero;
