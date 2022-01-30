import React,{useState} from 'react';
import './Login.css';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';

const Login = () => {
    const [userName,setUserName]=useState("")
    const [password,setPassword]=useState("")
    
    const handleLogin = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('userName',userName)
        data.append('password',password)
        
        try{
            const data1 = await axios.post(`http://127.0.0.1:8000/accounts/login/`,data)
            if(data1.data==="Login Success")
                window.location.href="/AddMovie"
        }
        catch(err)
        {
          console.log("Not found");
        }
    }


    return (
        <>
            <div className='container'>
                <img className='login_background_image' src='"../../../public/images/Project2.png"' />
                <Navbar />
                
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
