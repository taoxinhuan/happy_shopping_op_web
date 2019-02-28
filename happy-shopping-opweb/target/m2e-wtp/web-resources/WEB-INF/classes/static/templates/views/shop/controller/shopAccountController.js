//店铺账号
MetronicApp.controller("shopAccountController",
        function($rootScope, $scope, $state, settings, $http, $location,$modal,myAlert,$stateParams){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		
        		var vm = $scope.vm = {};
        		vm.pages = {
    				itemsPerPage : 20,
					index : 1,
					totalResult : 0,
					totalPage : 0
        		};
        		vm.items = {};
        		$scope.vo = {} ;
        		
        		$scope.shopAccountStateList = [{"state":0,'stateName':'正常','stateColor':'success'},{"state":1,'stateName':'停用','stateColor' : 'default'}];
        		//获取店铺详情
        		$scope.getShopDetail = function(){
        			$http.get("shop/queryShopById/" + $stateParams.id).success(function(data){
        				if(data.result==='success'){
        					$scope.detailVO = data.data ;
        					$scope.mobile = $scope.detailVO.mobile ;
        					$scope.getShopAccountList();
        				}
        			})
        		}
        		//$scope.getShopDetail();
        		
        		//获取店铺账号列表
        		$scope.getShopAccountList = function(){
        			$scope.vo.shopId = $stateParams.id ;
        			$http.post("shop/findShopAccountList/"+vm.pages.index + '/'+ vm.pages.itemsPerPage,$scope.vo)
	    				.success(function(data){
	    				if(data.result==='success'){
	    					$scope.vm.items = data.datas.dataList;
							$scope.vm.pages.totalResult = data.datas.pager.recordCount;
							$scope.vm.pages.totalPage = data.datas.pager.totalPage;
	    				}
    			})
        		}
        		
        		// 查询按钮
				$scope.searchClick = function() {
					$scope.getShopAccountList();
				};
				
				// 清空按钮
				$scope.resetClick = function() {
					$scope.vo = {};
					$scope.getShopAccountList();
				};
        		
        		//编辑管理员
        		$scope.editAdmin = function(id){
        			var modalInstane = $modal.open({
        				templateUrl:'views/shop/modal/editAdmin.html',
        				controller:'editAdminController',
        				resolve:{
        					data:function(){
        						return {
        							accountId : id ,
        							shopId : $stateParams.id ,
        						};
        					}
        				}
        			})
        			modalInstane.result.then(function(){
        				$scope.getShopAccountList();
        			})
        		}
        		
        		//重置密码
        		$scope.resetPassword = function(id){
        			$http.get("shop/updatePassword/"+ id +'/' + identity.userId).success(function(data){
        				if(data.result==='success'){
        					ejpAlert.show("重置密码成功！");
        					$scope.getShopAccountList();
        				}
        			})
        		}
        		
        		//停用
        		$scope.freezeAccount = function(id){
        			 ejpAlert.confirm("确认停用店铺账号吗?").result.then(function(){
        				 $http.get("shop/disableShopAccount/"+ id +'/' + identity.userId).success(function(data){
             				if(data.result==='success'){
             					ejpAlert.show("停用成功！");
             					$scope.getShopAccountList();
             				}
             			})
                     })
        		}
        		
        		//启用
        		$scope.startAccount = function(id){
        			$http.get("shop/enableShopAccount/"+ id +'/' + identity.userId).success(function(data){
        				if(data.result==='success'){
        					ejpAlert.show("启用成功！");
        					$scope.getShopAccountList();
        				}
        			})
        		}
        		
        		
				
        	 });
            })

//编辑管理员
.controller(
        function($scope, $http, $location,$modal,myAlert,data,$modalInstance){
        		
        		//用户信息
        		var identity = $scope.identity = getUserInfo.userInfo();
        		
        		//获取店铺角色的枚举字典
        		EnumDictionaryService.listDictionaryItem("ShopRole").then(function(data){
        			if(data.result==='success'){
        				$scope.roleList = data.list ;
        			}
        		})
        		
        		//标题
        		$scope.title = "编辑管理员" ;
        		
        		$scope.modalVO = {} ;
        		
        		//根据店铺账号id获取改用户信息
        		$scope.getAccountInfo = function(){
        			$http.get("shop/queryShopAccountById/"+ data.accountId).success(function(data){
        				if(data.result==='success'){
        					$scope.modalVO = data.data ;
        					$scope.modalVO.mobileNo = parseInt($scope.modalVO.mobileNo);
        				}
        			})
        		}
        		$scope.getAccountInfo();
        		
        		//确定
        		$scope.ok = function(){
        			$scope.modalVO.shopId = data.shopId ;
        			$http.post("shop/updateShopAccount/"+identity.userId ,$scope.modalVO).success(function(data){
        				if(data.result==='success'){
        					ejpAlert.show("编辑成功！");
        					$modalInstance.close(data);
        				}
        			})
        		}
        		
        		//取消
        		$scope.cancel = function(){
        			$modalInstance.dismiss('cancel');
        		}
				
    })
