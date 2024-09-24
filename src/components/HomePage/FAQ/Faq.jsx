import React, { useEffect, useState } from "react";
import { Accordion } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import styles from "./Faq.module.css";

const Faq = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch("/db.json");
        const data = await response.json();
        setFaqData(data.faq);
      } catch (error) {
        console.error("Error fetching Faqs:", error);
      }
    };

    fetchFaqs();
  }, []);

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
