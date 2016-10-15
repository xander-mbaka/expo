<?php

namespace App;

use App\Event;
use App\Stall;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    //
    protected $fillable = [
        'event_id', 'stall_id', 'company', 'address', 'contact_person', 'contact_email', 'website', 'logo_url', 'marketing_url', 'amount'
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function stall()
    {
        return $this->belongsTo(Stall::class);
    }
}
