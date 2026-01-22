<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
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

        $vendor2 = User::factory()
            ->create([
                'email' => 'vendor2@example.com',
            ]);

        $vendor2->assignRole('vendor');

        $vendor = User::factory()
            ->create([
                'email' => 'vendor@example.com',
            ]);

        $vendor->assignRole('vendor');

        Brand::factory(10)
            ->create([
                'vendor_id' => $vendor->id,
            ]);

        Category::factory(10)
            ->create([
                'vendor_id' => $vendor->id,
            ]);

        Product::factory(10)
            ->create([
                'vendor_id' => $vendor->id,
                'brand_id' => 'brand-123',
            ])
            ->each(function ($product) {
                $product->categories()->attach(Category::get()->random(rand(1, 3)));
                $product->update([
                    'brand_id' => Brand::get()->random(1)->first()->id,
                ]);
            });
    }
}
