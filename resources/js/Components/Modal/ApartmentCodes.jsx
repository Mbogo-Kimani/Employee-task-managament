import React,{useEffect, useState} from 'react'
import Modal from "../Common/Modal";
import requestHandler from '../../services/requestHandler';


const ApartmentCodes = ({ closeModal}) => {
  const [showApartmentCodes, setShowApartmentCodes] = useState(false);
  const [apartmentCodes, setApartmentCodes] =  useState([]);

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
           <ul className='h-[50vh] overflow-auto'>
             {
              apartmentCodes?.map((apt) => {
               return  <li key={apt.id} className='mt-3'><span className='p-2 rounded-full bg-green-200 mx-2'>{apt.code}</span>{apt.name}</li>
              })
             }
           </ul>
        </Modal>
    </div>
  )
}

export default ApartmentCodes