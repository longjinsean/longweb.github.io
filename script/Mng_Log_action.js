/************************************* 管理》日志文件管理》日志查看 *******************************************/
function init_MLcheck_set(){
	$.CurrentApp = "ML_Check";
	getRequestData("management_log_show",{"no":"no"},function(data1){
		if(data1.Title_log_enable_label == "1")
		{
			data1.Title_log_enable_label = $.CommonLan['enabled'];
		}
		else
		{
			data1.Title_log_enable_label = $.CommonLan['noenabled'];
		}
		setAppTagData(data1);
		Viewlog_set(data1);
		});
}
function loghide(){
		$.CurrentApp = "ML_Check";
		getTag("logtable_info","MLcheck_button").hide();
		setTagDomAction("logtable_info",["MLcheck_result_list"],null,'hide');
}
function Viewlog_set(data1){
	$.CurrentApp = "ML_Check";
		var nonedata = Math.random();
	  getrequesttxtval("web_log/log?nonedata="+nonedata,{"none":nonedata},function(data){
	  var strdatalog = "";
		var logarry = new Array();
		logarry = data.split("\n");
		if(logarry.length >= 6)
		{
			for(var k=0;k<6;k++)
			{
				strdatalog += " "+"<b>"+logarry[k]+"</b>"+"\n";
			}
			for(var i=6;i<logarry.length;i++)
			{
				var loglinedata = new Array();
				loglinedata = logarry[i].split(" ");
				var str = "";
				if((loglinedata[0] == "undefine") || (loglinedata[0] == "") || (loglinedata[0] == " ") || (loglinedata[0] == null))
				{
					continue;	
				}
				//日志过滤
				if(data1.Title_log_level_label2 == "0" && (loglinedata[2] == "[1]" || loglinedata[2] == "[2]" || loglinedata[2] == "[3]" || loglinedata[2] == "[4]" || loglinedata[2] == "[5]" || loglinedata[2] == "[6]" || loglinedata[2] == "[7]"))
				{
						continue;	
				}	
				else if(data1.Title_log_level_label2 == "1" && (loglinedata[2] == "[2]" || loglinedata[2] == "[3]" || loglinedata[2] == "[4]" || loglinedata[2] == "[5]" || loglinedata[2] == "[6]" || loglinedata[2] == "[7]"))
				{
						continue;	
				}
				else if(data1.Title_log_level_label2 == "2" && (loglinedata[2] == "[3]" || loglinedata[2] == "[4]" || loglinedata[2] == "[5]" || loglinedata[2] == "[6]" || loglinedata[2] == "[7]"))
				{
						continue;	
				}
				else if(data1.Title_log_level_label2 == "3" && (loglinedata[2] == "[4]" || loglinedata[2] == "[5]" || loglinedata[2] == "[6]" || loglinedata[2] == "[7]"))
				{
						continue;	
				}
				else if(data1.Title_log_level_label2 == "4" && (loglinedata[2] == "[5]" || loglinedata[2] == "[6]" || loglinedata[2] == "[7]"))
				{
						continue;	
				}
				else if(data1.Title_log_level_label2 == "5" && (loglinedata[2] == "[6]" || loglinedata[2] == "[7]"))
				{
						continue;	
				}
				else if(data1.Title_log_level_label2 == "6" && (loglinedata[2] == "[7]"))
				{
						continue;	
				}
						
					
				switch(loglinedata[2])
				{
					case "[0]":
						loglinedata[2] = "EMERGENCY";break;
					case "[1]":
						loglinedata[2] = "ALERT";break;
					case "[2]":
						loglinedata[2] = "CRITICAL";break;
					case "[3]":
						loglinedata[2] = "ERROR";break;
					case "[4]":
						loglinedata[2] = "WARNING";break;
					case "[5]":
						loglinedata[2] = "NOTICE";break;
					case "[6]":
						loglinedata[2] = "INFORMITIONAL";break;
					case "[7]":
						loglinedata[2] = "DEBUG";break;	
					default:
						break;	
				}
				for(var j=3;j<loglinedata.length;j++)
				{
				  str += loglinedata[j]+" ";					
				}
				strdatalog += " "+loglinedata[0]+" "+loglinedata[1]+" "+loglinedata[2]+" "+str+"\n";
			}
		}

	  //getTag("logtable_info","MLcheck_result_list").context.html("<div style=\"width:620px;height:300px;overflow:auto;border:1px solid #000;\"><pre>"+data+"</pre></div>");
	  getTag("logtable_info","MLcheck_result_list").context.html("<div style=\"width:620px;height:300px;overflow:auto;line-height:20px;border:1px solid #000;\"><pre>"+strdatalog+"</pre></div>");
		getTag("logtable_info","MLcheck_button").show();
		setTagDomAction("logtable_info",["MLcheck_result_list"],null,'show');
		
//		getRequestData("management_log_close",{"no":"no"},function(datav){
//		});
		
		});
}
function Clearlog_set(){
	$.CurrentApp = "ML_Check";
	//删除日志，并隐藏日志显示框
	getRequestData("management_log_clear",{"no":"no"},function(data){
		loghide();
	});
}
function refresh_log(){
	$.CurrentApp = "ML_Check";
	$.Refresh();
	//getTag("logtable_info","MLcheck_button").show();
	//setTagDomAction("logtable_info",["MLcheck_result_list"],null,'show');
}
function close_log(){
	$.CurrentApp = "ML_Check";
	getRequestData("management_log_close",{"no":"no"},function(data){
		loghide();
	});
}
function Export_log(){
	$.CurrentApp = "ML_Check";
	//导出日志   (没有接口)
	
}
/************************************* 管理》日志文件管理》日志设置 *******************************************/
function init_MLsetting_set(){
	$.CurrentApp = "ML_Setting";
	getRequestData("management_log_setdisplay",{"no":"no"},function(data){
		setAppTagData(data);
		if(data.LogEnable_checkbox == "1")
		{
			getTag("MLsetting_info","LogEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("MLsetting_info","LogEnable_checkbox").checkbox.entity.checked = false;	
		}
	});	
}
function MLsetting_save(){
	$.CurrentApp = "ML_Setting";
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("MLsetting_info","LogEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.LogEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.LogEnable_checkbox = '0';
	 }
	 obj.LevelLog_select = getTag("MLsetting_info","LevelLog_select").select.entity.value;
	 obj.LevelDisplay_select = getTag("MLsetting_info","LevelDisplay_select").select.entity.value;
	 
	setAppDataurl('save','management_log_set',obj,function(data){
		$.Refresh();
		});
	
	
}
