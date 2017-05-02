/************************************* 安全》广域网访问》广域网访问设置 ***************************/
function init_sew_set(){
	check_item = [];
	getRequestData("url_filter_show",{"no":"no"},function(data){
		if(data.URL_filter_enable_checkbox == "1")
		{
			getTag("SeW_wan_info","URL_filter_enable_checkbox").checkbox.entity.checked = true;
		}
		else
		{
			getTag("SeW_wan_info","URL_filter_enable_checkbox").checkbox.entity.checked = false;	
		}
		setAppTagData(data);
		
		var arr = new Array();
		for(var i in data.SeW_list){
			var obj = new Object();
			//obj.name = data.SeW_list[i].indexid;
			obj.name = data.SeW_list[i].URLAddress;
			//obj.URLAddress = data.SeW_list[i].URLAddress;
			arr.push(obj);
		} 
		var tab = getTag("SeW_info","SeW_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}	
		listhidden();
	});
}/*
function creat_SeW_tab(){
	//check_item = [];
	getRequestData("url_filter_list_show",{"no":"no"},function(datav){
	//data = $.DataMap;
	alert("02 - enable:"+$.DataMap.URL_filter_enable_checkbox);
	alert("02 - select:"+$.DataMap.ExcludeMode_select);
	//setAppTagData(data);
		var arr = new Array();
		for(var i in datav.SeW_list){
			var obj = new Object();
			obj.name = datav.SeW_list[i].URLAddress;
			//obj.URLAddress = data.SeW_list[i].URLAddress;
			arr.push(obj);
		} 
		var tab = getTag("SeW_info","SeW_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}	
	});	
}*/
function ModeSave_save(){
	$.CurrentApp = "SeW_WAN";
	listhidden();
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("SeW_wan_info","URL_filter_enable_checkbox").checkbox.entity.checked)
	 {
	 	obj.URL_filter_enable_checkbox = '1';
	 }
	else
	 {
	 	obj.URL_filter_enable_checkbox = '0';
	 }
	obj.ExcludeMode_select = getTag("SeW_wan_info","ExcludeMode_select").select.entity.value;
	
	setAppDataurl('save','url_filter_set',obj,function(data){
		$.Refresh();
		});	
}
function listhidden(){
	if(getTag("SeW_wan_info","URL_filter_enable_checkbox").checkbox.entity.checked == true)
	  { 
	  	getTag("SeW_info","SeWoption").show();
	  	getTag("SeW_info","SeW_list").show();
	  	getTag("URLAddresse_info","URLAddress_text").show();
	  	getTag("URLAddresse_info","URLSave_button").show();
	  }
else
	  {  
	  	getTag("SeW_info","SeWoption").hide();
	  	getTag("SeW_info","SeW_list").hide();
	  	getTag("URLAddresse_info","URLAddress_text").hide();
	  	getTag("URLAddresse_info","URLSave_button").hide();
	  }
}
/*新建*/
function add_SewWAN_info(){
	$.CurrentApp = "SeW_WAN";
	MOD = "save";
	init_sew_set();
	var datat = new Object();
	datat.URLAddress_text = " ";
	setAppTagData(datat);
	getTag("URLAddresse_info","URLAddress_text").text.entity.disabled = false;
}
/*删除*/
function del_SewWAN_info(){
	$.CurrentApp = "SeW_WAN";
	var URLAddr = "";
	var cnt = 0;
	for(var i in check_item)
	{
		for(var j in $.DataMap.SeW_list)
	  {
		  if($.DataMap.SeW_list[j].URLAddress == check_item[i].name)
		  {
			  break;
		  }
	 }
		if(check_item[i].flag)
		{
			URLAddr += $.DataMap.SeW_list[j].indexid + ",";
			cnt++;
		}
	}
	if(cnt==0)
	{
		alert($.CommonLan["checknull"]);
		return;	
	}
	URLAddr = URLAddr.slice(0,URLAddr.length-1);
	
	if(subdebug)
	{
		alert("check_item:"+URLAddr);	
	}
	URLAddress_del_set(URLAddr);
	
}
function URLAddress_del_set(index_select)
{
	$.CurrentApp = "SeW_WAN";
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','url_filter_list_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}
/*修改*/
function mod_SewWANinfo(row){
	$.CurrentApp = "SeW_WAN";
	MOD = "mod";
	var rowdataval = new Object();
	for(var j in $.DataMap.SeW_list)
	{
		if($.DataMap.SeW_list[j].URLAddress == row.data.name)
		{
			break;
		}
	}
	for(var i in $.DataMap.SeW_list[j])
	{
		switch(i){
			    case "indexid":
						rowdataval.ulindexid_text = $.DataMap.SeW_list[j][i];
						break;
					case "URLAddress":
						rowdataval.URLAddress_text = $.DataMap.SeW_list[j][i];
						break;
						}
	 }
    setModify(rowdataval);
    MODData = $.DataMap.SeW_list[j][i];
    getTag("URLAddresse_info","URLAddress_text").text.entity.disabled = true;
}
/*保存*/
function add_URL_save(){
	if(!checkTag(["URLAddresse_info"])){return;}
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
		obj.indexid = getTag("URLAddresse_info","ulindexid_text").text.entity.value;
	}
	obj.URLAddress_text = getTag("URLAddresse_info","URLAddress_text").text.entity.value;
	if(obj.mode == "add")
	{
	setAppDataurl('save','url_filter_list_add',obj,function(data){      
		$.Refresh();
		add_SewWAN_info();
		});
	}
	else if(obj.mode == "mod")
	{
		setAppDataurl('mod','url_filter_list_mod',obj,function(data){        
		$.Refresh();
		add_SewWAN_info();
		});
	}
}
