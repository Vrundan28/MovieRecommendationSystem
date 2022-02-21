import React from "react";
import "./Home.css";
import List from "../List/List";
import Slider from "../Slider/Slider";
const Home = () => {
  const handleClick = () => {
    window.location.href="/Login"
  }
  return (
    <>
      <div className='navbar_right'>
        <button className='navbar_signup' onClick={handleClick}><h4 className='buttonClass'>Login</h4></button>
      </div>
      <div className="home">
        <Slider />
        <List />
      </div>
    </>
  );
};

export default Home;
