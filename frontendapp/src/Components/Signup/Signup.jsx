import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';

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
            // const data1 = await axios.post(``,data)
            // console.log(data1.data)
        }
        catch (err) {
            console.log("Not found");
        }
    }


    return (
        <>
            <div class="Signup_container">
                <h1 class="Signup_title">Sign up</h1>
                <form className="SignupMovie" enctype="multipart/form-data" onSubmit={(e) => handleSignup(e)}>
                    <div class="Signup_form">
                        <div class="Signup_form_field">
                            <div>FirstName : </div>
                            <input class="Signup_input" value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" name="FirstName" />
                        </div>
                        <div class="Signup_form_field">
                            <div>LastName : </div>
                            <input class="Signup_input" value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" name="LastName" />
                        </div>
                        <div class="Signup_form_field">
                            <div>Username : </div>
                            <input class="Signup_input" value={email} onChange={(e) => setEmail(e.target.value)} type="text" name="UserName" />
                        </div>
                        <div class="Signup_form_field">
                            <div>Username : </div>
                            <input class="Signup_input" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="UserName" />
                        </div>
                        <div class="Signup_form_field">
                            <div>Password : </div>
                            <input class="Signup_input" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" />
                        </div>
                        <div class="Signup_form_field">
                            <div>Confirm Password : </div>
                            <input class="Signup_input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="text" name="Confirm Password" />
                        </div>
                        <button name="Signup_btn" type='submit'>
                            Signup
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Signup;
