<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(RoleAndPermissionSeeder::class);

        $systemAdmin = User::factory()->create([
            'name' => 'System Administrator',
            'email' => 'system@admin.com',
        ]);

        $systemAdmin->assignRole('system admin');

        $vendor = User::factory()->create([
            'email' => 'vendor@example.com',
        ]);

        $vendor->assignRole('vendor');

        Product::factory()
            ->count(10)
            ->has(Category::factory()->count(rand(1, 3)))
            ->create();
    }
}
