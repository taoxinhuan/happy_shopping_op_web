/**
 * 枚举字典的下拉框
 * 
 */
MetronicApp.directive("dictionarySelect",[function(){
	return {
		restrict:'A',
		scope:{
			dictionaryType:'@',
		},
		controller:'dictionarySelectController',
		link : function($scope,element,attr,dictionarySelectController){
			
			//渲染数据函数
			dictionarySelectController.multiselectFun = function(jsonData){
				if(jsonData){
					var optionList = [] ;
					angular.forEach(jsonData,function(item){
						//json转成option格式  
			            var obj = new Object();  
			            obj.label = item.name;  
			            obj.title = item.name;  
			            obj.value = item.id;  
			            optionList.push(obj);
			            //初始化multiselect参数
						element.multiselect({
							buttonWidth: '100%',
							inheritClass: true,//继承原来select的button的class  
							enableFiltering: true,
							includeSelectAllOption: true,//全选  
							selectAllText: '全选',//全选的checkbox名称  
							nonSelectedText: '请选择',//没有值的时候button显示值  
							numberDisplayed: 4,//当超过4个标签的时候显示n个被选中  
							templates: {  
						        button: '<button type="button" class="multiselect dropdown-toggle" data-toggle="dropdown" style="text-align:center;background-color: #ffffff;border: 1px solid #e5e5e5;"><span class="multiselect-selected-text"></span></button>',  
						        ul: '<ul class="multiselect-container dropdown-menu" style="max-height: 200px;overflow-x: hidden;overflow-y: auto;-webkit-tap-highlight-color: rgba(0,0,0,0);"></ul>',  
						        filter: '<li class="multiselect-item multiselect-filter"><div class="input-group"><span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span><input class="form-control multiselect-search" type="text"></div></li>',  
						        filterClearBtn: '<span class="input-group-btn"></span>',  
						        li: '<li><a tabindex="0"><label style="margin-left:20%;"></label></a></li>',  
						        divider: '<li class="multiselect-item divider"></li>',  
						        liGroup: '<li class="multiselect-item multiselect-group"><label></label></li>'  
						    }  ,
							onChange: function (option, checked) {//change事件改变   
								var selectValueStr = [];  
								element.each(function () {  
							        selectValueStr.push($(this).val());  
							    });  
							    return selectValueStr; 
					        }, 
						})
					})
					element.multiselect('dataprovider',optionList);
				}
			}
		},
	}
}]);
