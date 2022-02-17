import React, { useState, useEffect } from "react";
import SliderContainer from "./SliderContainer";
import Arrows from "./Arrows";
import "./slider.css";

import SpiderMan from "../../posters/SpiderMan.jpg";
import FNF from "../../posters/FNF.jpg";
import GOG from "../../posters/GOG.jpg";
import ACS from "../../posters/ACS.jpg";
const Slider = () => {
  let images = [
    {
      url: SpiderMan,
    },
    {
      url: GOG,
    },
    {
      url: ACS,
    },
    {
      url: FNF,
    },
  ];
  const [activeIndex, setactiveIndex] = useState(0);
  let total_images = images.length - 1;
  useEffect(() => {
    const timeperiod = setInterval(() => {
      setactiveIndex(activeIndex === total_images ? 0 : activeIndex + 1);
    }, 4000);
    return () => clearInterval(timeperiod);
  }, [activeIndex]);

  return (
    <div className="slider-container">
      <SliderContainer activeIndex={activeIndex} imageSlider={images} />
      <Arrows
        prev={() =>
          setactiveIndex(activeIndex < 1 ? total_images : activeIndex - 1)
        }
        next={() =>
          setactiveIndex(activeIndex == total_images ? 0 : activeIndex + 1)
        }
      />
    </div>
  );
};

export default Slider;
