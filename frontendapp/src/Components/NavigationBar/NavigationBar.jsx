import React, { useContext } from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
const NavigationBar = () => {
  const { user,dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({type:"LOGOUT"})
    window.location.replace('/')
  } 

  return (
    <nav>
      <Link to="/" className="linkClass"><div className="logo">MOVIE</div></Link>
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
          <a href="/Recommendation">Recommendations</a>
        </li>
        <li>
          <a href="/Profile">Profile</a>
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
        {
          user && (
            <li>
                <button className="nav_buttons" onClick={handleLogout}>Logout</button>
            </li>
          )
        }
      </ul>
    </nav>
  );
};

export default NavigationBar;
