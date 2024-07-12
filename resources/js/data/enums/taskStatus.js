import i18next from '../../i18n';

export default {
  PENDING: 1,
  AWAITING_APPROVAL: 2,
  REJECTED: 3,
  DONE: 4,
};

export const taskStatusKeys = {
  1: 'Pending',
  2: 'Awaiting Approval',
  3: 'Rejected',
  4: 'Done',
};

export const taskStatusRender = [
  {
    id: 1,
    name: i18next.t('pending'),
    key: 'PENDING',
    description: 'Task is still in progress',
    color: 'var(--gray)',
    icon: 'spinner',
  },
  {
    id: 2,
    name: i18next.t('department-approval'),
    key: 'AWAITING_APPROVAL',
    description: 'Task awaits approval from the head of department',
    color: 'rgb(59 130 246)',
    icon: 'hourglass',
  },
  {
    id: 3,
    name: i18next.t('rejected'),
    key: 'REJECTED',
    description: 'The task has not met the criteria required',
    color: 'rgb(239 68 68)',
    icon: '',
  },
  {
    id: 4,
    name: i18next.t('done'),
    key: 'DONE',
    description: 'The task is completed and approved',
    color: 'rgb(34 197 94)',
    icon: '',
  },
];
