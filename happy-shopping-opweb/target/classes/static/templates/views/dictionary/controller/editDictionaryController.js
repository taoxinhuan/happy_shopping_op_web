/**
 * 修改菜单
 */
MetronicApp.controller("editDictionaryController",function($rootScope, $scope, $state, $http, $location,$modal,myAlert,settings,$stateParams){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		//form表单获取的参数
        		$scope.getDictionaryById=function(){
        			$http.post("dictionary/getDictionaryById/"+$stateParams.id).success(function(data){
        				if(data.result=="success"){
        					$scope.vo=data.data;
        				}
        			})
        		}
        		$scope.getDictionaryById();
        		//保存信息
        		$scope.saveInfo = function(){
        			$http.post("dictionary/updateDictionary",$scope.vo).success(function(data){
        				if(data.result==='success'){
        					myAlert.show("修改成功！");
        					$location.path("/dictionaryList.html");
        				}
        			})	
                
        	   }
        		
        });
   })
