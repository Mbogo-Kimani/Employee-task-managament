@extends('layout')
@section('main')
<div class="page-title parallax parallax1 position-relative clearfix">
    <div class="section-overlay"></div>
    <div class="container">
        <div class="breadcrumbs position-relative">
            <div class="breadcrumbs-wrap">
                <h1 class="title">About Us</h1>
                <ul class="breadcrumbs-inner">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="#" class="active">About Us</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<!-- page-title -->

<div class="flat-it-services-banking flat-it-services-style5">
    <div class="container">
        <div class="row">
            <div class="col-lg-7 col-12">
                <div class="image-about"><img src="{{asset('images/home1/01.png')}}" alt="images"></div>
                <div class="image-box d-lg-flex">
                </div>
            </div>
            <div class="col-lg-5 col-12">
                <div class="flat-spacer" data-desktop="0" data-sdesktop="0" data-mobi="50" data-smobi="50"></div>
                <div class="text-content">
                    <div class="it-services-banking">
                        <h3 class="title title-big">Etnet's<span class="cl-title">History</span></h3>

                        <p>Established in 2023, ET~NET swiftly emerged as a beacon of reliability and innovation in the tech landscape.
                            Specializing in ISP services, CCTV installation, and smart home systems, 
                            we've redefined the standards of connectivity, security, and automation for both residential and commercial clients</p>
                            <p>
                                At ET~NET, our success is built on a foundation of exceptional service. With thousands of completed projects 
                                and a growing legion of satisfied clients, we've earned our reputation as the go-to solution for all your technology needs.
                                From lightning-fast internet speeds to state-of-the-art security solutions and intelligent home automation, 
                                we're committed to delivering seamless experiences that exceed expectations.
                            </p>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- Team start -->

<div class="title-section text-center py-4">
    <h2 class="flat-title">Our Team</h2>
</div>

<div class="flat-it-services flat-it-services-style4 py-4">
    <div class="container">
        <div class="row g-4">
            <!-- Team Member 1 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="service-image-box2 hv-background-before p-3 text-center shadow-sm">
                    <div class="featured-post mb-3"    style="height: 50vh; width:50vh;">
                        <img src="{{asset('images/team-member/JN.png')}}" alt="Chief Finance Officer" class="img-fluid rounded-circle"  
                        
                        
                        style="
                        height:100%; width:100%;">
                    </div>
                    <div class="content-service">
                        <h3 class="title">
                            <a href="#" class="text-dark text-decoration-none">Chief Finance Officer</a>
                        </h3>
                        <p class="mb-0">
                            <a href="#" class="text-muted">Joan Njumbi</a>
                        </p>
                    </div>
                </div>
            </div>

            

            <!-- Team Member 2 -->
            <div class="col-lg-4 col-md-6 col-sm-12">
                <div class="service-image-box2 hv-background-before p-3 text-center shadow-sm">
                    <div class="featured-post mb-3"   style="height:50vh; width:50vh;">
                        <img src="{{asset('images/team-member/BN.jpg')}}" alt="Marketing Manager" class="img-fluid rounded-circle" style="height: 100%; width:100%;">
                    </div>
                    <div class="content-service">
                        <h3 class="title">
                            <a href="#" class="text-dark text-decoration-none">Marketing Manager</a>
                        </h3>
                        <p class="mb-0">
                            <a href="#" class="text-muted">Benson</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>







<!-- Team end -->

<section class="fact-type2">
    <div class="container d-flex justify-content-lg-between justify-content-center flex-lg-nowrap flex-wrap">
        <div class="counter counter-type2">
            <div class="content-counter hv-background-before">
                <div class="icon-count"><span class="icon-team"></span></div>
                <div class="numb-count-wrap">
                    <span class="numb-count" data-from="0" data-to="2500" data-speed="2000"
                          data-inviewport="yes">2000</span>
                    <span class="numb-plus">+</span>
                </div>
                <div class="name-count">Clients</div>
            </div>
        </div>
        <div class="counter counter-type2">
            <div class="content-counter hv-background-before">
                <div class="icon-count"><span class="icon-portfolio"></span></div>
                <div class="numb-count-wrap">
                    <span class="numb-count" data-from="0" data-to="300" data-speed="2500"
                          data-inviewport="yes">300</span>
                          <span class="numb-plus">+</span>
                </div>

                <div class="name-count">Finished projects</div>
            </div>
        </div>
        <div class="counter counter-type2">
            <div class="content-counter hv-background-before">
                <div class="icon-count"><span class="icon-observation"></span></div>
                <div class="numb-count-wrap">
                    <span class="numb-count" data-from="0" data-to="100" data-speed="2000"
                          data-inviewport="yes">100</span>
                          <span class="numb-plus">+</span>
                          <div class="name-count">Experts</div>
                </div>
        </div>
    </div>
</section>

<!-- fact -->

<!--    slider-->
<slider>
    <div class="row">
        <section class="cta-type2 parallax parallax3">
            <div class="section-overlay"></div>
            <div class="container position-relative text-center">
                <div class="cta-content position-relative">
                    <div class="icon"><span class="icon-support"></span></div>
                    <div class="f-text text-white">
                        <p style="font-size:1.5rem">Reliability is the bedrock of our ISP's dedication to data integrity. 
                        Our steadfast systems maintain uninterrupted access control, 
                        ensuring consistent protection for client data with minimal downtime or interruptions.
                        </p>
                    </div>
                    <div class="s-text text-white" style="font-size:2.5rem;">Elevate Your Network with our Team</div>
                    <div class="flat-contact-now btn-linear hv-linear-gradient">
                        <a href="{{url('about-us')}}" class="font-style linear-color border-corner" 
                    
                    style="height: 2.5rem; width:10rem; padding:0.2rem 0.5rem;"
                    
                    
                        > Our Team
                    </div>
                </div>
                <div class="circle-border circle-border1 none-767"></div>
                <div class="circle-border circle-border2 none-767"></div>
                <div class="circle-border circle-border3 none-767"></div>
            </div>
        </section>

    </div>
</slider>






<style>




</style>




@endsection
