import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {
  return (
    <nav>
      <div className="logo">MOVIE</div>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Recommendations</a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
        <button className="nav_buttons">Login</button>
        <button className="nav_buttons">Signup</button>
      </ul>
    </nav>
  );
};

export default NavigationBar;
