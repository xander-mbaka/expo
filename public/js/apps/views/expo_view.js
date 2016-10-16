define(["app", "tpl!apps/templates/map.tpl", "tpl!apps/templates/location.tpl", "tpl!apps/templates/events.tpl", 
  "tpl!apps/templates/event.tpl", "tpl!apps/templates/noevent.tpl", "tpl!apps/templates/hall.tpl", 
  "tpl!apps/templates/stand.tpl", "tpl!apps/templates/registration.tpl", "basics", "backbone.syphon", "fileupload"], 
	function(System, mapTpl, locationTpl, eventsTpl, eventTpl, noEventTpl, hallTpl, standTpl, registrationTpl){
  System.module('ExpoApp.Show.View', function(View, System, Backbone, Marionette, $, _){
    
    View.Location = Marionette.ItemView.extend({ 

        template: locationTpl,

        tagName: "div",

        events: {
        },

        onShow: function(){
          this.$el.empty();
          var svgPath = this.parseSVG(this.model.get('path'), this.model.get('id'));
          this.$el.append(svgPath);
          this.$('.loc-path').unwrap();
          var self = this;
          this.$el.fadeOut().fadeIn();
          //Late binding of the click event
          $('#loc-'+this.model.get('id')).click(function(){
            self.viewEvents(self.model.get('id'));
          });

          var path = document.querySelector('#loc-'+this.model.get('id'));
          this.addText(path, this.model.get('name')+':', 1);
          this.addText(path, this.model.get('events').length == 0 ? 'No events' : this.model.get('events').length +' events', 2);
         
          //this.setup();
        },

        parseSVG: function(s, i) {
          var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
          div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
          var frag= document.createDocumentFragment();
          while (div.firstChild.firstChild) {
            div.firstChild.firstChild.id = 'loc-'+i;
            frag.appendChild(div.firstChild.firstChild);
          }
          return frag;
        },

        addText: function(path, text, round) {
            var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var b = path.getBBox();
            t.setAttribute("transform", "translate(" + (b.x + b.width/3 + (round * 10)) + " " + (b.y + b.height/3 + (round * 20)) + ")");
            t.textContent = text;
            t.setAttribute("fill", "white");
            t.setAttribute("font-size", "20");
            t.setAttribute("stroke-width", "1");
            t.setAttribute("stroke", "#ffffff");
            path.parentNode.insertBefore(t, path.nextSibling);
        },

        viewEvents: function(id) { 
          this.trigger("location:events", id);
        }

    });

    View.Locations = Marionette.CompositeView.extend({

      template: mapTpl,

      itemView: View.Location,

      itemViewContainer: "svg",

      onShow: function(){
        $('.loading').hide();
        
      }

    });

    View.Event = Marionette.ItemView.extend({ 

        template: eventTpl,

        tagName: "li",

        events: {
          "click .book-event": "bookPlace",
        },

        onShow: function(){
         
          //this.setup();
        },

        bookPlace: function() { 
          this.trigger("event:reservations", this.model.get('id'));
        }

    });

    View.NoEvent = Marionette.ItemView.extend({      

        template: noEventTpl

    });

    View.Events = Marionette.CompositeView.extend({

      template: eventsTpl,

      itemView: View.Event,

      itemViewContainer: ".panel-body > ul",

      tagName: "div",

      className: "row",

      events: {
          "click .closed-tool": "closeEvents",
      },

      emptyView: View.NoEvent,

      onFetch: function(){
        this.$el.hide();
        $('#small-loader').show();
        //var ul = this.$el.find('.panel-body > ul')
       //ul.empty();
        //var tpl = $('<a href="#" class="item clearfix"><img src="/image/loading.gif" alt="img" class="img"><span class="from">Retrieving .... </span></a>')
        //tpl.append(ul)
        //ul.html(tpl);
      },

      onShow: function(){
        $('#small-loader').hide();
      },

      closeEvents: function(){
        this.$el.hide();
      }

    });

    View.Stand = Marionette.ItemView.extend({ 

        template: standTpl,

        events: {
          "click .btn-reserve": "showRegister",
        },

        onShow: function(){
          //Display svg elements
          //Original model is a reservation model
          var count = 0;
          this.$el.empty();
          var stand = this.model.get('stall');
          var svgPath = this.parseSVG(stand.path, stand.id);
          this.$el.append(svgPath);
          this.$('.stand-path').unwrap();
          var self = this;
          
          var price =  + stand.price;
          var path = document.querySelector('#stand-'+stand.id);
          path.setAttribute('opacity', '0.6');
          path.setAttribute('onmouseover', 'evt.target.setAttribute(`opacity`, `1`);');
          path.setAttribute('onmouseout', 'evt.target.setAttribute(`opacity`, `0.6`);');
          

          this.addText(path, 'Stand '+ stand.name +': '+stand.sq_feet+' sq. ft.', 1);
          //).formatMoney(2, '.', ',')
          if (this.model.get('status') == 0) {
            this.addText(path, 'STAND AVAILABLE!!', 2, '#f0ad4e');
            this.addText(path, 'Reserve at US$ ' + price, 3);
            
            $('#stand-'+stand.id).click(function(){
              self.viewReservation(stand.id);
            });
          }else{
            $('#stand-'+stand.id).click(function(){
              self.confirmReserved(self.model.get('company'));
            });

            var logo = '<defs><clipPath id="circleView"><circle cx="100" cy="100" r="150" fill="#FFFFFF" /></clipPath></defs><image width="180" height="90" id="logo-'+this.model.get('id')+'" xlink:href="'+System.coreRoot+this.model.get('logo_url')+'" clip-path="url(#circleView)" />';
            var svgLogo = this.parseSVG2(logo);
            //this.$el.append(svgLogo);
            var w = this.addText(path, 'Reserved by: '+self.model.get('company'), 2, '#00a651');
            this.addText(path, 'Web: '+self.model.get('website'), 3);

            setTimeout(function() {
               //$(svgLogo).insertAfter('svg text');
              $('svg').children().last().after(svgLogo);
              document.querySelector('#logo-'+self.model.get('id')).setAttribute('transform','translate('+w.x+','+w.y+')');
            }, 1000);
           
          }
          
         
          //this.setup();
        },

        parseSVG: function(s, i) {
          var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
          div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
          var frag= document.createDocumentFragment();
          while (div.firstChild.firstChild) {
            div.firstChild.firstChild.id = 'stand-'+i;
            //div.firstChild.firstChild.className = 'stand-path';
            frag.appendChild(div.firstChild.firstChild);
          }
          return frag;
        },

        parseSVG2: function(s) {
          var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
          div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
          var frag= document.createDocumentFragment();
          while (div.firstChild.firstChild) {
            frag.appendChild(div.firstChild.firstChild);
          }
          div.innerHTML = '';
          return frag;
        },

        addText: function(path, text, round, color='#110b1f') {
            var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var b = path.getBBox();
            t.setAttribute("transform", "translate(" + (b.x + b.width/3) + " " + (b.y + b.height/3 + (round * 30)) + ")");
            t.textContent = text;
            t.setAttribute("fill", color);
            t.setAttribute("font-size", "20");
            t.setAttribute("stroke-width", "1");
            t.setAttribute("stroke", color);
            path.parentNode.insertBefore(t, path.nextSibling);
            var w ={};
            w.x = b.x + b.width/3;
            w.y = b.y + b.height/3 - 100;
            return w;
        },

        viewReservation: function(id) { 
          var self = this;
          var stall = this.model.get('stall');
          //this.$el.hide();
          //$('#small-loader').show();
          $('#reservation').find('.modal-title').text('Stand '+stall.name)
          $("#mod-image").attr('src', System.coreRoot + stall.image_url);
          $('#mod-size').text(stall.sq_feet + ' sq. ft.')
          $('#mod-price').text(stall.price + ' US$')
          //$('#btn-rsv').data('modelval', this.model.get('id'))
          System.modelValue = this.model.get('id');
          $('#reservation').modal('show');
          //this.trigger("show:reservation", id);
          $('#btn-rsv').off()

          $('#btn-rsv').on('click', function(e){
            e.stopPropagation()
            e.preventDefault()
            self.showRegister();
          });
        },

        showRegister: function() { 
          $('#reservation').modal('toggle');
          this.trigger("show:registration", System.modelValue);
        },

        confirmReserved: function(name) { 
          swal("Double Booking!", "This stand has already been reserved by "+name, "error");
          //this.trigger("show:reservation", id);
        }

    });

    View.Hall = Marionette.CompositeView.extend({

      template: hallTpl,

      itemView: View.Stand,

      itemViewContainer: "svg",

      onShow: function(){
        
        //this.$el.empty();
        var m = this.model.get('location');

        var svgPath = this.parseSVG(m.hall_path, this.model.get('id'));
        $(svgPath).insertAfter('svg > image');
        //this.$('.hall-path').unwrap();
        //var self = this;
        //this.$el.fadeOut().fadeIn();
        //Late binding of the click event=

        //Timed loading function - to be refactored into a event bubble
        setTimeout(function() {
          $('.loading').hide();
        }, 1500);
        
        //this.setup();
      },

      parseSVG: function(s, i) {
        var div= document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
        div.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg">'+s+'</svg>';
        var frag= document.createDocumentFragment();
        while (div.firstChild.firstChild) {
          div.firstChild.firstChild.id = 'hall-'+i;
          frag.appendChild(div.firstChild.firstChild);
        }
        return frag;
      },

      addText: function(path, text, round) {
            var t = document.createElementNS("http://www.w3.org/2000/svg", "text");
            var b = path.getBBox();
            t.setAttribute("transform", "translate(" + (b.x + b.width/3 + (round * 10)) + " " + (b.y + b.height/3 + (round * 20)) + ")");
            t.textContent = text;
            t.setAttribute("fill", "white");
            t.setAttribute("font-size", "20");
            t.setAttribute("stroke-width", "1");
            t.setAttribute("stroke", "#ffffff");
            path.parentNode.insertBefore(t, path.nextSibling);
        },

    });

    View.Registration = Marionette.ItemView.extend({

      template: registrationTpl,

      events: {
        'click .ucreate': 'submitClicked',
        'click .upload-logo': 'logo',
        'click .upload-document': 'document',
      },

      onShow: function(){
        this.setup();
      },

      setup: function(){

        System.logoImage = '';
        $('#frmu2').fileupload({
          // This element will accept file drag/drop uploading
          dropZone: $('.upload-logo'),

          url: System.coreRoot + 'upload/logo',

          add: function (e, data) {
            data.context = $('.upload-logo');
            // Automatically upload the file once it is added to the queue
            var jqXHR = data.submit();
          },

          progress: function(e, data){
            var progress = parseInt(data.loaded / data.total * 100, 10);

            data.context.find('span').val(progress+"%").change();

            if(progress == 100){
              
             // data.context.find('span').val("").change();
              //System.logoImage = data.files[0].name;
             // $('.upload-logo').css({'background': 'url('+System.coreRoot+'image/logos/'+data.files[0].name+') no-repeat scroll 0 center / 100% auto', 'border': 'none'});
                //$(new Image()).attr('src', '' + _filename).appendTo($('#imageContainter')).fadeIn();
            }
          },

          success: function (res){
              swal("Success!", "The image has been uploaded successfully.", "success");
              System.logoImage = res.path
              $('.upload-logo').css({'background': 'url('+System.coreRoot+res.path+') no-repeat scroll 0 center / 100% auto', 'border': 'none'});
          },

          fail:function(e, data){
            data.context.addClass('error');
            swal("Failed!", "The image could not be uploaded", "error");
          }

        });
      },

      logo: function(e){
        if($(e.target).is('div')){
          $('#plogo').click();
        }
      },

      document: function(e){
        if($(e.target).is('div')){
         $('#pdocs').click();
       }
      },

      submitClicked: function(e){
        e.preventDefault();
        e.stopPropagation();
        var data = Backbone.Syphon.serialize($("#frmu2")[0]);

        if (data['id'] != "" && data['address'] != "" && data['amount'] != "" && data['company'] != '' && data['person'] != '' && data['email'] != '') {
          data['logo'] = System.logoImage;
          this.trigger("register", data);
        }else{
          swal("Missing Details", "Ensure you upload logo and enter your name, phone number and your company.", "info");
        }
      },

      onSuccess: function(e) { 
        var event = this.model.get('event')
        swal("Success!", "The record has been saved.", "success");
        window.location.hash='event/'+event.id+'/reservations';
          //alert(JSON.stringify(data));
          //this.trigger("create", data);
        },

        onError: function(e) { 
          swal("Error!", "Transaction failed! Try again later.", "error");
          //alert(JSON.stringify(data));
          //this.trigger("create", data);
        }

    });


    

  });

  return System.ExpoApp.Show.View;
});