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
    // <nav>
    <>
    <div className="navbar_container">
        <Link to="/" className="linkClass navLink">
          <div className="logo">MOVIE</div>
        </Link>
        <ul>
          {/* <li>
            <a href="/">Home</a>
          </li> */}
          {user &&
            <li>
              <Link to="/SearchMovie" className="navLink1">
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
          }
          {user &&
            <li>
              <Link className="linkClass navLink2" to="/Recommendation">
                Recommendations
              </Link>
            </li>
          }
          {user && 
            <li>
              <Link className="linkClass navLink3" to="/Profile">
                Profile
              </Link>
            </li>
          }
          {!user && (
            <li>
              <Link to="/Login">
                <button className="nav_buttons navbutton">Login</button>
              </Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/Signup">
                <button className="nav_buttons navbutton1">Signup</button>
              </Link>
            </li>
          )}
          {user && (
            <li>
              <button className="nav_buttons navbutton2" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
    // </nav>
  );
};

export default NavigationBar;
