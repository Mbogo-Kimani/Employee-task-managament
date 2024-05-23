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

function Equipments({ user }) {
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
        fetchEquipments();
        // fetchUsers();
    }, []);

    useEffect(() => {
        // checkResponse();
    }, [response]);

    function checkResponse() {
        if (response && response.message) {
            
            setShowFeedbackModal(false)
            toast.success(response.message,{
                position: "top-center"
            })
        }
    }

    function fetchEquipments() {
        requestHandler.get("/api/equipments", setEquipments);
    }

    function closeUserAssignModal() {
        setShowAssignUserModal(false);
    }

    return (
        <SideNav >
            <div className='mb-4 w-full flex'>
                <a
                    className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
                    href='/new_equipment'
                >
                    Add New Equipment
                </a>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <TableComp
                    columns={["Name", "Model", "Status", "Quantity","Department", "Purchase Date", "Edit"]}
                >
                    {(Array.isArray(equipments.data) ? equipments.data: []).map(
                        (equipment, index) => {
                            return (
                                <tr
                                    key={equipment.id || index}
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
                                            equipment.model
                                        }
                                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {equipment.model}
                                    </th>
                                    <td className="px-2 py-4">
                                        {equipmentsEnum[equipment.status]}
                                    </td>
                                    <td className="px-2 py-4 text-center">
                                        {equipment.quantity}
                                    </td>
                                    <td
                                            className="px-2 py-4"
                                        >
                                           {departmentsEnum[equipment.department_id]}
                                    </td>
                                    <td
                                            className="px-2 py-4"
                                    >
                                        { equipment.purchase_date}
                                    </td>
                                    <td className="px-2 py-4">
                                    <Icon
                                        src='edit'
                                        className='w-[20px] h-[20px] opacity-60 hover:opacity-80 cursor-pointer'
                                        onClick={() => toggleEditEquipment(equipment)}
                                    />
                                    </td>
                                </tr>
                            );
                        }
                    )}
                </TableComp>
                <PaginatorNav state={equipments} setState={setEquipments} />
            </div>
        </SideNav>
    );
}

export default Equipments;
