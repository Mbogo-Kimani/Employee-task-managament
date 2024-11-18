import React from 'react'
import { Bar } from 'react-chartjs-2';

const HotspotIncomeChart = ({incomeData,title}) => {
    const dates = [
        'Sun','Mon','Tue','Wed','Thur','Fri','Sat'
    ]
    const sortData = () => {
        let data = [0,0,0,0,0,0,0];
        incomeData?.forEach((stat) => {
            data[stat.day - 1] = stat.total_income
        })
        return data
    }
    let chartData = {
        labels: dates,
        datasets: [
          {
            id: 1,
            label: title,
            data: sortData(),
            backgroundColor: "#ee82ee"
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
    <div className='w-[40vw] text-green-200'>
        <Bar 
        data={chartData}
        options={options}
        />
    </div>
  )
}

export default HotspotIncomeChart