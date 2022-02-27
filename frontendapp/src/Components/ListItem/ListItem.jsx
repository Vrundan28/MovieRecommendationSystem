import React, { useState, useEffect } from "react";
import "./ListItem.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ListItem = ({ movieId, moviePoster }) => {
  const [movieUrl, setMovieUrl] = useState("");
  useEffect(() => {
    const setUseState = () => {
      let tmpUrl = "";
      tmpUrl += "/ViewMovie/";
      tmpUrl += movieId;
      setMovieUrl(tmpUrl);
    };
    setUseState();
  }, [movieId]);
  // console.log(movieId,moviePoster)

  return (
    <div className="listitem">
      <Link to={movieUrl}>
        <img src={moviePoster} alt="vrundan" />
      </Link>
    </div>
  );
};

export default ListItem;
