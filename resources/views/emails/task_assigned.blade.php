<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="_token" content="{{ csrf_token() }}">

    <title>ETNET</title>
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
        <h2>New Task Assigned.</h2>
        
        <p>Hello {{ $user->name }},</p>

        <p>A new task has been assigned to you. Here are the details:</p>
    <p>
        <ul>
            <li><strong>Title:</strong> {{ $task->name }}.</li>
            <li><strong>Description:</strong> {{ $task->description }}.</li>
        </ul>
    </p>
        <p>Please review and take appropriate action. </p>
        <a href="{{ env('APP_URL') }}/tasks">Task Link</a>

        <p class="footer">Thank you,<br>ETNET</p>
    </div>
</body>
</html>