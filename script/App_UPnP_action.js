/************************************* 应用》UPNP设置》UPNP设置 *************************************/
function init_upnp_set(){
	$.CurrentApp = "AU_UPnP";
getRequestData("upnp_app_show",{"no":"no"},function(data){
		setAppTagData(data);
		if(data.UPnPEnable_checkbox == "1")
		{
			getTag("UPnP_label","UPnPEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("UPnP_label","UPnPEnable_checkbox").checkbox.entity.checked = false;	
		}
	});

}
function add_upnp_save(){
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("UPnP_label","UPnPEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.UPnPEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.UPnPEnable_checkbox = '0';
	 }
	setAppDataurl('save','upnp_app_set',obj,function(data){
		$.Refresh();
		});	

}