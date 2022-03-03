import React, { useState,useEffect,useContext } from 'react';
import './UserPreferences.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from "../../context/Context";

const UserPreferences = () => {
    const {user} = useContext(Context)
    const [genre1, setGenre1] = useState("")
    const [genre2, setGenre2] = useState("")
    const [genre3, setGenre3] = useState("")
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const data = new FormData()
            console.log(genre1)
            console.log(genre2)
            console.log(genre3)
            
            data.append('genre1', genre1)
            data.append('genre2', genre2)
            data.append('genre3', genre3)
            const data1 = await axios.post(`http://127.0.0.1:8000/accounts/userPreferences/${user.userId}`,data)
            // let json_data = JSON.parse(data1.data)
            console.log(data1.data)
            if(data1.data == "userPreferences uploaded")
            {
                window.location.replace('/')
            }

        }
        catch(err)
        {
            console.log(err)
        }
  }
  console.log(user)

  return (
    <>
        <div className='container'>
            <img className='userPreference_background_image' src='"../../../public/images/Project2.png"'  />
        </div>
        <div className='userPreference_container'>
            <h1 className='userPreference_heading'>UserPreferences</h1>
            <form className="userPreference_Movie" encType="multipart/form-data" onSubmit={(e)=>handleSubmit(e)}>
                <div>
                    <ToastContainer className="toastContainer"></ToastContainer>
                </div>
                <div className='userPreferences_container'>
                    <h3 className='userPreferences_genre'>Genre 1</h3>
                    <select className='userPreferences_dropdownList' value={genre1} onChange={e=>setGenre1(e.target.value)}>
                        <option value="Genre1">Genre 1</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Thriller">Thriller</option>
                    </select>
                    <h3 className='userPreferences_genre'>Genre 2</h3>
                    <select className='userPreferences_dropdownList' value={genre2}  onChange={e=>setGenre2(e.target.value)}>
                    <option value="Genre2">Genre 2</option>
                        <option value="Romance">Romance</option>
                        <option value="Drama">Drama</option>
                        <option value="Animation">Animation</option>
                    </select>
                    <h3 className='userPreferences_genre'>Genre 3</h3>
                    <select className='userPreferences_dropdownList' value={genre3}  onChange={e=>setGenre3(e.target.value)}>
                    <option value="Genre3">Genre 3</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Mystery">Mystery</option>
                        <option value="Science Fiction">Science Fiction</option>
                    </select>
                    <button type='submit' className="userPreference_btn" >
                        submit
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}

export default UserPreferences