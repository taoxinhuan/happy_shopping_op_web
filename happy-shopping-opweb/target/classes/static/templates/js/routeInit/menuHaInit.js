/**
 * 菜单管理
 */
MetronicApp.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state(
						'menuList',
						{
							url : "/menuList.html",
							templateUrl : "views/menu/menuList.html",
							data : {
	                            pageTitle: '菜单列表',
							},
							ncyBreadcrumb : {
								label : '菜单列表',
								parent:'menu_manage'
							},
							controller : "menuListController",
							resolve : {
								deps : function($ocLazyLoad) {
											return $ocLazyLoad.load([ {
														name : 'MetronicApp',
														files : [
																'../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
																'../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
																'../assets/global/plugins/jquery.cityselect.js',
																'../assets/global/plugins/jquery.cityselect.init.js',
																'views/menu/controller/menuListController.js' ]
													} ]);
										} 
							}
						})
				//菜单新增
				.state(
						'addMenu',
						{
							url : "/addMenu.html",
							templateUrl : "views/menu/addMenu.html",
							data : {
	                            pageTitle: '菜单新增',
	                            caption : '菜单新增'
							},
							ncyBreadcrumb : {
								label : '菜单新增',
								parent:'menuList'
							},
							controller : "addMenuController",
							resolve : {
								deps : [
										'$ocLazyLoad',
										function($ocLazyLoad) {
											return $ocLazyLoad
													.load([ {
														name : 'MetronicApp',
														insertBefore : '#ng_load_plugins_before',
														files : [
																'../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
																'../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
																'../assets/global/plugins/jquery.cityselect.js',
																'../assets/global/plugins/jquery.cityselect.init.js',
																'views/menu/controller/addMenuController.js' ]
													}]);
										} ]
							}
						})
				//编辑
				.state(
						'editMenu',
						{
							url : "/editMenu/:id",
							templateUrl : "views/menu/editMenu.html",
							data : {
	                            pageTitle: '菜单编辑',
	                            caption : '菜单编辑'
							},
							ncyBreadcrumb : {
								label : '菜单编辑',
								parent:'menuList'
							},
							controller : "editMenuController",
							resolve : {
								deps : [
										'$ocLazyLoad',
										function($ocLazyLoad) {
											return $ocLazyLoad
													.load([ {
														name : 'MetronicApp',
														insertBefore : '#ng_load_plugins_before',
														files : [
																'../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
																'../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
																'../assets/global/plugins/jquery.cityselect.js',
																'../assets/global/plugins/jquery.cityselect.init.js',
																'views/menu/controller/editMenuController.js' ]
													}
													]);
										} ]
							}
						})
				//详情
				.state(
						'menuDetail',
						{
							url : "/menuDetail/:id",
							templateUrl : "views/menu/menuDetail.html",
							data : {
	                            pageTitle: '菜单详情',
							},
							ncyBreadcrumb : {
								label : '菜单详情',
								parent:'menuList'
							},
							controller : "menuDetailController",
							resolve : {
								deps : [
										'$ocLazyLoad',
										function($ocLazyLoad) {
											return $ocLazyLoad
													.load([ {
														name : 'MetronicApp',
														insertBefore : '#ng_load_plugins_before',
														files : [
																'../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
																'../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
																'../assets/global/plugins/jquery.cityselect.js',
																'../assets/global/plugins/jquery.cityselect.init.js',
																'views/menu/controller/menuDetailController.js' ]
													} ]);
										} ]
							}
						})
						
				}]);