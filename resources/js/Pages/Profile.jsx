import React, {useState,useEffect,useContext} from 'react'
import requestHandler from "../services/requestHandler";
import SideNav from "../Layouts/SideNav";
import { toast } from 'react-toastify';
import {AppContext} from '../appContext'


const Profile = () => {
    const {userData, updateUser} = useContext(AppContext)
    const [userDetails, setUserDetails] = useState({
      name: userData?.name,
      email: userData?.email,
    })
    const [response, setResponse] = useState();
    const [errors, setErrors] = useState()

    useEffect(() => {
        checkResponse();
    }, [response]);

    function checkResponse() {
        if (response && response.message) {
            updateUser(userDetails)
            toast.success(response.message,{
                position: "top-center"
            });
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();     
      requestHandler.put('/api/user',userDetails, setResponse, setErrors )
    };

    const handleUpdate = (e) => {
      setUserDetails({...userDetails, [e.target.name]: e.target.value})
    }
  
    return (
    <SideNav>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">Name</label>
            <input
              type="text"
              id="name"
              name='name'
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={userDetails.name}
              onChange={(e) => handleUpdate(e)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              name='email'
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={userDetails.email}
              onChange={(e) => handleUpdate(e)}
              required
            />
          </div>
          <div className="mb-4">
            <div className='mb-4'>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                <input
                type="password"
                id="password"
                name='password'
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                value={userDetails.password}
                placeholder="*********"
                onChange={(e) => handleUpdate(e)}
                // required
                />
            </div>
            <div>
                <label htmlFor="confrm-password" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                <input
                type="password"
                id="confirm-password"
                name='password_confirmation'
                placeholder="*********"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                value={userDetails.password_confirmation}
                onChange={(e) => handleUpdate(e)}
                // required
                />
            </div>
            {
                      
                      <p className="text-red-500 my-1 py-1">
                        {/* { errors} */}
                      </p>
             }  
            
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
      </SideNav>
    );
}

export default Profile