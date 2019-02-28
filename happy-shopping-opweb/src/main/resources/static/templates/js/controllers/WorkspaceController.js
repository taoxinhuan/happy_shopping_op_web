/*******************************************************************************
 * Layout Partials. By default the partials are loaded through AngularJS
 * ng-include directive. In case they loaded in server side(e.g: PHP include
 * function) then below partial initialization can be disabled and Layout.init()
 * should be called on page load complete as explained above.
 ******************************************************************************/
/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope',
    function ($scope) {
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initComponents();
    	    
            // init core components Layout.init();
            // Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side
            // instead of loading with ng-include directive
        });
        $scope.$on("switchRole_emit", function (event, arg) {
            $scope.$broadcast("switchRole_broadcast", arg);
        });
    }
])

/**
 * 工作台头部
 */
    .controller('HeaderController', ['$scope', '$rootScope', '$http', '$log', '$location', '$interval',
       '$modal', 
    function ($scope, $rootScope, $http, $log, $location, $interval, $modal) {
            /* Setup Layout Part - Header */
    	$scope.$on('$includeContentLoaded', function() {
			Layout.initHeader(); // init header
		});
		
		$scope.userRole = "0";
		$scope.userName = "xxxxxxxx"
		$scope.trueName = "edcdcdcdc"
		
		$scope.logout=function(){
			window.location = "login.html";
		};
		
		$scope.open = function () {
            //创建弹框对象
            var modalInstance = $modal.open({
                templateUrl: 'views/common/model/swapRoleModal.html',
                controller: "ModalSwapRoleCtrl",
                size: 'sm'
            });
            modalInstance.result.then(
                function (result) {
                }
            );
        };
        }]);


/* Setup Layout Part - Sidebar */
/**
 * 菜单
 */
MetronicApp.controller('SidebarController', ['$scope', '$http', 
    function ($scope, $http) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initSidebar(); // init sidebar
        });
    	// 获取菜单列表
		$scope.getMenuList = function() {
			$http.post("menu/listMenu", $scope.vo).success(function(data) {
				if (data.result === 'success') {
					$scope.sidebarList = data.list;
				}
			})
		}
		$scope.getMenuList();
    }]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initFooter(); // init footer
    });
}]);

MetronicApp.controller('ModalSwapRoleCtrl',  function ($scope,$modalInstance) {
	 $scope.userInfo={}
	 $scope.userInfo.authList=[{roleName:'管理员'},{roleName:'店主'},{roleName:'一般用户'}]
	 $scope.cancel = function () {
		 $modalInstance.dismiss('cancel');
     };
     $scope.ok = function () {
		 $modalInstance.dismiss('cancel');
     };
     var checkedItem = {};

     $scope.checkedChange = function (item) {
         checkedItem = item;
     }

});