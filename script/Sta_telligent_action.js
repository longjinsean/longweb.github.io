/************************************* 状态》智能应用管理》智能网关连接状态 *************************************/
function init_Intelligent_set(){
	getAppData(function(data){ 
		data = $.DataMap;
		setAppTagData($.DataMap);
	});
}