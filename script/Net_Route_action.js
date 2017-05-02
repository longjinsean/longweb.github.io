/************************************* 网络》路由设置》路由设置 *************************************/
/*初始化页面*/
function init_route_set()
{  
	check_item = [];
	creat_route_tab();
}
function creat_route_tab(){
getRequestData("static_route_show",{"no":"no"},function(data){
	  var wanarryroute = new Array();
		for(var i in data.wan_connectname){
			wanarryroute.push(data.wan_connectname[i].wan_name);
		}
		auto_select(wanarryroute);
		var arr = new Array();
		for(var i in data.static_route_list){
			var obj = new Object();
			obj.name = data.static_route_list[i].indexid;
			//obj.IpVersion_select = data.static_route_list[i].IpVersion_select;
			obj.interface = data.static_route_list[i].interface;
			var str1 = data.static_route_list[i].destip;
			var str2 = data.static_route_list[i].destmask;
			obj.destipmask = str1+'/'+str2;
			obj.gatewayip = data.static_route_list[i].gatewayip;

			arr.push(obj);
		} 
		var tab = getTag("staticrouteinfo","static_route_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
	});	
}

/*新建按钮功能*/
function add_route_info()
{
	MOD = "save";
	creat_route_tab();
	var datat = new Object();
	datat.IpVersion_select = "1";
	datat.route_interface = "none";
	setAppTagData(datat);
	getTag("Title_route","route_destaddr_ipmask").text.entity.value="";
	getTag("Title_route","route_gateway").text.entity.value="";
	getTag("Title_route","IpVersion_select").select.entity.disabled = false;
	getTag("Title_route","route_interface").select.entity.disabled = false;
  getTag("Title_route","route_destaddr_ipmask").text.entity.disabled = false;
  getTag("Title_route","route_gateway").text.entity.disabled = false;
  getTag("Title_route","routeaddsave").show();
}

/*删除按钮功能*/
function del_route_info()
{
	var intername = "";
	var cnt = 0;
	for(var i in check_item)
	{
		/*for(var j in $.DataMap.static_route_list)
	  {
		  if($.DataMap.static_route_list[j].interface == check_item[i].name)
		  {
			  break;
		  }
	 }*/
		if(check_item[i].flag)
		{
			intername += check_item[i].name + ",";
			cnt++;
		}
	}
	if(cnt==0)
	{
		alert($.CommonLan["checknull"]);
		return;	
	}
	intername = intername.slice(0,intername.length-1);
	
	if(subdebug)
	{
		alert("check_item:"+intername);	
	}
	route_del_set(intername);
}
function route_del_set(index_select)
{
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','static_route_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}

/*保存按钮功能*/
function add_route_save()
{
	var str = getTag("Title_route","route_destaddr_ipmask").text.entity.value;
	var strip = getTag("Title_route","IpVersion_select").select.entity.value;
	if(strip == '1')//v4
	{
		if(str.indexOf(":") != -1)//包含
		{
		  checkShow(getTag("Title_route","route_destaddr_ipmask").text,$.CommonLan['int_ipv4_err']);return;
		}
	}
	else
	{
		if(str.indexOf(":") == -1)//不包含
		{
			checkShow(getTag("Title_route","route_destaddr_ipmask").text,$.CommonLan['int_ipv6_err']);return;
		}
	}
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
		obj.indexid = getTag("Title_route","route_index").text.entity.value;
	}
	obj.interface = getTag("Title_route","route_interface").select.entity.value;
	obj.IpVersion_select = getTag("Title_route","IpVersion_select").select.entity.value;
	var ipmask = getTag("Title_route","route_destaddr_ipmask").text.entity.value;
	if(!(ipmask.split('/')[0]) || (ipmask.split('/')[0] == "undefined") || (ipmask.split('/')[0] == ""))
	{
		obj.destip = "";
	}else
	{
		obj.destip = ipmask.split('/')[0];
	}
	if(!(ipmask.split('/')[1]) || (ipmask.split('/')[1] == "undefined") || (ipmask.split('/')[1] == ""))
	{
		obj.destmask = "";
	}else
	{
		obj.destmask = ipmask.split('/')[1];
	}
	//alert(obj.destipmask);
	obj.gatewayip = getTag("Title_route","route_gateway").text.entity.value;
	if(obj.mode == "add")
	{
	setAppDataurl('save','static_route_add',obj,function(data){
		//$.Refresh();
		add_route_info();
		});
	}
	else if(obj.mode == "mod")
	{
		setAppDataurl('mod','static_route_mod',obj,function(data){
		$.Refresh();
		add_route_info();
		});
		
	}
}

/*修改已存在条目功能*/
function mod_routeinfo(row)
{
	MOD = "mod";
	var rowdataval = new Object();
	for(var j in $.DataMap.static_route_list)
	{
		if($.DataMap.static_route_list[j].indexid == row.data.name)
		{
			break;
		}
	}
	for(var i in $.DataMap.static_route_list[j])
	{
		switch(i){
					  case "indexid":
						rowdataval.route_index = $.DataMap.static_route_list[j][i];
						break;
						case "interface":
						rowdataval.route_interface = $.DataMap.static_route_list[j][i];
						break;
						case "IpVersion_select":
						rowdataval.IpVersion_select = $.DataMap.static_route_list[j][i];
						break;
						case "destip":
						rowdataval.route_destaddr_ipmask = $.DataMap.static_route_list[j][i];
						break;
						case "destmask":
							//var routaddr = row.data[i];
							//var routaddrdest = routaddr.split('/')[0];
							//var routaddrmask = routaddr.split('/')[1];
							//rowdataval.route_destaddr = routaddrdest;
						rowdataval.route_destaddr_ipmask = rowdataval.route_destaddr_ipmask + "/" + $.DataMap.static_route_list[j][i];
						break;
						case "gatewayip":
							rowdataval.route_gateway = $.DataMap.static_route_list[j][i];
						break;
		}
	}
    setModify(rowdataval);
    MODData = row.data;
    getTag("Title_route","IpVersion_select").select.entity.disabled = true;
    getTag("Title_route","route_interface").select.entity.disabled = true;
    getTag("Title_route","route_destaddr_ipmask").text.entity.disabled = true;
    getTag("Title_route","route_gateway").text.entity.disabled = true;
    getTag("Title_route","routeaddsave").hide();
}

function auto_select(wanarryroute)
{
	var sel = getTag('Title_route','route_interface').select.entity;
	sel.options.length = wanarryroute.length;
	for(var i=0;i < wanarryroute.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarryroute[i-1]; /*值*/
			 str = wanarryroute[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    	sel.options[i] = opt;
  }
}