<?php

declare(strict_types=1);

namespace App\Filament\Resources\Roles\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Fieldset;
use Filament\Schemas\Schema;

class RoleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->required(),
                Fieldset::make('Permissions')
                    ->columnSpanFull()
                    ->schema([
                        CheckboxList::make('permissions')
                            ->hiddenLabel()
                            ->columns(4)
                            ->relationship(
                                name: 'permissions',
                                titleAttribute: 'name',
                                modifyQueryUsing: fn ($query) => $query->orderBy('created_at', 'asc'),
                            )
                            ->searchable()
                            ->noSearchResultsMessage('Permission not found.')
                            ->searchPrompt('Search for a permission...')
                            ->columnSpanFull(),
                    ]),

            ]);
    }
}
