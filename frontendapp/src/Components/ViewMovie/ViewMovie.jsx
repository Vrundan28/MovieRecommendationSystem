import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './ViewMovie.css';
import { useLocation } from 'react-router-dom';
import List from '../List/List';


const ViewMovie = () => {
    const location = useLocation()
    const movieId = location.pathname.split('/')[2]
    const [movie, setmovie] = useState(null);
    const [moviePoster, setmoviePoster] = useState("https://wallpapercave.com/wp/wp1816342.jpg");
    // moviePoster = "https://wallpapercave.com/wp/wp1816342"
    // console.log(movieId)
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const currMovie = await axios.get(`http://127.0.0.1:8000/movieOperations/getMovie/${movieId}/`);                
                setmovie(currMovie.data);
                console.log(currMovie.data)
                // const moviePoster1 = "http://127.0.0.1:8000/media/"+currMovie.data.moviePoster;
                // setmoviePoster(currMovie.data.m);
                // console.log(currMovie.data);
                // console.log(moviePoster1)
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

    const handleLike = async() => {
        try{
            const Senddata = {
                "userId":3,
                "movieId":movieId
            }
            const likeMovie = await axios.post(`http://127.0.0.1:8000/movieOperations/likeMovie/`,Senddata);
            console.log(likeMovie.data)
        }
        catch(err)
        {

        }
    }

    return (
    
        <header className="Movie_background" style={{
            backgroundSize:"cover",
            backgroundImage:`url(${moviePoster})`,
            backgroundPosition:"center center"
        }}>
        <div className="Movie_Details">
            <h1 className="Movie_Title">
                {movie.movieTitle}
            </h1>
            <div className="buttons">
                <button onClick={handleClick} className="Function_Buttons"><i class="fa-solid fa-play"></i> Play</button>
                <button onClick={handleLike} className="Function_Buttons"><i class="fa-solid fa-heart"></i> Like</button>
            </div>
            <h1 className="Movie_Description">
                {movie.movieDescription}
            </h1>
        </div>
        <List />
        <List />
        {/* <div className='view_movie_container'>
            <h2>{movie.movieTitle}</h2><br /><br />
            <img src={moviePoster} className='view_movie_poster' alt='movie_poster'></img><br /><br />
            <h4>{movie.movieDescription}</h4><br /><br />
            <h4> Genre : {movie.movieGenre}</h4>
            <h5>Director : {movie.movieDirector}</h5><br />
            <h5>Cast : {movie.movieCast}</h5><br />
            <h6>Production : {movie.movieProduction}</h6><br /><br />
            <button onClick={handleClick}>Play Video</button> 
            <button onClick={handleLike}>Like Movie</button>
        </div> */}
    </header>
    );
};

export default ViewMovie;
