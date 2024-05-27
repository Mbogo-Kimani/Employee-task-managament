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
import Modal from "../../Components/Common/Modal";
import SelectComp from "../../Components/Common/SelectComp";

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
    const [showEditModal, setShowEditModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [inputFile, setInputFile] = useState()

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

   function  handleChange(){

   }
    function handleInputFile(e){
        const formData = new FormData();
        console.log(e.target.files);
        // for (var i = 0; i < e.target.files.length; i++) {
        //     formData.append('files[]', files[i]);
        //   }
        // formData.append("file",e.target.files[0])
        
        // for (const pair of formData.entries()) {
        //     console.log(pair[0]+ ', ' + pair[1]); 
        // }

        setInputFile(e.target.files[0])
    }

    function submitFile(e){
        e.preventDefault()
        const formData = new FormData();
        formData.append("file",inputFile)

        fetch('/api/equipments/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: formData
        }).then(response => {
           
        }).catch(error => {
            
        }); 
        // requestHandler.post('/api/equipments/upload',formData,setResponse)
    }
    function toggleEditEquipment(id){
        setShowEditModal(true)
    }

    return (
        <SideNav >
            <div className='mb-4 w-full flex'>
                <div className="border b-5 rounded border-black p-2">
                    <input type="file" id="inventory_file" placeholder="Import Sheet" onChange={(e) => handleInputFile(e)}/>
                    <button className="rounded bg-green-300 p-2" onClick={(e) => submitFile(e)}>Submit</button>
                </div>
                <a
                    className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
                    href='/new_equipment'
                >
                    Add New Equipment
                </a>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
                <TableComp
                    columns={["Name", "Specification", "Quantity","Faulty", "Department", "Purchase Date", "Edit"]}
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
                                            equipment.specification
                                        }
                                        className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {equipment.specification}
                                    </th>
                                    <td className="px-2 py-4 text-center">
                                        {equipment.quantity}
                                    </td>
                                    <td className="px-2 py-4 text-center">
                                        {equipment.faulty ?? 0}
                                    </td>
                                    <td
                                            className="px-2 py-4"
                                        >
                                           {equipment.department}
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
            <Modal show={showEditModal} onClose={() => setShowEditModal(false)}>
            <h2 className="text-center text-xl font-bold">Edit Equipment Details</h2>
            
            <form className="max-w-md mx-auto p-5">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // value={newTask.name}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="name" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Equipment Name
              <span className='text-gray-900'> *</span>
            </label>
            {
              // (errors.name || errors.errors?.name) && 
              // <p className="text-red-500 my-2 py-1">
              //   {/* { displayErrors(errors, 'name') } */}
              // </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="status"
              id="status"
              // value={newTask.taskType}
              onChange={(e) => handleChange(e)}
              required={true}
              className='bg-transparent focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value="" className='bg-transparent text-gray-900 dark:text-red-300'>Equipment status *</option>
              {/* {
                Object.keys(equipmentsStatusEnum).map((key) => {"block py-2.5 px-0 w-full text-sm border-0 bg-transparent border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  return (
                    <option
                      key={ key }
                      value={ key }
                      title={ key }
                      className='bg-transparent text-gray-900 dark:text-gray-300'
                    >
                      { equipmentsStatusEnum[key]}
                    </option>
                  )
                })
              } */}
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              // (errors.taskType || errors.errors?.taskType) && 
              // <p className="text-red-500 my-2 py-1">
              //   { displayErrors(errors, 'taskType') }
              // </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <SelectComp
              name="department"
              id="department"
              // value={newTask.department}
              onChange={(e) => handleChange(e)}
              required={true}
              className='bg-transparent focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            >
              <option value="" className='text-gray-900 dark:text-gray-300'>Select Department *</option>
              {/* {
                (Array.isArray(departments) ? departments : []).map((type, index) => {
                  return (
                    <option
                      key={ type.id || index }
                      value={ departmentsEnum[type.enum_key] }
                      className='text-gray-900'
                    >
                      { type.name }
                    </option>
                  )
                })
              } */}
            </SelectComp>
            <hr className="w-full border-[1px] border-gray-300" />
            {
              // (errors.department || errors.errors?.department) && 
              // <p className="text-red-500 my-2 py-1">
              //   { displayErrors(errors, 'department') }
              // </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="model"
              id="model"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // value={newTask.fromDate}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="model" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Model
            </label>
            {
              // (errors.fromDate || errors.errors?.fromDate) && 
              // <p className="text-red-500 my-2 py-1">
              //   { displayErrors(errors, 'fromDate') }
              // </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <input
              type="number"
              name="quantity"
              id="quantity"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // value={newTask.toDate}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="quantity" 
              className="peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Quantity
            </label>
            {
              // (errors.toDate || errors.errors?.toDate) && 
              // <p className="text-red-500 my-2 py-1">
              //   { displayErrors(errors, 'toDate') }
              // </p>
            }  
          </div>

          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="purchase_date" 
              className="block mb-2 px-3 text-sm font-medium text-gray-500 dark:text-gray-400"
            >
              Date of purchase
            </label>
            <input
              type="date"
              name="purchase_date"
              id="purchase_date"
              className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // value={newTask.toDate}
              onChange={(e) => handleChange(e)}
              required
            />
              {
                // (errors.description || errors.errors?.description) && 
                // <p className="text-red-500 my-2 py-1">
                //   { displayErrors(errors, 'description') }
                // </p>
              }  
          </div>

          <button
              type="submit"
              className="hover:bg-gradient-to-r hover:from-[var(--blue)] hover:to-[var(--luminous-green)] w-full text-white font-semibold opacity-80 bg-[var(--blue)] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-800 my-8 flex justify-center items-center"
              onClick={(e) => submitNewEquipment(e)}
            >
              {/* {
                !loading ?
                'Submit' :
                <span>
                  <TailSpin
                    // visible={loading}
                    height="30"
                    width="30"
                    color="var(--luminous-green)"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </span>
              } */}
            </button>
        </form>
            </Modal>
        </SideNav>
    );
}

export default Equipments;
