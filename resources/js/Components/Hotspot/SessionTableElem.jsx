import React from 'react'
import DropDown from '../Common/DropDown'
import { Menu } from '@headlessui/react'
import Icon from '../Common/Icon'

const SessionTableElem = ({elem,onDelete}) => {
  return (
    <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { elem.user }
      </th>
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { elem.ip }
      </th>

      <td className="px-2 py-4">
        { elem.mac }
      </td>
      <td
        scope="row"
        className="px-2 py-4"
      >
        { elem.started_at }
      </td>
        <td className="px-2 py-4 relative">
            <DropDown>
                  <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-green-200 text-black' : 'text-gray-900'
                      } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                      onClick={() => onDelete(elem.mac)}
                    >
                      <Icon src='trash' className='w-4 h-4 mr-2' fill='rgb(34 197 94)'/>
                      <span className='block py-3 px-2'>Remove</span>
                    </button>
                  )}
                </Menu.Item>  
            </DropDown>
        </td>
    </tr>
  )
}

export default SessionTableElem