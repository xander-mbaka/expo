requirejs.config({
  urlArgs: "bust=" + (new Date()).getTime(),
  baseUrl: "js",
  paths: {
    jquery: "vendor/jquery.min",    
    json2: "vendor/json2",
    backbone: "vendor/backbone",
    marionette: "vendor/backbone.marionette",
    tpl: "vendor/tpl",    
    underscore: "vendor/underscore",
    //backbone plugins
    "backbone.picky": "vendor/backbone.picky",
    "backbone.syphon": "vendor/backbone.syphon",    
    "backbone.modelBinder": "vendor/backbone.modelbinder",    
    localstorage: "vendor/backbone.localstorage",
    //bootstrap
    bootstrap: "plugins/bootstrap/bootstrap.min",    
    bootselect: "plugins/bootstrap-select/bootstrap-select",
    boottoggle: "plugins/bootstrap-toggle/bootstrap-toggle.min",
    //alerts
    sweetalert: "plugins/sweet-alert/sweet-alert.min",
    moment: "plugins/moment/moment.min",
    //calendar: "plugins/full-calendar/fullcalendar",
    daterange: "plugins/date-range-picker/daterangepicker",

    money: "plugins/formatmoney",
    basics: "plugins/basics",

    fileupload: "plugins/upload/jquery.fileupload",
    iframe: "plugins/upload/jquery.iframe-transport",
    knob: "plugins/upload/jquery.knob",
    widget: "plugins/upload/jquery.ui.widget"
  },

  shim: {
    underscore: {
      exports: "_"
    },

    jquery: {
      exports: "$"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },

    "backbone.picky": ["backbone"],
    "backbone.syphon": ["backbone"],
    "backbone.modelBinder": ["backbone"],
    
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },

    fileupload: ["knob", "widget", "iframe"],
    
    jqueryui: ["jquery"],
    localstorage: ["backbone"],
    bootstrap: ["jquery"],
    plugins: ["bootstrap"],
    basics: ["jquery", "bootstrap", "bootselect", "boottoggle", "sweetalert", "moment",  "daterange", "money"]
  }
});

require(["app"], function(System){
  System.start();
});
