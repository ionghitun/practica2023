<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
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
            $products = Product::query()->with('category')->get();

            return $this->sendSuccess($products);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function listOne($id): JsonResponse
    {
        try {
            $product = Product::query()->with('category')->find($id);
    
            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }
    
            return $this->sendSuccess($product);
        } catch (Throwable $exception) {
            Log::error($exception);
    
            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    /**
     * Add a new product.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function addProduct(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'category_id' => 'required|exists:categories,id',
                'name' => 'required|min:3',
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

            return $this->sendSuccess($product->toArray(), Response::HTTP_CREATED);
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
                'images' => 'required|array',
                'images.*' => 'required|image'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            /** @var UploadedFile $requestImage */
            foreach ($request->file('images') as $requestImage) {
                $path = $requestImage->store('products/');

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
    public function getProductImages($id): JsonResponse
    {
        try {
            $product = Product::query()->find($id);

            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }

            $images = ProductImage::query()
                ->where('product_id', $product->id)
                ->get();

            return $this->sendSuccess($images);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function editProductImages(Request $request, $id): JsonResponse
    {
        try {
            $product = Product::find($id);
    
            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }
    
            $validator = Validator::make($request->all(), [
                'images' => 'required|array',
                'images.*' => 'required|image'
            ]);
    
            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }
    
            $existingImages = ProductImage::where('product_id', $product->id)->get();
    
            foreach ($existingImages as $existingImage) {
                $path = $existingImage->path;
                $existingImage->delete();
    
                if (Storage::exists($path)) {
                    Storage::delete($path);
                }
            }
    

            /** @var UploadedFile $requestImage */
            foreach ($request->file('images') as $requestImage) {
                $path = $requestImage->store('products/');
    
                $productImage = new ProductImage();
                $productImage->product_id = $product->id;
                $productImage->path = $path;
                $productImage->save();
            }
    
            return $this->sendSuccess(null, Response::HTTP_NO_CONTENT);
        } catch (Throwable $exception) {
            Log::error($exception);
    
            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }


    public function deleteProductImages(Request $request, int $id): JsonResponse
    {
        try {
            $product = Product::find($id);
    
            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }
    
            $validator = Validator::make($request->all(), [
                'image_ids' => 'required|array',
                'image_ids.*' => 'required|exists:product_images,id'
            ]);
    
            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }
    
            $imageIds = $request->input('image_ids');
            $deletedCount = 0;
    
            foreach ($imageIds as $imageId) {
                $productImage = ProductImage::find($imageId);
    
                if (!$productImage) {
                    continue;
                }
    
                $path = $productImage->path;
                $productImage->delete();
    
                if (Storage::exists($path)) {
                    Storage::delete($path);
                }
    
                $deletedCount++;
            }
    
            return $this->sendSuccess(['deleted_count' => $deletedCount]);
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
    public function editProduct(Request $request, int $id): JsonResponse
{
    try {
        $validator = Validator::make($request->all(), [
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|min:3',
            'description' => 'required|min:10',
            'price' => 'required|numeric',
            'stock' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->messages()->toArray());
        }

        $product = Product::find($id);

        if (!$product) {
            return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
        }

        $product->category_id = $request->input('category_id');
        $product->name = $request->input('name');
        $product->description = $request->input('description');
        $product->price = $request->input('price');
        $product->stock = $request->input('stock');
        $product->save();

        return $this->sendSuccess($product->toArray());
    } catch (Throwable $exception) {
        Log::error($exception);

        return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
    }
    public function deleteProduct(int $id): JsonResponse
    {
        try {
            $product = Product::find($id);
    
            if (!$product) {
                return $this->sendError(['Product not found'], Response::HTTP_NOT_FOUND);
            }
    
            $productImages = ProductImage::where('product_id', $product->id)->get();
    
            foreach ($productImages as $productImage) {
                $path = $productImage->path;
                $productImage->delete();
    
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
}
