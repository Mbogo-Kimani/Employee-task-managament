import React, { useRef, useState, useEffect } from 'react';
import DropDown from '../Common/DropDown';
import { Menu } from '@headlessui/react';
import Icon from '../Common/Icon';

const ClientTableElem = ({ elem }) => {
  const [dropUp, setDropUp] = useState(false);
  const dropdownRef = useRef(null);

  const getStatus = () => {
    let subs = elem.subscriptions.filter((sub) => {
      return sub.expires_at > Date.now();
    });
    return subs.length;
  };

  // Adjust dropdown position based on available viewport space
  const handleDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setDropUp(rect.bottom + 150 > viewportHeight);
    }
  };

  useEffect(() => {
    handleDropdownPosition();
    window.addEventListener('resize', handleDropdownPosition);
    window.addEventListener('scroll', handleDropdownPosition);

    return () => {
      window.removeEventListener('resize', handleDropdownPosition);
      window.removeEventListener('scroll', handleDropdownPosition);
    };
  }, [elem]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {elem.name}
      </th>
      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {elem.email}
      </th>

      <td className="px-2 py-4">
        {elem.phone_number}
      </td>
      <td scope="row" className="px-2 py-4">
        {elem.street_package?.name}
      </td>
      <td className="px-5 py-4 flex justify-center">
        <span className={`rounded-full ${getStatus() ? 'bg-green-400' : 'bg-red-400'} w-4 h-4 p-2`}></span>
      </td>
      <td className="px-5 text-xl">
        {elem.sessions}
      </td>
      <td className="px-2 py-4 relative" ref={dropdownRef}>
        <DropDown className={`${dropUp ? 'bottom-0 mb-2' : 'mt-2'}`}>
          <div
            className={`absolute w-48 right-0 ${
              dropUp ? 'bottom-full mb-14' : 'top-full mt-2'
            } z-50 bg-white shadow-lg rounded-md overflow-hidden`}
            style={{
              maxHeight: '200px', // Set maximum height for dropdown
              overflowY: 'auto', // Enable scrolling within the dropdown if it overflows
            }}
          >
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-green-200 text-black' : 'text-gray-900'
                  } group flex w-full border-b items-center rounded-md px-2  text-sm mb-2`}
                >
                  <Icon src="edit" className="w-4 h-4 mr-2" fill="rgb(34, 197, 94)" />
                  <span className="block py-3 px-2">Activate</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active ? 'bg-red-200 text-black' : 'text-gray-900'
                  } group flex w-full border-b items-center rounded-md px-2  text-sm`}
                >
                  <Icon src="trash" className="w-4 h-4 mr-2" fill="rgb(255, 0, 0)" />
                  <span className="block py-3 px-2">Remove</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </DropDown>
      </td>
    </tr>
  );
};

export default ClientTableElem;
