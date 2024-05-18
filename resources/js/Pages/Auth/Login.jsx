import React, { useEffect, useState, useContext } from 'react'
import { displayErrors } from '../../data/utils';
import requestHandler from '../../services/requestHandler';
import { router } from '@inertiajs/react';
import Icon from '../../Components/Common/Icon';
import Form from '../../Components/Forms/forms';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { AppContext } from '../../appContext';


function Login() {
  const [newUser, setNewUser] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState(false);
  const [response, setResponse] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, loginUser } = useContext(AppContext)



  function handleChange(e) {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }

  function submitNewUser(e) {
    e.preventDefault();
    requestHandler.post('/api/login', newUser, setResponse, setErrors, setLoading);
  }

  useEffect(() => {
    checkResponse();
  }, [response]);

 

  function checkResponse() {
    if (response.token) {
        const data = {
          'auth_token': response.token,
          'user': response.user
        }

        Object.keys(data).forEach((key) => {
          const value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
          localStorage.setItem(key,value);
        })

        loginUser(response.user)
        router.visit(`/dashboard`)
      notify()
    }
  }

  const notify = () => {
    toast.success(`Login successful`,{
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
          {/* <form action="" className="" onSubmit={(e) => submitNewUser(e)}> */}
           <Form input={newUser} setInput={setNewUser} errors={errors} setErrors={setErrors} className={'space-y-8 px-4 py-2 w-full max-w-[750px]'} onSubmit={submitNewUser}>
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
                (errors.email || errors.errors?.email) && 
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
              className="hover:bg-gradient-to-r hover:from-[var(--blue)] hover:to-[var(--luminous-green)] w-full text-white font-semibold opacity-80 bg-[var(--blue)] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-800 my-8 flex justify-center items-center"
              // onClick={(e) => submitNewUser(e)}
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
          {/* </form> */}
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;
