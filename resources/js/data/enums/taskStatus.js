export default {
  1: 'Pending',
  2: 'Awaiting Department Approval',
  3: 'Awaiting Admin Approval',
  4: 'Rejected',
  5: 'Done',
  PENDING: 1,
  AWAITING_APPROVAL_BY_DEPARTMENT_HEAD: 2,
  AWAITING_APPROVAL_BY_ADMIN: 3,
  REJECTED: 4,
  DONE: 5,
};

export const taskStatusKeys = {
  1: 'Pending',
  2: 'Awaiting Department Approval',
  3: 'Awaiting Admin Approval',
  4: 'Rejected',
  5: 'Done',
}

export const taskStatusKeys = [
  {
    id: 1,
    name: 'Pending',
    key: 'PENDING',
    description: 'Task is still in progress',
    color: 'var(--gray)',
    icon: 'spinner',
  },
  {
    id: 2,
    name: 'Awaiting Department Approval',
    key: 'AWAITING_APPROVAL_BY_DEPARTMENT_HEAD',
    description: 'Task awaits approval from the head of department',
    color: 'rgb(59 130 246)',
    icon: 'hourglass',
  },
  {
    id: 3,
    name: 'Awaiting Admin Approval',
    key: 'AWAITING_APPROVAL_BY_ADMIN',
    description: 'Task awaits approval from the admin',
    color: 'rgb(6 182 212)',
    icon: 'hourglass',
  },
  {
    id: 4,
    name: 'Rejected',
    key: 'REJECTED',
    description: 'The task has not met the criteria required',
    color: 'rgb(239 68 68)',
    icon: '',
  },
  {
    id: 5,
    name: 'Done',
    key: 'DONE',
    description: 'The task is completed and approved',
    color: 'rgb(34 197 94)',
    icon: '',
  },
];
