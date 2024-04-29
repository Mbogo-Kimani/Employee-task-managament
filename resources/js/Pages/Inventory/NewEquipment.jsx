import React,{useState, useEffect} from 'react'
import { pageData as defaultPageData, navItemsDeterminer } from '../../data/indexNav'
import SideNav from '../../Layouts/SideNav';
import requestHandler from '../../services/requestHandler';
import departmentsEnum from '../../data/enums/department';
import equipmentsStatusEnum from '../../data/enums/equipmentStatus';
import { router } from '@inertiajs/react';
import SelectComp from '../../Components/Common/SelectComp';
import { displayErrors } from '../../data/utils';
import Modal from '../../Components/Common/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewEquipment = ({user}) => {
  const [navItems, setNavItems] = useState(defaultPageData);
  const [equipment, setEquipment] = useState({});
  const [departments, setDepartments] = useState([]);
  const [equipmentStatus, setEquipmentStatus] = useState([]);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(false);

  useEffect(() => {
    setNavItems(
    navItemsDeterminer(user?.role, user?.clearance_level)
    );
  }, []);

  useEffect(() => {
    fetchDepartments()
  },[])

  function handleChange(e){
    setEquipment({...equipment, [e.target.name]: e.target.value})
  }

  function submitNewEquipment(e) {
    e.preventDefault();
    requestHandler.post('/api/equipments', equipment, setResponse, setErrors);
  }

  function fetchDepartments() {
    requestHandler.get('/api/departments', setDepartments);
  }

  return (
    <SideNav navItems={navItems} user={user}>
      <div>
      <form className="max-w-md mx-auto">
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
              {
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
              }
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
              {
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
              }
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
            onClick={(e) => submitNewEquipment(e)}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </SideNav>
  )
}

export default NewEquipment