import React from "react";
import Hero from "../../components/HomePage/Hero/Hero";
import Categories from "../../components/HomePage/Categories/Categories";
import NewShares from "../../components/HomePage/NewShares/NewShares";

const Home = () => {
  return (
    <>
      <div className="container">
        <Hero />
        <Categories />
        <NewShares />
      </div>
    </>
  );
};

export default Home;
