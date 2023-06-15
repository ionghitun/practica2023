<?php

namespace App\Services;

use App\Enums\UserStatusEnum;
use App\Models\Currency;
use App\Models\Language;
use App\Models\SiteOption;
use App\Models\User;
use App\Models\UserToken;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 *
 */
class UserService
{
    /**
     * @param $userId
     * @param $type
     * @param Carbon|null $expiresAt
     * @return string
     */
    public static function generateRequestToken($userId, $type, Carbon $expiresAt = null): string
    {
        $userToken = new UserToken();
        $userToken->user_id = $userId;
        $userToken->token = Str::random();
        $userToken->type = $type;
        $userToken->expires_at = $expiresAt;
        $userToken->save();

        return $userToken->token;
    }

    /**
     * @param User $user
     * @param bool $rememberMe
     * @return array
     */
    public static function loginResponse(User $user, bool $rememberMe = false): array
    {
        $token = $user->createToken('front', expiresAt: Carbon::now()->addHours(12));

        if ($rememberMe) {
            $user->remember_token = Str::random(60);
        }

        $user->save();

        $data = [
            'user' => $user->toArray(),
            'token' => $token->plainTextToken
        ];

        if ($rememberMe) {
            $data['remember_token'] = $user->remember_token;
        }


        return $data;
    }
}
