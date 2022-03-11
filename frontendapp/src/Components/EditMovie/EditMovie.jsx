import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Tooltip } from "@mui/material";
import "./EditMovie.css";
import { FaWindowRestore } from "react-icons/fa";
const EditMovie = () => {
  // Fetching movieId from url
  const location = useLocation();
  const movieId = location.pathname.split("/")[2];

  // Declaring states

  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieCast, setmovieCast] = useState("");
  const [moviePoster, setmoviePoster] = useState("");
  const [movieRuntime, setmovieRuntime] = useState(null);
  const [movieKeywords, setmovieKeywords] = useState("");
  const [movieTagline, setmovieTagline] = useState("");
  const [movieProduction, setmovieProduction] = useState("");
  const [movieDirector, setmovieDirector] = useState("");
  const [movieposterobj, setmovieposterobj] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const fetched = await axios.get(
          `http://127.0.0.1:8000/movieOperations/getMovie/${movieId}/`
        );
        let json_movie_data = JSON.parse(fetched.data);
        console.log(json_movie_data);
        setMovieTitle(json_movie_data["movieTitle"]);
        setMovieDescription(json_movie_data["movieDescription"]);
        setmovieCast(json_movie_data["movieCast"]);
        setmoviePoster(json_movie_data["moviePoster"]);
        setmovieRuntime(json_movie_data["movieRuntime"]);
        setmovieKeywords(json_movie_data["movieKeywords"]);
        setmovieTagline(json_movie_data["movieTagline"]);
        setmovieProduction(json_movie_data["movieProduction"]);
        setmovieDirector(json_movie_data["movieDirector"]);
      } catch (error) {}
    };
    fetchMovie();
  }, []);

  const completeUpdate = async () => {
    try {
      let updateddata = new FormData();
      updateddata.append("movieTitle", movieTitle);
      updateddata.append("movieDescription", movieDescription);
      updateddata.append("movieCast", movieCast);
      updateddata.append("movieRuntime", movieRuntime);
      updateddata.append("movieKeywords", movieKeywords);
      updateddata.append("movieDirector", movieDirector);
      updateddata.append("movieProduction", movieProduction);
      updateddata.append("movieTagline", movieTagline);
      updateddata.append("moviePoster", movieposterobj);

      // This updated bit will be used in backend to check if poster is null or not
      let updated_bit = 0
      if(movieposterobj!=null)
      {
         updated_bit=1; 
      }
      updateddata.append("updated_bit",updated_bit);
      const update = await axios.post(
        `http://127.0.0.1:8000/movieOperations/updateMovie/${movieId}/`,
        updateddata
      );
      window.location.href = `/ViewMovie/${movieId}`
    } catch (err) {}
  };

  return (
    <div className="editmovie_container">
      <div className="editmovie_left_poster">
        <img
          src={
            movieposterobj ? URL.createObjectURL(movieposterobj) : moviePoster
          }
        />
        <>
          <label htmlFor="profileinput">
            <Tooltip title="Edit Movie Poster">
              <i className="editmovie_cameraicon fas fa-camera"></i>
            </Tooltip>
          </label>
          <input
            type="file"
            accept=".jpg"
            onChange={(e) => setmovieposterobj(e.target.files[0])}
            id="profileinput"
            style={{ display: "none" }}
          />
        </>
      </div>
      <div className="editmovie_right_info">
        <div className="editmovie_info_container">
          <input
            className="inputfield"
            value={movieTitle}
            autoFocus
            onChange={(e) => setMovieTitle(e.target.value)}
          />
          <input
            className="inputfield"
            value={movieDirector}
            onChange={(e) => setmovieDirector(e.target.value)}
          />
          <textarea
            rows="3"
            cols="100"
            className="inputfield"
            value={movieDescription}
            onChange={(e) => setMovieDescription(e.target.value)}
          />
          <input
            className="inputfield"
            value={movieCast}
            onChange={(e) => setmovieCast(e.target.value)}
          />
          <input
            className="inputfield"
            value={movieRuntime}
            onChange={(e) => setmovieRuntime(e.target.value)}
          />
          <input
            className="inputfield"
            value={movieKeywords}
            onChange={(e) => setmovieKeywords(e.target.value)}
          />
          <input
            className="inputfield"
            value={movieTagline}
            onChange={(e) => setmovieTagline(e.target.value)}
          />
          <input
            className="inputfield"
            value={movieProduction}
            onChange={(e) => setmovieProduction(e.target.value)}
          />
          <button
            onClick={completeUpdate}
            className="updatebutton Function_Buttons"
          >
            <i class="fa-solid fa-check"></i> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
