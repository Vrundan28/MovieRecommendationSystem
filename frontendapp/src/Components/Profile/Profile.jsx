import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Profile.css";
import { Context } from "../../context/Context";
import NavigationBar from "../NavigationBar/NavigationBar";
import List from "../List/List";
// import ListItem from '../ListItem/ListItem'
import { Tooltip } from "@material-ui/core";
import Graph from "../Graph/Graph";
import "../ShowMovie/ShowMovie.css";

const Profile = () => {
  const { user, dispatch } = useContext(Context);
  const [curruser, setcurrUser] = useState(null);
  const [likedMovie, setlikedMovie] = useState([]);
  const [genre, setGenre] = useState("");
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilepicUrl, setProfilepicUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };
  const completeEdit = async () => {
    setIsEditing(false);
    try {
      const data_to_send = new FormData();
      data_to_send.append("firstname", firstname);
      data_to_send.append("lastname", lastname);
      data_to_send.append("email", email);
      // console.log(profilePic);
      data_to_send.append("profPicfile", profilePic);
      const update = await axios.post(
        `http://127.0.0.1:8000/accounts/updateProfile/${user.userId}/`,
        data_to_send
      );
      // console.log(update.data)
    } catch (err) { }
  };
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
        setusername(my_json_data.userName);
        setEmail(my_json_data.email);
        setFirstname(my_json_data.first_name);
        setLastname(my_json_data.last_name);
        setProfilepicUrl(my_json_data.profilepic);
        // console.log(my_json_data.userName);
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
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : profilepicUrl}
            />
            {isEditing && (
              <>
                <label htmlFor="profileinput">
                  <Tooltip title="Edit Profile Picture">
                    <i className="profile_cameraicon fas fa-camera"></i>
                  </Tooltip>
                </label>
                <input
                  type="file"
                  onChange={(e) => setProfilePic(e.target.files[0])}
                  id="profileinput"
                  style={{ display: "none" }}
                />
              </>
            )}
          </div>
          <div className="userprofile_right_details">
            <div className="userprofile_content">
              
              {!isEditing && (
                <>
                  <div style={{display:"flex"}}>
                    <div className="userprofile_UserName">{username}</div>
                    <button onClick={handleEdit} className="Function_Buttons editbutton" style={{height:"4vh",marginTop:"3vw",marginLeft:"1.5vw"}}>
                      <i class="fa-solid fa-pen-to-square"></i>Edit
                    </button>
                  </div>
                  <div className="userprofile_Name">
                    {firstname} {lastname}
                  </div>
                  <div className="userprofile_email">{email}</div>
                </>
              )}
              {isEditing && (
                <>
                  <div style={{display:"flex"}}>
                    <div className="userprofile_UserName">{username}</div>
                    <button
                      onClick={completeEdit}
                      className="Function_Buttons deletebutton" style={{height:"4vh",marginTop:"3vw",marginLeft:"1.5vw"}}
                    >
                      <i class="fa-solid fa-check"></i> Update
                    </button>
                  </div>
                  <input
                    className="inputfield userprofile_firstname_edit"
                    value={firstname}
                    autoFocus
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                  <input
                    className="inputfield userprofile_lastname_edit"
                    value={lastname}
                  />
                  <input
                    className="inputfield userprofile_email_edit"
                    value={email}
                  />
                </>
              )}
              
            </div>

          </div>
        </div>

        {genre && likedMovie && <span><List genre_name={genre} movies={likedMovie} /> </span> }
        <div className="graph_container">
          <h2 className="listTitle">Pie Chart for movies liked by you</h2>
          <Graph />
        </div>
      </div>
    </>
  );
};

export default Profile;
