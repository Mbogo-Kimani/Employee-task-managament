import React, { useEffect, useRef, useState } from 'react'
import GuestLayout from '../../Layouts/GuestLayout'
import '../../../css/Pages/home/auth.css'
import requestHandler from '../../services/requestHandler';
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';

const ClientOTP = ({phoneNumber, toggleOtpVerify,productKey}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [response, setResponse] = useState([])

    useEffect(() => {
        checkResponse();
    }, [response]);

  // timer code
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      // Decrease the seconds by 1
      setSeconds((prevSeconds) =>
        prevSeconds < 1 ? (prevSeconds = 120) : prevSeconds - 1
      );
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
   },[])

    function checkResponse() {
    if (response && response.success) {
      toast.success('Success');
      localStorage.setItem('client', JSON.stringify(response.client))
      router.visit(`/client/checkout?productId=${productKey}`)
    }
    }

    const handleInputChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    
        // Move focus to the next input (if available)
        if (index < otp.length - 1) {
          inputRefs.current[index + 1].focus();
        } else{
            const data = {
                otp: newOtp.join(''),
                phoneNumber: '+254' + phoneNumber
            };
          requestHandler.post('/api/clients/verify',data,setResponse)

        }
    }

  return (
    // <GuestLayout>
         <div className="card-3d-wrap mx-auto mb-14">
            <div className="card-3d-wrapper">
            <div className="card-front">
            <div className="center-wrap flex flex-col justify-center items-center">
      <div>
        <form action="" method="post" className="">
          <div className="flex">
            {otp.map((digit, index) => (
              <div
                key={index}
                className="flex items-center border-2 mb-3 py-2 px-4 mx-4 rounded-2xl w-1/6"
              >
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  maxLength={1}
                  className=" pl-2 w-full outline-none border-none bg-blue-200/0"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mt-4">
            <p>Didn't receive code?</p>{" "}
            <a
              className="flex flex-row items-center text-blue-600"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              Resend in {seconds}s
            </a>
          </div>
          <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500 mt-4">
            <p>Edit phone number?</p>{" "}
            <span
              onClick={toggleOtpVerify}
              className="flex flex-row items-center text-blue-600 cursor-pointer"
              href="http://"
              target="_blank"
              rel="noopener noreferrer"
            >
              Go back
            </span>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
    // </GuestLayout>
  )
}

export default ClientOTP