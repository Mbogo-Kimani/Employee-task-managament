import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../Layouts/SideNav'
import PaginatorNav from '../Components/Common/PaginatorNav'
import ClientsTableElem from '../Components/Admin/ClientsTableElem'
import TableComp from '../Components/Common/TableComp'
import requestHandler from '../services/requestHandler'
import { AppContext } from '../appContext'

function Clients() {
  const [clients, setClients] = useState([]);

  const { userData } = useContext(AppContext);

  useEffect(() => {
    getClients();
  }, []);

  function getClients() {
    requestHandler.get('/api/sales_clients', setClients);
  }

  function toggleOpenModal() {
    
  }

  function openDeleteUserModal() {

  }

  return (
    <SideNav>
      <div className="">
        <div className='mb-4 w-full flex'>
          {/* <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            onClick={toggleOpenModal}
          >
            Add New Client
          </button> */}
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <TableComp columns={['Name', 'Email', 'Phone Number', 'Location', 'Hse No', 'Status', 'Package']}>
            {
              clients?.data?.map((elem, index) => {
                return (
                  <ClientsTableElem
                    key={elem.id || index}
                    elem={elem}
                    openModal={toggleOpenModal}
                    openDeleteModal={openDeleteUserModal}
                    currentUser={userData}
                  />
                );
              })
            }
          </TableComp>
          <PaginatorNav state={clients} setState={setClients}/>
        </div>
      </div>
    </SideNav>
  )
}

export default Clients;
