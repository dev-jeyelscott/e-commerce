<?php

namespace App\Filament\Resources\Customers\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Schema;

class CustomerInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Group::make([
                    TextEntry::make('name')
                        ->label('Full Name'),

                    TextEntry::make('email')
                        ->label('Email'),

                    TextEntry::make('phone')
                        ->label('Phone')
                        ->columnSpanFull(),

                    TextEntry::make('full_address')
                        ->label('Address'),

                    TextEntry::make('email_verified_at')
                        ->label('Verified At')
                        ->since()
                        ->dateTimeTooltip()
                        ->columnSpanFull(),
                ]),
                Group::make([
                    TextEntry::make('created_at')
                        ->label('Created At')
                        ->since()
                        ->dateTimeTooltip(),

                    TextEntry::make('updated_at')
                        ->label('Updated At')
                        ->since()
                        ->dateTimeTooltip(),
                ]),
            ])
            ->columns(2);
    }
}
