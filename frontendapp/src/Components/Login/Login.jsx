import React, { useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";
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
      let json_user = JSON.parse(data1.data);
      dispatch({ type: "LOGIN", payload: json_user });
      window.location.href = "/";
      // if (data1.data === "Login Success") window.location.href = "/";
    } catch (err) {
      console.log("Not found");
    }
  };
  console.log(user);
  return (
    <>
      <div className="container">
        <img
          className="login_background_image"
          src='"../../../public/images/Project2.png"'
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
          <div className="Login_container">
            <h1 className="login_heading">
              Unlimited movies, TV <br /> shows and more.
            </h1>
            <h2 className="login_text">Watch anywhere. Cancel anytime.</h2>
          </div>
          <div className="Login_input_container">
            <input
              className="Login_input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Email address"
              type="text"
              name="UserName"
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
            />
          </div>
          <button className="login_btn" onClick={handleLogin}>
            {" "}
            Log in{" "}
          </button>
        </div>
      </div>
      {/* <div className="Login_container">
                    <h1 className="Login_title">Log in</h1>
                    <form className="LoginMovie" encType="multipart/form-data" onSubmit={(e) => handleLogin(e)}>
                        <div className="Login_form">
                            <div className="Login_form_field">
                                <div>Username : </div>
                                <input className="Login_input" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="UserName" />
                            </div>
                            <div className="Login_form_field">
                                <div>Password : </div>
                                <input className="Login_input" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" />
                            </div>
                        </div>
                        <button name="Login_btn" type='submit'>
                            Login
                        </button>
                    </form>
                </div> */}
      {/* </div> */}
    </>
  );
};

export default Login;
