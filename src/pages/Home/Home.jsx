import React from "react";
import Hero from "../../components/HomePage/Hero/Hero";
import Categories from "../../components/HomePage/Categories/Categories";
import NewShares from "../../components/HomePage/NewShares/NewShares";
import MostLiked from "../../components/HomePage/MostLiked/MostLiked";
import Faq from "../../components/HomePage/FAQ/Faq";
import Register from "../../components/Register/Register";

const Home = () => {
  return (
    <>
      <div className="container">
        <Hero />
        <Categories />
        <NewShares />
        <MostLiked />
        <Faq />
      </div>
    </>
  );
};

export default Home;
