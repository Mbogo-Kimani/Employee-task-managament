<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if (env('APP_ENV') !== 'local') {
               URL::forceScheme('https');
           }
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Paginator::useBootstrap();
        Blade::if('admin', function () {
            // Assuming your user's role is stored in a role column as a string
            return auth()->check() && auth()->user()->role === 'Admin';
        });

        Blade::if('employee', function () {
            // Adjust the condition according to how you determine if a user is an employee
            return auth()->check() && auth()->user()->role === 'employee';
        });
    }
}
