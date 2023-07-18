<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::factory(3)->create();;

        foreach ($categories as $parentCategory) {
            $childCategories = Category::factory(5)->create([
                'parent_id' => $parentCategory->id,
            ]);

            foreach ($childCategories as $childCategory) {
                Category::factory(8)->create([
                    'parent_id' => $childCategory->id,
                ]);
            }
        }
    }
}
