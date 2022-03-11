import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Signup = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()

        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(!strongRegex.test(password) || (password.length < 6 && password.length > 13))
        {
            toast.error('Password should should be of 6 to 13 letters and should contain 1 lower Case,1 upper case,1 number , 1 special character ', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                width:600
            });
        }
        else{
            try {
                if (password != confirmPassword) {
                    toast.error('Passwords do not match', {
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
                    const data = new FormData()
                    data.append('firstName', firstName)
                    data.append('userName', userName)
                    data.append('password', password)
                    data.append('lastName', lastName)
                    data.append('email', email)
                    data.append('confirmPassword', confirmPassword)

                    try {
                        const data1 = await axios.post(`http://127.0.0.1:8000/accounts/signup/`,data)
                        if(data1.data==="Signup Success")
                            window.location.href="/Login"
                        else
                        {
                            if (data1.data == "User with this username already exists") {
                                toast.error('Username already exists', {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                            else if(data1.data == "User with this email already exists")
                            {
                                toast.error('Email already exists', {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            }
                        }
                    }
                    catch (err) {
                        console.log("Not found");
                    }
                }
            }catch (err) {
                console.log(err.message)
            }
        }
    }

    return (
        <>
            <div className='container'>
                <img className='signup_background_image' src='"../../../public/images/Project2.png"' />
            </div>
            <div className='navbar_left'>
                <h3 className='navbar_title'>MOVIE</h3>
            </div>
            <div className='signup_container'>
                <h1 className='signup_heading'>Sign Up</h1>
                <form className="signup_Movie" enctype="multipart/form-data" onSubmit={(e) => handleSignup(e)}>
                    <div>
                        <ToastContainer className="toastContainer"></ToastContainer>
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="FirstName" placeholder='First Name' required/>
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="LastName" placeholder='Last Name' required/>
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="Email" placeholder='Email' required/>
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="Username" placeholder='Username' required/>
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" placeholder='Password' required/>
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" name="Confirm Password" placeholder='Confirm Password' required/>
                    </div>
                    <button className="signup_btn" >
                        Signup
                    </button>
                    <h4 className='signup_footer' type='submit'>Already a user ? <Link to='/Login'> Login here !!! </Link> </h4>
                </form>
            </div>
        </>
    );
};

export default Signup;
