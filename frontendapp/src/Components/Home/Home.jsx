import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import List from "../List/List";
import Slider from "../Slider/Slider";
import NavigationBar from "../NavigationBar/NavigationBar";
const Home = () => {
  const [Movies, setMovies] = useState({});
  const [keys, setKeys] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      const fetched = await axios.get(
        "http://127.0.0.1:8000/movieOperations/Get_All_Genre_Movie/"
      );
      let my_data = fetched.data;
      let my_json_data = JSON.parse(my_data);
      setMovies(my_json_data);
      setKeys(Object.keys(my_json_data));
      // console.log(Object.keys(my_json_data));
    };
    fetchdata();
    console.log(Movies);
  }, []);
  return (
    <>
      <div className="home">
        <NavigationBar />
        <Slider />
        {Movies &&
          Object.keys(Movies).map((keyname, i) => (
            <List genre_name={keyname} movies={Movies[keyname]} />
          ))}
      </div>
    </>
  );
};

export default Home;
