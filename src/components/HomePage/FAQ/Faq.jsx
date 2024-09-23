import React from "react";
import { Accordion, Panel, Placeholder } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import styles from "./Faq.module.css";

const Faq = () => {
  return (
    <div className={styles.faq}>
      <div className={styles.faq__title}>
        <h3>Tez-tez verilən suallar</h3>
      </div>
      <div className={styles.accordion__container}>
        <Accordion className={styles.accordion__left}>
          <Accordion.Panel header="Necə qeydiyyatdan keçə bilərəm?">
            <p>
              Qeydiyyatdan keçmək üçün veb-saytın əsas səhifəsindəki "Qeydiyyat"
              düyməsinə klikləyin. Açılan formada adınız, e-poçt ünvanınız və
              şifrənizi daxil edin. Məlumatları doldurduqdan sonra e-poçtunuza
              təsdiq mesajı göndəriləcək. Linkə klikləyərək qeydiyyatınızı
              tamamlayın və hesabınıza daxil olun.
            </p>
          </Accordion.Panel>
          <Accordion.Panel header="Məhsulu necə kirayə verə bilərəm?">
            <p>
              Qeydiyyatdan keçmək üçün veb-saytın əsas səhifəsindəki "Qeydiyyat"
              düyməsinə klikləyin. Açılan formada adınız, e-poçt ünvanınız və
              şifrənizi daxil edin. Məlumatları doldurduqdan sonra e-poçtunuza
              təsdiq mesajı göndəriləcək. Linkə klikləyərək qeydiyyatınızı
              tamamlayın və hesabınıza daxil olun.
            </p>
          </Accordion.Panel>
          <Accordion.Panel header="Ödənişi necə edə bilərəm?">
            <p>
              Qeydiyyatdan keçmək üçün veb-saytın əsas səhifəsindəki "Qeydiyyat"
              düyməsinə klikləyin. Açılan formada adınız, e-poçt ünvanınız və
              şifrənizi daxil edin. Məlumatları doldurduqdan sonra e-poçtunuza
              təsdiq mesajı göndəriləcək. Linkə klikləyərək qeydiyyatınızı
              tamamlayın və hesabınıza daxil olun.
            </p>
          </Accordion.Panel>
        </Accordion>
        <Accordion className={styles.accordion__right}>
          <Accordion.Panel header="Məhsulu necə satmaq olar?">
            <p>
              Qeydiyyatdan keçmək üçün veb-saytın əsas səhifəsindəki "Qeydiyyat"
              düyməsinə klikləyin. Açılan formada adınız, e-poçt ünvanınız və
              şifrənizi daxil edin. Məlumatları doldurduqdan sonra e-poçtunuza
              təsdiq mesajı göndəriləcək. Linkə klikləyərək qeydiyyatınızı
              tamamlayın və hesabınıza daxil olun.
            </p>
          </Accordion.Panel>
          <Accordion.Panel header="Kirayə müddətini necə müəyyənləşdirə bilərəm?">
            <p>
              Qeydiyyatdan keçmək üçün veb-saytın əsas səhifəsindəki "Qeydiyyat"
              düyməsinə klikləyin. Açılan formada adınız, e-poçt ünvanınız və
              şifrənizi daxil edin. Məlumatları doldurduqdan sonra e-poçtunuza
              təsdiq mesajı göndəriləcək. Linkə klikləyərək qeydiyyatınızı
              tamamlayın və hesabınıza daxil olun.
            </p>
          </Accordion.Panel>
          <Accordion.Panel header="Problemlə qarşılaşsam nə etməliyəm?">
            <p>
              Qeydiyyatdan keçmək üçün veb-saytın əsas səhifəsindəki "Qeydiyyat"
              düyməsinə klikləyin. Açılan formada adınız, e-poçt ünvanınız və
              şifrənizi daxil edin. Məlumatları doldurduqdan sonra e-poçtunuza
              təsdiq mesajı göndəriləcək. Linkə klikləyərək qeydiyyatınızı
              tamamlayın və hesabınıza daxil olun.
            </p>
          </Accordion.Panel>
        </Accordion>
      </div>
    </div>
  );
};

export default Faq;
