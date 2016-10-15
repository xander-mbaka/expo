<?php

namespace App;

use App\Location;
use App\Reservation;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    protected $fillable = [
        'name', 'description', 'begin_at', 'end_at'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }

}
