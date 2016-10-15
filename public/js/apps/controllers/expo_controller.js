define(["app", "apps/views/expo_view"], function(System, View){
  System.module('Expo.Show', function(Show, System, Backbone, Marionette, $, _){
    Show.Controller = {
      showLocations: function(){ 
        var view = new View.Locations();
        
        System.contentRegion.show(view);

        require(["apps/entities/expo"], function(){
          $.when(System.request("locations")).done(function(response){
            //alert(JSON.stringify(response));

            var view = new View.Locations({ collection: response });
            System.contentRegion.show(view);

            view.on('viewEvents', function(data) {
              $.when(System.request("events", data.location.id)).done(function(response){
                if (result == 1) {
                  view.triggerMethod("success");
                }else{
                  view.triggerMethod("error");
                }
              });
            });
          });
        });
      },






      showSuppliers: function(){ 
        var view = new View.Suppliers();
        System.contentRegion.show(view);

        view.on('del', function(id) {
          var data = {};
          data['operation'] = 'deleteSupplier';
          data['id'] = id;
          $.post(System.coreRoot + '/service/procurement/index.php', data, function(result) {
            if (result == 1) {
              view.triggerMethod("delete");
            }else{
              view.triggerMethod("error");
            }
          });
        });
	    },      

      receiveGoods: function(a){ 
        var view = new View.GRN();
        
        System.contentRegion.show(view);

        view.on('post', function(data) {
          data['operation'] = 'postGenPurchase';
          $.post(System.coreRoot + '/service/procurement/index.php', data, function(result) {
            if (result != 0) {
              var res = JSON.parse(result);
              //alert(JSON.stringify(res));
              if (res['transactionId']) {
                view.triggerMethod("success", res);
              }else{
                view.triggerMethod("error");
              }              
            }else{
              view.triggerMethod("error");
            }
          });
        });
      },

      receiveOrder: function(){ 
        var view = new View.OrderGRN();
        
        System.contentRegion.show(view);

        view.on('post', function(data) {
          data['operation'] = 'postOrderPurchase';
          $.post(System.coreRoot + '/service/procurement/index.php', data, function(result) {
            if (result != 0) {
              var res = JSON.parse(result);
              //alert(JSON.stringify(res));
              if (res['transactionId']) {
                view.triggerMethod("success", res);
              }else{
                view.triggerMethod("error");
              }              
            }else{
              view.triggerMethod("error");
            }
          });
        });
      },

      paySupplierGRN: function(a){ 
        var view = new View.PaySupplierWithGRN();
        
        System.contentRegion.show(view);

        view.on('post', function(data) {
          data['operation'] = 'makePaymentGRN';
          $.post(System.coreRoot + '/service/procurement/index.php', data, function(result) {
            if (result != 0) {
              var res = JSON.parse(result);
              //alert(JSON.stringify(res));
              if (res['transactionId']) {
                view.triggerMethod("success", res);
              }else{
                view.triggerMethod("error");
              }              
            }else{
              view.triggerMethod("error");
            }
          });
        });
      },

      paySupplier: function(a){ 
        var view = new View.PaySupplier();
        
        System.contentRegion.show(view);

        view.on('post', function(data) {
          data['operation'] = 'makePayment';
          $.post(System.coreRoot + '/service/procurement/index.php', data, function(result) {
            if (result != 0) {
              var res = JSON.parse(result);
              //alert(JSON.stringify(res));
              if (res['transactionId']) {
                view.triggerMethod("success", res);
              }else{
                view.triggerMethod("error");
              }              
            }else{
              view.triggerMethod("error");
            }
          });
        });
      },

      returnGoods: function(a){ 
        var view = new View.GRO();
        
        System.contentRegion.show(view);

        view.on('post', function(data) {
          data['operation'] = 'postGenInvoice';
          $.post(System.coreRoot + '/service/finance/index.php', data, function(result) {
            if (result != 0) {
              var res = JSON.parse(result);
              //alert(JSON.stringify(res));
              if (res['transactionId']) {
                view.triggerMethod("success", res);
              }else{
                view.triggerMethod("error");
              }              
            }else{
              view.triggerMethod("error");
            }
          });
        });
      },

      purchaseOrder: function(a){ 
        var view = new View.PurchaseOrder();
        
        System.contentRegion.show(view);

        view.on('generate', function(data) {
          data['operation'] = 'genPurchOrder';
          $.post(System.coreRoot + '/service/procurement/index.php', data, function(result) {
            if (result != 0) {
              var res = JSON.parse(result);
              //alert(JSON.stringify(res));
              if (res['id']) {
                view.triggerMethod("success", res);
              }else{
                view.triggerMethod("error");
              }              
            }else{
              view.triggerMethod("error");
            }
          });
        });
      },

      supplierTx: function(a){ 
        var view = new View.SupplierTx();
        
        System.contentRegion.show(view);

        view.on('search', function(data) {
          data['operation'] = 'findSupplierEntries';
          $.post(System.coreRoot + '/service/procurement/index.php', data, function(result) {
            if (result != 0) {
              var res = JSON.parse(result);
              //alert(JSON.stringify(res));
              if (res.length) {
                view.triggerMethod("success", res);
              }else{
                view.triggerMethod("empty");
              }                
            }else{
              view.triggerMethod("error");
            }
          });
        });
      }
    };
  });

  return System.Expo.Show.Controller;
});
