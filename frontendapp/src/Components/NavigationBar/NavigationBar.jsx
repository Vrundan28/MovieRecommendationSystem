import React, { useContext } from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
const NavigationBar = () => {
  const { user } = useContext(Context);
  return (
    <nav>
      <div className="logo">MOVIE</div>
      <ul>
        {/* <li>
          <a href="/">Home</a>
        </li> */}
        <li>
          <Link to="/SearchMovie">
            <i className="fa-solid fa-magnifying-glass"></i>
          </Link>
        </li>
        <li>
          <a href="#">Recommendations</a>
        </li>
        <li>
          <a href="#">Profile</a>
        </li>
        {!user && (
          <li>
            <Link to="/Login">
              <button className="nav_buttons">Login</button>
            </Link>
          </li>
        )}
        {!user && (
          <li>
            <Link to="/Signup">
              <button className="nav_buttons">Signup</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
