@extends('layout')
@section('main')
<div class="container">
    <div class="block">

    </div>
    <div class="block">
        <div class="package-details">
            <form action="{{url('/')}}" class="package-details-form" method="POST">
                <div class="iput-section">
                    <label for="username">Package Name</label>
                    <input type="text" name="p_name" id="username" placeholder="Barry" required>
                </div>
                <div class="iput-section">
                    <label for="username">Bandwith</label>
                    <input type="number" name="bandwith" id="bandwith" placeholder="400" min="1" max="2000" required>
                </div>
                <div class="iput-section">
                    <label for="username">Type</label>
                    <select type="text" name="username" id="username">
                    </select>
                </div>
                <div class="iput-section">
                    <label for="username">Image</label>
                    <input type="text" name="username" id="username" placeholder="Barry" required>
                </div>
                <div class="iput-section">
                    <label for="username">Price</label>
                    <input type="text" name="username" id="username" placeholder="Barry" required>
                </div>
            </form>
        </div>
        <div class="package-types">
            <h3 class="form-title">New Distribution Tech</h3>
            <form action="{{url('/save-distribution')}}" class="package-type-form" method="POST">
            @csrf
                <div class="iput-section">
                    <label for="username">Distribution Type</label>
                    <input type="text" name="distribution_type" id="istribution_type" placeholder="FHTH" required>
                </div>
                <div class="iput-section">
                    <input type="submit" name="save_distribution" id="save-dist" class="savebtn" value="Save Distribution">
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
