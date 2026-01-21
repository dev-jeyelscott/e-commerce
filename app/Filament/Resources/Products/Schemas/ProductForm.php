<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(1)
                    ->schema([
                        Fieldset::make('Product Details')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->columnSpanFull(),
                                Textarea::make('description')
                                    ->rows(5)
                                    ->columnSpanFull(),
                                TextInput::make('brand'),
                                Select::make('categories')
                                    ->multiple()
                                    ->relationship('categories', 'name'),
                                TextInput::make('price')
                                    ->required()
                                    ->numeric()
                                    ->prefix('$'),
                                TextInput::make('quantity')
                                    ->required()
                                    ->numeric()
                                    ->default(0),
                            ])
                    ]),

                Grid::make(1)
                    ->schema([
                        Fieldset::make('Images')
                            ->schema([
                                FileUpload::make('images')
                                    ->hiddenLabel()
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
                                    ->columnSpanFull(),
                            ])
                    ])
            ]);
    }
}
