import React, { useEffect, useState } from 'react'
import Service from '../../Components/Products/Service'
import {packages} from '../home/Products'
import GuestLayout from '../../Layouts/GuestLayout';
import requestHandler from '../../services/requestHandler';
const Checkout = () => {
    // const [productId, setProductId] = useState();
    const [product, setProduct] = useState({});
    const [response, setResponse] = useState([]);
    const [currentClient, setCurrentClient] = useState(JSON.parse(localStorage.getItem('client')));
    const [phoneNumber, setPhoneNumber] = useState('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('productId');

        if(param){
            const foundProduct = packages.find(p => p.id == param);
            setProduct(foundProduct);
        }
    },[])
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            amount: product.cost,
            customer_name: currentClient.name,
            customer_email: currentClient.email,
            country_code: 254,
            phone_number: phoneNumber,
        }
        // send payment request to server
        requestHandler.post('/api/mpesa/payment',data,setResponse)
    }
  return (
    <GuestLayout>
        <div className='w-full flex flex-col justify-center min-h-full'>
          <h1 className='my-4 text-3xl text-center font-bold'>Checkout</h1>
        <div className='flex mx-auto lg:w-4/5 justify-around my-auto'>
          <div className='flex flex-col flex-wrap justify-center items-center shadow w-full md:w-2/5 p-8 rounded-2xl border border-green-100 mb-5'>
            <div className='rounded-xl w-3/4 h-24 shadow-sm border-2 border-green-100 bg-slate-100 flex justify-center items-center p-2 mb-12'>
              <img src="/assets/image/lipa_na_mpesa.png" alt="Logo" width={300} />
            </div>
            <div className="w-full flex items-center border-2 mb-3 py-2 px-2 rounded-2xl">
              <p className=" text-gray-400">+254</p>
              <input
                id="phonenumber"
                className=" pl-2 w-full outline-none border-none bg-blue-200/0"
                type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button type="submit" onClick={handleSubmit} className="block w-full bg-green-500 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Pay Now</button>
          </div>
          <Service streetPackage={product} showAccessLink={false} />
        </div>
    </div>
    </GuestLayout>
  )
}

export default Checkout