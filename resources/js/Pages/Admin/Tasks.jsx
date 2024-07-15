import React, { useEffect, useState, useContext } from 'react'
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import {taskStatusKeys as taskStatus} from '../../data/enums/taskStatus';
import TableComp from '../../Components/Common/TableComp';
import PaginatorNav from '../../Components/Common/PaginatorNav';
import Icon from '../../Components/Common/Icon';
import { loaderSetter } from '../../Components/Common/Loader';
import Modal from "../../Components/Common/Modal";
import SelectComp from '../../Components/Common/SelectComp';
import departmentsEnum from '../../data/enums/department';
import { toast } from 'react-toastify';
import { Menu } from '@headlessui/react'
import DropDown from '../../Components/Common/DropDown';
import TaskStatusColorCode from '../../Components/Common/TaskStatusColorCode';
import TaskStatusIndicator from '../../Components/Common/TaskStatusIndicator';
import i18next from '../../i18n'
import { Link } from '@inertiajs/react';
import {AppContext} from '../../appContext'
import SortElem from '../../Components/Task/SortElem'
import clientStatus from '../../data/enums/clientStatus';
import { handleFormChange } from '../../data/utils';
import ApartmentCodes from '../../Components/Modal/ApartmentCodes'


function Tasks() {
  const [departments, setDepartments] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);
  const [tasks, setTasks] = useState({
    data: [],
    from: 1,
    last_page: 0,
    per_page: 10,
    prev_page_url: '',
    next_page_url: '',
    to: 0,
    total: 0
  });
  const [editTask, setEditTask] = useState({
    name: '',
    task_type_id: '',
    department_id: '',
    admin_handler_id: '',
    department_handler_id: '',
    from_date: '',
    to_date: '',
    description: '',
    paid: '',
  })
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);
  const [filters, setFilters] = useState({});
  const [handlers, setHandlers] = useState({
    admins: [],
    departmentHeads: []
  });
  const {userData} = useContext(AppContext);  
  const sortParams = {
    'departmentId' : departments,
    'type': taskTypes,
    'status': taskStatus,
    'clientStatus': clientStatus
  }

  useEffect(() => {
    if(response){
      notify('Task updated successfully')
    }
  }, [response]);

  useEffect(() => {
    fetchTaskTypes();
    fetchDepartments();
    fetchAllTasks();
  }, []);

  useEffect(() => {
    fetchHandlers();
  }, [editTask])

  function fetchAllTasks() {
    requestHandler.get('/api/all_tasks', setTasks, null, loaderSetter);
  }
  function fetchHandlers() {
    if (Object.keys(editTask).length > 0) requestHandler.get(`/api/admin_department_handlers/${editTask.department?.id}`, setHandlers);
  }

  function toggleEditTask (task) {
    setEditTask(task);
    openModal();
  }
  

  const notify = (string) => {
    toast.success(string);
  }

  function deleteTask(id){
    try {
      requestHandler.delete(`/api/task/${id}`)
    } catch(error) {
      console.error('Error deleting task:', error);
    }
    fetchAllTasks()
    notify('Task deleted')
  }

  function submitEditedTask(e){
    e.preventDefault();
    requestHandler.put('/api/task',editTask, setResponse, setErrors);
    fetchAllTasks();
    closeModal();
  }

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  function fetchTaskTypes() {
    requestHandler.get('/api/task_types', setTaskTypes);
  }

  function fetchDepartments() {
    requestHandler.get('/api/departments', setDepartments);
  }

  function submitFilters(filters){
    requestHandler.post('/api/filter/tasks',filters, setTasks, setErrors)
  }                           
  return (
    <SideNav>
      <div>
        <TaskStatusColorCode />
        
        <div className='mb-4 w-full flex'>
        <ApartmentCodes />
          <Link
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            href='/admin/new_task'
          >
            {i18next.t('add-new-task')}
          </Link>
        </div>
        <SortElem sortParams={sortParams} filterFn={submitFilters}/>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <TableComp columns={['Task Name', 'Task Type', 'Department', 'Handler', 'Payment', 'Status','Started At', 'Finished At', 'Action']}>
            {
              (Array.isArray(tasks.data) ? tasks.data : []).map((task, index) => {
                return (
                  <tr key={task.id || index} className="overflow-auto h-[30px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 py-1">
                    <th scope="row" className="px-4 overflow-auto font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      { task.name }
                    </th>
                    <th
                      scope="row"
                      title={ (task.task_type && task.task_type.description) || '' }
                      className="px-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      { (task.task_type && task.task_type.name) || '' }
                    </th>
                    <td className="px-2 ">
                      { (task.department && task.department.name) || 'None Assigned' }
                    </td>
                    <td className="px-2 ">
                       {task.users?.map((user, ind) => {
                        return (
                          <p key={user.id || ind}>{user.name.split(' ')[0]},</p>
                        )
                      })}
                    </td>
                    <td className="px-2 ">
                      { clientStatus[task.paid] }
                    </td>
                    <td className={`px-2 `}>
                      <TaskStatusIndicator status={task.status} />
                    </td>
                    <td className="px-2 whitespace-nowrap">
                      { task.task_started_at || '' }
                    </td>
                    <td className="px-2 whitespace-nowrap">
                      { task.task_finished_at || '' }
                    </td>
                    <td className="px-2  relative">
                      <DropDown>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                              onClick={() => toggleEditTask(task)}
                            >
                              <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                              <span className='block py-3 px-2'>Edit</span>   
                            </button>
                          )}
                        </Menu.Item>  
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={`${
                                active ? 'bg-green-200 text-black' : 'text-gray-900'
                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                              onClick={() => deleteTask(task.id)}
                            >
                              <Icon src='trash' className='w-4 h-4 mr-2' fill='rgb(239 68 68)'/>
                              <span className='block py-3 px-2'>Delete</span>
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              className={`${
                                active ? 'bg-green-200 text-black' : 'text-gray-900'
                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                              href={`/task/${task.id}`}
                            >
                              <Icon src='eyeOpen' className='w-4 h-4 mr-2' fill='rgb(59 130 246)'/>
                              <span className='block py-3 px-2'>View</span>
                            </Link>
                          )}
                        </Menu.Item>
                      </DropDown>
                  </td>
                  </tr>
                );
              })
            }
          </TableComp>
          <PaginatorNav state={tasks} setState={setTasks}/>
        </div>
        <Modal show={showModal} onClose={closeModal}>
          <div className="my-2 px-3 w-full min-h-[90vh] overflow-y-auto">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Edit Task
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeModal}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
        
              <form className="max-w-md mx-auto h-auto p-3 overflow-y-scroll">
                <div className="relative z-0 w-full mb-5 group mt-10">
                  <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={editTask.name}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required
                  />
                  <label
                    htmlFor="name" 
                    className=" peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Apartment Code
                    <span className='text-gray-900'> *</span>
                  </label>
                  </div>
                  <div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={editTask.name}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required
                  />
                  <label
                    htmlFor="name" 
                    className=" peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Apartment Code
                    <span className='text-gray-900'> *</span>
                  </label>
                  </div>
                </div>
                
                <div className="relative z-0 w-full mb-5 group">
                  <SelectComp
                    name="task_type_id"
                    id="taskType"
                    value={editTask.task_type_id}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required={true}
                    className='bg-transparent focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  >
                    <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>Select Task Type *</option>
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
                  {/* {
                    (errors.taskType || errors.errors?.taskType) && 
                    <p className="text-red-500 my-2 py-1">
                      { displayErrors(errors, 'taskType') }
                    </p>
                  }   */}
                </div>
                
                <div className="relative z-0 w-full mb-5 group">
                  <SelectComp
                    name="department_id"
                    id="department"
                    value={editTask.department_id}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required={true}
                    className='bg-transparent focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
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
                  <hr className="w-full border-[1px] border-gray-300" />
                  {/* {
                    (errors.department || errors.errors?.department) && 
                    <p className="text-red-500 my-2 py-1">
                      { displayErrors(errors, 'department') }
                    </p>
                  }   */}
                </div>
                
                <div className="relative z-0 w-full mb-5 group">
                  <SelectComp
                    name="admin_handler_id"
                    id="admin_handler_id"
                    value={editTask.admin_handler_id}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required={true}
                    className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white`}
                  >
                    <option value="" className='text-gray-400'>Assign Admin</option>
                    {
                      (Array.isArray(handlers.admins) ? handlers.admins : []).map((type, index) => {
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
                    (errors.admin_handler_id || errors.errors?.admin_handler_id) && 
                    <p className="text-red-500 my-2 py-1">
                      { displayErrors(errors, 'admin_handler_id') }
                    </p>
                  }  
                </div>
                
                <div className="relative z-0 w-full mb-5 group">
                  <SelectComp
                    name="department_handler_id"
                    id="department_handler_id"
                    value={editTask.department_handler_id}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required={true}
                    className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white`}
                  >
                    <option value="" className='text-gray-400'>{'Assign Department Head'}</option>
                    {
                      (Array.isArray(handlers.departmentHeads) ? handlers.departmentHeads : []).map((type, index) => {
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
                    (errors.department_handler_id || errors.errors?.department_handler_id) && 
                    <p className="text-red-500 my-2 py-1">
                      { displayErrors(errors, 'department_handler_id') }
                    </p>
                  }  
                </div>
                
                <div className="relative z-0 w-full mb-5 group">
                  <SelectComp
                    name="paid"
                    id="paid"
                    value={editTask.paid}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required={true}
                    className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white`}
                  >
                    <option value="" className='text-gray-400'>{'Select Paid Status'}</option>
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
                
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    name="from_date"
                    id="fromDate"
                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={editTask.from_date}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required
                  />
                  <label
                    htmlFor="name" 
                    className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    From
                  </label>
                  {/* {
                    (errors.fromDate || errors.errors?.fromDate) && 
                    <p className="text-red-500 my-2 py-1">
                      { displayErrors(errors, 'fromDate') }
                    </p>
                  }   */}
                </div>
                
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="date"
                    name="to_date"
                    id="toDate"
                    className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={editTask.to_date}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    required
                  />
                  <label
                    htmlFor="name" 
                    className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    To
                  </label>
                  {/* {
                    (errors.toDate || errors.errors?.toDate) && 
                    <p className="text-red-500 my-2 py-1">
                      { displayErrors(errors, 'toDate') }
                    </p>
                  }   */}
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
                    value={editTask.description ?? ''}
                    onChange={(e) => handleFormChange(e, editTask, setEditTask)}
                    className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {/* {
                      (errors.description || errors.errors?.description) && 
                      <p className="text-red-500 my-2 py-1">
                        { displayErrors(errors, 'description') }
                      </p>
                    }   */}
                </div>
                  
                <button
                  type="submit"
                  onClick={(e) => submitEditedTask(e)}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </SideNav>
  )
}

export default Tasks;
