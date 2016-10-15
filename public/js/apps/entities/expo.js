define(["app"], function(System){
  System.module('Entities', function(Entities, System, Backbone, Marionette, $, _){

    Backbone.emulateJSON = true;

    Entities.Model = Backbone.Model.extend({
      urlRoot: "model",
    });

    Entities.Collection = Backbone.Collection.extend({
      url: "/collection",
      model: Entities.Model
    });

    var fetchCollection = function(url){
      var collection;
      var defer = $.Deferred();

      $.when(
        $.get(url, function(val){
          collection = new Entities.Collection(val);
        })
      ).done(function() {
        defer.resolve(collection);
      });
      return defer.promise();
    };

    var fetchModel = function(url){
      var model;
      var defer = $.Deferred();

      $.when(
        $.get(url, function(val){
          model = new Entities.Model(val);
        })
      ).done(function() {
        defer.resolve(model);
      });
      return defer.promise();
    };

    var API = {
      getLocations: function(){
        return fetchCollection('/locations');
      },

      getLocationEvents: function(id){
        return fetchCollection('/location/'+id+'/events');
      },

      getLocation: function(id){
        return fetchModel('/location/'+id);
      },

      getEvent: function(id){
        return fetchModel('/event/'+id);
      },

      getEventReservations: function(id){
        return fetchCollection('/event/'+id+'/reservations');
      },

     

      getProductsCatalog: function(page, maincat, qty){
        var model = new Entities.Model();
        var collection;
        var defer = $.Deferred();

        $.when(

          $.get("/ecomadmin/service/inventory/?stockInventory&page="+page+"&collection="+maincat+"&qty="+qty, function(val){
            collection = new Entities.Collection(JSON.parse(val));
          }),

          $.get("/ecomadmin/service/inventory/?categories", function(val){
            model.set('categories', new Entities.Collection(JSON.parse(val)));
          })

        ).done(function() {
          var data = {};
          data['page'] = page;
          data['qty'] = qty;
          data['name'] = null;
          data['sort'] = null;
          data['cats'] = [];
          data['maincat'] = maincat;
          data['max'] = 100000;
          data['min'] = 1;
          data['resultcount'] = collection.length;//this should not be equal to qty but the whole results

          model.set(data);
          model.set('products', collection);
          defer.resolve(model);
        });
        return defer.promise();
      },

    };

    System.reqres.setHandler("locations", function(){
      return API.getLocations();
    });

    System.reqres.setHandler("location:events", function(id){
      return API.getLocationEvents(id);
    });

    System.reqres.setHandler("event:reservations", function(id){
      return API.getEventReservations(id);
    });

    System.reqres.setHandler("location", function(id){
      return API.getLocation(id);
    });

    System.reqres.setHandler("event", function(id){
      return API.getEvent(id);
    });
  });

  return ;
});