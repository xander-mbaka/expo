<?php

namespace App;

use App\Location;
use App\Reservation;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //
    protected $fillable = [
        'name', 'description', 'location_id', 'begin_at', 'end_at'
    ];

    protected $casts = [
        'location_id' => 'int',
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
