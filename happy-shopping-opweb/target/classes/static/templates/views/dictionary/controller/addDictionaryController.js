/**
 * 新增
 */
MetronicApp.controller("addDictionaryController",function($rootScope, $scope, $state, $http, $location,$modal,myAlert,settings){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		//form表单获取的参数
        		$scope.vo = {} ;
        		//保存店铺信息
        		$scope.saveShopInfo = function(){
        			$http.post("dictionary/insertDictionary",$scope.vo).success(function(data){
        				if(data.result==='success'){
        					myAlert.show("新增成功！");
        					$location.path("/dictionaryList.html");
        				}
        			})	
                
        	   }
        		
        });
   })
