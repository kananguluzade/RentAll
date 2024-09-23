import React from "react";
import { Carousel } from "antd";
import firstHeroImage from "../../../public/first-hero.jpg";
import secondHeroImage from "../../../public/second-hero.jpg";
import thirdHeroImage from "../../../public/third-hero.jpg";
import styles from "../Home/Home.module.css";

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
          <div className={styles.heroLeftContent}>
            <h3 className={styles.mainContent}>
              Sonsuz imkanları kəşf et və dəyərlərini RentAll ilə müəyyənləşdir!
            </h3>
            <p className={styles.helperContent}>
              Artıq lazım olmayanı sat və ona yeni sahib tap!
            </p>
          </div>
          <div className={styles.heroRightContent}>
            <img src={secondHeroImage} alt="First Hero" />
          </div>
        </div>
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
            <img src={thirdHeroImage} alt="First Hero" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
