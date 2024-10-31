import React, { useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import SelectComp from '../../Components/Common/SelectComp';


// Dummy package data
const packageOptions = [
  { id: 1, name: 'Basic', description: 'Basic package' },
  { id: 2, name: 'Standard', description: 'Standard package' },
  { id: 3, name: 'Premium', description: 'Premium package' }
];

const AddClient = () => {
  // State to manage form input values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    package: ''
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle package selection using SelectComp
  const handlePackageChange = (e) => {
    setFormData({
      ...formData,
      package: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.username || !formData.phoneNumber) {
      alert("Username and Phone Number are required.");
      return;
    }

    // add logic to submit the form data (e.g., API call)
    console.log("Submitted Data: ", formData);
  };

  return (
    <HotspotLayout>
<h2 className="text-center text-xl font-bold mt-12 mb-8 text-gray-800">Add a New Client</h2>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg hover:shadow-2xl transition-shadow">
        {/* Username (*) */}
        <div className="form-group">
          <label className="block text-gray-700 mb-2">Username </label>
          <input
            type="name"
            name="username"
            placeholder="Enter Client's User Name"
            value={formData.username}
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
            {/* Editable Phone Number Input */}
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter Client's Phone Number"
              value={formData.phoneNumber}
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
            className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:border-blue-500"
            value={formData.package}
            onChange={handlePackageChange}
          >
            <option value="">Select Package</option>
            {packageOptions.map((pkg) => (
              <option key={pkg.id} value={pkg.name} title={pkg.description}>
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
