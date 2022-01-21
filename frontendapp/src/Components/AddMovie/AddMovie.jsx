import React,{useState} from 'react';
import './AddMovie.css';
import axios from 'axios';

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
    <div class="add_movie_container">
        <h1 class="add_movie_title">Add Movie</h1>
        <form className="createMovie" enctype="multipart/form-data" onSubmit={(e) => handleMovieUpload(e)}>
          <div class="add_movie_form">
              <div class="add_movie_form_field">
                <div>Movie Title :</div>
                <input class="add_movie_input" value={movie_title} onChange={(e)=>set_movie_title(e.target.value)} type="text" name="movie_title" />
              </div>
              <div class="add_movie_form_field">
                <div>Movie Description :</div>
                <textarea type="text" value={movie_description} onChange={(e)=>set_movie_description(e.target.value)} class="add_movie_input" name="movie_description" />
              </div>
              <div class="add_movie_form_field">
                <div>Movie Keywords :</div>
                <input type="text" value={movie_keywords} onChange={(e)=>set_movie_keywords(e.target.value)} class="add_movie_input" name="movie_keywords" />
              </div>
              <div class="add_movie_form_field">
                <div>Cast :</div>
                <input type="text"value={movie_cast} onChange={(e)=>set_movie_cast(e.target.value)} class="add_movie_input" name="movie_cast" />
              </div>
              <div class="add_movie_form_field">
                <div>Director :</div>
                <input type="text" value={movie_director} onChange={(e)=>set_movie_director(e.target.value)} class="add_movie_input" name="movie_director" />
              </div>
              <div class="add_movie_form_field">
                <div>Production :</div>
                <input class="add_movie_input" value={movie_production} onChange={(e)=>set_movie_production(e.target.value)} type="text" name="movie_production" />
              </div>
              <div class="add_movie_form_field">
                <div>Runtime(in mins) :</div>
                <input type="number" value={movie_runtime} onChange={(e)=>set_movie_runtime(e.target.value)} class="add_movie_input" name="movie_runtime" min="0" placeholder='120'/>
              </div>
              {/* Thinking that in future we will give checkboxes for genre */}
              <div class="add_movie_form_field">
                <div>Genres :</div>
                  <input class="add_movie_input" value={movie_genre} onChange={(e)=>set_movie_genre(e.target.value)} type="text" name="movie_genre"/>
              </div>
              <div class="add_movie_form_field">
                <div>Tagline :</div>
                <input type="text" class="add_movie_input" value={movie_tagline} onChange={(e)=>set_movie_tagline(e.target.value)} name="movie_tagline"/>
              </div>
              <div class="add_movie_form_field">
                <div>Movie Poster :</div>
                <input type="file" class="add_movie_input"  onChange={(e)=>set_movie_poster(e.target.files[0])} name="movie_poster"/>
              </div>
              <div class="add_movie_form_field">
                <div>Movie Video :</div>
                <input class="add_movie_input" onChange={(e)=>set_movie_video(e.target.files[0])} type="file" name="movie_video"/>
              </div>
              <button name="add_movie_btn" type='submit'>
                Add Movie
              </button>
          </div>
        </form>
    </div>
    
  </>);
};

export default AddMovie;
