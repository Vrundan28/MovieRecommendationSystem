import React from "react";
import "./slider.css";
const SliderContainer = ({ activeIndex, imageSlider }) => {
  return (
    // <section>
    //   {imageSlider.map((slide, index) => (
    //     <header
    //       style={{
    //         backgroundSize: "cover",
    //         backgroundImage: `url(${slide.url})`,
    //         backgroundPosition: "center center",
    //       }}
    //     >Hello</header>
    //   ))}
    // </section>
    <section>
      {imageSlider.map((slide, index) => (
        <div
          key={index}
          className={index == activeIndex ? "slides active" : "inactive"}
        >
          <img src={slide.url} alt="" className="slide-image" />
        </div>
      ))}
    </section>
  );
};

export default SliderContainer;
