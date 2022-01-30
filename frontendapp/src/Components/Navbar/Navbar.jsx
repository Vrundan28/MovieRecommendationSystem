import React,{useState} from 'react';
import './Navbar.css';
import axios from 'axios';


const Navbar = () => {

    const handleClick = () => {
        window.location.href="/Signup"
    }
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
            <div className='navbar_container'>
                <div className='navbar_left'>
                    <h3 className='navbar_title'>NETFLIX</h3>
                </div>
                <div className='navbar_right'>
                    <button className='navbar_signup' onClick={handleClick}><h4 className='buttonClass'>SignIn</h4></button>
                </div>
                <div className='Login_container'>
                    <h1 className='login_heading'>Unlimited movies, TV <br /> shows and more.</h1><br />
                    <h2 className='login_text'>Watch anywhere. Cancel anytime.</h2>
                </div>
                <div className='Login_input_container'>
                    <input className="Login_input" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Email address' type="text" name="UserName" />
                </div>
                <div className='Login_input_container1'>
                    <input className="Login_input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' type="text" name="password" />
                </div>
                <button className='login_btn'> Log in </button>
            </div>
        </>
        );
};

export default Navbar;
