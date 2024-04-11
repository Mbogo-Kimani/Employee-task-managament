import React from 'react'
import DashboardItem from '../Components/DashboardItem'
import SideNav from '../Layouts/SideNav';

function Home({ user, employees, departments, pendingLeaves, users, totalTasks }) {
  const data = [
    {
      numberToDisplay: employees,
      textToDisplay: 'Total Employees',
      pictureSrc: 'assests/image/teamwork.png',
      href: '/Employee/viewEmployee',
    },
    {
      numberToDisplay: totalTasks,
      textToDisplay: 'Assigned Task',
      pictureSrc: 'assests/image/task.png',
      href: '/Task/TaskList',
    },
    {
      numberToDisplay: departments,
      textToDisplay: 'Departments',
      pictureSrc: 'assests/image/department.png',
      href: '/Networking/department',
    },
    {
      numberToDisplay: pendingLeaves,
      textToDisplay: 'Leave Request',
      pictureSrc: 'assests/image/leave.png',
      href: '/Leave/LeaveStatus',
    },
    {
      numberToDisplay: users,
      textToDisplay: 'Assigned Task',
      pictureSrc: 'assests/image/users.png',
      href: '/users',
    },
    {
      numberToDisplay: null,
      textToDisplay: 'Payrolls History',
      pictureSrc: 'assests/image/money.png',
      href: '/users',
    },
  ];

  // const currentDateTime = 

  return (
    <SideNav>
      <div>
        <div className="page-header ">
          <span id="dayOfWeek" className="page-heading" style={{fontSize: '30px'}}>Thursday</span>
          <br/>
          <span id='ct7' className="page-heading text-[25px]" style={{fontSize: '25px'}}>04-11-2024 - 10:14 AM</span>
          <p className="text-lg animated-text"> <span>Hello, </span>
            <span className="font-bold ">{ user?.name }</span>
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
              (Array.isArray(data) ? data : []).map((item, idx) => {
                return (
                  <DashboardItem
                    key={idx}
                    numberToDisplay={item.numberToDisplay}
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
