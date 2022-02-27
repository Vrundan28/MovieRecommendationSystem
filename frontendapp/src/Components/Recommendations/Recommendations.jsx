import React,{useState,useEffect} from 'react'
import List1 from '../List1/List1'
import NavigationBar from '../NavigationBar/NavigationBar';
import axios from 'axios';

const Recommendations = () => {
    const [Movies, setMovies] = useState({});
    const [keys, setKeys] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            const data = new FormData()
            data.append('id', 2)
            const fetched = await axios.get(
                "http://127.0.0.1:8000/accounts/getLiked/2/"
            );
            let my_data = fetched.data;
            let my_json_data = JSON.parse(my_data);
            // console.log(my_json_data)
            setMovies(my_json_data);
            setKeys(Object.keys(my_json_data));
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
            {Movies &&
                Object.keys(Movies).map((keyname, i) => (
                <List1 genre_name={keyname} movies={Movies[keyname]} />
            ))}
        </>
    )
}

export default Recommendations