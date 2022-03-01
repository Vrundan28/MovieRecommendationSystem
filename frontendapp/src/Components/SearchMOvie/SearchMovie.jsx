import React,{useState,useEffect} from 'react'
import './SearchMovie.css'
import ListItem from '../ListItem/ListItem'
import axios from 'axios'
import { Link } from 'react-router-dom'



const SearchMovie = () => {

  const [movieList, setMovieList] = useState([])
  const [movieTitles, setMovieTitles] = useState([])
  const [movie, setMovie] = useState([])
  const componentArray = [];

  useEffect(() => {
    const loadUsers = async() => {
        const res = await axios.get(`http://127.0.0.1:8000/movieOperations/GetAllMovie/`)
        let movie_data = res.data
        let movie_json_data = JSON.parse(movie_data)
        console.log(movie_json_data["AllMovies"])
        setMovie(movie_json_data["AllMovies"])
        // console.log(movie_json_data["AllMovies"][0].movieGenre)
    }
    loadUsers();
  }, [])
// console.log(movie[0].movieGenre)
  const handleChange = async(e) => {
    let matches=[]
    let matches1=[]
    let matches2=[]
    let matches3=[]
    if(e.target.value.length > 0)
    {
      try{
        matches = movie.filter(u=>{
            const regex = new RegExp(`${e.target.value}`,"i");
            return (u.movieTitle && u.movieTitle.match(regex))
        })
        matches1 = movie.filter(u=>{
          const regex = new RegExp(`${e.target.value}`,"i");
          return (u.movieGenre && u.movieGenre.match(regex))
        })
        matches2 = movie.filter(u=>{
          // console.log(u.movieCast)
          const regex = new RegExp(`${e.target.value}`,"i")
          return (u.movieCast && u.movieCast.match(regex))
        })
        matches3 = movie.filter(u=>{
          const regex = new RegExp(`${e.target.value}`,"i");
          return (u.movieKeyword && u.movieKeyword.match(regex))
        })
      }
      catch(err)
      {
        console.log(err)
      }
    }
    // console.log(matches)
    let tmpMovieId=[]
    let tmpMoviePoster=[]
    for (var i = 0; i < matches.length; i++) {
      if(tmpMovieId.length >50)
        break
      let tmp = []
      // console.log("matches")
      tmp.push(matches[i].movieId)
      tmp.push(matches[i].moviePoster)
      tmpMovieId.push(tmp)
    }
    for (i = 0; i < matches1.length; i++) {
      if(tmpMovieId.length >50)
        break
      let tmp = []
      // console.log("matches1")
      tmp.push(matches1[i].movieId)
      tmp.push(matches1[i].moviePoster)
      tmpMovieId.push(tmp)
    }
    for ( i = 0; i < matches2.length; i++) {
      if(tmpMovieId.length >50)
        break
      let tmp = []
      // console.log("matches2")
      tmp.push(matches2[i].movieId)
      tmp.push(matches2[i].moviePoster)
      tmpMovieId.push(tmp)
    }
    for ( i = 0; i < matches3.length; i++) {
      if(tmpMovieId.length >50)
        break
      let tmp = []
      // console.log("matches3")
      tmp.push(matches3[i].movieId)
      tmp.push(matches3[i].moviePoster)
      tmpMovieId.push(tmp)
    }
    

    let tmpMovieTitle=[]
    for ( i = 0; i < matches.length; i++) {
        tmpMovieTitle.push(matches[i].movieTitle);
    }
    
    setMovieList(tmpMovieId);
    setMovieTitles(tmpMovieTitle);
    // setMoviePosters(tmpMoviePoster);
    
  }
  // console.log(movieList)
  return (
      <>
      <Link to="/" className='linkClass icon searchMovie_back'><i className="fa-solid fa-arrow-left"></i></Link>
        <div className='searchMovie_header'>
          <i className="fa-solid fa-magnifying-glass icon"></i>
          <form enctype="multipart/form-data">
            <input type="text" className='searchMovie_input' placeholder='Search Movie' onChange={(e)=>handleChange(e)} />
          </form>
        </div>
        
        <div className='searchMovie_body'>
          <div className='searchMovie_body_child'>
            <h2>Movies & TV Shows</h2>
            <div className='searchMovie_body_left'>
              <div className='searchMovie_body_left_child'>
              {
                movieList.length != 0 &&
                  movieList.map((m) => (
                      <ListItem movieId={m[0]} moviePoster={m[1]} />
                  ))
              }
              
              </div>
            </div>
          </div>
          <div className='searchMovie_body_right'>
            <div className='searchMovie_body_right_child'>
              <h2>Suggestions</h2>
              <div className='searchMovie_body_right_child'>  
              {
                  movieTitles.map((m) => (
                    <h4 className='searchMovie_suggestions'>{m}</h4>
                  ))
              }
              </div>
              
            </div>
          </div>
        </div>
        {
          (movieList.length == 0) && <h2 className='searchMovie_notfound'>No Movies Found </h2>
        }
      </>
  )
}

export default SearchMovie