var usercontrl=angular.module('loginModule',[]);
usercontrl.controller('usercontrl',function($scope,$http,$state){
    $scope.master={};
    $scope.login={flag:false,msg:'error'};
    $scope.isUnchanged=function(user){
        return angular.equals(user,$scope.master);
    };
    $scope.reset=function(){
        $scope.user=angular.copy($scope.master);
    };
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
    };
});

/**
 * 表格生成
 * */

var bookmod=angular.module('bookModule',[]);
bookmod.controller('booklistcontrl',function($rootScope,$scope,$http,$state,$stateParams,$timeout){
   /* $scope.data=[{
        id : 1,
        name : "鲁宾逊漂流记",
        author:"匿名",
        price:"100$" },
    {
        id : 2,
        name : "一千零一夜",
        author:"匿名",
        price:"200$"
    }];
    $scope.gridOptions ={
        data:'data',
        columnDefs :[{
            field:'id',displayName:'ID'
        },{
            field:'name',displayName:'书名'
        },{
            field:'author',displayName:'作者'
        },{
            field:'price',displayName:'价格'
        }]
    };*/

 /*   setTimeout(function(){
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage,'AngularJS');
    },2000);*/

    console.log($stateParams.bookType+"==========================");
    $rootScope.bt=$stateParams.bookType;


    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1
    };
    $scope.setPagingData = function(data, page, pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.books = pagedData;
        $scope.totalServerItems = data.length;
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    //这里可以根据路由上传递过来的bookType参数加载不同的数据
    console.log($stateParams);
    $scope.getPagedDataAsync = function(pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                var ft = searchText.toLowerCase();
                $http.get('data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        data = largeLoad.filter(function(item) {
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('search', function(newVal, oldVal) {
        var timeout;
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function() {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.search);
            }, 500);
        }
    }, true);

    $scope.gridOptions = {
        data: 'books',
        rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
        '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
        '<div ng-cell></div>' +
        '</div></div>',
        multiSelect: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enablePaging: false,
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 60,
            pinnable: false,
            sortable: false
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 220
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="bookDetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
});

bookmod.controller('BookDetailCtrl',function($rootScope,$scope,$http,$stateParams,$state){
    console.log($rootScope.$stateParams.bookType+"==========================");
    console.log($rootScope.bt);
});
