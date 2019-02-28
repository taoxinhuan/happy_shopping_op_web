/**
 * 店铺列表Controller
 */
MetronicApp.controller("userListController", function($rootScope, $scope,
		$state, $http, $location, $modal, myAlert) {
	$scope.$on('$viewContentLoaded', function() {
		Metronic.initAjax();
		

		// 状态
		$scope.StateList = [ {
			"state" : 0,
			'stateName' : '启用',
			'stateColor' : 'success'
		}, {
			"state" : 1,
			'stateName' : '停用',
			'stateColor' : 'default'
		} ];

		$scope.vo = {};

		var vm = $scope.vm = {};
		vm.page = {
			size : 20,
			index : 1,
			totalResult : 0,
			totalPage : 0
		};
		vm.items = {};

		// 获取店铺列表
		$scope.getUserList = function() {
			$scope.vo.pageIndex = vm.page.index;
			$scope.vo.pageSize = vm.page.size;
			$http.post("user/listUser", $scope.vo).success(function(data) {
				if (data.result === 'success') {
					$scope.vm.items = data.datas.dataList;
					$scope.vm.page.totalResult = data.datas.pager.recordCount;
					$scope.vm.page.totalPage = data.datas.pager.totalPage;
				}
			})
		}
		$scope.getUserList();


		// 查询按钮
		$scope.searchClick = function() {
			vm.page.index = 1;
			$scope.getUserList();
		};

		// 清空按钮
		$scope.resetClick = function() {
			$scope.vo = {};
			$scope.getUserList();
		};

		// 启用
		$scope.startUser = function(id) {
			$http.post("user/startUser/" + id).success(
					function(data) {
						if (data.result === 'success') {
							myAlert.show("启用成功！");
							$scope.getUserList();
						}
					})
		}

		// 停用
		$scope.stopUser = function(id) {
			myAlert.confirm("确认停用该用户吗?").result.then(function() {
				$http.post("user/stopUser/" + id)
						.success(function(data) {
							if (data.result === 'success') {
								myAlert.show("停用成功！");
								$scope.getUserList();
							}
						})
			})
		}
		
		  //新增用户
        $scope.addUser = function () {
        	var modalInstance = $modal.open({
        		templateUrl: 'views/user/addUser.html',
        		controller: 'addUserController',
        		size: 'md',
        		resolve: {
        			data: function () {
        		    return null;
        			}
        		}
        	}).result.then(function(){
        		$scope.getUserList();
			})
           }
	});
})
  // 新增用户
    .controller('addUserController', 
    	function ($modalInstance, $scope, $http, data, myAlert) {
    	    $scope.title="新增用户";
            $scope.vo = {} ;
            $scope.vo.type=2;
            $scope.vo.state=0;
            $scope.saveInfo=function(){
            	$http.post('user/insertUser',$scope.vo).success(function (data) {
            		if (data.result == 'success') {
            			myAlert.show("新增成功");
            			$modalInstance.close();
            		}
            	});
            }
			 $scope.cancel = function () {
		            $modalInstance.close();
		    };
		    $scope.ok=function(){
		    	$scope.saveInfo();
		    }
    	})
