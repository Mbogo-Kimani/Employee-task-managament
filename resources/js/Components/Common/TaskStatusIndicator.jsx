import React from 'react'
import Icon from './Icon';
import { taskStatusKeys } from '../../data/enums/taskStatus';

function TaskStatusIndicator({ status }) {
  const statusComp = taskStatusKeys.find(key => key.id === status);
  
  if (statusComp) {
    return (
      <>
        {
          statusComp.icon ?
          <Icon src={statusComp.icon} className='h-4 w-4' fill={statusComp.color || 'var(--gray)'} title={statusComp.name || ''}/>
          :
          <div className="rounded-full w-4 h-4" style={{ background: (statusComp.color || 'var(--gray)')}} title={statusComp.name || ''} />
        }
      </>
    );
  } else {
    return <Icon src='spinner' className='h-4 w-4' fill={'var(--gray)'} title='pending' />
  }
}

export default TaskStatusIndicator;
