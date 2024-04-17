import React, { useEffect, useState } from 'react'
import SideNav from '../Layouts/SideNav'
import pageAndNavItemsDeterminer, { pageData as defaultPageData } from '../data/indexNav';
import taskStatus from '../data/enums/taskStatus';
import requestHandler from '../services/requestHandler';
import Modal from '../Components/Common/Modal';

function Tasks({ user }) {
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
  const [report, setReport] = useState({
    task_id: null,
    title: '',
    content: '',
  });
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);

  useEffect(() => {
    setPageItems(
      pageAndNavItemsDeterminer(user?.role, user?.clearance_level)
    );
  }, [])

  useEffect(() => {
    fetchTasks();
  }, [])

  useEffect(() => {
    checkResponse()
  }, [response])

  function fetchTasks () {
    requestHandler.get('/api/tasks', setTasks);
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

  function handlePrevPage () {
    if (tasks.prev_page_url) {
      requestHandler.get(tasks.prev_page_url, setTasks);
    }
  }

  function handleNextPage () {
    if (tasks.next_page_url) {
      requestHandler.get(tasks.next_page_url, setTasks);
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

  function toggleReport (task_id) {
    toggleOpenModal();
    setReport({...report, task_id});
    console.log(task_id);
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
  
  return (
    <>
      <SideNav navItems={pageItems.navItems}>
        <div className="">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-2 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-2 py-3">
                    From Date
                  </th>
                  <th scope="col" className="px-2 py-3">
                    To Date
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-2 py-3">
                    Finished At
                  </th>
                </tr>
              </thead>
              <tbody>
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
                          { taskStatus[task.status] }
                        </td>
                        {
                          task.status === taskStatus.PENDING ?
                          <td
                            className="px-2 py-4 hover:underline hover:text-[var(--purple)] dark:hover:text-gray-100 cursor-pointer"
                            onClick={() => toggleReport(task.id)}
                          >
                            Report
                          </td>
                          :
                          <td className='px-2 py-4 cursor-pointer' title='Report already submitted'>
                            Report
                          </td>
                        }
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
            <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
                Showing
                <span className="font-semibold text-gray-900 dark:text-white"> {tasks.current_page} - { tasks.last_page }</span> of <span className="font-semibold text-gray-900 dark:text-white">{ tasks.total }</span></span>
              <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                <li
                  className={
                    tasks.prev_page_url ?
                    "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer" :
                    "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default"
                  }
                  onClick={handlePrevPage}
                >
                  Previous
                </li>
                <li className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">
                  { tasks.current_page }
                </li>
              
                <li
                  className={
                    tasks.next_page_url ?
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
      <Modal
        show={showModal}
        onClose={toggleCloseModal}
      >
        <div className="p-4 w-full">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
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
            <div className="p-4 md:p-5">
              <form className="space-y-4 p-8" action="#">
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
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
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
    </>
  )
}

export default Tasks;