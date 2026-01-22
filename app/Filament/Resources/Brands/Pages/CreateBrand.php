<?php

namespace App\Filament\Resources\Brands\Pages;

use App\Filament\Resources\Brands\BrandResource;
use Filament\Resources\Pages\CreateRecord;

class CreateBrand extends CreateRecord
{
    protected static string $resource = BrandResource::class;

    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $data['vendor_id'] = auth()->id();

        return $data;
    }
}
