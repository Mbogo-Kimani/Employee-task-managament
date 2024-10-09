@extends('layout')
@section('main')

<!-- header -->
<div class="page-title parallax parallax1 position-relative clearfix">
    <div class="section-overlay"></div>
    <div class="container">
        <div class="breadcrumbs position-relative">
            <div class="breadcrumbs-wrap">
                <h1 class="title">Our Solutions</h1>
                <ul class="breadcrumbs-inner">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="#products.html">Packages & Services</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<div  class="wired">
   <h2> Wired & Wireless Network</h2>
</div>

<!-- page-title -->

<div class="flat-it-services flat-it-services-style4">
    <div class="container">
        <div class="row">
            <!-- BASIC PACKAGE -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card service-image-box2 hv-background-before">
                    <img src="{{asset('images/basic.jpg')}}" alt="basic Package" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-center"><strong>ETNET</strong></h5>
                        <p class="card-text">BASIC Package</p>
                    </div>
                </div>
            </div>

            <!-- WIFIT PACKAGE -->
        
            <div class="col-lg-4 col-md-6 col-12">
                <div class="card service-image-box2 hv-background-before">
                    <img src="{{asset('images/swift.jpg')}}" alt="swift Package" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-center"><strong>ETNET</strong></h5>
                        <p class="card-text">SWIFT Package.</p>
                    </div>
                </div>
            </div>

            <!-- velocity Package -->

            <div class="col-lg-4 col-md-6 col-12">
                <div class="card service-image-box2 hv-background-before">
                    <img src="{{asset('images/velocity.jpg')}}" alt="velocity Package" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-center"><strong>ETNET</strong></h5>
                        <p class="card-text">Velocity Package</p>
                    </div>
                </div>
            </div>

            <!-- Turbo Package -->

            <div class="col-lg-4 col-md-6 col-12 mt-5">
                <div class="card service-image-box2 hv-background-before">
                    <img src="{{asset('images/turbo.jpg')}}" alt="turbo Package" class="card-img-top">
                    <div class="card-body">
                        <h5 class="title text-center"><strong>ETNET</strong></h5>
                        <p class="card-text">Turbo Package</p>
                    </div>
                </div>
            </div>

            <!-- Mega Package-->
            
            <div class="col-lg-4 col-md-6 col-12 mt-5">
                <div class="card service-image-box2 hv-background-before">
                    <img src="{{asset('images/mega.png')}}" alt="mega" class="card-img-top">
                    <div class="card-body">
                        <h5 class="title text-center"><strong>ETNET</strong></h5>
                        <p class="card-text text-capitalize">Mega Max</p>
                    </div>
                </div>
            </div>


            <!-- ENTERPRISE -->
            <div class="col-lg-4 col-md-6 col-12 mt-5">
                <div class="card service-image-box2 hv-background-before">
                    <img src="{{asset('images/ent.jpg')}}" alt="ent" class="card-img-top">
                    <div class="card-body">
                        <h5 class="title text-center"><strong>ETNET</strong></h5>
                        <p class="text-capitalize card-text">CUSTOMIZED ENTERPRISE PACKAGES</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>;

{{-- <div class="bill">
<h2> Mpesa:paybill:412 00 93 <br> A/C: House Number</br></h2>
</div> --}}
<div class="container mt-5">
    <div class="card text-center">
        <div class="card-header bg-primary text-white">
            <h2 class="mb-0">Billing Information</h2>
        </div>
        <div class="card-body">
            <h4 class="card-title">Mpesa: paybill: <span class="font-weight-bold">412 00 93</span></h4>
            <p class="card-text">A/C: <span class="font-weight-bold">House Number</span></p>
        </div>
        <div class="card-footer text-muted">
            Please ensure to include your account number with the payment.
        </div>
    </div>
</div>


<div class="title-section text-center">
    <h2 class="flat-title">Our Services</h2>
</div>

<!-- services start -->

<div class="flat-it-services flat-it-services-style4">
    <div class="container">
        <div class="row">
            <div class="col-lg-4 col-md-6 col-12">
                <div class="service-image-box2 hv-background-before">
                    <div class="order-number"></div>
                    <div class="featured-post">
                        <div class="entry-image">
                            <img src="images/services/eis.jpg" alt="images">
                        </div>
                    </div>
                    <div class="content-service">
                        <h3 class="title"><a href="#">Internet </br>Installation</br></a></h3>
                        <span>
                                <p>Discover the pinnacle of internet excellence with our installation. Unrivaled speed, reliability, and seamless connectivity redefine your online experience.
                                <br/><p>Escape the frustrations of buffering and lag,embrace superior performance. Elevate your internet journey with us today.</p>
                            </ul>
                              </span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-12">
                <div class="service-image-box2 hv-background-before">
                    <div class="order-number"></div>
                    <div class="featured-post">
                        <div class="entry-image">
                            <img src="images/services/supp.jpg" alt="images">
                        </div>
                    </div>
                    <div class="content-service">
                        <h3 class="title"><a href="#">CCTV</br>Installation </br></a></h3>
                        <span>
                                <ul>
                                <p>Transform your security with our advanced CCTV installation service. Our cutting-edge technology ensures comprehensive coverage,</p>
                               <br/> <p>crystal-clear images, and 24/7 monitoring for peace of mind. From homes to businesses, safeguard what matters most with our trusted expertise. Enhance your security strategy install with confidence today.</p>
                                </li>
                              </ul>
                            </span>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-6 col-12">
                <div class="service-image-box2 hv-background-before">
                    <div class="order-number"></div>
                    <div class="featured-post">
                        <div class="entry-image">
                            <img src="images/services/BPA.jpg" alt="images">
                        </div>
                    </div>
                    <div class="content-service">
                        <h3 class="title"><a href="#">SmartHome</br>Systems</br></a></h3>
                        <span>
                                <ul>
                                  <p>Upgrade to the future with our smart home system. Control everything from lights to security with ease.</p><br/>
                                  <p>Experience the ultimate in comfort and security. Elevate your lifestyle today."</p><br/>
                                   <p></p>
                                </ul>
                              </span>
                   </div>
                </div>
            </div>

        </div>
    </div>
</div>

<!-- services end -->

<slider>
    <div class="row">
        <section class="cta-type2 parallax parallax3">
            <div class="section-overlay"></div>
            <div class="container position-relative text-center">
                <div class="cta-content position-relative">
                    <div class="icon"><span class="icon-support"></span></div>
                    <div class="f-text text-white">Reliability is the bedrock of our ISP's dedication to data integrity. 
                        Our steadfast systems maintain uninterrupted access control, 
                        ensuring consistent protection for client data with minimal downtime or interruptions.
                    </div>
                    <div class="s-text text-white">Elevate Your Network with our Team</div>
                    <div class="flat-contact-now btn-linear hv-linear-gradient">
                        <a href="{{url('about-us')}}" class="font-style linear-color border-corner">Team<span
                                class="icon-arrow-pointing-to-right"></span></a>
                    </div>
                </div>
                <div class="circle-border circle-border1 none-767"></div>
                <div class="circle-border circle-border2 none-767"></div>
                <div class="circle-border circle-border3 none-767"></div>
            </div>
        </section>
    </div>
</slider>

@endsection


