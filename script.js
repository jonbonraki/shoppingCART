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

app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
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