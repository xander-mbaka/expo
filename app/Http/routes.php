<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['middleware' => ['web']], function () {

    Route::get('/', 'ApplicationController@index');

    Route::get('/locations', 'ApplicationController@locations');
    Route::get('/location/{location}', 'ApplicationController@location');
    Route::get('/location/{location}/events', 'ApplicationController@events');
    Route::get('/event/{event}', 'ApplicationController@event');
    Route::get('/event/{event}/reservations', 'ApplicationController@reservations');
    Route::post('/reservation', 'ApplicationController@store_reservation');
    Route::delete('/reservation/{reservation}', 'ApplicationController@destroy_reservation');

    //Route::auth();

});