<?php

namespace App\Services;

use App\Models\Category;

/**
 *
 */
class CategoryService
{
    /**
     * @param Category $category
     * @return array
     */
    public static function buildCategoryTree(Category $category): array
    {
        $data = $category->attributesToArray();

        if (count($category->subCategories)) {
            foreach ($category->subCategories as $subCategory) {
                $data['subCategories'][] = self::buildCategoryTree($subCategory);
            }
        }

        return $data;
    }
}
