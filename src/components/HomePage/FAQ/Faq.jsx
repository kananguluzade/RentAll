import React, { useEffect, useState } from "react";
import { Accordion } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import styles from "./Faq.module.css";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/faqs/all`);
        const data = await response.json();
        const sortedData = data.sort((a, b) =>
          a.id === 1 ? -1 : b.id === 1 ? 1 : 0
        );
        setFaqData(sortedData);
      } catch (error) {
        console.error("Error fetching Faqs:", error);
      }
    };

    fetchFaqs();
  }, [BASE_URL]);

  const leftColumnFaqs = faqData.slice(0, 3);
  const rightColumnFaqs = faqData.slice(3);

  return (
    <div className={styles.faq}>
      <div className={styles.faq__title}>
        <h3>Tez-tez verilən suallar</h3>
      </div>
      <div className={styles.accordion__container}>
        <div className={styles.accordion__left}>
          <Accordion>
            {leftColumnFaqs.map((faq) => (
              <Accordion.Panel key={faq.id} header={faq.question}>
                <p>{faq.answer}</p>
              </Accordion.Panel>
            ))}
          </Accordion>
        </div>

        <div className={styles.accordion__right}>
          <Accordion>
            {rightColumnFaqs.map((faq) => (
              <Accordion.Panel key={faq.id} header={faq.question}>
                <p>{faq.answer}</p>
              </Accordion.Panel>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
