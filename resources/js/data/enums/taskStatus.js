import i18next from '../../i18n';

export default {
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
    key: 'AWAITING_APPROVAL_BY_DEPARTMENT_HEAD',
    description: 'Task awaits approval from the head of department',
    color: 'rgb(59 130 246)',
    icon: 'hourglass',
  },
  {
    id: 3,
    name: i18next.t('admin-approval'),
    key: 'AWAITING_APPROVAL_BY_ADMIN',
    description: 'Task awaits approval from the admin',
    color: 'rgb(6 182 212)',
    icon: 'hourglass',
  },
  {
    id: 4,
    name: i18next.t('rejected'),
    key: 'REJECTED',
    description: 'The task has not met the criteria required',
    color: 'rgb(239 68 68)',
    icon: '',
  },
  {
    id: 5,
    name: i18next.t('done'),
    key: 'DONE',
    description: 'The task is completed and approved',
    color: 'rgb(34 197 94)',
    icon: '',
  },
];
