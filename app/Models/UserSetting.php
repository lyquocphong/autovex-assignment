<?php

namespace App\Models;

use App\Cast\JsonValue;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSetting extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     * 
     * Laravel can auto use the plurals snakecase of class name
     * but I put here for more clear for others
     *
     * @var string
     */
    protected $table = 'user_settings';

    const DEFAULT_CLOCK_SETTING = ['hour' => 10, 'minute' => 10];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'value' => JsonValue::class,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'value',
    ];

    /**
     * Get the user that owns the comment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
    
}
