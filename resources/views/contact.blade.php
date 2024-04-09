@extends('layout')
@section('main')
<div class="contact flat-row-half">
    <div class="container">
        <div class="row">
            <div class="col-lg-5">
                <div class="get-in-touch get-in-touch-type1">
                    <div class="text-contact"> For more information <a href="#">contact us;</a></div>
                    <div class="info-contact">
                        <p>07 9101 2345 &nbsp&nbsp&nbsp 07 1510 4782</p>
                        <p>sales@etnet.co.ke</p>
                        <p><a href="{{url('index')}}" target="_blank">www.etnet.co.ke</a></p>

                    </div>
                </div>
            </div>
            <div class="col-lg-7">
                <form id="contact-form" method="post" action="https://etnet.co.ke/contact.php" role="form">

                    <div class="messages"></div>

                    <div class="controls">

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="form_name">Firstname <span style="color:#f11">*</span></label>
                                    <input id="form_name" type="text" name="name" class="form-control" required="required" data-error="Firstname is required.">
                                    <div class="help-block with-errors"></div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="form_lastname">Lastname <span style="color:#f11">*</span></label>
                                    <input id="form_lastname" type="text" name="surname" class="form-control" required="required" data-error="Lastname is required.">
                                    <div class="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="form_email">Email <span style="color:#f11">*</span></label>
                                    <input id="form_email" type="email" name="email" class="form-control" required="required" data-error="Valid email is required.">
                                    <div class="help-block with-errors"></div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="form_phone">Phone</label>
                                    <input id="form_phone" type="tel" name="phone" class="form-control" >
                                    <div class="help-block with-errors"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="form_message" >Message <span style="color:#f11">*</span></label>
                                    <textarea id="form_message" name="message" class="form-control" rows="4" required="required" data-error="Please,leave us a message."></textarea>
                                    <div class="help-block with-errors"></div>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <input type="submit" class="btn btn-success btn-send" name="submit" value="Send message">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <p class="text-muted"><strong style="color: #f11;">*</strong> These fields are required. </p>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
</div>
<br><br>

<!-- map section -->

<section class="map-section">
    <div class="home-google-map">
        <p>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8072290105315!2d36.783143573959705!3d-1.2899278986978107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1136b65425b9%3A0xfb76365e998d2eb1!2sGOLDPARK%20HOMES!5e0!3m2!1sen!2ske!4v1708111424399!5m2!1sen!2ske" width="1500" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</section>
@endsection