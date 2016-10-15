<?php

namespace App;

use App\Event;
use App\Hall;

use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    //
    protected $fillable = [
        'name', 'path', 'color'
    ];

    public function events()
    {
        return $this->hasMany(Event::class);
    }

    public function hall()
    {
        return $this->hasMany(Hall::class);
    }
}
