MetronicApp.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
	// 默认跳转路径
	$urlRouterProvider.otherwise("/dashboard.html");

	$stateProvider
	
	// 系统设置
	.state('sysSetting_manage_menu',{
		ncyBreadcrumb:{
			label:'系统设置'
		}
	})

	//店铺管理
	.state('shop_manage',{
		ncyBreadcrumb:{
			label:'店铺管理'
		}
	})
	//菜单管理
	.state('menu_manage',{
		ncyBreadcrumb:{
			label:'菜单管理'
		}
	})
	//用户管理
	.state('user_manage',{
		ncyBreadcrumb:{
			label:'用户管理'
		}
	})
	//字典管理
	.state('dictionary_manage',{
		ncyBreadcrumb:{
			label:'用户管理'
		}
	})

	
}]);
