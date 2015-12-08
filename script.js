/**
 * Created by uc190999 on 12/7/2015.
 */
var app=angular.module('CartWebApp',['ngRoute']);
app.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'home.html'
        })
        .when('/about',{
            templateUrl: 'Conformation.html'
        });
});


app.controller('itemsController',function($scope,$http){

    /*
     Here you can handle controller for specific route as well.
     */
$scope.notdisabled=true;
    $scope.showModal = false;

    $http.get("cart.json")
        .then(function(response) {
            $scope.items = response.data.Items;

        })

    $scope.filterFunction = function(element) {
        return element.name.match(/^Ma/) ? true : false;
    };
    $scope.removeItem = function(index) {
        $scope.items.splice(index, 1);
    },

        $scope.addItem = function() {
            $scope.items.push({
             name: $scope.selected.name,
                Price:$scope.selected.Price,
                description:$scope.selected.description,
                quantity:$scope.item.quantity
            });
        },

        $scope.reviewItem=function()
        {
            $scope.notdisabled=!$scope.notdisabled;

        },

        $scope.purchaseItem=function(){
            $scope.showModal = !$scope.showModal;

            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
        $scope.conformationnumber=uuid;

        }

});