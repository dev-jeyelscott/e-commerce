<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\Textarea;
use Illuminate\Support\Facades\Storage;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\FileUpload;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Textarea::make('description')
                    ->rows(5)
                    ->columnSpanFull(),
                TextInput::make('brand'),
                TextInput::make('category'),
                TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('$'),
                TextInput::make('quantity')
                    ->required()
                    ->numeric()
                    ->default(0),
                FileUpload::make('images')
                    ->image()
                    ->imageAspectRatio('1:1')
                    ->multiple()
                    ->minSize(1)
                    ->maxSize(1024)
                    ->maxFiles(5)
                    ->maxParallelUploads(2)
                    ->disk('s3')
                    ->directory('product-images')
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                    ->uploadingMessage('Uploading images...')
                    ->panelLayout('grid')
                    ->removeUploadedFileButtonPosition('right')
                    ->appendFiles()
                    ->moveFiles()
                    ->reorderable()
                    ->openable()
                    ->downloadable()
            ]);
    }
}
