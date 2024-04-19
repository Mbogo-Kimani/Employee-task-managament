import React, { useEffect, useState } from 'react'
import pageAndNavItemsDeterminer, { pageData as defaultPageData } from '../../data/indexNav';
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import departmentEnum from '../../data/enums/department';
import clearanceLevel from '../../data/enums/clearanceLevel';
import Modal from '../../Components/Common/Modal';
import Icon from '../../Components/Icon';
import { router } from '@inertiajs/react';
import { displayErrors } from '../../data/utils';

function Employees({ user }) {
  const [pageItems, setPageItems] = useState(defaultPageData);
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
    clearance_level: 2,
    password: 'Etnet Technologies',
    password_confirmation: 'Etnet Technologies',
  });
  const [departments, setDepartments] = useState([]);
  const [clearanceLevels, setClearanceLevels] = useState([]);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    setPageItems(
      pageAndNavItemsDeterminer(user?.role, user?.clearance_level)
    );
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchDepartments();
    fetchClearanceLevels();
  }, []);

  useEffect(() => {
    checkResponse()
  }, [response]);

  function checkResponse () {
    if (response) {
      fetchUsers();
      setNewUser({
        name: '',
        email: '',
        role: '',
        clearance_level: 2,
        password: 'Etnet Technologies',
        password_confirmation: 'Etnet Technologies',
      });
      setShowNewUserModal(false);
    }
  }

  function fetchUsers() {
    requestHandler.get('/api/employees', setUsers);
  }
  
  function fetchDepartments() {
    requestHandler.get('/api/departments', setDepartments);
  }

  function fetchClearanceLevels() {
    requestHandler.get('/api/clearance_levels', setClearanceLevels);
  }

  function handlePrevPage () {
    if (users.prev_page_url) {
      requestHandler.get(users.prev_page_url, setUsers);
    }
  }

  function handleNextPage () {
    if (users.next_page_url) {
      requestHandler.get(users.next_page_url, setUsers);
    }
  }

  function toggleOpenModal() {
    setShowNewUserModal(true);
  }

  function toggleCloseModal() {
    setShowNewUserModal(false);
  }

  function handleChange(e) {
    setNewUser({...newUser, [e.target.name]: e.target.value});
  }

  function submitNewUser(e) {
    e.preventDefault();
    requestHandler.post('/api/user', newUser, setResponse, setErrors);
  }

  function navigateToIndividualTasks(id) {
    router.visit(`/admin/employees/${id}/tasks`)
  }

  return (
    <SideNav navItems={pageItems.navItems}>
      <div className="">
        <div className='mb-4 w-full flex'>
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            onClick={toggleOpenModal}
          >
            Add New Employee
          </button>
        </div>

        <Modal
          show={showNewUserModal}
          onClose={toggleCloseModal}
        >
          <div className="mt-8 px-2 w-full h-screen overflow-y-scroll">
            <div className="bg-white rounded-lg shahiddendow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add a New Employee
                </h3>
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
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <div
                     className='flex items-center pr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    >
                      <input
                        type={showPasswords ? 'text' : 'password'}
                        name="password"
                        className="bg-gray-50 border-transparent focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Enter default password"
                        value={newUser.password}
                        onChange={handleChange}
                        required
                      />
                      <Icon src={`/icons/eye-${showPasswords ? 'open' : 'close'}.svg`} className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
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
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type={showPasswords ? 'text' : 'password'}
                      name="password_confirmation"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Password again"
                      value={newUser.password_confirmation}
                      onChange={handleChange}
                      required
                    />
                    {
                      (errors.password_confirmation || errors.errors?.password_confirmation) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'password_confirmation') }
                      </p>
                    }  
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                    onClick={(e) => submitNewUser(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Name
                </th>
                <th scope="col" className="px-2 py-3">
                  Department
                </th>
                <th scope="col" className="px-2 py-3">
                  Email
                </th>
                <th scope="col" className="px-2 py-3">
                  Leader
                </th>
                <th scope="col" className="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {
                (Array.isArray(users.data) ? users.data : []).map((elem, index) => {
                  return (
                    <tr key={elem.id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        { elem.name }
                      </th>
                      <td
                        scope="row"
                        className="px-2 py-4"
                      >
                        { departmentEnum[elem.role] }
                      </td>
                      <td className="px-2 py-4">
                        { elem.email }
                      </td>
                      <td className="px-2 py-4">
                        { clearanceLevel[elem.clearance_level] }
                      </td>
                      <td className="px-2 py-4 hover:underline dark:hover:text-blue-300 hover:text-blue-500 cursor-pointer" onClick={() => navigateToIndividualTasks(elem.id)}>
                        View Tasks
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto pl-4">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white"> {users.current_page} - { users.last_page }</span> of <span className="font-semibold text-gray-900 dark:text-white">{ users.total }</span></span>
            <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
              <li
                className={
                  users.prev_page_url ?
                  "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
                  "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
                }
                onClick={handlePrevPage}
              >
                Previous
              </li>
              <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                { users.current_page }
              </li>
            
              <li
                className={
                  users.next_page_url ?
                  "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
                  "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
                }
                onClick={handleNextPage}
              >
                Next
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </SideNav>
  )
}

export default Employees;
