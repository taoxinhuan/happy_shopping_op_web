/**
 * 店铺管理
 */
MetronicApp.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
			$stateProvider
				//商品列表
				.state(
						'shopList',
						{
							url : "/shopList.html",
							templateUrl : "views/shop/shopList.html",
							data : {
	                            pageTitle: '店铺列表',
							},
							ncyBreadcrumb : {
								label : '店铺列表',
								parent:'shop_manage'
							},
							controller : "shopListController",
							resolve : {
								deps : function($ocLazyLoad) {
											return $ocLazyLoad.load([ {
														name : 'MetronicApp',
														files : [
																'../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
																'../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
																'../assets/global/plugins/jquery.cityselect.js',
																'../assets/global/plugins/jquery.cityselect.init.js',
																'views/shop/controller/shopListController.js' ]
													} ]);
										} 
							}
						})
				//店铺新增
				.state(
						'addShop',
						{
							url : "/addShop.html",
							templateUrl : "views/shop/addShop.html",
							data : {
	                            pageTitle: '店铺新增',
	                            caption : '店铺新增'
							},
							ncyBreadcrumb : {
								label : '店铺新增',
								parent:'shopList'
							},
							controller : "addShopController",
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
																'views/shop/controller/addShopController.js' ]
													},{
						                         		name: "angularFileUpload",
						                         		files: ["../assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js"]
						                         	}
													]);
										} ]
							}
						})
				//店铺编辑
				.state(
						'editShop',
						{
							url : "/editShop/:id",
							templateUrl : "views/shop/editShop.html",
							data : {
	                            pageTitle: '店铺编辑',
	                            caption : '店铺编辑'
							},
							ncyBreadcrumb : {
								label : '店铺编辑',
								parent:'shopList'
							},
							controller : "editShopController",
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
																'views/shop/controller/editShopController.js' ]
													},{
						                         		name: "angularFileUpload",
						                         		files: ["../assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js"]
						                         	}
													]);
										} ]
							}
						})
				//店铺详情
				.state(
						'shopMenu',
						{
							url : "/shopMenu/:id",
							templateUrl : "views/shop/shopMenu.html",
							data : {
	                            pageTitle: '店铺详情',
							},
							ncyBreadcrumb : {
								label : '店铺详情',
								parent:'shopList'
							},
							controller : "shopMenuController",
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
																'views/shop/controller/shopMenuController.js' ]
													} ]);
										} ]
							}
						})
				//店铺详情
				.state(
						'shopMenu.shopDetail',
						{
							url : "/shopDetail",
							templateUrl : "views/shop/shopDetail.html",
							data : {
	                            pageTitle: '店铺详情',
	                            caption : '店铺详情'
							},
							ncyBreadcrumb : {
								label : '店铺详情',
								parent:'shopList'
							},
							controller : "shopDetailController",
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
																'views/shop/controller/shopDetailController.js' ]
													} ]);
										} ]
							}
						})
				//店铺账号
				.state(
						'shopMenu.shopAccount',
						{
							url : "/shopAccount",
							templateUrl : "views/shop/shopAccount.html",
							data : {
	                            pageTitle: '店铺账号',
							},
							ncyBreadcrumb : {
								label : '店铺账号',
								parent:'shopList'
							},
							controller : "shopAccountController",
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
																'views/shop/controller/shopAccountController.js' ]
													} ]);
										} ]
							}
						})
						
				}]);