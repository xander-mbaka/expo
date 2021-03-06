<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStallsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stalls', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->decimal('price', 11, 2);
            $table->string('image_url');
            $table->integer('location_id');
            $table->longText('path');
            $table->decimal('sq_feet', 11, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('stalls');
    }
}
