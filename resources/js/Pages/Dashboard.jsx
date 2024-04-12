import React, { useEffect, useState } from 'react'
import DashboardItem from '../Components/DashboardItem'
import SideNav from '../Layouts/SideNav';
import adminNavItems from '../../data/adminNavItems';
import inventoryPageItems from '../../data/inventoryPageItems';
import storeManagerPageItems from '../../data/storeManager';

// { user, employees, departments, pendingLeaves, users, totalTasks }
function Home(props) {
  const [day, setDay] = useState('');
  const [dateUK, setDateUK] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setDay(date.toLocaleString('en-US', { weekday: 'long' }));
      setDateUK(date.toLocaleString('en-UK'))
    }, 1000);
    
    // Cleanup function to clear the interval when component unmounts or when state is set
    return () => clearInterval(intervalId);
  }, []);

  return (
    <SideNav>
      <div>
        <div className="page-header ">
          <span id="dayOfWeek" className="page-heading" style={{fontSize: '30px'}}>{ day }</span>
          <br/>
          <span id='ct7' className="page-heading text-[25px]" style={{fontSize: '25px'}}>{ dateUK }</span>
          <p className="text-lg animated-text"> <span>Hello, </span>
            <span className="font-bold ">{ props.user?.name }</span>
            <span> Welcome </span>
            <span>to </span>
            <span>Elephant </span>
            <span>Technologies </span>
          </p>
          <hr/>
        </div>
        <section className="mb-3 lg:mb-5">
          <div className="flex flex-wrap mt-6">
            {
              (Array.isArray(adminNavItems) ? adminNavItems : []).map((item, idx) => {
                return (
                  <DashboardItem
                    key={idx}
                    numberToDisplay={props[item.numberToDisplay]}
                    textToDisplay={item.textToDisplay}
                    pictureSrc={item.pictureSrc}
                    href={item.href}
                  />
                )
              })
            }
          </div>
        </section>
      </div>
    </SideNav>
  )
}

export default Home
