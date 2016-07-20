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
            // this.setSelectedProduct = function(val) {
            //     this.sproduct = val;
            //     console.log("setting value");
            // }
            // this.getSelectedProduct = function() {
            //     console.log("getting value");
            //     this.sproduct = this.load();
            //     console.log(this.sproduct);
            //     return this.sproduct;
            // }
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
                // checking if local storge data is not null. 
                if (lsData != null) {
                    for (var i = 0; i < lsData.length; i++) {
                        
                        for (var j = 0; j < this.val.length; j++) {
                            if (lsData[i].Name === this.val[j].Name) {
                                console.log("lsData", lsData[i].Name);
                                console.log("this.val", this.val[j].Name);

                                console.log("TRUE ho gya!");
                                this.val[j].disabled = true;
                                console.log("j", this.val[j]);
                            } 
                            else {

                                this.val[j].disabled = false;
                            }

                        }
                    }
                }
                // else is for "Clear" button when every product is removed from 
                // local storeage
                // else {
                //     for (var j = 0; j < this.val.length; j++) {
                //         this.val[j].disabled = false;
                //     }
                // }

            }

        }
    ]);

    app.controller('shopController', ['$resource', '$mdDialog', '$mdMedia', 'cartService', '$localStorage', '$sessionStorage', function($resource, $mdDialog,
        $mdMedia, cartService, $localStorage, $sessionStorage) {
        // var init_url = "http://suprabha.me/js/stock.json";
        var shop = this;
        var selectedProduct = [];
        // var trackResource = $resource(init_url);
        // cartService.refresh();

        shop.productlist = cartService.val;
        // console.log("refrs", cartService.val);
        if($localStorage.message == null)
        {
            $localStorage.message = [];
        }


        shop.addToCart = function(val) {
            // console.log('clicked');

            selectedProduct.push(val);
            // shop.disable = true;
            console.log(selectedProduct);
            // cartService.setSelectedProduct(selectedProduct);
            val.disabled = true;
            // $localStorage.message = selectedProduct;
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
                // .then(function(answer) {
                //     shop.status = 'You said the information was "' + answer + '".';
                // }, function() {
                //     shop.status = 'You cancelled the dialog.';
                // });
            // shop.$watch(function() {
            //     return $mdMedia('xs') || $mdMedia('sm');
            // }, function(wantsFullScreen) {
            //     shop.customFullscreen = (wantsFullScreen === true);
            // });
        };



    }]);
    // closing controller


    function DialogController($scope, $mdDialog, cartService, $localStorage, $sessionStorage) {
        $scope.items = 1;
        $scope.x = $localStorage.message;
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
        $scope.remove = function(index) {
            $scope.x.splice(index, 1);
            console.log("refresh function called");
            cartService.refresh();
            // x.disabled=false;            
        };

        $scope.clear = function(index) {

            $scope.x = [];
            $localStorage.$reset();
            cartService.refresh();
            // x.disabled=false;            
        };



    }

})();







//should nt add sam item in locl strg twic(if the item exist in LC ....disbl the add to cart btn)
// refresh
// enabling disbl add t cart butn  on product removal from cart

//done with append problem