@extends('layout')
@section('main')
<div class="page-title parallax parallax1 position-relative clearfix">
    <div class="section-overlay"></div>
    <div class="container">
        <div class="breadcrumbs position-relative">
            <div class="breadcrumbs-wrap">
                <h1 class="title">Blog Post</h1>
                <ul class="breadcrumbs-inner">
                    <li><a href="{{url('index')}}">Home</a></li>
                    <li><a href="{{url('blog')}}" class="active">Blog</a></li>
                </ul>
            </div>
        </div>
    </div>
</div>

<!-- page-title -->

<div class="blog-content no-column flat-row clearfix">
    <div class="container d-lg-flex">
        <div class="col-left">
            <article class="main-post">
                <div class="featured-post">
                    <div class="entry-image">
                        <img src="{{asset('images/blog/01.jpg')}}" alt="images">
                    </div>
                </div>
                <div class="content-blog content-blog-single">
                    <ul class="post-meta d-sm-flex">
                        <li class="author"><a href="#">ET~NET Team</a></li>
                        <li class="date"><span>2024</span></li>
                    </ul>
                    <h2 class="title"><a href="#">Empowering Connectivity: ET~NET's Approach to Smart Living.</a></h2>
                    <p>
                        In today's digitally-driven world, connectivity isn't just a luxury—it's a necessity. 
                        Whether it's staying connected to loved ones, monitoring our homes for security, or seamlessly accessing the vast resources of the internet, 
                        technology has become an integral part of our daily lives.
                        At ET~NET, we understand the importance of reliable connectivity and cutting-edge solutions 
                        to enhance both personal and professional spaces.
                    </p>
                    <p>
                        As a leading provider in the realm of internet supply, CCTV installations, and smart home systems, ET~NET is committed to revolutionizing
                        the way people interact with technology in their everyday environments. Our comprehensive range of services is designed to meet the
                        diverse needs of modern living, ensuring that our clients are equipped with the tools they need to thrive in an increasingly connected world.
                    </p>
                    <p>

                    <h5 class="title">Internet Supply:</h5>
                    <p> In an era where virtually every aspect of our lives relies on internet connectivity, having a fast, reliable, and secure connection is paramount.
                        At ET~NET, we pride ourselves on delivering top-tier internet supply solutions tailored to the specific requirements of our clients. 
                    </p>

                    <h5 class="title">CCTV Installations:</h5>

                    <p>Security is a fundamental concern for both residential and commercial spaces. Our state-of-the-art CCTV installations provide peace of mind by
                        offering comprehensive surveillance solutions that keep properties safe and secure. From high-definition cameras with
                        advanced motion detection capabilities to cloud-based monitoring systems accessible from anywhere in the world, ET~NET's CCTV installations are designed to deliver unparalleled security and convenience.</p>


                    <h5 class="title">Smart Home Systems:</h5>
                    <p>Transforming houses into smart homes, ET~NET offers a range of innovative solutions designed to enhance convenience, comfort, and efficiency.
                        Our smart home systems encompass a variety of features, including smart lighting, climate control, home entertainment,
                        and security integration. With the ability to automate routine tasks and control various aspects of the home remotely via smartphone or voice commands,
                        our smart home systems empower homeowners to create personalized living environments that cater to their unique preferences and lifestyles.
                    </p>

                    <p>
                        Beyond simply providing products and services, ET~NET is committed to fostering long-term partnerships with our clients.
                        Our team of experts works closely with each client to understand their needs, customize solutions,
                        and provide ongoing support to ensure optimal performance and satisfaction.

                    </p>

                    <p>
                        ET~NET is more than just a provider of internet, CCTV, and smart home solutions—we're enablers of connectivity and creators of smarter living spaces.
                        With our dedication to innovation, reliability, and customer satisfaction, we're proud to be at the forefront of shaping the future of technology-driven living.
                        Join us in embracing the power of connectivity and unlocking the full potential of your home or business with ET~NET.
                    </p>
                    
                    <div class="tags-bar d-md-flex justify-content-between align-items-center">
                        <div class="tags-list tags-list bg-linear-gradient">
                            <a href="#">Broadband</a>
                            <a href="#">Smart Home</a>
                            <a href="#">CCTV</a>
                        </div>
                        <div class="socials-list">
                            <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                        </div>
                    </div>

                    <!-- tags-bar -->

                </div>
            </article>
            
            <!-- main-post -->

        </div>
        <div class="col-right">
            <div class="sidebar">
                <div class="widget widget-search">
                    <form action="#" class="form-search btn-linear hv-linear-gradient">
                        <input type="text" class="search" placeholder="Search here">
                        <button class="btn-search linear-color"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                </div>
                <div class="widget widget-category widget-bg">
                    <h2 class="widget-title">category</h2>
                    <ul class="category-wrap">
                        <li>
                            <div class="block-inside border-corner hv-background-before">
                                <a href="#">Network Maintainance</a>
                            </div>
                        </li>
                        <li>
                            <div class="block-inside border-corner hv-background-before">
                                <a href="#">Network Restructuring</a>
                            </div>
                        </li>
                        <li>
                            <div class="block-inside border-corner hv-background-before">
                                <a href="#">Internet Installation</a>
                            </div>
                        </li>
                        <li>
                            <div class="block-inside border-corner hv-background-before">
                                <a href="#">SmartHome Systems</a>
                            </div>
                        </li>
                        <li>
                            <div class="block-inside border-corner hv-background-before">
                                <a href="#">CCTV Installation</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="widget widget-recent-posts widget-bg">
                    <h2 class="widget-title">Recent posts</h2>
                    <ul class="recent-news">
                        <li>
                            <div class="thumb-image">
                                <img src="{{asset('images/blog/03.jpg')}}" alt="images">
                            </div>
                            <div class="thumb-content clearfix">
                                <h3 class="thumb-title"><a href="#">Maintainance and Restructuring.</a></h3>
                                <p class="thumb-day">2024</p>
                            </div>
                        </li>
                        <li>
                            <div class="thumb-image">
                                <img src="{{asset('images/blog/16.jpg')}}" alt="images">
                            </div>
                            <div class="thumb-content clearfix">
                                <h3 class="thumb-title"><a href="#">AI CCTV Installations</a></h3>
                                <p class="thumb-day">2024</p>
                            </div>
                        </li>
                        <li>
                            <div class="thumb-image">
                                <img src="{{asset('images/blog/17.jpg')}}" alt="images">
                            </div>
                            <div class="thumb-content clearfix">
                                <h3 class="thumb-title"><a href="#">Transforming Your Living Space with Technology.</a></h3>
                                <p class="thumb-day">2024</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="widget widget-tags widget-bg">
                    <h2 class="widget-title">tags</h2>
                    <div class="tags-list bg-linear-gradient">
                        <a href="#">Internet Infrastructure</a>
                        <a href="#">Telecom Services</a>
                        <a href="#">HighSpeed Internet</a>
                        <a href="#">Digital Infrastructure</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
