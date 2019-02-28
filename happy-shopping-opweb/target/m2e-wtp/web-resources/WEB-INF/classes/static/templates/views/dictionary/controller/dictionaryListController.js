/**
 * 字典列表Controller
 */
MetronicApp.controller("dictionaryListController", function($rootScope, $scope,
		$state, $http, $location, $modal, myAlert) {
	$scope.$on('$viewContentLoaded', function() {
		Metronic.initAjax();

		$scope.vo = {};

		var vm = $scope.vm = {};
	
		vm.page = {
			size : 20,
			index : 1,
			totalResult : 0,
			totalPage : 0
		};

		// 获取菜单列表
		$scope.listDictionary = function() {
			$scope.vo.pageIndex = vm.page.index;
			$scope.vo.pageSize = vm.page.size;
			$http.post("dictionary/listDictionary", $scope.vo).success(function(data) {
				if (data.result === 'success') {
					$scope.vm.items = data.datas.dataList;
					$scope.vm.page.totalResult = data.datas.pager.recordCount;
					$scope.vm.page.totalPage = data.datas.pager.totalPage;
				}
			})
		}
		$scope.listDictionary();
		// 查询按钮
		$scope.searchClick = function() {
			$scope.listDictionary();
		};

		// 清空按钮
		$scope.resetClick = function() {
			$scope.vo = {};
			$scope.listDictionary();
		};

		// 删除
		$scope.deleteDictionary = function(id) {
			myAlert.confirm("确认删除此菜单吗?").result.then(function() {
				$http.post("dictionary/deleteDictionary/" + id )
						.success(function(data) {
							if (data.result === 'success') {
								myAlert.show("删除成功！");
								$scope.listDictionary();
							}
						})
			})
		}

	});
})
