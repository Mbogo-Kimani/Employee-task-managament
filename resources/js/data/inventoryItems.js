import department from "./enums/department";

export const inventoryNavtems = [
  {
    name: 'Maintenance tasks',
    icon: '/icons/screwdriver.svg',
    hasOptions: false,
  },
  {
    name: 'Replacement Requests',
    icon: '/icons/hammer.svg',
    hasOptions: false,
  },
];

export const inventoryPageItems = [
  {
    name: 'My Tasks',
    // numberToDisplay: 'tasks',
    numberToDisplay: 'totalTasks',
    pictureSrc: 'assets/image/task1.png',
    href: '/tasks',
  },
  // {
  //   name: 'New Product',
  //   pictureSrc: 'assets/image/inspiration.png',
  //   href: '/tasks'
  // },
  // {
  //   name: 'Register Faulty Product',
  //   pictureSrc: 'assets/image/disruption.png',
  // },
  // {
  //   name: 'Product in for Maitenance',
  //   pictureSrc: 'assets/image/zoom.png',
  // },
  // {
  //   name: 'Product in for Replacement',
  //   pictureSrc: 'assets/image/workflow.png',
  // },
];

export const storeManagerNavItems = [
  {
    name: 'Maintenance tasks',
    icon: '/icons/screwdriver.svg',
    hasOptions: false,
  },
  {
    name: 'Replacement Requests',
    icon: '/icons/hammer.svg',
    hasOptions: false,
  },
];

export const storeManagerPageItems = [
  {
    name: 'My Tasks',
    // numberToDisplay: 'tasks',
    numberToDisplay: 'totalTasks',
    pictureSrc: 'assets/image/users.png',
    href: `/tasks`,
  },
  {
    name: 'Tasks to Assign',
    numberToDisplay: 'tasksNotAssigned',
    href: '/unassigned_tasks'
  },
  {
    name: 'Tasks Assigned',
    numberToDisplay: 'tasksAssigned',
    href: '/assigned_tasks'
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
