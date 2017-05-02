/************************************* 安全》MAC过滤》MAC过滤 *************************************/
function init_sem_set(){
	$.CurrentApp = "SeM_MAC";
	check_item = [];
	getRequestData("mac_filter_show",{"no":"no"},function(data){
		if(data.MAC_filter_enable_checkbox == "1")
		{ 
			getTag("SeM_mac_info","MAC_filter_enable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("SeM_mac_info","MAC_filter_enable_checkbox").checkbox.entity.checked = false;	
		}
		setAppTagData(data);
		
		var arr = new Array();
		for(var i in data.MAC_list){
			var obj = new Object();
			obj.name = data.MAC_list[i].MACAddress;
			//obj.MACAddress = data.MAC_list[i].MACAddress;
			arr.push(obj);
		} 
		
		var tab = getTag("SeM_info","MAC_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
		macdisabled();
	});
}
/*
function creat_SeM_tab(){
getAppData(function(data){ 
		var arr = new Array();
		for(var i in data.MAC_list){
			var obj = new Object();
			obj.name = data.MAC_list[i].MACAddress;
			//obj.MACAddress = data.MAC_list[i].MACAddress;
			arr.push(obj);
		} 
		
		var tab = getTag("SeM_info","MAC_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
	});	
}
*/
/*显示隐藏*/
function macdisabled(){
	$.CurrentApp = "SeM_MAC";
	if(getTag("SeM_mac_info","MAC_filter_enable_checkbox").checkbox.entity.checked == true)
	  { 
	  	setTagDomAction("SeM_info",["SeMoption","MAC_list"],null,'show');
	  	setTagDomAction("MACAddresse_info",["MACAddress_text","MACSave_button"],null,'show');
	  }
else
	  {  
	  	setTagDomAction("SeM_info",["SeMoption","MAC_list"],null,'hide');
	  	setTagDomAction("MACAddresse_info",["MACAddress_text","MACSave_button"],null,'hide');
	  }
}
function ModeMac_save(){
	$.CurrentApp = "SeM_MAC";
	macdisabled();
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("SeM_mac_info","MAC_filter_enable_checkbox").checkbox.entity.checked)
	 {
	 	obj.MAC_filter_enable_checkbox = '1';
	 }
	else
	 {
	 	obj.MAC_filter_enable_checkbox = '0';
	 }
	obj.ExcludeMode_mac_select = getTag("SeM_mac_info","ExcludeMode_mac_select").select.entity.value;
	
	setAppDataurl('save','mac_filter_set',obj,function(data){
		$.Refresh();
		});	

}
/*新建*/
function add_SemMAC_info(){
	$.CurrentApp = "SeM_MAC";
	MOD = "save";
	init_sem_set();
	var datat = new Object();
	datat.MACAddress_text = " ";
	setAppTagData(datat);
	getTag("MACAddresse_info","MACAddress_text").text.entity.disabled = false;
}
/*删除*/
function del_SemMAC_info(){
	$.CurrentApp = "SeM_MAC";
	var MACAddr = "";
	var cnt = 0;
	for(var i in check_item)
	{
		for(var j in $.DataMap.MAC_list)
	  {
		  if($.DataMap.MAC_list[j].MACAddress == check_item[i].name)
		  {
			  break;
		  }
	  }
		if(check_item[i].flag)
		{
			MACAddr += $.DataMap.MAC_list[j].indexid + ",";
			cnt++;
		}
	}
	if(cnt==0)
	{
		alert($.CommonLan["checknull"]);
		return;	
	}
	MACAddr = MACAddr.slice(0,MACAddr.length-1);
	
	if(subdebug)
	{
		alert("check_item:"+MACAddr);	
	}
	MACAddress_del_set(MACAddr);
	
}
function MACAddress_del_set(index_select)
{
	$.CurrentApp = "SeM_MAC";
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','mac_filter_list_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}

/*修改*/
function mod_SemMACinfo(row){
	$.CurrentApp = "SeM_MAC";
	MOD = "mod";
	var rowdataval = new Object();
	for(var j in $.DataMap.MAC_list)
	{
		if($.DataMap.MAC_list[j].MACAddress == row.data.name)
		{
			break;
		}
	}
	for(var i in $.DataMap.MAC_list[j])
	{
		switch(i){
			    case "indexid":
						rowdataval.macindexid_text = $.DataMap.MAC_list[j][i];
						break;
					case "MACAddress":
						rowdataval.MACAddress_text = $.DataMap.MAC_list[j][i];
						break;
						}
	 }
		//rowdataval.MACAddress_text = row.data.name;
    setModify(rowdataval);
    MODData = $.DataMap.MAC_list[j][i];
    getTag("MACAddresse_info","MACAddress_text").text.entity.disabled = true;
}
/*保存*/
function add_MAC_save(){
	$.CurrentApp = "SeM_MAC";
	if(!checkTag(["MACAddresse_info"])){return;}
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
		obj.indexid = getTag("MACAddresse_info","macindexid_text").text.entity.value;
	}
	obj.MACAddress_text = getTag("MACAddresse_info","MACAddress_text").text.entity.value;
	if(obj.mode == "add")
	{
	setAppDataurl('save','mac_filter_list_add',obj,function(data){        
		$.Refresh();
		add_SemMAC_info();
		});
	}
	else if(obj.mode == "mod")
	{
		setAppDataurl('mod','mac_filter_list_mod',obj,function(data){       
		$.Refresh();
		add_SemMAC_info();
		});
	}
	
}