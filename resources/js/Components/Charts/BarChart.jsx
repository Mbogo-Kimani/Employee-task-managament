import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';




const BarChart = ({pendingData, ongoingData, finishedData}) => {
  // console.log(pendingData,ongoingData,finishedData);
  let chartData = {
    labels: ['Jan', 'Feb', 'Mar','Apr'],
    datasets: [
      {
        id: 1,
        label: 'Pending',
        data: pendingData,
      },
      {
        id: 2,
        label: 'Ongoing',
        data: ongoingData,
      },
      {
        id: 2,
        label: 'Completed',
        data: finishedData,
      },
    ],
  }
  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Set precision to 0 to display integers only
        },
      },
    },
  };
  return (
    <div>
      <Bar 
       data={chartData}
       options={options}
       />
    </div>
  )
};

export default BarChart