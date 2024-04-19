import React, { useEffect, useState } from 'react'
import { navItemsDeterminer, pageData as defaultPageData } from '../../data/indexNav';
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import taskStatus from '../../data/enums/taskStatus';
import { handlePage } from '../../data/utils';

function Tasks({ user }) {
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

  useEffect(() => {
    setNavItems(
      navItemsDeterminer(user?.role, user?.clearance_level)
    );
  }, [])

  useEffect(() => {
    fetchAllTasks();
  }, []);

  function fetchAllTasks() {
    requestHandler.get('/api/all_tasks', setTasks);
  }

  function toggleReport (task_id) {
    console.log(task_id);
    // toggleOpenModal();
    // setReport({...report, task_id});
  }

  return (
    <SideNav navItems={navItems}>
      <div>
        <div className='mb-4 w-full flex'>
          <a
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            href='/admin/new_task'
          >
            Add New Task
          </a>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Task Name
                </th>
                <th scope="col" className="px-2 py-3">
                  Task Type
                </th>
                <th scope="col" title='Department Assigned' className="px-2 py-3">
                  Department
                </th>
                <th scope="col" title='Task Handler' className="px-2 py-3">
                  Handler
                </th>
                <th scope="col" className="px-2 py-3">
                  Status
                </th>
                <th scope="col" className="px-2 py-3">
                  Finished At
                </th>
                <th scope="col" className="px-2 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
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
                    <td className="px-2 py-4">
                      { taskStatus[task.status] || taskStatus[1] }
                    </td>
                    <td className="px-2 py-4">
                      { task.task_finished_at || '' }
                    </td>
                    {
                      task.status === taskStatus.DONE ?
                      <td
                        className="px-2 py-4 hover:underline hover:text-[var(--purple)] dark:hover:text-gray-100 cursor-pointer"
                        onClick={() => toggleReport(task.id)}
                      >
                        View Report
                      </td>
                      :
                      <td className='px-2 py-4 cursor-pointer' title='Report already submitted'>
                        Not Yet
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
                onClick={() => handlePage(tasks.prev_page_url, setTasks)}
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
                onClick={() => handlePage(tasks.next_page_url, setTasks)}
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

export default Tasks