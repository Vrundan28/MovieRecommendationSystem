import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ShowMovie.css";
import { useLocation } from "react-router-dom";
import List from "../List/List";
import { Context } from "../../context/Context";
import Dialog from "./Dialog";
import ListItem from "../ListItem/ListItem";

const ShowMovie = () => {
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];
  // console.log("Here : ", movieId);
  const { user, dispatch } = useContext(Context);
  const [movie, setmovie] = useState({});
  const [fetched, setFetched] = useState(false);
  const [isLiked, setisLiked] = useState(true);
  const [movieTitle, setmovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [likeCount, setLikecount] = useState(0);
  const [moviePoster, setmoviePoster] = useState(
    "https://wallpapercave.com/wp/wp1816342.jpg"
  );
  const [recommendMovie,setRecommendMovie] = useState([])
  const [deletePopUp, setdeletePopUp] = useState({
    isLoading: false,
  });
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const currMovie = await axios.get(
          `http://127.0.0.1:8000/movieOperations/getMovie/${movieId}/`
        );
        let json_data = JSON.parse(currMovie.data);
        // setmovie(currMovie.data);
        console.log(json_data);
        setmovieTitle(json_data["movieTitle"]);
        setMovieDescription(json_data["movieDescription"]);
        setmoviePoster(json_data["moviePoster"]);
        setLikecount(json_data["likeCount"]);
        setFetched(true);
      } catch (err) {
        console.log("Not Found");
      }
    };

    const checkIfLiked = async () => {
      const fetched = await axios.get(
        `http://127.0.0.1:8000/movieOperations/isLiked/${movieId}/${user.userId}/`
      );
      // console.log(fetched.data);
      let json_data_liked = JSON.parse(fetched.data);
      console.log(json_data_liked["likeCount"]);
      setisLiked(json_data_liked["isLiked"]);
    };
    const getRecommendations = async() => {
      const fetched = await axios.get(
        `http://127.0.0.1:8000/accounts/getrecommendations/${movieId}/`
      );
      let json_data_liked = JSON.parse(fetched.data);
      setRecommendMovie(json_data_liked["recommend"]);
    };

    fetchMovie();
    checkIfLiked();
    getRecommendations();
  }, []);


  const handleClick = () => {
    window.location.replace(`/PlayMovie/${movieId}`);
  };


  const handleDeleteMovie = async () => {
    setdeletePopUp({
      isLoading: true,
    });
  };


  const deleteMovieAPICall = async () => {
    try {
      const fetch = await axios.delete(
        `http://127.0.0.1:8000/movieOperations/deleteMovie/${movieId}`
      );
    } catch (err) {}
  };


  const deleteConfirmation = (choice) => {
    if (choice) {
      // Perform delete operation here
      deleteMovieAPICall();
      setdeletePopUp({
        isLoading: false,
      });
      window.location.href = "/";
    } else {
      // Don't do anything just keep it normal
      setdeletePopUp({
        isLoading: false,
      });
    }
  };


  const handleLike = async () => {
    setLikecount(likeCount + 1);
    try {
      const Senddata = {
        userId: user.userId,
        movieId: movieId,
      };
      const likeMovie = await axios.post(
        `http://127.0.0.1:8000/movieOperations/likeMovie/`,
        Senddata
      );
      // console.log(likeMovie.data);
      setisLiked(!isLiked);
    } catch (err) {}
  };


  const handleDislike = async () => {
    setLikecount(likeCount - 1);
    try {
      const Senddata = {
        userId: user.userId,
        movieId: movieId,
      };
      const dislikeMovie = await axios.post(
        `http://127.0.0.1:8000/movieOperations/dislikeMovie/`,
        Senddata
      );
      // console.log(likeMovie.data);
      setisLiked(!isLiked);
    } catch (err) {}
  };
  // console.log(recommendMovie)

  return (
    <>
    <div className="showmovie_container">
      <div className="showmovie_left_details">
        <div className="showmovie_content">
          <div className="showmovie_movieTitle">{movieTitle}</div>
          <div className="showmovie_likecount">
            Liked by {likeCount} people!
          </div>
          <div className="showmovie_buttons">
            <button onClick={handleClick} className="Function_Buttons">
              <i class="showmovie_icon fa-solid fa-play"></i>Play
            </button>
            {!isLiked && (
              <button onClick={handleLike} className="Function_Buttons">
                <i class="showmovie_icon fa-solid fa-thumbs-up"></i>Like
              </button>
            )}
            {isLiked && (
              <button onClick={handleDislike} className="Function_Buttons">
                <i class="showmovie_icon fa-solid fa-thumbs-down"></i>Dislike
              </button>
            )}
          </div>
          <div className="showmovie_description">{movieDescription}</div>
          {user && user.isSuperuser && (
            <div className="showmovie_admin_options">
              <button className="Function_Buttons editbutton">
                <i class="showmovie_icon fa-solid fa-pen-to-square"></i>Edit
              </button>
              <button
                onClick={handleDeleteMovie}
                className="Function_Buttons deletebutton"
              >
                <i class="showmovie_icon fa-solid fa-trash"></i>Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="showmovie_right_poster">
        <img src={moviePoster} />
      </div>
      {deletePopUp.isLoading && <Dialog onDialog={deleteConfirmation} />}
    </div>
    <h2 className="showmovie_recommendations_heading">Similar Movies , </h2>
    <div className="showmovie_recommendations">
      
      {recommendMovie && 
        recommendMovie.map((m) => (
          <ListItem movieId={m.movieId} moviePoster={m.moviePoster} />
        )) 
      }
    </div>
    </>
  );
};

export default ShowMovie;
