/**
 * 店铺详情选项卡菜单
 */
MetronicApp.controller("shopMenuController",
        function($rootScope, $scope, $state, settings, $http, $location,$modal,myAlert,$stateParams){
        	$scope.$on('$viewContentLoaded', function(){
        		Metronic.initAjax();
        		
        		$rootScope.settings.layout.pageBodySolid = false;
        		$rootScope.settings.layout.pageSidebarClosed = false;
        		
        		
				
        	 });
            })
