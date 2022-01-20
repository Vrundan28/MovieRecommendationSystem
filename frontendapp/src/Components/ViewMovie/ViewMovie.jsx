import React,{useEffect} from 'react';
import axios from 'axios';

const ViewMovie = () => {
     useEffect(() => {
        const fetchMovie = async () => {
            try {
                const currMovie = await axios.get(`http://127.0.0.1:8000/movieOperations/getMovie/4813/`);
                console.log(currMovie.data);
            }
            catch (err) {
                console.log("Not Found");
            }
        }
        fetchMovie()

    }, [])
  return (
    <>

    </>
    );
};

export default ViewMovie;
