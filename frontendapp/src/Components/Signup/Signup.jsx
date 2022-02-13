import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

const Signup = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignup = async (e) => {
        e.preventDefault()
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
                window.location.href="/"
        }
        catch (err) {
            console.log("Not found");
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
                <h1 className='signup_heading'>Sign In</h1>
                <form className="signup_Movie" enctype="multipart/form-data" onSubmit={(e) => handleSignup(e)}>
                    <div className="signup_form_field">
                        <input className="signup_input" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="FirstName" placeholder='First Name' />
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="LastName" placeholder='Last Name' />
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="Email" placeholder='Email' />
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="Username" placeholder='Username' />
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" placeholder='Password' />
                    </div>
                    <div className="signup_form_field">
                        <input className="signup_input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" name="Confirm Password" placeholder='Confirm Password' />
                    </div>
                    <button className="signup_btn" >
                        Signup
                    </button>
                    <h4 className='signup_footer' type='submit'>Already a user ? <Link to='/'> Login here !!! </Link> </h4>
                </form>
            </div>
        </>
    );
};

export default Signup;
