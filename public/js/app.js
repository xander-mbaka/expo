define(["marionette", "sweetalert"], function(Marionette){
  var System = new Marionette.Application();

  window.momentum = System;

  System.coreRoot = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '')+'/';
  System.cache = {};

  var runApplication = function(options) {
    System.trigger("locations:show");
    Backbone.history.start();
  };

  System.addRegions({
    fixedRegion: "#fixed",
    contentRegion: "#container"
  });

  System.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };  

  System.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  System.on("initialize:after", function(){
    if(Backbone.history){
      require([
        "apps/expo_app",
        ], function () {

        runApplication();
        //System.trigger("menu:show");
        //if(System.getCurrentRoute() === ""){
          //System.trigger("dash:show");
        //}
      });
    }
  });

  return System;
});