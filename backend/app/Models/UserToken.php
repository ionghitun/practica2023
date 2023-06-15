<?php

namespace App\Models;

use App\Enums\UserTokenTypeEnum;
use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * App\Models\UserToken
 *
 * @property int $id
 * @property int $user_id
 * @property string $token
 * @property UserTokenTypeEnum $type
 * @property Carbon|null $expires_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read User $user
 * @method static Builder|UserToken newModelQuery()
 * @method static Builder|UserToken newQuery()
 * @method static Builder|UserToken query()
 * @method static Builder|UserToken whereCreatedAt($value)
 * @method static Builder|UserToken whereExpiresAt($value)
 * @method static Builder|UserToken whereId($value)
 * @method static Builder|UserToken whereToken($value)
 * @method static Builder|UserToken whereType($value)
 * @method static Builder|UserToken whereUpdatedAt($value)
 * @method static Builder|UserToken whereUserId($value)
 * @mixin Eloquent
 */
class UserToken extends BaseModel
{
    use HasTimestamps;

    /**
     * @var array
     */
    protected $hidden = [
        'token',
        'expires_at',
        'created_at',
        'updated_at'
    ];

    /**
     * @var array
     */
    protected $casts = [
        'expires_at' => 'datetime',
        'type' => UserTokenTypeEnum::class,
    ];

    /**
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
