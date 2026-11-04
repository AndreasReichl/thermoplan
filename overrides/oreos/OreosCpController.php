<?php

namespace Takepart\Oreos\Compat;

use Illuminate\Http\Request;
use Statamic\CP\PublishForm;
use Statamic\Facades\User;
use Statamic\Http\Controllers\Controller;
use Statamic\Support\Arr;
use Takepart\Oreos\OreosContent;

/**
 * Einstellungsseite der Cookie-Gruppen über Statamics PublishForm (Inertia/Vue 3).
 * Speichert wie das Original nach content/oreos.yaml.
 */
class OreosCpController extends Controller
{
    public function edit()
    {
        abort_unless(User::current()->can('edit oreos settings'), 403);

        return PublishForm::make(OreosContent::blueprint())
            ->title(__('statamic-oreos::messages.title'))
            ->icon('cog')
            ->values(OreosContent::load()->all())
            ->submittingTo(cp_route('oreos.update'), 'POST');
    }

    public function update(Request $request)
    {
        abort_unless(User::current()->can('edit oreos settings'), 403);

        $values = PublishForm::make(OreosContent::blueprint())->submit($request->all());

        OreosContent::load(Arr::removeNullValues($values))->save();

        return ['saved' => true];
    }
}
