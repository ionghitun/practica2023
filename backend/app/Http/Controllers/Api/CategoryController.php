<?php

namespace App\Http\Controllers\Api;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 *
 */
class CategoryController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function list(): JsonResponse
    {
        try {
            $categories = Category::all();

            return $this->sendSuccess($categories);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @return JsonResponse
     */
    public function addCategory(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'min:3']
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $category = new Category();
            $category->name = $request->get('name');
            $category->save();

            return $this->sendSuccess(null, Response::HTTP_CREATED);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
