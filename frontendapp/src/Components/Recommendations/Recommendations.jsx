import React, { useState, useEffect, useContext } from "react";
import List1 from "../List1/List1";
import List from "../List/List";
import NavigationBar from "../NavigationBar/NavigationBar";
import axios from "axios";
import { Context } from "../../context/Context";
import './Recommendations.css'


const Recommendations = () => {
  const [Movies, setMovies] = useState({});
  const [preferences, setPreferences] = useState({})
  const [keys, setKeys] = useState([]);
  const [keys1, setKeys1] = useState([]);
  const { user, dispatch } = useContext(Context);

  useEffect(() => {
    const fetchdata = async () => {
      const data = new FormData();
      data.append("id", 2);
      const fetched = await axios.get(
        `http://127.0.0.1:8000/accounts/getLiked/${user.userId}/`
      );
      const fetched1 = await axios.get(
        `http://127.0.0.1:8000/accounts/getPreferences/${user.userId}/`
      )
      let my_data = fetched.data;
      let my_data1 = fetched1.data;
      let my_json_data = JSON.parse(my_data);
      let my_json_data1 = JSON.parse(my_data1)
      console.log(my_json_data1)
      setMovies(my_json_data);
      setKeys(Object.keys(my_json_data));
      
      setPreferences(my_json_data1);
      setKeys1(Object.keys(my_json_data1));
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
        {preferences &&
        Object.keys(preferences).map((keyname, i) => (
          <List genre_name={keyname} movies={preferences[keyname]} />
        ))}
      </div>
    </>
  );
};

export default Recommendations;
