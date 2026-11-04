<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Statamic\Facades\Icon;
use Statamic\Statamic;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Eigene SVG-Icons für den Icon-Feldtyp (Statamic 6: Icon-Sets statt "directory").
        Icon::register('thermoplan', resource_path('assets/icons'));

        // Statamic::vite('app', [
        //     'resources/js/cp.js',
        //     'resources/css/cp.css',
        // ]);
    }
}
