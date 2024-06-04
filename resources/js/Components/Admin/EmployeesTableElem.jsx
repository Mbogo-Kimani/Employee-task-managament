import React, { useState } from 'react';
import clearanceLevel from '../../data/enums/clearanceLevel';
import departmentEnum from '../../data/enums/department';
import Icon from '../Common/Icon';
import { router } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react'
import DropDown from '../Common/DropDown';

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
           <DropDown>
                <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-green-200 text-black' : 'text-gray-900'
                            } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                            onClick={() => navigateToIndividualTasks(elem.id)}               
                        >
                            <Icon src='eyeOpen' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                            <span className='block py-3 px-2'>View Tasks</span>   
                        </button>
                        )}
                </Menu.Item>  
                <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-200 text-black' : 'text-gray-900'
                    } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                    onClick={() => openModal('edit', elem.id)}
                  >
                    <Icon src='edit' className='w-4 h-4 mr-2' fill='rgb(34 197 94)'/>
                    <span className='block py-3 px-2'>Edit</span>
                  </button>
                )}
              </Menu.Item>  
           </DropDown>
        </td>
    </tr>
  )
}

export default EmployeesTableElem;
