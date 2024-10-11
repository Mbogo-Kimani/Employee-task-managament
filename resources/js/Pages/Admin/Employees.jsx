import React, { useEffect, useState } from 'react'
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import departmentEnum from '../../data/enums/department';
import Modal from '../../Components/Common/Modal';
import { displayErrors } from '../../data/utils';
import TableComp from '../../Components/Common/TableComp';
import PaginatorNav from '../../Components/Common/PaginatorNav';
import { loaderSetter } from '../../Components/Common/Loader';
import EmployeesTableElem from '../../Components/Admin/EmployeesTableElem';
import { toast } from 'react-toastify';
import {router} from "@inertiajs/react"
import clearanceLevel from '../../data/enums/clearanceLevel';

function Employees() {
  const [users, setUsers] = useState({
    data: [],
    from: 1,
    last_page: 0,
    per_page: 20,
    prev_page_url: null,
    next_page_url: null,
    to: 0,
    total: 0,
  });
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    clearance_level: clearanceLevel.REGULAR_EMPLOYEE,
    password: 'Etnet Technologies',
    password_confirmation: 'Etnet Technologies',
  });
  const [departments, setDepartments] = useState([]);
  const [clearanceLevels, setClearanceLevels] = useState([]);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);
  const [formMode, setFormMode] = useState('');
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [deletedUser, setDeletedUser] = useState({});
  const [countryCode, setCountryCode] = useState('+254')
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get('new');

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchClearanceLevels();
  }, []);

  useEffect(() => {
    checkResponse();
  }, [response]);

  useEffect(() => {
    if(myParam){
      setShowNewUserModal(true)
    }
  },[])

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  useEffect(() => {
    if (debouncedValue) {
      requestHandler.get(`/api/employees?search=${debouncedValue}`, setUsers, null, loaderSetter);
    }
  }, [debouncedValue]);

  function checkResponse () {
    if (response) {
      fetchUsers();
      setNewUser({
        name: '',
        email: '',
        role: '',
        phone_number: '',
        clearance_level: clearanceLevel.REGULAR_EMPLOYEE,
        password: 'Etnet Technologies',
        password_confirmation: 'Etnet Technologies',
      });
      setShowNewUserModal(false);
    }
  }

  function fetchUsers() {
    requestHandler.get('/api/employees', setUsers, null, loaderSetter);
  }
  
  function fetchDepartments() {
    requestHandler.get('/api/departments', setDepartments);
  }

  function fetchClearanceLevels() {
    requestHandler.get('/api/clearance_levels', setClearanceLevels);
  }

  function toggleOpenModal(mode = '', userId = null) {
    setFormMode(mode);
    if (mode) {
      setDeletedUser({['id']: userId});
      if( mode === 'edit'){
        requestHandler.get(`/api/user/${userId}`, setNewUser);
      }
    }

    setShowNewUserModal(true);
  }

  function toggleCloseModal() {
    setShowNewUserModal(false);
    setNewUser({
      name: '',
      email: '',
      role: '',
      phone_number: '',
      clearance_level: clearanceLevel.REGULAR_EMPLOYEE,
      password: 'Etnet Technologies',
      password_confirmation: 'Etnet Technologies',
    });
  }

  function handleChange(e) {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  }

  function submitNewUser(e) {
    e.preventDefault();
    if (formMode === 'edit') {
      requestHandler.patch('/api/user', newUser, editUserResponse, setErrors, loaderSetter);
    } else {
      requestHandler.post('/api/user', newUser, setResponse, setErrors, loaderSetter);
    }
  }

  function openDeleteUserModal(e) {
    e.preventDefault();
    setDeleteUserModal(true);
  }

  function closeDeleteUserModal() {
    setDeleteUserModal(false);
    toggleCloseModal();
  }

  function deleteUser() {
    requestHandler.delete(`/api/user/${deletedUser.id}`, deleteUserResponse, setErrors, loaderSetter);
  }

  function deleteUserResponse(resp) {
    if (resp) {
      toast.success('Employee Deleted successfully');
      closeDeleteUserModal();
      fetchUsers();
    }
  }

  function editUserResponse(resp) {
    if (resp) {
      toast.success('Employee Edited successfully');
      closeDeleteUserModal();
      fetchUsers();
    }
  }

  function handlePhoneNumberChange(e){
    setNewUser({...newUser,[e.target.name]: countryCode + e.target.value})
  }

  function handleSearchChange(e) {
    setSearchValue(e.target.value);
  }

  return (
    <SideNav>
      <div className="">
        <div className='mb-4 w-full flex flex-col sm:flex-row sm:justify-between items-start'>
          <button
            className="bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-3 text-gray-800 hover:text-gray-100 my-2 sm:my-0"
            onClick={() => router.visit('/admin/employees/stats')}
          >
            Employees Statistics
          </button>
          <input
            type="search"
            value={searchValue}
            onChange={(e) => handleSearchChange(e)}
            name="search"
            id=""
            className='py-2 rounded px-3 w-[250px] outline-none'
            placeholder='🔍 Search by Work Number'
          />
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 text-gray-900 hover:text-gray-100 my-2 sm:my-0"
            onClick={() => toggleOpenModal('new')}
          >
            Add New Employee
          </button>
        </div>

        <Modal
          show={deleteUserModal}
          onClose={closeDeleteUserModal}
        >
          <div>
            <h1 className="text-lg text-center mt-5">Are sure you want to delete <span className='font-bold'>{newUser.name}</span>?</h1>

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
          show={showNewUserModal}
          onClose={toggleCloseModal}
        >
          <div className="mt-8 px-2 w-full h-screen overflow-y-scroll">
            <div className="bg-white rounded-lg shahiddendow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                {
                  formMode === 'edit' ?
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Employee Details
                  </h3>
                  :
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add a New Employee
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
                      placeholder="Enter employee's name"
                      value={newUser.name}
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
                      placeholder="Enter employee's email"
                      value={newUser.email}
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
                  <div className='flex'>
                    <select className='bg-transparent mr-5 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                      <option value="" disabled>Select Country Code</option>
                      <option value="+254">+254 (Kenya)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+91">+91 (India)</option>
                      {/* Add more country codes as needed */}
                    </select>
                    <input
                      type="tel"
                      name='phone_number'
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      // value={newUser.phone_number}
                      onChange={handlePhoneNumberChange}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Department
                    </label>
                    <select
                      name="role"
                      value={newUser.role}
                      onChange={handleChange}
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select Department</option>
                      {
                        (Array.isArray(departments) ? departments : []).map((department, index) => {
                          return (
                            <option key={department.id} value={departmentEnum[department.enum_key]}>
                              {department.name}
                            </option>
                          )
                        })
                      }
                    </select>
                    {
                      (errors.name || errors.errors?.name) && 
                      <p className="text-red-500 my-2 py-1">
                        { displayErrors(errors, 'name') }
                      </p>
                    }  
                  </div>

                  <div>
                    <label
                      htmlFor="clearance_level"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Which Position in the Department?
                    </label>
                    <select
                      name="clearance_level"
                      value={newUser.clearance_level}
                      onChange={handleChange}
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      {
                        (Array.isArray(clearanceLevels) ? clearanceLevels : []).map((level, index) => {
                          return (
                            <option key={level.enum_id || index} value={level.enum_id}>
                              {level.name}
                            </option>
                          )
                        })
                      }
                    </select>
                    {
                      (errors.clearance_level || errors.errors?.clearance_level) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'clearance_level') }
                      </p>
                    }  
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Work Number
                    </label>
                    <input
                      type="text"
                      name="employee_id"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter employee's work number"
                      value={newUser.employee_id}
                      onChange={handleChange}
                    />
                    {
                      (errors.name || errors.errors?.name) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'name') }
                      </p>
                    }  
                  </div>
                  <div className='w-full flex justify-between items-center'>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                      onClick={(e) => submitNewUser(e)}
                    >
                      Submit
                    </button>

                    {
                      formMode && formMode === 'edit' && (
                        <button
                          className="bg-red-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                          onClick={(e) => openDeleteUserModal(e)}
                        >
                          Delete
                        </button>
                      )
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <TableComp columns={['Name', 'Department', 'Email', 'Leader', 'Work Number', 'Action']}>
            {
              (Array.isArray(users.data) ? users.data : []).map((elem, index) => {
                return (
                  <EmployeesTableElem
                    key={elem.id || index}
                    elem={elem}
                    openModal={toggleOpenModal}
                  />
                );
              })
            }
          </TableComp>
          <PaginatorNav state={users} setState={setUsers}/>
        </div>
      </div>
    </SideNav>
  )
}

export default Employees;
