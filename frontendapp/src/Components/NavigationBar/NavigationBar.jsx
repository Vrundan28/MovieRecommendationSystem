import React, { useContext } from "react";
import "./NavigationBar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

const NavigationBar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    window.location.replace("/");
  };

  return (
    <nav>
      <Link className="linkClass" to="/">
        <div className="logo">MOVIE</div>
      </Link>
      <ul>
        {user && (
          <li>
            <Link to="/SearchMovie" className="navlinks linkClass">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Link>
          </li>
        )}
        {/* {
          user && user.isSuperuser && 
          <Link className="linkClass" to="/AddMovie">
            <button className="nav_buttons">Add Movie</button>
          </Link>
        } */}
        {user && !user.isSuperuser && (
          <li className="navlinks">
            <Link className="linkClass" to="/Recommendation">
              Recommendations
            </Link>
          </li>
        )}
        <li>
          {user && (
            <li className="navlinks">
              <Link className="linkClass" to="/Profile">
                Profile
              </Link>
            </li>
          )}
        </li>
        <li>
          {user && user.isSuperuser && (
            <li className="navlinks">
              <Link className="linkClass" to="/adminPanel">
                Admin Panel
              </Link>
            </li>
          )}
        </li>
        <li>
          {user && !user.isSuperuser && (
            <li className="navlinks">
              <Link className="linkClass" to="/getRecommendations1">
                get Recommendations1
              </Link>
            </li>
          )}
        </li>
        {
          user && user.isSuperuser && 
          <Link className="linkClass" to="/AddMovie">
            <button className="nav_buttons">Add Movie</button>
          </Link>
        }
        {!user && (
          <Link className="linkClass" to="/Login">
            <button className="nav_buttons">Login</button>
          </Link>
        )}
        {!user && (
          <Link className="linkClass" to="/Signup">
            <button className="nav_buttons">Signup</button>
          </Link>
        )}
        {user && (
          <button className="nav_buttons" onClick={handleLogout}>
            Logout
          </button>
        )}
      </ul>
    </nav>
  );
};

export default NavigationBar;
