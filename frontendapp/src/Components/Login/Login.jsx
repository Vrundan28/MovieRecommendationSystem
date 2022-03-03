import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar"

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { user, dispatch } = useContext(Context);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("userName", userName);
    data.append("password", password);

    try {
      const data1 = await axios.post(
        `http://127.0.0.1:8000/accounts/login/`,
        data
      );

      console.log(data1)
      if (data1.data === "Login Failed") 
      {
        toast.error('Incorrect Credentials', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
      });
      }
      else
      {
        console.log(data1.data)
        let json_user = JSON.parse(data1.data);
        dispatch({ type: "LOGIN", payload: json_user });
        console.log(json_user.isFilled,typeof(json_user.isFilled))
        if(json_user.isFilled)
          window.location.href = "/UserPreferences";
        else
          window.location.href = "/";

      }
    } catch (err) {
      console.log("Not found");
    }
  };
  // console.log(user);
  return (
    <>
        <img
          className="login_background_image"
        />
      {/* <Navbar /> */}

      <div className="navbar_container">
        <div className="navbar_left">
          <h3 className="navbar_title">MOVIE</h3>
        </div>
        <div className="navbar_right">
          <Link to="/Signup">
            <button className="navbar_signup">
              <h4 className="buttonClass">SignUp</h4>
            </button>
          </Link>
        </div>
        <div>
          <ToastContainer></ToastContainer>
        </div>
        <div className="Login_container">
          <h1 className="login_heading">
            Unlimited movies, TV <br /> shows and more.
          </h1>
          <h2 className="login_text">Watch anywhere. Cancel anytime.</h2>
        </div>
        <form enctype="multipart/form-data" onSubmit={(e) => handleLogin(e)}>
          <div className="Login_input_container">
            <input
              className="Login_input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Email address"
              type="text"
              name="UserName"
              required
            />
          </div>
          <div className="Login_input_container1">
            <input
              className="Login_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="text"
              name="password"
              required
            />
          </div>
          <button className="login_btn">
            {" "}
            Log in{" "}
          </button>
        </form>
      
      </div>
    </>
  );
};

export default Login;
