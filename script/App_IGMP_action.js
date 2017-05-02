/************************************* 应用》IGMP设置》组播设置 *******************************************/
function init_Muticast_set(){
	$.CurrentApp = "AI_Muticast";
	getRequestData("app_igmp_show",{"no":"no"},function(data){
		var wanarryigmp = new Array();
		for(var i in data.igmpwan_list){
			wanarryigmp.push(data.igmpwan_list[i].wan_name);
		}
		if(data.IGMPSnooping_checkbox == "1")
		{
			getTag("Muticast_info","IGMPSnooping_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Muticast_info","IGMPSnooping_checkbox").checkbox.entity.checked = false;	
		}
		if(data.IGMPProxy_checkbox == "1")
		{
			getTag("Muticast_info","IGMPProxy_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Muticast_info","IGMPProxy_checkbox").checkbox.entity.checked = false;	
		}
		if(data.MLDSnooping_checkbox == "1")
		{
			getTag("Muticast_info","MLDSnooping_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Muticast_info","MLDSnooping_checkbox").checkbox.entity.checked = false;	
		}
		if(data.MLDProxy_checkbox == "1")
		{
			getTag("Muticast_info","MLDProxy_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Muticast_info","MLDProxy_checkbox").checkbox.entity.checked = false;	
		}
		for(var j in data.igmpwan_list)
	  {
	  	if(data.igmpwan_list[j].igmp_vlan == "-1")
	  	{
	  		data.igmpwan_list[j].igmp_vlan = " ";
	  	}
	  	else
	  	{
	  		data.igmpwan_list[j].igmp_vlan = data.igmpwan_list[j].igmp_vlan;
	  	}
	  }
		for(var j in data.igmpwan_list)
	  {
			if(data.igmpwan_list[j].wan_name == data.InterfaceSelect_select)
			{
				break;
			}
	 	}
		//ipv6disabled();
		Interfacedisabled();
		autoselect_IGMPwanname(wanarryigmp);
  	autoshow_IGMPwan(wanarryigmp);
  	setAppTagData(data);
  	if(getTag("Muticast_info","InterfaceSelect_select").select.entity.value == "none" || getTag("Muticast_info","InterfaceSelect_select").select.entity.value == "")
  	{
  		getTag("Muticast_info","MulticastSettings_text").text.entity.value = "";
  	}
  	else
  	{
  		getTag("Muticast_info","MulticastSettings_text").text.entity.value = data.igmpwan_list[j].igmp_vlan;
  	}
  	
	});
}
function vlandisplay(data){
	$.CurrentApp = "AI_Muticast";
	for(var i in $.DataMap.igmpwan_list)
	  {
			if($.DataMap.igmpwan_list[i].wan_name == getTag("Muticast_info","InterfaceSelect_select").select.entity.value)
			{
				break;
			}
	 	}
	if(getTag("Muticast_info","InterfaceSelect_select").select.entity.value == "none" || getTag("Muticast_info","InterfaceSelect_select").select.entity.value == "")
  	{
  		getTag("Muticast_info","MulticastSettings_text").text.entity.value = "";
  	}
  	else
  	{
  		getTag("Muticast_info","MulticastSettings_text").text.entity.value = $.DataMap.igmpwan_list[i].igmp_vlan;	
  	}
	
}
function ipv6disabled(){
	$.CurrentApp = "AI_Muticast";
	getTag("Muticast_info","MLDSnooping_checkbox").checkbox.entity.disabled=true;
	getTag("Muticast_info","MLDProxy_checkbox").checkbox.entity.disabled=true;
	if(getTag("Muticast_info","IGMPSnooping_checkbox").checkbox.entity.checked)
	{
		getTag("Muticast_info","MLDSnooping_checkbox").checkbox.entity.checked = true;
	}
	else
	{
		getTag("Muticast_info","MLDSnooping_checkbox").checkbox.entity.checked = false;
	}
	
	if(getTag("Muticast_info","IGMPProxy_checkbox").checkbox.entity.checked)
	{
		getTag("Muticast_info","MLDProxy_checkbox").checkbox.entity.checked = true;
	}
	else
	{
		getTag("Muticast_info","MLDProxy_checkbox").checkbox.entity.checked = false;
	}
	
}

function Interfacedisabled(){
	$.CurrentApp = "AI_Muticast";
	if(getTag("Muticast_info","IGMPProxy_checkbox").checkbox.entity.checked)
	{
		getTag("Muticast_info","InterfaceSelect_select").select.entity.disabled=false;
	}
	else
	{ 
		getTag("Muticast_info","InterfaceSelect_select").select.entity.disabled=true;
	}


}

function add_Muticast_save(){
	$.CurrentApp = "AI_Muticast";
	var MulticastSettings=ID("MulticastSettings_text").value;
	if(MulticastSettings != "" && MulticastSettings != " ")
	{
		if(!checkTag(["Muticast_info"])){return;}
	  if((parseInt(MulticastSettings)< 1)||(parseInt(MulticastSettings)>4094)){
	    checkShow(getTag("Muticast_info","MulticastSettings_text").text,$.CommonLan['range_err']);return;
		}	
  }
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("Muticast_info","IGMPSnooping_checkbox").checkbox.entity.checked)
	 {
	 	obj.IGMPSnooping_checkbox = '1';
	 }
	else
	 {
	 	obj.IGMPSnooping_checkbox = '0';
	 }
	 if(getTag("Muticast_info","IGMPProxy_checkbox").checkbox.entity.checked)
	 {
	 	obj.IGMPProxy_checkbox = '1';
	 }
	else
	 {
	 	obj.IGMPProxy_checkbox = '0';
	 }
	 if(getTag("Muticast_info","MLDSnooping_checkbox").checkbox.entity.checked)
	 {
	 	obj.MLDSnooping_checkbox = '1';
	 }
	else
	 {
	 	obj.MLDSnooping_checkbox = '0';
	 }
	 if(getTag("Muticast_info","MLDProxy_checkbox").checkbox.entity.checked)
	 {
	 	obj.MLDProxy_checkbox = '1';
	 }
	else
	 {
	 	obj.MLDProxy_checkbox = '0';
	 }
	 obj.InterfaceSelect_select = getTag("Muticast_info","InterfaceSelect_select").select.entity.value;
	 if((getTag("Muticast_info","MulticastSettings_text").text.entity.value == "") || (getTag("Muticast_info","MulticastSettings_text").text.entity.value == " "))
	 {
	 		obj.MulticastSettings_text = "-1";
	 }
	 else
	 {
	 		obj.MulticastSettings_text = getTag("Muticast_info","MulticastSettings_text").text.entity.value;
   }	
	setAppDataurl('save','app_igmp_set',obj,function(data){
		$.Refresh();
		});
}
function autoselect_IGMPwanname(igmpwandata){
	$.CurrentApp = "AI_Muticast";
	var sel = getTag('Muticast_info','InterfaceSelect_select').select.entity;
	sel.options.length = igmpwandata.length;
	for(var i=0;i < igmpwandata.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = igmpwandata[i-1]; /*值*/
			 str = igmpwandata[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_IGMPwan(data){
	$.CurrentApp = "AI_Muticast";
	var rowarry = getTag('Muticast_info','InterfaceSelect_select');
	rowarry.select.checked(data.InterfaceSelect_select);
}