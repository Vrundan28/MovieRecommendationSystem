import React,{useState} from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('userName',userName)
        data.append('password',password)
        
        try{
            // const data1 = await axios.post(``,data)
            // console.log(data1.data)
        }
        catch(err)
        {
          console.log("Not found");
        }
    }

    return (
        <>
            <div class="Login_container">
                <h1 class="Login_title">Log in</h1>
                <form className="LoginMovie" enctype="multipart/form-data" onSubmit={(e) => handleLogin(e)}>
                    <div class="Login_form">
                        <div class="Login_form_field">
                            <div>Username : </div>
                            <input class="Login_input" value={userName} onChange={(e) => setUserName(e.target.value)} type="text" name="UserName" />
                        </div>
                        <div class="Login_form_field">
                            <div>Password : </div>
                            <input class="Login_input" value={password} onChange={(e) => setPassword(e.target.value)} type="text" name="password" />
                        </div>
                    </div>
                    <button name="Login_btn" type='submit'>
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default Login;
