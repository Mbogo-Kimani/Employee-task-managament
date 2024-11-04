import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';
import { useTranslation } from 'react-i18next';



const IncomeChart = ({clientData,title}) => {
  const {t} = useTranslation()
  let chartData = {
    labels: ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        id: 1,
        label: title,
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
    <div className='w-[40vw]'>
      <Bar 
       data={chartData}
       options={options}
       />
    </div>
  )
};

export default IncomeChart