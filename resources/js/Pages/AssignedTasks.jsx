import React, { useEffect, useState } from "react";
import {
    navItemsDeterminer,
    pageData as defaultPageData,
} from "../data/indexNav";
import SideNav from "../Layouts/SideNav";
import requestHandler from "../services/requestHandler";
import Modal from "../Components/Common/Modal";
import { displayErrors } from "../data/utils";
import PaginatorNav from "../Components/Common/PaginatorNav";
import TableComp from "../Components/Common/TableComp";
import taskStatus from "../data/enums/taskStatus";
import {taskStatusKeys} from "../data/enums/taskStatus";
import { toast } from 'react-toastify';
import DropDown from "../Components/Common/DropDown";
import { Menu } from "@headlessui/react";
import Icon from "../Components/Common/Icon";
import { Link } from "@inertiajs/react";
import SortElem from "../Components/Task/SortElem"
import TaskStatusColorCode from "../Components/Common/TaskStatusColorCode";
import TaskStatusIndicator from "../Components/Common/TaskStatusIndicator";
import clientStatus from '../data/enums/clientStatus';


function AssignedTasks() {
    const [navItems, setNavItems] = useState(defaultPageData);
    const [tasks, setTasks] = useState({
        data: [],
        from: 1,
        last_page: 0,
        per_page: 10,
        prev_page_url: null,
        next_page_url: null,
        to: 0,
        total: 0,
    });
    const [task, setTask] = useState({});
    const [showUnassignModal, setShowUnassignModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [response, setResponse] = useState(false);
    const [report, setReport] = useState({});
    const [feedback, setFeedback] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
		const [showTaskFeedBack, setShowTaskFeedback] = useState(false);
		const [feedbackOptional, setFeedbackOptional] = useState(false);
    const [taskTypes, setTaskTypes] = useState([]);

    const sortParams = {
      'type': taskTypes,
      'status': taskStatusKeys,
      'clientStatus': clientStatus
    }

    function submitFilters(filters){
      requestHandler.post('/api/filter/tasks?p=assigned',filters, setTasks, setErrors)
    }
    useEffect(() => {
        fetchAssignedTasks();
        fetchUsers();
        fetchTaskTypes();

    }, []);

    useEffect(() => {
        checkResponse();
    }, [response]);

    function fetchTaskTypes() {
      requestHandler.get('/api/task_types', setTaskTypes);
    }
  

    function checkResponse() {
        if (response && response.message) {
            fetchAssignedTasks();
            setShowFeedbackModal(false)
            toast.success(response.message,{
                position: "top-center"
            });
        }
				if (response) {
					closeModal();
				}
    }

    function fetchUsers() {
        requestHandler.get("/api/department_users", setUsers);
    }

    function fetchAssignedTasks() {
        requestHandler.get("/api/assigned_tasks", setTasks);
    }

    function parseDate(date) {
        if (date) {
            const newDate = new Date(date);
            return newDate.toLocaleDateString("en-UK");
        } else {
            return "";
        }
    }

    function getTaskReport(id) {
        requestHandler.get(`/api/report/${id}`, setReport);
        setShowModal(true);
    }

		function makeFeedbackVisible(status) {
			if (status === 'approved') {
				setShowTaskFeedback(true);
				setFeedbackOptional(true);
			} else if (status === 'rejected') {
				setShowTaskFeedback(true);
				setFeedbackOptional(false);
			}
		}

		function makeFeedbackInvisible(e) {
			e.preventDefault();
			setShowTaskFeedback(false);
		}

		function closeModal() {
			setShowModal(false);
			setShowTaskFeedback(false);
		}

    function closeUnassignModal(){
      setTask({});
      setShowUnassignModal(false);
    }

    function updateReport(e, id, taskId){
			e.preventDefault();

			if (feedbackOptional) {
				if (feedback) {
					requestHandler.patch(`/api/task/${taskId}`, { feedback: feedback }, setResponse, setErrors);
				}
				requestHandler.patch('/api/report', {id, status: 'approved'}, setResponse, setErrors);
			} else {
				if (feedback) {
					// TODO: Make the below requests one instead of two
					requestHandler.patch(`/api/task/${taskId}`, { feedback: feedback }, setResponse, setErrors);
					requestHandler.patch('/api/report', {id, status: 'rejected'}, setResponse, setErrors);
				} else {
					toast.error('Feedback field is required');
				}
			}
    }

    function handleChange(e){
        setFeedback(e.target.value)
    }

    function submitFeedBack(e){
        e.preventDefault()

        const text = {
            feedback: feedback
        }
        requestHandler.patch(`/api/task/${task.id}`,text, setResponse, setErrors)
    }

    function unassignTaskModal(task){
        setTask(task)
        setShowUnassignModal(true)
    }

    function unassignUser(id){
      const data = {
        userId: id,
        taskId: task.id
      }
        requestHandler.patch(`/api/tasks/${id}`,data, setResponse, setErrors)
        const updatedUsers = task.users.filter(user => user.id !== id);
        setTask({...task,['users']: updatedUsers})
    }


    return (
        <SideNav >
			<div>
				<TaskStatusColorCode />
			</div>
      <SortElem sortParams={sortParams} filterFn={submitFilters}/>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <TableComp
                    columns={["Task Name", "Task Type","Handler","Status", "From", "To", "Report", "Action"]}
                >
                    {(Array.isArray(tasks.data) ? tasks.data : []).map(
                        (task, index) => {
                            return (
                                <tr
                                    key={task.id || index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {task.name}
                                    </th>
                                    <th
                                        scope="row"
                                        title={
                                            (task.task_type &&
                                                task.task_type.description) ||
                                            ""
                                        }
                                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {(task.task_type &&
                                            task.task_type.name) ||
                                            ""}
                                    </th>
                                    <td className="px-2 py-4">
                                      {
                                       task.users?.map((user, ind) => {
                                        return (
                                          <p key={user.id || ind}>{user.name}</p>
                                        )
                                      })}
                                        {/* {task.user && task.user.name} */}
                                    </td>
                                    <td className="px-2 py-4">
                                        <TaskStatusIndicator status={task.status} />
                                    </td>
                                    <td className="px-2 py-4">
                                        {task.from_date ||
                                            parseDate(task.created_at)}
                                    </td>
                                    <td className="px-2 py-4">
                                        {task.to_date || "Not Specified"}
                                    </td>
                                    <td
                                      className="px-2 py-4 hover:underline hover:text-[var(--purple)] dark:hover:text-gray-100 cursor-pointer"
                                      onClick={() =>
                                        getTaskReport(task.id)
                                      }
                                    >
                                      View Report
                                    </td>
                                    <td>
                                      <DropDown>
                                        <Menu.Item>
                                          {({ active }) => (
																						task.status == taskStatus.PENDING || task.status == taskStatus.REJECTED ?
                                            <button
                                              className={`${
                                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                                              onClick={() => unassignTaskModal(task)}
                                            >
                                              <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                                              <span className='block py-3 px-2'>Unassign</span>   
                                            </button>
																						:
																						<button
                                              className={`${
                                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                                              disabled
																							title="Task is ongoing"
                                            >
                                              <Icon src='edit' className='w-4 mr-2' fill='var(--gray)'/>
                                              <span className='block py-3 px-2'>Ongoing</span>   
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
                        }
                    )}
                </TableComp>
                <PaginatorNav state={tasks} setState={setTasks} />

                <Modal show={showModal} onClose={closeModal}>
                    <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
                    <button
                                    type="button"
                                    className="right-0 float-end end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={closeModal}
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
                                    {report[0]?.title}
                                </h3>
                                
                            </div>
                            <textarea
                              className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 resize-none"
                              rows={12}
                              value={report[0]?.content}
                              disabled
                            />
  
                        </div>
                        <div className="mb-4 w-full flex">
                                <button
                                    className="bg-green-600 hover:opacity-80 rounded-md px-5 py-2 mt-5 text-gray-100 disabled:hidden"
                                    onClick={() => makeFeedbackVisible('approved')}
																		disabled={showTaskFeedBack}
                                >
                                    Approve
                                </button>
                                <button
								    className="bg-red-600 hover:opacity-80 rounded-md px-5 py-2 ml-auto mt-5 text-gray-100 disabled:hidden"
                                    onClick={() => makeFeedbackVisible('rejected', report[0]?.id)}
																		disabled={showTaskFeedBack}
                                >
                                    Reject
                                </button>
                            </div>

														{	
															showTaskFeedBack &&
															(
																<div className="mt-8">
																	<div>
																		<label
																			htmlFor="feedback-content"
																			className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
																		>
																			Feedback {feedbackOptional ? '(optional)' : '*'}
																		</label>

																		<textarea
																			id="feedback-content"
																			rows="4"
																			className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-600 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
																			placeholder="Write your feedback here..."
																			name='feedback'
																			onChange={handleChange}
																			value={feedback}
																		/>

																		{
																			(errors.feedback || errors.errors?.feedback) &&
																				<p className="text-red-500 my-2 py-2">
																					{ displayErrors(errors, 'feedback') }
																				</p>
																		}
																	</div>

																	<div className="flex justify-between mt-4 mb-2">
																		<button
                        						  type="submit"
                        						  className="bg-gradient-to-r from-red-500 to-red-300 text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                        						  onClick={(e) => makeFeedbackInvisible(e)}
                        						>
                        						  Back
                        						</button>

																		<button
                        						  type="submit"
                        						  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800"
                        						  onClick={(e) => updateReport(e, report[0]?.id, report[0]?.task_id)}
                        						>
                        						  Submit
                        						</button>
																	</div>
																</div>
															)
														}
                    </div>
                </Modal>
                <Modal
                show={showFeedbackModal}
                onClose={() => setShowFeedbackModal(false)}
                >
                <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
                  <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
                    <div className="flex items-center justify-between md:p-5 border-b rounded-t dark:border-gray-600 w-full">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Give a feedback
                      </h3>
                      <button
                        type="button"
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setShowFeedbackModal(false)}
                      >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="p-1 md:p-5 sm:p-3 w-full">
                      <ul>
                        {

                        }
                      </ul>
                    </div>
                  </div>
                </div>
              </Modal>
                <Modal
                show={showUnassignModal}
                onClose={() => closeUnassignModal}
                >
                <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
                  <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-1 sm:p-8 md:p-8 w-full">
                    <div className="flex items-center justify-between md:p-5  dark:border-gray-600 w-full">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Unassign users
                      </h3>
                      <button
                        type="button"
                        className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => closeUnassignModal()}
                      >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>
                    <div className="p-1 md:p-5 sm:p-3 w-full">
                      {
                         <ul>
                          {
                            task?.users?.map((user) => {
                              return (
                                <li key={user.id} className="border-b rounded-t mb-5 flex justify-between">{user.name}<button className="rounded bg-gray-200 p-2 mb-2 hover:bg-gray-300" onClick={() => unassignUser(user.id)}>Unassign</button></li>
                              )
                            })
                          }
                        </ul>
                      }
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
        </SideNav>
    );
}

export default AssignedTasks;
