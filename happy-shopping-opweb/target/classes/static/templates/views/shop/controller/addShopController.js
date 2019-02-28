/**
 * 新增店铺
 */
MetronicApp.controller("addShopController",[
        '$rootScope','$scope','$state','$http','$location','$modal','myAlert','settings',
        function($rootScope, $scope, $state, $http, $location,$modal,myAlert,settings){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		
        		//form表单获取的参数
        		$scope.vo = {} ;
        		$scope.isNotShopKeeper = false ;
        		$scope.$watch("vo.mobile" , function(){
        			$scope.addressfullName = "" ;
					$scope.vo.address = "" ;
					$scope.detailedAddress = "" ;
        			if($scope.vo.mobile){
        				$http.post("user/getKeeperByMobile/" + $scope.vo.mobile).success(function(data){
            				if(data.result==='success'){
            					if (data.data != null) {
            						$scope.isNotShopKeeper = false ;
                					$scope.vo.keeperId = data.data.id ;
                					$scope.vo.keeperName=data.data.realname;
                					$scope.addressList =data.data.adddressList;
								} else {
									$scope.isNotShopKeeper = true ;
								}
            				}
            			})
        			}
        		})
        		
        		var save = function(){
        			$http.post("shop/insertShop",$scope.vo).success(function(data){
        				if(data.result=='success'){
        					myAlert.show("新增成功！");
        					$location.path("/shopList.html");
        				}
        			})
        		}
        		
        		//保存店铺信息
        		$scope.saveShopInfo = function(){
        			save();
        	    }
        		
        });
   }])
