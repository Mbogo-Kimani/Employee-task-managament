import React, { useEffect, useState } from 'react'
import { navItemsDeterminer, pageData as defaultPageData } from '../../data/indexNav';
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import taskStatus from '../../data/enums/taskStatus';
import TableComp from '../../Components/Common/TableComp';
import PaginatorNav from '../../Components/Common/PaginatorNav';

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
          <TableComp columns={['Task Name', 'Task Type', 'Department', 'Handler', 'Status', 'Finished At']}>
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
                  </tr>
                );
              })
            }
          </TableComp>
          <PaginatorNav state={tasks} setState={setTasks}/>
        </div>
      </div>
    </SideNav>
  )
}

export default Tasks