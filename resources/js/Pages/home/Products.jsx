import React, { useEffect, useState, useContext } from 'react';
import '../../../css/Pages/home/Products.css';
import GuestLayout from '../../Layouts/GuestLayout';
import Service from '../../Components/Products/Service';
import requestHandler from '../../services/requestHandler';
import { AppContext } from '../../appContext';


function Products() {
  const [packageType, setPackageType] = useState('street');
  const [streetPackages, setStreetPackages] = useState([]);
  const { clientData,updateClient } = useContext(AppContext);

  useEffect(() => {
    getStreetPackages();
  },[]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ip = urlParams.get('ip');
    const mac = urlParams.get('mac');

    if(ip && mac){
      updateClient({ip:ip, mac:mac})
      console.log(clientData)
    }

  },[])

  function getStreetPackages() {
    requestHandler.get('/api/street_packages', setStreetPackages);
  }

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
        <h2 className='text-[2.5rem] font-bold text-center my-5'> Wired & Wireless Network</h2>
        <div className='font-bold flex items-center border rounded-full text-[1.5rem]'>
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
        <div className='flex flex-wrap '>
          {streetPackages.map((streetPackage, index) => (
              <div key={index} className='mx-auto w-fit md:w-1/3'>
                  <Service streetPackage={streetPackage} client={clientData}/>
              </div>
          ))}
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
                        <div className="service-image-box2 hv-background-before w-full md:w-[30%] h-[550px]">
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
                        <div className="service-image-box2 hv-background-before w-full md:w-[30%] h-[550px]">
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
                        <div className="service-image-box2 hv-background-before w-full md:w-[30%] h-[550px]">
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
