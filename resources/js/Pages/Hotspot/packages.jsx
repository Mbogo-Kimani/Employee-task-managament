import React, { useEffect, useState, useRef } from 'react';  // <-- Added useRef
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import requestHandler from '../../services/requestHandler';
import { loaderSetter } from '../../Components/Common/Loader';
import TableComp from '../../Components/Common/TableComp';
import DropDown from '../../Components/Common/DropDown';
import { Menu } from '@headlessui/react';
import Icon from '../../Components/Common/Icon';

const Packages = () => {
  const [streetPackages, setStreetPackages] = useState([]);

  const fetchPackages = () => {
    requestHandler.get('/api/street_packages', setStreetPackages, null, loaderSetter);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <HotspotLayout>
      <div className='max-h-[600px] mb-60 overflow-y-auto shadow-md sm:rounded-lg mt-2'>
        <TableComp
          columns={['Name', 'Duration', 'Devices', 'Cost', 'Description', 'Action']}
        >
          {streetPackages?.map((elem, index) => {
            return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={elem.id || index}>
                <th
                  scope='row'
                  className="px-4 py-1 font-medium text-gray-900 whitespace-normal dark:text-white"
                >
                  {elem.name}
                </th>
                <th
                  scope='row'
                  className="px-4 py-1 font-medium text-gray-900 whitespace-normal dark:text-white"
                >
                  {elem.duration / 60 < 60
                    ? `${elem.duration / 60} minutes`
                    : elem.duration / 60 < 1440
                    ? `${elem.duration / 3600} hours`
                    : `${elem.duration / 86400}${elem.duration === 86400 ? ' day' : ' days'}`}
                </th>
                <th
                  scope='row'
                  className="px-4 py-1 text-gray-900 dark:text-white whitespace-normal"
                >
                  {elem.devices}
                </th>
                <th
                  scope='row'
                  className='px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {elem.cost}
                </th>
                <th
                  scope='row'
                  className='px-2 py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {elem.description}
                </th>
                <td className='px-2 py-4 relative '>
                  <DropDown className='w-32'>
                    {/* Wrap dropdown items in an absolute positioned div */}
                   <div className='absolute right-0 mt-2 z-50 w-40 bg-white shadow-lg rounded-md overflow-hidden'> {/* <-- Added `absolute`, `right-0`, `mt-2`, `z-50`, `bg-white`, `shadow-lg`, and `rounded-md` */}
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-green-200 text-black' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 text-sm mb-3 py-2 z-50`}
                          // Add your onClick function if needed
                        >
                          <Icon src='edit' className='w-4 h-4 mr-2' fill='rgb(34, 197, 94)' />
                          <span>Edit</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? 'bg-red-200 text-black' : 'text-gray-900'
                          } group flex w-full items-center rounded-md px-2 text-sm  py-2`}
                          // Add your onClick function if needed
                        >
                          <Icon src='trash' className='w-4 h-4 mr-2' fill='rgb(255, 0, 0)' />
                          <span>Delete</span>
                        </button>
                      )}
                    </Menu.Item>
                   </div>
                  </DropDown>
                </td>
              </tr>
            );
          })}
        </TableComp>
      </div>
    </HotspotLayout>
  );
};

export default Packages;
