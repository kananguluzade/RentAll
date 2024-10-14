import React from "react";
import { Modal } from "rsuite";
import styles from "./LogoutModal.module.css";

const LogoutModal = ({
  showLogoutModal,
  handleLogout,
  handleCloseLogoutModal,
}) => {
  return (
    <Modal
      open={showLogoutModal}
      onClose={handleCloseLogoutModal}
      backdrop="static"
      className={styles.logout__modal}
    >
      <Modal.Body>
        <div className={styles.logout__container}>
          <div className={styles.logout__title}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 8V12.5M12 3.5C8 3.5 3.5 6.5 3.5 12C3.5 17.5 8 20.5 12 20.5C16 20.5 20.5 17.5 20.5 12C20.5 6.5 16 3.5 12 3.5ZM12 15C11.8333 15 11.5 15.1 11.5 15.5C11.5 15.9 11.8333 16 12 16C12.1667 16 12.5 15.9 12.5 15.5C12.5 15.1 12.1667 15 12 15Z"
                stroke="#FAFAFA"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            <h5>Çıxmaq istədiyinizə əminsiniz?</h5>
          </div>
          <div className={styles.logout__submit}>
            <button className={styles.logout__button} onClick={handleLogout}>
              Bəli
            </button>
            <button
              className={styles.cancel__button}
              onClick={handleCloseLogoutModal}
            >
              Xeyr
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
