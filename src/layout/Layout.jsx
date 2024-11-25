import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Layout.css";

function Layout() {
  return (
    <div className="layout__container">
      <header>
        <Header />
      </header>
      <main className="mainContent">
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
