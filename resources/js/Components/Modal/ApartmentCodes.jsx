import React,{useEffect, useState} from 'react'
import Modal from "../Common/Modal";
import requestHandler from '../../services/requestHandler';
import Icon from '../Common/Icon';


const ApartmentCodes = ({ closeModal}) => {
  const [showApartmentCodes, setShowApartmentCodes] = useState(false);
  const [apartmentCodes, setApartmentCodes] =  useState([]);
  const [newApartmentCodesModal, setNewApartmentCodesModal] = useState(false);
  const [newApartmentCodes, setNewApartmentCodes] = useState({});
  useEffect(() => {
    getApartments();
  }, []); 

  function getApartments() {
    requestHandler.get('/api/apartment_codes', setApartmentCodes)
  }
  return (
    <div>
        <button
        className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
        onClick={() => setShowApartmentCodes(!showApartmentCodes)}
        >Apartment Codes</button>
        <Modal show={showApartmentCodes} onClose={() => setShowApartmentCodes(false)}>
          <div className='flex flex-col'>
          <Icon src='plus' className='rounded-full p-1 w-10 mr-12 mt-1 float-right hover:bg-green-200' fill='rgb(34 197 94)' onClick={() => setNewApartmentCodes(true)}/>
            <ul className='h-[60vh] overflow-auto'>
             {
              apartmentCodes?.map((apt) => {
               return  <li key={apt.id} className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>{apt.code}</span>{apt.name}</li>
              })
             }
           </ul>
          </div>
          {/* <Modal show={newApartmentCodesModal} onClose={() => setNewApartmentCodesModal(false)}> */}
          <div className={`bg-white border b-2 absolute top-20 right-10 p-2 h-[50vh] w-[70vw] sm:w-[40vw] ${newApartmentCodesModal ? 'block' : 'hidden'}`}>
            <h2 className='text-center text-xl font-bold'>Equipments List</h2>
            <button
              type="button"
              className="absolute top-3 right-3 end-2.5 float-right  text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setNewApartmentCodesModal(false)}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>

            <form className="px-4 py-2" action="#">
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
                  // value={serialNo}
                  // onChange={(e) => setSerialNo(e.target.value)}
                  required
                />
              </div>
              <div className='mt-2'>
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
                  // value={serialNo}
                  // onChange={(e) => setSerialNo(e.target.value)}
                  required
                />
              </div>
              <div className='mt-2 mb-4'>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Serial Number
                </label>
                <input
                  type="text"
                  name="serial_no"
                  className="bg-gray-50 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  // placeholder="Enter employee's name"
                  // value={serialNo}
                  // onChange={(e) => setSerialNo(e.target.value)}
                  required
                />
              </div>

              <div className='flex items-center'>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 w-fit text-white hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 ml-auto"
                  // onClick={(e) => confirm(e,'assign')}
                >
                  Assign
                </button>
              </div>
            </form> 
            </div>
          {/* </Modal> */}
        </Modal>
    </div>
  )
}

export default ApartmentCodes