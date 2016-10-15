<?php

namespace App;

use App\Event;
use App\Stall;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    protected $fillable = [
        'name', 'path', 'hall_path', 'color', 'img_url'
    ];

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function stalls()
    {
        return $this->hasMany(Stall::class);
    }
}
