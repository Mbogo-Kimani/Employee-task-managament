import React from 'react'
import DropDown from '../Common/DropDown'
import { Menu } from '@headlessui/react'
import Icon from '../Common/Icon'

const ClientTableElem = ({elem,onDelete}) => {
    const getStatus = () => {
      
        let subs = elem.subscriptions.filter((sub) => {
            return sub.expires_at > Date.now()
        })
        return subs.length
    }
  return (
    <tr  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { elem.name }
      </th>
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        { elem.email }
      </th>

      <td className="px-2 py-4">
        { elem.phone_number }
      </td>
      <td
        scope="row"
        className="px-2 py-4"
      >
        { elem.street_package?.name }
      </td>
      <td className="px-5 pb-3">
        <span className={`absolute rounded-full ${getStatus() ? 'bg-green-400' : 'bg-red-400'} w-4 h-4 p-2`}></span>
      </td>
      <td className="px-5 text-xl">
        {elem.sessions}
      </td>
        <td className="px-2 py-4 relative">
            <DropDown>
                  {/* <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-green-200 text-black' : 'text-gray-900'
                      } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                    //   onClick={() => openDeleteModal(elem)}
                    >
                      <Icon src='trash' className='w-4 h-4 mr-2' fill='rgb(34 197 94)'/>
                      <span className='block py-3 px-2'>Activate</span>
                    </button>
                  )}
                </Menu.Item>   */}
                  <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-green-200 text-black' : 'text-gray-900'
                      } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                      onClick={() => onDelete(elem)}
                    >
                      <Icon src='trash' className='w-4 h-4 mr-2' fill='rgb(220, 38, 38)'/>
                      <span className='block py-3 px-2'>Remove</span>
                    </button>
                  )}
                </Menu.Item>  
            </DropDown>
        </td>
    </tr>
  )
}

export default ClientTableElem