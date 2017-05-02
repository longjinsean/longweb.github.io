/************************************* 网络》QoS设置》基本设置 *************************************/
function init_nqbasic_set(){
	$.CurrentApp = "NQ_Basic";
	creat_queue_tab();
	init_nqadvanced_set();
	//init_EntranceSpeed_set();
}
function creat_queue_tab(){
	$.CurrentApp = "NQ_Basic";
getRequestData("qos_basic_show",{"no":"no"},function(data){
		setAppTagData(data);
		if(data.QoSEnable_checkbox == "1")
		{
			getTag("advanced_info","QoSEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("advanced_info","QoSEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.DSCPMarkEnable_checkbox == "1")
		{
			getTag("advanced_info","DSCPMarkEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("advanced_info","DSCPMarkEnable_checkbox").checkbox.entity.checked = false;	
		}
		var tab = getTag("queue_info","queue_info_list").tab;
		if(tab.tbody){
			tab.data = data.queue_info_list;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(data.queue_info_list);
		}
		ieenablecheckbox_nqbasic(data);
		disabled_queuelist();
	});	
	
}
function ieenablecheckbox_nqbasic(data)
{
	$.CurrentApp = "NQ_Basic";
	var rowarry = getTag("queue_info","queue_info_list").tab.tbody.Rows;
	for(var i=0;i < rowarry.length;i++)
	{
		if(data.queue_info_list[i].queueenable == "1")
		{
			getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[1].checkbox_a.entity.checked = true;
		}else
		{
			getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[1].checkbox_a.entity.checked = false;	
		}
			
	}
}
function disable_queuepro(){
	$.CurrentApp = "NQ_Basic";
	var rowarry = getTag("queue_info","queue_info_list").tab.tbody.Rows;
	for(var i=0;i < rowarry.length;i++)
	{  if(getTag("advanced_info","qoSPlan_select").select.entity.value == 1)
		{
		getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[2].text_a.entity.disabled = true;
		getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[3].text_a.entity.disabled = true;
		getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[4].text_a.entity.disabled = true;
	  }
	  else if(getTag("advanced_info","qoSPlan_select").select.entity.value == 2)
	  {
	  getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[2].text_a.entity.disabled = true;
		getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[3].text_a.entity.disabled = false;
		getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[4].text_a.entity.disabled = true;
	  }
	  else if(getTag("advanced_info","qoSPlan_select").select.entity.value == 3)
	  {
	  getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[2].text_a.entity.disabled = true;
		getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[3].text_a.entity.disabled = true;
		getTag("queue_info","queue_info_list").tab.tbody.Rows[i].Cells[4].text_a.entity.disabled = false;
	  }
	}
}
function disabled_queuelist(){
	$.CurrentApp = "NQ_Basic";
	disable_queuepro();

}
function save_queue_set(){
	$.CurrentApp = "NQ_Basic";
	MOD = "save";
	var rowarry = getTag("queue_info","queue_info_list").tab.tbody.Rows;
	var queueobj = new Object();
	queueobj.mode = "save";
	/*
	var queueenable_0 = "";
	var queueenable_1 = "";
	var queueenable_2 = "";
	var queueenable_3 = "";
	var queuepro_0 = "";
	var queuepro_1 = "";
	var queuepro_2 = "";
	var queuepro_3 = "";
	var weight_0 = "";
	var weight_1 = "";
	var weight_2 = "";
	var weight_3 = "";
	var CarWeight_0 = "";
	var CarWeight_1 = "";
	var CarWeight_2 = "";
	var CarWeight_3 = "";
	*/
	for(var i=0;i < rowarry.length;i++)
	{
		var enable_val = rowarry[i].Cells[1].checkbox_a.entity.checked;
		if(enable_val == true)
		{
			eval('queueobj.queueenable_'+i+' = "1";');
		}else if(enable_val == false)
		{
			eval('queueobj.queueenable_'+i+' = "0";');
		}
		var pro_val = rowarry[i].Cells[2].text_a.entity.value;
		eval('queueobj.queuepro_'+i+' = pro_val;');
		var weight_val = rowarry[i].Cells[3].text_a.entity.value;
		eval('queueobj.weight_'+i+' = weight_val;');
		var CarWeight_val = rowarry[i].Cells[4].text_a.entity.value;
		eval('queueobj.CarWeight_'+i+' = CarWeight_val;');
		
	}
	/*
	queueobj.queueenable_0 = queueenable_0;
	queueobj.queueenable_1 = queueenable_1;
	queueobj.queueenable_2 = queueenable_2;
	queueobj.queueenable_3 = queueenable_3;
	queueobj.queuepro_0 = queuepro_0;
	queueobj.queuepro_1 = queuepro_1;
	queueobj.queuepro_2 = queuepro_2;
	queueobj.queuepro_3 = queuepro_3;
	queueobj.weight_0 = weight_0;
	queueobj.weight_1 = weight_1;
	queueobj.weight_2 = weight_2;
	queueobj.weight_3 = weight_3;
	queueobj.CarWeight_0 = CarWeight_0;
	queueobj.CarWeight_1 = CarWeight_1;
	queueobj.CarWeight_2 = CarWeight_2;
	queueobj.CarWeight_3 = CarWeight_3;
	*/
	queueobj.Template_Index = getTag("advanced_info","Template_Index").select.entity.value;
	if(getTag("advanced_info","QoSEnable_checkbox").checkbox.entity.checked)
	 {
	 	queueobj.QoSEnable_checkbox = '1';
	 }
	else
	 {
	 	queueobj.QoSEnable_checkbox = '0';
	 }
	 if(getTag("advanced_info","DSCPMarkEnable_checkbox").checkbox.entity.checked)
	 {
	 	queueobj.DSCPMarkEnable_checkbox = '1';
	 }
	else
	 {
	 	queueobj.DSCPMarkEnable_checkbox = '0';
	 }
	queueobj.Upstream_bandwidth = getTag("advanced_info","Upstream_bandwidth").text.entity.value;
	queueobj.QoSPlan_select = getTag("advanced_info","qoSPlan_select").select.entity.value;
	queueobj.PMarkType_select = getTag("advanced_info","PMarkType_select").select.entity.value;
	
	setAppDataurl('save','qos_basic_set',queueobj,function(data){
		$.Refresh();
		});
	
}
function cancel_queue_set(){
	$.CurrentApp = "NQ_Basic";
	$.Refresh();
}
/************************************* 网络》QoS设置》分类设置 *************************************/
function init_nqadvanced_set(){
	$.CurrentApp = "NQ_Advanced";
	check_item = [];
	creat_nqadvanced_tab();
	init_Categoryset_set();
}
//限制创建数据流条数，最多为8条
function limit_numfun(data){
	$.CurrentApp = "NQ_Advanced";
	if(data.NQAdvanced_list.length >= 8)
	{
		var selone = getTag("NQAdvanced_info","NQAdvanced_list").tab.tbody.Rows;
		mod_NQAdvanced(selone[0]);	
	  selone[0].setClass("tr_bgcolor");
	  var sell = getTag("NQAdvanced_info","NQAdvanced_list").tab.tbody.rowadd;
    sell.setClass("displayhide");
	document.getElementById("add_NQAdvanced_info").disabled=true;
	}
	else
  {
  document.getElementById("add_NQAdvanced_info").disabled=false;
  }
}
function creat_nqadvanced_tab(){
getRequestData("qos_classification_show",{"no":"no"},function(data){
	  /* var wanarrynqadvanced = new Array();
		for(var i in data.queue_list){                         ///////????????
			wanarrynqadvanced.push(data.queue_list[i].list_name);   ///////????????
		}*/
		var arr = new Array();
		for(var i in data.NQAdvanced_list){
			var obj = new Object();
			obj.name = data.NQAdvanced_list[i].data_number;
			obj.mark_8021p = data.NQAdvanced_list[i].mark_8021p;
			obj.mark_dscp = data.NQAdvanced_list[i].mark_dscp;
			obj.mark_tc = data.NQAdvanced_list[i].mark_tc;
			obj.queuesel = data.NQAdvanced_list[i].queuesel;
			arr.push(obj);
		} 
		var tab = getTag("NQAdvanced_info","NQAdvanced_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}	
		//auto_selectNQAdvanced(wanarrynqadvanced);
		 limit_numfun(data);
	});	
}
function add_NQAdvanced_info(){
	$.CurrentApp = "NQ_Advanced";
	//最多创建8条
	MOD = "save";
	creat_nqadvanced_tab();
	var datat = new Object();
	//datat.data_number = "";
	datat.Remark_8021p = " ";
	datat.Remark_dscp = " ";
	datat.Remark_tc = " ";
	datat.queue_select = " ";
	setAppTagData(datat);
	
}
function del_NQAdvanced_info(){
	$.CurrentApp = "NQ_Advanced";
	var Datastream = "";
	var cnt = 0;
	for(var i in check_item)
	{
		if(check_item[i].flag)
		{
			Datastream += check_item[i].name + ",";
			cnt++;
		}
	}
	if(cnt==0)
	{
		alert($.CommonLan["checknull"]);
		return;	
	}
	Datastream = Datastream.slice(0,Datastream.length-1);
	
	if(subdebug)
	{
		alert("check_item:"+Datastream);	
	}
	NQAdvanced_del_set(Datastream);
	
	
}
function mod_NQAdvanced(row){
	$.CurrentApp = "NQ_Advanced";
	MOD = "mod";
	var rowdataval = new Object();
	for(var i in row.data)
	{
		switch(i){
					case "name":
						  rowdataval.NQdatanum = row.data[i];
					break;
					case "mark_8021p":
							rowdataval.Remark_8021p = row.data[i];
					break;
					case "mark_dscp":
							rowdataval.Remark_dscp = row.data[i];
					break;
					case "mark_tc":
							rowdataval.Remark_tc = row.data[i];
					break;
					case "queuesel":
							rowdataval.queue_select = row.data[i];
					break;
		}
	}
    setModify(rowdataval);
    MODData = row.data;
	
}

function add_Classification_save(){
	$.CurrentApp = "NQ_Advanced";
	if(!checkTag(["Classification_info"])){return;}
	var text8021p = ID("Remark_8021p").value;
	var textdscp = ID("Remark_dscp").value;
	var texttc = ID("Remark_tc").value;
	if((parseInt(text8021p)< 0)||(parseInt(text8021p)>7 )){
	    checkShow(getTag("Classification_info","Remark_8021p").text,$.CommonLan['range_err']);return;
	}	
	if((parseInt(textdscp)< 0)||(parseInt(textdscp)>63 )){
	    checkShow(getTag("Classification_info","Remark_dscp").text,$.CommonLan['range_err']);return;
	}	
	if((parseInt(texttc)< 0)||(parseInt(texttc)>63 )){
	    checkShow(getTag("Classification_info","Remark_tc").text,$.CommonLan['range_err']);return;
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
		obj.data_number = getTag('Classification_info','NQdatanum').text.entity.value;
	}
	obj.mark_8021p = getTag('Classification_info','Remark_8021p').text.entity.value;
	obj.mark_dscp = getTag('Classification_info','Remark_dscp').text.entity.value;
	obj.mark_tc = getTag('Classification_info','Remark_tc').text.entity.value;
	obj.queuesel = getTag('Classification_info','queue_select').select.entity.value;
	
  if(obj.mode == "add")
	{
	setAppDataurl('save','qos_classfication_add',obj,function(data){
		add_NQAdvanced_info();
		});
	}
	else if(obj.mode == "mod")
	{
		setAppDataurl('mod','qos_classfication_mod',obj,function(data){
		add_NQAdvanced_info();
		});
		
	}
}
function NQAdvanced_del_set(index_select)
{
	$.CurrentApp = "NQ_Advanced";
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','qos_classfication_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}
/*
function auto_selectNQAdvanced(wanarrynqadvanced)
{
	var sel = getTag('Classification_info','queue_select').select.entity;
	sel.options.length = wanarrynqadvanced.length;
	for(var i=0;i < wanarrynqadvanced.length;i++)
	{
		var val = wanarrynqadvanced[i]; 
		var str = wanarrynqadvanced[i]; 
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
	//getTag('Classification_info','queue_select').select.checked('1');
	
}
*/
/************************************* 网络》QoS设置》分类类型设置 *************************************/
function init_Categoryset_set(){
	$.CurrentApp = "NQ_Categoryset";
	check_item = [];
	creat_Categoryset_tab();
	init_AppBusiness_set();
}
function creat_Categoryset_tab(){
	$.CurrentApp = "NQ_Categoryset";
	getRequestData("qos_classification_type_show",{"no":"no"},function(data){
		var wanarryCategoryset = new Array();
		for(var i in data.AppBusiness_list_voipoptions){                     
			wanarryCategoryset.push(data.AppBusiness_list_voipoptions[i].list_name); 
		}
		var arr = new Array();
		for(var i in data.Categoryset_list){
			var obj = new Object();
			obj.typeIndex = data.Categoryset_list[i].typeIndex;  
			obj.name = data.Categoryset_list[i].data_number;
			if(data.Categoryset_list[i].dataProtocol == 1)
			{
				obj.dataProtocol = "TCP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 2)
			{
				obj.dataProtocol = "UDP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 3)
			{
				obj.dataProtocol = "TCP,UDP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 4)
			{
				obj.dataProtocol = "ICMP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 5)
			{
				obj.dataProtocol = "TCP,ICMP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 6)
			{
				obj.dataProtocol = "UDP,ICMP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 7)
			{
				obj.dataProtocol = "TCP,UDP,ICMP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 8)
			{
				obj.dataProtocol = "RTP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 9)
			{
				obj.dataProtocol = "TCP,RTP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 10)
			{
				obj.dataProtocol = "UDP,RTP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 11)
			{
				obj.dataProtocol = "TCP,UDP,RTP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 12)
			{
				obj.dataProtocol = "ICMP,RTP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 13)
			{
				obj.dataProtocol = "TCP,ICMP,RTP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 14)
			{
				obj.dataProtocol = "UDP,ICMP,RTP";
			}
			else if(data.Categoryset_list[i].dataProtocol == 15)
			{
				obj.dataProtocol = "TCP,UDP,ICMP,RTP";
			}
			else
			{
				obj.dataProtocol = " ";
			}
			if(data.Categoryset_list[i].dataClassification == "1")
			{obj.dataClassification = $.CommonLan["type_0"];}
			else if(data.Categoryset_list[i].dataClassification == "9")
			{obj.dataClassification = $.CommonLan["type_1"];}
			else if(data.Categoryset_list[i].dataClassification == "3")
			{obj.dataClassification = $.CommonLan["type_2"];}
			else if(data.Categoryset_list[i].dataClassification == "4")
			{obj.dataClassification = $.CommonLan["type_3"];}
			else if(data.Categoryset_list[i].dataClassification == "5")
			{obj.dataClassification = $.CommonLan["type_4"];}
			else if(data.Categoryset_list[i].dataClassification == "6")
			{obj.dataClassification = $.CommonLan["type_5"];}
			else if(data.Categoryset_list[i].dataClassification == "7")
			{obj.dataClassification = $.CommonLan["type_6"];}
			else if(data.Categoryset_list[i].dataClassification == "8")
			{obj.dataClassification = $.CommonLan["type_7"];}
			else if(data.Categoryset_list[i].dataClassification == "12")
			{obj.dataClassification = $.CommonLan["type_8"];}
			else if(data.Categoryset_list[i].dataClassification == "11")
			{obj.dataClassification = $.CommonLan["type_9"];}
			else if(data.Categoryset_list[i].dataClassification == "10")
			{obj.dataClassification = $.CommonLan["type_10"];}
			else
			{
				obj.dataClassification = "";
			}
			//obj.dataClassification = data.Categoryset_list[i].dataClassification;
			obj.datamin = data.Categoryset_list[i].datamin;
			obj.datamax = data.Categoryset_list[i].datamax;
			arr.push(obj);
		} 
		var tab = getTag("Categoryset_info","Categoryset_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}	
		auto_selectdatanum(wanarryCategoryset);
	});	

}
function add_Categoryset_info(){
	$.CurrentApp = "NQ_Categoryset";
	MOD = "save";
	creat_Categoryset_tab();
	var datat = new Object();
	datat.data_stream_number = " ";
	datat.data_Protocol = " ";
	datat.data_Classification = " ";
	datat.data_min = " ";
	datat.data_max = " ";
	setAppTagData(datat);
}
function del_Categoryset_info(){
	$.CurrentApp = "NQ_Categoryset";
	getRequestData("qos_classification_type_show",{"no":"no"},function(data){
	var dataname = "";
	var cnt = 0;
	for(var i in check_item)
	{
		for(var j in data.Categoryset_list)
	  {
		  if((data.Categoryset_list[j].data_number == check_item[i].name) && (data.Categoryset_list[j].typeIndex == check_item[i].index))
		  {
		  		break;
		  }
	  }
		if(check_item[i].flag)
		{
			dataname += check_item[i].index + "|" + check_item[i].name + ",";
			cnt++;
		}
	}
	if(cnt==0)
	{
		alert($.CommonLan["checknull"]);
		return;	
	}
	dataname = dataname.slice(0,dataname.length-1);
	
	if(subdebug)
	{
		alert("check_item:"+dataname);	
	}
	Category_del_set(dataname);
	});	
	
}
function Category_del_set(index_select)
{
	$.CurrentApp = "NQ_Categoryset";
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','qos_classfication_type_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}
function mod_Categoryset(row){
	$.CurrentApp = "NQ_Categoryset";
	MOD = "mod";
	var rowdataval = new Object();
	for(var i in row.data)
	{
		//alert(i);
		switch(i){
					case "typeIndex":
						  rowdataval.data_Category_Type = row.data[i];
						break;
						case "name":
						  rowdataval.data_stream_number = row.data[i];
						break;
						case "dataProtocol":
						if(row.data[i] == "TCP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						else if(row.data[i] == "UDP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						else if(row.data[i] == "TCP,UDP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						else if(row.data[i] == "ICMP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						else if(row.data[i] == "TCP,ICMP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						else if(row.data[i] == "UDP,ICMP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						else if(row.data[i] == "TCP,UDP,ICMP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						else if(row.data[i] == "RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else if(row.data[i] == "TCP,RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else if(row.data[i] == "UDP,RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else if(row.data[i] == "TCP,UDP,RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else if(row.data[i] == "ICMP,RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else if(row.data[i] == "TCP,ICMP,RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else if(row.data[i] == "UDP,ICMP,RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else if(row.data[i] == "TCP,UDP,ICMP,RTP")
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = true;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = true;
						}
						else
						{
							getTag("datatype_info","data_Protocol").checkbox1.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox2.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox3.entity.checked = false;
							getTag("datatype_info","data_Protocol").checkbox4.entity.checked = false;
						}
						
							//rowdataval.data_Protocol = row.data[i];
						break;
						case "dataClassification":
						  if(row.data[i] == "源MAC")
						  {rowdataval.data_Classification = 1;}
						  else if(row.data[i] == "802.1P")
						  {rowdataval.data_Classification = 9;}
						  else if(row.data[i] == "源IP")
						  {rowdataval.data_Classification = 3;}
						  else if(row.data[i] == "目的IP")
						  {rowdataval.data_Classification = 4;}
						  else if(row.data[i] == "源端口")
						  {rowdataval.data_Classification = 5;}
						  else if(row.data[i] == "目的端口")
						  {rowdataval.data_Classification = 6;}
						  else if(row.data[i] == "TOS值")
						  {rowdataval.data_Classification = 7;}
						  else if(row.data[i] == "DSCP值")
						  {rowdataval.data_Classification = 8;}
						  else if(row.data[i] == "流类型TC")
						  {rowdataval.data_Classification = 12;}
						  else if(row.data[i] == "LAN接口")
						  {rowdataval.data_Classification = 11;}
						  else if(row.data[i] == "WAN接口")
						  {rowdataval.data_Classification = 10;}
							//rowdataval.data_Classification = row.data[i];
						break;
						case "datamin":
							rowdataval.data_min = row.data[i];
						break;
						case "datamax":
							rowdataval.data_max = row.data[i];
						break;
		}
	}
    setModify(rowdataval);
    MODData = row.data;
	
	
}
function add_dataClassification_save(){
	$.CurrentApp = "NQ_Categoryset";
	/*if(!checkTag(["datatype_info"])){return;}
	var str1=getTag("datatype_info","data_min").text.entity.value;
	var str2=getTag("datatype_info","data_max").text.entity.value;
	if(parseInt(str1) > parseInt(str2)){
	    checkShow(getTag("datatype_info","data_max").text,$.CommonLan['dataClassification_err']);return;
	}	*/
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
		obj.typeIndex = getTag("datatype_info","data_Category_Type").text.entity.value;
	}
	 obj.data_number = getTag("datatype_info","data_stream_number").select.entity.value;
	var strProtocol = 0;
	if(getTag("datatype_info","data_Protocol").checkbox1.entity.checked == true)
	  {
	  	strProtocol = (strProtocol | 0x01);
	  }
	if(getTag("datatype_info","data_Protocol").checkbox2.entity.checked == true)
	  {
	  	strProtocol = (strProtocol | 0x02);
	  }
	  if(getTag("datatype_info","data_Protocol").checkbox3.entity.checked == true)
	  {
	  	strProtocol = (strProtocol | 0x04);
	  }
	  if(getTag("datatype_info","data_Protocol").checkbox4.entity.checked == true)
	  {
	  	strProtocol = (strProtocol | 0x08);
	  }
  obj.dataProtocol = strProtocol;
	obj.dataClassification = getTag("datatype_info","data_Classification").select.entity.value;
	obj.datamin = getTag("datatype_info","data_min").text.entity.value;
	obj.datamax = getTag("datatype_info","data_max").text.entity.value;
	if(obj.mode == "add")
	{
	setAppDataurl('save','qos_classfication_type_add',obj,function(data){
		add_Categoryset_info();
		});
	}
	else if(obj.mode == "mod")
	{
		setAppDataurl('mod','qos_classfication_type_mod',obj,function(data){
		add_Categoryset_info();
		});
		
	}
}
function auto_selectdatanum(wanarryCategoryset)
{
	$.CurrentApp = "NQ_Categoryset";
	var sel = getTag('datatype_info','data_stream_number').select.entity;
	sel.options.length = wanarryCategoryset.length;
	for(var i=0;i < wanarryCategoryset.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarryCategoryset[i-1]; /*值*/
			 str = wanarryCategoryset[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
	//getTag('datatype_info','data_stream_number').select.checked('1');
	
}

/************************************* 网络》QoS设置》APP业务 *************************************/
function init_AppBusiness_set(){
	$.CurrentApp = "NQ_AppBusiness";
	creat_AppBusiness_table();
	init_EntranceSpeed_set();
}
function creat_AppBusiness_table(){
	getRequestData("qos_app_service_show",{"no":"no"},function(data){
		/*var wanarryAppBusiness1 = new Array();
		for(var i in data.AppBusiness_list_voipoptions){                     ////??????????????
			wanarryAppBusiness1.push(data.AppBusiness_list_voipoptions[i].list_name);  ////??????????????
		}*/
		var arr = new Array();
		for(var i in data.AppBusiness_list){
			var obj = new Object();
			obj.businessname = data.AppBusiness_list[i].businessname;
			obj.queuename = data.AppBusiness_list[i].queuename;
			arr.push(obj);
		}
		var tab = getTag("AppBusiness_info","AppBusiness_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}	
	//auto_selecttr069();
	auto_selectvoip();
	AppBusiness_value(data);
	});	
}
/*
function auto_selecttr069(){
var wanarry = ['TR069','VOIP'];
	var sel = getTag("AppBusiness_info","AppBusiness_list").tab.tbody.Rows;
	sel[0].Cells[1].select_a.entity.options.length = wanarry.length;
	for(var i=0;i < wanarry.length;i++)
	{
		var val = wanarry[i]; 
		var str = wanarry[i]; 
		var opt = new Option(str,val);
    	sel[0].Cells[1].select_a.entity.options[i] = opt;
	}

}
*/
function auto_selectvoip(){
	$.CurrentApp = "NQ_AppBusiness";
	var wanarry = ['1','2','3','4','5','6','7','8'];
	var sel = getTag("AppBusiness_info","AppBusiness_list").tab.tbody.Rows;
	sel[1].Cells[1].select_a.entity.options.length = wanarry.length;
	sel[0].Cells[1].select_a.entity.options.length = wanarry.length;
	for(var i=0;i < wanarry.length;i++)
	{
		var val = wanarry[i]; /*值*/
		var str = wanarry[i]; /*显示*/
		var opt = new Option(str,val);
    	sel[1].Cells[1].select_a.entity.options[i] = opt;
	}
	for(var i=0;i < wanarry.length;i++)
	{
		var val = wanarry[i]; /*值*/
		var str = wanarry[i]; /*显示*/
		var opt = new Option(str,val);
    	sel[0].Cells[1].select_a.entity.options[i] = opt;
	}

}
function AppBusiness_value(data){
	$.CurrentApp = "NQ_AppBusiness";
	var rowarry = getTag("AppBusiness_info","AppBusiness_list").tab.tbody.Rows;
	rowarry[0].Cells[1].select_a.checked(data.AppBusiness_list[0].queuename);
	rowarry[1].Cells[1].select_a.checked(data.AppBusiness_list[1].queuename);
}
function save_AppBusiness_set(){
	$.CurrentApp = "NQ_AppBusiness";
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	var rowarry = getTag("AppBusiness_info","AppBusiness_list").tab.tbody.Rows;
	     obj.tr069_queue = rowarry[0].Cells[1].select_a.entity.value;
	     obj.voip_queue = rowarry[1].Cells[1].select_a.entity.value;
	
	setAppDataurl('save','qos_app_service_set',obj,function(data){
		$.Refresh();
		});	
}
function cancel_AppBusiness_set(){
	$.CurrentApp = "NQ_AppBusiness";
$.Refresh();
}
/************************************* 网络》QoS设置》入口限速 *************************************/
function init_EntranceSpeed_set(){
	$.CurrentApp = "NQ_EntranceSpeed";
	getRequestData("QoS_ratelimit_show",{"no":"no"},function(data){
		if(data.EntranceSpeedup_select == '0')
	{
		getTag("EntranceSpeed_info","web_aucUpIpLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").hide();
	}
	else if(data.EntranceSpeedup_select == '1')
	{
		getTag("EntranceSpeed_info","web_aucUpLanLimit").show();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpIpLimit").hide();
	}
	else if(data.EntranceSpeedup_select == '2')
	{
		getTag("EntranceSpeed_info","web_aucUpLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").show();
		getTag("EntranceSpeed_info","web_aucUpIpLimit").hide();
	}
	else if(data.EntranceSpeedup_select == '3')
	{
		getTag("EntranceSpeed_info","web_aucUpLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpIpLimit").show();
	}
	/////
		if(data.EntranceSpeeddown_select == '0')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").hide();
	}
	else if(data.EntranceSpeeddown_select == '1')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").show();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").hide();
	}
	else if(data.EntranceSpeeddown_select == '2')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").show();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").hide();
	}
	else if(data.EntranceSpeeddown_select == '3')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").show();
	}
		setAppTagData(data);
	});	
}
function uplimit_display(){
	$.CurrentApp = "NQ_EntranceSpeed";
	if(getTag("EntranceSpeed_info","EntranceSpeedup_select").select.entity.value == '0')
	{
		getTag("EntranceSpeed_info","web_aucUpIpLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").hide();
	}
	else if(getTag("EntranceSpeed_info","EntranceSpeedup_select").select.entity.value == '1')
	{
		getTag("EntranceSpeed_info","web_aucUpLanLimit").show();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpIpLimit").hide();
	}
	else if(getTag("EntranceSpeed_info","EntranceSpeedup_select").select.entity.value == '2')
	{
		getTag("EntranceSpeed_info","web_aucUpLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").show();
		getTag("EntranceSpeed_info","web_aucUpIpLimit").hide();
	}
	else if(getTag("EntranceSpeed_info","EntranceSpeedup_select").select.entity.value == '3')
	{
		getTag("EntranceSpeed_info","web_aucUpLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucUpIpLimit").show();
	}
	
}
function downlimit_display(){
	$.CurrentApp = "NQ_EntranceSpeed";
	if(getTag("EntranceSpeed_info","EntranceSpeeddown_select").select.entity.value == '0')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").hide();
	}
	else if(getTag("EntranceSpeed_info","EntranceSpeeddown_select").select.entity.value == '1')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").show();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").hide();
	}
	else if(getTag("EntranceSpeed_info","EntranceSpeeddown_select").select.entity.value == '2')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").show();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").hide();
	}
	else if(getTag("EntranceSpeed_info","EntranceSpeeddown_select").select.entity.value == '3')
	{
		getTag("EntranceSpeed_info","web_aucDownLanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownVlanLimit").hide();
		getTag("EntranceSpeed_info","web_aucDownIpLimit").show();
	}
}
function EntSpeed_set(){
	$.CurrentApp = "NQ_EntranceSpeed";
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.EntranceSpeedup_select = getTag("EntranceSpeed_info","EntranceSpeedup_select").select.entity.value;
	obj.EntranceSpeeddown_select = getTag("EntranceSpeed_info","EntranceSpeeddown_select").select.entity.value;
	obj.web_aucUpLanLimit = getTag("EntranceSpeed_info","web_aucUpLanLimit").text.entity.value;
	obj.web_aucUpVlanLimit = getTag("EntranceSpeed_info","web_aucUpVlanLimit").text.entity.value;
	obj.web_aucUpIpLimit = getTag("EntranceSpeed_info","web_aucUpIpLimit").text.entity.value;
	obj.web_aucDownLanLimit = getTag("EntranceSpeed_info","web_aucDownLanLimit").text.entity.value;
	obj.web_aucDownVlanLimit = getTag("EntranceSpeed_info","web_aucDownVlanLimit").text.entity.value;
	obj.web_aucDownIpLimit = getTag("EntranceSpeed_info","web_aucDownIpLimit").text.entity.value;
	setAppDataurl('save','QoS_ratelimit_set',obj,function(data){
		$.Refresh();
		});	
}