import React, { useState, useEffect, useContext } from "react";
import List1 from "../List1/List1";
import List from "../List/List";
import NavigationBar from "../NavigationBar/NavigationBar";
import axios from "axios";
import { Context } from "../../context/Context";
import './Getrecommendations1.css'


const Recommendations = () => {
  const [Movies, setMovies] = useState({});
  const [keys, setKeys] = useState([]);
  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    const fetchdata = async () => {
      const data = new FormData();
      data.append("id", 2);
      const fetched = await axios.get(
        `http://127.0.0.1:8000/movieOperations/getCollab/${user.userId}/`
      );
      console.log(fetched.data)
      let my_data = fetched.data;
      let my_json_data = JSON.parse(my_data)
      setMovies(my_json_data);
      // setKeys(Object.keys(my_json_data));
      
      // console.log(fetched.data)
      // console.log(Object.keys(my_json_data));
    };
    fetchdata();
    // console.log(keys)
  }, []);

  // console.log(Movies);
  return (
    <>
      <NavigationBar />
      <div className="recommendation_container">
      {Movies &&
        Object.keys(Movies).map((keyname, i) => (
          <List1 genre_name={keyname} movies={Movies[keyname]} />
        ))}
      </div>
    </>
  );
};

export default Recommendations;
