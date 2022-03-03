import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router';
import './PlayMovie.css'

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
        let json_user = JSON.parse(currMovie.data);
        const movieVideo1 = "http://127.0.0.1:8000/media/" + json_user.movieUrl;
        setMovieVideo(movieVideo1);
        console.log(movieVideo1)
        console.log(currMovie.data);
      }
      catch (err) {
        console.log("Not Found");
      }
    }
    fetchMovie()
    
  }, []);


  return (
    <div className='container'>
      <video className='container_video' src={movieVideo} controls></video>
    </div>
    );
};

        export default PlayMovie;
