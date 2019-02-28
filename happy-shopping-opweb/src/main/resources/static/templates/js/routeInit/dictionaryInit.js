/**
 * 字典管理
 */
MetronicApp.config(['$stateProvider','$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state(
						'dictionaryList',
						{
							url : "/dictionaryList.html",
							templateUrl : "views/dictionary/dictionaryList.html",
							data : {
	                            pageTitle: '字典列表',
							},
							ncyBreadcrumb : {
								label : '字典列表',
								parent:'dictionary_manage'
							},
							controller : "dictionaryListController",
							resolve : {
								deps : function($ocLazyLoad) {
											return $ocLazyLoad.load([ {
														name : 'MetronicApp',
														files : [
																'../assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
																'../assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js',
																'../assets/global/plugins/jquery.cityselect.js',
																'../assets/global/plugins/jquery.cityselect.init.js',
																'views/dictionary/controller/dictionaryListController.js' ]
													} ]);
										} 
							}
						})
				//字典新增
				.state(
						'addDictionary',
						{
							url : "/addDictionary.html",
							templateUrl : "views/dictionary/addDictionary.html",
							data : {
	                            pageTitle: '字典新增',
	                            caption : '字典新增'
							},
							ncyBreadcrumb : {
								label : '字典新增',
								parent:'dictionaryList'
							},
							controller : "addDictionaryController",
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
																'views/dictionary/controller/addDictionaryController.js' ]
													}]);
										} ]
							}
						})
				//编辑
				.state(
						'editDictionary',
						{
							url : "/editDictionary/:id",
							templateUrl : "views/dictionary/editDictionary.html",
							data : {
	                            pageTitle: '字典编辑',
	                            caption : '字典编辑'
							},
							ncyBreadcrumb : {
								label : '字典编辑',
								parent:'dictionaryList'
							},
							controller : "editDictionaryController",
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
																'views/dictionary/controller/editDictionaryController.js' ]
													}
													]);
										} ]
							}
						})
				//详情
				.state(
						'dictionaryDetail',
						{
							url : "/dictionaryDetail/:id/:name/:code",
							templateUrl : "views/dictionary/dictionaryDetail.html",
							data : {
	                            pageTitle: '字典详情',
							},
							ncyBreadcrumb : {
								label : '字典详情',
								parent:'dictionaryList'
							},
							controller : "dictionaryDetailController",
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
																'views/dictionary/controller/dictionaryDetailController.js' ]
													} ]);
										} ]
							}
						})
						
				}]);