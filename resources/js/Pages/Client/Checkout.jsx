import React, { useEffect, useState } from 'react'
import Service from '../../Components/Products/Service'
import requestHandler from '../../services/requestHandler';
import ClientLayout from '../../Layouts/ClientLayout';
import { toast } from 'react-toastify';
import { router, usePage } from '@inertiajs/react';

const Checkout = ({transaction}) => {
    // const [productId, setProductId] = useState();
    const [product, setProduct] = useState({});
    const [response, setResponse] = useState([]);
    const [client, setClient] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [streetPackages, setStreetPackages] = useState([]);


    useEffect(() => {
      getStreetPackages();
    },[]);

    function getStreetPackages() {
      requestHandler.get('/api/street_packages', handleStreetPackages);
    }

    function handleStreetPackages(data) {
      setStreetPackages(data);
      const urlParams = new URLSearchParams(window.location.search);
        const param = urlParams.get('productId');

        if(param){
            const foundProduct = data.find(p => p.id == param);
            setProduct(foundProduct);
        }

    }

    useEffect(() => {
      getClient()
    },[])

    useEffect(() => {
        if(client?.client && !client?.client.is_registered_hotspot){
          requestHandler.post('/api/register/client', { client_id: client.client.id, devices: product.devices }, setClient);
        }
    },[client])

    // useEffect(() => {
    //   const { props } = usePage();
    // const transaction = props.transaction;

    //   if(transaction){
    //     console.log(transaction);
        
    //       // requestHandler.post('/api/subscribe',{package_id: product.id,client_id: client.client.id});
    //       // router.visit('/Client/Connected')
    //   }
    // },[])

    function getClient() {
      requestHandler.get('/api/get-client',setClient);

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            amount: product.cost,
            client_id: client.client.id,
            street_package_id: product.id,
            country_code: 254,
            phone_number: phoneNumber,
        }
        // send payment request to server
        requestHandler.post('/api/mpesa/payment', data, handleResponse)
    }

  function handleResponse(resp) {
    if (resp) {
      toast.success('We have sent a prompt to your phone\nPlease enter your MPESA pin when you get the prompt');
      setTimeout(() => {
        router.visit('/client/connected');
      }, 1000);
    }
  }


  return (
    <ClientLayout>
        <div className='w-full flex flex-col justify-center min-h-full'>
          <h1 className='my-4 text-3xl text-center font-bold'>Checkout</h1>
        <div className='md:flex mx-auto lg:w-4/5 md:justify-around my-auto'>
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
          <div className='hidden md:block'>
            <Service streetPackage={product} showAccessLink={false} />
          </div>
        </div>
    </div>
    </ClientLayout>
  )
}

export default Checkout