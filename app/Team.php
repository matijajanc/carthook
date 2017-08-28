<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    protected $guarded = [];

    public function players()
    {
        return $this->belongsToMany(Player::class);
    }

    public function seasons()
    {
        return $this->belongsToMany(Season::class);
    }
}
