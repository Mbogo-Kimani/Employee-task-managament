<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}">

    <title>Email yetu</title>
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
                    <div class="banner-text">
                        <h5>ET~NET</h5>
                    </div>
                    <div class="container">
        <h2>Invite.</h2>
        
        <!-- <p>Hello {{ $user }},</p> -->
        <p>Hello {{$user->email}},</p>

        <p>You have been invited to the ETNET workflow system</p>
        <p>Click <a href="{{ env('APP_URL') . '/change_password?token=' . $user->verification_token}}">here</a> to login.</p>

        <p class="footer">Thank you,<br>ETNET</p>
    </div>
</body>
</html>