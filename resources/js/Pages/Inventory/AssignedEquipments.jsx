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
import equipmentsEnum,{equipmentCondition} from '../../data/enums/equipmentStatus';
import Icon from '../../Components/Common/Icon';
import DropDown from "../../Components/Common/DropDown";
import { Menu } from "@headlessui/react";
import Modal from "../../Components/Common/Modal";
import SelectComp from "../../Components/Common/SelectComp";

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

    const [response, setResponse] = useState(false);
    const [showEquipmentsModal, setShowEquipmentsModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [condition, setCondition] = useState()
    const [serialNo, setSerialNo] = useState('')
    const [description, setDescription] = useState('')
    const [equipment, setEquipment] = useState({})


    useEffect(() => {
        fetchAssignedEquipments();
    }, []);

    useEffect(() => {
        checkResponse();
    }, [response]); 

    function checkResponse() {
        fetchAssignedEquipments();
        toast.success(response.message,{
            position: "top-center"
        });
    }

    function fetchAssignedEquipments()
    {
        requestHandler.get("/api/equipments/assigned", setEquipments);
    }

    function confirm(e,string) 
    {
        e.preventDefault()
        const data = {
            'type': string,
            'equipment_id': equipment.id,
            'task_id': equipment.taskId,
            'serial_no': serialNo,
            'condition': condition,
            'description': description
        }
        requestHandler.patch('/api/equipment/update', data, setResponse)
        setShowEquipmentsModal(false);
        setShowReturnModal(false);
        setSerialNo('')
        setDescription('')
        setCondition()
    }

    function openAssignModal(string,equipment){
        setEquipment(equipment);
        if(string == 'assign'){
            setShowEquipmentsModal(true)
        }else{
            setShowReturnModal(true)
        }
    }


    return (
        <SideNav >
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <TableComp
                    columns={["Name","Model", "Task Name", "User", "Department", "Status", "Assigned Date", "Action"]}
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
                                        className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {equipment.model}
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
                                              onClick={() => openAssignModal('assign',equipment)}
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
                                            onClick={() => openAssignModal('return',equipment)}
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
            <Modal show={showEquipmentsModal} onClose={() => setShowEquipmentsModal(false)}>
          <div className='p-4 min-h-[50vh]'>
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

            <form className="space-y-5 px-4 py-2" action="#">
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Serial Number
                </label>
                <input
                  type="text"
                  name="serial_no"
                  className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  // placeholder="Enter employee's name"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  required
                />
              </div>

              <div className='w-full flex items-center'>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8 ml-auto"
                  onClick={(e) => confirm(e,'assign')}
                >
                  Assign
                </button>
              </div>
            </form> 
          </div>
        </Modal>
            <Modal show={showReturnModal} onClose={() => setShowReturnModal(false)}>
          <div className='p-4 min-h-[50vh]'>
            <h2 className='text-center text-xl font-bold'>Equipments List</h2>
            <button
              type="button"
              className="absolute top-3 right-3 end-2.5 float-right  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setShowReturnModal(false)}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <form className="space-y-5 px-4 py-2" action="#">
            <div className="relative z-0 w-full mb-5 mt-10 group">
           <SelectComp
             name="condition"
             id="condition"
            //  value={newTask.taskType}
             onChange={(e) => setCondition(e.target.value)}
             required={true}
             className='bg-transparent focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
           >
             <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>Select Equipment Condition</option>
             {
               Object.keys(equipmentCondition)?.map((key) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                 return (
                   <option
                     key={ key }
                     value={ key }
                     title={ key}
                     className='bg-transparent text-gray-900 dark:text-gray-300'
                   >
                     { equipmentCondition[key]}
                   </option>
                 )
               })
             }
           </SelectComp>
           <hr className="w-full border-[1px] border-gray-300" />
         </div>
            <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="description" 
              className="block mb-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block p-2.5 w-full text-sm text-gray-900 outline-none bg-transparent rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
          </div>
          
              <div className='w-full flex items-center'>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8 ml-auto"
                  onClick={(e) => confirm(e,'assign')}
                >
                  Submit
                </button>
              </div>
            </form> 
          </div>
        </Modal>
        </SideNav>
    );
}

export default AssignedEquipments;
