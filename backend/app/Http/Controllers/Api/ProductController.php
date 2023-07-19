<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Throwable;
use Storage;

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
            $products = Product::query()->with('category')->get();

            return $this->sendSuccess($products);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getById($id): JsonResponse
    {
        try {
            $product = Product::with('category')->find($id);
            return $this->sendSuccess($product);
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

            return $this->sendSuccess(null, Response::HTTP_CREATED);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function saveProductImages(Request $request, $id): JsonResponse
    {
        try {
            $product = Product::find($id);

            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }

            $validator = Validator::make($request->all(), [
                'images.*' => 'required|image'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }


            /** @var UploadedFile $requestImage */
            $requestImage = $request->file('images');
            $path = $requestImage->store('products');

            $productImage = new ProductImage();
            $productImage->product_id = $product->id;
            $productImage->path = $path;
            $productImage->save();

            return $this->sendSuccess(null, Response::HTTP_CREATED);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getProductImages($id): JsonResponse
    {
        try {
            $product = Product::findOrFail($id);
            $images = $product->productImages;

            $imageUrls = $images->map(function ($image) {
                return ["path" => "/storage/" . ($image->path), "id" => $image->id];
            });

            return $this->sendSuccess($imageUrls);
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

            $productImages = ProductImage::where('product_id', $product->id)->get();

            foreach ($productImages as $image) {
                $path = $image->path;
                $image->delete();

                if (Storage::exists($path)) {
                    Storage::delete($path);
                }
            }

            $product->delete();

            return $this->sendSuccess(null, Response::HTTP_NO_CONTENT);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param $id
     * @return JsonResponse
     */
    public function deleteImage($id): JsonResponse
    {
        try {
            $productImage = ProductImage::find($id);

            if (!$productImage) {
                return $this->sendError(['Product Image not found'], Response::HTTP_NOT_FOUND);
            }
            $path = $productImage->path;
            if (Storage::exists($path)) {
                Storage::delete($path);
            }

            $productImage->delete();

            return $this->sendSuccess(null, Response::HTTP_NO_CONTENT);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function searchProducts(Request $request): JsonResponse
    {
        try {
            $perPage = $request->get('per_page', 6);

            $sortColumn = $request->get('sort_by', 'id');
            $sortOrder = $request->get('sort_order', 'ASC');

            $categoryId = $request->get('category');
            $stock = $request->get('stock');
            $search = $request->get('search');

            $products = Product::with('category')
                ->when($search, function ($query) use ($search) {
                    $query->where(function ($query) use ($search) {
                        $query->where('name', 'LIKE', '%' . $search . '%')
                            ->orWhere('description', 'LIKE', '%' . $search . '%');
                    });
                })->when($categoryId, function ($query) use ($categoryId) {
                    $query->where('category_id', $categoryId);
                })->when(in_array($stock, ["0", "1", "2"], true), function ($query) use ($stock) {
                    if ($stock == "0") {
                        $query->where('stock', '<', 10);
                    } elseif ($stock == "1") {
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
