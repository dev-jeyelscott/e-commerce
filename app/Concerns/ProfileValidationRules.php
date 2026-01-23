<?php

declare(strict_types=1);

namespace App\Concerns;

use App\Models\User;
use Illuminate\Validation\Rule;

trait ProfileValidationRules
{
    /**
     * Get the validation rules used to validate user profiles.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    protected function profileRules(?string $userId = null): array
    {
        return [
            'name' => $this->nameRules(),
            'email' => $this->emailRules($userId),
        ];
    }

    /**
     * Get the validation rules used to validate user names.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function nameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    /**
     * Get the validation rules used to validate user email addresses.
     *
     * @param  string|null  $userId  The ID of the user to ignore when validating uniqueness.
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    protected function emailRules(?string $userId = null): array
    {
        $uniqueRule = Rule::unique(User::class);

        if ($userId !== null) {
            $uniqueRule = $uniqueRule->ignore($userId);
        }

        return [
            'required',
            'string',
            'email',
            'max:255',
            $uniqueRule,
        ];
    }
}
