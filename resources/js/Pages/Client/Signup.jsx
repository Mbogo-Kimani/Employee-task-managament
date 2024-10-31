import React, { useContext, useEffect, useState } from 'react'
import GuestLayout from '../../Layouts/GuestLayout'
import '../../../css/Pages/home/auth.css'
import requestHandler from '../../services/requestHandler';
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';
import OTPVerification from '../Auth/ClientOTP'
import { AppContext } from '../../appContext';
import { loaderSetter } from '../../Components/Common/Loader';

const ClientSignup = () => {
    const [client, setClient] = useState({
        phone_number: '',
    });
    const [subscriptionId, setSubscriptionId] = useState()
    const [response, setResponse] = useState([])
    const [otpVerify, setOtpVerify] = useState(false);
    const [productId, setProductId] = useState('');
    const [errors,setErrors] = useState();
    const { clientData,updateClient } = useContext(AppContext);

    useEffect(() => {
        checkResponse();
      }, [response,errors]);
    
    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const param = urlParams.get('productId');
      param && setProductId(param);
    },[])
      function checkResponse() {
        
        if (response && response.message) {

          if (response.success) {
            toast.success(response.message);
            if(response.subscription_id){
              setSubscriptionId(response.subscription_id)
              setProductId('TRIAL')
              requestHandler.post('/api/register/client', { client_id: response.client_id, devices: 1 }, handleResponse);
            }
            setOtpVerify(true)
          } else {
            toast.error(response.message);
          }
          
        }else if(errors){
          toast.error(errors.message)
        }
      }
      function handleResponse(resp){
        
        if(resp.success && response.subscription_id){
          requestHandler.post('/api/subscribe',{subscription_id: response.subscription_id, ip: clientData?.ip, mac: clientData?.mac},setResponse);
        }
      }
      
      function handleSubmit(e, text) {
        e.preventDefault();

        // Check if the phone number starts with '0' and remove it if it does
        const phoneNumber = client.phone_number.startsWith('0')
            ? client.phone_number.slice(1)
            : client.phone_number;

        const updatedClient = { ...client, phone_number: phoneNumber };

        if (text === 'login') {
            requestHandler.post('/api/clients/login', updatedClient, setResponse, setErrors);
        } else if (text === 'signup') {
            requestHandler.post('/api/clients/signup', updatedClient, setResponse, setErrors);
        }
    }

    function toggleOtpVerify() {
      setOtpVerify(!otpVerify);
    }
  return (
    <GuestLayout>
        <div className='flex px-6 m-auto md:w-[50vw]'>
        { otpVerify ? 
        <div className="section pb-5 pt-5 pt-sm-2 text-center">
        <OTPVerification phoneNumber={client?.phone_number}  toggleOtpVerify={toggleOtpVerify} productKey={productId}/>
        </div>
        :
          <div className="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 className="mb-0 pb-3"><span className='mr-4'>Log In </span><span className='ml-4'>Sign Up</span></h6>
			          	<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label htmlFor="reg-log">
						 
						</label>
						<div className="card-3d-wrap mx-auto">
							<div className="card-3d-wrapper">
                            <div className="card-front">
                            <div className="center-wrap flex flex-col justify-center items-center">
                            <div className="flex justify-center">
            <div className="">
            <form className="">
              {/* input */}
              
              <div className="flex items-center border-2 mb-12 py-2 px-2 rounded-2xl">
                <p className=" text-gray-400">+254</p>
                <input 
                    id="phonenumber"
                    className=" pl-2 w-full outline-none border-none bg-blue-200/0" 
                    type="number" 
                    name="phone_number" 
                    value={client.phone_number}
                    onChange={(e) => setClient({...client, [e.target.name]:  e.target.value})}
                    placeholder="Phone Number"
                />
              </div>
              {/* input */}

              {/* input */}
              <button type="submit" onClick={(e) => handleSubmit(e,'login')} className="block w-full bg-[#f99526] mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>              
            </form>
            </div>
            
          {/* </div> */}
      </div>
      </div>
      </div>
      <div className="card-back">
	  <div className="center-wrap">
    <h1 className='text-xl mb-5'>Signup  for <span className='text-orange-300'>FREE 7-DAY TRIAL</span></h1>
      <div className="flex justify-center">
            <div className="">
            <form className="">
              {/* input */}
              <div className="flex items-center border-2 mb-3 py-2 px-2 rounded-2xl">
                <p className=" text-gray-400">+254</p>
                <input 
                id="phonenumber" 
                className=" pl-2 w-full outline-none border-none bg-blue-200/0" 
                type="number" 
                name="phone_number" 
                placeholder="Phone Number" 
                value={client.phone_number}
                onChange={(e) => setClient({...client, [e.target.name]: e.target.value})}
                required
                />
              </div>
              {/* input */}
              <div className="flex items-center border-2 mb-3 py-2 px-3 rounded-2xl">
                <input 
                id="name" 
                className=" pl-2 w-full outline-none border-none bg-blue-200/0" 
                type="text" 
                name="name" 
                value={client.name} 
                placeholder="Name" 
                onChange={(e) => setClient({...client, [e.target.name]: e.target.value})}
                required
                />
              </div>
              {/* input */}
              <div className="flex items-center border-2 mb-3 py-2 px-3 rounded-2xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                <input 
                id="email" 
                value={client.email} 
                className=" pl-2 w-full outline-none border-none bg-blue-200/0" 
                type="email" 
                name="email" 
                placeholder="Email Address"
                onChange={(e) => setClient({...client,[e.target.name]: e.target.value})}
                required
                />
              </div>
              {/* input */}
              <button onClick={(e) => handleSubmit(e,'signup')} type="submit" className="block w-full bg-[#f99526] mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                Sign Up
              </button>              
            </form>
            </div>
            
          {/* </div> */}
      </div>
      </div>
     
      </div>
        </div>
        </div>
    </div>
    }
</div>
    </GuestLayout>
  )
}

export default ClientSignup