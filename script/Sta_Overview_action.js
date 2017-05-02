/************************************* 状态总览 *************************************/
function init_status_set(){
	$.CurrentApp = "SO_Overview";
	var xmlHttp = null;
	if (window.XMLHttpRequest) 
	{//非IE内核浏览器
	    xmlHttp = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) 
	{//IE内核浏览器
	    try
	    {//IE6.0
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }
	    catch (e1) 
	    {
		try
		{
		    xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
		}
		catch (e2) 
		{
		    try
		    {
			xmlHttp = new ActiveXObject("MSXML3.XMLHTTP");
		    }
		    catch (e3) 
		    {
			alert("获取时间失败：" + e3)
		    }
		}
	    }
	}
	  
	xmlHttp.open("HEAD", ".", false);
	xmlHttp.send(null);
	var date = new Date(xmlHttp.getResponseHeader("Date"));
	var weekday=new Array(7);
	weekday[0]="Sun";
	weekday[1]="Mon";
	weekday[2]="Tues";
	weekday[3]="Wed";
	weekday[4]="Thur";
	weekday[5]="Fri";
	weekday[6]="Sat";
	var month=new Array(12);
	month[0]="Jan";
	month[1]="Feb";
	month[2]="Mar";
	month[3]="Apr";
	month[4]="May";
	month[5]="June";
	month[6]="July";
	month[7]="Aug";
	month[8]="Sep";
	month[9]="Oct";
	month[10]="Nov";
	month[11]="Dec";
	getRequestData("device_basic_show",{"no":"no"},function(data){
		var onetagtab = getTag("Title_base","device_base_list").tab;
		var day,hour,minuter,second;
		if(onetagtab.thead){
			onetagtab.data = data;
			onetagtab.refresh();
		}else{
			document.getElementById("gatewaytype").innerHTML="型号："+data.device_base_list[0].devicemodel;
			second = data.device_base_list[0].connecttime%60;
			data.device_base_list[0].connecttime -= second;
			data.device_base_list[0].connecttime /= 60;
			minuter = data.device_base_list[0].connecttime%60;
			data.device_base_list[0].connecttime -= minuter;
			data.device_base_list[0].connecttime /= 60;
			hour = data.device_base_list[0].connecttime%24;
			data.device_base_list[0].connecttime -= hour;
			day = data.device_base_list[0].connecttime/24;
			data.device_base_list[0].connecttime = day + "d " + hour + "h " + minuter + "m " + second + "s";
			data.device_base_list[0].localtime = weekday[date.getDay()]+" "+month[date.getMonth()]+" "+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()+" "+date.getFullYear();//myDate.getFullYear();
			getTag("Title_base","device_base_list").data = data.device_base_list;
				onetagtab.createTableone(data.device_base_list);
		}
		
		/*var onetagtab2 = getTag("Title_pon","pon_info_list").tab;
		if(onetagtab2.thead){
			onetagtab2.data = data;
			onetagtab2.refresh();
		}else{
			 if(data.pon_info_list[0].lineprotocol == '1')
		   {
			   data.pon_info_list[0].lineprotocol ="ADSL2PLUS";
		   }
		   else if(data.pon_info_list[0].lineprotocol == '2')
		   {
			   data.pon_info_list[0].lineprotocol ="LAN";
		   }
		   else if(data.pon_info_list[0].lineprotocol == '3')
		   {
			   data.pon_info_list[0].lineprotocol ="VDSL2";
		   }
		   else if(data.pon_info_list[0].lineprotocol == '4')
		   {
		    	data.pon_info_list[0].lineprotocol ="EPON";
		   }
		   else if(data.pon_info_list[0].lineprotocol == '5')
		   {
			   data.pon_info_list[0].lineprotocol ="GPON";
		   }
		   else if(data.pon_info_list[0].lineprotocol == '6')
		   {
			   data.pon_info_list[0].lineprotocol ="10GEPON";
		   }
		   else if(data.pon_info_list[0].lineprotocol == '7')
		   {
			   data.pon_info_list[0].lineprotocol ="XPON";
		   }
		   else
		   {
		   	 data.pon_info_list[0].lineprotocol ="";
		   }
		//pon连接状态解析
		   if(data.pon_info_list[0].connectstatus == '1')
		   {
			   data.pon_info_list[0].connectstatus = $.CommonLan['connected'];
		   }
	   	else if(data.pon_info_list[0].connectstatus == '2')
		   {
			   data.pon_info_list[0].connectstatus = $.CommonLan['unconnected'];
		   }
		  else
		   {
		   	 data.pon_info_list[0].connectstatus ="";
		   }
		   	data.pon_info_list[0].connecttime = data.pon_info_list[0].connecttime + "s";
		   	if(data.pon_info_list[0].Txpower == "-inf" || data.pon_info_list[0].Txpower == "inf")
		   	{
		   		data.pon_info_list[0].Txpower = "-40.00 dbm";
		   	}
		   	else
		   	{
		   		data.pon_info_list[0].Txpower = data.pon_info_list[0].Txpower + "dbm";
		   	}
		   	if(data.pon_info_list[0].Rxpower == "-inf" || data.pon_info_list[0].Rxpower == "inf")
		   	{
		   		data.pon_info_list[0].Rxpower = "-40.00 dbm";
		   	}
		   	else
		   	{
		   		data.pon_info_list[0].Rxpower = data.pon_info_list[0].Rxpower + "dbm";
		   	}
			getTag("Title_pon","pon_info_list").data = data.pon_info_list;
			onetagtab2.createTableone(data.pon_info_list);
		}*/
		
		var onetagtab3 = getTag("Title_reg","reg_info_list").tab;
		if(onetagtab3.thead){
			onetagtab3.data = data;
			onetagtab3.refresh();
		}else{
			if(data.reg_info_list[0].Table_reg2_1_OLTCertified_table == '1')
		  {
			  data.reg_info_list[0].Table_reg2_1_OLTCertified_table = $.CommonLan['Fiber_unconnected'];
		  }
		  else if(data.reg_info_list[0].Table_reg2_1_OLTCertified_table == '2')
		  {
			  data.reg_info_list[0].Table_reg2_1_OLTCertified_table = $.CommonLan['Authenticate_success'];
		  }
		  else if(data.reg_info_list[0].Table_reg2_1_OLTCertified_table == '3')
		  {
		  	data.reg_info_list[0].Table_reg2_1_OLTCertified_table = $.CommonLan['Authenticate_faild'];
		  }
		  else
		  {
		  	data.reg_info_list[0].Table_reg2_1_OLTCertified_table ="";
		  }
		//ITMS认证
		  if(data.reg_info_list[0].Table_reg3_1_Manage_table == '0')
		  {
			  data.reg_info_list[0].Table_reg3_1_Manage_table = $.CommonLan['not_registered'];
		  }
		  else if(data.reg_info_list[0].Table_reg3_1_Manage_table == '1')
		  {
			  data.reg_info_list[0].Table_reg3_1_Manage_table = $.CommonLan['registered_success'];
		  }
		  else if(data.reg_info_list[0].Table_reg3_1_Manage_table == '2')
		  {
			  data.reg_info_list[0].Table_reg3_1_Manage_table = $.CommonLan['registered_faild'];
		  }
		  else
		  {
		  	data.reg_info_list[0].Table_reg3_1_Manage_table ="";
		  }
		   getTag("Title_reg","reg_info_list").data = data.reg_info_list;
			onetagtab3.createTableone(data.reg_info_list);
		}
		/////////
		/*for(var j in data.lan_info_list)
		{
			if(data.lan_info_list[j].Table_lan1_1_port_table == '0')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_0'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '1')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_1'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '2')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_2'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '3')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_3'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '4')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_4'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '5')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_5'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '6')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_6'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '7')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_7'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '8')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_8'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '9')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_9'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '10')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_10'];
			}
			else if(data.lan_info_list[j].Table_lan1_1_port_table == '11')
			{
				data.lan_info_list[j].Table_lan1_1_port_table = $.CommonLan['vlan_11'];
			}
			else
		  {
		  	data.lan_info_list[j].Table_lan1_1_port_table = "";
		  }
		  ////////
		 if(data.lan_info_list[j].Table_lan1_2_Equipment_tabl == '1')
			{
				data.lan_info_list[j].Table_lan1_2_Equipment_tabl = $.CommonLan['link_Equipment'];
			}
			else if(data.lan_info_list[j].Table_lan1_2_Equipment_tabl == '2')
			{
				data.lan_info_list[j].Table_lan1_2_Equipment_tabl = $.CommonLan['unlink_Equipment'];
			}
			else if(data.lan_info_list[j].Table_lan1_2_Equipment_tabl == '3')
			{
				data.lan_info_list[j].Table_lan1_2_Equipment_tabl = $.CommonLan['unlink_Equipment'];
			}
			else if(data.lan_info_list[j].Table_lan1_2_Equipment_tabl == '4')
			{
				data.lan_info_list[j].Table_lan1_2_Equipment_tabl = $.CommonLan['unlink_Equipment'];
			}
			else
			{
				data.lan_info_list[j].Table_lan1_2_Equipment_tabl = "";
			}
		}
		//////
		for(var k in data.wan_info_list)
		{
			if(data.wan_info_list[k].servertype == '1')
			{
				data.wan_info_list[k].servertype = "TR069";
			}
			else if(data.wan_info_list[k].servertype == '2')
			{
				data.wan_info_list[k].servertype = "VOIP";
			}
			else if(data.wan_info_list[k].servertype == '3')
			{
				data.wan_info_list[k].servertype = "TR069,VOIP";
			}
			else if(data.wan_info_list[k].servertype == '4')
			{
				data.wan_info_list[k].servertype = "INTERNET";
			}
			else if(data.wan_info_list[k].servertype == '5')
			{
				data.wan_info_list[k].servertype = "TR069,INTERNET";
			}
			else if(data.wan_info_list[k].servertype == '6')
			{
				data.wan_info_list[k].servertype = "VOIP,INTERNET";
			}
			else if(data.wan_info_list[k].servertype == '7')
			{
				data.wan_info_list[k].servertype = "TR069,VOIP,INTERNET";
			}
			else if(data.wan_info_list[k].servertype == '8')
			{
				data.wan_info_list[k].servertype = "OTHER";
			}
			else
			{
				data.wan_info_list[k].servertype = "";
			}
			//////
			if(data.wan_info_list[k].ipprotocol == '1')
			{
				data.wan_info_list[k].ipprotocol = "IPV4";
			}
			else if(data.wan_info_list[k].ipprotocol == '2')
			{
				data.wan_info_list[k].ipprotocol = "IPV6";
			}
			else if(data.wan_info_list[k].ipprotocol == '3')
			{
				data.wan_info_list[k].ipprotocol = "IPV4&IPV6";
			}
		  else
			{
				data.wan_info_list[k].ipprotocol = "";
			}
			///////
			if(data.wan_info_list[k].connectmode == '1')
			{
				data.wan_info_list[k].connectmode = "Route";
			}
			else if(data.wan_info_list[k].connectmode == '2')
			{
				data.wan_info_list[k].connectmode = "Bridge";
			}
		  else
			{
				data.wan_info_list[k].connectmode = "";
			}
			///////
			var str1 = data.wan_info_list[k].usableport;
		  var str="";
		  if(parseInt(str1)&0x01)
		  {
		  	str = str + $.CommonLan['vlan_0'] + ",";
		  }
		  if(parseInt(str1)&0x02)
		  {
		  	str = str + $.CommonLan['vlan_1'] + ",";
		  }
		  if(parseInt(str1)&0x04)
		  {
		  	str = str + $.CommonLan['vlan_2'] + ",";
		  }
		  if(parseInt(str1)&0x08)
		  {
		  	str = str + $.CommonLan['vlan_3'] + ",";
		  }
		  if(parseInt(str1)&0x10)
		  {
		  	str = str + $.CommonLan['vlan_4'] + ",";
		  }
		  if(parseInt(str1)&0x20)
		  {
		  	str = str + $.CommonLan['vlan_5'] + ",";
		  }
		  if(parseInt(str1)&0x40)
		  {
		  	str = str + $.CommonLan['vlan_6'] + ",";
		  }
		  if(parseInt(str1)&0x80)
		  {
		  	str = str + $.CommonLan['vlan_7'] + ",";
		  }
		  str=str.substring(0,str.length-1);
			data.wan_info_list[k].usableport = str;
			///////
			if(data.wan_info_list[k].wanstatus == '3')
			{
				data.wan_info_list[k].wanstatus = $.CommonLan['connected'];
			}
		  else
			{
				data.wan_info_list[k].wanstatus = $.CommonLan['unconnected'];
			}
			///////
	  }
		///////////////////////////////////////////////////////////
		var onetagtabwifi = getTag("Title_wifi","wifi_info_list").tab;
		if(onetagtabwifi.thead){
			onetagtabwifi.data = data;
			onetagtabwifi.refresh();
		}else{
			if(data.wifi_info_list[0].Table_wifi3_1_status_table == '0')
		  {
			  data.wifi_info_list[0].Table_wifi3_1_status_table = $.CommonLan['unconnected'];
		  }
		  else if(data.wifi_info_list[0].Table_wifi3_1_status_table == '1')
		  {
			  data.wifi_info_list[0].Table_wifi3_1_status_table = $.CommonLan['connected'];
		  }
		  else
		  {
		  	data.wifi_info_list[0].Table_wifi3_1_status_table ="";
		  }
			
			if(data.wifi_info_list[0].Table_wifi4_1_mode_table == '0')
		  {
			  data.wifi_info_list[0].Table_wifi4_1_mode_table = $.CommonLan['noconfig'];
		  }
		  else if(data.wifi_info_list[0].Table_wifi4_1_mode_table == '1')
		  {
			  data.wifi_info_list[0].Table_wifi4_1_mode_table = $.CommonLan['configed'];
		  }
		  else
		  {
		  	data.wifi_info_list[0].Table_wifi4_1_mode_table ="";
		  }
		
		  getTag("Title_wifi","wifi_info_list").data = data.wifi_info_list;
			onetagtabwifi.createTableone(data.wifi_info_list);
		}*/
		
		setAppTagData(data);
	});
}
function link_func(){
	//alert("link_func");	
}
function wifi_func(){
	//alert("超链接到配置向导页面");	
}

/************************************* 配置向导 *************************************/
function init_Wizard_set(){
	$.CurrentApp = "SO_Wizard";
	alldisabled();
	getAppData(function(data){ 
		var wanarryWizard = new Array();
		for(var i in data.Wizard_wanname){
			wanarryWizard.push(data.Wizard_wanname[i].wan_name);
		}
		var wanarryWizard3 = new Array();
		for(var i in data.Wizard_itv){
			wanarryWizard3.push(data.Wizard_itv[i].itv_name);
		}
		if(data.Wizard_checkbox02_checkbox == "1")
		{
			getTag("Wizard2_info","Wizard_checkbox02_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Wizard2_info","Wizard_checkbox02_checkbox").checkbox.entity.checked = false;	
		}
		if(data.Wizard_checkbox04_checkbox == "1")
		{
			getTag("Wizard4_info","Wizard_checkbox04_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("Wizard4_info","Wizard_checkbox04_checkbox").checkbox.entity.checked = false;	
		}
		if(data.iTV_Label&0x01)
		{
			getTag("Wizard3_info","iTV_Label").checkbox1.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","iTV_Label").checkbox1.entity.checked = false;
		}
		if(data.iTV_Label&0x02)
		{
			getTag("Wizard3_info","iTV_Label").checkbox2.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","iTV_Label").checkbox2.entity.checked = false;
		}
		if(data.iTV_Label&0x04)
		{
			getTag("Wizard3_info","iTV_Label").checkbox3.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","iTV_Label").checkbox3.entity.checked = false;
		}
		if(data.iTV_Label&0x08)
		{
			getTag("Wizard3_info","iTV_Label").checkbox4.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","iTV_Label").checkbox4.entity.checked = false;
		}
		if(data.SmartTV_label&0x01)
		{
			getTag("Wizard3_info","SmartTV_label").checkbox1.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","SmartTV_label").checkbox1.entity.checked = false;
		}
		if(data.SmartTV_label&0x02)
		{
			getTag("Wizard3_info","SmartTV_label").checkbox2.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","SmartTV_label").checkbox2.entity.checked = false;
		}
		if(data.SmartTV_label&0x04)
		{
			getTag("Wizard3_info","SmartTV_label").checkbox3.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","SmartTV_label").checkbox3.entity.checked = false;
		}
		if(data.SmartTV_label&0x08)
		{
			getTag("Wizard3_info","SmartTV_label").checkbox4.entity.checked = true;
		}
		else
		{
			getTag("Wizard3_info","SmartTV_label").checkbox4.entity.checked = false;
		}
	autoselect_Wizardwanname(wanarryWizard);
	autoshow_Wizardwan(wanarryWizard);
	autoselect_itvname(wanarryWizard3);
	autoshow_itv(wanarryWizard3);
	setAppTagData(data);
	});
	
	
}
function alldisabled(){
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'show');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'hide');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'hide');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'hide');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
}

function wizard1_save(){
	$.CurrentApp = "SO_Wizard";
	if(!checkTag(["Wizard1_info"])){return;}
  MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.Wizard_wan_1_label = getTag("Wizard1_info","Wizard_wan_1_label").select.entity.value;
	if(getTag("Wizard1_info","Means_access").panel[0].radio.entity.checked == true)
	{
		obj.wlanenable = "0";
	}
	else
	{
		obj.wlanenable = "1";
	}
	obj.Wizard_wan_1_text = getTag("Wizard1_info","Wizard_wan_1_text").text.entity.value;
	obj.Wizard_wan_1_password = getTag("Wizard1_info","Wizard_wan_1_password").text.entity.value;
	setAppDataurl('save','nc_set',obj,function(data){
		$.Refresh();
		});	
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'hide');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'show');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'hide');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'hide');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
}
function Previous2_save(){
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'show');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'hide');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'hide');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'hide');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
}
function nextstep2_save(){
	$.CurrentApp = "SO_Wizard";
	if(!checkTag(["Wizard2_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("Wizard2_info","Wizard_checkbox02_checkbox").checkbox.entity.checked == true)
	{
		obj.Wizard_checkbox02_checkbox = "1";
	}
	else
	{
		obj.Wizard_checkbox02_checkbox = "0";
	}
	obj.Wizard_text02_text = getTag("Wizard2_info","Wizard_text02_text").text.entity.value;
	obj.Wizard_password02_password = getTag("Wizard2_info","Wizard_password02_password").text.entity.value;
	setAppDataurl('save','nc_set',obj,function(data){
		$.Refresh();
		});	
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'hide');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'hide');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'show');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'hide');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
	
	
}
function Previous3_save(){
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'hide');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'show');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'hide');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'hide');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
	
	
}
function nextstep3_save(){
	$.CurrentApp = "SO_Wizard";
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.Wizardselect_select = getTag("Wizard3_info","Wizardselect_select").select.entity.value;
	//iTV_Label
	var str = "";
	if(getTag("Wizard3_info","iTV_Label").checkbox1.entity.checked == true)
	{
		str = (str | 0x01);
	}
	if(getTag("Wizard3_info","iTV_Label").checkbox2.entity.checked == true)
	{
		str = (str | 0x02);
	}
	if(getTag("Wizard3_info","iTV_Label").checkbox3.entity.checked == true)
	{
		str = (str | 0x04);
	}
	if(getTag("Wizard3_info","iTV_Label").checkbox4.entity.checked == true)
	{
		str = (str | 0x08);
	}
	obj.iTV_Label = str;
	//SmartTV_label
	var str1 = "";
	if(getTag("Wizard3_info","SmartTV_label").checkbox1.entity.checked == true)
	{
		str1 = (str1 | 0x01);
	}
	if(getTag("Wizard3_info","SmartTV_label").checkbox2.entity.checked == true)
	{
		str1 = (str1 | 0x02);
	}
	if(getTag("Wizard3_info","SmartTV_label").checkbox3.entity.checked == true)
	{
		str1 = (str1 | 0x04);
	}
	if(getTag("Wizard3_info","SmartTV_label").checkbox4.entity.checked == true)
	{
		str1 = (str1 | 0x08);
	}
	obj.SmartTV_label = str1;
	setAppDataurl('save','nc_set',obj,function(data){
		$.Refresh();
		});	
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'hide');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'hide');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'hide');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'show');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
	
	
}
function Previous4_save(){
	
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'hide');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'hide');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'show');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'hide');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
	
	
}
function nextstep4_save(){
	$.CurrentApp = "SO_Wizard";
	if(!checkTag(["Wizard4_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("Wizard4_info","Wizard_checkbox04_checkbox").checkbox.entity.checked == true)
	{
		obj.Wizard_checkbox04_checkbox = "1";
	}
	else
	{
		obj.Wizard_checkbox04_checkbox = "0";
	}
	obj.Wizard_password04_01_text = getTag("Wizard4_info","Wizard_password04_01_text").text.entity.value;
	obj.Wizard_password04_02_password = getTag("Wizard4_info","Wizard_password04_02_password").text.entity.value;
	obj.Wizard_password04_03_password = getTag("Wizard4_info","Wizard_password04_03_password").text.entity.value;
	setAppDataurl('save','nc_set',obj,function(data){
		$.Refresh();
		});	
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'hide');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'hide');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'hide');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'hide');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'show');
	
	
}
function Previous5_save(){
	setTagDomAction("Wizard1_info",["Title_wizard1_label","Wizard_wan_1_label","Means_access","Wizard_wan_1_text","Wizard_wan_1_password","Wizard_button1_button"],null,'hide');
	setTagDomAction("Wizard2_info",["Title_wizard2_label","Wizard_checkbox02_checkbox","Wizard_text02_text","Wizard_password02_password","Wizard_button2_button"],null,'hide');
	setTagDomAction("Wizard3_info",["Title_wizard3_label","Wizardselect_select","iTV_Label","SmartTV_label","Wizard_button3_button"],null,'hide');
	setTagDomAction("Wizard4_info",["Title_wizard4_label","Wizard_checkbox04_checkbox","Wizard_password04_01_text","Wizard_password04_02_password","Wizard_password04_03_password","Wizard_button4_button"],null,'show');
  setTagDomAction("Wizard5_info",["Title_wizard5_label","Wizard_button4_button"],null,'hide');
}
function finish_save(){
	$.CurrentApp = "SO_Wizard";
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.Wizard_wan_1_label = getTag("Wizard1_info","Wizard_wan_1_label").select.entity.value;
	if(getTag("Wizard1_info","Means_access").panel[0].radio.entity.checked == true)
	{
		obj.wlanenable = "0";
	}
	else
	{
		obj.wlanenable = "1";
	}
	obj.Wizard_wan_1_text = getTag("Wizard1_info","Wizard_wan_1_text").text.entity.value;
	obj.Wizard_wan_1_password = getTag("Wizard1_info","Wizard_wan_1_password").text.entity.value;
	if(getTag("Wizard2_info","Wizard_checkbox02_checkbox").checkbox.entity.checked == true)
	{
		obj.Wizard_checkbox02_checkbox = "1";
	}
	else
	{
		obj.Wizard_checkbox02_checkbox = "0";
	}
	obj.Wizard_text02_text = getTag("Wizard2_info","Wizard_text02_text").text.entity.value;
	obj.Wizard_password02_password = getTag("Wizard2_info","Wizard_password02_password").text.entity.value;
	obj.Wizardselect_select = getTag("Wizard3_info","Wizardselect_select").select.entity.value;
	//iTV_Label
	var str = "";
	if(getTag("Wizard3_info","iTV_Label").checkbox1.entity.checked == true)
	{
		str = (str | 0x01);
	}
	if(getTag("Wizard3_info","iTV_Label").checkbox2.entity.checked == true)
	{
		str = (str | 0x02);
	}
	if(getTag("Wizard3_info","iTV_Label").checkbox3.entity.checked == true)
	{
		str = (str | 0x04);
	}
	if(getTag("Wizard3_info","iTV_Label").checkbox4.entity.checked == true)
	{
		str = (str | 0x08);
	}
	obj.iTV_Label = str;
	//SmartTV_label
	var str1 = "";
	if(getTag("Wizard3_info","SmartTV_label").checkbox1.entity.checked == true)
	{
		str1 = (str1 | 0x01);
	}
	if(getTag("Wizard3_info","SmartTV_label").checkbox2.entity.checked == true)
	{
		str1 = (str1 | 0x02);
	}
	if(getTag("Wizard3_info","SmartTV_label").checkbox3.entity.checked == true)
	{
		str1 = (str1 | 0x04);
	}
	if(getTag("Wizard3_info","SmartTV_label").checkbox4.entity.checked == true)
	{
		str1 = (str1 | 0x08);
	}
	obj.SmartTV_label = str1;
	if(getTag("Wizard4_info","Wizard_checkbox04_checkbox").checkbox.entity.checked == true)
	{
		obj.Wizard_checkbox04_checkbox = "1";
	}
	else
	{
		obj.Wizard_checkbox04_checkbox = "0";
	}
	obj.Wizard_password04_01_text = getTag("Wizard4_info","Wizard_password04_01_text").text.entity.value;
	obj.Wizard_password04_02_password = getTag("Wizard4_info","Wizard_password04_02_password").text.entity.value;
	obj.Wizard_password04_03_password = getTag("Wizard4_info","Wizard_password04_03_password").text.entity.value;
	setAppDataurl('save','nc_set',obj,function(data){
		$.Refresh();
		});	
}
function autoselect_Wizardwanname(wanarryWizard){
	$.CurrentApp = "SO_Wizard";
	var sel = getTag('Wizard1_info','Wizard_wan_1_label').select.entity;
	sel.options.length = wanarryWizard.length;
	for(var i=0;i < wanarryWizard.length;i++)
	{
		var val = wanarryWizard[i]; 
		var str = wanarryWizard[i]; 
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_Wizardwan(data){
	$.CurrentApp = "SO_Wizard";
	var rowarry = getTag('Wizard1_info','Wizard_wan_1_label');
	rowarry.select.checked(data.Wizard_wan_1_label);
}
function autoselect_itvname(wanarryWizard3){
	$.CurrentApp = "SO_Wizard";
	var sel = getTag('Wizard3_info','Wizardselect_select').select.entity;
	sel.options.length = wanarryWizard3.length;
	for(var i=0;i < wanarryWizard3.length;i++)
	{
		var val = wanarryWizard3[i]; 
		var str = wanarryWizard3[i]; 
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_itv(data){
	$.CurrentApp = "SO_Wizard";
	var rowarry = getTag('Wizard3_info','Wizardselect_select');
	rowarry.select.checked(data.Wizardselect_select);
}
