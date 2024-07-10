import React,{useState} from 'react'
import Modal from "../Common/Modal";


const ApartmentCodes = ({ closeModal}) => {
  const [showApartmentCodes, setShowApartmentCodes] = useState(false);

  return (
    <div>
        <button
        className="bg-green-500 hover:bg-green-600 rounded-md px-4 py-3 ml-auto text-gray-900 hover:text-gray-100"
        onClick={() => setShowApartmentCodes(!showApartmentCodes)}
        >Apartment Codes</button>
        <Modal show={showApartmentCodes} onClose={() => setShowApartmentCodes(false)}>
           <ul className='h-[50vh] overflow-auto'>
             <li className='mt-3'><span className='p-2 rounded-full bg-green-200 mx-2'>SM</span>Shujaa Mall</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>SH</span>Smart Homes</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>GP</span>GoldPark Homes</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>AH</span>Alina Harbour</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>SC</span>SkyCity</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>HH</span>Himalaya Heights</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>RL</span>Royal Legend</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>SP</span>Siaya Park</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>DG</span>Dennis Garden</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>NG</span>Ndemi Gardens</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>CO</span>City Oasis</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>LH</span>Leshwa House</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>NI</span>Nandwa Ivy</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>CT</span>China Town</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>CC</span>China Centre</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>CCI</span>China City</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>RSC</span>Remax Shopping Centre</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>AL</span>Adlife Plaza</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'>YY</span>Zarafa</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Silver Oak</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>White Oak</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Diamond Home</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Platinum Oak</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Bahari Home</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Silver Harbor</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Kindaruma Homes</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Pinecrest</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Poralis</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Danaaf Towers</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Savannah Land</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Crest Park</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Sophia Residence</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Enkasara</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Comfy</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Yaya Court</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Meteor Garden</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Pandmor</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Diamond Oak</li>
             <li className='mt-5'><span className='p-2 rounded-full bg-green-200 mx-2'></span>Brick Apartment</li>
           </ul>
        </Modal>
    </div>
  )
}

export default ApartmentCodes