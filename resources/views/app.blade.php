<!DOCTYPE html>
<html>
  <head>
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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title inertia>{{ config('app.name', 'ET~NET Ltd') }}</title>
    <!-- <link rel="icon" href="/" > -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
  </head>
  <body>
    @inertia
  </body>
</html>