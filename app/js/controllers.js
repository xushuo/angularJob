var usercontrl=angular.module('loginModule',[]);
usercontrl.controller('usercontrl',function($scope,$http,$state){
    $scope.master={};
    $scope.login={flag:false,msg:'error'};
    $scope.isUnchanged=function(user){
        return angular.equals(user,$scope.master);
    }
    $scope.reset=function(){
        $scope.user=angular.copy($scope.master);
    }
    $scope.reset();
    $scope.login=function(user){
        $scope.master=angular.copy($scope.user);
        $http({
            method:'GET',
            url:'data/loginSuccess.json',
            params:user
        }).success(function(data){
            console.log(data);
            $scope.login.flag=data.login;
            $scope.login.msg=data.msg;
            $state.go('bookList',{bookType:0});
        }).error(function(data){
            console.log(data);
            $scope.login.flag=true;
            $scope.login.msg="验证失败";
        });
    }
})
var bookmod=angular.module('bookModule',[]);
bookmod.controller('booklistcontrl',function($scope,$http,$state,$stateParams){

});