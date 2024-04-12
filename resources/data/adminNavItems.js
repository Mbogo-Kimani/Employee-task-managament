const adminNavItems = [
  {
    numberToDisplay: 'employees',
    textToDisplay: 'Total Employees',
    pictureSrc: 'assests/image/teamwork.png',
    href: '/Employee/viewEmployee',
  },
  {
    numberToDisplay: 'totalTasks',
    textToDisplay: 'Assigned Task',
    pictureSrc: 'assests/image/task.png',
    href: '/Task/TaskList',
  },
  {
    numberToDisplay: 'departments',
    textToDisplay: 'Departments',
    pictureSrc: 'assests/image/department.png',
    href: '/Networking/department',
  },
  {
    numberToDisplay: 'pendingLeaves',
    textToDisplay: 'Leave Request',
    pictureSrc: 'assests/image/leave.png',
    href: '/Leave/LeaveStatus',
  },
  {
    numberToDisplay: 'users',
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

export default adminNavItems;
