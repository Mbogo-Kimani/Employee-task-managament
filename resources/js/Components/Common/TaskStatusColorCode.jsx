import React from 'react'
import { taskStatusKeys } from '../../data/enums/taskStatus';
import Icon from './Icon';

function TaskStatusColorCode() {
  return (
    <div className='flex flex-col lg:flex-row mb-5'>
			{
        (Array.isArray(taskStatusKeys) ? taskStatusKeys : []).map((stat, index) => {
          return (
            <div key={stat.id || index} className="flex flex-start mx-5 items-center">
              {
                stat.icon ?
                <Icon src={stat.icon} className='h-4 w-4' fill={stat.color || 'var(--gray)'} />
                :
                <div className="rounded-full w-4 h-4" style={{ background: (stat.color || 'var(--gray)'),}}/>
              }
              <span className="text-semibold text-md px-2">{stat.name}</span>
            </div>
          )
        })
      }
    </div>
  )
}

export default TaskStatusColorCode;
