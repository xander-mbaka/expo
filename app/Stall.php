<?php

namespace App;

use App\Hall;

use Illuminate\Database\Eloquent\Model;

class Stall extends Model
{
    //
    protected $fillable = [
        'name', 'price', 'image_url', 'path'
    ];

    public function hall()
    {
        return $this->belongsTo(Hall::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
