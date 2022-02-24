import React, { useState,useEffect } from "react";
import "./ListItem.css";
import { Link } from "react-router-dom";
import axios from "axios";


const ListItem = (movieId,moviePoster) => {
  // const [movie, setMovie] = useState(null)
  // useEffect(() => {
  //   const fetchMovie = async() =>{
  //     try {
  //       const currMovie = await axios.get(
  //         `http://127.0.0.1:8000/movieOperations/getMovie/${movieId.movieId}/`
  //       );
  //       setMovie(currMovie.data);
  //       console.log(currMovie.data);
  //       // const moviePoster1 = "http://127.0.0.1:8000/media/"+currMovie.data.moviePoster;
  //       // setmoviePoster(currMovie.data.m);
  //       // console.log(currMovie.data);
  //       // console.log(moviePoster1)
  //     } catch (err) {
  //       console.log("Not Found");
  //     }
  //   } 
    // fetchMovie()
  // }, [])
  
  // console.log(movieId)
  // console.log(moviePoster.moviePoster)
  const [movieUrl, setMovieUrl] = useState("/ViewMovie/" + movieId.movieId);
  return (
    <div className="listitem">
      <Link to={movieUrl}>
        <img src={movieId.moviePoster} alt="vrundan" />
      </Link>
    </div>
  );
};

export default ListItem;
