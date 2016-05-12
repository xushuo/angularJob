/**
 * Created by hadoop on 2016/5/11.
 */
var myApp=angular.module('myApp',['ui.router','hellomodel']);
myApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url:"/index",
            templateUrl:'templates/hello.html'
        })
        .state('index.hello2',{
            url:'/hello2',
            templateUrl:'templates/hello2.html'
        })
        .state('index.hello3',{
            url:'/hello3',
            templateUrl:'templates/hello3.html'
        })
});