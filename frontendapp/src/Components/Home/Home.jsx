import React from "react";
import "./Home.css";
import List from "../List/List";
import Slider from "../Slider/Slider";
const Home = () => {
  return (
    <div className="home">
      <Slider />
      <List />
    </div>
  );
};

export default Home;
