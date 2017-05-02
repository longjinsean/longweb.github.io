/************************************* 应用》高级NAT设置》ALG设置 *************************************/
function init_alg_set(){
	$.CurrentApp = "AN_ALG";
	getRequestData("alg_app_show",{"no":"no"},function(data){
		setAppTagData(data);
		if(data.H323Enable_checkbox == "1")
		{
			getTag("alg_info","H323Enable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("alg_info","H323Enable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.RTSPEnable_checkbox == "1")
		{
			getTag("alg_info","RTSPEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("alg_info","RTSPEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.L2TPEnable_checkbox == "1")
		{
			getTag("alg_info","L2TPEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("alg_info","L2TPEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.IPSECEnable_checkbox == "1")
		{
			getTag("alg_info","IPSECEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("alg_info","IPSECEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.SIPEnable_checkbox == "1")
		{
			getTag("alg_info","SIPEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("alg_info","SIPEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.FTPEnable_checkbox == "1")
		{
			getTag("alg_info","FTPEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("alg_info","FTPEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.PPTPEnable_checkbox == "1")
		{
			getTag("alg_info","PPTPEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("alg_info","PPTPEnable_checkbox").checkbox.entity.checked = false;	
		}
	});
	init_dmz_set();
}
function add_alg_save(){
	$.CurrentApp = "AN_ALG";
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("alg_info","H323Enable_checkbox").checkbox.entity.checked)
	 {
	 	obj.H323Enable_checkbox = '1';
	 }
	else
	 {
	 	obj.H323Enable_checkbox = '0';
	 }
	 if(getTag("alg_info","RTSPEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.RTSPEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.RTSPEnable_checkbox = '0';
	 }
	 if(getTag("alg_info","L2TPEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.L2TPEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.L2TPEnable_checkbox = '0';
	 }
	 if(getTag("alg_info","IPSECEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.IPSECEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.IPSECEnable_checkbox = '0';
	 }
	 if(getTag("alg_info","SIPEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.SIPEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.SIPEnable_checkbox = '0';
	 }
	 if(getTag("alg_info","FTPEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.FTPEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.FTPEnable_checkbox = '0';
	 }
	 if(getTag("alg_info","PPTPEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.PPTPEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.PPTPEnable_checkbox = '0';
	 }
	
	setAppDataurl('save','alg_app_set',obj,function(data){
		$.Refresh();
		});
	
}
/************************************* 应用》高级NAT设置》DMZ设置 *************************************/
function init_dmz_set(){
	$.CurrentApp = "AN_DMZ";
	getRequestData("dmz_app_show",{"no":"no"},function(data){
		var wanarrydmz = new Array();
		for(var i in data.DMZwan_list){
			wanarrydmz.push(data.DMZwan_list[i].wan_name);
		}
		if(data.DMZenable_checkbox == "1")
		{
			getTag("DMZ_info","DMZenable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("DMZ_info","DMZenable_checkbox").checkbox.entity.checked = false;	
		}
	DMZenable_disabled();
	autoselect_DMZwan(wanarrydmz);
	autoshow_DMZwan(wanarrydmz);
	setAppTagData(data);
	init_VirtualServer_set();
	});	
}

function DMZenable_disabled(){
	$.CurrentApp = "AN_DMZ";
	if(getTag("DMZ_info","DMZenable_checkbox").checkbox.entity.checked == true)
	{
		getTag("DMZ_info","DMZwan_select").select.entity.disabled=false;
	}
	else
	{
		getTag("DMZ_info","DMZwan_select").select.entity.disabled=true;
	}
	
}
function add_DMZ_save(){
	$.CurrentApp = "AN_DMZ";
	if(!checkTag(["DMZ_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("DMZ_info","DMZenable_checkbox").checkbox.entity.checked)
	 {
	 	obj.DMZenable_checkbox = '1';
	 }
	else
	 {
	 	obj.DMZenable_checkbox = '0';
	 }
	obj.DMZwan_select = getTag("DMZ_info","DMZwan_select").select.entity.value;
	if(obj.DMZenable_checkbox == '1')
	{
		if(obj.DMZwan_select == "none")
		{
			alert("请选择WAN接口！");
			return;
		}
	}
	if(getTag("DMZ_info","DMZenable_checkbox").checkbox.entity.checked)
	{
		obj.DMZ_text = getTag("DMZ_info","DMZ_text").text.entity.value;
  }
  else
  {
  	obj.DMZ_text = "";
  }
	setAppDataurl('save','dmz_app_set',obj,function(data){
		$.Refresh();
		});
}
function autoselect_DMZwan(wanarrydmz){
	$.CurrentApp = "AN_DMZ";
	var sel = getTag('DMZ_info','DMZwan_select').select.entity;
	sel.options.length = wanarrydmz.length;
	for(var i=0;i < wanarrydmz.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarrydmz[i-1]; /*值*/
			 str = wanarrydmz[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_DMZwan(data){
	$.CurrentApp = "AN_DMZ";
	var rowarry = getTag('DMZ_info','DMZwan_select');
	rowarry.select.checked(data.DMZwan_select);
}
/************************************* 应用》高级NAT设置》虚拟服务器设置 *************************************/
/*初始化页面*/
function init_VirtualServer_set()
{  
	$.CurrentApp = "AN_VirtualServer";
	check_item = [];
	creat_VirtualServer_tab();
}

function creat_VirtualServer_tab(){
getRequestData("virtual_server_show",{"no":"no"},function(data){
		var wanarryVirtual = new Array();
		for(var i in data.Virtualwan_list){
			wanarryVirtual.push(data.Virtualwan_list[i].wan_name);
		}
		auto_selectWAN(wanarryVirtual);
		var arr = new Array();
		for(var i in data.static_VirtualServer_list){
			var obj = new Object();
			var indexval = data.static_VirtualServer_list[i].indexid0+"|"+data.static_VirtualServer_list[i].indexid;
			obj.name = indexval;
			obj.WANselect = data.static_VirtualServer_list[i].WANselect;
			var port  = data.static_VirtualServer_list[i].ExternalPort;
		
			obj.ExternalPort = data.static_VirtualServer_list[i].ExternalPort;
			if(data.static_VirtualServer_list[i].PortMappingProtocol == '2')
			{
				obj.PortMappingProtocol = $.CommonLan['UDP'];
			}else if(data.static_VirtualServer_list[i].PortMappingProtocol == '1')
			{
				obj.PortMappingProtocol = $.CommonLan['TCP'];
			}else
			{
				obj.PortMappingProtocol = $.CommonLan['undefined'];	
			}
						
			obj.InternalClient = data.static_VirtualServer_list[i].InternalClient;	
			obj.InternalPort = data.static_VirtualServer_list[i].InternalPort;

			arr.push(obj);
		} 
		
		var tab = getTag("VirtualServer_label","static_VirtualServer_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
	});	
}

/*新建按钮功能*/
function add_VirtualServer_info()
{
	$.CurrentApp = "AN_VirtualServer";
	MOD = "save";
	creat_VirtualServer_tab();
	var datat = new Object();
	datat.WANselect_select = "none";
	datat.ExternalPort_text = " ";
	datat.PortMappingProtocol_select = " ";
	datat.InternalClient_text = " ";
	datat.InternalPort_text = " ";
	setAppTagData(datat);
}

/*删除按钮功能*/
function del_VirtualServer_info()
{
	$.CurrentApp = "AN_VirtualServer";
	var wanname = "";
	var cnt = 0;
	for(var i in check_item)
	{
		/*
		for(var j in $.DataMap.static_VirtualServer_list)
	  {
		  if($.DataMap.static_VirtualServer_list[j].WANselect == check_item[i].name)
		  {
			  break;
		  }
	  }*/
		if(check_item[i].flag)
		{
			wanname += check_item[i].name + ",";
			cnt++;
		}
	}
	if(cnt==0)
	{
		alert($.CommonLan["checknull"]);
		return;	
	}
	wanname = wanname.slice(0,wanname.length-1);
	
	if(subdebug)
	{
		alert("check_item:"+wanname);	
	}
	VirtualServer_del_set(wanname);
}
function VirtualServer_del_set(index_select)
{
	$.CurrentApp = "AN_VirtualServer";
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','virtual_server_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}


/*保存按钮功能*/
function add_VirtualServer_save()
{
	$.CurrentApp = "AN_VirtualServer";
	if(!checkTag(["Title_VirtualServer"])){return;}
	var obj = new Object();
	if(MOD == "save")
	{
		obj.mode = "add";
	}else if(MOD == "mod")
	{
		obj.mode = "mod";
	}else
	{
		alert($.CommonLan['undefined']);
		return;	
	}
	if(obj.mode == "mod")
	{
		obj.indexid0 = getTag("Title_VirtualServer","VirtualServer_indexid0").text.entity.value;
		obj.indexid = getTag("Title_VirtualServer","VirtualServer_indexid").text.entity.value;
	}
	
	obj.WANselect = getTag("Title_VirtualServer","WANselect_select").select.entity.value;
	obj.InternalClient = getTag("Title_VirtualServer","InternalClient_text").text.entity.value;
	var proto = getTag("Title_VirtualServer","PortMappingProtocol_select").select.entity.value;
	switch(proto)
	{
		/* Domain Name Server */
		case "1":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort = getTag("Title_VirtualServer","ExternalPort_text").text.entity.value;
		obj.InternalPort = getTag("Title_VirtualServer","InternalPort_text").text.entity.value;
		break;

		case "2":
		obj.PortMappingProtocol = "2";
		obj.ExternalPort = getTag("Title_VirtualServer","ExternalPort_text").text.entity.value;
		obj.InternalPort = getTag("Title_VirtualServer","InternalPort_text").text.entity.value;
		break;

		case "53":
		obj.PortMappingProtocol = "2";
		obj.ExternalPort		= "53";
		obj.InternalPort		= "53";		
		break;
		
		/* FTP Server */
		case "21":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort		= "21";
		obj.InternalPort		= "21";				
		break;
		
		/* IPSEC */
		case "4500":
		obj.PortMappingProtocol = "2";
		obj.ExternalPort		= "4500";
		obj.InternalPort		= "4500";						
		break;
		
		/* Mail POP3 */
		case "110":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort		= "110";
		obj.InternalPort		= "110";								
		break;

		/* Mail SMTP */
		case "25":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort		= "25";
		obj.InternalPort		= "25";										
		break;

		/* PPTP */
		case "1723":
		obj.PortMappingProtocol = "2";
		obj.ExternalPort		= "1723";
		obj.InternalPort		= "1723";												
		break;
		
		/* SSH Server */
		case "22":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort		= "22";
		obj.InternalPort		= "22";														
		break;

		/* Telnet Server */
		case "23":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort		= "23";
		obj.InternalPort		= "23";																
		break;

		/* TFTP Server */
		case "69":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort		= "69";
		obj.InternalPort		= "69";																		
		break;

		/* HTTP Server */
		case "80":
		obj.PortMappingProtocol = "1";
		obj.ExternalPort		= "80";
		obj.InternalPort		= "80";																				
		break;		
	}
				
	if(obj.mode == "add")
	{
	setAppDataurl('save','virtual_server_add',obj,function(data){
		$.Refresh();
		add_VirtualServer_info();
		});
	}
	else if(obj.mode == "mod")
	{
	setAppDataurl('mod','virtual_server_mod',obj,function(data){
		$.Refresh();
		add_VirtualServer_info();
		});
	}
}

/*修改已存在条目功能*/
function mod_VirtualServerinfo(row)
{
	$.CurrentApp = "AN_VirtualServer";
	MOD = "mod";
	var rowdataval = new Object();
	for(var j in $.DataMap.static_VirtualServer_list)
	{  
		var str = $.DataMap.static_VirtualServer_list[j].indexid0+"|"+$.DataMap.static_VirtualServer_list[j].indexid;
		if(str == row.data.name)
		{
			break;
		}
	}
	for(var i in $.DataMap.static_VirtualServer_list[j])
	{
		//alert(i);
		switch(i){
					case "indexid0":
						rowdataval.VirtualServer_indexid0 = $.DataMap.static_VirtualServer_list[j][i];
						break;
					case "indexid":
						rowdataval.VirtualServer_indexid = $.DataMap.static_VirtualServer_list[j][i];
						break;
					case "WANselect":
						rowdataval.WANselect_select = $.DataMap.static_VirtualServer_list[j][i];
						break;
					case "ExternalPort":
						rowdataval.ExternalPort_text = $.DataMap.static_VirtualServer_list[j][i];
						break;
					case "InternalClient":
						rowdataval.InternalClient_text = $.DataMap.static_VirtualServer_list[j][i];
						break;
					case "InternalPort":
						rowdataval.InternalPort_text = $.DataMap.static_VirtualServer_list[j][i];
						rowdataval.PortMappingProtocol_select = $.DataMap.static_VirtualServer_list[j][i];
						break;
		}
	}
    setModify(rowdataval);
    MODData = row.data;
}

function auto_selectWAN(wanarryVirtual)
{	
	$.CurrentApp = "AN_VirtualServer";
	var sel = getTag('Title_VirtualServer','WANselect_select').select.entity;
	sel.options.length = wanarryVirtual.length;
	for(var i=0;i < wanarryVirtual.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarryVirtual[i-1]; /*值*/
			 str = wanarryVirtual[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    sel.options[i] = opt;
  }
}

 function VirtualServer_select_protocol()
 {
	$.CurrentApp = "AN_VirtualServer";
	var proto = getTag("Title_VirtualServer","PortMappingProtocol_select").select.entity.value;
	switch (proto)
	{
	case "53":
	case "80":
	case "69":
	case "21":
	case "22":
	case "23":
	case "25":
	case "4500":
	case "1723":
	getTag("Title_VirtualServer","ExternalPort_text").hide();
	getTag("Title_VirtualServer","InternalPort_text").hide();
	break;
	case "1":
	case "2":
	getTag("Title_VirtualServer","ExternalPort_text").show();
	getTag("Title_VirtualServer","InternalPort_text").show();
	break;
	}
 }
