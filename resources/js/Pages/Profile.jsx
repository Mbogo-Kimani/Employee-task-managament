import React, {useState,useEffect,useContext} from 'react'
import requestHandler from "../services/requestHandler";
import SideNav from "../Layouts/SideNav";
import {
    navItemsDeterminer,
    pageData as defaultPageData,
} from "../data/indexNav";
import { toast } from 'react-toastify';
import {AppContext} from '../appContext'


const Profile = () => {
    const [navItems, setNavItems] = useState(defaultPageData);
    const {userData} = useContext(AppContext)
    const [name, setName] = useState(userData?.name);
    const [email, setEmail] = useState(userData?.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors,setErrors] = useState();
    const [response, setResponse] = useState();


    useEffect(() => {
        checkResponse();
    }, [response]);

    function checkResponse() {
        if (response && response.message) {
            toast.success(response.message,{
                position: "top-center"
            });
            window.location.reload()
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        name,
        email,
        password: password.length  ? password : undefined,
        password_confirmation: confirmPassword
      }

      requestHandler.put('/api/user',data, setResponse, setErrors )
    };
  
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <div className='mb-4'>
                <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
                <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                value={password}
                placeholder="*********"
                onChange={(e) => setPassword(e.target.value)}
                // required
                />
            </div>
            <div>
                <label htmlFor="confrm-password" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
                <input
                type="password"
                id="confirm-password"
                placeholder="*********"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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