import React, { useEffect, useState } from 'react';
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
    requestHandler.get(
      '/api/street_packages',
      setStreetPackages,
      null,
      loaderSetter
    );
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleDelete = (elem) => {
      requestHandler.delete(`/api/hotspot/package/${elem.id}`);
      // fetchPackages();
      
  }
  return (
    <HotspotLayout>

      <div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-2'>
        <TableComp
          columns={[
            'Name',
            'Duration',
            'Devices',
            'Cost',
            'Description',
            'Action',
          ]}
        >
          {streetPackages?.map((elem, index) => {
            return (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' key={elem.id || index}>
                <th
                  scope='row'
                  className='px-4 overflow-auto font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {elem.name}
                </th>
                <th
                  scope='row'
                  className='px-4 overflow-auto font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {elem.duration/60 < 60 ? elem.duration/60 + " minutes" : elem.duration/60 < 1440 ? (elem.duration/3600) + " hours" : elem.duration/86400 + `${elem.duration == 86400 ? ' day' : ' days'}`}
                </th>
                <th
                  scope='row'
                  className='px-4 overflow-auto font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {elem.devices}
                </th>
                <th
                  scope='row'
                  className='px-2 overflow-auto font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  SH {elem.cost}
                </th>
                <th
                  scope='row'
                  className='px-2 overflow-auto font-medium text-gray-900 whitespace-nowrap dark:text-white'
                >
                  {elem.description}
                </th>
                <td className='px-2 py-4 relative'>
                  <DropDown>
                    {/* <Menu.Item>
                      {({ active }) => (
                       
                          <button
                            className={`${
                              active
                                ? 'bg-green-200 text-black'
                                : 'text-gray-900'
                            } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                            //   onClick={() => openDeleteModal(elem)}
                          >
                            <Icon
                              src='edit'
                              className='w-4 h-4 mr-2'
                              fill='rgb(34 197 94)'
                            />
                            <span className='block py-3 px-2'>Edit</span>
                          </button>
                      )}
                    </Menu.Item> */}
                    <Menu.Item>
                      {({ active }) => (
                       
                          <button
                            className={`${
                              active
                                ? 'bg-green-200 text-black'
                                : 'text-gray-900'
                            } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                              onClick={() => handleDelete(elem)}
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
          })}
        </TableComp>
      </div>
    </HotspotLayout>
  );
};

export default Packages;
