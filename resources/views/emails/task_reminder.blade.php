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
        <h2>Task Reminder.</h2>

        <p>Hello {{ $user->name }},</p>

        <p>The following task is due on {{\Carbon\Carbon::parse($task->to_date)->format('F j, Y')}}:</p>
        <p><strong>Title:</strong> {{ $task->name }}.</p>
        <p><strong>Department:</strong> {{ $department->name }}.</p>
        <p><strong>Handler:</strong> {{isset($handler) ? $handler->name : 'Unassigned'}}.</p>
    <!--  -->
        <p>Please review and take appropriate action. </p>

        <p class="footer">Thank you,<br>ETNET</p>
    </div>
</body>
</html>