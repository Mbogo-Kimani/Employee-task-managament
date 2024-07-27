import React, { useState } from 'react';
import '../../../css/Pages/home/Products.css';
import GuestLayout from '../../Layouts/GuestLayout';

function Products() {
  const [packageType, setPackageType] = useState('street');
  const [streetPackages, setSreetPackages] = useState(
  [
    {
      "id": 1,
      "name": "Kumi Konnect",
      "description": "40-Minute Unlimited Access",
      "durationInSeconds": "2400",
      "cost": 10,
      "noOfUsers": 1,
    },
    {
      "id": 2,
      "name": "Mbao Konnect",
      "description": "2-Hour Unlimited Access",
      "durationInSeconds": "7200",
      "cost": 20,
      "noOfUsers": 1,
    },
    {
      "id": 3,
      "name": "8-Hour Konnect",
      "description": "8-Hour Unlimited Access",
      "durationInSeconds": "28800",
      "cost": 50,
      "noOfUsers": 1,
    },
    {
      "id": 4,
      "name": "Daily Konnect",
      "description": "24-Hour Unlimited Access",
      "durationInSeconds": "86400",
      "cost": 80,
      "noOfUsers": 1,
    },
    {
      "id": 5,
      "name": "Daily Konnect x2",
      "description": "24-Hour Unlimited Access, 2 Devices",
      "durationInSeconds": "86400",
      "cost": 140,
      "noOfUsers": 2,
    },
    {
      "id": 6,
      "name": "Weekly Konnect",
      "description": "7-Day Unlimited Access, 2 Devices",
      "durationInSeconds": "604800",
      "cost": 380,
      "noOfUsers": 2,
    },
    {
      "id": 7,
      "name": "Monthly Konnect",
      "description": "30-Day Unlimited Access, 2 Devices",
      "durationInSeconds": "2592000",
      "cost": 1000,
      "noOfUsers": 2,
    },
    {
      "id": 8,
      "name": "Family Konnect x3",
      "description": "30-Day Unlimited Access, 3 Devices",
      "durationInSeconds": "2592000",
      "cost": 1300,
      "noOfUsers": 3,
    },
    {
      "id": 9,
      "name": "Family Konnect x4",
      "description": "30-Day Unlimited Access, 4 Devices",
      "durationInSeconds": "2592000",
      "cost": 1600,
      "noOfUsers": 4,
    },
    {
      "id": 10,
      "name": "Family Konnect x5",
      "description": "30-Day Unlimited Access, 5 Devices",
      "durationInSeconds": "2592000",
      "cost": 1800,
      "noOfUsers": 5,
    },
    {
      "id": 11,
      "name": "Family Konnect x6",
      "description": "30-Day Unlimited Access, 6 Devices",
      "durationInSeconds": "2592000",
      "cost": 2000,
      "noOfUsers": 6,
    },
    {
      "id": 12,
      "name": "Family Konnect x3 (Quarterly)",
      "description": "90-Day Unlimited Access, 3 Devices",
      "durationInSeconds": "7776000",
      "cost": 3500,
      "noOfUsers": 3,
    },
    {
      "id": 13,
      "name": "Family Konnect x4 (Quarterly)",
      "description": "90-Day Unlimited Access, 4 Devices",
      "durationInSeconds": "7776000",
      "cost": 4200,
      "noOfUsers": 4,
    },
    {
      "id": 14,
      "name": "Family Konnect x5 (Quarterly)",
      "description": "90-Day Unlimited Access, 5 Devices",
      "durationInSeconds": "7776000",
      "cost": 4800,
      "noOfUsers": 5,
    },
    {
      "id": 15,
      "name": "Family Konnect x6 (Quarterly)",
      "description": "90-Day Unlimited Access, 6 Devices",
      "durationInSeconds": "7776000",
      "cost": 5300,
      "noOfUsers": 6,
    }
  ]);

  function handlePackagesChange (val) {
    if (packageType !== val) setPackageType(val);
  }
  return (
    <GuestLayout>

      <div className="page-title parallax parallax1 position-relative clearfix" style={{backgroundPosition: "50% -1px"}}>
        <div className="section-overlay"></div>
          <div className="container">
            <div className="breadcrumbs position-relative">
              <div className="breadcrumbs-wrap">
                <h1 className="title">Our Solutions</h1>
                <ul className="breadcrumbs-inner flex justify-center">
                  <li className='mx-3'><a href="index.html">Home</a> </li>
                  <li className='mx-3'><a href="#products.html">Packages &amp; Services</a></li>
                </ul>
              </div>
            </div>
          </div>
      </div>

      <div  className="flex flex-col justify-center items-center my-8">
        <h2 className='text-[40px] font-bold text-center my-5'> Wired & Wireless Network</h2>
        <div className='font-bold flex items-center border rounded-full text-[24px]'>
          <h1
            className={`my-1 ml-1 rounded-full px-3 py-1 rounded-full ${packageType === 'home' ? 'bg-[var(--light-purple)] text-gray-100 cursor-default border' : 'cursor-pointer hover:scale-105'}`}
            onClick={() => handlePackagesChange('home')}
          >
            Home Fibre
          </h1>
          <h1
            className={`my-1 mr-1 rounded-full px-3 py-1 rounded-full ${packageType === 'street' ? 'bg-[var(--orange)] text-gray-100 cursor-default border' : 'cursor-pointer hover:scale-105'}`}
            onClick={() => handlePackagesChange('street')}
          >
            Street Fibre
          </h1>
        </div>
      </div>
        
      {
        packageType === 'home' ?
        <div className="flat-it-services flat-it-services-style4">
            <div className="container">
                <div className="flex justify-around items-center flex-wrap">

                    <div className="w-[20rem] hover:scale-105">
                        <div className="card service-image-box2 hv-background-before w-[20rem] hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500">
                            <img src="images/basic.jpg" alt="basic Package" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title text-center"><strong>ETNET</strong></h5>
                                <p className="card-text">BASIC Package</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-[20rem] hover:scale-105">
                        <div className="card service-image-box2 hv-background-before w-[20rem] hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500">
                            <img src="images/swift.jpg" alt="swift Package" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title text-center"><strong>ETNET</strong></h5>
                                <p className="card-text">SWIFT Package.</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-[20rem] hover:scale-105">
                      <div className="card service-image-box2 hv-background-before w-[20rem] hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500">
                            <img src="images/velocity.jpg" alt="velocity Package" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title text-center"><strong>ETNET</strong></h5>
                                <p className="card-text">Velocity Package</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-[20rem] hover:scale-105">
                      <div className="card service-image-box2 hv-background-before w-[20rem] hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500">
                            <img src="images/turbo2.jpg" alt="turbo Package" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="title text-center"><strong>ETNET</strong></h5>
                                <p className="card-text">Turbo Package</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-[20rem] hover:scale-105">
                      <div className="card service-image-box2 hv-background-before w-[20rem] hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500">
                            <img src="images/mega.png" alt="mega" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="title text-center"><strong>ETNET</strong></h5>
                                <p className="card-text text-capitalize">Mega Max</p>
                            </div>
                        </div>
                    </div>


                    <div className="w-[20rem] hover:scale-105">
                      <div className="card service-image-box2 hv-background-before w-[20rem] hover:bg-gradient-to-r hover:from-purple-500 hover:to-orange-500">
                            <img src="images/ent.jpg" alt="ent" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="title text-center"><strong>ETNET</strong></h5>
                                <p className="text-capitalize card-text">CUSTOMIZED ENTERPRISE PACKAGES</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className="flex justify-around items-center flex-wrap px-6">
          {
            (Array.isArray(streetPackages) ? streetPackages : []).map((item, ind) => {
              return (
                <div className='flex flex-col min-w-[380px] p-4 mx-2 my-4 justify-center items-center shadow hover:scale-105 hover:bg-gradient-to-r hover:from-indigo-700 hover:to-[var(--orange)] hover:to-[var(--light-purple)] hover:shadow-lg rounded-md' key={item.id || ind}>
                  <p className='font-bold text-[24px] py-1'>{item.name}</p>
                  <p className='font-[400] text-[18px] text-gray-400 py-1'>{item.description}</p>
                  <p className='text-[26px] font-bold text-[var(--orange)]'>KSH {item.cost}</p>

                  <button
                    className='text-[var(--light-purple)] bg-[var(--orange)] px-8 py-2 rounded-full mt-6 hover:text-gray-100 hover:scale-105 font-bold'
                  >
                    Select
                  </button>
                </div>
              )
            })
          }
        </div>
      }

      <div className="bill">
        <h2> Mpesa:paybill:412 00 93</h2> <h2>A/C: House Number</h2>
        </div>

        <div className="text-center mt-10">
            <h2 className="font-bold text-[40px]">Our Services</h2>
        </div>
          
        <div className="flat-it-services flat-it-services-style4">
            <div className="container">
                <div className="flex flex-wrap justify-between">
                        <div className="service-image-box2 hv-background-before w-[30%] h-[550px]">
                            <div className="order-number"></div>
                            <div className="featured-post">
                                <div className="flex justify-center items-center">
                                    <img src="images/services/eis.jpg" alt="images" className='w-[150px] h-[150px] rounded-full'/>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className="text-gray-800 font-bold text-[26px] mx-[5rem] my-5">
                                  <a href="#">
                                    Internet Installation
                                  </a>
                                </h3>
                                <span className='text-[15px]'>
                                  <p>Discover the pinnacle of internet excellence with our installation. Unrivaled speed, reliability, and seamless connectivity redefine your online experience.</p>
                                  <p>Escape the frustrations of buffering and lag,embrace superior performance. Elevate your internet journey with us today.</p>
                                </span>
                            </div>
                        </div>
                        <div className="service-image-box2 hv-background-before w-[30%] h-[550px]">
                            <div className="order-number"></div>
                            <div className="featured-post">
                                <div className="flex justify-center items-center">
                                    <img src="images/services/supp.jpg" alt="images" className='w-[150px] h-[150px] rounded-full'/>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className="text-gray-800 font-bold text-[26px] mx-[5rem] my-5">
                                <a href="#">
                                  CCTV Installation
                                </a>
                              </h3>
                              <span className='text-[15px]'>
                                  <p>Transform your security with our advanced CCTV installation service. Our cutting-edge technology ensures comprehensive coverage,</p>
                                  <p>crystal-clear images, and 24/7 monitoring for peace of mind. From homes to businesses, safeguard what matters most with our trusted expertise. Enhance your security strategy install with confidence today.</p>
                              </span>
                            </div>
                        </div>
                        <div className="service-image-box2 hv-background-before w-[30%] h-[550px]">
                            <div className="order-number"></div>
                            <div className="featured-post">
                                <div className="flex justify-center items-center">
                                    <img src="images/services/BPA.jpg" alt="images" className='w-[150px] h-[150px] rounded-full'/>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className="text-gray-800 font-bold text-[26px] mx-[5rem] my-5">
                                  <a href="#">
                                    SmartHome Systems
                                  </a>
                                </h3>
                                <span className='text-[15px]'>
                                    <p>Upgrade to the future with our smart home system. Control everything from lights to security with ease.</p><br/>
                                    <p>Experience the ultimate in comfort and security. Elevate your lifestyle today.</p><br/>
                                     <p></p>
                                </span>
                           </div>
                        </div>

                </div>
            </div>
        </div>
    </GuestLayout>
  )
}

export default Products;
