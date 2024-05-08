import React, { useEffect, useState } from 'react'
import { displayErrors } from '../../data/utils';
import requestHandler from '../../services/requestHandler';
import { router } from '@inertiajs/react';
import Icon from '../../Components/Common/Icon';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';

function ChangePassword() {
    const [token, setToken] = useState()
  const [newPassword, setNewPassword] = useState({
    password_confirmation: '',
    password: '',
    token: ''
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const param = urlParams.get('token');

  function handleChange(e) {
    setNewPassword({...newPassword, [e.target.name]: e.target.value})
  }

  function submitNewPassword(e) {
    e.preventDefault();
    requestHandler.post('/auth/change_password', newPassword, setResponse, setErrors, setLoading);
  }

  useEffect(() => {
    checkResponse();
  }, [response]);

  useEffect(() => {
    setNewPassword({...newPassword, ['token']: param})
  },[])

  function checkResponse() {
    if (response.message) {
      router.visit('/auth/login');
      notify(response.message)
    }
  }

  const notify = (msg) => {
    toast.success(msg,{
      position: "top-center"
    })
  }

  return (
    <div className='flex justify-center items-center h-screen bg-white dark:bg-gray-900'>
      <div className="w-full h-full md:w-[75%] sm:w-[95%] sm:h-[75%] shadow-md bg-gray-100 dark:bg-gray-700">
        <div className="w-full flex justify-center h-[35%]">
          <Icon src='/images/etnet.png' imgClassName='h-full w-full' className='max-w-[600px] max-h-[400px] md:w-[40%] md:h-full sm:w-[60%] sm:h-full w-full h-full'/>
        </div>

        <div className="h-[65%] flex justify-center items-center">
          <form action="" className="space-y-8 px-4 py-2 w-full max-w-[750px]" onSubmit={(e) => submitNewPassword(e)}>
            

            <div>
              <div
              className='flex items-center pr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              >
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password"
                  className="bg-gray-50 border-transparent focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your password"
                  value={newPassword.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
                {
                  showPasswords ?
                  <Icon src='eyeOpen' className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
                  :
                  <Icon src='eyeClose' className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
                }
              </div>
              {
                (errors.password || errors.errors?.password) && 
                <p className="text-red-500 my-1 py-1 text-center">
                  { displayErrors(errors, 'password') }
                </p>
              }  
            </div>
            <div>
              <div
              className='flex items-center pr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              >
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password_confirmation"
                  className="bg-gray-50 border-transparent focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Confirm password"
                  value={newPassword.password_confirmation}
                  onChange={(e) => handleChange(e)}
                  required
                />
                {
                  showPasswords ?
                  <Icon src='eyeOpen' className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
                  :
                  <Icon src='eyeClose' className='w-[30px] h-[30px] mr-4 cursor-pointer' onClick={() => setShowPasswords(!showPasswords)}/>
                }
              </div>
              {
                (errors.password || errors.errors?.password) && 
                <p className="text-red-500 my-1 py-1 text-center">
                  { displayErrors(errors, 'password') }
                </p>
              }  
            </div>

            <button
              type="submit"
              className="hover:bg-gradient-to-r hover:from-[var(--blue)] hover:to-[var(--luminous-green)] w-full text-white font-semibold opacity-80 bg-[var(--blue)] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-800 my-8 flex justify-center items-center"
              onClick={(e) => submitNewPassword(e)}
            >
              {
                !loading ?
                'Submit' :
                <span>
                  <TailSpin
                    visible={loading}
                    height="30"
                    width="30"
                    color="var(--luminous-green)"
                    ariaLabel="tail-spin-loading"
                    radius="1"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </span>
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword;
