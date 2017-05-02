/************************************* 诊断》网络诊断》ping测试 *******************************************/
function init_Ping_set(){
	$.CurrentApp = "MDD_Ping";
	getRequestData("ping_allwan_get",{"no":"no"},function(data){
		var wanarryping = new Array();
		var wanarrypingval = new Array();
		for(var i in data.ping_wan_name_list){
			wanarryping.push(data.ping_wan_name_list[i].wan_name);
			wanarrypingval.push(data.ping_wan_name_list[i].wan_name_value);
		}
	autoselect_pingwan(wanarryping,wanarrypingval);
	//autoshow_pingwan(wanarryping);
	//setAppTagData(data);
	});
	getTag("Ping_info","Ping_result").text.entity.value = "";
	init_Tracert_set();
}


function ping_start(){
	$.CurrentApp = "MDD_Ping";
	if(!checkTag(["Ping_info"])){return;}
	var Pingnum=ID("Ping_repetition_Number_text").value;
	if((parseInt(Pingnum)< 1)||(parseInt(Pingnum)>10 )){
	    checkShow(getTag("Ping_info","Ping_repetition_Number_text").text,$.CommonLan['range_err']);return;
	}	
	var obj = new Object();
	obj.mode = "save";
	
	obj.Ping_interface_select = getTag("Ping_info","Ping_interface_select").select.entity.value;
	obj.Ping_ip_version_select = getTag("Ping_info","Ping_ip_version_select").select.entity.value;
	obj.Ping_host_text = getTag("Ping_info","Ping_host_text").text.entity.value;
	obj.Ping_repetition_Number_text = getTag("Ping_info","Ping_repetition_Number_text").text.entity.value;
	setAppDataurl(null,'web_ping_exe',obj,function(data){
		var newstr = data.Ping_result.replace(/<br>/g,"\n"); 
		getTag("Ping_info","Ping_result").text.entity.value = newstr;
		});
}
function autoselect_pingwan(wanarryping,wanarrypingval){
	$.CurrentApp = "MDD_Ping";
	var sel = getTag('Ping_info','Ping_interface_select').select.entity;
	sel.options.length = wanarryping.length;
	for(var i=0;i < wanarryping.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarrypingval[i-1]; /*值*/
			 str = wanarryping[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    sel.options[i] = opt;
	}
}
function autoshow_pingwan(data){
	$.CurrentApp = "MDD_Ping";
	var rowarry = getTag('Ping_info','Ping_interface_select');
	rowarry.select.checked(data.Ping_interface_select);
}


/************************************* 诊断》网络诊断》tracert测试 *******************************************/
function init_Tracert_set(){
	$.CurrentApp = "MDD_Tracert";
	getRequestData("ping_allwan_get",{"no":"no"},function(data){
		var wanarrytracert = new Array();
		var wanarrytracertval = new Array();
		for(var i in data.ping_wan_name_list){
			wanarrytracert.push(data.ping_wan_name_list[i].wan_name);
			wanarrytracertval.push(data.ping_wan_name_list[i].wan_name_value);
		}
	autoselect_Tracertwan(wanarrytracert,wanarrytracertval);
	//autoshow_Tracertwan(wanarrytracert);
	setAppTagData(data);
	});
	getTag("Tracert_info","Tracert_result").text.entity.value = "";
	init_Inform_set();
}
function Tracert_start(){
	$.CurrentApp = "MDD_Tracert";
	if(!checkTag(["Tracert_info"])){return;}
	var Tracertnum=ID("Tracert_repetition_Number_text").value;
	if((parseInt(Tracertnum)< 1)||(parseInt(Tracertnum)>10 )){
	    checkShow(getTag("Tracert_info","Tracert_repetition_Number_text").text,$.CommonLan['range_err']);return;
	}
	var obj = new Object();
	obj.mode = "save";
	
	obj.Tracert_interface_select = getTag("Tracert_info","Tracert_interface_select").select.entity.value;
	obj.Tracert_ip_version_select = getTag("Tracert_info","Tracert_ip_version_select").select.entity.value;
	obj.Tracert_host_text = getTag("Tracert_info","Tracert_host_text").text.entity.value;
	obj.Tracert_repetition_Number_text = getTag("Tracert_info","Tracert_repetition_Number_text").text.entity.value;
	setAppDataurl(null,'web_tracert_exe',obj,function(data){
		var newstr1 = data.Tracert_result.replace(/<br>/g,"\n"); 
		getTag("Tracert_info","Tracert_result").text.entity.value = newstr1;
		});
}
function autoselect_Tracertwan(wanarrytracert,wanarrytracertval){
	$.CurrentApp = "MDD_Tracert";
	var sel = getTag('Tracert_info','Tracert_interface_select').select.entity;
	sel.options.length = wanarrytracert.length;
	for(var i=0;i < wanarrytracert.length+1;i++)
	{
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarrytracertval[i-1]; /*值*/
			 str = wanarrytracert[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    sel.options[i] = opt;
	}
}
function autoshow_Tracertwan(data){
	$.CurrentApp = "MDD_Tracert";
	var rowarry = getTag('Tracert_info','Tracert_interface_select');
	rowarry.select.checked(data.Tracert_interface_select);
}
/************************************* 诊断》网络诊断》inform上报 *******************************************/
function init_Inform_set(){
	$.CurrentApp = "MDD_Inform";
	getTag("Inform_info","informStatu").hide();
}
var informtimer = null;
var times = 0;
function Inform_save(){
	$.CurrentApp = "MDD_Inform";
	getRequestData("inform_report_ext",{"no":"no"},function(data){
	getTag("Inform_info","informStatu").show();
	getTagDom("Inform_info","informStatu","context").html($.CommonLan['inform_status']);
	});
	 times = 0;
	 informtimer = window.setInterval("refresh0()",3000);
	 //setInterval("refresh0()",2000);
	
}
function refresh0(){
	$.CurrentApp = "MDD_Inform";
	times = times+1;
	if(times > 9)
	{
		window.clearInterval(informtimer); 
	}
	else
	{
		getRequestData("itms_report_show",{"no":"no"},function(data){
			if(data.utr069_satus_list[0].Table_itms_1_Report_table == 0)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['report_success'];
			   window.clearInterval(informtimer); 
		   }
	   	else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 1)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['unreporting'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 2)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['report_noresponse'];
			   window.clearInterval(informtimer); 
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 3)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['report_interrupt'];
			   window.clearInterval(informtimer); 
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 4)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['RMT_MNG_WAN_error'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 5)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['INVALID_WAN_error'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 6)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['INVALID_ACS_error'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 7)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['FAIL_TO_GET_ACS_ADDR_error'];
		   }
		  else
		   {
		   	 data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['unknow_status'];
		   }
		   
			getTagDom("Inform_info","informStatu","context").html(data.utr069_satus_list[0].Table_itms_1_Report_table);
		});	
	}
}


