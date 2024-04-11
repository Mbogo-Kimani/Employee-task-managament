@extends('layout')
@section('main')
@php
if($form=="signup"){
    $signupshow = "";
    $signinshow = "none";
}
else{
    $signupshow = "none";
    $signinshow = "";
}
@endphp
<div class="signin-container">
    <div class="signin-image block">
        <img src="{{asset('/images/home1/01.png')}}" alt="Login-Image">
    </div>
    <div class="forms block">
        <div class="login-form-space" style="display:{{$signinshow}}">
            <h3 class="form-title">Sign In</h3>
            <form action="{{url('/sign-in')}}" class="login-form" method="POST">
                @csrf
                <div class="iput-section">
                    <label for="username">Username</label>
                    <input type="text" name="username" id="username" placeholder="Barry" required>
                </div>
                <div class="iput-section">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" placeholder="*********" required>
                </div>
                <div class="iput-section">
                    <input type="submit" name="sign-in" id="signin-btn" value="Sign In">
                </div>
            </form>
            <p class="google-login" id="google-login"><a href="/auth/google"> Continue with Google <i class="fa-brands fa-google"></i></a></p>
            <p class="go-to-signup alt-login">New Here? Create New Account</p>
        </div>
        <div class="signup-form-space" style="display:{{$signupshow}}">
        <h3 class="form-title">Sign Up</h3>
            <form action="{{url('/save-user')}}" class="signup-form" method="POST">
                @csrf   
                <div class="iput-section">
                    <label for="username">First Name</label>
                    <input type="text" name="first_name" id="username" required placeholder="Barry">
                </div>
                <div class="iput-section">
                    <label for="">Last Name</label>
                    <input type="text" name="last_name" id="last-name" required placeholder="Wayne">
                </div>
                <div class="iput-section">
                    <label for="">E-mail</label>
                    <input type="email" name="email" id="email" required placeholder="barry@email.com">
                </div>
                <div class="iput-section">
                    <label for="">Phone</label>
                    <input type="text" name="phone" id="phone" required placeholder="+2547829300322">
                </div>
                <div class="iput-section">
                    <label for="">Password</label>
                    <input type="password" name="password" id="password" placeholder="*********" required>
                </div>
                <div class="iput-section">
                    <label for="password">Confirm Password</label>
                    <input type="password" name="confirm-password" id="password" placeholder="*********" required>
                </div>
                <div class="iput-section">
                    <input type="submit" name="sign-in" id="signup-btn" value="Sign Up">
                </div>
            </form>
            <p class="google-login" id=""><a href="/auth/google"> Continue with Google <i class="fa-brands fa-google"></i></a></p>
            <p class="go-to-signin alt-login">Already have an Account? Sign In</p>
        </div>
    </div>
</div>
@endsection