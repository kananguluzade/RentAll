import React from "react";
import { Carousel } from "antd";
import firstHeroImage from "../../../public/first-hero.jpg";
import styles from "../Home/Home.module.css";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const Home = () => {
  return (
    <div className="container">
      <Carousel arrows infinite={false} className={styles.carousel}>
        <div className={styles.heroPage}>
          <div className={styles.heroLeftContent}>
            <h3 className={styles.mainContent}>
              Sonsuz imkanları kəşf et və dəyərlərini RentAll ilə müəyyənləşdir!
            </h3>
            <p className={styles.helperContent}>
              Artıq lazım olmayanı sat və ona yeni sahib tap!
            </p>
          </div>
          <div className={styles.heroRightContent}>
            <img src={firstHeroImage} alt="First Hero" />
          </div>
        </div>
        <div className={styles.heroPage}>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div className={styles.heroPage}>
          <h3 style={contentStyle}>3</h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
