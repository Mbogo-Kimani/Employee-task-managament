import i18next from '../i18n';

export const adminNavItems = [
  {
    name: i18next.t('tasks'),
    icon: 'listCheck',
    href: '/admin/tasks',
    hasOptions: false,
  },
  {
    name: i18next.t('users'),
    icon: 'circleUser',
    href: '/admin/employees',
    hasOptions: false,
  },
  {
    name: i18next.t('clients'),
    icon: 'clients',
    href: '/admin/clients',
    hasOptions: false,
  },
  {
    name: i18next.t('new-circular'),
    href: '/admin/circulars/new_circular',
    icon: 'file',
    hasOptions: false,
  },
  {
    name: i18next.t('reports'),
    icon: 'report',
    hasOptions: false,
    href: '/admin/reports',
  },
  {
    name: i18next.t('maps'),
    icon: 'map',
    hasOptions: false,
    href: '/admin/maps',
  },
  {
    name: "Hotspot",
    icon: 'logout',
    hasOptions: false,
    href: '/hotspot/dashboard',
  },
];

export const adminPageItems = [
  {
    numberToDisplay: '+',
    name: i18next.t('new-task'),
    pictureSrc: '/assets/image/task.png',
    href: '/admin/new_task',
  },
  {
    numberToDisplay: '+',
    name: i18next.t('new-employee'),
    pictureSrc: '/assets/image/teamwork.png',
    href: '/admin/employees?new=true',
  },
  {
    numberToDisplay: '+',
    name: i18next.t('new-client'),
    pictureSrc: '/assets/image/teamwork.png',
    href: '/admin/clients?new=true',
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
