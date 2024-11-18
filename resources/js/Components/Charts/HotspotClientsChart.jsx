import React from 'react'
import { Bar } from 'react-chartjs-2';

const HotspotClientsChart = ({clientData,title}) => {
    const dates = [
        'Sun','Mon','Tue','Wed','Thur','Fri','Sat'
    ]
    const sortData = () => {
        let data = [0,0,0,0,0,0,0];
        clientData?.forEach((stat) => {
            data[stat.day - 1] = stat.count
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
}

export default HotspotClientsChart