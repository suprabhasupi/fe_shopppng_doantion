(function() {
    var app = angular.module('shopping-app', ['ngMaterial', 'ngResource', 'ngRoute']);


    app.service('cartService', ['$resource', function($resource){
         this.getResource = function(url) {
            return $resource(url);
        }
        this.setSelectedProduct=function(val){
         this.sproduct=val;
         console.log("setting value");
        }
        this.getSelectedProduct=function(){
            console.log("getting value");
            return this.sproduct;

        }
  //       this.removePro = function(index) {
  //     this.rproduct=index;
  // }
        // this.remove=function(indx){

        // }


    }]);
    // app.controller(){}
    app.controller('shopController', ['$resource', '$mdDialog', '$mdMedia', 'cartService', function($resource, $mdDialog,
     $mdMedia, cartService) {
        var init_url = "http://suprabha.me/js/stock.json";
        var shop = this;
        var selectedProduct=[];
        var trackResource = $resource(init_url);
        shop.disable = false;
        var val = trackResource.query(function() {
            shop.productlist = val;
            console.log(val);
        });
        // console.log(val)

        // shop.test = function(pro) {
        //     console.log(pro.Name);

        // }

        shop.addToCart=function(val){
            // console.log('clicked');
            
            selectedProduct.push(val);
            shop.disable = true;
            console.log(selectedProduct);
            cartService.setSelectedProduct(selectedProduct);


        }


  // shop.removeProduct= function () {
  

  //   var item = $(this).closest(".md-table-content-row");

  //   item.addClass("closing");
  //   window.setTimeout( function () {
  //     item.remove();
  //     app.updateTotals();
  //   }, 500);
  // }




// shop.remove = function(index) {
//     selectedProduct.data.splice(index,1);
//   }
 // shop.remove = function(index) {
 //        shop.invoice.items.splice(index, 1);
 //    }








 // for total--------------


 //    $scope.total = function() {
 //        var total = 0;
 //        angular.forEach($scope.selectedProduct, function(item) {
 //            total += item.Quantity * item.Price;
 //        })

 //        return total;
 //    }



        // Get the Cart
        shop.showcart = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && shop.customFullscreen;
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'dialog1.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    shop.status = 'You said the information was "' + answer + '".';
                }, function() {
                    shop.status = 'You cancelled the dialog.';
                });
            shop.$watch(function() {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
                shop.customFullscreen = (wantsFullScreen === true);
            });
        };



    }]);
    // closing controller


    function DialogController($scope, $mdDialog, cartService) {
        $scope.x=cartService.getSelectedProduct()
        console.log($scope.x);

        // $scope.y=cartService.removePro(index){
        //     console.log($scope.y);
        // }

         //                                 // get will return array $scope.pro
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer); 
        };
    }

})();




// for adding the item:-- on button ng-click
// sc.addToCart = function(item)
// {
// sc.CartItems.push(item);  or
// sc.CartItems.push(sc.newitems);
// }
