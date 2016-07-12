(function() {
    var app = angular.module('shopping-app', ['ngMaterial', 'ngResource', 'ngRoute']);


  
    // app.controller(){}
    app.controller('shopController', ['$resource', function($resource) {
    	var init_url = "http://suprabha.me/js/stock.json";
    	var shop = this;

            var trackResource = $resource(init_url);
            var val = trackResource.query( function(){
            	shop.productlist=val;
            	console.log(val);
            });
            // console.log(val)

            shop.test=function(pro){
            	console.log(pro.Name);

            }

            
    }]);

})();




// for adding the item:-- on button ng-click
// sc.addToCart = function(item)
// {
// sc.CartItems.push(item);  or
// sc.CartItems.push(sc.newitems);
// }


