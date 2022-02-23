import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListItem from "../ListItem/ListItem";
import "./list.scss";
import { useRef, useState } from "react";
// {genre_name,movies}
const List = ({ genre_name, movies }) => {
  const listReference = useRef();
  const [isMoved, setIsMoved] = useState(false);
  const [slideNumber, setSlideNumber] = useState(0);
  const [movieList, setMovieList] = useState(movies);

  const Slide = (direction) => {
    let distance = listReference.current.getBoundingClientRect().x - 50;
    if (direction == "backward" && slideNumber > 0) {
      setSlideNumber(slideNumber - 1);
      if (slideNumber == 0) {
        setIsMoved(false);
      }
      listReference.current.style.transform = `translateX(${distance + 232}px)`;
    }
    if (direction == "forward" && slideNumber < 25) {
      // Replace with n-4 when making dynamic
      setIsMoved(true);
      setSlideNumber(slideNumber + 1);
      listReference.current.style.transform = `translateX(${distance - 232}px)`;
    }
  };

  return (
    <>
      <div className="list">
        <span className="listTitle">Action</span>
        <div className="wrapper">
          <ArrowBackIosIcon
            className="arrow backward"
            style={{ display: !isMoved && "none" }}
            onClick={() => Slide("backward")}
          />
          <div ref={listReference} className="container">
            {/* <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem />
            <ListItem /> */}

            {movieList.map((m) => (
              <ListItem movieId={5} />
            ))}
            {/* <ListItem movieId={4803}/>
                    <ListItem movieId={4803}/>
                    <ListItem movieId={4803}/>
                    <ListItem movieId={4803}/>
                    <ListItem movieId={4803}/>
                    <ListItem movieId={4803}/>
                    <ListItem movieId={4803}/>
                    <ListItem movieId={4803}/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/>
                    <ListItem/> */}
          </div>
          <ArrowForwardIosIcon
            className="arrow forward"
            onClick={() => Slide("forward")}
          />
        </div>
      </div>
    </>
  );
};

export default List;
