import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import TeamCard from "../../components/TeamCard/TeamCard";
import MaleImg from "../../../public/male-img.png";
import FeMaleImg from "../../../public/female-img.png";
import futurePicture1 from "../../../public/future-plan1.png";
import futurePicture3 from "../../../public/future-plan3.png";
import FuturePockets from "../../../public/pockets.png";

import styles from "../AboutUs/AboutUs.module.css";

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
            etməkdir. Həm ətraf mühiti qorumağa, h əm də icma dax ilində
            paylaşma mədəniyyətini inkişaf etdirməyə çalışırıq.
          </p>
        </div>
      </div>
      <div className={styles.purpose__section}>
        <div className={styles.content__section}>
          <h2>Məqsədimiz</h2>
          <p>
            İnsanların artıq istifadə etmədiyi əşyaları paylaşaraq həm
            bir-birinə dəstək olması, əşyaların həyat dövrünü uzatmaq, həm də
            resursların daha səmərəli istifadə edilməsini təmin etmək. Ekoloji
            baxımdan daha dayanıqlı bir cəmiyyətə töhfə vermək istəyirik.
          </p>
        </div>
      </div>
      <div className={styles.team__section}>
        <div className={styles.about__headline}>
          <h2>Komandamız</h2>
        </div>
        <div className={styles.team__cards}>
          <TeamCard
            image={FeMaleImg}
            fullname="Leyla Agasiyeva Leyla"
            role="UX/UI designer"
            facebook="https://facebook.com"
            linkedin="https://linkedin.com"
          />
          <TeamCard
            image={MaleImg}
            fullname="Rizvan Məmmədzadə"
            role="Backend developer"
            facebook="https://facebook.com"
            linkedin="https://linkedin.com"
          />
          <TeamCard
            image={FeMaleImg}
            fullname="Arzu Xəlilova"
            role="Product consultant"
            facebook="https://facebook.com"
            linkedin="https://linkedin.com"
          />
          <TeamCard
            image={MaleImg}
            fullname="Kənan Quluzadə"
            role="Frontend Developer"
            facebook="https://facebook.com"
            linkedin="https://linkedin.com"
          />
          <TeamCard
            image={FeMaleImg}
            fullname="Arzu Hüseynquliyeva"
            role="Product Consultant"
            facebook="https://facebook.com"
            linkedin="https://linkedin.com"
          />
          <TeamCard
            image={FeMaleImg}
            fullname="Günel Əlizadə"
            role="QA engineer"
            facebook="https://facebook.com"
            linkedin="https://linkedin.com"
          />
          <TeamCard
            image={MaleImg}
            fullname="Umud Quliyev"
            role="Frontend Developer"
            facebook="https://facebook.com"
            linkedin="https://linkedin.com"
          />
        </div>
      </div>
      <div className={styles.future__plans}>
        <div className={styles.about__headline}>
          <h2>Gələcək Planlarımız</h2>
        </div>
        <div className={styles.future__plans__section}>
          <div className={styles.future__plans__contents}>
            <div className={styles.future__plans__content}>
              <p>
                <span>Mobil tətbiqin istifadəyə verilməsi:</span> Platformamıza
                hər yerdən rahat giriş təmin etmək üçün mobil tətbiq
                hazırlayırıq.
              </p>
            </div>
            <div className={styles.future__plans__content}>
              <p>
                <span>Kirayə funksiyasının tətbiqi:</span> Platformamıza
                əşyaların kirayə verilməsi funksiyasını əlavə edərək
                istifadəçilərə öz əşyalarını kirayə verib gəlir əldə etmək
                imkanı təqdim edəcəyik. Bu, xüsusilə az istifadə olunan əşyalar
                üçün ideal olacaq.
              </p>
            </div>
            <div className={styles.future__plans__content}>
              <p>
                <span>Satış imkanlarının əlavə edilməsi: </span>
                Gələcəkdə istifadəçilər artıq ehtiyac duymadıqları əşyaları
                platforma üzərindən satıb, əlavə gəlir əldə edə bilərlər.
              </p>
            </div>
          </div>
          <div className={styles.future__plans__pictures}>
            <div className={styles.top__section}>
              <img src={futurePicture1} />
              <img src={futurePicture3} />
            </div>
            <div className={styles.bottom__section}>
              <img src={FuturePockets} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
