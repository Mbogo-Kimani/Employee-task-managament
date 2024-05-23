import React, { useEffect, useState } from "react";
import {
    navItemsDeterminer,
    pageData as defaultPageData,
} from "../../data/indexNav";
import SideNav from "../../Layouts/SideNav";
import requestHandler from "../../services/requestHandler";
import PaginatorNav from "../../Components/Common/PaginatorNav";
import TableComp from "../../Components/Common/TableComp";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import departmentsEnum from '../../data/enums/department';
import equipmentsEnum from '../../data/enums/equipmentStatus';
import Icon from '../../Components/Common/Icon';
import DropDown from "../../Components/Common/DropDown";
import { Menu } from "@headlessui/react";

function AssignedEquipments({ user }) {
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
    const [equipments, setEquipments] = useState({});
    const [currentTask, setCurrentTask] = useState(null);
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);
    const [response, setResponse] = useState(false);
    const [report, setReport] = useState({});
    const [feedBack, setFeedBack] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);


    useEffect(() => {
        fetchAssignedEquipments();
        // fetchUsers();
    }, []);

    useEffect(() => {
        checkResponse();
    }, [response]);

    function checkResponse() {
        fetchAssignedEquipments()
    }

    function fetchAssignedEquipments()
    {
        requestHandler.get("/api/equipments/assigned", setEquipments);
    }

    function confirm(string,equipmentId,taskId) {
        const data = {
            'type': string,
            'equipment_id': equipmentId,
            'task_id': taskId
        }
        requestHandler.patch('/api/equipment/update', data, setResponse)
    }

    return (
        <SideNav >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <TableComp
                    columns={["Name", "Task Name", "User", "Department", "Status", "Assigned Date", "Action"]}
                >
                    {(Array.isArray(equipments) ? equipments: []).map(
                        (equipment, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <th
                                        scope="row"
                                        className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {equipment.name}
                                    </th>
                                    <th
                                        scope="row"
                                        title={
                                            equipment.taskName
                                        }
                                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {equipment.taskName}
                                    </th>
                                    <td className="px-2 py-4">
                                        {equipment.user}
                                    </td>
                                    <td className="px-2 py-4">
                                        {equipment.department}
                                    </td>
                                    <td
                                            className="px-2 py-4 text-center"
                                        >
                                           {equipment.is_assigned ? 'Issued' : '-'}
                                    </td>
                                    <td
                                            className="px-2 py-4"
                                    >
                                        { equipment.assigned_date}
                                    </td>
                                    <td className="px-2 py-4">
                                      <DropDown>
                                        <Menu.Item>
                                          {({ active }) => (
											<button
                                              className={`${
                                              active ? 'bg-green-200 text-black' : 'text-gray-900'
                                              } group flex w-full border-b items-center rounded-md px-2 text-sm`}
											  title="Confirm Item Assigned"
                                              onClick={() => confirm('assign',equipment.id,equipment.taskId)}
                                            >
                                              <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                                              <span className='block py-3 px-2'>Confirm Item Assigned</span>   
                                            </button>
                                          )}
                                        </Menu.Item>
                                        <Menu.Item>
                                          {({ active }) => (
                                            <button
                                            className={`${
                                            active ? 'bg-green-200 text-black' : 'text-gray-900'
                                            } group flex w-full border-b items-center rounded-md px-2 text-sm`}
                                            title="Confirm Item Returned"
                                            onClick={() => confirm('return',equipment.id,equipment.taskId)}
                                            >
                                                <Icon src='edit' className='w-4 mr-2' fill='rgb(34 197 94)'/>
                                                <span className='block py-3 px-2'>Confirm Item Returned</span>   
                                            </button>
                                          )}
                                        </Menu.Item>
                                      </DropDown>
								</td>
                                </tr>
                            );
                        }
                    )}
                </TableComp>
            </div>
        </SideNav>
    );
}

export default AssignedEquipments;
