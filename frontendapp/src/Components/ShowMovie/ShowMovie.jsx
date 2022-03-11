import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./ShowMovie.css";
import { useLocation } from "react-router-dom";
import List from "../List/List";
import { Context } from "../../context/Context";
import Dialog from "./Dialog";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ListItem from "../ListItem/ListItem";
import NavigationBar from "../NavigationBar/NavigationBar";

const ShowMovie = () => {
  // Fetching movieId from url
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];

  // Fetching user from Context
  const { user, dispatch } = useContext(Context);

  // Declaring states
  const [movie, setmovie] = useState({});
  const [rating, setRating] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [isLiked, setisLiked] = useState(true);
  const [movieTitle, setmovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [likeCount, setLikecount] = useState(0);
  const [moviePoster, setmoviePoster] = useState(
    "https://wallpapercave.com/wp/wp1816342.jpg"
  );
  const [recommendMovie, setRecommendMovie] = useState([]);
  const [deletePopUp, setdeletePopUp] = useState({
    isLoading: false,
  });
  const [hover, setHover] = useState(null);
  const [hasRated, sethasRated] = useState(false);
  const [movieRating, setmovieRating] = useState(0.0);
  const [completedRating, setCompletedRating] = useState(false);
  const [isEditing, setisEditing] = useState(false);

  // Use Effects
  useEffect(() => {
    sethasRated(rating > 0 ? true : false);
  }, [rating]);

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
        setmovieRating(json_data["movieRating"]);
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

    const getRecommendations = async () => {
      const fetched = await axios.get(
        `http://127.0.0.1:8000/accounts/getrecommendations/${movieId}/`
      );
      let json_data_liked = JSON.parse(fetched.data);
      setRecommendMovie(json_data_liked["recommend"]);
    };

    fetchMovie();
    checkIfLiked();
    getRecommendations();
    setRating(0)
  }, [movieId]);

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
      setisLiked(!isLiked);
    } catch (err) {}
  };

  const handleRate = async () => {
    try {
      let fdata = new FormData();
      fdata.append("sentRating", rating);
      const fetch = await axios.post(
        `http://127.0.0.1:8000/movieOperations/rateMovie/${movieId}/${user.userId}`,
        fdata
      );
      let json_data = JSON.parse(fetch.data);
      setmovieRating(json_data["movieRating"]);
      sethasRated(false);
    } catch (err) {}
  };

  return (
    <>
      <NavigationBar />
      <div className="showmovie_container">
        <div className="showmovie_left_details">
          <div className="showmovie_content">
            <div className="showmovie_movieTitle">{movieTitle}</div>
            <div className="showmovie_likecount">
              Liked by {likeCount} people!
            </div>
            <div className="showmovie_likecount">Rating : {movieRating}</div>
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
            <div className="showmovie_stars">
              {user && [...Array(5)].map((star, i) => {
                const ratingval = i + 1; // To start counting from 1,default i is 0
                return (
                  <label>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingval}
                      onClick={() => {
                        setRating(
                          ratingval == 1 && rating == 1 ? 0 : ratingval
                        );
                      }}
                    />
                    <FaStar
                      className="showmovie_star"
                      color={
                        ratingval <= (hover || rating) ? "#FDDA0D" : "#F5F5DC"
                      }
                      size={40}
                      onMouseEnter={() => setHover(ratingval)}
                      onMouseLeave={() => setHover(null)}
                    />{" "}
                  </label>
                );
              })}
              {hasRated && (
                <button
                  onClick={handleRate}
                  className="Function_Buttons ratebutton"
                >
                  <i class="fa-solid fa-check"></i> Rate
                </button>
              )}
            </div>
            <div className="showmovie_description">{movieDescription}</div>
            {user && user.isSuperuser && (
              <div className="showmovie_admin_options">
                <Link to={`/EditMovie/` + movieId}>
                  <button className="Function_Buttons editbutton">
                    <i class="showmovie_icon fa-solid fa-pen-to-square"></i>Edit
                  </button>
                </Link>
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
          ))}
      </div>
    </>
  );
};

export default ShowMovie;
