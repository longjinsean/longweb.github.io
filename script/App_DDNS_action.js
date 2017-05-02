/************************************* 应用》DDNS设置》DDNS设置 *************************************/
function init_ddns_set(){
	$.CurrentApp = "AD_DDNS";
getRequestData("ddns_app_show",{"no":"no"},function(data){
    var wanarryddns = new Array();
		for(var i in data.ddnswan_list){
			wanarryddns.push(data.ddnswan_list[i].wan_name);
		}
		if(data.DDNSCfgEnabled_Value == "1")
		{
			getTag("ddns_info","DDNSCfgEnabled_Value").checkbox.entity.checked = true;
		}else
		{
			getTag("ddns_info","DDNSCfgEnabled_Value").checkbox.entity.checked = false;	
		}
		data.DDNSProvider = $.CommonLan["Peanut_shells"];
	autoselect_ddnswan(wanarryddns);
	autoshow_ddnswan(wanarryddns);
	setAppTagData(data);
	});
	//getTagDom("ddns_info","DDNSProvider","context").html($.CommonLan["Peanut_shells"]);
	
}
function ddns_Submit(){
	if(!checkTag(["ddns_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("ddns_info","DDNSCfgEnabled_Value").checkbox.entity.checked)
	 {
	 	obj.DDNSCfgEnabled_Value = '1';
	 }
	else
	 {
	 	obj.DDNSCfgEnabled_Value = '0';
	 }
	obj.DDNSProvider = "ddnsserver1";
	obj.ServicePort_text = getTag("ddns_info","ServicePort_text").text.entity.value;
	obj.DDNSUsername_text = getTag("ddns_info","DDNSUsername_text").text.entity.value;
	obj.DDNSPassword_password = getTag("ddns_info","DDNSPassword_password").text.entity.value;
	obj.DDNSWANInterface_select = getTag("ddns_info","DDNSWANInterface_select").select.entity.value;
	obj.DDNSDomainName_text = getTag("ddns_info","DDNSDomainName_text").text.entity.value;
	obj.DDNSHostName_text = getTag("ddns_info","DDNSHostName_text").text.entity.value;
	setAppDataurl('save','ddns_app_set',obj,function(data){
		$.Refresh();
		});	
	
}
function ddns_Cancel(){
	$.Refresh();
}

function autoselect_ddnswan(wanarryddns){
	var sel = getTag('ddns_info','DDNSWANInterface_select').select.entity;
	sel.options.length = wanarryddns.length;
	for(var i=0;i < wanarryddns.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarryddns[i-1]; /*值*/
			 str = wanarryddns[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_ddnswan(data){
	var rowarry = getTag('ddns_info','DDNSWANInterface_select');
	rowarry.select.checked(data.DDNSWANInterface_select);
}