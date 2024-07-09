import React from 'react'
import DropDown from '../Common/DropDown';
import { Menu, Transition } from '@headlessui/react'


const AccountsTableElem = () => {
  return (
    <div>
        <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                { elem.name }
            </th>
      </tr>
    </div>
  )
}

export default AccountsTableElem