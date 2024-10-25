import React, { useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import SelectComp from '../../Components/Common/SelectComp';
import '../../../css/Pages/AddClient.css';

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
      <h2 className="title">Add a New Client</h2>
      <form onSubmit={handleSubmit}>
        {/* Username (*) */}
        <div className="form-group">
          <label>Username </label>
          <input className="details"
            type="name"
            name="username"
            placeholder="Enter Client's User Name"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email (optional) */}
        <div className="form-group">
          <label>Email </label>
          <input  className="details"
            type="email"
            name="email"
            placeholder="Enter Client's Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number (required) */}
        <div className="form-group">
          <label>Phone Number </label>
          <input  className="details"
            type="tel"
            name="phoneNumber"
            placeholder="Enter Client's Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Package using SelectComp */}
        <div className="form-group">
          <label>Package</label>
          <SelectComp
            name="package"
            id="package"
            className="focus:outline-none border-hidden border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
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
        <button type="submit" className="add-client">Add Client</button>
      </form>
    </HotspotLayout>
  );
};

export default AddClient;
