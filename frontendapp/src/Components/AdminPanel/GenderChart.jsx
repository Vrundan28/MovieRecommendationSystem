import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import {
  PieChart,
  Pie,
  BarChart,
  YAxis,
  XAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { VictoryPie } from "victory-pie";
import { Tooltip } from "@mui/material";
const GenderChart = () => {
  const [male_percent, set_male_percent] = useState(null);
  const [female_percent, set_female_percent] = useState(null);
  const [genders, set_genders] = useState(null);
  //   let state = []
  const [state, setstate] = useState({});
  const [gendersCount, set_genders_count] = useState(null);
  const [jsontemp, set_json_tmp] = useState([]);
  useEffect(() => {
    const fetchgendersRatio = async () => {
      try {
        const fetched = await axios.get(
          "http://127.0.0.1:8000/accounts/getGenderRatio/"
        );
        let json_data = JSON.parse(fetched.data);
        console.log(json_data);
        set_genders(json_data);
      } catch (err) {}
    };
    const fetchgendersCount = async () => {
      try {
        const fetched = await axios.get(
          "http://127.0.0.1:8000/accounts/getGenderCount/"
        );
        let json_data = JSON.parse(fetched.data);
        console.log(json_data);
        set_genders_count(json_data);
      } catch (err) {}
    };
    fetchgendersRatio();
    fetchgendersCount();
  }, []);

  return (
    <div className="genderchart_container">
      <div className="analytic_heading">Gender of Website's users</div>
      <div className="charts_container">
        <div className="pie_chart_container">
          <VictoryPie
            animate
            data={genders}
            radius={100}
            labels={({ datum }) => `${datum.x} : ${datum.y}%`}
            colorScale={["Blue", "Green"]}
          />
        </div>
        <div className="bar_chart_container">
          {/* <Bar data={state} /> */}
          {/* <BarChart width={300} height={300} data={gendersCount} barSize={20}>
            <XAxis
              datakey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              datakey="value"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
            <Tooltip />
            <Legend />
            <CartesianGrid />
            <Bar  />
          </BarChart> */}
          {/* <BarChart width={300} height={300}>
            <Bar data={gendersCount && gendersCount[0].value} fill="green" />
            <Bar data={gendersCount && gendersCount[1].value} fill="green" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
          </BarChart> */}
        </div>
      </div>
    </div>
  );
};

export default GenderChart;
