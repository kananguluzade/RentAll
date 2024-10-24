import React from "react";
import styles from "./TeamCard.module.css";
import fbImg from "../../../public/Facebook.png";
import linkedinImg from "../../../public/Linkedin.png";

const TeamCard = ({ image, fullname, role, facebook, linkedin }) => {
  return (
    <div className={styles.team__card}>
      <img
        src={image}
        alt={`${fullname}-img`}
        className={styles.team__card__image}
      />
      <div className={styles.team__card__info}>
        <h2 className={styles.team__card__role}>{role}</h2>
        <p className={styles.team__card__name}>{fullname}</p>
        <div className={styles.team__card__links}>
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <img src={fbImg} alt="Facebook" />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img src={linkedinImg} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
