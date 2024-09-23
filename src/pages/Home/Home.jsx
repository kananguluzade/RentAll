import React from "react";
import Hero from "../../components/HomePage/Hero/Hero";
import Categories from "../../components/HomePage/Categories/Categories";
import NewShares from "../../components/HomePage/NewShares/NewShares";
import MostLiked from "../../components/HomePage/MostLiked/MostLiked";

const Home = () => {
  return (
    <>
      <div className="container">
        <Hero />
        <Categories />
        <NewShares />
        <MostLiked />
      </div>
    </>
  );
};

export default Home;
