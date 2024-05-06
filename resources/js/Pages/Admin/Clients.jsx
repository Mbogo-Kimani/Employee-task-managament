import React, { useEffect, useState } from 'react'
import pageAndNavItemsDeterminer, { pageData as defaultPageData } from '../../data/indexNav';
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import paymentPlanEnum from '../../data/enums/PaymentPlan';
import paymentMethodEnum from '../../data/enums/paymentMethod';
import Modal from '../../Components/Common/Modal';
import { displayErrors } from '../../data/utils';
import TableComp from '../../Components/Common/TableComp';
import PaginatorNav from '../../Components/Common/PaginatorNav';
import Icon from '../../Components/Common/Icon';
import { loaderSetter } from '../../Components/Common/Loader';
import ClientsTableElem from '../../Components/Admin/ClientsTableElem';
import { toast } from 'react-toastify';
import SelectComp from '../../Components/Common/SelectComp';

function Clients({ user }) {
  const [pageItems, setPageItems] = useState(defaultPageData);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState({});
  const [newClient, setNewClient] = useState({});
  const [departments, setDepartments] = useState([]);
  const [clearanceLevels, setClearanceLevels] = useState([]);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [response, setResponse] = useState(false);
  const [formMode, setFormMode] = useState('');
  const [userEdited, setUserEdited] = useState();
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [deletedClient, setDeletedClient] = useState(newClient);

  useEffect(() => {
    setPageItems(
      pageAndNavItemsDeterminer(user?.role, user?.clearance_level)
    );
  }, []);

  useEffect(() => {
    fetchClients();
    fetchDepartments();
    fetchClearanceLevels();
  }, []);

  useEffect(() => {
    checkResponse();
  }, [response]);

  function checkResponse () {
    if (response) {
      fetchClients();
      setNewClient({});
      setShowNewClientModal(false);
    }
  }

  function fetchClients() {
    requestHandler.get('/api/clients', setClients, null, loaderSetter);
  }
  
  function fetchDepartments() {
    requestHandler.get('/api/departments', setDepartments);
  }

  function fetchClearanceLevels() {
    requestHandler.get('/api/clearance_levels', setClearanceLevels);
  }

  function toggleOpenModal(mode,client = {}) {
    setFormMode(mode)
    setNewClient(client)
    setShowNewClientModal(true);
  }

  function toggleCloseModal() {
    setShowNewClientModal(false);
  }

  function handleChange(e) {
    setNewClient({...newClient, [e.target.name]: e.target.value});
    console.log(newClient);
  }

  function submitNewClient(e) {
    e.preventDefault();
    if (formMode === 'edit') {
      requestHandler.patch('/api/client', newClient, setResponse, setErrors, loaderSetter);
    } else {
      requestHandler.post('/api/client', newClient, setResponse, setErrors, loaderSetter);
    }
  }

  function openDeleteUserModal(client) {
    setDeleteUserModal(true);
    setDeletedClient(client);
  }

  function closeDeleteUserModal() {
    setDeleteUserModal(false);
    toggleCloseModal();
  }

  function deleteUser() {
    requestHandler.delete(`/api/client/${deletedClient.id}`, setResponse, setErrors, loaderSetter);
    setDeleteUserModal(false)
  }

  return (
    <SideNav navItems={pageItems.navItems} user={user}>
      <div className="">
        <div className='mb-4 w-full flex'>
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            onClick={toggleOpenModal}
          >
            Add New Client
          </button>
        </div>

        <Modal
          show={deleteUserModal}
          onClose={closeDeleteUserModal}
        >
          <div>
            <h1 className="text-lg text-center mt-5">Are sure you want to delete <span className='font-bold'>{newClient.name}</span>?</h1>

            <div className="flex justify-around items-center">
              <button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                onClick={closeDeleteUserModal}
              >
                Cancel
              </button>

              <button
                className="bg-red-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                onClick={deleteUser}
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          show={showNewClientModal}
          onClose={toggleCloseModal}
        >
          <div className="mt-8 px-2 w-full h-screen overflow-y-scroll">
            <div className="bg-white rounded-lg shahiddendow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                {
                  formMode == 'edit' ?
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Client Details
                  </h3>
                  :
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add a New Client
                  </h3>
                }
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleCloseModal}
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
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's name"
                      value={newClient.name}
                      onChange={handleChange}
                      required
                    />
                    {
                      (errors.name || errors.errors?.name) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'name') }
                      </p>
                    }  
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's email"
                      value={newClient.email}
                      onChange={handleChange}
                      required
                    />
                    {
                      (errors.email || errors.errors?.email) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'email') }
                      </p>
                    }  
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's phone number"
                      value={newClient.phone_number}
                      onChange={handleChange}
                      required
                    />
                    {
                      (errors.name || errors.errors?.name) && 
                      <p className="text-red-500 my-2 py-1">
                        { displayErrors(errors, 'name') }
                      </p>
                    }  
                  </div>

                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's address"
                      value={newClient.address}
                      onChange={handleChange}
                      required
                    />
                    {
                      (errors.clearance_level || errors.errors?.clearance_level) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'clearance_level') }
                      </p>
                    }  
                  </div>

                  <div>
                    <label
                      htmlFor="resident_building"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Building
                    </label>
                    <div
                     className='flex items-center pr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    >
                      <input
                        type='text'
                        name="resident_building"
                        className="bg-gray-50 border-transparent focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter resident building"
                        value={newClient.resident_building}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    {
                      (errors.password || errors.errors?.password) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'password') }
                      </p>
                    }  
                  </div>

                  <div>
                    <label
                      htmlFor="resident_hse_no"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Hse No
                    </label>
                    <input
                      type='text'
                      name="resident_hse_no"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white mb-10"
                      placeholder="Enter house number"
                      value={newClient.resident_hse_no}
                      onChange={handleChange}
                      required
                    />
                    {/* {
                      (errors.password_confirmation || errors.errors?.password_confirmation) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'password_confirmation') }
                      </p>
                    }   */}
                  </div>
                  
                  <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="payment_date"
              id="payment_date"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={newClient.payment_date}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="payment_date" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Payment Date
            </label>
            {/* {
              (errors.toDate || errors.errors?.toDate) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'toDate') }
              </p>
            }   */}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="payment_method"
              id="payment_method"
              // value={newTask.taskType}
              onChange={(e) => handleChange(e)}
              required={true}
              className='bg-transparent focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>{newClient.payment_method ? newClient.payment_method : "Payment Method"}</option>
              {
                Object.keys(paymentMethodEnum).map((key) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  return (
                    <option
                      key={ key }
                      value={ key }
                      title={ key }
                      className='bg-transparent text-gray-900 dark:text-gray-300'
                    >
                      { paymentMethodEnum[key]}
                    </option>
                  )
                })
              }
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              // (errors.taskType || errors.errors?.taskType) && 
              // <p className="text-red-500 my-2 py-1">
              //   { displayErrors(errors, 'taskType') }
              // </p>
            }  
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="payment_plan"
              id="payment_plan"
              // value={newTask.taskType}
              onChange={(e) => handleChange(e)}
              required={true}
              className='bg-transparent focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>{newClient.payment_plan ? newClient.payment_plan : "Payment Plan"}</option>
              {
                Object.keys(paymentPlanEnum).map((key) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  return (
                    <option
                      key={ key }
                      value={ key }
                      title={ key }
                      className='bg-transparent text-gray-900 dark:text-gray-300'
                    >
                      { paymentPlanEnum[key]}
                    </option>
                  )
                })
              }
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              // (errors.taskType || errors.errors?.taskType) && 
              // <p className="text-red-500 my-2 py-1">
              //   { displayErrors(errors, 'taskType') }
              // </p>
            }  
          </div>
                  
                  <div className='w-full flex justify-between items-center'>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                      onClick={(e) => submitNewClient(e)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <TableComp columns={['Name', 'Email', 'Phone Number', 'Address', 'Building', 'Hse No', 'status','Payment Method','Payment Plan', 'Action']}>
            {
              clients.map((elem, index) => {
                return (
                  <ClientsTableElem
                    key={elem.id || index}
                    elem={elem}
                    openModal={toggleOpenModal}
                    openDeleteModal={openDeleteUserModal}
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
