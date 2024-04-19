import React, { useState } from 'react';
import NavItem from '../Components/NavItem';
import requestHandler from '../services/requestHandler';
import { Link } from '@inertiajs/react';
import Icon from '../Components/Common/Icon';

function SideNav({ navItems, children }) {
  function navigateToLogout() {
    requestHandler.post('/logout');
  }

  const [collapsed, setCollapsed] = useState(hasLargeWidth());

  function hasLargeWidth() {
    return window.innerWidth < 640;
  }

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen ${collapsed ? 'collapsed' : ''}`}>
      <nav className='bg-white dark:bg-gray-800 h-[50px] w-full text-gray-900 dark:text-gray-100 flex items-center fixed z-10 shadow-md'>
        <Icon src='burger' className='w-[20px] h-[20px] hover:bg-gray-100 hover:text-[var(--purple)] ml-4 cursor-pointer' onClick={toggleCollapse} />
        <Link className='ml-4 w-[100px] h-[auto] block my-auto' href="/dashboard">
          <Icon src="/images/etnet.png" alt="Dashboard Image"/>
        </Link>
        <div className="flex-grow" />
        <form action="">
          <button
            className='mr-4 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-[var(--purple)]'
            onClick={navigateToLogout}
          >
            Logout
          </button>
        </form>
      </nav>
      <div className='flex pt-[50px]'>
      <nav className={`shadow-sm bg-white dark:bg-gray-800 dark:text-gray-100 min-h-screen w-[w-[${collapsed ? '50' : '200'}px] transition-all duration-300 ease-in-out`}>
          <ul>
            {(Array.isArray(navItems) ? navItems : []).map(item => (
              <NavItem
                key={item.name}
                src={item.icon}
                name={item.name}
                hasOptions={item.hasOptions}
                options={item.options}
                href={item.href}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>
        <div className='pt-8 px-8 w-full bg-gray-100 dark:bg-gray-800 overflow-x-hidden'>
          { children }
        </div>
      </div>
    </div>
  )
}

export default SideNav;
