<?php

namespace App\Filament\Resources\Customers\Schemas;

use App\Models\Customer;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Schema;

class CustomerInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Fieldset::make('Customer Details')
                    ->columns(1)
                    ->schema([
                        TextEntry::make('name')
                            ->label('Full Name'),

                        TextEntry::make('email')
                            ->label('Email'),

                        TextEntry::make('phone')
                            ->label('Phone')
                            ->columnSpanFull(),

                        TextEntry::make('full_address')
                            ->label('Address'),
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

                        TextEntry::make('email_verified_at')
                            ->label('Verified At')
                            ->placeholder('Not Verified')
                            ->since()
                            ->dateTimeTooltip(),

                        TextEntry::make('deleted_at')
                            ->label('Deleted At')
                            ->since()
                            ->dateTimeTooltip()
                            ->visible(fn (Customer $record): bool => $record->trashed()),
                    ]),
            ])
            ->columns(2);
    }
}
