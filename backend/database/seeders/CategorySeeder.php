<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = new Category();
        $category->name = 'Category 1';
        $category->save();

        $category = new Category();
        $category->name = 'Category 2';
        $category->save();

        $category = new Category();
        $category->name = 'Category 3';
        $category->save();

        $category = new Category();
        $category->name = 'Category 4';
        $category->save();

        $category = new Category();
        $category->name = 'Category 5';
        $category->save();
    }
}
