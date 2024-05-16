import React from 'react'
import {Bar} from 'react-chartjs-2'
import Chart from 'chart.js/auto';




const EmployeeChart = ({users,data}) => {
  let chartData = {
    labels: users.length && users?.map((user) => {
        return user.user
    }),
    datasets: [
      {
        id: 1,
        label: 'tasks',
        axis: 'y',
        data: data,
        borderWidth: 0,
        barPercentage: 0.5,
        categoryPercentage: 0.8,
      }
    ],
  }
  const options = {
    indexAxis: 'y',
    scales: {
        y: {
            grid: {
                drawBorder: false, 
            },
            maxTicksLimit: data.length,
            ticks: {
                stepSize: 1,
                min:0,
                max: data.lengh,
                autoSkip: false
            }, 
            barThickness: 50,
        },
        x: {
            grid: {
                drawBorder: false, 
            },

        }
    }
  };
  return (
    <div className='w-[80vw] h-[100vh]'>
      <Bar 
       data={chartData}
       options={options}
       />
    </div>
  )
};

export default EmployeeChart