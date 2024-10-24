import React from 'react'
import HotspotLayout from '../../Components/Hotspot/HotspotLayout';

const AddClient = () => {
  return (
    <HotspotLayout>
      <h2>Add New Client</h2>
      <form onSubmit={handleSubmit}>
        {/* Username (required) */}
        <div>
          <label>Username (required)</label>
          <input 
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label>Email (optional)</label>
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* Phone Number (required) */}
        <div>
          <label>Phone Number (required)</label>
          <input 
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        {/* Package */}
        <div>
          <label>Package</label>
          <input 
            type="text"
            name="package"
            value={formData.package}
            onChange={handleChange}
          />
        </div>

        {/* Submit button */}
        <button type="submit">Add Client</button>
      </form>

    </HotspotLayout>

  )
}

export default AddClient