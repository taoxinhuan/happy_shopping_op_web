'use strict';

MetronicApp.controller('DashboardController', function($rootScope, $scope, $http, $timeout,myAlert,$location) {

	 $scope.$on('$viewContentLoaded', function() {   
	        // initialize core components
	        Metronic.initAjax(); 
	    });

	    // set sidebar closed and body solid layout mode
	    $rootScope.settings.layout.pageBodySolid = true;
	    $rootScope.settings.layout.pageSidebarClosed = false;
   
   //日期范围控件 END  
});