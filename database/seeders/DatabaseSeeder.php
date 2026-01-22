<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Customer;
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
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'System Administrator',
            'email' => 'system@admin.com',
        ]);

        Customer::factory()->create([
            'email' => 'test@example.com',
        ]);

        Product::factory()
            ->count(10)
            ->has(Category::factory()->count(rand(1, 3)))
            ->create();
    }
}
