import React, { useState } from 'react';
import clearanceLevel from '../../data/enums/clearanceLevel';
import departmentEnum from '../../data/enums/department';
import Icon from '../Common/Icon';
import { router } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react'
import DropDown from '../Common/DropDown';


function ClientsTableElem({ elem, openModal, openDeleteModal }) {
  const [viewMenu, setViewMenu] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);

  function navigateToIndividualTasks(id) {
    router.visit(`/admin/employees/${id}/tasks`)
  }

  function getStatus(date,plan){
    let startDate = new Date(date)
    let endDate = new Date(startDate.setMonth(startDate.getMonth() + plan));
    
    return endDate >= new Date()
  }
  return (
    <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { elem.name }
      </th>

      <td className="px-2 py-4">
        { elem.email }
      </td>
      <td
        scope="row"
        className="px-2 py-4"
      >
        { elem.phone_number }
      </td>
      <td className="px-2 py-4">
        { elem.address }
      </td>
      <td className="px-2 py-4">    
        {elem.resident_building}
      </td>
      <td className="px-2 py-4">    
        {elem.resident_hse_no}
      </td>
      <td className="px-2 py-4">    
        {elem.payment_date ? getStatus(elem.payment_date, elem.payment_plan) ? "Active" : "Inactive" : "Pending"}
      </td>
      <td className="px-2 py-4">    
        {elem.payment_method}
      </td>
      <td className="px-2 py-4">    
        {elem.payment_plan}
      </td>
      <td className="px-2 py-4 relative">
           <DropDown>
                <Menu.Item>
                        {({ active }) => (
                        <button
                            className={`${
                            active ? 'bg-green-200 text-black' : 'text-gray-900'
                            } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                            onClick={() => openModal('edit', elem)}               
                        >
                            <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                            <span className='block py-3 px-2'>Edit</span>   
                        </button>
                        )}
                </Menu.Item>  
                <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-green-200 text-black' : 'text-gray-900'
                    } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                    onClick={() => openDeleteModal(elem)}
                  >
                    <Icon src='eyeOpen' className='w-4 h-4 mr-2' fill='rgb(34 197 94)'/>
                    <span className='block py-3 px-2'>Delete</span>
                  </button>
                )}
              </Menu.Item>  
           </DropDown>
      </td>
    </tr>
  )
}

export default ClientsTableElem;
