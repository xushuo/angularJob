/**
 * Created by hadoop on 2016/5/11.
 */
var hellomodel=angular.module('hellomodel',[]);
hellomodel.controller('formcontrl',['$scope',function($scope){
    $scope.userInfo={
        email:"12321@qq.com",
        password:"1234",
        autoLogin:true
    };
    $scope.getFormData=function(){
        console.log($scope.userInfo);
    };
    $scope.setFormData=function(){
        $scope.userInfo={
            email:'pppp@qq.com',
            password:'tttt',
            autoLogin:false
        }
    };
    $scope.resetFormData=function(){
        $scope.userInfo={
            email:'',
            password:'',
            autoLogin:false
        }
    }
}]);
