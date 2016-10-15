<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReservationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('event_id');
            $table->integer('stall_id');
            $table->string('company');
            $table->string('address');
            $table->string('contact_person');
            $table->string('contact_email');
            $table->string('website');
            $table->string('logo_url');
            $table->string('marketing_url');
            $table->decimal('amount', 11, 2);
            $table->integer('status', 1);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('reservations');
    }
}
