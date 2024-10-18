import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../AboutUs/AboutUs.module.css";
import Missionİmg from "../../../public/OurMission.png";
import PurposeImg from "../../../public/OurPurpose.png";

const AboutUs = () => {
  return (
    <div className="container">
      <div className={styles.previous__section}>
        <Link to="/" className={styles.back__home}>
          <FontAwesomeIcon icon={faChevronLeft} /> Ana səhifə
        </Link>
      </div>
      <div className={styles.mission__section}>
        <div className={styles.content__section}>
          <h2>Missiyamız</h2>
          <p>
            Bizim missiyamız insanlara artıq istifadə etmədikləri əşyaları
            yenidən dəyərli etmək üçün təhlükəsiz və rahat bir platforma təqdim
            etməkdir. Həm ətraf mühiti qorumağa, həm də icma daxilində paylaşma
            mədəniyyətini inkişaf etdirməyə çalışırıq.
          </p>
        </div>
        <div className={styles.mission__picture}>
          <img src={Missionİmg} alt="bizim missiyamiz" />
        </div>
      </div>
      <div className={styles.purpose__section}>
        <div className={styles.mission__picture}>
          <img src={PurposeImg} alt="meqsedimiz" />
        </div>
        <div className={styles.content__section}>
          <h2>Məqsədmiz</h2>
          <p>
            Əsas məqsədimiz, əşyaların həyat dövrünü uzatmaq və hər kəsə
            istifadəsiz qalan məhsulları dəyişmək, kirayələmək və ya satmaq
            imkanı yaratmaqdır. Bu yolla həm iqtisadi, həm də ekoloji baxımdan
            daha dayanıqlı bir cəmiyyətə töhfə vermək istəyirik.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
