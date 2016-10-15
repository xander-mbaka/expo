define(["app", "tpl!apps/templates/map.tpl", "tpl!apps/templates/location.tpl", "backbone.syphon"], 
	function(System, mapTpl, locationTpl){
  System.module('ExpoApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.Location = Marionette.ItemView.extend({ 

        template: locationTpl,

        tagName: "div",

        events: {
          "click .book-event": "bookPlace"
        },

        onShow: function(){
          this.$el.empty();
          this.$el.append(this.parseSVG(this.model.get('path')));
          this.$('.loc-path').unwrap();;
         
          //this.setup();
        },

        parseSVG: function(s) {
          var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
          div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
          var frag= document.createDocumentFragment();
          while (div.firstChild.firstChild)
              frag.appendChild(div.firstChild.firstChild);
          return frag;
        },

        bookPlace: function(e) { 
          e.preventDefault();
          e.stopPropagation();
          var data = Backbone.Syphon.serialize(this);
          //alert(JSON.stringify(data));
          //swal("Success!", "The record has been created.", "success");
          this.trigger("create", data);
        }

    });

    View.Locations = Marionette.CompositeView.extend({

      template: mapTpl,

      itemView: View.Location,

      itemViewContainer: "svg",

      onShow: function(){
        $('.loading').hide();
        
      },

      setup: function(){
        //var svg = $('svg');
        /*this.collection.each(function(location) {
          $(location.get('path')).append(svg);
        });*/
      }

    });

    

  });

  return System.ExpoApp.Show.View;
});