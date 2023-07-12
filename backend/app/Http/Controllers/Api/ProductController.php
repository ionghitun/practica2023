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
            $products = Product::all();

            return $this->sendSuccess($products);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
//
//    /**
//     * @param Request $request
//     * @return JsonResponse
//     */
//    public function addCategory(Request $request): JsonResponse
//    {
//        try {
//            $validator = Validator::make($request->all(), [
//                'name' => ['required', 'min:3']
//            ]);
//
//            if ($validator->fails()) {
//                return $this->sendError($validator->messages()->toArray());
//            }
//
//            $category = new Category();
//            $category->name = $request->get('name');
//            $category->save();
//
//            return $this->sendSuccess(null, Response::HTTP_CREATED);
//        } catch (Throwable $exception) {
//            Log::error($exception);
//
//            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
//        }
//    }
//

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
                'price' => 'required|decimal',
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
//
//    /**
//     * @param $id
//     * @return JsonResponse
//     */
//    public function deleteCategory($id): JsonResponse
//    {
//        try {
//            $category = Category::find($id);
//
//            if (!$category) {
//                return $this->sendError(['Category not found'], Response::HTTP_NOT_FOUND);
//            }
//
//            $category->delete();
//
//            return $this->sendSuccess(null, Response::HTTP_NO_CONTENT);
//        } catch (Throwable $exception) {
//            Log::error($exception);
//
//            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
//        }
//    }
}
