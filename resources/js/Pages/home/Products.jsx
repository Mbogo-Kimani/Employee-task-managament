import React from 'react';
import '../../../css/Pages/home/Products.css';
import GuestLayout from '../../Layouts/GuestLayout';

function Products() {
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

      <div  className="wired">
         <h2> Wired & Wireless Network</h2>
      </div>
        
      <div className="flat-it-services flat-it-services-style4">
          <div className="container">
              <div className="row flex">

                  <div className="col-lg-4 col-md-6 col-12 border w-[20rem]">
                      <div className="card service-image-box2 hv-background-before w-[20rem]">
                          <img src="images/basic.jpg" alt="basic Package" className="card-img-top" />
                          <div className="card-body">
                              <h5 className="card-title text-center"><strong>ETNET</strong></h5>
                              <p className="card-text">BASIC Package</p>
                          </div>
                      </div>
                  </div>


                  <div className="col-lg-4 col-md-6 col-12 border w-[20rem]">
                      <div className="card service-image-box2 hv-background-before w-[20rem]">
                          <img src="images/swift.jpg" alt="swift Package" className="card-img-top" />
                          <div className="card-body">
                              <h5 className="card-title text-center"><strong>ETNET</strong></h5>
                              <p className="card-text">SWIFT Package.</p>
                          </div>
                      </div>
                  </div>


                  <div className="col-lg-4 col-md-6 col-12 border w-[20rem]">
                    <div className="card service-image-box2 hv-background-before w-[20rem]">
                          <img src="images/velocity.jpg" alt="velocity Package" className="card-img-top" />
                          <div className="card-body">
                              <h5 className="card-title text-center"><strong>ETNET</strong></h5>
                              <p className="card-text">Velocity Package</p>
                          </div>
                      </div>
                  </div>


                  <div className="col-lg-4 col-md-6 col-12 border w-[20rem]">
                    <div className="card service-image-box2 hv-background-before w-[20rem]">
                          <img src="images/turbo2.jpg" alt="turbo Package" className="card-img-top" />
                          <div className="card-body">
                              <h5 className="title text-center"><strong>ETNET</strong></h5>
                              <p className="card-text">Turbo Package</p>
                          </div>
                      </div>
                  </div>


                  <div className="col-lg-4 col-md-6 col-12 border w-[20rem]">
                    <div className="card service-image-box2 hv-background-before w-[20rem]">
                          <img src="images/mega.png" alt="mega" className="card-img-top" />
                          <div className="card-body">
                              <h5 className="title text-center"><strong>ETNET</strong></h5>
                              <p className="card-text text-capitalize">Mega Max</p>
                          </div>
                      </div>
                  </div>


                  <div className="col-lg-4 col-md-6 col-12 border w-[20rem]">
                    <div className="card service-image-box2 hv-background-before w-[20rem]">
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

      <div className="bill">
        <h2> Mpesa:paybill:412 00 93</h2> <h2>A/C: House Number</h2>
        </div>

        <div className="title-section text-center">
            <h2 className="flat-title">Our Services</h2>
        </div>
          
        <div className="flat-it-services flat-it-services-style4">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="service-image-box2 hv-background-before">
                            <div className="order-number"></div>
                            <div className="featured-post">
                                <div className="entry-image">
                                    <img src="images/services/eis.jpg" alt="images" />
                                </div>
                            </div>
                            <div className="content-service">
                                <h3 className="title">
                                  <a href="#">
                                    Internet Installation
                                  </a>
                                </h3>
                                <span>
                                  <p>Discover the pinnacle of internet excellence with our installation. Unrivaled speed, reliability, and seamless connectivity redefine your online experience.</p>
                                  <p>Escape the frustrations of buffering and lag,embrace superior performance. Elevate your internet journey with us today.</p>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="service-image-box2 hv-background-before">
                            <div className="order-number"></div>
                            <div className="featured-post">
                                <div className="entry-image">
                                    <img src="images/services/supp.jpg" alt="images" />
                                </div>
                            </div>
                            <div className="content-service">
                              <h3 className="title">
                                <a href="#">
                                  CCTV Installation
                                </a>
                              </h3>
                              <span>
                                {/* <ul> */}
                                  <p>Transform your security with our advanced CCTV installation service. Our cutting-edge technology ensures comprehensive coverage,</p>
                                  <p>crystal-clear images, and 24/7 monitoring for peace of mind. From homes to businesses, safeguard what matters most with our trusted expertise. Enhance your security strategy install with confidence today.</p>
                                  {/* </li> */}
                                {/* </ul> */}
                              </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="service-image-box2 hv-background-before">
                            <div className="order-number"></div>
                            <div className="featured-post">
                                <div className="entry-image">
                                    <img src="images/services/BPA.jpg" alt="images" />
                                </div>
                            </div>
                            <div className="content-service">
                                <h3 className="title">
                                  <a href="#">
                                    SmartHome Systems
                                  </a>
                                </h3>
                                <span>
                                  {/* <ul> */}
                                    <p>Upgrade to the future with our smart home system. Control everything from lights to security with ease.</p><br/>
                                    <p>Experience the ultimate in comfort and security. Elevate your lifestyle today."</p><br/>
                                     <p></p>
                                  {/* </ul> */}
                                </span>
                           </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </GuestLayout>
  )
}

export default Products;
