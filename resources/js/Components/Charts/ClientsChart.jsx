import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';



const ClientChart = ({clientData}) => {
  const {t} = useTranslation()
  let chartData = {
    labels: ['Jan', 'Feb', 'Mar','Apr','May'],
    datasets: [
      {
        id: 1,
        label: t('clients'),
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