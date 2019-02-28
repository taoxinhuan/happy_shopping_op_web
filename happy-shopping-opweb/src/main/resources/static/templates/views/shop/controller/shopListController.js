/**
 * 店铺列表Controller
 */
MetronicApp.controller("shopListController", function($rootScope, $scope,
		$state, $http, $location, $modal, myAlert) {
	$scope.$on('$viewContentLoaded', function() {
		Metronic.initAjax();
	

		// 店铺状态
		$scope.shopStateList = [ {
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
		$scope.getShopList = function() {
			$scope.vo.pageIndex = vm.page.index;
			$scope.vo.pageSize = vm.page.size;
			$http.post("shop/listShop", $scope.vo).success(function(data) {
				if (data.result === 'success') {
					$scope.vm.items = data.datas.dataList;
					$scope.vm.page.totalResult = data.datas.pager.recordCount;
					$scope.vm.page.totalPage = data.datas.pager.totalPage;
				}
			})
		}
		$scope.getShopList();


		// 查询按钮
		$scope.searchClick = function() {
			vm.page.index = 1;
			$scope.getShopList();
		};

		// 清空按钮
		$scope.resetClick = function() {
			$scope.vo = {};
			$scope.getShopList();
		};

		// 启用
		$scope.startShop = function(id) {
			$http.post("shop/startShop/" + id).success(
					function(data) {
						if (data.result === 'success') {
							myAlert.show("启用成功！");
							$scope.getShopList();
						}
					})
		}

		// 停用
		$scope.stopShop = function(id) {
			myAlert.confirm("确认停用店铺吗?").result.then(function() {
				$http.post("shop/stopShop/" + id)
						.success(function(data) {
							if (data.result === 'success') {
								myAlert.show("停用成功！");
								$scope.getShopList();
							}
						})
			})
		}

		// 同步统销商品
		$scope.initUnifySaleProduct = function(id) {
			$http.get(
					"unifiedsaledproduct/initUnifySaleProductToShop/" + id
							+ '/' + identity.userId).success(function(data) {
				if (data.result === 'success') {
					myAlert.show("同步成功！");
					$scope.getShopList();
				}
			})
		}

	});
})
