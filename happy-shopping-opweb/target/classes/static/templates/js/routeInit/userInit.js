/**
 * 店铺管理
 */
MetronicApp.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
			$stateProvider
				//商品列表
				.state(
						'userList',
						{
							url : "/userList.html",
							templateUrl : "views/user/userList.html",
							data : {
	                            pageTitle: '用户列表',
							},
							ncyBreadcrumb : {
								label : '用户列表',
								parent:'user_manage'
							},
							controller : "userListController",
							resolve : {
								deps : function($ocLazyLoad) {
											return $ocLazyLoad.load([ {
														name : 'MetronicApp',
														files : [
																'../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
																'../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
																'../assets/global/plugins/jquery.cityselect.js',
																'../assets/global/plugins/jquery.cityselect.init.js',
																'views/user/controller/userListController.js' ]
													} ]);
										} 
							}
						})
					//用户详情
				.state(
						'userMenu',
						{
							url : "/userMenu/:id",
							templateUrl : "views/user/userMenu.html",
							data : {
	                            pageTitle: '用户详情',
							},
							ncyBreadcrumb : {
								label : '用户详情',
								parent:'userList'
							},
							controller : "userMenuController",
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
																'views/user/controller/userMenuController.js' ]
													} ]);
										} ]
							}
						})
				//用户详情
				.state(
						'userMenu.userDetail',
						{
							url : "/userDetail",
							templateUrl : "views/user/userDetail.html",
							data : {
	                            pageTitle: '用户详情',
	                            caption : '用户详情'
							},
							ncyBreadcrumb : {
								label : '用户详情',
								parent:'userList'
							},
							controller : "userDetailController",
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
																'views/user/controller/userDetailController.js' ]
													} ]);
										} ]
							}
						})
				//收货地址
				.state(
						'userMenu.userAddress',
						{
							url : "/userAddress",
							templateUrl : "views/user/userAddress.html",
							data : {
	                            pageTitle: '用户收货地址',
							},
							ncyBreadcrumb : {
								label : '用户收货地址',
								parent:'userList'
							},
							controller : "userAddressController",
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
																'views/user/controller/userAddressController.js' ]
													} ]);
										} ]
							}
						})
						
				}]);