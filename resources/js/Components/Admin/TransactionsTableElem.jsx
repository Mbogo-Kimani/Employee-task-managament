import React from 'react';
import DropDown from '../Common/DropDown';
import { Menu, Transition } from '@headlessui/react';
import department from '../../data/enums/department';
import Icon from '../Common/Icon';

const TransactionsTableElem = ({elem}) => {                                                                                                                                                                                                                                              
  console.log(elem);
      // Date Format options
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
  return (
    <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
      {/* <th
        scope='row'
        className='px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {elem.client?.acc_no}
      </th> */}
      <td className='px-2 py-4 text-center'>{elem.client?.name}</td>
      <td scope='row' className='px-2 py-4'>
        {elem.phone_number}
      </td>
      <td className='px-4 py-4'>SH {elem.amount}</td> 
      <td className='px-2 py-4'>{new Date(elem.created_at).toLocaleString('en-US', options)}</td>
      <td className='px-2 py-4'>{elem.payment_confirmation}</td>
      <td className={`py-4`}><span className={`block text-center w-[8rem] rounded m-2 ${elem.taken ? 'bg-green-400 text-white' : 'bg-red-500 text-white'} bg-green-200`}>{elem.taken ? 'Success' : 'Failed'}</span></td>
      <td className='px-2 py-4 relative'>
        <DropDown>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? 'bg-green-200 text-black' : 'text-gray-900'
                } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                //   onClick={() => openDeleteModal(elem)}
              >
                <Icon
                  src='trash'
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
