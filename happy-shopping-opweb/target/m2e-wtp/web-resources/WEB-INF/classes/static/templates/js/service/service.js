/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    $rootScope.settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 200
            // auto scroll to top on page load
        },
        layoutImgPath: Metronic.getAssetsPath() + 'layout/img/',
        layoutCssPath: Metronic.getAssetsPath() + 'layout/css/',
    };

    return $rootScope.settings;
}]);

//
MetronicApp.factory('RecursionHelper', ['$compile', function ($compile) {
    return {
        /**
         * Manually compiles the element, fixing the recursion loop.
         * @param element
         * @param [link] A post-link function, or an object with function(s) registered via pre and post properties.
         * @returns An object containing the linking functions.
         */
        compile: function (element, link) {
            // Normalize the link parameter
            if (angular.isFunction(link)) {
                link = {
                    post: link
                };
            }

            // Break the recursion loop by removing the contents
            var contents = element.contents().remove();
            var compiledContents;
            return {
                pre: (link && link.pre) ? link.pre : null,
                /**
                 * Compiles and re-adds the contents
                 */
                post: function (scope, element) {
                    // Compile the contents
                    if (!compiledContents) {
                        compiledContents = $compile(contents);
                    }
                    // Re-add the compiled contents to the element
                    compiledContents(scope, function (clone) {
                        element.append(clone);
                    });
                    // Call the post-linking function, if any
                    if (link && link.post) {
                        link.post.apply(null, arguments);
                    }
                }
            };
        }
    };
}]);
/**
 * 自定义alert提示窗口<br>
 *
 * usage:<br>
 * 1) 只提示消息
 *    ejpAlert.show('your message');
 * 2) 自定义标题的提示消息
 *    ejpAlert.show({title:'your title',msg:'your message'});
 * 3) 带响应操作的提示消息
 *    ejpAlert.show('your message').result.then(function(param){
 *    	  // OK 按钮响应
 *        // your code
 *    },function(param){
 *        // 取消按钮响应
 *        // your code
 *    });
 * */
MetronicApp.service('myAlert', ['$modal', '$http', 'toastr', function ($modal, $http, toastr) {
    /*消息提示模式窗口*/
    this.show = function (config) {
        var DEFAULT = {
            templateUrl: 'views/common/model/popupMessage.html',
            controller: function ($scope, $modalInstance, items) {
                $scope.results = items;
                // 确认按钮
                $scope.ok = function () {
                    $modalInstance.close();
                };
                // 取消按钮
                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            },
            size: 'sm',
            title: '提示消息',
            msg: ''
        };
        var cfg = (Object.prototype.toString.call(config) === "[object String]") ? $.extend(DEFAULT, {msg: config}) : $.extend(DEFAULT, config);

        //创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: cfg.templateUrl,
            controller: cfg.controller,
            size: cfg.size,
            resolve: {
                items: function () {
                    return {title: cfg.title, msg: cfg.msg};
                }
            }
        });
        return modalInstance;
    };
    /* 消息确认窗口 */
    this.confirm = function (config){
    	var DEFAULT = {
    			templateUrl:'views/common/model/popupConfirmMessage.html',
    			controller:function($scope, $modalInstance, items){
    				$scope.results = items;
    				// 确认按钮
    				$scope.ok = function() {
    					$modalInstance.close();
    				}; 
    				// 取消按钮
    				$scope.cancel = function() {
    					$modalInstance.dismiss('cancel');
    				};
    			},
    			size:'sm',
    			title:'确认消息',
    			msg:''
    	}
    	var cfg = (Object.prototype.toString.call(config) === "[object String]") ? $.extend(DEFAULT, {msg:config}) : $.extend(DEFAULT, config);
    	//创建弹框对象
        var modalInstance = $modal.open({
            templateUrl: cfg.templateUrl,
            controller: cfg.controller,
            size: cfg.size,
            resolve: {
            	items: function() {
                    return {title:cfg.title,msg:cfg.msg};
                }
            }
        });
        return modalInstance;
    }
}]);



