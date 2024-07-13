import React, { useState } from 'react';
import clearanceLevel from '../../data/enums/clearanceLevel';
import departmentEnum from '../../data/enums/department';
import Icon from '../Common/Icon';
import { router } from '@inertiajs/react';
import { Menu, Transition } from '@headlessui/react'
import DropDown from '../Common/DropDown';
import department from '../../data/enums/department';
import connectionStatus from '../../data/enums/connectionStatus';


function ClientsTableElem({ elem, openModal, openDeleteModal, currentUser, packages = [] }) {
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

  function connectionColor(status) {
    if (status === connectionStatus.ONLINE) return 'text-green-500';
    else if (status === connectionStatus.ACTIVE) return 'text-blue-500';
    else if (status === connectionStatus.BLOCKED) return 'text-red-500';
  }
  return (
    <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { elem.acc_no }
      </th>
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
        {elem.apartment_no}
      </td>
      <td className={`px-2 py-4 ${connectionColor(elem.connection_status)}`}>    
        {connectionStatus[elem.connection_status] || ''}
      </td>
      <td className="px-2 py-4">    
        {elem.billing_day}
      </td>
      <td className="px-2 py-4 uppercase">    
        {packages.find(item => item.id === elem.internet_package_id)?.capacity || ''}
      </td>
      {
        (currentUser?.role === department.ADMIN || currentUser?.role === department.ACCOUNTING_AND_FINANCE)  &&
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
      }
    </tr>
  )
}

export default ClientsTableElem;
