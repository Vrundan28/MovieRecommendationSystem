import React,{useContext, useEffect,useState} from 'react';


import {PieChart} from 'react-minimal-pie-chart';
import axios from 'axios';
import { Context } from '../../context/Context';

function Graph () {
  const {user} = useContext(Context);
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchRatio = async() =>{
      try{
        const fetched = await axios(
          `http://127.0.0.1:8000/accounts/getRatios/${user.userId}/`
        )
        let my_fetchmovie = fetched.data;
        let my_json_fetchmovie = JSON.parse(my_fetchmovie);
        setData(my_json_fetchmovie["movies"]);
      }catch(err){  }
    }
    fetchRatio();
  }, [])
  
    return (
      <>
          <PieChart
            animation
            animationDuration={500}
            animationEasing="ease-out"
            center={[180, 60]}
            data={data}
            label={(data) => (data.dataEntry.value+"%")}
            labelPosition={65}
            labelStyle={{
              fontSize: ".3vw",
              fontColor: "FFFFFA",
              fontWeight: "500",
            }}
            // lengthAngle={360}
            // lineWidth={30}
            // paddingAngle={0}
            // rounded
            radius={50}
            startAngle={0}
            viewBoxSize={[450,100]}
          />
      </>
    );
  }

export default Graph;
