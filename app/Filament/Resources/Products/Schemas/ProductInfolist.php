<?php

declare(strict_types=1);

namespace App\Filament\Resources\Products\Schemas;

use App\Models\Product;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Fieldset::make('Product Details')
                    ->schema([
                        TextEntry::make('id')
                            ->label('Product ID')
                            ->columnSpanFull(),

                        TextEntry::make('name'),

                        TextEntry::make('description')
                            ->placeholder('-')
                            ->columnSpanFull(),

                        TextEntry::make('brand.name')
                            ->label('Brand')
                            ->placeholder('-'),

                        TextEntry::make('categories.name')
                            ->label('Categories')
                            ->badge()
                            ->placeholder('-'),

                        TextEntry::make('price')
                            ->money(),

                        TextEntry::make('quantity')
                            ->numeric(),
                    ]),
                Group::make([
                    Fieldset::make('Image(s)')
                        ->columns(1)
                        ->schema([
                            ImageEntry::make('images')
                                ->hiddenLabel()
                                ->disk('s3')
                                ->imageSize(100)
                                ->square()
                                ->checkFileExistence(false)
                                ->extraImgAttributes([
                                    'alt' => 'Logo',
                                    'loading' => 'lazy',
                                ])
                                ->placeholder('No image available.'),
                        ]),
                    Fieldset::make('Timestamps')
                        ->schema([
                            TextEntry::make('created_at')
                                ->label('Created At')
                                ->since()
                                ->dateTimeTooltip(),

                            TextEntry::make('updated_at')
                                ->label('Updated At')
                                ->since()
                                ->dateTimeTooltip(),

                            TextEntry::make('deleted_at')
                                ->label('Deleted At')
                                ->since()
                                ->dateTimeTooltip()
                                ->visible(fn (Product $product): bool => $product->trashed()),
                        ]),
                ]),
            ]);
    }
}
