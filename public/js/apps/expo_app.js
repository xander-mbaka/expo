define(["app", "apps/controllers/expo_controller"], function(System, showController){
  System.module('ExpoApp', function(ExpoApp, System, Backbone, Marionette, $, _){

    ExpoApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "home" : "showLocations",
        "events/:location" : "showEvents",
        "event/:event/reservations" : "showReservations",
        "registration/:reservation" : "showRegistration",
        //"stall/:stall/:event" : "showStall"
      }
    });

    System.on("locations:show", function(){
      System.navigate("home");
      showController.showLocations();
    });

    System.on("location:events:show", function(lid){
      System.navigate("events/"+lid);
      showController.showEvents(lid);
    });

    System.on("event:reservations:show", function(eid, location){
      System.navigate("event/"+eid+'/reservations');
      showController.showReservations(eid, location);
    });

    System.addInitializer(function(){
      new ExpoApp.Router({
        controller: showController
      });
    });
  });

  return System.ExpoApp;
});

