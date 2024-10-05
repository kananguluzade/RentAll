import React, { useContext, useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./Cabinet.module.css";
import { AuthContext } from "../../components/Services/authContext";

const Cabinet = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState("parametrler");

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2] || "parametrler";
    setCurrentPage(currentPath);
  }, [location]);

  return (
    <div className="container">
      <div className={styles.cabinet__head}>
        <div className={styles.user__info}>
          <h4>{user?.fullname}</h4>
          <p>{user?.phone_number}</p>
        </div>
        <ul className={styles.cabinet__pages}>
          <li>
            <NavLink
              to="elanlar"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Elanlarım
            </NavLink>
          </li>
          <li>
            <NavLink
              to="parametrler"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Profil parametrləri
            </NavLink>
          </li>
          <li>
            <NavLink
              to="aktivlik"
              className={({ isActive }) =>
                isActive ? styles.active : undefined
              }
            >
              Aktivlik
            </NavLink>
          </li>
        </ul>
        <div className={styles.user__buttons}>
          <NavLink to="/cabinet/elan-yerlesdir">
            <button className={styles.button__added}>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12H19M12.5 5.5V18.5"
                  stroke="#FAFAFA"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Elan yerləşdir
            </button>
          </NavLink>
        </div>
      </div>
      <div className={styles.cabinet__main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Cabinet;
