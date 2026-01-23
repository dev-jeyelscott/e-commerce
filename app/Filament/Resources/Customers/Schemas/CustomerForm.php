<?php

declare(strict_types=1);

namespace App\Filament\Resources\Customers\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class CustomerForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Full name')
                    ->required()
                    ->autofocus(),
                TextInput::make('email')
                    ->label('Email')
                    ->required()
                    ->disabled(
                        fn (string $context): bool => $context === 'edit',
                    )
                    ->email(),
                TextInput::make('phone')
                    ->label('Phone')
                    ->required(),
                TextInput::make('password')
                    ->label('Password')
                    ->required()
                    ->confirmed()
                    ->password()
                    ->visible(
                        fn (string $context): bool => $context === 'create',
                    )
                    ->revealable(),
                TextInput::make('password_confirmation')
                    ->label('Confirm Password')
                    ->required()
                    ->visible(
                        fn (string $context): bool => $context === 'create',
                    )
                    ->password()
                    ->revealable(),
                TextInput::make('address')
                    ->label('Address')
                    ->required(),
                TextInput::make('city')
                    ->label('City')
                    ->required(),
                TextInput::make('state')
                    ->label('State')
                    ->required(),
                TextInput::make('country')
                    ->label('Country')
                    ->required(),
                TextInput::make('postal_code')
                    ->label('Postal Code')
                    ->required(),
            ])
            ->columns(2);
    }
}
