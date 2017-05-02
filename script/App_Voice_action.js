/************************************* 应用》宽带电话设置》协议切换 *************************************/
var current_voice = "-";
/*function init_voice_server(){
	getRequestData("voice_servertype_show",{"no":"no"},function(data){
	current_voice = data.ServerType_select;
	if(data.ServerType_select == "1")
	{
		document.getElementById("Menu3_AV_Basic").style.display='block';
		document.getElementById("Menu3_AV_BasicH248").style.display='none';
		document.getElementById("Menu3_AV_Advanced").style.display='block';
		document.getElementById("Menu3_AV_AdvancedH248").style.display='none';
		document.getElementById("Menu3_AV_Addtional").style.display='block';
		document.getElementById("Menu3_AV_AddtionalIMS").style.display='none';
		document.getElementById("Menu3_AV_AddtionalH248").style.display='none';
		document.getElementById("Menu3_AV_Digitalmap").style.display='block';
		document.getElementById("Menu3_AV_DigitalmapH248").style.display='none';
	}else if(data.ServerType_select == "0")
	{
		document.getElementById("Menu3_AV_Basic").style.display='block';
		document.getElementById("Menu3_AV_BasicH248").style.display='none';
		document.getElementById("Menu3_AV_Advanced").style.display='block';
		document.getElementById("Menu3_AV_AdvancedH248").style.display='none';
		document.getElementById("Menu3_AV_Addtional").style.display='none';
		document.getElementById("Menu3_AV_AddtionalIMS").style.display='block';
		document.getElementById("Menu3_AV_AddtionalH248").style.display='none';
		document.getElementById("Menu3_AV_Digitalmap").style.display='block';
		document.getElementById("Menu3_AV_DigitalmapH248").style.display='none';
	}else if(data.ServerType_select == "2")
  {
	  document.getElementById("Menu3_AV_Basic").style.display='none';
		document.getElementById("Menu3_AV_BasicH248").style.display='block';
		document.getElementById("Menu3_AV_Advanced").style.display='none';
		document.getElementById("Menu3_AV_AdvancedH248").style.display='block';
		document.getElementById("Menu3_AV_Addtional").style.display='none';
		document.getElementById("Menu3_AV_AddtionalIMS").style.display='none';
		document.getElementById("Menu3_AV_AddtionalH248").style.display='block';
		document.getElementById("Menu3_AV_Digitalmap").style.display='none';
		document.getElementById("Menu3_AV_DigitalmapH248").style.display='block';
  }
  if(data.ServerType_select == '0')
  {
  	getTag("avpchange_info","ServerType_select").panel[0].radio.entity.checked = true;
  	getTag("avpchange_info","ServerType_select").panel[1].radio.entity.checked = false;
  	getTag("avpchange_info","ServerType_select").panel[2].radio.entity.checked = false;
  }
  else if(data.ServerType_select == '1')
  {
  	getTag("avpchange_info","ServerType_select").panel[0].radio.entity.checked = false;
  	getTag("avpchange_info","ServerType_select").panel[1].radio.entity.checked = true;
  	getTag("avpchange_info","ServerType_select").panel[2].radio.entity.checked = false;
  }
  else if(data.ServerType_select == '2') 
  {
  	getTag("avpchange_info","ServerType_select").panel[0].radio.entity.checked = false;
  	getTag("avpchange_info","ServerType_select").panel[1].radio.entity.checked = false;
  	getTag("avpchange_info","ServerType_select").panel[2].radio.entity.checked = true;
  }
  if(data.protocolchangesupport == '0')
  {
  	var len = getTag("avpchange_info","ServerType_select").panel.length;
		for(var i=0;i < len;i++)
		{
			getTag("avpchange_info","ServerType_select").panel[i].radio.entity.disabled = true;
		}	
  	getTag("avpchange_info","save_servertype").hide();
  }
  else
  {
  	var len = getTag("avpchange_info","ServerType_select").panel.length;
		for(var i=0;i < len;i++)
		{
			getTag("avpchange_info","ServerType_select").panel[i].radio.entity.disabled = false;
		}	
  	getTag("avpchange_info","save_servertype").show();
  }
  setAppTagData(data);
	});	
	//disabled_voice_server();
}
function disabled_voice_server(){
	var len = getTag("avpchange_info","ServerType_select").panel.length;
	for(var i=0;i < len;i++)
	{
		getTag("avpchange_info","ServerType_select").panel[i].radio.entity.disabled = true;
	}	
}*/
/* 保存语音协议切换按钮功能 */
function server_change(){	
	var page_voice = "-";
	if(getTag("avpchange_info","ServerType_select").panel[0].radio.entity.checked == true)
	{
		page_voice = "0";
	}
	else if(getTag("avpchange_info","ServerType_select").panel[1].radio.entity.checked == true)
	{
			page_voice = "1";
	}
	else if(getTag("avpchange_info","ServerType_select").panel[2].radio.entity.checked == true)
	{
		page_voice = "2";
	}
	change_reboot = 0;
	if(page_voice != "-")
	{
		if((current_voice == "2") && (page_voice != "2"))
		{
			change_reboot = 1;
		}
	}else
	{
		alert("页面选择的协议不可用！");
		return;
	}
	
	if(current_voice != "-")
	{
		if((current_voice != "2") && (page_voice == "2"))
		{
			change_reboot = 1;
		}
	}else
	{
		alert("当前协议不可用！");
		return;
	}

	if(change_reboot == 1)
	{
		var r_result=confirm("执行该操作后，设备需要 '重启' 已确保配置数据生效，是否继续？");
		if(r_result == false)
		{
			change_reboot = 0;
			return;
		}
	}
	
	
	
	if(getTag("avpchange_info","ServerType_select").panel[0].radio.entity.checked == true)
	{
		document.getElementById("Menu3_AV_Basic").style.display='block';
		document.getElementById("Menu3_AV_BasicH248").style.display='none';
		document.getElementById("Menu3_AV_Advanced").style.display='block';
		document.getElementById("Menu3_AV_AdvancedH248").style.display='none';
		document.getElementById("Menu3_AV_Addtional").style.display='none';
		document.getElementById("Menu3_AV_AddtionalIMS").style.display='block';
		document.getElementById("Menu3_AV_AddtionalH248").style.display='none';
		document.getElementById("Menu3_AV_Digitalmap").style.display='block';
		document.getElementById("Menu3_AV_DigitalmapH248").style.display='none';
	}else if(getTag("avpchange_info","ServerType_select").panel[1].radio.entity.checked == true)
	{
		document.getElementById("Menu3_AV_Basic").style.display='block';
		document.getElementById("Menu3_AV_BasicH248").style.display='none';
		document.getElementById("Menu3_AV_Advanced").style.display='block';
		document.getElementById("Menu3_AV_AdvancedH248").style.display='none';
		document.getElementById("Menu3_AV_Addtional").style.display='block';
		document.getElementById("Menu3_AV_AddtionalIMS").style.display='none';
		document.getElementById("Menu3_AV_AddtionalH248").style.display='none';
		document.getElementById("Menu3_AV_Digitalmap").style.display='block';
		document.getElementById("Menu3_AV_DigitalmapH248").style.display='none';
	}else if(getTag("avpchange_info","ServerType_select").panel[2].radio.entity.checked == true)
  {
	  document.getElementById("Menu3_AV_Basic").style.display='none';
		document.getElementById("Menu3_AV_BasicH248").style.display='block';
		document.getElementById("Menu3_AV_Advanced").style.display='none';
		document.getElementById("Menu3_AV_AdvancedH248").style.display='block';
		document.getElementById("Menu3_AV_Addtional").style.display='none';
		document.getElementById("Menu3_AV_AddtionalIMS").style.display='none';
		document.getElementById("Menu3_AV_AddtionalH248").style.display='block';
		document.getElementById("Menu3_AV_Digitalmap").style.display='none';
		document.getElementById("Menu3_AV_DigitalmapH248").style.display='block';
  }
  save_server_type();
}
/* 保存按钮功能 */
function save_server_type(){
	if(subdebug)
	{
		alert(MOD);	
	}
	
	//setAppData('save',[0],function(data){});
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("avpchange_info","ServerType_select").panel[0].radio.entity.checked == true)
	{
		obj.ServerType_select = "0";
	}
	else if(getTag("avpchange_info","ServerType_select").panel[1].radio.entity.checked == true)
	{
			obj.ServerType_select = "1";
	}
	else if(getTag("avpchange_info","ServerType_select").panel[2].radio.entity.checked == true)
	{
		obj.ServerType_select = "2";
	}
	//obj.ServerType_select = getTag("avpchange_info","ServerType_select").data;
	setAppDataurl('save','voice_servertype_set',obj,function(data){
		if(data == "SUCCESS")
		{
			if(change_reboot == 1)
			{
				reboot_save();
			}
		}
		$.Refresh();
		});
}

/************************************* 应用》宽带电话设置》基本设置 (SIP) *************************************/
/*function init_avbasic_set(){
	creat_sipuserset_tab();
	//sipusercheckboxset();
}*/
function creat_sipuserset_tab(){
getRequestData("voice_sip_basic_show",{"no":"no"},function(data){
		setAppTagData(data);
		
		var arr = new Array();
		for(var i in data.sipuser_info_list){
			var obj = new Object();
			obj.lineid = data.sipuser_info_list[i].lineid;
			obj.phonenumber = data.sipuser_info_list[i].phonenumber;
			obj.authusername = data.sipuser_info_list[i].authusername;
			obj.authpassword = data.sipuser_info_list[i].authpassword;
			obj.fxsportenable = data.sipuser_info_list[i].fxsportenable;
			if(data.sipuser_info_list[i].linestatus == '0')
			{
				obj.linestatus = $.CommonLan['not_finished'];
			}
			else if(data.sipuser_info_list[i].linestatus == '1')
			{
				obj.linestatus = $.CommonLan['noenabled'];
			}
			else if(data.sipuser_info_list[i].linestatus == '2')
			{
				obj.linestatus = $.CommonLan['Registring'];	
			}
			else if(data.sipuser_info_list[i].linestatus == '3')
			{
				obj.linestatus = $.CommonLan['registered_success'];	
			}
			else if(data.sipuser_info_list[i].linestatus == '4')
			{
				obj.linestatus = $.CommonLan['registered_faild'];	
			}
			else
			{
				obj.linestatus = $.CommonLan['undefined'];	
			}

			arr.push(obj);
		}
		
		
		var tab = getTag("sipuser_info","sipuser_info_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
	sipusercheckboxset(data);
	});	
}
function sipusercheckboxset(data){
	for(var i in data.sipuser_info_list)
	{
		if(data.sipuser_info_list[i].fxsportenable == "1")
		{
			getTag("sipuser_info","sipuser_info_list").tab.tbody.Rows[i].Cells[4].checkbox_a.entity.checked = true;
		}else
		{
			getTag("sipuser_info","sipuser_info_list").tab.tbody.Rows[i].Cells[4].checkbox_a.entity.checked = false;	
		}
	}	
}
function save_sipuserinfo_set()
{
	MOD = "save";
	var rowarry = getTag("sipuser_info","sipuser_info_list").tab.tbody.Rows;
	var reg = new RegExp("^[0-9\+]*$");
	for(var i=0;i < rowarry.length;i++)
	{
		if(!reg.test(rowarry[i].Cells[1].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[1].text_a,$.CommonLan['int_number_err']);return;
		}
  }
	var obj = new Object();
	obj.mode = "save";
	
	var enable_val = "false";
	
	for(var i=0;i < rowarry.length;i++)
	{
		eval('var lineid_'+i+' = parseInt('+i+'+1);');
		eval('obj.lineid_'+i+' = lineid_'+i+';');
		eval('var phonenumber_'+i+' = rowarry[i].Cells[1].text_a.entity.value;');
		eval('obj.phonenumber_'+i+' = phonenumber_'+i+';');
		eval('var authusername_'+i+' = rowarry[i].Cells[2].text_a.entity.value;');
		eval('obj.authusername_'+i+' = authusername_'+i+';');
		eval('var authpassword_'+i+' = rowarry[i].Cells[3].text_a.entity.value;');
		eval('obj.authpassword_'+i+' = authpassword_'+i+';');
		
		enable_val = rowarry[i].Cells[4].checkbox_a.entity.checked;
		if(enable_val == true)
		{
			eval('var fxsportenable_'+i+' = "1";');
			eval('obj.fxsportenable_'+i+' = fxsportenable_'+i+';');
		}else if(enable_val == false)
		{
			eval('var fxsportenable_'+i+' = "0";');
			eval('obj.fxsportenable_'+i+' = fxsportenable_'+i+';');
		}
	}
	
	setAppDataurl('save','ip_basic_user_set',obj,function(data){
		$.Refresh();
		});
	
}
function cancel_sipuserinfo_set()
{
	$.Refresh();
}
function save_sipserverinfo_set(){
	if(!checkTag(["sipserver_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";

	obj.ProxyServer_text = getTag("sipserver_info","ProxyServer_text").text.entity.value;
	obj.ProxyServerPort_text = getTag("sipserver_info","ProxyServerPort_text").text.entity.value;
	obj.RegistrarServer_text = getTag("sipserver_info","RegistrarServer_text").text.entity.value;
	obj.RegistrarServerPort_text = getTag("sipserver_info","RegistrarServerPort_text").text.entity.value;
	obj.OutboundProxy_text = getTag("sipserver_info","OutboundProxy_text").text.entity.value;
	obj.OutboundProxyPort_text = getTag("sipserver_info","OutboundProxyPort_text").text.entity.value;
	obj.StandbyProxyServer_text = getTag("sipserver_info","StandbyProxyServer_text").text.entity.value;
	obj.StandbyProxyServerPort_text = getTag("sipserver_info","StandbyProxyServerPort_text").text.entity.value;
	obj.StandbyRegistrarServer_text = getTag("sipserver_info","StandbyRegistrarServer_text").text.entity.value;
	obj.StandbyRegistrarServerPort_text = getTag("sipserver_info","StandbyRegistrarServerPort_text").text.entity.value;
	obj.StandbyOutboundProxy_text = getTag("sipserver_info","StandbyOutboundProxy_text").text.entity.value;
	obj.StandbyOutboundProxyPort_text = getTag("sipserver_info","StandbyOutboundProxyPort_text").text.entity.value;
	setAppDataurl('save','voice_sip_basic_set',obj,function(data){
		$.Refresh();
		});	
	
	
}
function cancel_sipserverinfo_set(){
	$.Refresh();
}
/************************************* 应用》宽带电话设置》基本设置 (H248) *************************************/
/*function init_avbasicH248_set(){
	creat_h248userset_tab();
	//h248usercheckboxset();
}*/
function creat_h248userset_tab(){
getRequestData("voice_h248_basic_show",{"no":"no"},function(data){
		setAppTagData(data);		
		var arr = new Array();
		for(var i in data.h248user_info_list){
			var obj = new Object();
			obj.lineid = data.h248user_info_list[i].lineid;
			obj.physicaltermID = data.h248user_info_list[i].physicaltermID;
			obj.enable = data.h248user_info_list[i].enable;
			obj.linestatus = data.h248user_info_list[i].linestatus;
			
			if(data.h248user_info_list[i].linestatus == '0')
			{
				obj.linestatus = $.CommonLan['not_finished'];
			}
			else if(data.h248user_info_list[i].linestatus == '1')
			{
				obj.linestatus = $.CommonLan['noenabled'];
			}
			else if(data.h248user_info_list[i].linestatus == '2')
			{
				obj.linestatus = $.CommonLan['Registring'];	
			}
			else if(data.h248user_info_list[i].linestatus == '3')
			{
				obj.linestatus = $.CommonLan['registered_success'];	
			}
			else if(data.h248user_info_list[i].linestatus == '4')
			{
				obj.linestatus = $.CommonLan['registered_faild'];	
			}
			else
			{
				obj.linestatus = $.CommonLan['undefined'];	
			}

			arr.push(obj);
		}
		
		
		var tab = getTag("h248user_info","h248user_info_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
		Physicalset_display();
		h248usercheckboxset(data);
	});	
}
function Physicalset_display()
{
	if(getTag("h248server_info","Physicalset_select").select.entity.value == '1')
	{
		getTag("h248user_info","h248user_tip").show();
		getTag("h248user_info","h248user_info_list").show();
		getTag("h248user_info","h248user_set").show();
		getTag("h248server_info","PhysicalTermIDPrefix_text").hide();
		getTag("h248server_info","PhysicalTermIDStart_text").hide();
		getTag("h248server_info","PhysicalTermIDAddLen_text").hide();
	}
	else
	{
		//隐藏线路
		getTag("h248user_info","h248user_tip").hide();
		getTag("h248user_info","h248user_info_list").hide();
		getTag("h248user_info","h248user_set").hide();
		getTag("h248server_info","PhysicalTermIDPrefix_text").show();
		getTag("h248server_info","PhysicalTermIDStart_text").show();
		getTag("h248server_info","PhysicalTermIDAddLen_text").show();
	}
}
function h248usercheckboxset(data){
	//var data = $.DataMap;
	for(var i in data.h248user_info_list)
	{
		if(data.h248user_info_list[i].enable == "1")
		{
			getTag("h248user_info","h248user_info_list").tab.tbody.Rows[i].Cells[2].checkbox_a.entity.checked = true;
		}else
		{
			getTag("h248user_info","h248user_info_list").tab.tbody.Rows[i].Cells[2].checkbox_a.entity.checked = false;	
		}
	}	
}
function save_h248userinfo_set()
{
	MOD = "save";
	var rowarry = getTag("h248user_info","h248user_info_list").tab.tbody.Rows;
	var obj = new Object();
	obj.mode = "save";
	
	var enable_val = "false";
	
	for(var i=0;i < rowarry.length;i++)
	{
		eval('var lineid_'+i+' = parseInt('+i+'+1);');
		eval('obj.lineid_'+i+' = lineid_'+i+';');
		eval('var physicaltermID_'+i+' = rowarry[i].Cells[1].text_a.entity.value;');
		eval('obj.physicaltermID_'+i+' = physicaltermID_'+i+';');
		
		enable_val = rowarry[i].Cells[2].checkbox_a.entity.checked;
		if(enable_val == true)
		{
			eval('var enable_'+i+' = "1";');
			eval('obj.enable_'+i+' = enable_'+i+';');
		}else if(enable_val == false)
		{
			eval('var enable_'+i+' = "0";');
			eval('obj.enable_'+i+' = enable_'+i+';');
		}
	}
	
	setAppDataurl('save','voice_h248_user_set',obj,function(data){
		$.Refresh();
		});
	
}
function cancel_h248userinfo_set()
{
	$.Refresh();
}
function save_h248serverinfo_set(){
	if(!checkTag(["h248server_info"])){return;}
	var DeviceID=ID("DeviceID_text").value;
if(trim(DeviceID) != "")
{	
	if(getTag("h248server_info","DeviceIDType_select").select.entity.value == 0)
	{
	//check IP	
	  var reg=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	  flag = reg.test(DeviceID);
	  if(!flag){
	  	checkShow(getTag("h248server_info","DeviceID_text").text,$.CommonLan['ip_addr_err']);return;
	    }
	  var str2=DeviceID.split(".");
	  if(str2[0]==127){
	  	checkShow(getTag("h248server_info","DeviceID_text").text,$.CommonLan['ip_addr_err']);return;
	   }
	}
	else
	{
	//check string
	   var reg1 = /[\\\'\"]|\s/;
	    flag1 = reg1.test(DeviceID);
	   if(flag1){
	   	  checkShow(getTag("h248server_info","DeviceID_text").text,$.CommonLan['string_err']);return;
	    }
	    var reg2 = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
	    flag2 = reg2.test(DeviceID);
	    if(flag2||!DeviceID){
		    checkShow(getTag("h248server_info","DeviceID_text").text,$.CommonLan['string_null']);return;
	    }
	}
}	
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	obj.MediaGatewayPort_text = getTag("h248server_info","MediaGatewayPort_text").text.entity.value;
	obj.MediaGatewayControler_text = getTag("h248server_info","MediaGatewayControler_text").text.entity.value;
	obj.MediaGatewayControlerPort_text = getTag("h248server_info","MediaGatewayControlerPort_text").text.entity.value;
	obj.StandbyMediaGatewayControler_text = getTag("h248server_info","StandbyMediaGatewayControler_text").text.entity.value;
	obj.StandbyMediaGatewayControlerPort_text = getTag("h248server_info","StandbyMediaGatewayControlerPort_text").text.entity.value;
	obj.DeviceIDType_select = getTag("h248server_info","DeviceIDType_select").select.entity.value;
	obj.DeviceID_text = getTag("h248server_info","DeviceID_text").text.entity.value;
	obj.MessageEncodingType_select = getTag("h248server_info","MessageEncodingType_select").select.entity.value;
	obj.Physicalset_select = getTag("h248server_info","Physicalset_select").select.entity.value;
	obj.PhysicalTermIDPrefix_text = getTag("h248server_info","PhysicalTermIDPrefix_text").text.entity.value;
	obj.PhysicalTermIDStart_text = getTag("h248server_info","PhysicalTermIDStart_text").text.entity.value;
	obj.PhysicalTermIDAddLen_text = getTag("h248server_info","PhysicalTermIDAddLen_text").text.entity.value;
	obj.RTPPrefix_text = getTag("h248server_info","RTPPrefix_text").text.entity.value;
	obj.EphemeralTermIDStart_text = getTag("h248server_info","EphemeralTermIDStart_text").text.entity.value;
	obj.EphemeralTermIDAddLen_text = getTag("h248server_info","EphemeralTermIDAddLen_text").text.entity.value;
	setAppDataurl('save','voice_h248_basic_set',obj,function(data){
		$.Refresh();
		});	
}
function cancel_h248serverinfo_set(){
	$.Refresh();
}



/************************************* 应用》宽带电话设置》高级设置 (SIP/IMS) *************************************/
/*function init_avadvanced_set(){
	creat_sipuseradvancedset_tab();
	//iecheckbox_sipuseradvanced();
	//iecheckbox_sipencode();
}*/

function creat_sipuseradvancedset_tab(){
getRequestData("voice_sip_advanced_show",{"no":"no"},function(data){
		//data = $.DataMap;
		if(data.PRACKEnable_checkbox == "1")
		{
			getTag("avadvanced_label","PRACKEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("avadvanced_label","PRACKEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.BootDeRegisterEnable_checkbox == "1")
		{
			getTag("avadvanced_label","BootDeRegisterEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("avadvanced_label","BootDeRegisterEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.VadCngEnable_checkbox == "1")
		{
			getTag("avadvanced_label","VadCngEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("avadvanced_label","VadCngEnable_checkbox").checkbox.entity.checked = false;	
		}
		//setAppTagData(data);
		var tab = getTag("avadvanced_info","sipuser_advanced_list").tab;
		if(tab.tbody){
			tab.data = data.sipuser_advanced_list;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(data.sipuser_advanced_list);
		}
		iecheckbox_sipuseradvanced(data);
		creat_sipencodeadvancedset_tab(data);
	});	
}
function iecheckbox_sipuseradvanced(data){
	//var data = $.DataMap;
	for(var i in data.sipuser_advanced_list)
	{
		if(data.sipuser_advanced_list[i].echocancele == "1")
		{
			getTag("avadvanced_info","sipuser_advanced_list").tab.tbody.Rows[i].Cells[3].checkbox_a.entity.checked = true;
		}else
		{
			getTag("avadvanced_info","sipuser_advanced_list").tab.tbody.Rows[i].Cells[3].checkbox_a.entity.checked = false;	
		}
	}	
}
function save_sipuseradvanced_set(){
	if(!checkTag(["avadvanced_label"])){return;}
	var SipDSCPMark=ID("SipDSCPMark_text").value;
	if((parseInt(SipDSCPMark)< 0)||(parseInt(SipDSCPMark)>63)){
	    checkShow(getTag("avadvanced_label","SipDSCPMark_text").text,$.CommonLan['range_err']);return;
	}
	var RtpDSCPMark=ID("RtpDSCPMark_text").value;
	if((parseInt(RtpDSCPMark)< 0)||(parseInt(RtpDSCPMark)>63)){
	    checkShow(getTag("avadvanced_label","RtpDSCPMark_text").text,$.CommonLan['range_err']);return;
	}	
	var SessionExpires=ID("SessionExpires_text").value;
	if((parseInt(SessionExpires)< 0)||((parseInt(SessionExpires)>0) && (parseInt(SessionExpires) <= 90))){
	    checkShow(getTag("avadvanced_label","SessionExpires_text").text,$.CommonLan['range_err']);return;
	}
	var FlashMin=ID("FlashMin_text").value;
	if((parseInt(FlashMin)< 50)||(parseInt(FlashMin)>900)){
	    checkShow(getTag("avadvanced_label","FlashMin_text").text,$.CommonLan['range_err']);return;
	}
	var FlashMax=ID("FlashMax_text").value;
	if((parseInt(FlashMax)< 50)||(parseInt(FlashMax)>900)){
	    checkShow(getTag("avadvanced_label","FlashMax_text").text,$.CommonLan['range_err']);return;
	}	
	if(parseInt(FlashMin) >= parseInt(FlashMax))
	{
		checkShow(getTag("avadvanced_label","FlashMax_text").text,$.CommonLan['Flash_err']);return;
	}
	var RtpPort1 = getTag("avadvanced_label","RtpPortStart_text").text.entity.value;
	var RtpPort2 = getTag("avadvanced_label","RtpPortEnd_text").text.entity.value;
	if(parseInt(RtpPort1) >= parseInt(RtpPort2))
	{
		checkShow(getTag("avadvanced_label","RtpPortEnd_text").text,$.CommonLan['RtpPort_err']);return;
	}
	
	MOD = "save";
	var rowarry = getTag("avadvanced_info","sipuser_advanced_list").tab.tbody.Rows;
	var obj = new Object();
	obj.mode = "save";
	
	var enable_val = "false";
	
	for(var i=0;i < rowarry.length;i++)
	{
		eval('var lineid_'+i+' = parseInt('+i+'+1);');
		eval('obj.lineid_'+i+' = lineid_'+i+';');
		
		eval('var dsprxgain_'+i+' = rowarry[i].Cells[1].select_a.entity.value;');
		eval('obj.dsprxgain_'+i+' = dsprxgain_'+i+';');
		
		eval('var dsptxgain_'+i+' = rowarry[i].Cells[2].select_a.entity.value;');
		eval('obj.dsptxgain_'+i+' = dsptxgain_'+i+';');
		
		
		enable_val = rowarry[i].Cells[3].checkbox_a.entity.checked;
		if(enable_val == true)
		{
			eval('var echocancele_'+i+' = "1";');
			eval('obj.echocancele_'+i+' = echocancele_'+i+';');
		}else if(enable_val == false)
		{
			eval('var echocancele_'+i+' = "0";');
			eval('obj.echocancele_'+i+' = echocancele_'+i+';');
		}
	}
	obj.URIType_select = getTag("avadvanced_label","URIType_select").select.entity.value;
	obj.DTMFMethod_select = getTag("avadvanced_label","DTMFMethod_select").select.entity.value;
	obj.SipLocalPort_text = getTag("avadvanced_label","SipLocalPort_text").text.entity.value;
	obj.SipDSCPMark_text = getTag("avadvanced_label","SipDSCPMark_text").text.entity.value;
	obj.RtpDSCPMark_text = getTag("avadvanced_label","RtpDSCPMark_text").text.entity.value;
	obj.RegisterExpires_text = getTag("avadvanced_label","RegisterExpires_text").text.entity.value;
	obj.RegisterRetryInterval_text = getTag("avadvanced_label","RegisterRetryInterval_text").text.entity.value;
	obj.SessionExpires_text = getTag("avadvanced_label","SessionExpires_text").text.entity.value;
	obj.RtpPortStart_text = getTag("avadvanced_label","RtpPortStart_text").text.entity.value;
	obj.RtpPortEnd_text = getTag("avadvanced_label","RtpPortEnd_text").text.entity.value;
	if(getTag("avadvanced_label","PRACKEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.PRACKEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.PRACKEnable_checkbox = '0';
	 }
	if(getTag("avadvanced_label","BootDeRegisterEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.BootDeRegisterEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.BootDeRegisterEnable_checkbox = '0';
	 }
	obj.FlashMin_text = getTag("avadvanced_label","FlashMin_text").text.entity.value;
	obj.FlashMax_text = getTag("avadvanced_label","FlashMax_text").text.entity.value;
  if(getTag("avadvanced_label","VadCngEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.VadCngEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.VadCngEnable_checkbox = '0';
	 }
	 obj.RingVoltage_text = getTag("avadvanced_label","RingVoltage_text").text.entity.value;
	setAppDataurl('save','voice_sip_advanced_set',obj,function(data){
		$.Refresh();
		});
}
function cancel_sipuseradvanced_set(){
	$.Refresh();
}

function creat_sipencodeadvancedset_tab(data){
		//data = $.DataMap;
		var tab = getTag("avadvanced_code","sipuser_encode_list").tab;
		if(tab.tbody){
			tab.data = data.sipuser_encode_list;
			tab.tbody.refresh();
		}else{
		  for(var j in data.sipuser_encode_list)
		{
			if(data.sipuser_encode_list[j].encodename == '1')
			{
				data.sipuser_encode_list[j].encodename = "G.711A";
			}
			else if(data.sipuser_encode_list[j].encodename == '2')
			{
				data.sipuser_encode_list[j].encodename = "G.711U";
			}
			else if(data.sipuser_encode_list[j].encodename == '3')
			{
				data.sipuser_encode_list[j].encodename = "G.729";
			}
			else if(data.sipuser_encode_list[j].encodename == '4')
			{
				data.sipuser_encode_list[j].encodename = "G.722";
			}
			else
		  {
		  	data.sipuser_encode_list[j].encodename = "";
		  }
		}
			tab.createTablecheck(data.sipuser_encode_list);
		}
		setAppTagData(data);
		iecheckbox_sipencode(data);

}
function iecheckbox_sipencode(data){
	//var data = $.DataMap;
	for(var i in data.sipuser_encode_list)
	{
		if(data.sipuser_encode_list[i].encodeenable == "1")
		{
			getTag("avadvanced_code","sipuser_encode_list").tab.tbody.Rows[i].Cells[0].checkbox_a.entity.checked = true;
		}else
		{
			getTag("avadvanced_code","sipuser_encode_list").tab.tbody.Rows[i].Cells[0].checkbox_a.entity.checked = false;	
		}
	}		
}
function save_sipencode_set(){
	MOD = "save";
	var rowarry = getTag("avadvanced_code","sipuser_encode_list").tab.tbody.Rows;
	var reg = new RegExp("^[0-9]*$");
	for(var i=0;i < rowarry.length;i++)
	{
		if(rowarry[i].Cells[2].text_a.entity.value == "")
		{
			checkShow(rowarry[i].Cells[2].text_a,$.CommonLan['empty_err']);return;
		}
		if(rowarry[i].Cells[3].text_a.entity.value == "")
		{
			checkShow(rowarry[i].Cells[3].text_a,$.CommonLan['empty_err']);return;
		}
		if(!reg.test(rowarry[i].Cells[2].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[2].text_a,$.CommonLan['int_number_err']);return;
		}
		if(!reg.test(rowarry[i].Cells[3].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[3].text_a,$.CommonLan['int_number_err']);return;
		}
		var str0 = rowarry[0].Cells[3].text_a.entity.value;
		var str1 = rowarry[1].Cells[3].text_a.entity.value;
		var str2 = rowarry[2].Cells[3].text_a.entity.value;
		var str3 = rowarry[3].Cells[3].text_a.entity.value;
		if((str0 < 0) || (str0 > 4))
		{
			checkShow(rowarry[0].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if((str1 < 0) || (str1 > 4))
		{
			checkShow(rowarry[1].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if((str2 < 0) || (str2 > 4))
		{
			checkShow(rowarry[2].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if((str3 < 0) || (str3 > 4))
		{
			checkShow(rowarry[3].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if(str0 == str1 || str0 == str2 || str0 == str3)
		{
			checkShow(rowarry[0].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
		if(str1 == str0 || str1 == str2 || str1 == str3)
		{
			checkShow(rowarry[1].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
		if(str2 == str0 || str2 == str1 || str2 == str3)
		{
			checkShow(rowarry[2].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
		if(str3 == str0 || str3 == str1 || str3 == str2)
		{
			checkShow(rowarry[3].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
  }
	var obj = new Object();
	obj.mode = "save";
	
	var enable_val = "false";
	
	for(var i=0;i < rowarry.length;i++)
	{
		enable_val = rowarry[i].Cells[0].checkbox_a.entity.checked;
		if(enable_val == true)
		{
			eval('var encodeenable_'+i+' = "1";');
			eval('obj.encodeenable_'+i+' = encodeenable_'+i+';');
		}else if(enable_val == false)
		{
			eval('var encodeenable_'+i+' = "0";');
			eval('obj.encodeenable_'+i+' = encodeenable_'+i+';');
		}
		
		if(i == 0)
		{
			eval('var encodename_'+i+' = "1";');
		}
		else if(i == 1)
		{
			eval('var encodename_'+i+' = "2";');
		}
		else if(i == 2)
		{
			eval('var encodename_'+i+' = "3";');
		}
		else if(i == 3)
		{
			eval('var encodename_'+i+' = "4";');
		}
		eval('obj.encodename_'+i+' = encodename_'+i+';');
	
		eval('var rtppakinterval_'+i+' = rowarry[i].Cells[2].text_a.entity.value;');
		eval('obj.rtppakinterval_'+i+' = rtppakinterval_'+i+';');
		
		eval('var encodepriority_'+i+' = rowarry[i].Cells[3].text_a.entity.value;');
		eval('obj.encodepriority_'+i+' = encodepriority_'+i+';');
	
	}
	
	setAppDataurl('save','voice_sip_advanced_codecs_set',obj,function(data){
		$.Refresh();
		});
}
function cancel_sipencode_set(){
	$.Refresh();
}

/************************************* 应用》宽带电话设置》高级设置 (h248) *************************************/
/*function init_avadvancedH248_set(){
	creat_h248useradvancedset_tab();
	//iecheckbox_h248useradvanced();
	
	//iecheckbox_h248encode();
}*/

function creat_h248useradvancedset_tab(){
getRequestData("voice_h248_advanced_show",{"no":"no"},function(data){
		//data = $.DataMap;
		if(data.VadCngEnable_h248_checkbox == "1")
		{
			getTag("advancedH248_label","VadCngEnable_h248_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("advancedH248_label","VadCngEnable_h248_checkbox").checkbox.entity.checked = false;	
		}
		setAppTagData(data);
		var tab = getTag("advancedH248_info","h248user_advanced_list").tab;
		if(tab.tbody){
			tab.data = data.h248user_advanced_list;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(data.h248user_advanced_list);
		}
	iecheckbox_h248useradvanced(data);
	creat_h248encodeadvancedset_tab(data);
	});	
}
function iecheckbox_h248useradvanced(data){
	//var data = $.DataMap;
	for(var i in data.h248user_advanced_list)
	{
		if(data.h248user_advanced_list[i].echocancele == "1")
		{
			getTag("advancedH248_info","h248user_advanced_list").tab.tbody.Rows[i].Cells[3].checkbox_a.entity.checked = true;
		}else
		{
			getTag("advancedH248_info","h248user_advanced_list").tab.tbody.Rows[i].Cells[3].checkbox_a.entity.checked = false;	
		}
	}	
}
function save_h248useradvanced_set(){
	if(!checkTag(["advancedH248_label"])){return;}
	var FlashMinh248=ID("FlashMin_h248_text").value;
	if((parseInt(FlashMinh248)< 50)||(parseInt(FlashMinh248)>900 )){
	    checkShow(getTag("advancedH248_label","FlashMin_h248_text").text,$.CommonLan['range_err']);return;
	}	
	var FlashMaxh248=ID("FlashMax_h248_text").value;
	if((parseInt(FlashMaxh248)< 50)||(parseInt(FlashMaxh248)>900 )){
	    checkShow(getTag("advancedH248_label","FlashMax_h248_text").text,$.CommonLan['range_err']);return;
	}	
	if(parseInt(FlashMinh248) >= parseInt(FlashMaxh248))
	{
		checkShow(getTag("advancedH248_label","FlashMax_h248_text").text,$.CommonLan['Flash_err']);return;
	}
	var strrtp1=getTag("advancedH248_label","RtpPortStart_h248_text").text.entity.value;
	var strrtp2=getTag("advancedH248_label","RtpPortEnd_h248_text").text.entity.value;
	if(parseInt(strrtp1) >= parseInt(strrtp2))
	{
		checkShow(getTag("advancedH248_label","RtpPortEnd_h248_text").text,$.CommonLan['RtpPort_err']);return;
	}
	MOD = "save";
	var rowarry = getTag("advancedH248_info","h248user_advanced_list").tab.tbody.Rows;
	var obj = new Object();
	obj.mode = "save";
	
	var enable_val = "false";
	
	for(var i=0;i < rowarry.length;i++)
	{
		eval('var lineid_'+i+' = parseInt('+i+'+1);');
		eval('obj.lineid_'+i+' = lineid_'+i+';');
		
		eval('var dsprxgain_'+i+' = rowarry[i].Cells[1].select_a.entity.value;');
		eval('obj.dsprxgain_'+i+' = dsprxgain_'+i+';');
		
		eval('var dsptxgain_'+i+' = rowarry[i].Cells[2].select_a.entity.value;');
		eval('obj.dsptxgain_'+i+' = dsptxgain_'+i+';');
		
		
		enable_val = rowarry[i].Cells[3].checkbox_a.entity.checked;
		if(enable_val == true)
		{
			eval('var echocancele_'+i+' = "1";');
			eval('obj.echocancele_'+i+' = echocancele_'+i+';');
		}else if(enable_val == false)
		{
			eval('var echocancele_'+i+' = "0";');
			eval('obj.echocancele_'+i+' = echocancele_'+i+';');
		}
	}
	obj.DTMFMethod_h248_select = getTag("advancedH248_label","DTMFMethod_h248_select").select.entity.value;
	obj.RtpPortStart_h248_text = getTag("advancedH248_label","RtpPortStart_h248_text").text.entity.value;
	obj.RtpPortEnd_h248_text = getTag("advancedH248_label","RtpPortEnd_h248_text").text.entity.value;
	obj.FlashMin_h248_text = getTag("advancedH248_label","FlashMin_h248_text").text.entity.value;
	obj.FlashMax_h248_text = getTag("advancedH248_label","FlashMax_h248_text").text.entity.value;
	if(getTag("advancedH248_label","VadCngEnable_h248_checkbox").checkbox.entity.checked)
	 {
	 	obj.VadCngEnable_h248_checkbox = '1';
	 }
	else
	 {
	 	obj.VadCngEnable_h248_checkbox = '0';
	 }
	 obj.RingVoltage_h248_text = getTag("advancedH248_label","RingVoltage_h248_text").text.entity.value;
	setAppDataurl('save','voice_h248_advanced_set',obj,function(data){
		$.Refresh();
		});
}
function cancel_h248useradvanced_set(){
	$.Refresh();
}

function creat_h248encodeadvancedset_tab(data){
		var tab = getTag("avadvancedh248_code","h248user_encode_list").tab;
		if(tab.tbody){
			tab.data = data.h248user_encode_list;
			tab.tbody.refresh();
		}else{
			for(var j in data.h248user_encode_list)
		{
			if(data.h248user_encode_list[j].encodename == '1')
			{
				data.h248user_encode_list[j].encodename = "G.711A";
			}
			else if(data.h248user_encode_list[j].encodename == '2')
			{
				data.h248user_encode_list[j].encodename = "G.711U";
			}
			else if(data.h248user_encode_list[j].encodename == '3')
			{
				data.h248user_encode_list[j].encodename = "G.729";
			}
			else if(data.h248user_encode_list[j].encodename == '4')
			{
				data.h248user_encode_list[j].encodename = "G.722";
			}
			else
		  {
		  	data.h248user_encode_list[j].encodename = "";
		  }
		}
			tab.createTablecheck(data.h248user_encode_list);
		}
		iecheckbox_h248encode(data);
		setAppTagData(data);
}
function iecheckbox_h248encode(data){
	//var data = $.DataMap;
	for(var i in data.h248user_encode_list)
	{
		if(data.h248user_encode_list[i].encodeenable == "1")
		{
			getTag("avadvancedh248_code","h248user_encode_list").tab.tbody.Rows[i].Cells[0].checkbox_a.entity.checked = true;
		}else
		{
			getTag("avadvancedh248_code","h248user_encode_list").tab.tbody.Rows[i].Cells[0].checkbox_a.entity.checked = false;	
		}
	}		
}
function save_h248encode_set(){
	MOD = "save";
	var rowarry = getTag("avadvancedh248_code","h248user_encode_list").tab.tbody.Rows;
	var reg = new RegExp("^[0-9]*$");
	for(var i=0;i < rowarry.length;i++)
	{
		if(rowarry[i].Cells[2].text_a.entity.value == "")
		{
			checkShow(rowarry[i].Cells[2].text_a,$.CommonLan['empty_err']);return;
		}
		if(rowarry[i].Cells[3].text_a.entity.value == "")
		{
			checkShow(rowarry[i].Cells[3].text_a,$.CommonLan['empty_err']);return;
		}
		if(!reg.test(rowarry[i].Cells[2].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[2].text_a,$.CommonLan['int_number_err']);return;
		}
		if(!reg.test(rowarry[i].Cells[3].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[3].text_a,$.CommonLan['int_number_err']);return;
		}
		var str0 = rowarry[0].Cells[3].text_a.entity.value;
		var str1 = rowarry[1].Cells[3].text_a.entity.value;
		var str2 = rowarry[2].Cells[3].text_a.entity.value;
		var str3 = rowarry[3].Cells[3].text_a.entity.value;
		if((str0 < 0) || (str0 > 4))
		{
			checkShow(rowarry[0].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if((str1 < 0) || (str1 > 4))
		{
			checkShow(rowarry[1].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if((str2 < 0) || (str2 > 4))
		{
			checkShow(rowarry[2].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if((str3 < 0) || (str3 > 4))
		{
			checkShow(rowarry[3].Cells[3].text_a,$.CommonLan['range_err']);return;
		}
		if(str0 == str1 || str0 == str2 || str0 == str3)
		{
			checkShow(rowarry[0].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
		if(str1 == str0 || str1 == str2 || str1 == str3)
		{
			checkShow(rowarry[1].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
		if(str2 == str0 || str2 == str1 || str2 == str3)
		{
			checkShow(rowarry[2].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
		if(str3 == str0 || str3 == str1 || str3 == str2)
		{
			checkShow(rowarry[3].Cells[3].text_a,$.CommonLan['level_err']);return;
		}
  }
	var obj = new Object();
	obj.mode = "save";
	
	var enable_val = "false";
	
	for(var i=0;i < rowarry.length;i++)
	{
		enable_val = rowarry[i].Cells[0].checkbox_a.entity.checked;
		if(enable_val == true)
		{
			eval('var encodeenable_'+i+' = "1";');
			eval('obj.encodeenable_'+i+' = encodeenable_'+i+';');
		}else if(enable_val == false)
		{
			eval('var encodeenable_'+i+' = "0";');
			eval('obj.encodeenable_'+i+' = encodeenable_'+i+';');
		}
		
		if(i == 0)
		{
			eval('var encodename_'+i+' = "1";');
		}
		else if(i == 1)
		{
			eval('var encodename_'+i+' = "2";');
		}
		else if(i == 2)
		{
			eval('var encodename_'+i+' = "3";');
		}
		else if(i == 3)
		{
			eval('var encodename_'+i+' = "4";');
		}
		eval('obj.encodename_'+i+' = encodename_'+i+';');
	
		eval('var rtppakinterval_'+i+' = rowarry[i].Cells[2].text_a.entity.value;');
		eval('obj.rtppakinterval_'+i+' = rtppakinterval_'+i+';');
		
		eval('var encodepriority_'+i+' = rowarry[i].Cells[3].text_a.entity.value;');
		eval('obj.encodepriority_'+i+' = encodepriority_'+i+';');
	
	}
	
	setAppDataurl('save','voice_h248_advanced_codecs_set',obj,function(data){
		$.Refresh();
		});
}
function cancel_h248encode_set(){
	$.Refresh();
}

/************************************* 应用》宽带电话设置》补充业务设置 (sip) *************************************/
/*function init_Addtional_set(){
	creat_sipAddtional_tab();
	//iecheckbox_sipAddtional();
	
}*/
function creat_sipAddtional_tab(){
getRequestData("voice_sip_supplementary_show",{"no":"no"},function(data){
		setAppTagData(data);
		/*if(data.sipCaller_ID_switch == "1")
		{
			getTag("sipAddtional_info","sipCaller_ID_switch").checkbox.entity.checked = true;
		}else
		{
			getTag("sipAddtional_info","sipCaller_ID_switch").checkbox.entity.checked = false;	
		}*/
		var tab = getTag("sipLine_configuration","sipLine_configuration_list").tab;
		if(tab.tbody){
			tab.data = data.sipLine_configuration_list;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(data.sipLine_configuration_list);
		}
	iecheckbox_sipAddtional(data);
	});	
}
function iecheckbox_sipAddtional(data){
	//var data = $.DataMap;
	for(var i in data.sipLine_configuration_list)
	{
		if(data.sipLine_configuration_list[i].PolarityReverseEnable == "1")
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[1].checkbox_a.entity.checked = true;
		}else
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[1].checkbox_a.entity.checked = false;	
		}
		if(data.sipLine_configuration_list[i].HotLineEnable == "1")
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[2].checkbox_a.entity.checked = true;
		}else
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[2].checkbox_a.entity.checked = false;	
		}
		if(data.sipLine_configuration_list[i].CallWaitingEnable == "1")
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[5].checkbox_a.entity.checked = true;
		}else
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[5].checkbox_a.entity.checked = false;	
		}
		if(data.sipLine_configuration_list[i].Three_calling == "1")
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[6].checkbox_a.entity.checked = true;
		}else
		{
			getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows[i].Cells[6].checkbox_a.entity.checked = false;	
		}
	}	
}
function save_sipAddtional_set(){
	MOD = "save";
	var rowarry = getTag("sipLine_configuration","sipLine_configuration_list").tab.tbody.Rows;
	var reg = new RegExp("^[0-9]*$");
  for(var i=0;i < rowarry.length;i++)
	{
		if(!reg.test(rowarry[i].Cells[3].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[3].text_a,$.CommonLan['int_number_err']);return;
		}
		if(!reg.test(rowarry[i].Cells[4].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[4].text_a,$.CommonLan['int_number_err']);return;
		}
  }
	var obj = new Object();
	obj.mode = "save";
	
	for(var i=0;i < rowarry.length;i++)
	{
		eval('var lineid_'+i+' = parseInt('+i+'+1);');
		eval('obj.lineid_'+i+' = lineid_'+i+';');
		if(rowarry[i].Cells[1].checkbox_a.entity.checked == true)
		{
			eval('var PolarityReverseEnable_'+i+' = "1";');
			eval('obj.PolarityReverseEnable_'+i+' = PolarityReverseEnable_'+i+';');
		}else if(rowarry[i].Cells[1].checkbox_a.entity.checked == false)
		{
			eval('var PolarityReverseEnable_'+i+' = "0";');
			eval('obj.PolarityReverseEnable_'+i+' = PolarityReverseEnable_'+i+';');
		}
		if(rowarry[i].Cells[2].checkbox_a.entity.checked == true)
		{
			eval('var HotLineEnable_'+i+' = "1";');
			eval('obj.HotLineEnable_'+i+' = HotLineEnable_'+i+';');
		}else if(rowarry[i].Cells[2].checkbox_a.entity.checked == false)
		{
			eval('var HotLineEnable_'+i+' = "0";');
			eval('obj.HotLineEnable_'+i+' = HotLineEnable_'+i+';');
		}
		eval('var HotLineDelay_'+i+' = rowarry[i].Cells[3].text_a.entity.value;');
		eval('obj.HotLineDelay_'+i+' = HotLineDelay_'+i+';');
		
		eval('var HotLineURI_'+i+' = rowarry[i].Cells[4].text_a.entity.value;');
		eval('obj.HotLineURI_'+i+' = HotLineURI_'+i+';');
		
		if(rowarry[i].Cells[5].checkbox_a.entity.checked == true)
		{
			eval('var Three_calling_'+i+' = "1";');
			eval('obj.Three_calling_'+i+' = Three_calling_'+i+';');
		}else if(rowarry[i].Cells[5].checkbox_a.entity.checked == false)
		{
			eval('var Three_calling_'+i+' = "0";');
			eval('obj.Three_calling_'+i+' = Three_calling_'+i+';');
		}
		if(rowarry[i].Cells[6].checkbox_a.entity.checked == true)
		{
			eval('var CallWaitingEnable_'+i+' = "1";');
			eval('obj.CallWaitingEnable_'+i+' = CallWaitingEnable_'+i+';');
		}else if(rowarry[i].Cells[6].checkbox_a.entity.checked == false)
		{
			eval('var CallWaitingEnable_'+i+' = "0";');
			eval('obj.CallWaitingEnable_'+i+' = CallWaitingEnable_'+i+';');
		}
	
	}
	/*if(getTag("sipAddtional_info","sipCaller_ID_switch").checkbox.entity.checked)
	 {
	 	obj.sipCaller_ID_switch = '1';
	 }
	else
	 {
	 	obj.sipCaller_ID_switch = '0';
	 }*/
	obj.sipTimeSyncMode_select = getTag("sipAddtional_info","sipTimeSyncMode_select").select.entity.value;
	obj.sipCallIDShowMode_select = getTag("sipAddtional_info","sipCallIDShowMode_select").select.entity.value;
	setAppDataurl('save','voice_sip_supplementary_set',obj,function(data){
		$.Refresh();
		});
	
	
}
function cancel_sipAddtional_set(){
	$.Refresh();
}




/************************************* 应用》宽带电话设置》补充业务设置 (ims) *************************************/
/*function init_AddtionalIMS_set(){
	creat_imsAddtional_tab();
	//iecheckbox_imsAddtional();
	
}*/
function creat_imsAddtional_tab(){
getRequestData("voice_ims_supplementary_show",{"no":"no"},function(data){
		setAppTagData(data);
		/*if(data.Caller_ID_switch == "1")
		{
			getTag("imsAddtional_info","Caller_ID_switch").checkbox.entity.checked = true;
		}else
		{
			getTag("imsAddtional_info","Caller_ID_switch").checkbox.entity.checked = false;	
		}*/
		if(data.Service_subscription == "1")
		{
			getTag("imsAddtional_info","Service_subscription").checkbox.entity.checked = true;
		}else
		{
			getTag("imsAddtional_info","Service_subscription").checkbox.entity.checked = false;	
		}
		var tab = getTag("imsLine_configuration","imsLine_configuration_list").tab;
		if(tab.tbody){
			tab.data = data.imsLine_configuration_list;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(data.imsLine_configuration_list);
		}
	iecheckbox_imsAddtional(data);
	});	
}
function iecheckbox_imsAddtional(data){
	//var data = $.DataMap;
	for(var i in data.imsLine_configuration_list)
	{
		if(data.imsLine_configuration_list[i].PolarityReverseEnable == "1")
		{
			getTag("imsLine_configuration","imsLine_configuration_list").tab.tbody.Rows[i].Cells[1].checkbox_a.entity.checked = true;
		}else
		{
			getTag("imsLine_configuration","imsLine_configuration_list").tab.tbody.Rows[i].Cells[1].checkbox_a.entity.checked = false;	
		}
		if(data.imsLine_configuration_list[i].HotLineEnable == "1")
		{
			getTag("imsLine_configuration","imsLine_configuration_list").tab.tbody.Rows[i].Cells[2].checkbox_a.entity.checked = true;
		}else
		{
			getTag("imsLine_configuration","imsLine_configuration_list").tab.tbody.Rows[i].Cells[2].checkbox_a.entity.checked = false;	
		}
		if(data.imsLine_configuration_list[i].CallWaitingEnable == "1")
		{
			getTag("imsLine_configuration","imsLine_configuration_list").tab.tbody.Rows[i].Cells[5].checkbox_a.entity.checked = true;
		}else
		{
			getTag("imsLine_configuration","imsLine_configuration_list").tab.tbody.Rows[i].Cells[5].checkbox_a.entity.checked = false;	
		}
	}	
}
function save_imsAddtional_set(){
	MOD = "save";
	var rowarry = getTag("imsLine_configuration","imsLine_configuration_list").tab.tbody.Rows;
	var reg = new RegExp("^[0-9]*$");
  for(var i=0;i < rowarry.length;i++)
	{
		if(!reg.test(rowarry[i].Cells[3].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[3].text_a,$.CommonLan['int_number_err']);return;
		}
		if(!reg.test(rowarry[i].Cells[4].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[4].text_a,$.CommonLan['int_number_err']);return;
		}
		if(!reg.test(rowarry[i].Cells[7].text_a.entity.value))
		{
			checkShow(rowarry[i].Cells[7].text_a,$.CommonLan['int_number_err']);return;
		}
  }
	var obj = new Object();
	obj.mode = "save";
	
	for(var i=0;i < rowarry.length;i++)
	{
		eval('var lineid_'+i+' = parseInt('+i+'+1);');
		eval('obj.lineid_'+i+' = lineid_'+i+';');
		if(rowarry[i].Cells[1].checkbox_a.entity.checked == true)
		{
			eval('var PolarityReverseEnable_'+i+' = "1";');
			eval('obj.PolarityReverseEnable_'+i+' = PolarityReverseEnable_'+i+';');
		}else if(rowarry[i].Cells[1].checkbox_a.entity.checked == false)
		{
			eval('var PolarityReverseEnable_'+i+' = "0";');
			eval('obj.PolarityReverseEnable_'+i+' = PolarityReverseEnable_'+i+';');
		}
		if(rowarry[i].Cells[2].checkbox_a.entity.checked == true)
		{
			eval('var HotLineEnable_'+i+' = "1";');
			eval('obj.HotLineEnable_'+i+' = HotLineEnable_'+i+';');
		}else if(rowarry[i].Cells[2].checkbox_a.entity.checked == false)
		{
			eval('var HotLineEnable_'+i+' = "0";');
			eval('obj.HotLineEnable_'+i+' = HotLineEnable_'+i+';');
		}
		eval('var HotLineDelay_'+i+' = rowarry[i].Cells[3].text_a.entity.value;');
		eval('obj.HotLineDelay_'+i+' = HotLineDelay_'+i+';');
		
		eval('var HotLineURI_'+i+' = rowarry[i].Cells[4].text_a.entity.value;');
		eval('obj.HotLineURI_'+i+' = HotLineURI_'+i+';');
		
		if(rowarry[i].Cells[5].checkbox_a.entity.checked == true)
		{
			eval('var CallWaitingEnable_'+i+' = "1";');
			eval('obj.CallWaitingEnable_'+i+' = CallWaitingEnable_'+i+';');
		}else if(rowarry[i].Cells[5].checkbox_a.entity.checked == false)
		{
			eval('var CallWaitingEnable_'+i+' = "0";');
			eval('obj.CallWaitingEnable_'+i+' = CallWaitingEnable_'+i+';');
		}
		eval('var ConferenceCallway_'+i+' = rowarry[i].Cells[6].select_a.entity.value;');
		eval('obj.ConferenceCallway_'+i+' = ConferenceCallway_'+i+';');
		
		eval('var ConferenceCallURI_'+i+' = rowarry[i].Cells[7].text_a.entity.value;');
		eval('obj.ConferenceCallURI_'+i+' = ConferenceCallURI_'+i+';');
	
	}
	obj.TimeSyncMode_select = getTag("imsAddtional_info","TimeSyncMode_select").select.entity.value;
	/*if(getTag("imsAddtional_info","Caller_ID_switch").checkbox.entity.checked)
	 {
	 	obj.Caller_ID_switch = '1';
	 }
	else
	 {
	 	obj.Caller_ID_switch = '0';
	 }*/
	obj.CallIDShowMode_select = getTag("imsAddtional_info","CallIDShowMode_select").select.entity.value;
	if(getTag("imsAddtional_info","Service_subscription").checkbox.entity.checked)
	 {
	 	obj.Service_subscription = '1';
	 }
	else
	 {
	 	obj.Service_subscription = '0';
	 }
	setAppDataurl('save','voice_ims_supplementary_set',obj,function(data){
		$.Refresh();
		});
	
	
}
function cancel_imsAddtional_set(){
	$.Refresh();
}

/************************************* 应用》宽带电话设置》补充业务设置 (h248) *************************************/
//function init_AddtionalH248_set(){
//	getRequestData("voice_h248_supplementary_show",{"no":"no"},function(data){
//		setAppTagData(data);
		/*if(data.Caller_switch == "1")
		{
			getTag("AddtionalH248_info","Caller_switch").checkbox.entity.checked = true;
		}else
		{
			getTag("AddtionalH248_info","Caller_switch").checkbox.entity.checked = false;	
		}*/
//	});
//}
function save_AddtionalH248_set(){
	if(!checkTag(["AddtionalH248_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	obj.HeartbeatMode_select = getTag("AddtionalH248_info","HeartbeatMode_select").select.entity.value;
	obj.HeartbeatCycle_text = getTag("AddtionalH248_info","HeartbeatCycle_text").text.entity.value;
	obj.HeartbeatCount_text = getTag("AddtionalH248_info","HeartbeatCount_text").text.entity.value;
	/*if(getTag("AddtionalH248_info","Caller_switch").checkbox.entity.checked)
	 {
	 	obj.Caller_switch = '1';
	 }
	else
	 {
	 	obj.Caller_switch = '0';
	 }*/
	obj.CallIDShowModeh248_select = getTag("AddtionalH248_info","CallIDShowModeh248_select").select.entity.value;
	
	setAppDataurl('save','voice_h248_supplementary_set',obj,function(data){
		$.Refresh();
		});	
	
}
function cancel_AddtionalH248_set(){
	$.Refresh();
}
/************************************* 应用》宽带电话设置》拨号设置 *******************************************/
/*function init_Digitalmap_set(){
	getRequestData("voice_sip_dial_show",{"no":"no"},function(data){
		setAppTagData(data);
		if(data.DigitMapEnable_checkbox == "1")
		{
			getTag("Digitalmap_info","DigitMapEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Digitalmap_info","DigitMapEnable_checkbox").checkbox.entity.checked = false;	
		}
		getTag("Digitalmap_info","DigitMap_textarea").text.entity.value = data.DigitMap_textarea;
	});
	
}*/
function save_Digitalmap_set(){
	if(!checkTag(["Digitalmap_info"])){return;}
	var StartDialingTimer=ID("StartDialingTimer_text").value;
	if((parseInt(StartDialingTimer)< 0)||(parseInt(StartDialingTimer)>20 )){
	    checkShow(getTag("Digitalmap_info","StartDialingTimer_text").text,$.CommonLan['range_err']);return;
	}
	var LongTimerValue=ID("LongTimerValue_text").value;
	if((parseInt(LongTimerValue)< 0)||(parseInt(LongTimerValue)>15 )){
	    checkShow(getTag("Digitalmap_info","LongTimerValue_text").text,$.CommonLan['range_err']);return;
	}
	var ShortTimerValue=ID("ShortTimerValue_text").value;
	if((parseInt(ShortTimerValue)< 0)||(parseInt(ShortTimerValue)>10 )){
	    checkShow(getTag("Digitalmap_info","ShortTimerValue_text").text,$.CommonLan['range_err']);return;
	}
	if(parseInt(ShortTimerValue) >= parseInt(LongTimerValue))
	{
		checkShow(getTag("Digitalmap_info","LongTimerValue_text").text,$.CommonLan['Timer_err']);return;
	}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("Digitalmap_info","DigitMapEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.DigitMapEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.DigitMapEnable_checkbox = '0';
	 }
	 obj.DigitMap_textarea = getTag("Digitalmap_info","DigitMap_textarea").text.entity.value;
	 obj.DigitMapMode_select = getTag("Digitalmap_info","DigitMapMode_select").select.entity.value;
	 obj.TWaitTime_select = getTag("Digitalmap_info","TWaitTime_select").select.entity.value;
	 obj.DotWaitTime_select = getTag("Digitalmap_info","DotWaitTime_select").select.entity.value;
	 obj.OutNumberContainImmediateDialKey_select = getTag("Digitalmap_info","OutNumberContainImmediateDialKey_select").select.entity.value;
	 obj.StartDialingTimer_text = getTag("Digitalmap_info","StartDialingTimer_text").text.entity.value;
	 obj.LongTimerValue_text = getTag("Digitalmap_info","LongTimerValue_text").text.entity.value;
	 obj.ShortTimerValue_text = getTag("Digitalmap_info","ShortTimerValue_text").text.entity.value;
	setAppDataurl('save','voice_sip_dial_set',obj,function(data){
		$.Refresh();
		});
}
function cancel_Digitalmap_set(){
	$.Refresh();
	
}
/************************************* 应用》宽带电话设置》拨号设置 (h248) *************************************/
/*function init_DigitalmapH248_set(){
	getRequestData("voice_h248_dial_show",{"no":"no"},function(data){
		setAppTagData(data);
	});
	
}*/
function save_DigitalmapH248_set(){
	if(!checkTag(["DigitalmapH248_info"])){return;}
	var StartDigitTimer=ID("StartDigitTimer_text").value;
	if((parseInt(StartDigitTimer)< 0)||(parseInt(StartDigitTimer)>20 )){
	    checkShow(getTag("DigitalmapH248_info","StartDigitTimer_text").text,$.CommonLan['range_err']);return;
	}	
	var LongTimerValueH248=ID("LongTimerValueH248_text").value;
	if((parseInt(LongTimerValueH248)< 0)||(parseInt(LongTimerValueH248)>15 )){
	    checkShow(getTag("DigitalmapH248_info","LongTimerValueH248_text").text,$.CommonLan['range_err']);return;
	}	
	var ShortTimerValueH248=ID("ShortTimerValueH248_text").value;
	if((parseInt(ShortTimerValueH248)< 0)||(parseInt(ShortTimerValueH248)>10 )){
	    checkShow(getTag("DigitalmapH248_info","ShortTimerValueH248_text").text,$.CommonLan['range_err']);return;
	}
	if(parseInt(ShortTimerValueH248) >= parseInt(LongTimerValueH248))
	{
		checkShow(getTag("DigitalmapH248_info","LongTimerValueH248_text").text,$.CommonLan['Timer_err']);return;
	}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	 obj.StartDigitTimer_text = getTag("DigitalmapH248_info","StartDigitTimer_text").text.entity.value;
	 obj.LongTimerValueH248_text = getTag("DigitalmapH248_info","LongTimerValueH248_text").text.entity.value;
	 obj.ShortTimerValueH248_text = getTag("DigitalmapH248_info","ShortTimerValueH248_text").text.entity.value;
	 obj.remindersTimerValue_text = getTag("DigitalmapH248_info","remindersTimerValue_text").text.entity.value;
	 obj.busyTimerValue_text = getTag("DigitalmapH248_info","busyTimerValue_text").text.entity.value;
	 obj.callTimerValue_text = getTag("DigitalmapH248_info","callTimerValue_text").text.entity.value;
	 
	setAppDataurl('save','voice_h248_dial_set',obj,function(data){
		$.Refresh();
		});
	
}
function cancel_DigitalmapH248_set(){
	$.Refresh();
}


/************************************* 应用》宽带电话设置》传真设置 *******************************************/
/*function init_Fax_set(){
	getRequestData("voice_h248_fax_show",{"no":"no"},function(data){
		setAppTagData(data);
	});
	
}*/
function save_Fax_set(){
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	 obj.FaxMode_select = getTag("Fax_info","FaxMode_select").select.entity.value;
	 obj.T30NegotiateMode_select = getTag("Fax_info","T30NegotiateMode_select").select.entity.value;
	 
	setAppDataurl('save','voice_h248_fax_set',obj,function(data){
		$.Refresh();
		});
	
}
function cancel_Fax_set(){
	
	$.Refresh();
}
