<?php

namespace App;

use App\Location;
use App\Stall;

use Illuminate\Database\Eloquent\Model;

class Hall extends Model
{
    //
    protected $fillable = [
        'name', 'price', 'stall_no', 'img_url'
    ];

    public function location()
    {
        return $this->belongsTo(Location::class);
    }

    public function stalls()
    {
        return $this->hasMany(Stall::class);
    }
}
