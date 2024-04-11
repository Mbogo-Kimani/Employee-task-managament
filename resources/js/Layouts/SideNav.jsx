import React from 'react'
import NavItem from '../Components/NavItem';

function SideNav({ children }) {
  const navItems = [
    {
      name: 'Departments',
      icon: '/icons/building.svg',
      hasOptions: true,
      options: [
        {
          name: 'Admin'
        },
        {
          name: 'Marketing'
        },
        {
          name: 'Networking'
        },
        {
          name: 'Accounting/finance'
        },
        {
          name: 'Inventory'
        },
        {
          name: 'Customer Service'
        },
        {
          name: 'Project Management'
        },
      ]
    },
    {
      name: 'Employees',
      icon: '/icons/user-group.svg',
      hasOptions: true,
    },
    {
      name: 'Attendance',
      icon: '/icons/clock.svg',
      hasOptions: true,
    },
    {
      name: 'Leave',
      icon: '/icons/leave.svg',
      hasOptions: true,
    },
    {
      name: 'Task',
      icon: '/icons/list-check.svg',
      hasOptions: true,
    },
    {
      name: 'Users',
      icon: '/icons/circle-user.svg',
      hasOptions: false,
    },
    {
      name: 'Notices',
      icon: '/icons/check.svg',
      hasOptions: false,
    },
  ];

  return (
    <div className='flex flex-col bg-gray-100 min-h-screen'>
      <nav className='bg-[var(--purple)] h-[50px] w-full text-gray-100 flex items-center fixed'>
        <a className='ml-4 mr-auto' href="/dashboard">Dashboard</a>
        {/* Elephant Technologies */}
      </nav>
      <div className='flex pt-[50px]'>
        <nav className='bg-white min-h-screen w-[200px]'>
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