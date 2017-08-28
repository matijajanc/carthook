<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    protected $guarded = [];

    public function teams() {
        return $this->belongsToMany(Team::class);
    }

    public function seasons() {
        return $this->belongsToMany(Season::class);
    }
}
