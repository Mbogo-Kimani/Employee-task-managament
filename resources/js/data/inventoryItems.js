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
  {
    name: 'Equipments',
    href: '/equipments',
    icon: 'equipment',
    hasOptions: false,
  },
  {
    name: 'Assigned Equipments',
    href: '/assigned-equipments',
    icon: 'equipment',
    hasOptions: false,
  },
  {
    name: 'Stocks',
    href: '/equipments/stocks',
    icon: 'stock',
    hasOptions: false,
  },
];

export const storeManagerPageItems = [
  {
    name: 'My Tasks',
    numberToDisplay: 'totalTasks',
    pictureSrc: 'assets/image/users.png',
    href: `/tasks`,
  },
  {
    name: 'Tasks to Assign',
    numberToDisplay: 'tasksNotAssigned',
    href: '/unassigned_tasks',
    pictureSrc: 'assignment',
  },
  {
    name: 'Tasks Assigned',
    numberToDisplay: 'tasksAssigned',
    href: '/assigned_tasks',
    pictureSrc: 'assignment',
  },
];
