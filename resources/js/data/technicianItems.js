export const technicianNavtems = [
  {
    name: 'My Tasks',
    href: '/tasks',
    icon: 'listCheck',
  },
  // {
  //   name: 'Replacement Requests',
  // },
];

export const technicianPageItems = [
  {
    name: 'Tasks',
    // numberToDisplay: 'tasks',
    numberToDisplay: 'totalTasks',
    href: '/tasks',
    pictureSrc: 'listCheck',
  },
  // {
  //   name: 'New Product',
  // },
  // {
  //   name: 'Register Faulty Product',
  // },
  // {
  //   name: 'Product in for Maitenance',
  // },
  // {
  //   name: 'Product in for Replacement',
  // },
];

export const leadTechnicianNavItems = [
  // {
  //   name: 'Maintenance tasks',
  // },
  // {
  //   name: 'Replacement Requests',
  // },
  {
    name: 'My Tasks',
    href: '/tasks',
    icon: 'listCheck',
    hasOptions: false,
  },
  {
    name: 'Tasks Unassigned',
    href: '/unassigned_tasks',
    icon: 'assignment',
    hasOptions: false,
  },
];

export const leadTechnicianPageItems = [
  {
    name: 'My Tasks',
    // numberToDisplay: 'tasks',
    numberToDisplay: 'totalTasks',
    href: '/tasks',
    pictureSrc: 'listCheck',
  },
  {
    name: 'Tasks to Assign',
    numberToDisplay: 'tasksNotAssigned',
    href: '/unassigned_tasks',
    pictureSrc: 'assignment',
  },
  // {
  //   name: 'Register Faulty Product',
  // },
  // {
  //   name: 'Product in for Maitenance',
  // },
  // {
  //   name: 'Product in for Replacement',
  // },
  // {
  //   name: 'View Replacement Requests',
  // },
];