(function() {
    var app = angular.module('shopping-app', ['ngMaterial', 'ngResource', 'ngRoute', 'ngStorage']);


    app.service('cartService', ['$resource', '$localStorage', '$sessionStorage',
     function($resource, $localStorage, $sessionStorage) {

          var init_url = "http://suprabha.me/js/stock.json";
        // var shop = this;
        // var selectedProduct = [];
        var trackResource = $resource(init_url);
        // shop.disable = false;
        this.val = trackResource.query(function() {
            // shop.productlist = this.val;
            console.log(this.val);
        });


        this.getResource = function(url) {
            return $resource(url);
        }
        this.setSelectedProduct = function(val) {
            this.sproduct = val;
            console.log("setting value");
        }
        this.getSelectedProduct = function() {
            console.log("getting value");
            this.sproduct = this.load();
            console.log(this.sproduct);
            return this.sproduct;

        }

        this.load = function() {

            if (localStorage.getItem("ngStorage-message") != null) {
                this.data = $localStorage.message;
                return this.data;
            } else {
                return 0;
            }
        }

        var lsData;
        this.refresh = function(){
            // get local storage data 
            lsData = $localStorage.message;
            // lsData = [{Name:a,Price::1000},{Name:bb,Price::3000}]
            // i =
            // data = [{Name:a,Price::1000},{Name:bb,Price::3000}]
            // j =
            // console.log("LSDATA =>", lsData);
            // console.log("All Product =>", this.val);
            for(var i=0;i <lsData.length; i++)
            { 
                console.log("i", lsData[i]);
                for(var j=0;j<this.val.length;j++)
                {
                    if(lsData[i].Name===this.val[j].Name){
                        console.log("lsData",lsData[i].Name);
                        console.log("this.val",this.val[j].Name);

                        console.log("TRUE ho gya!");
                       this.val[j].disabled = true;
                       
                    }

                    else{

                        this.val[j].disabled = false;
                    }
                    
                }
            }
            // lsData (array of selected products)
            // data (array of all product)
            // check if lsData product is in data
                // if it is there than disable he button for that product.
            // else
                // enable the button.
        }

        // this.init=function(){
        //     this.localmsg=this.load();
        // }      
    }]);
    // app.controller(){}
    app.controller('shopController', ['$resource', '$mdDialog', '$mdMedia', 'cartService', '$localStorage', '$sessionStorage', function($resource, $mdDialog,
        $mdMedia, cartService, $localStorage, $sessionStorage) {
        var init_url = "http://suprabha.me/js/stock.json";
        var shop = this;
        var selectedProduct = [];
        var trackResource = $resource(init_url);
        // shop.disable = false;
        var val = trackResource.query(function() {
            shop.productlist = val;
            console.log(val);
        });


        

        // function which check if val is there in d local storge then disabl the add to cart button
        // basically a for loop which itreates over list item and checks if product exist in 
        // local storeage if it does than make val.disable = true or else make it false.
       
        // shop.buttonDisabler = function(val) {
        //     var lsData;
        //     if (localStorage.getItem("ngStorage-message") != null) {
        //         lsData = $localStorage.message;
        //         angular.forEach(val, function(i) {
        //             if (i.Name == ) {}
        //         })
        //     }

        // }
        
        shop.addToCart = function(val) {
            // console.log('clicked');

            selectedProduct.push(val);
            // shop.disable = true;
            console.log(selectedProduct);
            cartService.setSelectedProduct(selectedProduct);
            val.disabled = true;
            // $localStorage.message = selectedProduct;

            $localStorage.message = selectedProduct;


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


    function DialogController($scope, $mdDialog, cartService, $localStorage, $sessionStorage) {
        $scope.items = 1;
        $scope.x = cartService.getSelectedProduct();
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
            console.log(index);
            cartService.refresh();
            // x.disabled=false;            
        };

        $scope.clear = function(index) {
            $scope.x = [];
            $localStorage.$reset();
            // x.disabled=false;            
        };



    }

})();




// if (selectedProduct != 0) {

   
//     for(var i=0; i<$scope.cart.length; i++)
//     {
//         $localStorage.items.push($scope.cart[i]);
//     }
// }
//append the cart items + local storage


//should nt add sam item in locl strg twic(if the item exist in LC ....disbl the add to cart btn)
// refresh
// enabling disbl add t cart butn  on product removal from cart
