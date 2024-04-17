export const adminNavItems = [
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

export const adminPageItems = [
  {
    numberToDisplay: 'users',
    name: 'Total Employees',
    pictureSrc: 'assests/image/teamwork.png',
    href: '/admin/employees',
  },
  // {
  //   numberToDisplay: 'totalTasks',
  //   name: 'Assigned Task',
  //   pictureSrc: 'assests/image/task.png',
  //   href: '/Task/TaskList',
  // },
  // {
  //   numberToDisplay: 'departments',
  //   name: 'Departments',
  //   pictureSrc: 'assests/image/department.png',
  //   href: '/Networking/department',
  // },
  // {
  //   numberToDisplay: 'pendingLeaves',
  //   name: 'Leave Request',
  //   pictureSrc: 'assests/image/leave.png',
  //   href: '/Leave/LeaveStatus',
  // },
  // {
  //   numberToDisplay: 'users',
  //   name: 'Assigned Task',
  //   pictureSrc: 'assests/image/users.png',
  //   href: '/users',
  // },
  // {
  //   numberToDisplay: null,
  //   name: 'Payrolls History',
  //   pictureSrc: 'assests/image/money.png',
  //   href: '/users',
  // },
];

export default adminNavItems;
