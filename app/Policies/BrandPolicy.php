<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Brand;
use App\Models\User;

class BrandPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('manage brands');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Brand $brand): bool
    {
        return $user->can('view brands');
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('create brands');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Brand $brand): bool
    {
        return $user->can('edit brands');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Brand $brand): bool
    {
        return $user->can('delete brands');
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function deleteAny(User $user): bool
    {
        return $user->can('delete any brands');
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Brand $brand): bool
    {
        return $user->can('restore brands');
    }

    /**
     * Determine whether the user can restore any model.
     */
    public function restoreAny(User $user): bool
    {
        return $user->can('restore any brands');
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Brand $brand): bool
    {
        return $user->can('force delete brands');
    }

    /**
     * Determine whether the user can permanently delete any model.
     */
    public function forceDeleteAny(User $user, Brand $brand): bool
    {
        return $user->can('force delete any brands');
    }
}
