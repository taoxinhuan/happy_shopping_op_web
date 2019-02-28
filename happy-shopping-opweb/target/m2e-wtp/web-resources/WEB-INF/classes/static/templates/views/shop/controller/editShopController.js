/**
 * 编辑店铺
 */
MetronicApp.controller("editShopController",
        function($rootScope, $scope, $state, settings, $http, $location,$modal,myAlert,$stateParams){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		
        		$scope.vo = {} ;
        		
        		//获取店铺详情
        		$scope.getShopDetail = function(){
        			$http.get("shop/queryShopById/" + $stateParams.id).success(function(data){
        				if(data.result==='success'){
        					$scope.vo = data.data ;
        					$scope.vo.cardNumberRepeat = $scope.vo.cardNumber ;
        					var addressList = [$scope.vo.province,$scope.vo.city,$scope.vo.county,$scope.vo.street];
        					$scope.fullName = addressList.join("");
        					$scope.detailedAddress = $scope.fullName + $scope.vo.address ;
        					$scope.addressFulName = addressList.join(" / ");
        					angular.forEach($scope.enumDataListMap.OpeningBank,function(item){
        						if(item.itemCode == $scope.vo.openingBank){
        							$scope.vo.openingBankObj = item ;
        						}
        					})
        				}
        			})
        		}
        		
        		var save = function(){
        			$http.post("shop/updateShop/" + identity.userId ,$scope.vo).success(function(data){
        				if(data.result==='success'){
        					ejpAlert.show("编辑成功!");
        					$location.path("/shopList.html");
        				}
        			})
        		}
        		
        		//保存编辑后的店铺信息
        		$scope.saveShopInfo = function(){
        			$scope.vo.openingBank = $scope.vo.openingBankObj ? $scope.vo.openingBankObj.itemCode : undefined ;
        			if($scope.vo.openingBank==undefined){
        				ejpAlert.show("请选择开户行！");
        				return ;
        			}
        			if ($scope.vo.joinDelivery=='0') {
        				$scope.vo.joinDelivery = false ;
					} else {
						$scope.vo.joinDelivery = true ;
					}
        			
        			if($scope.queueLength){
        			//上传图片
                	uploader.uploadAll();
                	uploader.onSuccessItem = function(fileItem, response, status, headers) {
                        if (response.result === 'success') {
                            $scope.vo.picId = response.data.id;
                            save();
                        }
                     };
        			}else{
            			save();
        			}
        		}				
        	 });
            })
