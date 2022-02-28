import React,{useState,useEffect} from 'react'
import './SearchMovie.css'
import ListItem from '../ListItem/ListItem'
import axios from 'axios'



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
    }
    loadUsers();
  }, [])

  const handleChange = async(e) => {
    let matches=[]
    if(e.target.value.length > 0)
    {
        matches = movie.filter(u=>{
            const regex = new RegExp(`${e.target.value}`,"i");
            return u.movieTitle.match(regex)
        })
    }
    let tmpMovieId=[]
    let tmpMoviePoster=[]
    for (var i = 0; i < matches.length; i++) {
        let tmp = []
        console.log(matches[i].movieId)
        tmp.push(matches[i].movieId)
        tmp.push(matches[i].moviePoster)
        tmpMovieId.push(tmp)
    }
  
    let tmpMovieTitle=[]
    for (var i = 0; i < matches.length; i++) {
        tmpMovieTitle.push(matches[i].movieTitle);
    }
    
    setMovieList(tmpMovieId);
    setMovieTitles(tmpMovieTitle);
    // setMoviePosters(tmpMoviePoster);
    
  }
  // console.log(movieList)
  return (
      <>
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
      </>
  )
}

export default SearchMovie