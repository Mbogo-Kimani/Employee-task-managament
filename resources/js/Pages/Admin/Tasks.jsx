import React, { useEffect, useState } from 'react'
import { navItemsDeterminer, pageData as defaultPageData } from '../../data/indexNav';
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


function Tasks({ user }) {
  const [navItems, setNavItems] = useState(defaultPageData);
  const [reports, setReports] = useState({})
  const [departments, setDepartments] = useState([]);
  const [taskTypes, setTaskTypes] = useState([]);


  const [tasks, setTasks] = useState({
    data: [],
    from: 1,
    last_page: 0,
    per_page: 10,
    prev_page_url: null,
    next_page_url: null,
    to: 0,
    total: 0
  });
  const [editTask, setEditTask] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);
  const [filters, setFilters] = useState({});


  useEffect(() => {
    setNavItems(
      navItemsDeterminer(user?.role, user?.clearance_level)
    );
  }, [])

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

  function fetchAllTasks() {
    requestHandler.get('/api/all_tasks', setTasks, null, loaderSetter);
  }

  function toggleEditTask (task) {
    setEditTask(task);
    setShowModal(true);
    // toggleOpenModal();
    // setReport({...report, task_id});
  }
  

  const notify = (string) => {
    toast.success(string,{
      position: "top-center"
    })
  }

  function deleteTask(id){
    try{
      requestHandler.delete(`/api/task/${id}`)
    }catch(error){
      console.error('Error deleting task:', error);
    }
    fetchAllTasks()
    notify('Task deleted')
  }

  function submitEditedTask(e){
    e.preventDefault()
    requestHandler.put('/api/task',editTask, setResponse, setErrors)

    fetchAllTasks();
    setShowModal(false)
    
    
  }

  function handleChange(e){
     setEditTask({...editTask, [e.target.name]: e.target.value})
  }

  function handleFilters(e){
    console.log(Object.keys(filters).includes('departmentId'))
    setFilters({...filters, [e.target.name]: e.target.value})
  }
  function fetchTaskTypes() {
    requestHandler.get('/api/task_types', setTaskTypes);
  }

  function fetchDepartments() {
    requestHandler.get('/api/departments', setDepartments);
  }

  function submitFilters(e){
    e.preventDefault()
    requestHandler.post('/api/filter/tasks',filters, setTasks, setErrors)
  }
  return (
    <SideNav navItems={navItems} user={user}>
      <div>
        <div className='mb-4 w-full flex'>
          <a
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            href='/admin/new_task'
          >
            Add New Task
          </a>
        </div>
        <div className="flex space-x-4">
            <SelectComp
            name="departmentId"
            id="departmentId"
            className={`focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${Object.keys(filters).includes('departmentId') ? "bg-green-400" : "bg-transparent"}`}
            onChange={(e) => handleFilters(e)}
            >
              <option value="" className={`bg-transparent text-gray-900 dark:text-red-300 `}>Departments</option>
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
            <SelectComp
              name="type"
              id="taskType"
              // value={newTask.taskType}
              onChange={(e) => handleFilters(e)}
              required={true}
              className={`focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${Object.keys(filters).includes('type') ? "bg-green-400" : "bg-transparent"}`}
            >
              <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>Task Types</option>
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
            <SelectComp
              name="status"
              id="status"
              // value={newTask.taskType}
              onChange={(e) => handleFilters(e)}
              required={true}
              className={`focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${Object.keys(filters).includes('status') ? "bg-green-400" : "bg-transparent"}`}
            >
              <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>Task status *</option>
              {
                Object.keys(taskStatus).map((key) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  return (
                    <option
                      key={ key }
                      value={ key }
                      title={ key }
                      className='bg-transparent text-gray-900 dark:text-gray-300'
                    >
                      { taskStatus[key]}
                    </option>
                  )
                })
              }
            </SelectComp>
            <button
              className={`bg-green-400 to-green-300 hover:from-green-500 hover:to-green-600 px-4 py-2 rounded-md `}
              onClick={(e) => submitFilters(e)}
            >
             Filter ({Object.keys(filters).length})
            </button>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <TableComp columns={['Task Name', 'Task Type', 'Department', 'Handler', 'Status', 'Finished At', 'Edit']}>
            {
              (Array.isArray(tasks.data) ? tasks.data : []).map((task, index) => {
                return (
                  <tr key={task.id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      { task.name }
                    </th>
                    <th
                      scope="row"
                      title={ (task.task_type && task.task_type.description) || '' }
                      className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      { (task.task_type && task.task_type.name) || '' }
                    </th>
                    <td className="px-2 py-4">
                      { (task.department && task.department.name) || 'None Assigned' }
                    </td>
                    <td className="px-2 py-4">
                      { (task.user && task.user.name) || 'None Assigned' }
                    </td>
                    <td className={`px-2 py-4 ${task.status == taskStatus.DONE ? "text-green-500" : task.status == taskStatus.AWAITING_APPROVAL ? "text-amber-300" : task.status == taskStatus.AWAITING_APPROVAL && "text-red-500"}`}>
                      { taskStatus[task.status] || taskStatus[1] }
                    </td>
                    <td className="px-2 py-4">
                      { task.task_finished_at || '' }
                    </td>
                    <td className="px-2 py-4">
                      <Icon
                        src='edit'
                        className='w-[20px] h-[20px] opacity-60 hover:opacity-80 cursor-pointer'
                        onClick={() => toggleEditTask(task)}
                      />
                    </td>
                    <td className="px-2 py-4">
                      <Icon
                        src='delete'
                        className='w-[15px] h-[15px] opacity-60 hover:opacity-80 cursor-pointer'
                        onClick={() => deleteTask(task.id)}
                      />
                    </td>
                  </tr>
                );
              })
            }
          </TableComp>
          <PaginatorNav state={tasks} setState={setTasks}/>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}>
        <div>
        {/* <div className='mb-4 w-full flex'>
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            // onClick={openNewTaskTypeModal}
          >
            Add New Task Type
          </button>
        </div> */}
        <form className="max-w-md mx-auto h-[90vh]">
          <div className="relative z-0 w-full mb-5 group mt-10">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={editTask.name}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className=" peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Task Name
              <span className='text-gray-900'> *</span>
            </label>
            {/* {
              (errors.name || errors.errors?.name) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'name') }
              </p>
            }   */}
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="task_type_id"
              id="taskType"
              value={editTask.task_type}
              onChange={(e) => handleChange(e)}
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
              value={editTask.department}
              onChange={(e) => handleChange(e)}
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
            <input
              type="date"
              name="from_date"
              id="fromDate"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={editTask.from_date}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              From (optional)
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
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              To (optional)
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
              onChange={(e) => handleChange(e)}
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
        </Modal>
      </div>
    </SideNav>
  )
}

export default Tasks;
