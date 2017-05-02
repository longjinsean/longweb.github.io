/************************************* 安全》防火墙》防火墙 ***************************************/
function init_Firewall_set(){
getRequestData("firewall_filter_show",{"no":"no"},function(data){
		setAppTagData(data);
		if(data.FirewallEnable_checkbox == "1")
		{
			getTag("Firewall_info","FirewallEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Firewall_info","FirewallEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.DosEnable_checkbox == "1")
		{
			getTag("Firewall_info","DosEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Firewall_info","DosEnable_checkbox").checkbox.entity.checked = false;	
		}
	});	
	
	
}
function add_Firewall_save(){
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("Firewall_info","FirewallEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.FirewallEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.FirewallEnable_checkbox = '0';
	 }
	
	obj.Firewalllevel_select = getTag("Firewall_info","Firewalllevel_select").select.entity.value; 
	 
	if(getTag("Firewall_info","DosEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.DosEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.DosEnable_checkbox = '0';
	 }
	
	setAppDataurl('save','firewall_filter_set',obj,function(data){
		$.Refresh();
		});	
	
}