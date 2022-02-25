import React from "react";
import "./NavigationBar.css";

const NavigationBar = () => {

  const handleLogin = () => {
    window.location.href="/Login"
  } 

  
  const handleSignup = () => {
    window.location.href="/Signup"
  } 

  return (
    <nav>
      <div className="logo">MOVIE</div>
      <ul>
        {/* <li>
          <a href="/">Home</a>
        </li> */}
        <li>
          <a href="/SearchMovie"><i className="fa-solid fa-magnifying-glass"></i></a>
        </li>
        <li>
          <a href="#">Recommendations</a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
        <button className="nav_buttons" onClick={handleLogin}>Login</button>
        <button className="nav_buttons" onClick={handleSignup}>Signup</button>
      </ul>
    </nav>
  );
};

export default NavigationBar;
