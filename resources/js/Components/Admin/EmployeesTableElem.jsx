import React, { useState } from 'react';
import clearanceLevel from '../../data/enums/clearanceLevel';
import departmentEnum from '../../data/enums/department';
import Icon from '../Common/Icon';
import { router } from '@inertiajs/react';

function EmployeesTableElem({ elem, openModal }) {
  const [viewMenu, setViewMenu] = useState(false);

  function navigateToIndividualTasks(id) {
    router.visit(`/admin/employees/${id}/tasks`)
  }

  return (
    <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { elem.name }
      </th>
      <td
        scope="row"
        className="px-2 py-4"
      >
        { departmentEnum[elem.role] }
      </td>
      <td className="px-2 py-4">
        { elem.email }
      </td>
      <td className="px-2 py-4">
        { clearanceLevel[elem.clearance_level] }
      </td>
      <td className="px-2 py-4 relative">
        <Icon src='menu' className='w-5 h-5 cursor-pointer hover:scale-105' fill='var(--gray)' onClick={() => setViewMenu(!viewMenu)}/>
        {
          viewMenu
          ?
          (
            <div className="bg-white absolute top-[70%] left-[-100%] min-w-[100px] border z-10 h-fit">
              <div
                className="w-full border-b dark:hover:text-blue-300 hover:text-blue-500 cursor-pointer flex items-center"
                onClick={() => navigateToIndividualTasks(elem.id)}
              >
                <Icon src='eyeOpen' className='w-4 h-4 ml-2' fill='rgb(59 130 246)'/>
                <span className='block py-3 px-2'>View Tasks</span>
              </div>
              <div
                className="w-full border-b dark:hover:text-blue-300 hover:text-blue-500 cursor-pointer flex items-center"
                onClick={() => openModal('edit', elem.id)}
              >
                <Icon src='edit' className='w-4 h-4 ml-2' fill='rgb(59 130 246)'/>
                <span className='block py-3 px-2'>Edit</span>
              </div>
            </div>
          )
          :
          <></>
        }
      </td>
    </tr>
  )
}

export default EmployeesTableElem;
