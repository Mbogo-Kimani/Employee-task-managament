import React, { useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';


const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    packageName: '',
    duration: '',
    devices: '',
    cost: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!packageData.packageName || !packageData.cost) {
      alert('Package Name and Cost are required.');
      return;
    }

    // Submit the form data 
    console.log('Package Data Submitted:', packageData);
  };

  // Convert duration to seconds
  const totalSeconds =
  (parseInt(packageData.hours) || 0) * 3600 +
  (parseInt(packageData.minutes) || 0) * 60 +
  (parseInt(packageData.seconds) || 0);

// Submit the form data with converted duration
const submissionData = {
  ...packageData,
  duration: totalSeconds,
};

console.log('Package Data Submitted:', submissionData);


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
            name="packageName"
            placeholder="Enter Package Name"
            value={packageData.packageName}
            onChange={handleChange}
            required
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
              value={packageData.hours}
              onChange={handleChange}
            />
            <input
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="number"
              name="minutes"
              placeholder="Minutes"
              value={packageData.minutes}
              onChange={handleChange}
            />
            <input
              className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              type="number"
              name="seconds"
              placeholder="Seconds"
              value={packageData.seconds}
              onChange={handleChange}
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
          />
        </div>

        {/* Cost */}
        <div className="form-group">
          <label className="block text-gray-700 text-sm font-medium mb-2">Cost</label>
          <input
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            type="number"
            name="cost"
            placeholder="Enter Package Cost"
            value={packageData.cost}
            onChange={handleChange}
            required
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
