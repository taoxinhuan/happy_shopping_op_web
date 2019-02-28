//用户详情
MetronicApp.controller("userDetailController",
        function($rootScope, $scope, $state, settings, $http, $location,$modal, myAlert,$stateParams){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		$scope.vo={};
        		var vm = $scope.vm = {};
        		vm.items = {};
        		
        		$scope.getShop = function() {
        			$http.post("user/getUserById/"+$stateParams.id).success(function(data) {
        				if (data.result == 'success') {
        					$scope.vo = data.data;
        				}
        			})
        		}
        		$scope.getShop();
        		$scope.getShopDetail = function(){
        			$http.post("user/listUserAddressByUserId/" + $stateParams.id).success(function(data){
        				if(data.result==='success'){
        					$scope.vm.items = data.list;
        				}
        			})
        		}
        		$scope.getShopDetail();
        		
        		
        		  //修改子菜单
                $scope.updateUserAddress = function (data) {
                	var modalInstance = $modal.open({
                		templateUrl: 'views/user/editUserAddress.html',
                		controller: 'editUserAddressController',
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
    .controller('editUserAddressController', 
    	function ($modalInstance, $scope, $http, data, myAlert) {
    	    $scope.title="修改用户收货地址";
            $scope.vo = data ;
            $scope.saveInfo=function(){
            	$http.post('user/updateUserAddress',$scope.vo).success(function (data) {
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
