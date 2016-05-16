var rootApp=angular.module('rootApp',['ui.router','ngGrid']);
/**
 *  ui-router配置路由
 */
 rootApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
     $stateProvider
         .state('/index',{
             url:'/index',
             views:{
                 '':{
                     templateUrl:'templates/home.html'
                 },

             }
         });
 })