import React, { useEffect, useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import SelectComp from '../../Components/Common/SelectComp';

import requestHandler from '../../services/requestHandler';
import { loaderSetter } from '../../Components/Common/Loader';
import { toast } from 'react-toastify';
import { router } from '@inertiajs/react';

const packageOptions = [
  { id: 1, name: 'Basic', description: 'Basic package' },
  { id: 2, name: 'Standard', description: 'Standard package' },
  { id: 3, name: 'Premium', description: 'Premium package' }
];

const AddClient = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    street_package_id: ''
  });
  const [streetPackages, setStreetPackages] = useState();
  const [response,setResponse] = useState();
  const [errors,setErrors] = useState();

  useEffect(() => {
    requestHandler.get('/api/street_packages', setStreetPackages);
  },[])
  useEffect(() => {
    if(response && response.success){
      toast.success('Client added successfully');
      router.visit('/hotspot/clients')
    }else if(response?.message){
      toast.error('An error occurred')
    }
  },[response])
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePackageChange = (e) => {
    setFormData({
      ...formData,
      street_package_id: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !formData.phone_number) {
      alert("Username and Phone Number are required.");
      return;
    }
    
    console.log("Submitted Data: ", formData);

    requestHandler.post('/api/hotspot/client', formData, setResponse, setErrors, loaderSetter);
  };

  // Adjusted styling in JSX form (AddClient)
  return (
    <HotspotLayout>
<h2 className="text-center text-xl font-bold mt-12 mb-8 text-gray-800">Add a New Client</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg hover:shadow-2xl transition-shadow">
        {/* Username (*) */}
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Username </label>
          <input
            type="name"
            name="name"
            placeholder="Enter Client's User Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-blue-500 focus:bg-gray-200"
          />
        </div>

        {/* Email (optional) */}
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Email </label>
          
          <input
            type="email"
            name="email"
            placeholder="Enter Client's Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-blue-500 focus:bg-gray-200"
          />
        </div>

        {/* Phone Number (required) */}
        <div className="form-group phone-group">
          <label className="block text-gray-700 mb-2">Phone Number </label>
          <div className="phone-wrapper">
            {/* Static Country Code Input */}
            <input
              type="text"
              value="+254"
              disabled
              className="w-16 px-2 mr-2 py-2 border border-gray-300 rounded-lg bg-gray-200 text-center"
            />
            <input
              type="tel"
              name="phone_number"
              placeholder="Enter Client's Phone Number"
              value={formData.phone_number}
              onChange={handleChange}
              required
              className="flex-grow px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-blue-500 focus:bg-gray-200"
            />
          </div>
        </div>

        {/* Package using SelectComp */}
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Package</label>
          <SelectComp
            name="package"
            id="package"
            className="focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            value={formData.street_package_id}
            onChange={handlePackageChange}
          >
            <option value="">Select Package</option>
            {streetPackages?.map((pkg) => (
              <option key={pkg.id} value={pkg.id} title={pkg.description}>
                {pkg.name}
              </option>
            ))}
          </SelectComp> 
        </div>

        {/* Submit button */}
    <button type="submit" className=" w-36 ml-60 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-2 rounded-lg  transition-colors">Add Client</button>
      </form>
    </HotspotLayout>
  );
};

export default AddClient;
