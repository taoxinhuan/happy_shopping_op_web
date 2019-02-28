/**
 * 菜单列表Controller
 */
MetronicApp.controller("menuDetailController", function($rootScope, $scope,
		$state, $http, $location, $modal, myAlert,$stateParams) {
	$scope.$on('$viewContentLoaded', function() {
		Metronic.initAjax();
		
		var vm = $scope.vm = {};
		vm.items = {};
		
		$scope.getMenuById=function(){
			$http.post("menu/getMenuById/"+$stateParams.id).success(function(data){
				if(data.result=="success"){
					$scope.vo=data.data;
				}
			})
		}
		
		// 获取菜单列表
		$scope.getSonMenuList = function() {
			$http.post("menu/listSonMenu/"+$stateParams.id).success(function(data) {
				if (data.result === 'success') {
					$scope.vm.items = data.list;
				}
			})
		}
		$scope.getMenuById();
		$scope.getSonMenuList();

		
		// 删除
		$scope.deleteMenu = function(id) {
			myAlert.confirm("确认删除此菜单吗?").result.then(function() {
				$http.post("menu/deleteMenu/" + id )
						.success(function(data) {
							if (data.result === 'success') {
								myAlert.show("删除成功！");
								$scope.getSonMenuList();
							}
						})
			})
		}
		
		  //新增子菜单
        $scope.addSonMenu = function () {
        	var modalInstance = $modal.open({
        		templateUrl: 'views/menu/addSonMenu.html',
        		controller: 'addSonMenuController',
        		size: 'md',
        		resolve: {
        			data: function () {
        		    return $stateParams.id;
        			}
        		}
        	}).result.then(function(){
        		$scope.getSonMenuList();
			})
           }
		
        //修改子菜单
        $scope.editSonMenu = function (data) {
        	var modalInstance = $modal.open({
        		templateUrl: 'views/menu/editSonMenu.html',
        		controller: 'editSonMenuController',
        		size: 'md',
        		resolve: {
        			data: function () {
        				return data;
        			}
        		}
        	}).result.then(function(){
        		$scope.getSonMenuList();
			})
        }
	});
})

  // 新增子菜单列表
    .controller('addSonMenuController', 
    	function ($modalInstance, $scope, $http, data, myAlert) {
    	    $scope.title="新增子菜单";
            $scope.vo = {} ;
            $scope.vo.parentId=data;
            $scope.vo.privilegeType="Menu";
            $scope.vo.privilegeName="二级目录"
            $scope.saveInfo=function(){
            	$http.post('menu/insertMenu',$scope.vo).success(function (data) {
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
    .controller('editSonMenuController', 
    	function ($modalInstance, $scope, $http, data, myAlert) {
    	    $scope.title="修改子菜单";
            $scope.vo = data ;
            $scope.vo.privilegeType="Menu";
            $scope.saveInfo=function(){
            	$http.post('menu/updateMenu',$scope.vo).success(function (data) {
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

