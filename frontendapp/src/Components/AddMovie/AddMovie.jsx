import React,{useState} from 'react';
import './AddMovie.css';
import axios from 'axios';
import NavigationBar from '../NavigationBar/NavigationBar';

const AddMovie = () => {
  const [movie_title,set_movie_title]=useState("")
  const [movie_description,set_movie_description]=useState("")
  const [movie_keywords,set_movie_keywords]=useState("")
  const [movie_cast,set_movie_cast]=useState("")
  const [movie_director,set_movie_director]=useState("")
  const [movie_production,set_movie_production]=useState("")
  const [movie_runtime,set_movie_runtime]=useState(120)
  const [movie_genre,set_movie_genre]=useState("")
  const [movie_tagline,set_movie_tagline]=useState("")
  const [movie_poster,set_movie_poster]=useState(null)
  const [movie_video,set_movie_video]=useState(null)

  const handleMovieUpload = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('movieTitle',movie_title)
    data.append('movieDescription',movie_description)
    data.append('movieKeyword',movie_keywords)
    data.append('movieCast',movie_cast)
    data.append('movieDirector',movie_director)
    data.append('movieProduction',movie_production)
    data.append('movieRuntime',movie_runtime)
    data.append('movieGenre',movie_genre)
    data.append('movieTagline',movie_tagline)
    data.append('moviePoster',movie_poster)
    data.append('movieVideo',movie_video)
    try{
        const data1 = await axios.post(`http://127.0.0.1:8000/movieOperations/uploadMovie/`,data)
        console.log(data1.data)
        let movieId=data1.data.movieId
        window.location.href="/ViewMovie/"+movieId
    }
    catch(err)
    {
      console.log("Not found");
    }

  }


  return(    
  <>
    <div className='container'>
        <img className='addmovie_background_image' src='"../../../public/images/Project2.png"' />
    </div>
    <NavigationBar />
    {/* <div className='navbar_left'>
        <h3 className='navbar_title'>MOVIE</h3>
    </div> */}
    <div className='addmovie_container'>
      <h1 className='addmovie_heading'>AddMovie</h1>
      <form className="createMovie" enctype="multipart/form-data" onSubmit={(e) => handleMovieUpload(e)}>
        <div class="add_movie_form_field">
          <input class="add_movie_input" value={movie_title} onChange={(e)=>set_movie_title(e.target.value)} type="text" name="movie_title" placeholder='Movie Title' />
        </div>
        <div class="add_movie_form_field">
          <textarea type="text" value={movie_description} onChange={(e)=>set_movie_description(e.target.value)} class="add_movie_input" name="movie_description" placeholder='Movie Description' />
        </div>
        <div class="add_movie_form_field">
          <input type="text" value={movie_keywords} onChange={(e)=>set_movie_keywords(e.target.value)} class="add_movie_input" name="movie_keywords" placeholder='Movie Keyword' />
        </div>
        <div class="add_movie_form_field">
          <input type="text"value={movie_cast} onChange={(e)=>set_movie_cast(e.target.value)} class="add_movie_input" name="movie_cast" placeholder='Movie Cast'/>
        </div>
        <div class="add_movie_form_field">
          <input type="text" value={movie_director} onChange={(e)=>set_movie_director(e.target.value)} class="add_movie_input" name="movie_director" placeholder='Movie Director'/>
        </div>
        <div class="add_movie_form_field">
          <input class="add_movie_input" value={movie_production} onChange={(e)=>set_movie_production(e.target.value)} type="text" name="movie_production" placeholder='Movie Production'/>
        </div>
        <div class="add_movie_form_field">
          <input type="number" value={movie_runtime} onChange={(e)=>set_movie_runtime(e.target.value)} class="add_movie_input" name="movie_runtime" min="0" placeholder='120'/>
        </div>
        {/* Thinking that in future we will give checkboxes for genre */}
        <div class="add_movie_form_field">
          <input class="add_movie_input" value={movie_genre} onChange={(e)=>set_movie_genre(e.target.value)} type="text" name="movie_genre" placeholder='Movie Genre'/>
        </div>
        <div class="add_movie_form_field">
          <input type="text" class="add_movie_input" value={movie_tagline} onChange={(e)=>set_movie_tagline(e.target.value)} name="movie_tagline" placeholder='Movie Tagline'/>
        </div>
        <div class="add_movie_form_field">
          <input type="file" class="add_movie_input"  onChange={(e)=>set_movie_poster(e.target.files[0])} name="movie_poster" />
        </div>
        <div class="add_movie_form_field">
          <input class="add_movie_input" onChange={(e)=>set_movie_video(e.target.files[0])} type="file" name="movie_video"/>
        </div>
        <button className="add_movie_btn" type='submit'>
          AddMovie
        </button>
      </form>
    </div>
  
    
  </>);
};

export default AddMovie;
