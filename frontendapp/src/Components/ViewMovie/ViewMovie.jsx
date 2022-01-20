import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './ViewMovie.css';
import { Link, useLocation } from 'react-router-dom';



const ViewMovie = () => {
    const location = useLocation()
    const movieId = location.pathname.split('/')[2]
    const [movie, setmovie] = useState(null);
    const [moviePoster, setmoviePoster] = useState("");

     useEffect(() => {
        const fetchMovie = async () => {
            try {
                const currMovie = await axios.get(`http://127.0.0.1:8000/movieOperations/getMovie/${movieId}/`);
                setmovie(currMovie.data);
                const moviePoster1 = "http://127.0.0.1:8000/media/"+currMovie.data.moviePoster;
                setmoviePoster(moviePoster1);
                // console.log(currMovie.data);
                console.log(moviePoster1)
            }
            catch (err) {
                console.log("Not Found");
            }
        }
        fetchMovie()
    }, []);

    const handleClick = () => {
        window.location.replace(`/PlayMovie/${movieId}`);
    }
  return (
    <>
        <div className='view_movie_container'>
            <h2>{movie.movieTitle}</h2><br /><br />
            <img src={moviePoster} className='view_movie_poster' alt='movie_poster'></img><br /><br />
            <h4>{movie.movieDescription}</h4><br /><br />
            <h4> Genre : {movie.movieGenre}</h4>
            <h5>Director : {movie.movieDirector}</h5><br />
            <h5>Cast : {movie.movieCast}</h5><br />
            <h6>Production : {movie.movieProduction}</h6><br /><br />
            <button onClick={handleClick}>PLay Video</button> 
        </div>
    </>
    );
};

export default ViewMovie;
