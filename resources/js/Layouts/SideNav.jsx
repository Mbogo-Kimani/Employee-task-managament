import React, { useState } from 'react';
import NavItem from '../Components/NavItem';
import requestHandler from '../services/requestHandler';
import Icon from '../Components/Icon';

// Import your downloaded SVG icon from the icons folder
//import BurgerIcon from './icons/burger.svg';

function SideNav({ navItems, children }) {
  function navigateToLogout() {
    requestHandler.post('/logout');
  }

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`flex flex-col bg-gray-100 min-h-screen ${collapsed ? 'collapsed' : ''}`}>
      <nav className='bg-[var(--purple)] h-[50px] w-full text-gray-100 flex items-center fixed z-10'>
        <a className='ml-4' href="/dashboard">Dashboard</a> {/* Move Dashboard link before collapse button */}
        <Icon className='w-[20px] h-[20px] hover:bg-gray-100 hover:text-[var(--purple)] ml-4 cursor-pointer' onClick={toggleCollapse} src='/icons/burger.svg'/>
        {/* <img src={BurgerIcon} alt="Burger Icon" className="px-4 py-2 text-xl hover:bg-gray-100 hover:text-[var(--purple)] ml-4 cursor-pointer" onClick={toggleCollapse} /> */}
        <div className="flex-grow" /> {/* Pushes the logout button to the far right */}
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
        <nav className={`bg-white min-h-screen w-[${collapsed ? '50' : '200'}px] transition-all duration-300 ease-in-out`}>
          <ul>
            {(Array.isArray(navItems) ? navItems : []).map(item => (
              <NavItem
                key={item.name}
                src={item.icon}
                name={item.name}
                hasOptions={item.hasOptions}
                options={item.options}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </nav>
        <div className='pt-8 px-8'>
          { children }
        </div>
      </div>
    </div>
  )
}

export default SideNav;
