import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';




const ClientChart = ({clientData}) => {
  let chartData = {
    labels: ['Jan', 'Feb', 'Mar','Apr','May'],
    datasets: [
      {
        id: 1,
        label: 'clients',
        data: clientData,
      }
    ],
  }
  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 1,
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

export default ClientChart