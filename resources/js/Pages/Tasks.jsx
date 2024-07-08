import React, { useEffect, useState } from 'react'
import SideNav from '../Layouts/SideNav'
import pageAndNavItemsDeterminer, { pageData as defaultPageData } from '../data/indexNav';
import taskStatus from '../data/enums/taskStatus';
import requestHandler from '../services/requestHandler';
import Modal from '../Components/Common/Modal';
import TableComp from '../Components/Common/TableComp';
import PaginatorNav from '../Components/Common/PaginatorNav';
import { loaderSetter } from '../Components/Common/Loader';
import TaskStatusColorCode from '../Components/Common/TaskStatusColorCode';
import TaskStatusIndicator from '../Components/Common/TaskStatusIndicator';
import DropDown from '../Components/Common/DropDown';
import { Menu } from '@headlessui/react';
import Icon from '../Components/Common/Icon';
import { router } from '@inertiajs/react';
import ApartmentCodes from '../Components/Modal/ApartmentCodes';

function Tasks() {
  const [pageItems, setPageItems] = useState(defaultPageData);
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
  const [showModal, setShowModal] = useState(false);
  const [showFeedBackModal, setShowFeedBackModal] = useState(false);
  const [feedBack, setFeedBack] = useState('');
  const [report, setReport] = useState({
    task_id: null,
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [])

  useEffect(() => {
    checkResponse();
  }, [response]);

  function fetchTasks () {
    requestHandler.get('/api/tasks', setTasks);
  }

  function getReport(id){
    requestHandler.get(`/api/report/${id}`, setReport);
    setShowFeedBackModal(true);
  }

  function checkResponse () {
    if (response) {
      fetchTasks();
      setReport({
        task_id: null,
        title: '',
        content: '',
      });
      setShowModal(false);
    }
  }

  function handleChange(e) {
    setReport({...report, [e.target.name]: e.target.value});
  }

  function toggleCloseModal () {
    setShowModal(false);
  }

  function toggleOpenModal () {
    setShowModal(true);
  }

  function toggleReport (taskId) {
    const thisTask = tasks.data.find(task => task.id === taskId);

    if (thisTask.received_by_department_member) {
      toggleOpenModal();
      setReport({...report, taskId});
    } else {
      requestHandler.post('/api/received_by_department_member', { taskId }, fetchTasks, null, loaderSetter);
    }
  }

  function submitReport (e) {
    e.preventDefault();
    requestHandler.post('/api/task_reports', report, setResponse, setErrors);
  }

  function displayErrors (key) {
    if (errors[key] && Array.isArray(errors[key])) {
      return errors[key][0];
    } else if (errors.errors && errors.errors[key] && Array.isArray(errors.errors[key])) {
      return errors.errors[key][0];
    }
  }

  function openFeedBackModal(content){
    setFeedBack(content)
    setShowFeedBackModal(true)
  }

  function navigateToTasksView(id) {
    router.visit(`/task/${id}`)
  }
  
  return (
    <>
      <SideNav>
        <div className="">
          <TaskStatusColorCode />
          <ApartmentCodes />
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <TableComp columns={['Name', 'Description', 'From Date', 'To Date', 'Status', 'Finished At', 'Feedback', 'Action']}>
              {
                (Array.isArray(tasks.data) ? tasks.data : []).map((task, index) => {
                  return (
                    <tr key={task.id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        { task.name }
                      </th>
                      <th
                        scope="row"
                        title={ task.description || '' }
                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        { task.description?.slice(0, 100) }
                      </th>
                      <td className="px-2 py-4">
                        { task.from_date }
                      </td>
                      <td className="px-2 py-4">
                        { task.to_date }
                      </td>
                      <td className="px-2 py-4">
                        <TaskStatusIndicator status={task.status} />
                      </td>
                      {
                        task.status === taskStatus.PENDING || task.status === taskStatus.REJECTED ?
                        <td
                          className="px-2 py-4 hover:underline hover:text-[var(--purple)] dark:hover:text-gray-100 cursor-pointer"
                          onClick={() => toggleReport(task.id)}
                        >
                          {
                            task.received_by_department_member ?
                            'Report' :
                            'Confirm Received'
                          }
                        </td>
                        :
                        <td className='px-2 py-4 cursor-pointer' title='Report already submitted'>
                          Submitted
                        </td>
                      }
                      {
                        task.status !== taskStatus.PENDING  && task.feedback_if_rejected ?
                        <td
                          className="px-2 py-4 hover:underline hover:text-[var(--purple)] dark:hover:text-gray-100 cursor-pointer"
                          onClick={() => openFeedBackModal(task.feedback_if_rejected  )}
                        >
                          Feedback
                        </td>
                        :
                        <td className='px-2 py-4 cursor-pointer' title='Feedback not yet submitted'>
                          N/A
                        </td>
                        }
                         <td className="px-2 py-4 relative">
                          <DropDown>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active ? 'bg-green-200 text-black' : 'text-gray-900'
                                  } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                                  onClick={() => navigateToTasksView(task.id)}
                                >
                                  <Icon src='eyeOpen' className='w-4 h-4 mr-2' fill='rgb(59 130 246)'/>
                                  <span className='block py-3 px-2'>View</span>
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

            <PaginatorNav state={tasks} setState={setTasks} />
          </div>
        </div>
      </SideNav>
      <Modal
        show={showModal}
        onClose={toggleCloseModal}
      >
        <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
            <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600 w-full">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Write your report
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
            <div className="p-1 md:p-5 sm:p-3 w-full">
              <form className="space-y-4 sm:p-8" action="#">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="reportTitfirstle"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none"
                    placeholder="Enter a title"
                    value={report.title}
                    onChange={handleChange}
                    required
                  />
                  {
                    (errors.title || errors.errors?.title) && 
                    <p className="text-red-500 my-2 py-2">
                      { displayErrors('title') }
                    </p>
                  }  
                </div>
                <div>
                  <label
                    htmlFor="report-content"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Report
                  </label>
                  <textarea
                    id="report-content"
                    rows="4"
                    className="block h-[200px] p-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
                    placeholder="Write your report here..."
                    name='content'
                    onChange={handleChange}
                    value={report.content}
                  />
                  {
                    (errors.content || errors.errors?.content) &&
                    <p className="text-red-500 my-2 py-2">
                      { displayErrors('content') }
                    </p>
                  }
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 w-full text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                  onClick={(e) => submitReport(e)}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
      <Modal show={showFeedBackModal} onClose={() => setShowFeedBackModal(false)}>
                    <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
                    <button
                                    type="button"
                                    className="right-0 float-end end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => setShowFeedBackModal(false)}
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                        <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
                            <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600 w-full">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                   Feedback
                                </h3>
                                
                            </div>
                            <div className="p-1 md:p-5 sm:p-3 w-full">
                                {feedBack}
                            </div>
  
                        </div>
                    </div>
                </Modal>
    </>
  )
}

export default Tasks;