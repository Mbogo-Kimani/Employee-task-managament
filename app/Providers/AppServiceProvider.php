<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Pusher\Pusher;
use Illuminate\Support\Facades\Schema;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Broadcasting\BroadcastManager;
use Illuminate\Broadcasting\Broadcasters\PusherBroadcaster;

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
    public function boot(BroadcastManager $broadcastManager)
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
        app(BroadcastManager::class)->extend('pusher-custom', function () {
            $pusher = new Pusher(
                config('broadcasting.connections.pusher.key'),
                config('broadcasting.connections.pusher.secret'),
                config('broadcasting.connections.pusher.app_id'),
                config('broadcasting.connections.pusher.options'),
                new \GuzzleHttp\Client(['verify' => false]),
            );

            return new PusherBroadcaster($pusher);
        });

    Schema::defaultStringLength(191);
    }
}
