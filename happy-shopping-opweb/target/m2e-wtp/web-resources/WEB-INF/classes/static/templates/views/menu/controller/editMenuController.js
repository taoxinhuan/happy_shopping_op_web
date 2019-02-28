/**
 * 修改菜单
 */
MetronicApp.controller("editMenuController",function($rootScope, $scope, $state, $http, $location,$modal,myAlert,settings,$stateParams){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		//form表单获取的参数
        		$scope.vo = {} ;
        		$scope.getMenuById=function(){
        			$http.post("menu/getMenuById/"+$stateParams.id).success(function(data){
        				if(data.result=="success"){
        					$scope.vo=data.data;
        				}
        			})
        		}
        		$scope.getMenuById();
        		//保存信息
        		$scope.saveInfo = function(){
        			$http.post("menu/updateMenu/",$scope.vo).success(function(data){
        				if(data.result==='success'){
        					myAlert.show("修改成功！");
        					$location.path("/menuList.html");
        				}
        			})	
                
        	   }
        		
        });
   })
