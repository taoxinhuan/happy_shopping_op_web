/*******************************************************************************
 * Metronic AngularJS App Main Script
 ******************************************************************************/

/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ngCookies", "ui.router", "ui.bootstrap", "ui.select",
    "oc.lazyLoad", "ngSanitize", "pasvaz.bindonce", "ngMessages",
    "blockUI", "toastr", "ncy-angular-breadcrumb", "chart.js"]);

/* Configure angular-block-ui */
MetronicApp.config(['blockUIConfig', function (blockUIConfig) {
    // Change the default overlay message
    blockUIConfig.message = '加载中...';

    // Change the default delay to 100ms before the blocking is visible
    blockUIConfig.delay = 100;

    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = false;

    // Disable auto body block
    blockUIConfig.autoInjectBodyBlock = false;

    // Provide the custom template via a url
    blockUIConfig.templateUrl = 'shared/block-ui-tpl.html';

}]);
/* Init global settings and run the app */
MetronicApp.run(["$rootScope",'settings', "$state",
    function ($rootScope,settings, $state) {
        $rootScope.$state = $state; // state to be accessed from view
    }]);

/* Configure angular-breadscrumb */
MetronicApp.config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        prefixStateName: 'dashboard',
        templateUrl: 'shared/breadscrumb-tpl.html'
    });
});

/*******************************************************************************
 * BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
 ******************************************************************************/
/**
 * `$controller` will no longer look for controllers on `window`. The old
 * behavior of looking on `window` for controllers was originally intended for
 * use in examples, demos, and toy apps. We found that allowing global
 * controller functions encouraged poor practices, so we resolved to disable
 * this behavior by default.
 *
 * To migrate, register your controllers with modules rather than exposing them
 * as globals:
 *
 * Before:
 *
 * ```javascript function MyController() { // ... } ```
 *
 * After:
 *
 * ```javascript angular.module('myApp', []).controller('MyController',
 * [function() { // ... }]);
 *
 * Although it's not recommended, you can re-enable the old behavior like this:
 *
 * ```javascript angular.module('myModule').config(['$controllerProvider',
 * function($controllerProvider) { // this option might be handy for migrating
 * old apps, but please don't use it // in new ones!
 * $controllerProvider.allowGlobals(); }]);
 */

// AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function ($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it in new ones!
    $controllerProvider.allowGlobals();
}]);

/*******************************************************************************
 * END: BREAKING CHANGE in AngularJS v1.3.x:
 ******************************************************************************/

/*******************************************************************************
 * config httpProvider add myIterceptors
 ******************************************************************************/
MetronicApp.config(function (toastrConfig) {
    angular.extend(toastrConfig, {
        timeOut: 10000,
        positionClass: 'toast-top-center',
        closeButton: true,
        closeHtml: '<button></button>'
    })
});
MetronicApp.config(['$httpProvider', function ($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    //禁用IE对ajax的缓存
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    $httpProvider.interceptors.push(['$rootScope', '$location', '$log', '$q', 'toastr', function ($rootScope, $location, $log, $q, toastr) {
        return {
            request: function (config) {
              	if(!config.notShowLoading){
            		// 正在加载
                    Metronic.blockUI({ message: '正在提交，请稍后...',boxed:true,zIndex:99999});
            	}
              	if(_hmt){
					_hmt.push(['_trackPageview', "/"+config.url]);
				}
                return config;
            },
            response: function (resp) {
            	// 取消正在加载
                Metronic.unblockUI();
                //统一处理响应数据
                if ('fail' === resp.data.result) {
                    toastr.info(resp.data.message, 'Info');
                    delete resp.data.result;
                } else if ('error' === resp.data.result) {
                    toastr.error(resp.data.message, 'Error');
                    delete resp.data.result;
                } else if ('success' === resp.data.result) {
                    delete resp.data.detailMessage;
                } else if ('failure' === resp.data.result) {
                    toastr.error(resp.data.message, 'Error');
                    $location.path('/dashboard.html');
                }
                return resp;
            },
            responseError: function (rejection) {
            	// 取消正在加载
                Metronic.unblockUI();
                var status = rejection.status;
                if (status === 403 || status == 405) {
                	var responseMessage = decodeURI(rejection.headers("responseMessage"));
                	if (!responseMessage) {
                		responseMessage = "访问异常，请联系运维人员！";
                	}
                    toastr.warning(responseMessage, "警告", {
                        timeOut: 3000,
                        preventOpenDuplicates: true,
                        onHidden: function () {
                            var redirectURI = rejection.headers("redirectURI");
                            if (redirectURI) {
                                window.location = redirectURI;
                            } else {
                            	window.location = "/templates/login.html";
                            }
                        }
                    });
                    return rejection;
                }
                if (rejection) {
                    if (rejection.status === 404) {
                        $rootScope.msg = "请求资源不存在：" + rejection.config.url;
                        $location.path('/error.html');
                    }
                } else {
                    $rootScope.msg = "未知问题，请联系运维人员！";
                    $location.path('/error.html');
                }
                return rejection;
            }
        };
    }]);
}]);

// tooltip directive
MetronicApp.directive('tooltips', [function () {
    return {
        restrict: "C",
        link: function (scope, elem) {
            $(elem).tooltip();
        }
    };
}]);

MetronicApp.directive('datepicker', [function () {
    return {
        restrict: "C",
        link: function (scope, elem) {
            $(elem).datepicker({
                language: "zh-CN",
                autoclose: true,//选中之后自动隐藏日期选择框
                format: "yyyy-mm-dd"//日期格式
            });
        }
    };
}]);
MetronicApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});

MetronicApp.filter('propsFilter', function () {
    return function (items, props) {
        var out = [];

        if (angular.isArray(items)) {
            var keys = Object.keys(props);

            items.forEach(function (item) {
                var itemMatches = false;

                for (var i = 0; i < keys.length; i++) {
                    var prop = keys[i];
                    var text = props[prop].toLowerCase();
                    if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                        itemMatches = true;
                        break;
                    }
                }

                if (itemMatches) {
                    out.push(item);
                }
            });
        } else {
            // Let the output be the input untouched
            out = items;
        }

        return out;
    };
});
/* Setup Rounting For All Pages */
MetronicApp
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            // Redirect any unmatched url
            $urlRouterProvider.otherwise("/dashboard.html");

            $stateProvider
                .state(
                    'dashboard',
                    {
                        url: "/dashboard.html",
                        templateUrl: "views/dashboard.html",
                        data: {
                            pageTitle: '首页'
                        },
                        ncyBreadcrumb: {
                            label: '<i class="fa fa-home"></i>首页',
                        },
                        controller: "DashboardController",
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad
                                        .load({
                                            name: 'MetronicApp',
                                            insertBefore: '#ng_load_plugins_before', // load
                                            files: [
                                                '../assets/global/plugins/bootstrap-daterangepicker/daterangepicker-bs3.css',
                                                '../assets/amcharts/angular-chart.css',
                                                '../assets/pages/scripts/index.js',
                                                '../assets/amcharts/angular-chart.js',
                                                'js/controllers/DashboardController.js'

                                            ]
                                        });
                                }]
                        }
                    })

                // 错误页
                .state(
                    'error',
                    {
                        url: "/error.html",
                        templateUrl: "shared/error.html",
                        data: {
                            pageTitle: '出错了'
                        },
                        ncyBreadcrumb: {
                            // label : '<i class="fa
                            // fa-home"></i>首页',
                        },
                        controller: "ErrorController",
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function ($ocLazyLoad) {
                                    return $ocLazyLoad
                                        .load({
                                            name: 'MetronicApp',
                                            insertBefore: '#ng_load_plugins_before', // load
                                            files: ['js/controllers/ErrorController.js']
                                        });
                                }]
                        }
                    })

        }]);

/**
 * 扩展数组删除方法
 **/
Array.prototype.remove = function (item, predicate) {
    if (this === null) {
        throw new TypeError('Array.prototype.remove called on null or undefined');
    }
    if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
    }
    if (typeof item !== "undefined") {
        for (var i = 0; i < this.length; i++) {
            if (predicate(item, this[i])) {
                this.splice(i, 1);
                return this;
            }
        }
        return false;
    }
    return false;
};

/**
 *
 **/
String.prototype.hashcode = function () {
    var str = this;
    var hash = 0;
    if (str.length == 0) return hash;
    for (i = 0; i < str.length; i++) {
        char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

/**
 * 把层次结构的属性，转成扁平的属性
 */
function toFlat(obj, rtnObj, preKey) {
    if (typeof rtnObj != "object") {
        rtnObj = {};
    }

    Object.getOwnPropertyNames(obj).forEach(function (key) {
        if (obj[key] != null && obj[key] != undefined && obj[key] != 'function') {
            var nKey = preKey ? preKey + '.' + key : key;

            if (Array.isArray(obj[key])) {
                rtnObj[nKey] = obj[key].join(',');
            } else if (typeof obj[key] === "string" || typeof obj[key] === "number" || typeof obj[key] === "boolean") {
                rtnObj[nKey] = obj[key];
            } else if (toString.call(obj[key]) === '[object Date]') {
                rtnObj[nKey] = new Date(obj[key]).toLocaleDateString();
            } else if (typeof obj[key] === "object") {
                toFlat(obj[key], rtnObj, nKey);
            }
        }
    });

    return rtnObj;
};
