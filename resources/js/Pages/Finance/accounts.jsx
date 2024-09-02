import React,{useState,useEffect, useContext} from 'react'
import SideNav from '../../Layouts/SideNav'
import TableComp from '../../Components/Common/TableComp';
import Modal from '../../Components/Common/Modal';
import PaginatorNav from '../../Components/Common/PaginatorNav';
import SelectComp from '../../Components/Common/SelectComp';
import { loaderSetter } from '../../Components/Common/Loader';
import requestHandler from '../../services/requestHandler';
import AccountsTableElem from '../../Components/Admin/AccountsTableElem';
import ClientsTableElem from '../../Components/Admin/ClientsTableElem';
import {AppContext} from '../../appContext';

const Accounts = () => {
  const [formMode,setFormMode] = useState('');
  const [clients, setClients] = useState({
    current_page: 1,
    last_page: 1,
    prev_page_url: '',
    next_page_url: '',
    total: 1
});
const [client, setClient] = useState({
  package_id: 0,
});
const [showNewClientModal, setShowNewClientModal] = useState(false);
const [response, setResponse] = useState(false);
const [errors, setErrors] = useState(false);
const [internetPackages, setInternetPackages] = useState(false);
const { userData } = useContext(AppContext);
const [inputFile, setInputFile] = useState()


useEffect(() => {
  fetchInternetPackages();
  fetchClients();
}, []);

useEffect(() => {
  checkResponse();
}, [response]);

function toggleOpenModal(mode,elem){
  if(mode === 'edit'){
    setFormMode(mode)
    setClient(elem);
  }else{
    setClient({
    package_id: 0,
    user_id: 0,
    })
  }
  
  setShowNewClientModal(true);
}

function checkResponse () {
  if (response) {
    fetchClients();
    setClient({});
    setShowNewClientModal(false);
  }
}

function handleChange(e) {
  setClient({...client, [e.target.name]: e.target.value});
}

function fetchClients(){
  requestHandler.get('/api/clients', setClients, null, loaderSetter);
}

function fetchInternetPackages(){
  requestHandler.get('/api/internet_packages', setInternetPackages);
}

function deleteUser(id) {
  requestHandler.delete(`/api/client/${id}`, setResponse, setErrors, loaderSetter);
}

function submitClient(e){
  e.preventDefault();
  console.log(client);
    if (formMode === 'edit') {
      requestHandler.patch('/api/client', client, setResponse, setErrors, loaderSetter);
    } else {
      requestHandler.post('/api/client', client, setResponse, setErrors, loaderSetter);
    }
}

function handleInputFile(e){
  const formData = new FormData();
  setInputFile(e.target.files[0])
}

async function submitFile(e){
  e.preventDefault()
 
  const formData = new FormData();
  formData.append("file",inputFile)

  await fetch('/api/clients/upload', {
      method: 'POST',
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: formData
  }).then(response => {
    if (response.ok) {
      return response.json();
    }
  })
  .then(data => {
      setResponse(data); 
  }).catch(error => {
      setErrors(error);
  }); 

  }
  return (
    <SideNav>
      <div className="">
        <div className='mb-4 w-full flex'>
        <div className="border b-5 rounded border-grey p-2">
                    <input type="file" id="inventory_file" placeholder="Import Sheet" onChange={(e) => handleInputFile(e)}/>
                    <button className="rounded bg-green-400 p-2 hover:bg-green-600 hover:text-gray-100" onClick={(e) => submitFile(e)}>Submit</button>
            </div>
          <button
            className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
            onClick={toggleOpenModal}
          >
            Add New Client
          </button>
        </div>

        <Modal
          show={showNewClientModal}
          onClose={() =>  setShowNewClientModal(false)}
        >
          <div className="mt-8 px-2 w-full h-screen overflow-y-scroll">
            <div className="bg-white rounded-lg shahiddendow dark:bg-gray-700">
              <div className="flex items-center justify-between p-2 md:p-3 border-b rounded-t dark:border-gray-600">
                {
                  formMode == 'edit' ?
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit Client Details
                  </h3>
                  :
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add a New Client
                  </h3>
                }
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() =>  setShowNewClientModal(false)}
                >
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-3 md:p-4">
                <form className="px-4 py-2" action="#">
                  <div className='mb-5'>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                     Account Name
                    </label>
                    <input
                      type="text"
                      name="acc_no"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Account name"
                      value={client.acc_no}
                      onChange={handleChange}
                      required
                    />
                    {/* {
                      (errors.name || errors.errors?.name) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'name') }
                      </p>
                    }   */}
                  </div>
                  <div className='mb-5'>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's name"
                      value={client.name}
                      onChange={handleChange}
                      required
                    />
                    {/* {
                      (errors.name || errors.errors?.name) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'name') }
                      </p>
                    }   */}
                  </div>

                  <div className='mb-5'>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's email"
                      value={client.email}
                      onChange={handleChange}
                      required
                    />
                    {/* {
                      (errors.email || errors.errors?.email) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'email') }
                      </p>
                    }   */}
                  </div>

                  <div className='mb-5'>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone_number"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's phone number"
                      value={client.phone_number}
                      onChange={handleChange}
                      required
                    />
                    {/* {
                      (errors.name || errors.errors?.name) && 
                      <p className="text-red-500 my-2 py-1">
                        { displayErrors(errors, 'name') }
                      </p>
                    }   */}
                  </div>

                  <div className='mb-5'>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's address"
                      value={client.address}
                      onChange={handleChange}
                      required
                    />
                    {/* {
                      (errors.clearance_level || errors.errors?.clearance_level) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'clearance_level') }
                      </p>
                    }   */}
                  </div>

                  <div className='mb-5'>
                    <label
                      htmlFor="apartment_no"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Hse No
                    </label>
                    <input
                      type='text'
                      name="apartment_no"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter house number"
                      value={client.apartment_no}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    {/* {
                      (errors.password_confirmation || errors.errors?.password_confirmation) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'password_confirmation') }
                      </p>
                    }   */}
                  </div>
                  <div className='mb-5'>
                    <label
                      htmlFor="employee_id"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Work Number
                    </label>
                    <input
                      type='text'
                      name="employee_id"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter Work number"
                      value={client.employee_id}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                    {/* {
                      (errors.password_confirmation || errors.errors?.password_confirmation) && 
                      <p className="text-red-500 my-1 py-1">
                        { displayErrors(errors, 'password_confirmation') }
                      </p>
                    }   */}
                  </div>
                  
                <div className='mb-5 flex justify-between'>
                  <div className='w-[20vw]'>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      WIFI Name
                    </label>
                    <input
                      type="text"
                      name="wifi_name"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's wifi name"
                      value={client.wifi_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className='w-[30vw]'>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      WIFI Password
                    </label>
                    <input
                      type="text"
                      name="wifi_password"
                      className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Enter client's wifi password"
                      value={client.wifi_password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                  <SelectComp
                    name="package"
                    id="package"
                    value={client.package_id}
                    onChange={handleChange}
                    required={true}
                    className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white`}
                  >
                    <option value="" className='text-gray-400'>Select Internet Package</option>
                    {
                      (Array.isArray(internetPackages) ? internetPackages : []).map((type, index) => {
                        return (
                          <option
                            key={ type.id || index }
                            value={ type.id }
                            className='text-gray-900'
                          >
                            { type.name }
                          </option>
                        )
                      })
                    }
                  </SelectComp>
                  
                </div> 
                  <div className="mt-5 relative z-0 w-full group mb-5">
                  <SelectComp
                    name="connection_status"
                    id="status"
                    value={client.connection_status}
                    onChange={(e) => handleChange(e)}
                    required={true}
                    className={`bg-transparent focus:outline-none border-hidden border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-900 dark:text-white`}
                  >
                    <option value="" className='text-gray-400'>Select Internet Status</option>
                    <option value={0}>Active</option>
                    <option value={1}>Inactive</option>
                  </SelectComp>
                </div>
                
          <div className="mt-8 relative z-0 w-full group">
            <input
              type="date"
              name="billing_day"
              id="billing_day"
              className="mt-5 block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={client.billing_day}
              onChange={(e) => handleChange(e)}
              required
            />
            <label
              htmlFor="billing_day" 
              className="z-0 peer-focus:font-medium px-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Billing Day
            </label>
            {/* {
              (errors.toDate || errors.errors?.toDate) && 
              <p className="text-red-500 my-2 py-1">
                { displayErrors(errors, 'toDate') }
              </p>
            }   */}
          </div>       
                  <div className='w-full flex justify-between items-center'>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
                      onClick={(e) => submitClient(e)}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
          <TableComp columns={['Account No.','Name', 'Email', 'Phone Number', 'Address', 'Hse No', 'Status', 'Billing Day','Internet Package', 'WIFI Name', 'WIFI Pwd', 'Work No.', 'Action']}>
            {
              clients?.data?.map((elem, index) => {
                return (
                  <ClientsTableElem
                    key={elem.id || index}
                    elem={elem}
                    currentUser={userData}
                    packages={internetPackages}
                    openModal={toggleOpenModal}
                    openDeleteModal={() => deleteUser(elem.id)}
                  />
                );
              })
            }
          </TableComp>
          <PaginatorNav state={clients} setState={setClients}/>
        </div>
      </div>
    </SideNav>
  )
}

export default Accounts