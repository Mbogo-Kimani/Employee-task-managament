<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}">

    <title>Email</title>
    <style>
        .banner-text{
            width: 50px;
            height: 20px;
        }
    </style>

</head>
<body>
    <!-- Main Image -->

    <img src="images/rev-slider/1.jpg" alt="" data-bgposition="center center" data-no-retina>
                    <div class="container">
        
        <!-- <p>Hello {{ $user }},</p> -->
        <p>{{$otp}} is your verification code to login to ETNET.</p>
    </div>
</body>
</html>