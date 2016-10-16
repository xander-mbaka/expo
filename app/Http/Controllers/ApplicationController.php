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

    public function index(Request $request)
    {
        return view('layouts.index');
    }

    public function reservation(Request $request, $rid)
    {
        $reservation = Reservation::where('id', $rid)->first();

        $reservation->event;
        $reservation->event->location;
        $reservation->stall;

        return response()->json($reservation);
    }


    public function event_reservations(Request $request, $eid)
    {
        $event = Event::find($eid);
        $reservations = $event->reservations;

        foreach ($reservations as &$reservation) {
            $reservation->stall;
        }

        return response()->json($reservations);
    }

    public function event(Request $request, $id)
    {
        $event = Event::where('id', $id)->first();

        $event->location;

        return response()->json($event);
    }

    public function events(Request $request, $loc)
    {
        $events = Location::find($loc)->events()->whereDate('end_at', '>', date('Y-m-d'))->get();
        //$events = DB::table('events')->whereDate('end_at', '>', date('Y-m-d'))->andWhere('end_at', '=', date('Y-m-d'))->get();

        return response()->json($events);
    }

    /*public function events(Request $request, Location $loc)
    {
        //$events = Event::orderBy('created_at', 'asc')->get();
        $events = DB::table('events')
            ->whereDate('end_at', '>', date('Y-m-d'))
            ->get();

        return view('events.index', [
            'events' => $events
        ]);
    }*/

    public function location(Request $request, $id)
    {
        $location = location::where('id', $id)->first();

        return response()->json($location);
    }

    public function locations(Request $request)
    {
        $locations = location::orderBy('created_at', 'asc')->get();


        foreach ($locations as &$location) {
            $c = count($location->events);
        }

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
            'id' => 'required|max:10',
            'company' => 'required|max:255',
            'address' => 'required|max:255',
            'person' => 'required|max:255',
            'email' => 'required|email|max:255',
            //'phone' => 'required|max:255',
            'logo' => 'required|max:255',
            //'marketing_url' => 'required|max:255',
            'amount' => 'required|max:13',
        ]);

        $reservation = Reservation::where('id', $request->id)->first();
        $reservation->company = $request->company;
        $reservation->address = $request->address;
        $reservation->contact_person = $request->person;
        $reservation->contact_email = $request->email;
        $reservation->website = $request->website;
        $reservation->logo_url = $request->logo;
        //$reservation->marketing_url = $request->marketing_url;
        $reservation->amount = $request->amount;
        $reservation->status = 1;
        $reservation->save();

        return response()->json(array('response'=> 'success'), 200);//redirect('/reservation/'.$reservation->id);
    }

    /**
     * Destroy the given task.
     *
     * @param  Request  $request
     * @param  Task  $task
     * @return Response
     */
    public function destroy_reservation(Request $request, $rid)
    {
        //$this->authorize('destroy', $reservation);

        $reservation->delete();

        return redirect('/event/'.$reservation->event->id);
    }

    public function upload_logo(Request $request) {
        if($request->hasFile('logo')) {
          //upload an image to the /img/tmp directory and return the filepath.
          $file = $request->file('logo');
          $tmpFilePath = 'image/logos/';
          $tmpFileName = $file->getClientOriginalName();
          $file = $file->move(public_path() .'/'. $tmpFilePath, $tmpFileName);
          $path = $tmpFilePath . $tmpFileName;
          return response()->json(array('path'=> $path), 200);
        } else {
          return response()->json(false, 200);
        }
    }

    public function upload_document(Request $request) {
        if($request->hasFile('document')) {
          //upload an image to the /img/tmp directory and return the filepath.
          $file = $request->file('document');
          $tmpFilePath = 'image/docs/';
          $tmpFileName = $file->getClientOriginalName();//time() . '-' . 
          $file = $file->move(public_path() . $tmpFilePath, $tmpFileName);
          $path = $tmpFilePath . $tmpFileName;
          return response()->json(array('path'=> $path), 200);
        } else {
          return response()->json(false, 200);
        }
    }
}
