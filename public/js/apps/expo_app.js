define(["app", "apps/controllers/expo_controller"], function(System, showController){
  System.module('ExpoApp', function(ExpoApp, System, Backbone, Marionette, $, _){

    ExpoApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "/" : "showLocations",
        //"events/:location" : "showEvents",
        //"reservations/:event" : "showReservations",
        //"stall/:stall/:event" : "showStall"
      }
    });

    System.on("locations:show", function(){
      System.navigate("/");
      showController.showLocations();
    });

    System.addInitializer(function(){
      new ExpoApp.Router({
        controller: showController
      });
    });
  });

  return System.ExpoApp;
});

