(function() {
    var app = angular.module('shopping-app', ['ngMaterial', 'ngResource', 'ngRoute', 'ngStorage']);


    app.service('cartService', ['$resource', '$localStorage', '$sessionStorage',
        function($resource, $localStorage, $sessionStorage) {
            var init_url = "http://suprabha.me/js/stock.json";
            var trackResource = $resource(init_url);
            x = this;
            this.val = trackResource.query(function() {
                x.refresh();
            });
           
            this.load = function() {
                if (localStorage.getItem("ngStorage-message") != null) {
                    this.data = $localStorage.message;
                    return this.data;
                } else {
                    return 0;
                }
            }

            var lsData;
            this.refresh = function() {
                // get local storage data 
                lsData = $localStorage.message;
                var product_index = [];
                // checking if local storge data is not null. 
                if (lsData != null) {
                    for (var i = 0; i < lsData.length; i++)                         
                        for (var j = 0; j < this.val.length; j++) {
                            if (lsData[i].Name === this.val[j].Name) {
                                product_index.push(j);
                                // console.log("pusing this=> ", j);
                               
                            } 
                          
                            this.val[j].disabled = false;
                        }
                    for (var p =0; p<product_index.length;p++){
                        console.log("some val", product_index[p]);
                        this.val[product_index[p]].disabled = true;   
                    }
                    }
                     // else is for "Clear" button when every product is removed from 
                // local storeage
                else {
                    for (var j = 0; j < this.val.length; j++) {
                        this.val[j].disabled = false;
                    }
                }
                console.log("this.val froooom refresh=> ", this.val);
                }
            }
    ]);

    app.controller('shopController', ['$resource', '$mdDialog', '$mdMedia', 'cartService', '$localStorage', '$sessionStorage', function($resource, $mdDialog,
        $mdMedia, cartService, $localStorage, $sessionStorage) {
        var shop = this;
        var selectedProduct = [];
        shop.productlist = cartService.val;
        console.log("refrs", cartService.val);
        if($localStorage.message == null)
        {
            $localStorage.message = [];
        }


        shop.addToCart = function(val) {
                  if($localStorage.message == null)
        {
            $localStorage.message = [];
        }

            selectedProduct.push(val);
            console.log(selectedProduct);
            val.disabled = true;
            $localStorage.message.push(val);
        }


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
        };



    }]);
    // closing controller


    function DialogController($scope, $mdDialog, cartService, $localStorage, $sessionStorage) {
        
        $scope.items = 1;
        $scope.x = $localStorage.message;
        console.log($scope.x);

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {

            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
        $scope.remove = function(index) {
            $scope.x.splice(index, 1);
            console.log("refresh function called");
            cartService.refresh();
        };
        $scope.clear = function(index) {
            $scope.x = [];
            $localStorage.$reset();
            cartService.refresh();
            // x.disabled=false;            
        };
    }

})();

