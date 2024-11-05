import React, { useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';

const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    packageName: '',
    hours: '',
    minutes: '',
    seconds: '',
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

   

    // Convert duration to seconds
    const totalSeconds =
      (parseInt(packageData.hours) || 0) * 3600 +
      (parseInt(packageData.minutes) || 0) * 60 +
      (parseInt(packageData.seconds) || 0);

    const submissionData = {
      ...packageData,
      duration: totalSeconds,
    };

    console.log('Package Data Submitted:', submissionData);
  };

  // Adjusted styling (AddPackage)

  return (
    <HotspotLayout>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 mb-14 mt-4 sm:p-8 max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-sm hover:shadow-slate-950 h-fit">
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-6 sm:mb-10 text-gray-800">Add a New Package</h2>
        
        {/* Package Name */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-1">Package Name</label>
          <input
            type="text"
            name="packageName"
            placeholder="Enter Package Name"
            value={packageData.packageName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Duration</label>
          <div className="flex gap-2">
            <input
              type="number"
              name="hours"
              placeholder="Hours"
              value={packageData.hours}
              onChange={handleChange}
              className="w-1/3 px-2 py-1  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="number"
              name="minutes"
              placeholder="Minutes"
              value={packageData.minutes}
              onChange={handleChange}
              className="w-1/3 px-4 py-2  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <input
              type="number"
              name="seconds"
              placeholder="Seconds"
              value={packageData.seconds}
              onChange={handleChange}
              className="w-1/3 px-4 py-2  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Devices */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Number of Devices</label>
          <input
            type="number"
            name="devices"
            placeholder="Enter Number of Devices"
            value={packageData.devices}
            onChange={handleChange}
            className="w-full px-4 py-2  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Cost */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Cost</label>
          <input
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
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Enter Package Description"
            value={packageData.description}
            onChange={handleChange}
            className="w-full px-4 py-2  bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-2/4 ml-36  bg-blue-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Package
        </button>
      </form>
    </HotspotLayout>
  );
};

export default AddPackage;
