import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { Context } from "../../context/Context";
import NavigationBar from "../NavigationBar/NavigationBar";
import List from "../List/List";
// import ListItem from '../ListItem/ListItem'
import Graph from "../Graph/Graph";

const Profile = () => {
  const { user, dispatch } = useContext(Context);
  const [curruser, setcurrUser] = useState(null);
  const [likedMovie, setlikedMovie] = useState([]);
  const [genre, setGenre] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currUser = await axios.get(
          `http://127.0.0.1:8000/accounts/getUser/${user.userId}/`
        );
        const likedMovie = await axios.get(
          `http://127.0.0.1:8000/accounts/getLikedMovie/${user.userId}/`
        );
        let my_likedmovie = likedMovie.data;
        let my_json_likedmovie = JSON.parse(my_likedmovie);
        setlikedMovie(my_json_likedmovie["liked_movie"]);
        let my_data = currUser.data;
        let my_json_data = JSON.parse(my_data);
        let my_genre = "Liked Movies By, " + my_json_data.first_name;
        setGenre(my_genre);
        setcurrUser(my_json_data);
        console.log(my_json_data.userName);
      } catch (err) {
        console.log("Not Found");
      }
    };
    fetchUser();
  }, []);
  console.log(likedMovie);
  return (
    <>
      <NavigationBar />
      <div className="userprofile_maincontainer">
        <div className="userprofile_container">
          <div className="userprofile_left_poster">
            <img src="https://www.kindpng.com/picc/m/78-785827_user-profile-avatar-login-account-male-user-icon.png" />
          </div>
          <div className="userprofile_right_details">
            <div className="userprofile_content">
              <div className="userprofile_UserName">{curruser && curruser.userName}</div>
              <div className="userprofile_Name">
                {curruser && curruser.first_name} {curruser && curruser.last_name}
              </div>
              <div className="userprofile_email">{curruser && curruser.email}</div>
            </div>
          </div>
        </div>
        {/* <span className="listTitle">Liked Movies of {curruser.first_name}</span> */}
        <List genre_name={genre} movies={likedMovie} />
        <Graph />
      </div>
    </>
  );
};

export default Profile;
