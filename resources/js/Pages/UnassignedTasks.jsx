import React, { useEffect, useState } from 'react'
import { navItemsDeterminer, pageData as defaultPageData } from '../data/indexNav';
import SideNav from '../Layouts/SideNav';
import requestHandler from '../services/requestHandler';
import Modal from '../Components/Common/Modal';
import SelectComp from '../Components/Common/SelectComp';
import { displayErrors } from '../data/utils';
import PaginatorNav from '../Components/Common/PaginatorNav';
import TableComp from '../Components/Common/TableComp';
import { loaderSetter } from '../Components/Common/Loader';
import {taskStatusKeys} from "../data/enums/taskStatus";
import SortElem from "../Components/Task/SortElem"
import clientStatus from '../data/enums/clientStatus';
import Select from 'react-select';
import DropDown from '../Components/Common/DropDown';
import { Menu } from '@headlessui/react';
import Icon from '../Components/Common/Icon';


function UnassignedTasks() {
  const [navItems, setNavItems] = useState(defaultPageData);
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
  const [showAssigUserModal, setShowAssignUserModal] = useState(false);
  const [showEquipmentsModal, setShowEquipmentsModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    user: '',
    task: '',
    equipments: []
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState(false);
  const [taskTypes, setTaskTypes] = useState([]);
  const [equipments, setEquipments] = useState({});
  const [selectedEquipments, setSelectedEquipments] = useState([])

    const sortParams = {
      'type': taskTypes,
      'clientStatus': clientStatus
    }

    function submitFilters(filters){
      requestHandler.post('/api/filter/tasks?p=unassigned',filters, setTasks, setErrors)
    }



  useEffect(() => {
    fetchUnassignedTasks();
    fetchUsers();
    fetchTaskTypes();
    fetchEquipments();
  }, []);

  useEffect(() => {
    checkResponse()
  }, [response]);

  function fetchTaskTypes() {
    requestHandler.get('/api/task_types', setTaskTypes);
  }


  function checkResponse () {
    if (response) {
      fetchUnassignedTasks();
      setNewAssignment({
        user: '',
        task: '',
      });
      closeUserAssignModal();
      setShowEquipmentsModal(false)
    }
  }

  function fetchUsers() {
    requestHandler.get('/api/department_users', setUsers);
  }

  function fetchEquipments(){
    requestHandler.get("/api/equipments", setEquipments);
  }

  function fetchUnassignedTasks() {
    requestHandler.get('/api/unassigned_tasks', setTasks);
  }

  function parseDate(date) {
    if (date) {
      const newDate = new Date(date);
      return newDate.toLocaleDateString('en-UK');
    } else {
      return '';
    }
  }

  function openUserAssignModal(taskId) {
    const thisTask = tasks.data.find(task => task.id === taskId);
    setCurrentTask(thisTask);

    if (thisTask.received_by_department_head) {
      setNewAssignment({...newAssignment, task: taskId});
      setShowAssignUserModal(true);
    } else {
      requestHandler.post('/api/received_by_department_head', { taskId }, fetchUnassignedTasks, null, loaderSetter);
    }
  }

  function openEquipmentsModal(taskId){
      setNewAssignment({...newAssignment,task: taskId})
      setShowEquipmentsModal(true)
  }
  
  function closeUserAssignModal() {
    setShowAssignUserModal(false);
  }

  function handleChange(e) {
    setNewAssignment({...newAssignment, [e.target.name]: e.target.value})
  }
  function handleEquipmentChange(values) {
    setNewAssignment({...newAssignment,['equipments']: values.map((val) => {
      return val.value
    })})
  }

  function submitEquipmentsAssignment(e){
    e.preventDefault();
    requestHandler.patch('/api/tasks-equipments', newAssignment, setResponse, setErrors, loaderSetter);
  }

  function submitNewAssignment(e) {
    e.preventDefault();
    requestHandler.patch('/api/tasks', newAssignment, setResponse, setErrors, loaderSetter);
  }

  function getEquipments(id){
    const filteredTask = tasks?.data.filter((task) => {
      return task.id === id
    })
    return filteredTask[0].equipments;
  }

  return (
    <SideNav>
      <SortElem sortParams={sortParams} filterFn={submitFilters}/>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <TableComp columns={['Task Name', 'Task Type', 'From', 'To', 'Equipments', 'Action']}>
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
                    { task.from_date || parseDate(task.created_at) }
                  </td>
                  <td className="px-2 py-4">
                    { task.to_date || 'Not Specified' }
                  </td>
                  <td className="px-2 py-4 w-[30vw] flex flex-wrap">
                    { 
                      getEquipments(task.id)?.map((equipment) => {
                        return (
                          <span className='rounded bg-gray-200 m-2 p-1'>{equipment.name.trim()}</span>
                        )
                      })
                    }
                  </td>
                  <td>
                        <DropDown>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                active ? 'bg-green-200 text-black' : 'text-gray-900'
                                } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                                title="Assign User"
                                onClick={() => openUserAssignModal(task.id)}
                              >
                                <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                                <span className='block py-3 px-2'>Assign Users</span>   
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                              className={`${
                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                              title="Assign Equipments"
                              onClick={() => openEquipmentsModal(task.id)}
                            >
                              <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                              <span className='block py-3 px-2'>Assign Equipments</span>   
                            </button>
                            )}
                          </Menu.Item>
                        </DropDown>
                      </td>
                </tr>
              );
            })
          }
        </TableComp>
        <PaginatorNav
          state={tasks}
          setState={setTasks}
        />

        <Modal
          show={showAssigUserModal}
          onClose={closeUserAssignModal}
        >
          <div className="my-3 px-2 w-full h-fit overflow-y-auto">
            <div className="bg-white rounded-lg shahiddendow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Task Assigning
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={closeUserAssignModal}
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
                      Which user will you assign the task to?
                    </label>
                    <SelectComp
                      name='user'
                      className='bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      value={newAssignment.user}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value=""></option>
                      {
                        (Array.isArray(users) ? users : []).map((individual, index) => {
                          return (
                            <option key={individual.id || index} value={individual.id}>
                              {individual.name}
                            </option>
                          )
                        })
                      }
                    </SelectComp>
                    {
                      (errors.user || errors.errors?.user) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'user') }
                      </p>
                    }  
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
        <Modal show={showEquipmentsModal} onClose={() => setShowEquipmentsModal(true)}>
              <div className='p-4 h-[50vh]'>
                <h2 className='text-center text-xl font-bold'>Equipments List</h2>
                <button
                  type="button"
                  className="absolute top-3 right-3 end-2.5 float-right  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowEquipmentsModal(false)}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="relative z-0 w-full mt-7 group">
                <Select
                  defaultValue={selectedEquipments}
                  onChange={(e) => handleEquipmentChange(e)}
                  options={
                    (Array.isArray(equipments.data) ? equipments.data : []).map((item) => {
                      return(
                        {
                          value: item.id, label: item.name
                        }
                      )
                    })
                  }
                  isMulti
                  isSearchable
                  maxMenuHeight={220}
                />
            <hr className="w-full border-[1px] border-gray-300" />
          </div>
          <button
          type="submit"
          className="float-right bg-gradient-to-r from-cyan-500 to-blue-500 w-[100px] text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
          onClick={(e) => submitEquipmentsAssignment(e)}
          >
            Submit
          </button>
              </div>
        </Modal>
      </div>
    </SideNav>
  )
}

export default UnassignedTasks