import React, { useEffect, useState } from 'react'
import DashboardItem from '../Components/DashboardItem'
import SideNav from '../Layouts/SideNav';
import pageAndNavItemsDeterminer, { pageData as defaultPageData } from '../data/indexNav';

function Home(props) {
  const [day, setDay] = useState('');
  const [dateUK, setDateUK] = useState('');
  const [pageItems, setPageItems] = useState(defaultPageData);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      setDay(date.toLocaleString('en-US', { weekday: 'long' }));
      setDateUK(date.toLocaleString('en-UK'))
    }, 1000);
    
    // Cleanup function to clear the interval when component unmounts or when state is set
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setPageItems(
      pageAndNavItemsDeterminer(props.user?.role, props.user?.clearance_level)
    );
  }, [])

  return (
    <SideNav navItems={pageItems.navItems} user={props?.user}>
      <div>
        <div className="page-header text-gray-900 dark:text-gray-100">
          <span id="dayOfWeek" className="page-heading" style={{fontSize: '30px'}}>{ day }</span>
          <br/>
          <span id='ct7' className="page-heading text-[25px]" style={{fontSize: '25px'}}>{ dateUK }</span>
          <p className="text-lg animated-text"> <span>Hello, </span>
            <span className="font-bold ">{ props.user?.name }</span>
          </p>
          <hr/>
        </div>
        <section className="mb-3 lg:mb-5">
          <div className="flex flex-wrap mt-6">
            {
              (Array.isArray(pageItems.pageItems) ? pageItems.pageItems : []).map((item, idx) => {
                return (
                  <DashboardItem
                    key={idx}
                    numberToDisplay={item.numberToDisplay === '+' ? item.numberToDisplay : props[item.numberToDisplay]}
                    textToDisplay={item.name}
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
