export const technicianNavtems = [
  {
    name: 'My Tasks',
    href: '/tasks',
    icon: 'icons/list-check.svg',
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
    pictureSrc: 'icons/list-check.svg',
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
    icon: 'icons/list-check.svg',
    hasOptions: false,
  },
  {
    name: 'Tasks Unassigned',
    href: '/unassigned_tasks',
    icon: 'icons/assignment.svg',
    hasOptions: false,
  },
];

export const leadTechnicianPageItems = [
  {
    name: 'My Tasks',
    // numberToDisplay: 'tasks',
    numberToDisplay: 'totalTasks',
    href: '/tasks',
    pictureSrc: 'icons/list-check.svg',
  },
  {
    name: 'Tasks to Assign',
    numberToDisplay: 'tasksNotAssigned',
    href: '/unassigned_tasks',
    pictureSrc: 'icons/assignment.svg',
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
