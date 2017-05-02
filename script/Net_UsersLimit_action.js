/************************************* 网络》用户数限制》用户数限制 *************************************/
/*初始化页面*/
function init_userslimit_set() {
	getRequestData("users_limit_show",{"no":"no"},function(data){
		setAppTagData(data);
		getTag("UsersLimit_info","UsersLimit_select").select.entity.value = data.UsersLimit_select;
		getTag("UsersLimit_info","UsersLimit_text").text.entity.value = data.UsersLimit_text;
	});
}

function UsersLimit_disabled() {
	if(getTag("UsersLimit_info","UsersLimit_select").select.entity.value == "1"){
		getTag("UsersLimit_info","UsersLimit_text").show();
	}else{
		getTag("UsersLimit_info","UsersLimit_text").hide();
		getTag("UsersLimit_info","UsersLimit_text").text.entity.value = "";
	}
}
function add_UsersLimit_save() {
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.UsersLimit_select = getTag("UsersLimit_info","UsersLimit_select").select.entity.value;
	obj.UsersLimit_text = getTag("UsersLimit_info","UsersLimit_text").text.entity.value;
	setAppDataurl('save','users_limit_set',obj,function(data){
		$.Refresh();
		});
}