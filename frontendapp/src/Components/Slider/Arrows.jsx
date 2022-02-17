import React from "react";
import "./slider.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
const Arrows = ({ prev, next }) => {
  return (
    <div className="arrows">
      {/* <ArrowBackIosIcon onClick={prev} className="previous" /> */}
      <span className="previous" onClick={prev}>
        &#10094;
      </span>
      <span className="next" onClick={next}>
        &#10095;
      </span>
      {/* <ArrowForwardIosIcon onClick={next} className="next" /> */}
    </div>
  );
};

export default Arrows;
