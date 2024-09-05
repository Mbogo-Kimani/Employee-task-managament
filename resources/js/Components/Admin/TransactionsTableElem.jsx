import React from 'react';
import DropDown from '../Common/DropDown';
import { Menu, Transition } from '@headlessui/react';
import department from '../../data/enums/department';

const TransactionsTableElem = ({elem}) => {                                                                                                                                                                                                                                              
  console.log(elem);
  
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      <th
        scope='row'
        className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {elem.client?.acc_no}
      </th>
      <td className='px-2 py-4'>{elem.client?.name}</td>
      <td scope='row' className='px-2 py-4'>
        {elem.phone_number}
      </td>
      <td className='px-2 py-4'>{elem.amount}</td>
      <td className='px-2 py-4'>{elem.payment_confirmation}</td>
      <td className='px-2 py-4'>{elem.date}</td>
      <td className='px-2 py-4'>{elem.status}</td>
      <td className='px-2 py-4 relative'>
        <DropDown>
          <Menu.Item>
            {({ active }) => ( 
              <button
                className={`${
                  active ? 'bg-green-200 text-black' : 'text-gray-900'
                } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                //   onClick={() => openModal('edit', elem)}
              >
                <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)' />
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
                //   onClick={() => openDeleteModal(elem)}
              >
                <Icon
                  src='eyeOpen'
                  className='w-4 h-4 mr-2'
                  fill='rgb(34 197 94)'
                />
                <span className='block py-3 px-2'>Delete</span>
              </button>
            )}
          </Menu.Item>
        </DropDown>
      </td>
    </tr>
  );
};

export default TransactionsTableElem;
