define(["app", "apps/views/expo_view", "tpl!apps/templates/booklayout.tpl"], 
  function(System, View, layoutTpl){
  System.module('Expo.Show', function(Show, System, Backbone, Marionette, $, _){

    //Layout window for the booking interface
    var BookLayout = Backbone.Marionette.Layout.extend({
      template: layoutTpl,

      className: "row",

      tagName: "div",

      regions: {
        hallRegion: ".hall-map",
        standRegion: ".stand-details"
      }

    });

    var layout = new BookLayout();

    Show.Controller = {

      showLocations: function(){ 

        require(["apps/entities/expo"], function(){
          $.when(System.request("locations")).done(function(response){
            //alert(JSON.stringify(response));
            var m = new Backbone.Model;
            m.set('location', System.coreRoot);

            var view = new View.Locations({ collection: response, model: m });
            System.contentRegion.show(view);

            view.on('itemview:location:events', function(data, id) {
              System.trigger("location:events:show", id);
            });
          });
        });
      },

      showEvents: function(id){ 
        var m = new Backbone.Model;
        m.set('total', 0);
        var view = new View.Events({model: m});
        System.fixedRegion.show(view);
        view.triggerMethod("fetch");
        require(["apps/entities/expo"], function(){
          $.when(System.request("location:events", id), System.request("location", id)).done(function(response, loctn){
            //alert(JSON.stringify(response));
            loctn.set('total', response.length);

            var view = new View.Events({ collection: response, model: loctn });
            System.fixedRegion.show(view);

            view.on('itemview:event:reservations', function(data, id) {
              System.fixedRegion.close();
              $('.loading').show();
              System.trigger("event:reservations:show", id);
            });
          });
        });
      },

      showReservations: function(id){ 
        var self = this;
        System.contentRegion.show(layout);
        require(["apps/entities/expo"], function(){
          $.when(System.request("event:reservations", id), System.request("event", id)).done(function(response, evnt){
            //alert(JSON.stringify(response));
            evnt.set('url', System.coreRoot)
            //loctn.set('url', System.coreRoot);

            var view = new View.Hall({ collection: response, model: evnt });
            layout.hallRegion.show(view);

            var view = new View.Reservation({ model: evnt });
            layout.standRegion.show(view);
            

            view.on('itemview:show:reservation', function(data, id) {
              //System.trigger("show:reservation:show", id);
              alert(id);
              self.showReservation(id)
            });
          });
        });
      },

      showReservation: function(id){ 
        alert(id);
        System.contentRegion.show(layout);
        require(["apps/entities/expo"], function(){
          $.when(SSystem.request("reservation", id)).done(function(reservation){
            //alert(JSON.stringify(response));
            reservation.set('url', System.coreRoot)
            //loctn.set('url', System.coreRoot);

            var view = new View.Reservation({ model: reservation });
            layout.standRegion.show(view);
            

            view.on('itemview:show:reservation', function(data, id) {
              System.trigger("show:reservation:show", id);
            });
          });
        });
      }
    };
  });

  return System.Expo.Show.Controller;
});
