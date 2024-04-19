import React, { useEffect, useState } from 'react'
import { displayErrors } from '../../data/utils';
import requestHandler from '../../services/requestHandler';
import { router } from '@inertiajs/react';
import Icon from '../../Components/Common/Icon';

function Login() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [response, setResponse] = useState(false);

  function handleChange(e) {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }

  function submitNewUser(e) {
    e.preventDefault();
    requestHandler.post('/login', newUser, setResponse, setErrors);
  }

  useEffect(() => {
    checkResponse();
  }, [response]);

  function checkResponse() {
    if (response) {
      router.visit('/dashboard');
    }
  }

  return (
    <div className='flex justify-center items-center h-screen bg-white dark:bg-gray-900'>
      <div className="w-full h-full md:w-[75%] sm:w-[95%] sm:h-[75%] shadow-md bg-gray-100 dark:bg-gray-700">
        <div className="w-full flex justify-center h-[35%]">
          <Icon src='/images/etnet.png' imgClassName='h-full w-full' className='max-w-[600px] max-h-[400px] md:w-[40%] md:h-full sm:w-[60%] sm:h-full w-full h-full'/>
        </div>

        <div className="h-[65%] flex justify-center items-center">
          <form action="" className="space-y-8 px-4 py-2 w-full max-w-[750px]" onSubmit={(e) => submitNewUser(e)}>
            <div>
              <input
                type="email"
                name="email"
                className="bg-white dark:bg-gray-900 focus:outline-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter your email"
                value={newUser.email}
                onChange={(e) => handleChange(e)}
                required
              />
              {
                (errors.email || errors.errors?.email || errors.message || errors.errors?.message) && 
                <p className="text-red-500 my-1 py-1 text-center">
                  { displayErrors(errors, 'email') || displayErrors(errors, 'message') }
                </p>
              }  
            </div>

            <div>
              <div
              className='flex items-center pr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
              >
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password"
                  className="bg-gray-50 border-transparent focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your password"
                  value={newUser.password}
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
              className="hover:bg-gradient-to-r hover:from-[var(--blue)] hover:to-[var(--luminous-green)] w-full text-white font-semibold opacity-80 bg-[var(--blue)] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 my-8"
              onClick={(e) => submitNewUser(e)}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;
