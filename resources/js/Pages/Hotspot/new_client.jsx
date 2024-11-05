import React, { useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import SelectComp from '../../Components/Common/SelectComp';

const packageOptions = [
  { id: 1, name: 'Basic', description: 'Basic package' },
  { id: 2, name: 'Standard', description: 'Standard package' },
  { id: 3, name: 'Premium', description: 'Premium package' }
];

const AddClient = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    package: ''
  });

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
      package: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.phoneNumber) {
      alert("Username and Phone Number are required.");
      return;
    }
    console.log("Submitted Data: ", formData);
  };

  // Adjusted styling in JSX form (AddClient)
  return (
    <HotspotLayout>
      <form onSubmit={handleSubmit} className="bg-white mt-7  rounded-lg p-6 sm:p-8 max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-sm hover:shadow-slate-950 h-fit">
        <h2 className="text-center text-xl sm:text-2xl font-bold mb-3 sm:mb-16 text-gray-800">Add a New Client</h2>
        
        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Client's User Name"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 mb-2 bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Client's Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-2 bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Phone Number</label>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value="+254"
              disabled
              className="w-16 px-3 py-2 mb-2 border border-gray-300 rounded bg-gray-200 text-center"
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Enter Client's Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className="flex-grow px-4 py-2 mb-2 bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>

        {/* Package */}
        <div className="mb-4">
          <label className="block text-gray-500 text-sm mb-2">Package</label>
          <SelectComp
            name="package"
            id="package"
            className="w-full px-4 py-2 mb-5 bg-gray-100 border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
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

        {/* Submit Button */}
        <button type="submit" className="w-2/4 mb-2 ml-36 bg-blue-600 text-white text-lg font-semibold py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Add Client
        </button>
      </form>
    </HotspotLayout>
  );
};

export default AddClient;
