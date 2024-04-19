<!DOCTYPE html>
<html lang="en-US">

<head>
    <meta charset="UTF-8">
    <title>ET~NET Ltd</title>

    <!-- Mobile Specific Metas-->
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">

    <!-- Bootstrap-->
    <link rel="stylesheet" href="{{asset('/stylesheet/bootstrap.css')}}">

    <!-- Template Style-->
    <link rel="stylesheet" href="{{asset('stylesheet/font-awesome.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/owl.theme.default.min.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/owl.carousel.min.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/animate.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/app.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/icomoon.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/jquery-fancybox.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/style.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/shortcodes.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/responsive.css')}}">
    <link rel="stylesheet" href="{{asset('stylesheet/flexslider.css')}}">
    <link rel="stylesheet" href="{{asset('rev-slider/css/layers.css')}}">
    <link rel="stylesheet" href="{{asset('rev-slider/css/navigation.css')}}">
    <link rel="stylesheet" href="{{asset('rev-slider/css/settings.css')}}">
    <link rel="stylesheet" href="{{asset('assests/app.css')}}">

        <!-- Favicon -->
    <!-- For Android Chrome -->
    <link rel="icon" type="image/png" sizes="192x192" href="android-chrome-192x192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="android-chrome-512x512.png">

    <!-- For Apple Touch Icon -->
    <link rel="apple-touch-icon" href="apple-touch-icon.png">

    <!-- For Favicons -->
    <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png">
    <link rel="shortcut icon" href="favicon.ico">

    <!-- For Web App Manifest -->
    <link rel="manifest" href="site.webmanifest">

    <!-- Google Tag Manager -->
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'www.googletagmanager.com/gtm54455445.html?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NQBXR8V');</script>
        <!-- End Google Tag Manager -->
</head>
<body class="counter-scroll">
        
       <!-- Google Tag Manager (noscript) -->

    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NQBXR8V"
        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>

    <!-- End Google Tag Manager (noscript) -->

    <div id="loading-overlay">
        <div class="loader"></div>
    </div>
    <!--header-->
    <div class="top-bar top-bar-type1">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-12 d-lg-flex align-items-center">
                    <ul class="flat-information flat-information-type1">
                        <li class="phone"><a href="tel:+254791012345"> CALL US </a></li>
                        <li class="fa fa-envelope-o"><a href="SMS:+25491012345"> SMS </a></li>
                        <li class="email"><a href="mailto:info@etnet.co.ke" title="Email">info@etnet.co.ke</a></li> 
                    </ul>
                </div>
                <div class="col-md-4 col-12 d-flex justify-content-md-end justify-content-center">
                    <div id="quik-search-btn" class="show-search">
                        <a href="#"><i class="fa fa-search" aria-hidden="true"></i></a>
                    </div>
                    <div class="dlab-quik-search">
                        <form action="#">
                            <input name="search" value="" type="text" class="form-control" placeholder="Type to search">
                            <span id="quik-search-remove"><i class="fa fa-times" aria-hidden="true"></i></span>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--header-->
    <!--menu-->
    <header id="header" class="header header-type1 bg-header-s1 bg-color">
        <div class="container">
            <div class="flex-header d-flex">
                <div id="logo" class="logo d-flex align-items-center justify-content-start">
                    <a href="#" title="Logo"><img src="images/logo/logo.png" data-width="208" width="90px"
                                                data-height="38" alt="images"
                                                data-retina="images/logo/logo.png"></a>
                </div>
                <div class="content-menu d-flex align-items-center justify-content-end">
                    <div class="nav-wrap">
                        <div class="btn-menu"><span></span></div>
                        <nav id="mainnav" class="mainnav">
                            <ul class="menu">
                                <li>
                                    <a href="{{url('index')}}" class="active">Home</a>
                                </li>
                                <li>
                                    <a href="{{url('products')}}">Our Solutions</a>
                                </li>
                                <li>
                                    <a href="{{url('blogs')}}">Blog</a>
                                </li>
                                <li>
                                    <a href="{{url('about-us')}}">About Us</a>
                                </li>
                                <li>
                                    <a href="{{url('/auth/login')}}">Sign In</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="flat-appointment btn-linear hv-linear-gradient">
                        <a href="{{url('contact')}}" class="font-style linear-color border-corner">Contact Us</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="notification" @if(!session('msg')) style="display:none" @endif>
        <p>
            @if(session('msg'))
                {{session('msg')}}
            @endif
        </p>
    </div>
    <!--menu-->
    @yield('main')
    
    <footer id="footer" class="footer footer-bg-3">
        <div class="overlay"></div>
        <div id="footer-widget" class="footer-widget-type2">
            <div class="container">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="mg-widget-mobi">
                            <h3 class="widget widget-title">Our Solutions</h3>
                            <div class="widget-services d-sm-flex">
                                <ul class="one-half first">
                                    <li><a href="#">SmartHome systems</a></li>
                                    <li><a href="#">Internet Services</a></li>
                                    <li><a href="#">CCTV Installation</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="mg-widget-mobi kcl-widget">
                            <h3 class="widget widget-title">Get in Touch with US</h3>
                            <div class="socials-list">
                                <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                <a href="{{url('https://www.instagram.com/elephanttech.limited/')}}" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                                <a href="{{url('https://twitter.com/EtnetTech')}}" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                            </div>
                            <ul>
                                <li>Email: info@etnet.co.ke<br> sales@etnet.co.ke</li>
                                <li>Phone: 0791012345</li>
                                <li>www.etnet.co.ke</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <div class="mg-widget-mobi kcl-widget">
                            <h3 class="widget widget-title">Subscribe</h3>
                            <form action="#" class="form-email btn-linear hv-linear-gradient">
                                <input type="text" class="email-here" placeholder="Email here">
                                <button class="font-style linear-color border-corner">send now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="bottom" class="bottom-type2 position-relative">
            <div class="container">
                <div class="bottom-wrap text-center">
                    <div id="copyright">
                        Copyright © 2024<a href="#"> ET~NET</a><span class="license"> All Rights Reserved <a href="privacy_policy.html" target="_blank">Privacy Policy</a></span>
                    </div>
                </div>
            </div>
        </div>
        <a id="scroll-top" class="show"></a>
    </footer>
<!-- footer -->
</body>
<script src="{{asset('javascript/jquery.min.js')}}"></script>
<script src="{{asset('javascript/parallax.js')}}"></script>
<script src="{{asset('javascript/plugins.js')}}"></script>
<script src="{{asset('javascript/jquery-ui.js')}}"></script>
<script src="{{asset('javascript/gmap3.min.js')}}"></script>
<script src="{{asset('https://maps.googleapis.com/maps/api/js?key=AIzaSyAOvgMzMavm0loFdwqNrzzVh42X_-lDZ3w')}}"></script>
<script src="{{asset('javascript/jquery-isotope.js')}}"></script>
<script src="{{asset('javascript/owl.carousel.min.js')}}"></script>
<script src="{{asset('javascript/equalize.min.js')}}"></script>
<script src="{{asset('javascript/jquery-fancybox.js')}}"></script>
<script src="{{asset('javascript/jquery-countTo.js')}}"></script>
<script src="{{asset('javascript/flex-slider.min.js')}}"></script>
<script src="{{asset('javascript/wow.min.js')}}"></script>
<script src="{{asset('javascript/jquery-validate.js')}}"></script>
<script src="{{asset('javascript/main.js')}}"></script>
<script src="{{asset('javascript/app.js')}}"></script>

<!-- slider -->
<script src="{{asset('rev-slider/js/jquery.themepunch.tools.min.js')}}"></script>
<script src="{{asset('rev-slider/js/jquery.themepunch.revolution.min.js')}}"></script>
<script src="{{asset('javascript/rev-slider.js')}}"></script>

<!-- Load Extensions only on Local File Systems ! The following part can be removed on Server for On Demand Loading -->
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.actions.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.carousel.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.kenburn.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.layeranimation.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.migration.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.navigation.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.parallax.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.slideanims.min.js')}}"></script>
<script src="{{asset('rev-slider/js/extensions/extensionsrevolution.extension.video.min.js')}}"></script>

<!-- GetButton.io widget -->
<script type="text/javascript">
    (function () {
        var options = {
            facebook: "#", // Facebook page ID
            call_to_action: "Message us", // Call to action
            position: "right",
        };
        var proto = document.location.protocol, host = "getbutton.io", url = proto + "//static." + host;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () {
            WhWidgetSendButton.init(host, proto, options);
        };
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    })();
</script>
</html>