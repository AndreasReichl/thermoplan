<?php

namespace App\Providers;

use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\ValidationException;
use Statamic\Events\FormSubmitted;
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

        // reCAPTCHA-Addon 3.x bricht mit einem TypeError (HTTP 500) ab, wenn ein Formular
        // ohne Token ankommt (Google-Skript blockiert, Bot postet direkt). Diesen Fall vorher
        // abfangen und wie bisher als normale Fehlermeldung im Formular anzeigen.
        // Läuft vor dem Addon-Listener, weil Addons ihre Listener erst in Statamic::booted() registrieren.
        Event::listen(FormSubmitted::class, function (FormSubmitted $event) {
            $usesToken = in_array(config('recaptcha.recaptcha_version'), ['v3', 'enterprise'], true);
            $excluded = in_array($event->submission->form->handle(), config('recaptcha.exclusions', []), true);

            if ($usesToken && ! $excluded
                && (! is_string(request()->input('captcha_token')) || ! is_string(request()->input('captcha_action')))) {
                throw ValidationException::withMessages([__('recaptcha::recaptcha.recaptcha_error_message')]);
            }
        });

        // Statamic::vite('app', [
        //     'resources/js/cp.js',
        //     'resources/css/cp.css',
        // ]);
    }
}
