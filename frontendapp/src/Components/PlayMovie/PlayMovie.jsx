import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';

const PlayMovie = () => {
  // const [movie, setMovie] = useState(null);
  const [movieVideo, setMovieVideo] = useState("");
  const location = useLocation();
  const movieId = location.pathname.split('/')[2];

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const currMovie = await axios.get(`http://127.0.0.1:8000/movieOperations/getMovie/${movieId}/`);
        // setMovie(currMovie.data);
        const movieVideo1 = "http://127.0.0.1:8000/media/" + currMovie.data.movieUrl;
        setMovieVideo(movieVideo1);
        console.log(currMovie.data);
        console.log(movieVideo1)
      }
      catch (err) {
        console.log("Not Found");
      }
    }
    fetchMovie()
  }, []);


  return (
    <>
      <video width="80%" height="80%" src={movieVideo} controls></video>
    </>
    );
};

        export default PlayMovie;
