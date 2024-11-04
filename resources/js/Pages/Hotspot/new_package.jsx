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
  

  useEffect(() => {
    if(response && response.success){
      toast.success(response.message);
      router.visit('/hotspot/packages')
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
    (parseInt(packageData.hours) || 0) * 3600 +
    (parseInt(packageData.minutes) || 0) * 60 +
    (parseInt(packageData.seconds) || 0);

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
            name="name"
            placeholder="Enter Package Name"
            value={packageData.packageName}
            onChange={handleChange}
            required
          />
        </div>

       {/* Duration */}
       <div className="form-group">
          <label>Duration</label>
          <div className="duration-group">
            <input
              className="details"
              type="number"
              name="hours"
              placeholder="Hours"
              value={packageData.hours}
              onChange={handleChange}
            />
            <input
              className="details"
              type="number"
              name="minutes"
              placeholder="Minutes"
              value={packageData.minutes}
              onChange={handleChange}
            />
            <input
              className="details"
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
