<?php

namespace Takepart\Oreos\Compat;

use Statamic\Facades\CP\Nav;
use Statamic\Facades\User;
use Takepart\Oreos\ServiceProvider as OreosServiceProvider;

/**
 * Statamic-6-Kompatibilität für takepart-media/statamic-oreos (v1.3, nicht mehr gepflegt).
 *
 * Das Original ruft NavItem::active() auf (in Statamic 6 entfernt) und rendert die
 * Einstellungsseite über eine Blade/Vue-2-Komponente. Diese Klasse ersetzt den
 * Vendor-Provider (siehe composer.json -> extra.laravel.dont-discover) und
 * überschreibt nur diese beiden Punkte. Tags, Action-Routen, Config und Views
 * kommen unverändert aus dem Vendor-Paket.
 *
 * Der Namespace muss mit "Takepart\Oreos\" beginnen, damit Statamic den Provider
 * dem Addon zuordnen kann (AddonServiceProvider::getAddonByServiceProvider()).
 */
class ServiceProvider extends OreosServiceProvider
{
    public function register()
    {
        parent::register();

        $this->routes['cp'] = __DIR__.'/routes/cp.php';
    }

    public function boot()
    {
        parent::boot();

        // Statamic bootet Views/Übersetzungen nur für Provider im Autoload-Verzeichnis
        // des Addons. Da diese Klasse außerhalb liegt, registrieren wir sie explizit.
        $addonDir = dirname((new \ReflectionClass(OreosServiceProvider::class))->getFileName(), 2);

        $this->loadViewsFrom($addonDir.'/resources/views', 'statamic-oreos');
        $this->loadTranslationsFrom($addonDir.'/resources/lang', 'statamic-oreos');
    }

    protected function bootAddonNav()
    {
        Nav::extend(function ($nav) {
            $user = User::current();

            if ($user && ($user->can('view oreos settings') || $user->can('edit oreos settings'))) {
                $nav->tools('Oreos')
                    ->route('oreos.edit')
                    ->icon('cog');
            }
        });

        return $this;
    }
}
