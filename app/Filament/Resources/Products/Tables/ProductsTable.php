<?php

declare(strict_types=1);

namespace App\Filament\Resources\Products\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->modifyQueryUsing(function (Builder $builder) {
                if (auth()->user()->hasRole('system admin')) {
                    $builder;
                }

                $builder->where(['vendor_id' => auth()->id()]);
            })
            ->columns([
                ImageColumn::make('images')
                    ->label('Image')
                    ->imageSize(80)
                    ->alignCenter()
                    ->limit(1)
                    ->placeholder('No Image'),
                TextColumn::make('name')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('brand.name')
                    ->searchable(),
                TextColumn::make('categories.name')
                    ->listWithLineBreaks()
                    ->badge()
                    ->limitList(3)
                    ->expandableLimitedList()
                    ->searchable(),
                TextColumn::make('price')
                    ->money('PHP')
                    ->sortable(),
                TextColumn::make('quantity')
                    ->numeric()
                    ->sortable(),
                TextColumn::make('deleted_at')
                    ->since()
                    ->sortable()
                    ->tooltip(
                        fn($record): string => $record->deleted_at->format('M d, Y H:i:s')
                    )
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->since()
                    ->sortable()
                    ->tooltip(
                        fn($record): string => $record->created_at->format('M d, Y H:i:s')
                    )
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->since()
                    ->sortable()
                    ->tooltip(
                        fn($record): string => $record->updated_at->format('M d, Y H:i:s')
                    )
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
