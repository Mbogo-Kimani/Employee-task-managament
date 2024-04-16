import React from 'react'
import NavItem from '../Components/NavItem';
import requestHandler from '../services/requestHandler';

function SideNav({ navItems, children }) {
  function navigateToLogout() {
    requestHandler.post('/logout');
  }

  return (
    <div className='flex flex-col bg-gray-100 dark:bg-gray-900 min-h-screen'>
      <nav className='bg-[var(--purple)] h-[50px] w-full text-gray-100 flex items-center fixed z-10'>
        <a className='ml-4 mr-auto' href="/dashboard">Dashboard</a>
        <form action="">
          <button
            className='ml-auto mr-4 px-4 py-2 rounded-md hover:bg-gray-100 hover:text-[var(--purple)]'
            onClick={navigateToLogout}
          >
            Logout
          </button>
        </form>
        {/* Elephant Technologies */}
      </nav>
      <div className='flex pt-[50px]'>
        <nav className='bg-white dark:bg-gray-800 dark:text-gray-100 min-h-screen w-[200px]'>
          <ul>
            {
              (Array.isArray(navItems) ? navItems : []).map(item => {
                return (
                  <NavItem
                    key={item.name}
                    src={item.icon}
                    name={item.name}
                    hasOptions={item.hasOptions}
                    options={item.options}
                  />
                )
              })
            }
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