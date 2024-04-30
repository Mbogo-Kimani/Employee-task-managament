import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';




const BarChart = ({pendingData, ongoingData}) => {
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
        label: 'Ongoig',
        data: ongoingData,
      },
    ],
  }
  return (
    <div>
      <Bar 
       data={chartData}
       />
    </div>
  )
};

export default BarChart