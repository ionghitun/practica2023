<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller as BaseController;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 *
 */
class Controller extends BaseController
{
    /**
     * @param $data
     * @param int $responseCode
     * @return JsonResponse
     */
    protected function sendSuccess($data, int $responseCode = Response::HTTP_OK): JsonResponse
    {
        $response = [
            'success' => true,
            'data' => $data,
            'errors' => []
        ];

        return response()->json($response, $responseCode);
    }

    /**
     * @param array $errors
     * @param int $responseCode
     * @param array|null $data
     * @return JsonResponse
     */
    protected function sendError(array $errors, int $responseCode = Response::HTTP_BAD_REQUEST, array $data = null): JsonResponse
    {
        $response = [
            'success' => false,
            'data' => $data,
            'errors' => $errors
        ];

        return response()->json($response, $responseCode);
    }
}
