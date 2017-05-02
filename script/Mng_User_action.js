/************************************* 管理》用户管理》用户管理telecomadmin *******************************************/
function init_MUuser_set(){
	/*getAppData(function(data){ 
		setAppTagData(data);
   getTagDom("MUuser_info","Username_text","context").html("<span align='left'>useradmin</span>");		
	});*/
	if(document.getElementById('userlevel').value == '1'){
		$.CurrentApp = "MU_User";
		getRequestData("web_query_user_show",{"no":"no"},function(data){
			var usernamestr = "<span>"+data.web_user_name+"</span>";
			getTagDom("MUuser_info","Username_text","context").html(usernamestr);
		});
	}
	else
	{
		$.CurrentApp = "MU_Useradmin";
		init_MUuseradmin_set();
	}
}
function add_MUuser_save(){
	$.CurrentApp = "MU_User";
	if(!checkTag(["MUuser_info"])){return;}
	var str1password=ID("PwdNew_password").value;
	var str2password=ID("PwdCfm_password").value;
	if(str1password != str2password){
	    checkShow(getTag("MUuser_info","PwdCfm_password").text,$.CommonLan['password_err']);return;
	}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	 obj.current_user_level = "1";
	 obj.new_password = getTag("MUuser_info","PwdNew_password").text.entity.value;
	 //obj.Username_text = "useradmin";
	 //obj.PwdNew_password = getTag("MUuser_info","PwdNew_password").text.entity.value;
	 //obj.PwdCfm_password = getTag("MUuser_info","PwdCfm_password").text.entity.value;
	 
	setAppDataurl('save','management_user_set',obj,function(data){
		$.Refresh();
		});
}
/************************************* 管理》用户管理》用户管理user *******************************************/
function init_MUuseradmin_set(){
	$.CurrentApp = "MU_Useradmin";
	/*getAppData(function(data){ 
		setAppTagData(data);
   getTagDom("MUuseradmin_info","Usernameadmin_text","context").html("useradmin");		
	});*/
	
	getRequestData("web_query_user_show",{"no":"no"},function(data){
		var usernamestr = data.web_user_name;
		getTagDom("MUuseradmin_info","Usernameadmin_text","context").html(usernamestr);
	});
	
	
}
function add_MUuseradmin_save(){
	$.CurrentApp = "MU_Useradmin";
	if(!checkTag(["MUuseradmin_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	 obj.current_user_level = "2";
	 obj.old_password = getTag("MUuseradmin_info","Pwdold_password").text.entity.value;
	 obj.new_password = getTag("MUuseradmin_info","Pwdnewn_password").text.entity.value;
	 //obj.Usernameadmin_text = "useradmin";
	 //obj.Pwdold_password = getTag("MUuseradmin_info","Pwdold_password").text.entity.value;
	 //obj.Pwdnewn_password = getTag("MUuseradmin_info","Pwdnewn_password").text.entity.value;
	 
	setAppDataurl('save','management_user_set',obj,function(data){
		$.Refresh();
		});
	
	
}