import React, { useEffect, useState, useContext } from 'react';
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
  const { user, loginUser } = useContext(AppContext);

  function handleChange(e) {
    setNewUser({...newUser, [e.target.name]: e.target.value});
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
        'user': response.user,
      };
      Object.keys(data).forEach((key) => {
        const value = typeof data[key] === 'object' ? JSON.stringify(data[key]) : data[key];
        localStorage.setItem(key, value);
      });
      loginUser(response.user);
      router.visit(`/admin/tasks`);
      notify();
    }
  }

  const notify = () => {
    toast.success(`Login successful`, {
      position: "top-center",
    });
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-[#180f3ac5] to-[#d6982385] backdrop-blur dark:bg-gray-900'>
      <div className="w-full h-full md:w-[75%] sm:w-[95%] sm:h-[75%] shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800">
        {/* Logo Section */}
        <div className="w-full flex justify-center h-[35%]">
          <Icon src='/images/etnet.png' imgClassName='h-full w-full object-contain' className='max-w-[400px] md:w-[40%] md:h-full sm:w-[60%] w-full h-full'/>
        </div>

        {/* Form Section */}
        <div className="h-[65%] flex justify-center items-center p-4">
          <Form input={newUser} setInput={setNewUser} errors={errors} setErrors={setErrors} className='space-y-8 w-full max-w-[650px]' onSubmit={submitNewUser}>
            <div>
              <input
                type="email"
                name="email"
                className="bg-white dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#357bf2] focus:border-[#357bf2] block w-full p-2.5 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter your email"
                value={newUser.email}
                onChange={(e) => handleChange(e)}
                required
              />
              {(errors.email || errors.errors?.email) && 
                <p className="text-red-500 my-1 py-1 text-center">
                  { displayErrors(errors, 'email') || displayErrors(errors, 'message') }
                </p>
              }
            </div>

            <div>
              <div className="flex items-center pr-4 bg-white dark:bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#357bf2] focus:border-[#357bf2] w-full">
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="password"
                  className="bg-white dark:bg-gray-700 border-transparent focus:outline-none text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Enter your password"
                  value={newUser.password}
                  onChange={(e) => handleChange(e)}
                  required
                />
                <Icon
                  src={showPasswords ? 'eyeOpen' : 'eyeClose'}
                  className='w-[30px] h-[30px] mr-4 cursor-pointer text-[#f99526]'
                  onClick={() => setShowPasswords(!showPasswords)}
                />
              </div>
              {(errors.password || errors.errors?.password) && 
                <p className="text-red-500 my-1 py-1 text-center">
                  { displayErrors(errors, 'password') }
                </p>
              }
            </div>

            <button
              type="submit"
              className="w-full text-white font-semibold bg-[#357bf2] hover:bg-gradient-to-r hover:from-[#357bf2] hover:to-[#29cc97] focus:ring-4 focus:outline-none focus:ring-[#357bf2] rounded-lg text-sm px-5 py-2.5 dark:focus:ring-blue-800 flex justify-center items-center transition-all duration-500"
            >
              {!loading ? 'Submit' : <TailSpin visible={loading} height="30" width="30" color="#29cc97" />}
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
