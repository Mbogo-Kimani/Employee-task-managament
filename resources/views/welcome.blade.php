@extends('layout')

@section('main')
<div class="flat-slider clearfix">
    <div class="rev_slider_wrapper fullwidthbanner-container">
        <div id="rev-slider1" class="rev_slider fullwidthabanner">
            <ul>
                <li data-transition="random">

                    <!-- Main Image -->

                    <img src="images/rev-slider/1.jpg" alt="" data-bgposition="center center" data-no-retina>
                    <div class="banner-text">
                        <h5>ET~NET</h5>
                    </div>
                    
                    <!-- Layers -->

                    <div class="tp-caption tp-resizeme text-white text-one"
                         data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
                         data-y="['middle','middle','middle','middle']" data-voffset="['-162','-175','-160','-190']"
                         data-fontsize="['55','55','35','26']"
                         data-lineheight="['82','82','50','38']"
                         data-width="full"
                         data-height="none"
                         data-whitespace="normal"
                         data-transform_idle="o:1;"
                         data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                         data-transform_out="y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                         data-mask_in="x:0px;y:[100%];"
                         data-mask_out="x:inherit;y:inherit;"
                         data-start="1000"
                         data-splitin="none"
                         data-splitout="none"
                         data-responsive_offset="on"></div>

                    <div class="tp-caption tp-resizeme text-white text-two"
                         data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
                         data-y="['middle','middle','middle','middle']" data-voffset="['-38','-40','-60','-80']"
                         data-fontsize="['70','70','55','42']"
                         data-lineheight="['82','82','70','54']"
                         data-width="full"
                         data-height="none"
                         data-whitespace="normal"
                         data-transform_idle="o:1;"
                         data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                         data-transform_out="y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                         data-mask_in="x:0px;y:[100%];"
                         data-mask_out="x:inherit;y:inherit;"
                         data-start="1600"
                         data-splitin="none"
                         data-splitout="none"
                         data-responsive_offset="on"><br></div>

                    <div class="tp-caption tp-resizeme text-white btn-three"
                         data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
                         data-y="['middle','middle','middle','middle']" data-voffset="['83','80','40','40']"
                         data-fontsize="['19','19','17','16']"
                         data-lineheight="['30','30','28','28']"
                         data-width="full"
                         data-height="none"
                         data-whitespace="normal"
                         data-transform_idle="o:1;"
                         data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                         data-transform_out="y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                         data-mask_in="x:0px;y:[100%];"
                         data-mask_out="x:inherit;y:inherit;"
                         data-start="2200"
                         data-splitin="none"
                         data-splitout="none"
                         data-responsive_offset="on"></div>

                    <div class="tp-caption btn-text btn-linear hv-linear-gradient"
                         data-x="['center','center','center','center']" data-hoffset="['0','0','0','0']"
                         data-y="['middle','middle','middle','middle']" data-voffset="['155','160','120','130']"
                         data-width="full"
                         data-height="none"
                         data-whitespace="normal"
                         data-transform_idle="o:1;"
                         data-transform_in="y:[100%];z:0;rX:0deg;rY:0;rZ:0;sX:1;sY:1;skX:0;skY:0;opacity:0;s:2000;e:Power4.easeInOut;"
                         data-transform_out="y:[100%];s:1000;e:Power2.easeInOut;s:1000;e:Power2.easeInOut;"
                         data-mask_in="x:0px;y:[100%];"
                         data-mask_out="x:inherit;y:inherit;"
                         data-start="2800"
                         data-splitin="none"
                         data-splitout="none"
                         data-responsive_offset="on">
                        <a href="#" class="all-solution font-style linear-color border-corner"><span
                                class="icon-arrow-pointing-to-right"></span></a>
                        <a href="#" class="see-video"></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</div>

<section class="features flat-row pt-5 pb-5">
    <div class="container d-lg-flex justify-content-between">
        <!-- Security Feature -->
        <div class="iconbox-features hv-background-before text-center p-4 m-3" style="background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
            <div class="iconbox-icon mb-3">
                <span class="icon-shield" style="font-size: 3rem; color: #007bff;"></span>
            </div>
            <div class="iconbox-content">
                <h3 class="title mb-3" style="font-weight: 600;">Security</h3>
                <p style="color: #555;">
                    Our company ensures the security of our clients' data by implementing 
                    access controls that restrict access appropriately and grant permissions only to authorized users.
                </p>
            </div>
        </div>
        
        <!-- Efficiency Feature -->
        <div class="iconbox-features hv-background-before text-center p-4 m-3" style="background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
            <div class="iconbox-icon mb-3">
                <span class="icon-optimization" style="font-size: 3rem; color: #28a745;"></span>
            </div>
            <div class="iconbox-content">
                <h3 class="title mb-3" style="font-weight: 600;">Efficiency</h3>
                <p style="color: #555;">
                    With ETNET, efficiency drives our ISP's data integrity measures. 
                    Streamlined access protocols optimize performance while upholding security standards.
                </p>
            </div>
        </div>

        <!-- Reliability Feature -->
        <div class="iconbox-features hv-background-before text-center p-4 m-3" style="background-color: #f9f9f9; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); transition: transform 0.3s ease;">
            <div class="iconbox-icon mb-3">
                <span class="icon-alarm" style="font-size: 3rem; color: #ff6600;"></span>
            </div>
            <div class="iconbox-content">
                <h3 class="title mb-3" style="font-weight: 600;">Reliability</h3>
                <p style="color: #555;">
                    Reliability is the bedrock of our ISP's dedication to data integrity. 
                    Our systems maintain uninterrupted access control, ensuring consistent protection for client data with minimal downtime.
                </p>
            </div>
        </div>
    </div>
</section>

<!-- features -->
<section class="who-we-are who-we-are-style1 py-5">
    <div class="container">
        <div class="row d-flex align-items-center">
            <!-- Image Section -->
            <div class="col-lg-5 col-12 mb-4 mb-lg-0">
                <div class="featured-post position-relative">
                    <div class="entry-image">
                        <img src="images/home1/01.png" alt="ETNET Image" style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    </div>
                </div>
            </div>
            <!-- Content Section -->
            <div class="col-lg-7 col-12">
                <div class="flat-spacer mb-4">
                    <h2 style="font-weight: 600; margin-bottom: 20px;">Welcome to ETNET</h2>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.6;">
                        Experience the superior connectivity of ETNET, where <strong>reliability</strong> meets <strong>speed</strong>. 
                        At ETNET, we pride ourselves on delivering top-tier internet service that surpasses expectations. 
                        With our cutting-edge infrastructure and unwavering commitment to customer satisfaction, 
                        we ensure seamless browsing, streaming, and gaming experiences for all our users.
                    </p>
                    <p style="font-size: 1.1rem; color: #555; line-height: 1.6;">
                        Join ETNET today and discover the difference in internet excellence.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>


</section>


<section class="get-in-touch">
    <div class="container">
        <div class="row">
            <div class="col-lg-10 offset-lg-1">
                <div class="contact-card">
                    <div class="row g-0">
                       <!-- Contact Information -->
<div class="col-md-5">
    <div class="contact-info h-100 d-flex flex-column justify-content-between">
        <div>
            <h4>Contact Us</h4>
            <ul class="contact-details list-unstyled">
                <li><i class="fa-solid fa-phone"></i> 0791-012-345</li>
                <li><i class="fa-solid fa-envelope"></i> info@et-net.com</li>
                <li><i class="fa-solid fa-building"></i> ET~NET</li>
                <li><i class="fa-solid fa-location-dot"></i> 123 Network Street, Tech City</li>
                <li>
                    <i class="fa-solid fa-clock"></i> Working Hours:
                    <ul class="list-unstyled ms-4">
                        <li>MON-FRI: 8:30 AM - 5:30 PM</li>
                        <li>SAT: 8:30 AM - 2:00 PM</li>
                    </ul>
                </li>
            </ul>
        </div>
        <p class="mb-0" style="color: var(--light-gray);">
            Your trusted source for Networking services and SmartHome Systems. We provide prominent Networking solutions.
        </p>
    </div>
</div>
                        
                        <!-- Contact Form -->
                        <div class="col-md-7">
                            <div class="contact-form">
                                <h3 class="mb-4" style="color: rgb(2, 2, 2);font-weight:700;font-size:20px;">Get in touch</h3>
                                <form id="contactform" action="#" method="post">
                                    <div class="mb-3">
                                        <input type="text" name="name" class="form-control" placeholder="Your Name" required>
                                    </div>
                                    <div class="mb-3">
                                        <input type="email" name="email" class="form-control" placeholder="Your Email" required>
                                    </div>
                                    <div class="mb-4">
                                        <textarea name="message" class="form-control" rows="5" placeholder="Your Message" required></textarea>
                                    </div>
                                    <div class="text-end">
                                        <button type="submit" class="btn btn-submit">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>


<!-- cta -->

<section class="">
    <div class="container">
        <div class="title-section text-center">
            <h2 class="flat-title">Our Services</h2>
        </div>
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
                                <h3 class="title"><a href="#">Internet</br>Installation</br></a></h3>
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
                                <h3 class="title"><a href="#">CCTV</br>Installation</br></a></h3>
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
                                <h3 class="title"><a href="#">SmartHome</br>systems</br></a></h3>
                            </div>
                        </div>
                    </div>

</section>

<!-- flat-it-services -->
                            <div class="spinning-circle"></div>
                            <div class="icon-represent"><span class="icon-trophy"></span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
z


<!-- get-in-touch -->

<div class="slider">
    <div class="row">
        <section class="cta-type2 parallax parallax3">
            <div class="section-overlay"></div>
            <div class="container position-relative text-center">
                <div class="cta-content position-relative">
                    <div class="icon">
                        <span class="icon-support" style="font-size: 3rem;"></span>
                    </div>
                    <div class="f-text text-white mt-4">
                        <h2 style="font-weight: 700; font-size: 1.75rem;">"Experience the Power of Seamless Connectivity with ET~NET."</h2>
                        <p style="font-size: 0.8rem;">
                            Elevate Your Digital Experience with Our Reliable Internet Services. Join Us in Building Stronger Connections for a Brighter Future.
                        </p>
                    </div>
                    <div class="s-text text-white my-4">
                        <h4>Make A Difference With our Team</h4>
                    </div>
                    <div class="flat-contact-now btn-linear hv-linear-gradient">
                        <a href="aboutus.html" class="font-style linear-color border-corner">Team<span class="icon-arrow-pointing-to-right"></span></a>
                    </div>
                </div>
                <div class="circle-border circle-border1 none-767"></div>
                <div class="circle-border circle-border2 none-767"></div>
                <div class="circle-border circle-border3 none-767"></div>
            </div>
        </section>
    </div>
</div>

<style>

.flat-contact-now a {
    display: inline-block;
    padding: 8px 20px;
    color: #fff;
    background: linear-gradient(90deg, #f39c12, #e74c3c);
    border-radius: 10%;
    transition: background 0.3s ease;
    text-transform: uppercase;
    font-weight: 700;
}

/* Default styles for larger screens */
.flat-slider .rev_slider_wrapper {
    width: 100%;
    height: auto;
}

.flat-slider img {
    max-width: 100%;
    height: auto;
}

.tp-caption {
    font-size: inherit;
    line-height: inherit;
}

/* Media queries for responsiveness */
@media screen and (max-width: 1200px) {
    .tp-caption.text-one {
        font-size: 45px;
        line-height: 65px;
    }

    .tp-caption.text-two {
        font-size: 60px;
        line-height: 75px;
    }

    .tp-caption.btn-three {
        font-size: 18px;
        line-height: 26px;
    }
}

@media screen and (max-width: 992px) {
    .tp-caption.text-one {
        font-size: 35px;
        line-height: 50px;
    }

    .tp-caption.text-two {
        font-size: 55px;
        line-height: 70px;
    }

    .tp-caption.btn-three {
        font-size: 17px;
        line-height: 28px;
    }

    .flat-slider img {
        width: 100%;
        height: auto;
    }
}

@media screen and (max-width: 768px) {
    .tp-caption.text-one {
        font-size: 26px;
        line-height: 38px;
    }

    .tp-caption.text-two {
        font-size: 42px;
        line-height: 54px;
    }

    .tp-caption.btn-three {
        font-size: 16px;
        line-height: 24px;
    }

    .flat-slider img {
        width: 100%;
        height: auto;
    }
}

@media screen and (max-width: 576px) {
    .tp-caption.text-one {
        font-size: 22px;
        line-height: 32px;
    }

    .tp-caption.text-two {
        font-size: 36px;
        line-height: 48px;
    }

    .tp-caption.btn-three {
        font-size: 15px;
        line-height: 22px;
    }

    .flat-slider img {
        width: 100%;
        height: auto;
    }

    .flat-slider .rev_slider_wrapper {
        padding: 0;
    }
}

:root {
        --purple: rgb(75, 89, 133);
        --light-purple: #7d4fff;
        --luminous-green: #29cc97;
        --dark-blue: #202b61;
        --blue: #357bf2;
        --gray: #6c757d;
        --light-gray: #f7fafc;
        --orange: #f99526;
    }

    .get-in-touch {
        background-image: url('images/parallax/04.jpg');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        padding: 80px 0;
        position: relative;
    }

    .get-in-touch::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(32, 43, 97, 0.9), rgba(75, 89, 133, 0.8));
        z-index: 1;
    }

    .contact-card {
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        height: 100%;
        position: relative;
        z-index: 2;
    }

    .contact-info {
        background-color: var(--dark-blue);
        color: #ffffff;
        padding: 40px;
    }

    .contact-info h4 {
        font-size: 24px;
        margin-bottom: 20px;
        color: var(--luminous-green);
    }

    .contact-details li {
        margin-bottom: 15px;
        display: flex;
        align-items: center;
    }

    .contact-details i {
        margin-right: 10px;
        font-size: 18px;
        color: var(--orange);
    }

    .contact-form {
        padding: 40px;
    }

    .contact-form h3 {
        color: var(--purple);
    }

    .form-control {
        border: none;
        border-bottom: 2px solid var(--gray);
        border-radius: 0;
        padding: 10px 5px;
        margin-bottom: 20px;
        transition: all 0.3s ease;
    }

    .form-control:focus {
        box-shadow: none;
        border-color: var(--blue);
    }
    textarea.form-control {
        min-height: 120px;
        border-radius: 10px;
        padding: 15px;
        transition: all 0.3s ease;
        outline: none;
    }

    textarea.form-control:focus {
        border-color: var(--blue);
        box-shadow: 0 0 0 2px rgba(53, 123, 242, 0.2);
    }

    .btn-submit {
        background-color: var(--light-purple);
        color: #ffffff;
        border: none;
        padding: 12px 30px;
        border-radius: 30px;
        transition: all 0.3s ease;
    }

    .btn-submit:hover {
        background-color: var(--purple);
        transform: translateY(-2px);
    }



</style>
@endsection
