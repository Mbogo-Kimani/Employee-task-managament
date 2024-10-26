import React, { useEffect, useState } from 'react';
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';
import '../../../css/Pages/home/AddPackage.css';
import { toast } from 'react-toastify';

const AddPackage = () => {
  const [packageData, setPackageData] = useState({
    packageName: '',
    duration: '',
    devices: '',
    cost: '',
    description: ''
  });
  const [response, setResponse] = useState();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData({
      ...packageData,
      [name]: value
    });
  };

  useEffect(() => {
    if(response && response.success){
      toast.success(response.message);
    }
  },[response]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!packageData.packageName || !packageData.cost) {
      toast.error('Package Name and Cost are required.');
      return;
    }

    // Submit the form data (e.g., API call)
    console.log('Package Data Submitted:', packageData);
    requestHandler.post('/api/hotspot/package',packageData,setResponse);
  };

  return (
    <HotspotLayout>
      <h2 className="title1">Add a New Package</h2>
      <form onSubmit={handleSubmit} className="form1">
        {/* Package Name */}
        <div className="form-group">
          <label> Name </label>
          <input
            className="details"
            type="text"
            name="packageName"
            placeholder="Enter Package Name"
            value={packageData.packageName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Duration */}
        <div className="form-group">
          <label>Duration </label>
          <input
            className="details"
            type="number"
            name="duration"
            placeholder="Enter Duration"
            value={packageData.duration}
            onChange={handleChange}
          />
        </div>

        {/* Devices */}
        <div className="form-group">
          <label>Number of Devices </label>
          <input
            className="details"
            type="number"
            name="devices"
            placeholder="Enter Number of Devices"
            value={packageData.devices}
            onChange={handleChange}
          />
        </div>

        {/* Cost */}
        <div className="form-group">
          <label>Cost</label>
          <input
            className="details"
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
          <label> Description </label>
          <textarea
            className="details"
            name="description"
            placeholder="Enter Package Description"
            value={packageData.description}
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="add-package">Add Package</button>
      </form>
    </HotspotLayout>
  );
};

export default AddPackage;
