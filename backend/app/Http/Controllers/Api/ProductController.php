<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 *
 */
class ProductController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        try {
            $products = Product::with('category')->get();

            return $this->sendSuccess($products);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function getProduct($id): JsonResponse
    {
        try {
            $product = Product::with(['category', 'productImages'])->where('id', $id)->first();

            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }

            return $this->sendSuccess($product->toArray());
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function addProduct(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'category_id' => 'required|exists:categories,id',
                'name' => ['required', 'min:3'],
                'description' => 'required|min:10',
                'price' => 'required|numeric',
                'stock' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $product = new Product();
            $product->category_id = $request->get('category_id');
            $product->name = $request->get('name');
            $product->description = $request->get('description');
            $product->price = $request->get('price');
            $product->stock = $request->get('stock');
            $product->save();

            return $this->sendSuccess($product->toArray());
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function saveProductImages(Request $request, $id): JsonResponse
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'images' => 'required|array',
                'images.*' => 'required|image',
                'deleted_images' => 'nullable|array',
                'deleted_images.*' => 'exists:product_images,id'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $deletedImages = $request->get('deleted_images', []);

            foreach ($deletedImages as $deletedImage) {
                $productImage = ProductImage::where('id', $deletedImage)
                    ->where('product_id', $product->id)
                    ->first();

                if ($productImage) {
                    Storage::delete($productImage->path);
                    $productImage->delete();
                }
            }

            /** @var UploadedFile $requestImage */
            foreach ($request->file('images') as $requestImage) {
                $path = $requestImage->store('products/' . $product->id);

                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->path = $path;
                $productImage->save();
            }

            return $this->sendSuccess(null, Response::HTTP_CREATED);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @param $id
     * @return JsonResponse
     */
    public function editProduct(Request $request, $id): JsonResponse
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'category_id' => 'required|exists:categories,id',
                'name' => ['required', 'min:3'],
                'description' => 'required|min:10',
                'price' => 'required|numeric',
                'stock' => 'required|integer'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $product->category_id = $request->get('category_id');
            $product->name = $request->get('name');
            $product->description = $request->get('description');
            $product->price = $request->get('price');
            $product->stock = $request->get('stock');
            $product->save();

            return $this->sendSuccess($product->toArray());
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function deleteProduct($id): JsonResponse
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }

            DB::beginTransaction();

            foreach ($product->productImages as $productImage) {
                Storage::delete($productImage->path);
                $productImage->delete();
            }
            $product->delete();

            DB::commit();

            return $this->sendSuccess(null, Response::HTTP_NO_CONTENT);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function searchProducts(Request $request): JsonResponse
    {
        try {
            //For page number in request param 'page'
            $perPage = $request->get('per_page', 6);
            $sortColumn = $request->get('sort_by', 'id');
            $sortOrder = $request->get('sort_order', 'ASC');
            $categoryId = $request->get('category');
            $stock = $request->get('stock');
            $search = $request->get('search');

            //Filter stock
            // 0 -> <10
            // 1 -> 10-50
            // 2 -> >50

            function getAllChildCategoryIds($categoryId) {
                $childCategoryIds = [$categoryId];
    
                $childCategories = Category::where('parent_id', $categoryId)->get();
    
                foreach ($childCategories as $childCategory) {
                    $childCategoryIds = array_merge($childCategoryIds, getAllChildCategoryIds($childCategory->id));
                }
    
                return $childCategoryIds;
            }  
            $categoryIds = getAllChildCategoryIds($categoryId);


            $products = Product::with(['category', 'productImages'])
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'LIKE', '%' . $search . '%')
                            ->orWhere('description', 'LIKE', '%' . $search . '%');
                    });
                })->whereIn('category_id', $categoryIds) 
                  ->when(in_array($stock, ["0", "1", "2"], true), function ($query) use ($stock) {
                    if ($stock === "0") {
                        $query->where('stock', '<', 10);
                    } elseif ($stock === "1") {
                        $query->where('stock', '>=', 10)->where('stock', '<=', 50);
                    } else {
                        $query->where('stock', '>', 50);
                    }
                })->orderBy($sortColumn, $sortOrder)
                ->paginate($perPage);

            return $this->sendSuccess($products);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
