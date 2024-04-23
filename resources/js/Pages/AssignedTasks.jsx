import React, { useEffect, useState } from "react";
import {
    navItemsDeterminer,
    pageData as defaultPageData,
} from "../data/indexNav";
import SideNav from "../Layouts/SideNav";
import requestHandler from "../services/requestHandler";
import Modal from "../Components/Common/Modal";
import SelectComp from "../Components/Common/SelectComp";
import { displayErrors } from "../data/utils";
import PaginatorNav from "../Components/Common/PaginatorNav";
import TableComp from "../Components/Common/TableComp";
import taskStatus from "../data/enums/taskStatus";

function AssignedTasks({ user }) {
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
    const [showAssigUserModal, setShowAssignUserModal] = useState(false);
    const [newAssignment, setNewAssignment] = useState({
        user: "",
        task: "",
    });
    const [currentTask, setCurrentTask] = useState(null);
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [response, setResponse] = useState(false);
    const [report, setReport] = useState({});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setNavItems(navItemsDeterminer(user?.role, user?.clearance_level));
    }, []);

    useEffect(() => {
        fetchAssignedTasks();
        fetchUsers();
    }, []);

    useEffect(() => {
        checkResponse();
    }, [response]);

    function checkResponse() {
        if (response) {
            fetchAssignedTasks();
            setNewAssignment({
                user: "",
                task: "",
            });
            closeUserAssignModal();
        }
    }

    function fetchUsers() {
        requestHandler.get("/api/department_users", setUsers);
    }

    function fetchAssignedTasks() {
        requestHandler.get("/api/assigned_tasks", setTasks);
        console.log(tasks);
    }

    function parseDate(date) {
        if (date) {
            const newDate = new Date(date);
            return newDate.toLocaleDateString("en-UK");
        } else {
            return "";
        }
    }

    function closeUserAssignModal() {
        setShowAssignUserModal(false);
    }

    function getTaskReport(id) {
        requestHandler.get(`/api/report/${id}`, setReport);
        setShowModal(true);
    }

		function updateReport(string, id){
			let data = {
				id: id,
				status: string
			}
				if(string == 'approved'){
					requestHandler.patch(`/api/report`,data);
				}else{
					requestHandler.patch(`/api/report`,data);
				}
		}
    return (
        <SideNav navItems={navItems} user={user}>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <TableComp
                    columns={["Task Name", "Task Type", "From", "To", "Report"]}
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
                                        {task.from_date ||
                                            parseDate(task.created_at)}
                                    </td>
                                    <td className="px-2 py-4">
                                        {task.to_date || "Not Specified"}
                                    </td>
                                    {task.status !== taskStatus.PENDING ? (
                                        <td
                                            className="px-2 py-4 hover:underline hover:text-[var(--purple)] dark:hover:text-gray-100 cursor-pointer"
                                            onClick={() =>
                                                getTaskReport(task.id)
                                            }
                                        >
                                            Report
                                        </td>
                                    ) : (
                                        <td
                                            className="px-2 py-4 cursor-pointer"
                                            title="Report already submitted"
                                        >
                                            -
                                        </td>
                                    )}
                                </tr>
                            );
                        }
                    )}
                </TableComp>
                <PaginatorNav state={tasks} setState={setTasks} />

                <Modal show={showModal} onClose={() => setShowModal(false)}>
                    <div className="p-4 mx-auto sm:p-8 w-full overflow-x-scroll">
                    <button
                                    type="button"
                                    className="right-0 float-end end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8  inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={() => setShowModal(false)}
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
                            <div className="p-1 md:p-5 sm:p-3 w-full">
                                {report[0]?.content}
                            </div>
                            
                        </div>
                        <div className="mb-4 w-full flex">
                                <button
                                    className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto mt-5 text-gray-900 hover:text-gray-100"
                                    onClick={() => updateReport('approved', report[0]?.id)}
                                >
                                    Approve
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 rounded-md px-4 py-3 ml-auto mt-5 text-gray-900 hover:text-gray-100"
                                    onClick={() => updateReport('rejected', report[0]?.id)}
                                >
                                    Reject
                                </button>
                            </div>
                    </div>
                </Modal>
            </div>
        </SideNav>
    );
}

export default AssignedTasks;
