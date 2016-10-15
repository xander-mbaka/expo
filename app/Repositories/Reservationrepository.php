<?php

namespace App\Repositories;

use App\Event;
use App\Reservation;

class ReservationRepository
{
    /**
     * Get all of the tasks for a given user.
     *
     * @param  User  $user
     * @return Collection
     */
    public function forEvent(Event $event)
    {
        return Reservation::where('event_id', $event->id)
                    ->orderBy('created_at', 'asc')
                    ->get();
    }
}
