import React from 'react';
// import { PieChart, Pie} from 'recharts';
import {Pie} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'

const state = {
    labels: ['January', 'February', 'March','April', 'May'],
    datasets: [
    {
        label: 'Rainfall',
        backgroundColor: [
        '#B21F00',
        '#C9DE00',
        '#2FDE00',
        '#00A6B4',
        '#6800B4'
    ],
    hoverBackgroundColor: [
        '#501800',
        '#4B5000',
        '#175000',
        '#003350',
        '#35014F'
    ],
    data: [5, 6, 7, 8, 9]
}]}  
  
Chart.register(ArcElement);
export default class App extends React.Component  {
  
// Sample data
//   console.log("vrundan")

render() {
    return (
      <div>
        <Pie
          data={state}
          height="400vh"
          width="400vw"
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            maintainAspectRatio: false 
          }}
        />
          
      </div>
    );
  }
}
  
// export default Graph;