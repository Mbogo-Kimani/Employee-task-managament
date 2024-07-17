import React, { useContext, useEffect, useState } from 'react'
import SideNav from '../Layouts/SideNav'
import PaginatorNav from '../Components/Common/PaginatorNav'
import ClientsTableElem from '../Components/Admin/ClientsTableElem'
import TableComp from '../Components/Common/TableComp'
import requestHandler from '../services/requestHandler'
import { AppContext } from '../appContext'
import Modal from '../Components/Common/Modal'
import Select from 'react-select';
import { loaderSetter } from '../Components/Common/Loader'


function Clients() {
  const [clients, setClients] = useState([]);
  const [allClients, setAllClients] = useState([]);
  const [packages, setPackages] = useState([]);
  const [salesMembers, setSalesMembers] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    clients: [],
    user: '',
  });
  const [showAssignClientsModal, setShowAssignClientsModal] = useState(false);
  const [response, setResponse] = useState([]);
  const { userData } = useContext(AppContext);

  useEffect(() => {
    getClients();
    getPackages();
    fetchSalesMembers();
    fetchClients();
  }, []);

  
  useEffect(() => {
    checkResponse();
  }, [response]);

  function checkResponse () {
    if (response) {
      getClients()
      setNewAssignment({
        clients: [],
        user: '',
      })
      setShowAssignClientsModal(false);
    }
  }

  function getPackages() {
    requestHandler.get('/api/internet_packages', setPackages);
  }

  function getClients() {
    requestHandler.get('/api/sales_clients', setClients);
  }

  function fetchSalesMembers() {
    requestHandler.get('/api/department_users', setSalesMembers);
  }

  function handleChange(values) {
    setNewAssignment({...newAssignment,['clients']: values.map((val) => {
      return val.value
    })})
  }

  function submitNewAssignment(e){
    e.preventDefault()
    requestHandler.patch('/api/assign_clients',newAssignment, setResponse);
  }

  function fetchClients() {
    requestHandler.get('/api/unassigned_clients', setAllClients, null, loaderSetter);
  }
  return (
    <SideNav>
      <div className="pt-2">
        { userData?.clearance_level === 1 &&
         <div className='mb-4 w-full flex'>
            <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            onClick={() => setShowAssignClientsModal(true)}
          >
            Assign Clients
          </button>
          </div>
        }
        <Modal
          show={showAssignClientsModal}
          onClose={() => setShowAssignClientsModal(false)}
        >
          <div className="my-3 px-2 w-full h-fit overflow-y-auto">
            <div className="bg-white rounded-lg shahiddendow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Client Assignment
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowAssignClientsModal(false)}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-3 md:p-4">
                <form className="space-y-5 px-4 py-2" action="#">
                
                  <div>
                    <label
                      htmlFor="clearance_level"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Which user will you assign the clients to?
                    </label>
                    <Select
                        defaultValue={newAssignment.user}
                        onChange={(e) => setNewAssignment({...newAssignment,['user']: e.value})}
                        options={
                          (Array.isArray(salesMembers) ? salesMembers : []).map((item) => {
                            return(
                              {
                                value: item.employee_id, label: item.name
                              }
                            )
                          })
                        }
                        isSearchable
                        maxMenuHeight={220}
                      />  
                  </div>
                  <div>
                    <label
                      htmlFor="clearance_level"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Clients to assign
                    </label>
                    <Select
                        defaultValue={newAssignment.clients}
                        onChange={(e) => handleChange(e)}
                        options={
                          (Array.isArray(allClients) ? allClients : []).map((item) => {
                            return(
                              {
                                value: item.id, label: item.name + ' ' + item.acc_no
                              }
                            )
                          })
                        }
                        isMulti
                        isSearchable
                        maxMenuHeight={220}
                      />  
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 w-[100px] text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                    onClick={(e) => submitNewAssignment(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
          <TableComp columns={['Acc No','Name', 'Email', 'Phone Number', 'Location', 'Hse No', 'Status', 'Billing Day', 'Package']}>
            {
              clients?.data?.map((elem, index) => {
                return (
                  <ClientsTableElem
                    key={elem.id || index}
                    elem={elem}
                    // openModal={toggleOpenModal}
                    // openDeleteModal={openDeleteUserModal}
                    currentUser={userData}
                    packages={packages}
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
