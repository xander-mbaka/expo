<?php

namespace App;

use App\Location;
use App\Reservation;

use Illuminate\Database\Eloquent\Model;

class Stall extends Model
{
    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
