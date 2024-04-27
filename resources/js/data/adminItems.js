export const adminNavItems = [
  {
    name: 'Departments',
    icon: 'building',
    hasOptions: true,
    href: '#',
    options: [
      {
        name: 'Admin',
      },
      {
        name: 'Marketing',
      },
      {
        name: 'Technicians',
      },
      {
        name: 'Accounting/finance',
      },
      {
        name: 'Inventory',
      },
      {
        name: 'Customer Service',
      },
      {
        name: 'Project Management',
      },
    ],
  },
  // {
  //   name: 'Employees',
  //   icon: '/icons/user-group.svg',
  //   hasOptions: true,
  // },
  // {
  //   name: 'Attendance',
  //   icon: '/icons/clock.svg',
  //   hasOptions: true,
  // },
  // {
  //   name: 'Leave',
  //   icon: '/icons/leave.svg',
  //   hasOptions: true,
  // },
  {
    name: 'Tasks',
    icon: 'listCheck',
    href: '/admin/tasks',
    hasOptions: false,
  },
  {
    name: 'Users',
    icon: 'circleUser',
    href: '/admin/employees',
    hasOptions: false,
  },
  {
    name: 'New Circular',
    href: '/admin/circulars/new_circular',
    icon: 'file',
    hasOptions: false,
  },
  {
    name: 'Reports',
    icon: 'report',
    hasOptions: false,
    href: '/admin/reports'
  },
];

export const adminPageItems = [
  {
    numberToDisplay: '+',
    name: 'New Task',
    pictureSrc: 'assets/image/task.png',
    href: '/admin/new_task',
  },
  {
    numberToDisplay: 'users',
    name: 'Total Employees',
    pictureSrc: 'assets/image/teamwork.png',
    href: '/admin/employees',
  },
  // {
  //   numberToDisplay: 'departments',
  //   name: 'Departments',
  //   pictureSrc: 'assets/image/department.png',
  //   href: '#',
  // },
  // {
  //   numberToDisplay: 'pendingLeaves',
  //   name: 'Leave Request',
  //   pictureSrc: 'assets/image/leave.png',
  //   href: '/Leave/LeaveStatus',
  // },
  // {
  //   numberToDisplay: 'users',
  //   name: 'Assigned Task',
  //   pictureSrc: 'assets/image/users.png',
  //   href: '/users',
  // },
  // {
  //   numberToDisplay: null,
  //   name: 'Payrolls History',
  //   pictureSrc: 'assets/image/money.png',
  //   href: '/users',
  // },
];

export default adminNavItems;
