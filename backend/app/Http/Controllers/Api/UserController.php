<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Storage;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 *
 */
class UserController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function getUser(): JsonResponse
    {
        try {
            /** @var User $user */
            $user = Auth::user();

            return $this->sendSuccess($user->toArray());
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            /** @var User $user */
            $user = Auth::user();

            DB::beginTransaction();

            $user->currentAccessToken()->delete();

            DB::commit();

            return $this->sendSuccess(['Logout successful!']);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function deleteUser($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return $this->sendError(['User not found'], Response::HTTP_NOT_FOUND);
            }

            DB::beginTransaction();
            $avatar = $user->avatar;

            if ($avatar) {
                $path = $avatar;
                $avatar->delete();

                if (Storage::exists($path)) {
                    Storage::delete($path);
                }
            }

            $user->delete();
            DB::commit();

            return $this->sendSuccess(null, Response::HTTP_NO_CONTENT);
        } catch (Throwable $exception) {
            Log::error($exception);
            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
