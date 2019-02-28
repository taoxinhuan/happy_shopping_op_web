/**
 * 菜单列表Controller
 */
MetronicApp.controller("menuListController", function($rootScope, $scope,
		$state, $http, $location, $modal, myAlert) {
	$scope.$on('$viewContentLoaded', function() {
		Metronic.initAjax();

		$scope.vo = {};

		var vm = $scope.vm = {};
	
		vm.items = {};

		// 获取菜单列表
		$scope.getMenuList = function() {
			$http.post("menu/listMenu", $scope.vo).success(function(data) {
				if (data.result === 'success') {
					$scope.vm.items = data.list;
				}
			})
		}
		$scope.getMenuList();
		// 查询按钮
		$scope.searchClick = function() {
			$scope.getMenuList();
		};

		// 清空按钮
		$scope.resetClick = function() {
			$scope.vo = {};
			$scope.cityObj = {};
			$scope.getShopList();
		};

		// 删除
		$scope.deleteMenu = function(id) {
			myAlert.confirm("确认删除此菜单吗?").result.then(function() {
				$http.post("menu/deleteMenu/" + id )
						.success(function(data) {
							if (data.result === 'success') {
								myAlert.show("删除成功！");
								$scope.getMenuList();
							}
						})
			})
		}

	});
})
