import React, { useEffect, useState } from 'react'
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import departmentsEnum from '../../data/enums/department';
import { router } from '@inertiajs/react';
import SelectComp from '../../Components/Common/SelectComp';
import { displayErrors } from '../../data/utils';
import Modal from '../../Components/Common/Modal';
import { toast } from 'react-toastify';
import taskTypesEnum from '../../data/enums/taskTypes'
import Select from 'react-select';

function NewTask() {
  const [taskTypes, setTaskTypes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newTask, setNewTask] = useState({
    apartment_code: '',
    hse_no: '',
    name: '',
    department: '',
    subDepartment: '',
    departmentHandler: '',
    adminHandler: '',
    taskType: '',
    client_name: '',
    client_email: '',
    wifi_name: '',
    wifi_password: '',
    description: '',
    toDate: '',
    fromDate: '',
    paid: '',
    work_number: '',
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);
  const [taskTypeResponse, setTaskTypeResponse] = useState(false);
  const [newTaskTypeModal, setNewTaskTypeModal] = useState(false);
  const [newTaskType, setNewTaskType] = useState({});
  const [admins, setAdmins] = useState([]);
  const [departmentHeads, setDepartmentHeads] = useState([]);
  const [departmentHandlerElemText, setDepartmentHandlerElemText] = useState('');
  const [internetPackages, setInternetPackages] = useState([]);
  const [countryCode, setCountryCode] = useState('+254')
  const [workNumbers, setWorkNumbers] = useState({
    data: [],
    from: 1,
    last_page: 0,
    per_page: 10,
    prev_page_url: null,
    next_page_url: null,
    to: 0,
    total: 0,
  });
  const [debouncedValue, setDebouncedValue] = useState('');
  const [workNumber, setWorkNumber] = useState('');


  useEffect(() => {
    fetchTaskTypes();
    fetchDepartments();
    fetchAdmins();
    fetchInternetPackages();
    fetchWorkNumbers();
  }, []);

  useEffect(() => {
    checkResponse();
  }, [response]);

  useEffect(() => {
    checkResponse();
  }, [taskTypeResponse]);

  useEffect(() => {
    verifyDates();
  }, [newTask.toDate]);

  useEffect(() => {
    fetchDepartmentHeads();
  }, [newTask.department]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(workNumber);
    }, 800);

    return () => {
      clearTimeout(handler);
    };
  }, [workNumber]);

  useEffect(() => {
    if (debouncedValue) {
      requestHandler.get(`/api/work_numbers?search=${debouncedValue}`, setWorkNumbers, null, null);
    }
  }, [debouncedValue]);

  function closeNewTaskTypeModal() {
    setNewTaskTypeModal(false);
  }

  function openNewTaskTypeModal() {
    setNewTaskTypeModal(true);
  }

  function verifyDates() {
    const fromDate = new Date(newTask.fromDate);
    const toDate = new Date(newTask.toDate);

    if (fromDate >= toDate) {
      setErrors({...errors, toDate: ['The "to" date cannot be before the "from" date']});
    }
  }

  function checkResponse () {
    if (response) {
      setNewTask({
        apartment_code: '',
        hse_no: '',
        name: '',
        department: '',
        subDepartment: '',
        departmentHandler: '',
        adminHandler: '',
        taskType: '',
        client_name: '',
        client_email: '',
        wifi_name: '',
        wifi_password: '',
        description: '',
        toDate: '',
        fromDate: '',
        paid: '',
        work_number: '',
      });
      setResponse(false);
      router.visit('/admin/tasks');
    }
    else if (taskTypeResponse) {
      setNewTaskType({
        task_type_department: '',
        task_type_name: '',
        task_type_description: '',
      });
      setTaskTypeResponse(false);
      closeNewTaskTypeModal();
      fetchTaskTypes();
    }
  }

  function fetchWorkNumbers() {
    requestHandler.get('/api/work_numbers', setWorkNumbers);
  }

  function fetchAdmins() {
    requestHandler.get('/api/admins', setAdmins);
  }

  function fetchDepartmentHeads() {
    if (newTask.department) requestHandler.get(`/api/department_heads/${newTask.department}`, setDepartmentHeads);
  }

  function fetchTaskTypes() {
    requestHandler.get('/api/task_types', setTaskTypes);
  }

  function fetchDepartments() {
    requestHandler.get('/api/departments', setDepartments);
  }

  function handleChange(e) {
    setNewTask({...newTask, [e.target.name]: e.target.value})
  }

  function handleWorkNumberValue (val) {
    setNewTask({...newTask, work_number: val.value});
  }

  function handleWorkNumberInput (val) {
    if (val) {
      setWorkNumber(val);
    }
  }

  function handleTaskTypeChange (e) {
    setNewTaskType({...newTaskType, [e.target.name]: e.target.value});
  }

  function handleDepartmentHandlerElemText() {
    if (!newTask.department && !departmentHandlerElemText) {
      setDepartmentHandlerElemText('Please select a department first');
      setTimeout(() => {
      setDepartmentHandlerElemText('');
      }, 3500);
    }
  }
 
  function submitNewtask(e) {
    e.preventDefault();
    requestHandler.post('/api/tasks', newTask, setResponse, setErrors);

    if(response){
      notify('Task added')
    }
  }

  function fetchInternetPackages(){
    requestHandler.get('/api/internet_packages', setInternetPackages);
  }

  function getSubDepartments(){
    if (newTask.department) return departments?.find(dept => dept.id === Number(newTask.department)).subdepartments
  }

  function submitNewTaskType (e) {
    e.preventDefault();
    requestHandler.post('/api/task_types', newTaskType, setTaskTypeResponse, setErrors);
   
  }

  function handlePhoneNumberChange(e){
    setNewTask({...newTask,[e.target.name]: countryCode + e.target.value})
  }

  const notify = (string) => {
    toast.success(string,{
      position: "top-center"
    })
  }
  return (
    <SideNav link='/admin/tasks'>
      <div>
        <div className='mb-4 w-full flex'>
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            onClick={openNewTaskTypeModal}
          >
            Add New Task Type
          </button>
        </div>
        <form className="max-w-md mx-auto">
          <div className="relative z-0 w-full mb-5 flex justify-between">
            <div>
            <input
              type="text"
              name="apartment_code"
              id="apartment_code"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={newTask.apartment_code}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform translate-y-6 scale-75 -top-9 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-10 peer-focus:scale-75 peer-focus:-translate-y-0"
            >
              Apartment Code
              <span className='text-gray-900'> *</span>
            </label>
            </div>  
            <div>
            <input
              type="text"
              name="hse_no"
              id="hse_no"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={newTask.hse_no}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform translate-y-6 scale-75 -top-9 -z-10 origin-[0]  rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-10 peer-focus:scale-75 peer-focus:-translate-y-0"
            >
              Hse No.
              <span className='text-gray-900'> *</span>
            </label>
            </div>  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="taskType"
              id="taskType"
              value={newTask.taskType}
              onChange={(e) => handleChange(e)}
              required={true}
              className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!newTask.taskType ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
            >
              <option value="" className='bg-transparent text-gray-400'>Select Task Type *</option>
              {
                (Array.isArray(taskTypes) ? taskTypes : [red]).map((type, index) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  return (
                    <option
                      key={ type.id || index }
                      value={ type.id }
                      title={ type.description || '' }
                      className='bg-transparent text-gray-900 dark:text-gray-300'
                    >
                      { type.name }
                    </option>
                  )
                })
              }
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              (errors.taskType || errors.errors?.taskType) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'taskType') }
              </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="department"
              id="department"
              value={newTask.department}
              onChange={(e) => handleChange(e)}
              required={true}
              className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!newTask.department ? 'text-gray-500': 'text-gray-900 dark:text-white'}`}
            >
              <option value="" className='text-gray-400'>Select Department *</option>
              {
                (Array.isArray(departments) ? departments : []).map((type, index) => {
                  return (
                    <option
                      key={ type.id || index }
                      value={ departmentsEnum[type.enum_key] }
                      className='text-gray-900'
                    >
                      { type.name }
                    </option>
                  )
                })
              }
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              (errors.department || errors.errors?.department) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'department') }
              </p>
            }  
          </div>
  { 
    getSubDepartments()?.length > 0  &&
      <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="subDepartment"
              id="subDepartment"
              value={newTask.subDepartment}
              onChange={(e) => handleChange(e)}
              required={true}
              className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!newTask.department ? 'text-gray-500': 'text-gray-900 dark:text-white'}`}
            >
              <option value="" className='text-gray-400'>Select Subdepartment *</option>
              {
                getSubDepartments().map((type, index) => {
                  return (
                    <option
                      key={ type.id || index }
                      value={ type.id }
                      className='text-gray-900'
                    >
                      { type.name }
                    </option>
                  )
                })
              }
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
          </div>
          }

          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="adminHandler"
              id="adminHandler"
              value={newTask.adminHandler}
              onChange={(e) => handleChange(e)}
              required={true}
              className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!newTask.adminHandler ? 'text-gray-500': 'text-gray-900 dark:text-white'}`}
            >
              <option value="" className='text-gray-400'>Assign Admin</option>
              {
                (Array.isArray(admins) ? admins : []).map((type, index) => {
                  return (
                    <option
                      key={ type.id || index }
                      value={ type.id }
                      className={'text-gray-900'}
                    >
                      { type.name }
                    </option>
                  )
                })
              }
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              (errors.adminHandler || errors.errors?.adminHandler) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'adminHandler') }
              </p>
            }  
          </div>


          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="departmentHandler"
              id="departmentHandler"
              value={newTask.departmentHandler}
              onChange={(e) => handleChange(e)}
              required={true}
              onMouseOver={handleDepartmentHandlerElemText}
              className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!newTask.departmentHandler ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
            >
              <option value="" className='text-gray-400'>{departmentHandlerElemText || 'Assign Department Head'}</option>
              {
                (Array.isArray(departmentHeads) ? departmentHeads : []).map((type, index) => {
                  return (
                    <option
                      key={ type.id || index }
                      value={ type.id }
                      className='text-gray-900'
                    >
                      { type.name }
                    </option>
                  )
                })
              }
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              (errors.departmentHandler || errors.errors?.departmentHandler) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'departmentHandler') }
              </p>
            }  
          </div>
          {
            newTask.taskType == taskTypesEnum.INSTALLATION &&
            <div>
              <div className="relative z-0 w-full mb-5 group">
                <SelectComp
                  name="package_id"
                  id="package_id"
                  value={newTask.package_id}
                  onChange={(e) => handleChange(e)}
                  required={true}
                  className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!newTask.taskType ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
                >
                  <option value="" className='bg-transparent text-gray-400'>Select Internet Package *</option>
                  {
                    (Array.isArray(internetPackages) ? internetPackages : []).map((type, index) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      return (
                        <option
                          key={ type.id || index }
                          value={ type.id }
                          title={ type.description || '' }
                          className='bg-transparent text-gray-900 dark:text-gray-300'
                        >
                          { type.capacity }
                        </option>
                      )
                    })
                  }
                </SelectComp>
                <hr className="w-full border-[1px] border-gray-300" />
              </div>
              <div className="relative z-0 w-full mb-5 flex justify-between">
                <input
                  type="text"
                  name="client_name"
                  id="client_name"
                  className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={newTask.client_name}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <label
                  htmlFor="name" 
                  className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Client Name
                  <span className='text-gray-900'> *</span>
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 flex justify-between">
                <input
                  type="text"
                  name="client_email"
                  id="client_email"
                  className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={newTask.client_email}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <label
                  htmlFor="name" 
                  className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Client Email
                  <span className='text-gray-900'> *</span>
                </label>
              </div>
            </div>
          }
          
          {
            newTask.taskType != taskTypesEnum.SERVICE_MAINTENANCE &&
              <div className='flex mb-5'>
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
                  // value={newTask.phone_number}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter Client's Phone Number"
                  required
                />
              </div>
          }
          { 
            newTask.taskType == taskTypesEnum.INSTALLATION &&
            <div>
              <div className='mb-5 flex justify-between'>
                <div className='w-[20vw]'>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                  >
                    WIFI Name
                  </label>
                  <input
                    type="text"
                    name="wifi_name"
                    className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter client's wifi name"
                    value={newTask.wifi_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className='w-[30vw] ml-2 mb-2'>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
                  >
                    WIFI Password
                  </label>
                  <input
                    type="text"
                    name="wifi_password"
                    className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Enter client's wifi password"
                    value={newTask.wifi_password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
           
              <div className="relative z-0 w-full mb-10 group">
                <SelectComp
                  name="paid"
                  id="paid"
                  value={newTask.paid}
                  onChange={(e) => handleChange(e)}
                  required={true}
                  className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${!newTask.departmentHandler ? 'text-gray-500' : 'text-gray-900 dark:text-white'}`}
                >
                  <option value="" className='text-gray-400'>Select Client Payment Status</option>
                  <option value={0}>Unpaid</option>
                  <option value={1}>Paid</option>
                </SelectComp>
                <hr className="w-full border-[1px] border-gray-300" />
                {
                  (errors.paid || errors.errors?.paid) && 
                  <p className="text-red-500 my-2 py-1">
                    { displayErrors(errors, 'paid') }
                  </p>
                }  
              </div>
            </div>
          }

          {
            newTask.taskType == taskTypes.find(elem => elem.name === 'Installations')?.id &&
            <div className='mb-10'>
              <Select
                defaultValue={newTask.work_number}
                onInputChange={(val) => handleWorkNumberInput(val)}
                onChange={(val) => handleWorkNumberValue(val)}
                name='work_number'
                placeholder='Enter Work Number'
                options={
                  (Array.isArray(workNumbers.data) ? workNumbers.data : []).map((item) => {
                    return (
                      {
                        value: item.employee_id || '', label: `${item.employee_id || ''} - ${item.name || ''}`
                      }
                    )
                  })
                }
                isSearchable
                maxMenuHeight={220}
              />
            </div>
          }
           
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="fromDate"
              id="fromDate"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={newTask.fromDate}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              From (optional)
            </label>
            {
              (errors.fromDate || errors.errors?.fromDate) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'fromDate') }
              </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="date"
              name="toDate"
              id="toDate"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={newTask.toDate}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              To (optional)
            </label>
            {
              (errors.toDate || errors.errors?.toDate) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'toDate') }
              </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="description" 
              className="block mb-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={newTask.description}
              onChange={(e) => handleChange(e)}
              className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {
                (errors.description || errors.errors?.description) && 
                <p className="text-red-500 my-2 py-1">
                  { displayErrors(errors, 'description') }
                </p>
              }  
          </div>

          <button
            type="submit"
            onClick={(e) => submitNewtask(e)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>

        <Modal
          show={newTaskTypeModal}
          onClose={closeNewTaskTypeModal}
        >
          <div className="my-2 px-2 w-full h-fit overflow-y-auto">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add a New Task Type
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeNewTaskTypeModal}
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
                      name="task_type_name"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Task Type Name"
                      value={newTaskType.task_type_name}
                      onChange={(e) => handleTaskTypeChange(e)}
                      required
                    />
                    {
                      (errors.task_type_name || errors.errors?.task_type_name) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'task_type_name') }
                      </p>
                    }  
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <SelectComp
                      name="task_type_department"
                      id="task_type_department"
                      value={newTaskType.task_type_department}
                      onChange={(e) => handleTaskTypeChange(e)}
                      required={true}
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="" className='text-gray-900 dark:text-gray-300'>Select Department *</option>
                      {
                        (Array.isArray(departments) ? departments : []).map((type, index) => {
                          return (
                            <option
                              key={ type.id || index }
                              value={ departmentsEnum[type.enum_key] }
                              className='text-gray-900'
                            >
                              { type.name }
                            </option>
                          )
                        })
                      }
                    </SelectComp>
                    {
                      (errors.task_type_department || errors.errors?.task_type_department) && 
                      <p className="text-red-500 my-2 py-1">
                        { displayErrors(errors, 'task_type_department') }
                      </p>
                    }  
                  </div>

                  <div className="relative z-0 w-full mb-5 group">
                    <label
                      htmlFor="task_type_description" 
                      className="block mb-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400"
                    >
                      Description
                    </label>
                    <textarea
                      name="task_type_description"
                      rows="4"
                      value={newTaskType.task_type_description}
                      onChange={(e) => handleTaskTypeChange(e)}
                      className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      {
                        (errors.description || errors.errors?.description) && 
                        <p className="text-red-500 my-2 py-1">
                          { displayErrors(errors, 'description') }
                        </p>
                      }  
                  </div>

                  <button
                    type="submit"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                    onClick={(e) => submitNewTaskType(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </SideNav>
  )
}

export default NewTask;
