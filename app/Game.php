<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $guarded = [];

    public function players()
    {
        return $this->belongsToMany(Player::class);
    }
}
