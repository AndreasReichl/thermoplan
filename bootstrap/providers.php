<?php

return [
    App\Providers\AppServiceProvider::class,
    // Statamic-6-Kompatibilität für das Oreos-Addon (ersetzt den Vendor-Provider)
    Takepart\Oreos\Compat\ServiceProvider::class,
];
