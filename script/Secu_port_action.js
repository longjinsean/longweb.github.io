/************************************* 安全》端口过滤》端口过滤 *************************************/
function init_SeP_set(){
	check_item = [];
	getRequestData("ip_filter_show",{"no":"no"},function(data){
		if(data.port_filter_enable_checkbox == "1")
		{
			getTag("SeP_port_info","port_filter_enable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("SeP_port_info","port_filter_enable_checkbox").checkbox.entity.checked = false;	
		}
		setAppTagData(data);
		
		var arr = new Array();
		for(var i in data.port_list){
			var obj = new Object();
			obj.name = data.port_list[i].indexid;
			if(data.port_list[i].protocolsel == '0')
			{
				obj.protocolsel = "ALL";
			}
			else if(data.port_list[i].protocolsel == '1')
			{
				obj.protocolsel = "TCP/UDP";
			}
			else if(data.port_list[i].protocolsel == '2')
			{
				obj.protocolsel = "TCP";
			}
			else if(data.port_list[i].protocolsel == '3')
			{
				obj.protocolsel = "UDP";
			}
			else if(data.port_list[i].protocolsel == '4')
			{
				obj.protocolsel = "ICMP";
			}
			else
			{
				obj.protocolsel = "";
			}
			obj.lanipfilter = data.port_list[i].lanipfilter_start+'-'+data.port_list[i].lanipfilter_end;
			//obj.lanipfilter_end = data.port_list[i].lanipfilter_end;
			obj.lanportfilter = data.port_list[i].lanportfilter_start+'-'+data.port_list[i].lanportfilter_end;
			//obj.lanportfilter_end = data.port_list[i].lanportfilter_end;
			obj.wanipfilter = data.port_list[i].wanipfilter_start+'-'+data.port_list[i].wanipfilter_end;
			//obj.wanipfilter_end = data.port_list[i].wanipfilter_end;
			obj.wanportfilter = data.port_list[i].wanportfilter_start+'-'+data.port_list[i].wanportfilter_end;
			//obj.wanportfilter_end = data.port_list[i].wanportfilter_end;
			arr.push(obj);
		} 
		
		var tab = getTag("port_tips_label","port_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
		portdisabled();
		//port_protocolsel();
	});
}
/*显示隐藏*/
function portdisabled(){
	if(getTag("SeP_port_info","port_filter_enable_checkbox").checkbox.entity.checked == true)
	  { 
	  	setTagDomAction("port_tips_label",["SePoption","port_list"],null,'show');
	  	setTagDomAction("portAddresse_info",["port_protocol_select","portSave_button"],null,'show');
	  	port_protocolsel();
	  }
else
	  {  
	  	setTagDomAction("port_tips_label",["SePoption","port_list"],null,'hide');
	  	setTagDomAction("portAddresse_info",["port_protocol_select","port_lanip_text","port_Scope_text","port_wanipuser_text","port_wanportuser_text","portSave_button"],null,'hide');
	  }
}
function port_protocolsel()
{
	if(getTag("portAddresse_info","port_protocol_select").select.entity.value == '0')
	{
		getTag("portAddresse_info","port_Scope_text").hide();
		getTag("portAddresse_info","port_wanportuser_text").hide();
		getTag("portAddresse_info","port_lanip_text").show();
		getTag("portAddresse_info","port_wanipuser_text").show();
	}
	else if(getTag("portAddresse_info","port_protocol_select").select.entity.value == '1')
	{
		getTag("portAddresse_info","port_Scope_text").show();
		getTag("portAddresse_info","port_wanportuser_text").show();
		getTag("portAddresse_info","port_lanip_text").show();
		getTag("portAddresse_info","port_wanipuser_text").show();
	}
	else if(getTag("portAddresse_info","port_protocol_select").select.entity.value == '2')
	{
		getTag("portAddresse_info","port_Scope_text").show();
		getTag("portAddresse_info","port_wanportuser_text").show();
		getTag("portAddresse_info","port_lanip_text").show();
		getTag("portAddresse_info","port_wanipuser_text").show();
	}
	else if(getTag("portAddresse_info","port_protocol_select").select.entity.value == '3')
	{
		getTag("portAddresse_info","port_Scope_text").show();
		getTag("portAddresse_info","port_wanportuser_text").show();
		getTag("portAddresse_info","port_lanip_text").show();
		getTag("portAddresse_info","port_wanipuser_text").show();
	}
	else if(getTag("portAddresse_info","port_protocol_select").select.entity.value == '4')
	{
		getTag("portAddresse_info","port_Scope_text").hide();
		getTag("portAddresse_info","port_wanportuser_text").hide();
		getTag("portAddresse_info","port_lanip_text").show();
		getTag("portAddresse_info","port_wanipuser_text").show();
	}
}
function Modeport_save(){
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("SeP_port_info","port_filter_enable_checkbox").checkbox.entity.checked)
	 {
	 	obj.port_filter_enable_checkbox = '1';
	 }
	else
	 {
	 	obj.port_filter_enable_checkbox = '0';
	 }
	obj.portMode_select = getTag("SeP_port_info","portMode_select").select.entity.value;
	
	setAppDataurl('save','ip_filter_set',obj,function(data){
		$.Refresh();
		});	
	
}
function add_SepPort_info(){
	MOD = "save";
	init_SeP_set();
	var datat = new Object();
	datat.port_protocol_select = "0";
	setAppTagData(datat);
	getTag("portAddresse_info","port_lanip_text").text_a.entity.value = " ";
	getTag("portAddresse_info","port_lanip_text").text_b.entity.value = " ";
	getTag("portAddresse_info","port_wanipuser_text").text_a.entity.value = " ";
	getTag("portAddresse_info","port_wanipuser_text").text_b.entity.value = " ";
	getTag("portAddresse_info","port_Scope_text").text_a.entity.value = " ";
	getTag("portAddresse_info","port_Scope_text").text_b.entity.value = " ";
	getTag("portAddresse_info","port_wanportuser_text").text_a.entity.value = " ";
	getTag("portAddresse_info","port_wanportuser_text").text_b.entity.value = " ";
	
	getTag("portAddresse_info","port_lanip_text").text_a.entity.disabled = false;
	getTag("portAddresse_info","port_lanip_text").text_b.entity.disabled = false;
	getTag("portAddresse_info","port_wanipuser_text").text_a.entity.disabled = false;
	getTag("portAddresse_info","port_wanipuser_text").text_b.entity.disabled = false;
	getTag("portAddresse_info","port_Scope_text").text_a.entity.disabled = false;
	getTag("portAddresse_info","port_Scope_text").text_b.entity.disabled = false;
	getTag("portAddresse_info","port_wanportuser_text").text_a.entity.disabled = false;
	getTag("portAddresse_info","port_wanportuser_text").text_b.entity.disabled = false;
	getTag("portAddresse_info","port_protocol_select").select.entity.disabled = false;
}
function del_SepPort_info()
{
	var portname = "";
	var cnt = 0;
	for(var i in check_item)
	{
		for(var j in $.DataMap.port_list)
	  {
		  if($.DataMap.port_list[j].indexid == check_item[i].name)
		  {
			  break;
		  }
	  }
		if(check_item[i].flag)
		{
			portname += check_item[i].name + ",";
			cnt++;
		}
	}
	if(cnt==0)
	{
		alert($.CommonLan["checknull"]);
		return;	
	}
	portname = portname.slice(0,portname.length-1);
	
	if(subdebug)
	{
		alert("check_item:"+portname);	
	}
	SepPort_del_set(portname);
}
function SepPort_del_set(index_select)
{
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','ip_filter_list_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}
function mod_SepPort(row){
	MOD = "mod";
	var rowdataval = new Object();
	for(var j in $.DataMap.port_list)
	{
		if($.DataMap.port_list[j].indexid == row.data.name)
		{
			break;
		}
	}
	for(var i in $.DataMap.port_list[j])
	{
		switch(i){
					case "indexid":
					    rowdataval.portindexid_text = $.DataMap.port_list[j][i];
					break;
					case "protocolsel":
					    rowdataval.port_protocol_select = $.DataMap.port_list[j][i];
					break;
					case "lanipfilter_start":
					   getTag("portAddresse_info","port_lanip_text").text_a.setValue($.DataMap.port_list[j][i]);
					break;
					case "lanipfilter_end":
							getTag("portAddresse_info","port_lanip_text").text_b.setValue($.DataMap.port_list[j][i]);
					break;
					case "lanportfilter_start":
					   getTag("portAddresse_info","port_Scope_text").text_a.setValue($.DataMap.port_list[j][i]);
					break;
					case "lanportfilter_end":
							getTag("portAddresse_info","port_Scope_text").text_b.setValue($.DataMap.port_list[j][i]);
					break;
					case "wanipfilter_start":
					   getTag("portAddresse_info","port_wanipuser_text").text_a.setValue($.DataMap.port_list[j][i]);
					break;
					case "wanipfilter_end":
							getTag("portAddresse_info","port_wanipuser_text").text_b.setValue($.DataMap.port_list[j][i]);
					break;
					case "wanportfilter_start":
					   getTag("portAddresse_info","port_wanportuser_text").text_a.setValue($.DataMap.port_list[j][i]);
					break;
					case "wanportfilter_end":
							getTag("portAddresse_info","port_wanportuser_text").text_b.setValue($.DataMap.port_list[j][i]);
					break;
		}
	}
    setModify(rowdataval);
    MODData = $.DataMap.port_list[j][i];
    getTag("portAddresse_info","port_lanip_text").text_a.entity.disabled = true;
	getTag("portAddresse_info","port_lanip_text").text_b.entity.disabled = true;
	getTag("portAddresse_info","port_wanipuser_text").text_a.entity.disabled = true;
	getTag("portAddresse_info","port_wanipuser_text").text_b.entity.disabled = true;
	getTag("portAddresse_info","port_Scope_text").text_a.entity.disabled = true;
	getTag("portAddresse_info","port_Scope_text").text_b.entity.disabled = true;
	getTag("portAddresse_info","port_wanportuser_text").text_a.entity.disabled = true;
	getTag("portAddresse_info","port_wanportuser_text").text_b.entity.disabled = true;
	getTag("portAddresse_info","port_protocol_select").select.entity.disabled = true;
}
function add_port_save(){
	//if(!checkTag(["MACAddresse_info"])){return;}
	//端口的验证（数字）
	var strlanport_start = getTag("portAddresse_info","port_Scope_text").text_a.entity.value;
	var strlanport_end = getTag("portAddresse_info","port_Scope_text").text_b.entity.value;
	var reg = new RegExp("^[0-9]*$");
	if((!reg.test(strlanport_start)) && (strlanport_start != "") && (strlanport_start != " "))
	{
		checkShow(getTag("portAddresse_info","port_Scope_text").text_a,$.CommonLan['int_number_err']);return;
	}
	if((!reg.test(strlanport_end)) && (strlanport_end != "") && (strlanport_end != " "))
	{
		checkShow(getTag("portAddresse_info","port_Scope_text").text_b,$.CommonLan['int_number_err']);return;
	}
	if((strlanport_start != "") && (strlanport_end != "") && (strlanport_start != " ") && (strlanport_end != " "))
	{
		if(parseInt(strlanport_start) > parseInt(strlanport_end))
		{
			checkShow(getTag("portAddresse_info","port_Scope_text").text_b,$.CommonLan['dataClassification_err']);return;
		}
	}
	var strwanport_start = getTag("portAddresse_info","port_wanportuser_text").text_a.entity.value;
	var strwanport_end = getTag("portAddresse_info","port_wanportuser_text").text_b.entity.value;
	if((!reg.test(strwanport_start)) && (strwanport_start != "") && (strwanport_start != " "))
	{
		checkShow(getTag("portAddresse_info","port_wanportuser_text").text_a,$.CommonLan['int_number_err']);return;
	}
	if((!reg.test(strwanport_end)) && (strwanport_end != "") && (strwanport_end != " "))
	{
		checkShow(getTag("portAddresse_info","port_wanportuser_text").text_b,$.CommonLan['int_number_err']);return;
	}
	if((strwanport_start != "") && (strwanport_end != "") && (strwanport_start != " ") && (strwanport_end != " "))
	{
		if(parseInt(strwanport_start) > parseInt(strwanport_end))
		{
			checkShow(getTag("portAddresse_info","port_wanportuser_text").text_b,$.CommonLan['dataClassification_err']);return;
		}
	}
	//地址的验证（ip）
	var strlanip_start = getTag("portAddresse_info","port_lanip_text").text_a.entity.value;
	var strlanip_end = getTag("portAddresse_info","port_lanip_text").text_b.entity.value;
	var reg = /^((22[0-3])|(2[0-1]\d)|(1\d\d)|([1-9]\d)|[1-9])(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/;
	if(strlanip_start.indexOf(":") == -1)
	{
		  if((!reg.test(strlanip_start)) && (strlanip_start != "") && (strlanip_start != " "))
			{
					checkShow(getTag("portAddresse_info","port_lanip_text").text_a,$.CommonLan['ip_addr_err']);return;
			}
			var str2=strlanip_start.split(".");
			if(str2[0]==127){
				checkShow(getTag("portAddresse_info","port_lanip_text").text_a,$.CommonLan['ip_addr_err']);return;
			}
	}
	else
	{
			var result = strlanip_start.match(/:/g).length<=7
&&/::/.test(strlanip_start)
?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(strlanip_start)
:/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(strlanip_start);
			if(result != true)
   		{
   				checkShow(getTag("portAddresse_info","port_lanip_text").text_a,$.CommonLan['ip_addrv6_err']);return;
   		}
		
	}
	if(strlanip_end.indexOf(":") == -1)
	{
			if((!reg.test(strlanip_end)) && (strlanip_end != "") && (strlanip_end != " "))
			{
					checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ip_addr_err']);return;
			}
			var str3=strlanip_end.split(".");
			if(str3[0]==127){
					checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ip_addr_err']);return;
			}
	}
	else
	{
			var result = strlanip_end.match(/:/g).length<=7
&&/::/.test(strlanip_end)
?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(strlanip_end)
:/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(strlanip_end);
			if(result != true)
   		{
   				checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ip_addrv6_err']);return;
   		}
		
	}

	if((strlanip_start != "") && (strlanip_start != " ") && (strlanip_end != "") && (strlanip_end != " "))
	{
		if((strlanip_start.indexOf(":") == -1) && (strlanip_end.indexOf(":") == -1))//v4比较
		{
				var start0 = strlanip_start.split('.')[0];
				var start1 = strlanip_start.split('.')[1];
				var start2 = strlanip_start.split('.')[2];
				var start3 = strlanip_start.split('.')[3];
				var end0 = strlanip_end.split('.')[0];
				var end1 = strlanip_end.split('.')[1];
				var end2 = strlanip_end.split('.')[2];
				var end3 = strlanip_end.split('.')[3];
				if(parseInt(start0) > parseInt(end0))
				{
					checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
				if((parseInt(start0) == parseInt(end0)) && (parseInt(start1) > parseInt(end1)))
				{
					checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
				if((parseInt(start0) == parseInt(end0)) && (parseInt(start1) == parseInt(end1)) && (parseInt(start2) > parseInt(end2)))
				{
					checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
				if((parseInt(start0) == parseInt(end0)) && (parseInt(start1) == parseInt(end1)) && (parseInt(start2) == parseInt(end2)) && (parseInt(start3) > parseInt(end3)))
				{
					checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
		}
		else
		{
			//ipv6地址大小比较
			var ip1arry = new Array();
      var ip2arry = new Array();
      var t = 0;
      ip1arry = strlanip_start.split(":");
      ip2arry = strlanip_end.split(":");
      if(ip1arry.length > ip2arry.length)
      {
      	var length1 = ip1arry.length;
      }
      else
      {
      	length1 = ip2arry.length;
      }
      for(var i = 0; i < length1; i++)
      {
            if(ip1arry[i] == "") 
            {
                if(ip2arry[i]=="") 
                { 
                    continue;
                } 
                else 
                {
                    t = -1;break;
                }
            }  
            else 
            {
                if(ip2arry[i]=="")
                {
                      t = 1;
                      checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ipcompare0_err']);return;
                } 
                else 
                { 
                    var value1 = parseInt(ip1arry[i]);
                    var value2 = parseInt(ip2arry[i]);
                    if(value1 > value2) 
                      {
                         t = 1;
                         checkShow(getTag("portAddresse_info","port_lanip_text").text_b,$.CommonLan['ipcompare0_err']);return;
                      }
                      else if(value1 < value2) 
                      {
                         t = -1;
                      } 
                      else 
                      {
                         continue;
                      }
               }
           }
      }
        t = 0;

		}
	}
	
	var strwanip_start = getTag("portAddresse_info","port_wanipuser_text").text_a.entity.value;
	var strwanip_end = getTag("portAddresse_info","port_wanipuser_text").text_b.entity.value;
	if(strwanip_start.indexOf(":") == -1)
	{
			if((!reg.test(strwanip_start)) && (strwanip_start != "") && (strwanip_start != " "))
			{
					checkShow(getTag("portAddresse_info","port_wanipuser_text").text_a,$.CommonLan['ip_addr_err']);return;
			}
			var str2=strwanip_start.split(".");
			if(str2[0]==127){
				checkShow(getTag("portAddresse_info","port_wanipuser_text").text_a,$.CommonLan['ip_addr_err']);return;
			}
	}
	else
	{
			var result = strwanip_start.match(/:/g).length<=7
&&/::/.test(strwanip_start)
?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(strwanip_start)
:/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(strwanip_start);
			if(result != true)
   		{
   				checkShow(getTag("portAddresse_info","port_wanipuser_text").text_a,$.CommonLan['ip_addrv6_err']);return;
   		}
		
	}
	if(strwanip_end.indexOf(":") == -1)
	{
			if((!reg.test(strwanip_end)) && (strwanip_end != "") && (strwanip_end != " "))
			{
					checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ip_addr_err']);return;
			}
			var str3=strwanip_end.split(".");
			if(str3[0]==127){
				checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ip_addr_err']);return;
			}
	}
	else
	{
			var result = strwanip_end.match(/:/g).length<=7
&&/::/.test(strwanip_end)
?/^([\da-f]{1,4}(:|::)){1,6}[\da-f]{1,4}$/i.test(strwanip_end)
:/^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(strwanip_end);
			if(result != true)
   		{
   				checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ip_addrv6_err']);return;
   		}
	}
	//缺少地址比较大小
	if((strwanip_start != "") && (strwanip_start != " ") && (strwanip_end != "") && (strwanip_end != " "))
	{
		if((strwanip_start.indexOf(":") == -1) && (strwanip_end.indexOf(":") == -1))//v4比较
		{
				var start0 = strwanip_start.split('.')[0];
				var start1 = strwanip_start.split('.')[1];
				var start2 = strwanip_start.split('.')[2];
				var start3 = strwanip_start.split('.')[3];
				var end0 = strwanip_end.split('.')[0];
				var end1 = strwanip_end.split('.')[1];
				var end2 = strwanip_end.split('.')[2];
				var end3 = strwanip_end.split('.')[3];
				if(parseInt(start0) > parseInt(end0))
				{
					checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
				if((parseInt(start0) == parseInt(end0)) && (parseInt(start1) > parseInt(end1)))
				{
					checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
				if((parseInt(start0) == parseInt(end0)) && (parseInt(start1) == parseInt(end1)) && (parseInt(start2) > parseInt(end2)))
				{
					checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
				if((parseInt(start0) == parseInt(end0)) && (parseInt(start1) == parseInt(end1)) && (parseInt(start2) == parseInt(end2)) && (parseInt(start3) > parseInt(end3)))
				{
					checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ipcompare0_err']);return;
				}
		}
		else
		{
			//ipv6地址大小比较
			var ip1arry = new Array();
      var ip2arry = new Array();
      var m = 0;
      ip1arry = strwanip_start.split(":");
      ip2arry = strwanip_end.split(":");
      if(ip1arry.length > ip2arry.length)
      {
      	var length1 = ip1arry.length;
      }
      else
      {
      	length1 = ip2arry.length;
      }
      for(var i = 0; i < length1; i++)
      {
            if(ip1arry[i] == "") 
            {
                if(ip2arry[i]=="") 
                { 
                    continue;
                } 
                else 
                {
                    m = -1;break;
                }
            }  
            else 
            {
                if(ip2arry[i]=="")
                {
                      m = 1;
                      checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ipcompare0_err']);return;
                } 
                else 
                { 
                    var value1 = parseInt(ip1arry[i]);
                    var value2 = parseInt(ip2arry[i]);
                    if(value1 > value2) 
                      {
                         m = 1;
                         checkShow(getTag("portAddresse_info","port_wanipuser_text").text_b,$.CommonLan['ipcompare0_err']);return;
                      }
                      else if(value1 < value2) 
                      {
                         m = -1;
                      } 
                      else 
                      {
                         continue;
                      }
               }
           }
      }
        m = 0;
			
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
		obj.indexid = getTag("portAddresse_info","portindexid_text").text.entity.value;
	}
	obj.protocolsel = getTag("portAddresse_info","port_protocol_select").select.entity.value;
	if(getTag("portAddresse_info","port_lanip_text").text_a.entity.value == "")
	{
		obj.lanipfilter_start = "0.0.0.0";
	}
	else
	{
		obj.lanipfilter_start = getTag("portAddresse_info","port_lanip_text").text_a.entity.value;
  }
  if(getTag("portAddresse_info","port_lanip_text").text_b.entity.value == "")
	{
		obj.lanipfilter_end = "255.255.255.255";
	}
	else
	{
		obj.lanipfilter_end = getTag("portAddresse_info","port_lanip_text").text_b.entity.value;
  }
	obj.lanportfilter_start = getTag("portAddresse_info","port_Scope_text").text_a.entity.value;
	obj.lanportfilter_end = getTag("portAddresse_info","port_Scope_text").text_b.entity.value;
	if(getTag("portAddresse_info","port_wanipuser_text").text_a.entity.value == "")
	{
		obj.wanipfilter_start="0.0.0.0";
	}
	else
	{
	obj.wanipfilter_start = getTag("portAddresse_info","port_wanipuser_text").text_a.entity.value;
  }
  if(getTag("portAddresse_info","port_wanipuser_text").text_b.entity.value == "")
	{
		obj.wanipfilter_end="255.255.255.255";
	}
	else
	{
	obj.wanipfilter_end = getTag("portAddresse_info","port_wanipuser_text").text_b.entity.value;
  }
	obj.wanportfilter_start = getTag("portAddresse_info","port_wanportuser_text").text_a.entity.value;
	obj.wanportfilter_end = getTag("portAddresse_info","port_wanportuser_text").text_b.entity.value;
	if(obj.mode == "add")
	{
	setAppDataurl('save','ip_filter_list_add',obj,function(data){        
		$.Refresh();
		add_SepPort_info();
		});
	}
	else if(obj.mode == "mod")
	{
		setAppDataurl('mod','ip_filter_list_mod',obj,function(data){       
		$.Refresh();
		add_SepPort_info();
		});
	}
}
