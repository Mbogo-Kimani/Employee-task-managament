import React, { useEffect, useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import '../../../css/Pages/home/AddPackage.css';
import { toast } from 'react-toastify';
import requestHandler from '../../services/requestHandler';
import { router } from '@inertiajs/react';

const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    name: '',
    duration: '',
    devices: '',
    cost: '',
    description: ''
  });
  const [response, setResponse] = useState();
  const [time , setTime] = useState({
    hours: '',
    minutes: '',
    seconds: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value
    });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTime({
      ...time,
      [name]: value
    });
  }
  

  useEffect(() => {
    if(response && response.success){
      toast.success(response.message);
      router.visit('/hotspot/plans')
    }
  },[response]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!packageData.name || !packageData.cost) {
      toast.error('Package Name and Cost are required.');
      return;
    }

    // Convert duration to seconds
    const totalSeconds =
    (parseInt(time.hours) || 0) * 3600 +
    (parseInt(time.minutes) || 0) * 60 +
    (parseInt(time.seconds) || 0);

    // Submit the form data with converted duration
    setPackageData({...packageData,duration: totalSeconds})
    const data = {
      ...packageData,
      duration: totalSeconds
    }
    // Submit the form data 
    console.log('Package Data Submitted:', data);
    requestHandler.post('/api/hotspot/package',data,setResponse);
  };

  // Adjusted styling (AddPackage)

  return (
    <HotspotLayout>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New Package</h2>
      <form onSubmit={handleSubmit}  className="bg-white rounded-lg shadow-lg p-6 max-w-lg hover:shadow-2xl transition-shadow mx-auto">
        {/* Package Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2"> Name </label>
          <input
           className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="text"
            name="name"
            placeholder="Enter Package Name"
            value={packageData.packageName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

       {/* Duration */}
       <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2">Duration</label>
          <div className="flex gap-2">
            <input
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="number"
              name="hours"
              placeholder="Hours"
              value={time.hours}
              onChange={handleTimeChange}
            />
            <input
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="number"
              name="minutes"
              placeholder="Minutes"
              value={time.minutes}
              onChange={handleTimeChange}
            />
            <input
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="number"
              name="seconds"
              placeholder="Seconds"
              value={time.seconds}
              onChange={handleTimeChange}
            />
          </div>
        </div>

        {/* Devices */}
        <div className="form-group">
          <label  className="block text-gray-700 text-sm font-medium mb-2">Number of Devices </label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="number"
            name="devices"
            placeholder="Enter Number of Devices"
            value={packageData.devices}
            onChange={handleChange}
            className="w-full px-4 py-2  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Cost */}
        <div className="form-group">
          <label className="block text-gray-700 text-sm font-medium mb-2">Cost</label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="number"
            name="cost"
            placeholder="Enter Cost"
            value={packageData.cost}
            onChange={handleChange}
            required
            className="w-full px-4 py-2  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div className="form-group">
          <label className="block text-gray-700 text-sm font-medium mb-2"> Description </label>
          <textarea
            className="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            name="description"
            placeholder="Enter Package Description"
            value={packageData.description}
            onChange={handleChange}
            className="w-full px-4 py-2  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Submit button */}
      <button type="submit" className="w-36 bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 ml-80 transition duration-300"
        >Add Package</button>
      </form>
    </HotspotLayout>
  );
};

export default AddPackage;
