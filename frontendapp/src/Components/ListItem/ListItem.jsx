import React, { useState } from "react";
import "./ListItem.css";
import { Link } from "react-router-dom";

const ListItem = (movieId) => {
  // console.log(movieId.movieId)
  const [movieUrl, setMovieUrl] = useState("/ViewMovie/" + movieId.movieId);
  return (
    <div className="listitem">
      <Link to={movieUrl}>
        <img src="https://wallpaperaccess.com/full/291940.jpg" alt="" />
      </Link>
    </div>
  );
};

export default ListItem;
