/**
 * 菜单列表Controller
 */
MetronicApp.controller("dictionaryDetailController", function($rootScope, $scope,
		$state, $http, $location, $modal, myAlert,$stateParams) {
	$scope.$on('$viewContentLoaded', function() {
		Metronic.initAjax();
		
		$scope.name=$stateParams.name;
		$scope.code=$stateParams.code;
		
		var vm = $scope.vm = {};
		vm.items = {};
		vm.page = {
			size : 20,
			index : 1,
			totalResult : 0,
			totalPage : 0
		};
		var query={};
		// 获取菜单列表
		$scope.listDictionaryItem = function() {
			query.parentId=$stateParams.id;
			query.pageIndex = vm.page.index;
			query.pageSize = vm.page.size;
			$http.post("dictionary/listDictionaryItem",query).success(function(data) {
				if (data.result === 'success') {
					$scope.vm.items = data.datas.dataList;
					$scope.vm.page.totalResult = data.datas.pager.recordCount;
					$scope.vm.page.totalPage = data.datas.pager.totalPage;
				}
			})
		}
		
		$scope.listDictionaryItem();

		
		// 删除
		$scope.deleteMenu = function(id) {
			myAlert.confirm("确认删除此菜单吗?").result.then(function() {
				$http.post("dictionary/deleteDictionaryItem/" + id )
						.success(function(data) {
							if (data.result === 'success') {
								myAlert.show("删除成功！");
								$scope.listDictionaryItem();
							}
						})
			})
		}
		
		  //新增子菜单
        $scope.addSonMenu = function () {
        	var modalInstance = $modal.open({
        		templateUrl: 'views/dictionary/addDctionaryItem.html',
        		controller: 'addDctionaryItemController',
        		size: 'md',
        		resolve: {
        			data: function () {
        		    return $stateParams.id;
        			}
        		}
        	}).result.then(function(){
        		$scope.listDictionaryItem();
			})
           }
		
        //修改子菜单
        $scope.editSonMenu = function (data) {
        	var modalInstance = $modal.open({
        		templateUrl: 'views/dictionary/editDictionaryItem.html',
        		controller: 'editDictionaryItemController',
        		size: 'md',
        		resolve: {
        			data: function () {
        				return data;
        			}
        		}
        	}).result.then(function(){
        		$scope.listDictionaryItem();
			})
        }
	});
})

  // 新增字典项
    .controller('addDctionaryItemController', 
    	function ($modalInstance, $scope, $http, data, myAlert) {
    	    $scope.title="新增子菜单";
            $scope.vo = {} ;
            $scope.vo.parentId=data;
            $scope.saveInfo=function(){
            	$http.post('dictionary/insertDictionaryItem',$scope.vo).success(function (data) {
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
    	
    	// 修改子菜单列表
    .controller('editDictionaryItemController', 
    	function ($modalInstance, $scope, $http, data, myAlert) {
    	    $scope.title="修改字典项";
            $scope.vo = data ;
            $scope.saveInfo=function(){
            	$http.post('dictionary/updateDictionaryItem',$scope.vo).success(function (data) {
            		if (data.result == 'success') {
            			myAlert.show("修改成功");
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

