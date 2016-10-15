<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Routing\ResponseFactory;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use App\Reservation;
use App\Event;
use App\Location;
use DB;
use App\Repositories\ReservationRepository;

class ApplicationController extends Controller
{
    /**
     * The task repository instance.
     *
     * @var TaskRepository
     */
    protected $reservations;

    /**
     * Create a new controller instance.
     *
     * @param  TaskRepository  $reservations
     * @return void
     */
    public function __construct(ReservationRepository $reservations)
    {
        $this->reservations = $reservations;
    }

    /**
     * Display a list of all of the user's task.
     *
     * @param  Request  $request
     * @return Response
     */

    /*public function index(Request $request)
    {
        $locations = location::orderBy('created_at', 'asc')->get();

        return view('locations', [
            'locations' => $locations,
        ]);
    }*/

    public function index(Request $request)
    {
        return view('layouts.index');
    }


    public function reservations(Request $request, Event $event)
    {
        return view('reservations.index', [
            'reservations' => $this->reservations->forEvent($event),
        ]);
    }

    public function events(Request $request)
    {
        //$events = Event::orderBy('created_at', 'asc')->get();
        $events = DB::table('events')
            ->whereDate('end_at', '>', date('Y-m-d'))
            ->get();

        return view('events.index', [
            'events' => $events
        ]);
    }

    public function locations(Request $request)
    {
        //$events = Event::orderBy('created_at', 'asc')->get();
        $locations = location::orderBy('created_at', 'asc')->get();

        return response()->json($locations);
    }

    /**
     * Create a new task.
     *
     * @param  Request  $request
     * @return Response
     */
    public function store_reservation(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:255',
            'event_id' => 'required|max:11',
            'stall_id' => 'required|max:11',
            'company' => 'required|max:255',
            'address' => 'required|max:255',
            'contact_person' => 'required|max:255',
            'contact_email' => 'required|email|max:255',
            'logo_url' => 'required|max:255',
            'marketing_url' => 'required|max:255',
            'amount' => 'required|max:13',
        ]);

        $reservation = new Reservation;
        $reservation->name = $request->name;
        $reservation->stall_id = $request->stall_id;
        $reservation->event_id = $request->event_id;
        $reservation->company = $request->company;
        $reservation->address = $request->address;
        $reservation->contact_person = $request->contact_person;
        $reservation->contact_email = $request->contact_email;
        $reservation->website = $request->website;
        $reservation->logo_url = $request->logo_url;
        $reservation->marketing_url = $request->marketing_url;
        $reservation->amount = $request->amount;
        $reservation->save();

        return redirect('/reservation/'.$reservation->id);
    }

    /**
     * Destroy the given task.
     *
     * @param  Request  $request
     * @param  Task  $task
     * @return Response
     */
    public function destroy_reservation(Request $request, Reservation $reservation)
    {
        //$this->authorize('destroy', $reservation);

        $reservation->delete();

        return redirect('/event/'.$reservation->event->id);
    }
}
