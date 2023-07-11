<?php

namespace App\Http\Controllers\Api;

use App\Enums\UserTokenTypeEnum;
use App\Enums\UserTypeEnum;
use App\Models\User;
use App\Models\UserToken;
use App\Notifications\ForgotPassword;
use App\Notifications\VerifyEmail;
use App\Services\UserService;
use Illuminate\Auth\Passwords\PasswordBroker;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 *
 */
class AuthController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            /** @var User $user */
            $user = User::where('email', $request->get('email'))->first();
            if (!$user || !Hash::check($request->get('password'), $user->password)) {
                return $this->sendError(['Invalid credentials!']);
            }

            if (!$user->email_verified_at) {
                return $this->sendError(['Email address in not verified!'], Response::HTTP_NOT_ACCEPTABLE);
            }

            DB::beginTransaction();

            $response = UserService::loginResponse($user, $request->has('remember_me'));

            DB::commit();

            return $this->sendSuccess($response);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function loginWithToken(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'remember_token' => 'required'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $user = User::where('remember_token', $request->get('remember_token'))
                ->where('last_login_at', '>', Carbon::now()->subDays(14))
                ->first();

            if (!$user) {
                return $this->sendError(['Token expired. Please login again!'], Response::HTTP_UNAUTHORIZED);
            }

            DB::beginTransaction();

            $response = UserService::loginResponse($user);

            DB::commit();

            return $this->sendSuccess($response);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'min:3'],
                'email' => ['required', 'email', 'unique:users,email'],
                'password' => ['required', 'min:6'],
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $user = new User();
            $user->name = $request->get('name');
            $user->email = $request->get('email');
            $user->password = Hash::make($request->get('password'));
            $user->type = UserTypeEnum::Customer->value;
            $user->save();

            $userRequestToken = new UserToken();
            $userRequestToken->user_id = $user->id;
            $userRequestToken->type = UserTokenTypeEnum::VerifyEmail;
            $userRequestToken->token = Str::random(60);

            $userRequestToken->save();

            $user->notify(new VerifyEmail($user->email, $userRequestToken->token));

            return $this->sendSuccess(['Registration successful, verify email sent!']);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function verifyEmail(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'hash' => 'required',
                'token' => 'required'
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $email = decrypt($request->get('hash'));
            $token = decrypt($request->get('token'));

            $user = User::where("email", $email)->first();
            $userRequestToken = UserToken::where('token', $token)->where('type', UserTokenTypeEnum::VerifyEmail)->first();

            if (!$user || !$userRequestToken) {
                return $this->sendError(['Invalid token. Verify your email or generate a new one!']);
            }

            if ($user->email_verified_at) {
                return $this->sendError(['Email is already verified, you can login!'], Response::HTTP_NOT_ACCEPTABLE);
            }

            DB::beginTransaction();

            $user->email_verified_at = now();
            $user->save();

            $userRequestToken->delete();

            DB::commit();

            return $this->sendSuccess(['Email successfully verified, you can login now!']);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function resendVerifyEmail(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => ['required', 'email'],
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $user = User::where("email", $request->get("email"))->first();

            if (!$user->email_verified_at) {
                $userRequestToken = UserToken::where('user_id', $user->id)->where('type', UserTokenTypeEnum::VerifyEmail)->first();

                $user->notify(new VerifyEmail($user->email, $userRequestToken->token));
            }

            return $this->sendSuccess(['Verification email resent!']);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function forgotPassword(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => ['required', 'email']
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            /** @var User $user */
            $user = User::where("email", $request->get("email"))->first();

            if ($user) {
                DB::beginTransaction();

                $passwordBroker = app(PasswordBroker::class);

                $token = $passwordBroker->createToken($user);

                $user->notify(new ForgotPassword($user->email, $token));

                DB::commit();
            }

            return $this->sendSuccess(['Reset password email sent!']);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function changePassword(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'hash' => 'required',
                'token' => 'required',
                'password' => [
                    'required',
                    Password::min(8)->letters()->mixedCase()->numbers()->symbols()
                ]
            ]);

            if ($validator->fails()) {
                return $this->sendError($validator->messages()->toArray());
            }

            $email = decrypt($request->get('hash'));
            $token = decrypt($request->get('token'));
            $password = $request->get('password');

            /** @var User $user */
            $user = User::where('email', $email)->first();
            $passwordBroker = app(PasswordBroker::class);

            if (!$user || !$passwordBroker->tokenExists($user, $token)) {
                return $this->sendError(['Invalid password token!']);
            }

            DB::beginTransaction();

            $user->password = Hash::make($password);
            $user->save();

            $passwordBroker->deleteToken($user);

            DB::commit();

            return $this->sendSuccess(['Password changed!']);
        } catch (Throwable $exception) {
            Log::error($exception);

            return $this->sendError([], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
