import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';



const BarChart = ({pendingData, ongoingData, finishedData}) => {
  const {t} = useTranslation()
  
  let chartData = {
    labels: ['Jan', 'Feb', 'Mar','Apr','May'],
    datasets: [
      {
        id: 1,
        label: t('pending'),
        data: pendingData,
      },
      {
        id: 2,
        label: t('ongoing'),
        data: ongoingData,
      },
      {
        id: 2,
        label: t('completed'),
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