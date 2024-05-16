import React, { useEffect, useState } from 'react'
import { navItemsDeterminer, pageData as defaultPageData} from '../../../../data/indexNav';
import SideNav from '../../../../Layouts/SideNav';
import requestHandler from '../../../../services/requestHandler';
import taskStatus, { taskStatusKeys } from '../../../../data/enums/taskStatus';
import TableComp from '../../../../Components/Common/TableComp';

function Tasks() {
  const [tasks, setTasks] = useState({
    data: [],
    from: 1,
    last_page: 0,
    per_page: 20,
    prev_page_url: null,
    next_page_url: null,
    to: 0,
    total: 0,
  });



  useEffect(() => {
    fetchTasks();
  }, []);

  function fetchTasks() {
    const userId = location.pathname.split('/')[3];
    requestHandler.get(`/api/tasks/${userId}`, setTasks);
  }

  return (
    <SideNav>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <TableComp columns={['Name', 'Description', 'From Date', 'To Date', 'Status', 'Finished At', 'Action']}>
          {
            (Array.isArray(tasks.data) ? tasks.data : []).map((task, index) => {
              return (
                <tr key={task.id || index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th scope="row" className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
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
                    { taskStatusKeys[task.status] }
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
        </TableComp>
        {/* <nav className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
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
        </nav> */}
      </div>
    </SideNav>
  )
}

export default Tasks;
