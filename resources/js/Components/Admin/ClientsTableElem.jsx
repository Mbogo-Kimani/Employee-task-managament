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
        {elem.address}
      </td>
      <td className="px-2 py-4">    
        {elem.resident_building}
      </td>
      <td className="px-2 py-4">    
        {elem.resident_hse_no}
      </td>
      <td className="px-2 py-4">    
        {elem.status}
      </td>
      <td className="px-2 py-4">    
        {elem.payment_method}
      </td>
    </tr>
  )
}

export default EmployeesTableElem;
