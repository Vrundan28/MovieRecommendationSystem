import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ShowMovie.css";
import { useLocation } from "react-router-dom";
import List from "../List/List";

const ShowMovie = () => {
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];
  console.log("Here : ", movieId);
  const [movie, setmovie] = useState({});
  const [fetched, setFetched] = useState(false);
  const [moviePoster, setmoviePoster] = useState(
    "https://wallpapercave.com/wp/wp1816342.jpg"
  );
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const currMovie = await axios.get(
          `http://127.0.0.1:8000/movieOperations/getMovie/${movieId}/`
        );
        setmovie(currMovie.data);
        console.log(movie);
        setFetched(true);
        const moviePoster1 = currMovie.data.moviePoster;
        setmoviePoster(moviePoster1);
      } catch (err) {
        console.log("Not Found");
      }
    };
    fetchMovie();
  }, []);
  const handleClick = () => {
    window.location.replace(`/PlayMovie/${movieId}`);
  };

  const handleLike = async () => {
    try {
      const Senddata = {
        userId: 3,
        movieId: movieId,
      };
      const likeMovie = await axios.post(
        `http://127.0.0.1:8000/movieOperations/likeMovie/`,
        Senddata
      );
      console.log(likeMovie.data);
    } catch (err) {}
  };
  return (
    <div className="showmovie_container">
      <div className="showmovie_left_details">
        <div className="showmovie_content">
          <div className="showmovie_movieTitle">{movie.movieTitle}</div>
          <div className="showmovie_buttons">
            <button onClick={handleClick} className="Function_Buttons">
              <i class="fa-solid fa-play"></i> Play
            </button>
            <button onClick={handleLike} className="Function_Buttons">
              <i class="fa-solid fa-heart"></i> Like
            </button>
          </div>
          <div className="showmovie_description">{movie.movieDescription}</div>
        </div>
      </div>
      <div className="showmovie_right_poster">
        <img src={moviePoster} />
      </div>
    </div>
    // <header
    //   className="Movie_background"
    //   style={{
    //     backgroundSize: "cover",
    //     backgroundImage: `url(${moviePoster})`,
    //     backgroundPosition: "center center",
    //   }}
    // >
    //   <div className="Movie_Details">
    //     <h1 className="Movie_Title">{movie.movieTitle}</h1>
    //     <div className="buttons">
    //       <button onClick={handleClick} className="Function_Buttons">
    //         <i class="fa-solid fa-play"></i> Play
    //       </button>
    //       <button onClick={handleLike} className="Function_Buttons">
    //         <i class="fa-solid fa-heart"></i> Like
    //       </button>
    //     </div>
    //     <h1 className="Movie_Description">{movie.movieDescription}</h1>
    //   </div>
    // </header>
  );
};

export default ShowMovie;
