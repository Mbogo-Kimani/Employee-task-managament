import React, { useState } from 'react';
import NavItem from '../Components/NavItem';
import requestHandler from '../services/requestHandler';
import Icon from '../Components/Icon';
import { Link } from '@inertiajs/react';

function SideNav({ navItems, children }) {
  function navigateToLogout() {
    requestHandler.post('/logout');
  }

  const [collapsed, setCollapsed] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const expandOnItemClick = () => {
    if (collapsed) {
      setCollapsed(false);
    }
  };

  return (
    <div className={`flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen ${collapsed ? 'collapsed' : ''}`}>
      <nav className='bg-white dark:bg-gray-800 h-[50px] w-full text-gray-900 dark:text-gray-100 flex items-center fixed z-10 shadow-md'>
        <Icon className='w-[20px] h-[20px] hover:bg-gray-100 hover:text-[var(--purple)] ml-4 cursor-pointer' onClick={toggleCollapse} src='/icons/burger.svg'/>
        <Link className='ml-4 w-[100px] h-[auto] block my-auto' href="/dashboard">
          <img src="/images/Elephant.png" alt="Dashboard Image"/>
        </Link>
        <div className="flex grow"/>
        <div className="relative">
          <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
            <span className="mr-1"></span>
            <svg
              className={`w-3 h-3  transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow">
              <ul className="py-2 text-sm text-gray-700">
              <li>
                  <button className='block px-4 py-2 hover:bg-gray-100' onClick={navigateToLogout}>Profile</button>
                </li>
                <li>
                  <button className='block px-4 py-2 hover:bg-gray-100' onClick={navigateToLogout}>Logout</button>
                </li>
                
              </ul>
            </div>
          )}
        </div>
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
                onClick={expandOnItemClick}
              />
            ))}
          </ul>
        </nav>
        <div className='pt-8 px-8 w-full'>
          { children }
        </div>
      </div>
    </div>
  )
}

export default SideNav;
