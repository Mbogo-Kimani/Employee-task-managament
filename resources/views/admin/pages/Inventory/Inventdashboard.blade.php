@extends('admin.master')

@section('content')
<div class="page-header">
    {{-- <h1 class="page-heading">dashboard</h1> --}}
    {{-- <span class="fw-bold page-heading" style="font-size: 30px">Today</span><br> --}}
    <span id="dayOfWeek" class="page-heading" style="font-size: 30px"></span><br>
    <span id='ct7' class="page-heading" style="font-size: 25px"></span>
    <p class="fw-medium fs-5 animated-text">
        <span>Hello,</span>
        <span class="fw-bold">Guest</span>
        <span>Welcome</span>
        <span>to</span>
        <span>Elephant</span>
        <span>Technologies</span>
        <hr>
    </p>
</div>
<section class="mb-3 mb-lg-5">
    <div class="row mb-3">

        <!-- Widget Type 1-->
        <div class="col-sm-6 col-lg-3 mb-4 ">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            {{-- <h4 class="fw-normal text-red">{{ $employees }}</h4> --}}
                            <p class="subtitle text-sm text-muted mb-0">Total Employee</p>
                        </div>
                        <div class="flex-shrink-0 ms-3">
                            <div>
                                <img class="img-fluid custom-small-img" src="{{ asset('assests/image/teamwork.png') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <a class="text-decoration-none" href="#">
                    <div class="card-footer py-3 bg-red-light">
                        <div class="row align-items-center text-red">
                            <div class="col-10">
                                <p class="mb-0">View Details</p>
                            </div>
                            <div class="col-2 text-end"><i class="fas fa-caret-up"></i></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-sm-6 col-lg-3 mb-4 ">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            {{-- <h4 class="fw-normal text-dark">{{ $totalTasks }}</h4> --}}
                            <p class="subtitle text-sm text-muted mb-0">Assigned Task</p>
                        </div>
                        <div class="flex-shrink-0 ms-3">
                            <div>
                                <img class="img-fluid custom-small-img" src="{{ asset('assests/image/task.png') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <a class="text-decoration-none" href="#">
                    <div class="card-footer py-3 bg-dark-light">
                        <div class="row align-items-center text-dark">
                            <div class="col-10">
                                <p class="mb-0">View Details</p>
                            </div>
                            <div class="col-2 text-end"><i class="fas fa-caret-up"></i></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <!-- Maintenance Tasks -->
        <div class="col-sm-6 col-lg-3 mb-4 ">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            {{-- <h4 class="fw-normal text-red">{{ $maintenanceTasks }}</h4> --}}
                            <p class="subtitle text-sm text-muted mb-0">Maintenance Tasks</p>
                        </div>
                        <div class="flex-shrink-0 ms-3">
                            <div>
                                <img class="img-fluid custom-small-img" src="{{ asset('assests/image/maintenance.png') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <a class="text-decoration-none" href="#">
                    <div class="card-footer py-3 bg-dark-light">
                        <div class="row align-items-center text-dark">
                            <div class="col-10">
                                <p class="mb-0">View Details</p>
                            </div>
                            <div class="col-2 text-end"><i class="fas fa-caret-up"></i></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
        <!-- Replacement Requests -->
        <div class="col-sm-6 col-lg-3 mb-4 ">
            <div class="card h-100">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div>
                            {{-- <h4 class="fw-normal text-red">{{ $replacementRequests }}</h4> --}}
                            <p class="subtitle text-sm text-muted mb-0">Replacement Requests</p>
                        </div>
                        <div class="flex-shrink-0 ms-3">
                            <div>
                                <img class="img-fluid custom-small-img" src="{{ asset('assests/image/replacement.png') }}" alt="">
                            </div>
                        </div>
                    </div>
                </div>
                <a class="text-decoration-none" href="#">
                    <div class="card-footer py-3 bg-dark-light">
                        <div class="row align-items-center text-dark">
                            <div class="col-10">
                                <p class="mb-0">View Details</p>
                            </div>
                            <div class="col-2 text-end"><i class="fas fa-caret-up"></i></div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </div>
</section>
@endsection
