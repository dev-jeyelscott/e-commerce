<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Models\Product;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make([
                    TextEntry::make('id')
                        ->label('Product ID'),

                    TextEntry::make('name'),

                    TextEntry::make('description')
                        ->placeholder('-'),

                    TextEntry::make('brand')
                        ->placeholder('-'),

                    TextEntry::make('category')
                        ->placeholder('-'),
                ]),
                Group::make([
                    ImageEntry::make('images')
                        ->label('Image(s)')
                        ->disk('s3')
                        ->imageSize(100)
                        ->square()
                        ->checkFileExistence(false)
                        ->extraImgAttributes([
                            'alt' => 'Logo',
                            'loading' => 'lazy',
                        ])
                        ->placeholder('No image available.'),

                    TextEntry::make('price')
                        ->money(),

                    TextEntry::make('quantity')
                        ->numeric(),

                    TextEntry::make('deleted_at')
                        ->dateTime()
                        ->visible(fn (Product $record): bool => $record->trashed()),
                ]),

                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),

                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
