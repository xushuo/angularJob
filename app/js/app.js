var rootApp=angular.module('rootApp',['ui.router','ngGrid','loginModule','bookModule']);

/*
* 整个应用都会和路由有关，这里把$state和$stateParams这两个对象放到$rootScope上，方便其他地方引用和注入
* 这里的run方法只会在angular启动的时候运行一次
* */
rootApp.run(function($rootScope,$state,$stateParams){
    $rootScope.$state=$state;
    $rootScope.$stateParams=$stateParams;
});

/**
 *  ui-router配置路由
 */
 rootApp.config(function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index',{
            url:'/index',
            views:{
                '':{
                    templateUrl:'templates/home.html'
                },
                'main@index':{
                    templateUrl:'templates/login.html',
                    controller:'usercontrl'
                }
            }
        })
        .state('bookList',{
            url:'/bookList/{bookType}',
            views:{
                '':{
                    templateUrl:'templates/home.html'
                },
                'main@bookList':{
                    templateUrl:'templates/bookList.html'
                },
                'bookType@bookList':{
                    templateUrl:'templates/bookType.html'
                },
                'bookGrid@bookGrid':{
                    templateUrl:'templates/bookGrid.html'
                }
            }
        })
        .state('addBook',{
            url:'/addBook',
            templateUrl:'templates/addBook.html'
        })
        .state('bookDetail',{
            url:'/bookDetail/:bookId',
            views:{
                templateUrl:'templates/bookDetail.html'
            }
        })
 })