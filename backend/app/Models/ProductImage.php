<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 *
 */
class ProductImage extends Model
{
    use HasFactory;

    /**
     * @var array
     */
    protected $hidden = [
        'created_at',
        'updated_at',
        'path'
    ];

    /** @var array */
    protected $appends = [
        'image_url',
    ];

    /**
     * @return BelongsTo
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * @return Attribute
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn() => Storage::url($this->path)
        );
    }
}
