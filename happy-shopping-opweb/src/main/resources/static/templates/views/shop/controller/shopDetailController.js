//店铺详情
MetronicApp.controller("shopDetailController",
        function($rootScope, $scope, $state, settings, $http, $location,$modal, myAlert,$stateParams){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		$scope.vo={};
        		// 获取店铺列表
        		$scope.getShop = function() {
        			$http.post("shop/getShopById/"+$stateParams.id).success(function(data) {
        				if (data.result == 'success') {
        					$scope.vo = data.data;
        				}
        			})
        		}
        		$scope.getShop();
				
        	 });
            })
