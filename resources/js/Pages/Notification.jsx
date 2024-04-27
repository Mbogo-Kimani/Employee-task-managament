import React, { useEffect, useState } from 'react'
import SideNav from '../Layouts/SideNav'
import {
  pageData as defaultPageData,
  navItemsDeterminer
} from '../data/indexNav';
import requestHandler from '../services/requestHandler';

function Notification({ user }) {
  const [navItems, setNavItems] = useState(defaultPageData.navItems);
  const [circulars, setCirculars] = useState({
    data: [],
    from: 1,
    last_page: 0,
    per_page: 20,
    prev_page_url: null,
    next_page_url: null,
    to: 0,
    total: 0,
  });

  useEffect(() => {
    setNavItems(navItemsDeterminer(user?.role, user?.clearance_level));
    requestHandler.get('/api/circulars', setCirculars);
  }, []);

  return (
    <SideNav navItems={navItems} user={user}>
      <ul className='w-full'>
        {
          (Array.isArray(circulars.data) ? circulars.data : []).map((item, index) => {
            return (
              <li
                key={item.id || index}
                className='flex'
              >
                {/* <div className="w-3 h-3 rounded-full border border-gray-500"></div> */}
                <div
                  className='w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-md px-4 py-3'
                >
                  <h1 className='text-lg font-bold'>
                    {item.title || ''}
                  </h1>
                  <hr />
                  <p className='text-md mt-3'>
                    {item.content || ''}
                  </p>

                </div>
              </li>
            );
          })
        }
      </ul>
    </SideNav>
  )
}

export default Notification