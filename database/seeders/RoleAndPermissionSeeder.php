<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create brand permissions
        Permission::create(['name' => 'manage brands']);
        Permission::create(['name' => 'view brands']);
        Permission::create(['name' => 'create brands']);
        Permission::create(['name' => 'update brands']);
        Permission::create(['name' => 'delete brands']);
        Permission::create(['name' => 'delete any brands']);
        Permission::create(['name' => 'restore brands']);
        Permission::create(['name' => 'restore any brands']);
        Permission::create(['name' => 'force delete brands']);
        Permission::create(['name' => 'force delete any brands']);

        // create category permissions
        Permission::create(['name' => 'manage categories']);
        Permission::create(['name' => 'view categories']);
        Permission::create(['name' => 'create categories']);
        Permission::create(['name' => 'update categories']);
        Permission::create(['name' => 'delete categories']);
        Permission::create(['name' => 'delete any categories']);
        Permission::create(['name' => 'restore categories']);
        Permission::create(['name' => 'restore any categories']);
        Permission::create(['name' => 'force delete categories']);
        Permission::create(['name' => 'force delete any categories']);

        // create product permissions
        Permission::create(['name' => 'manage products']);
        Permission::create(['name' => 'view products']);
        Permission::create(['name' => 'create products']);
        Permission::create(['name' => 'update products']);
        Permission::create(['name' => 'delete products']);
        Permission::create(['name' => 'delete any products']);
        Permission::create(['name' => 'restore products']);
        Permission::create(['name' => 'restore any products']);
        Permission::create(['name' => 'force delete products']);
        Permission::create(['name' => 'force delete any products']);

        // create role permissions
        Permission::create(['name' => 'manage roles']);
        Permission::create(['name' => 'view roles']);
        Permission::create(['name' => 'create roles']);
        Permission::create(['name' => 'update roles']);
        Permission::create(['name' => 'delete roles']);
        Permission::create(['name' => 'delete any roles']);
        Permission::create(['name' => 'restore roles']);
        Permission::create(['name' => 'restore any roles']);
        Permission::create(['name' => 'force delete roles']);
        Permission::create(['name' => 'force delete any roles']);

        // create permission permissions
        Permission::create(['name' => 'manage permissions']);
        Permission::create(['name' => 'view permissions']);
        Permission::create(['name' => 'create permissions']);
        Permission::create(['name' => 'update permissions']);
        Permission::create(['name' => 'delete permissions']);
        Permission::create(['name' => 'delete any permissions']);
        Permission::create(['name' => 'restore permissions']);
        Permission::create(['name' => 'restore any permissions']);
        Permission::create(['name' => 'force delete permissions']);
        Permission::create(['name' => 'force delete any permissions']);

        Permission::create(['name' => 'monitor application health']);

        // update cache to know about the newly created permissions (required if using WithoutModelEvents in seeders)
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // create roles and assign created permissions
        $adminRole = Role::create(['name' => 'system admin']);
        $adminRole->givePermissionTo(Permission::all());

        $vendorRole = Role::create(['name' => 'vendor']);
        $vendorRole->givePermissionTo([
            'manage brands',
            'view brands',
            'create brands',
            'update brands',
            'delete brands',
            'delete any brands',
            'restore brands',
            'restore any brands',
            'force delete brands',
            'force delete any brands',

            'manage categories',
            'view categories',
            'create categories',
            'update categories',
            'delete categories',
            'delete any categories',
            'restore categories',
            'restore any categories',
            'force delete categories',
            'force delete any categories',

            'manage products',
            'view products',
            'create products',
            'update products',
            'delete products',
            'delete any products',
            'restore products',
            'restore any products',
            'force delete products',
            'force delete any products',
        ]);
    }
}
