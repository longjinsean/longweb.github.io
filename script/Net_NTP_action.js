/************************************* 网络》时间管理》时间服务器 *************************************/
/*获取当前日期与时间*/
/*
function CurentTime()
    { 
        var now = new Date();
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss = now.getSeconds();           //秒
        var clock = year + "-";
        if(month < 10)
            clock += "0";
        clock += month + "-";
        if(day < 10)
            clock += "0"; 
        clock += day + " ";
        if(hh < 10)
            clock += "0";   
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm + ":"; 
        if (ss < 10) clock += '0'; 
        clock += ss; 
        return(clock); 
}
*/
function init_nntpntp_set(){
	getRequestData("ntp_service_show",{"no":"no"},function(data){
		if(data.NtpEnable_checkbox == "1")
		{
			getTag("ntp_info","NtpEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ntp_info","NtpEnable_checkbox").checkbox.entity.checked = false;	
		}
	if(data.ui_timezone == "")
	{
		data.ui_timezone = '8';
	}
	set_ntp_server(data);
	var str2 = data.currentsystime.split(' ')[1];
	if(str2 == "Jan")
	{str2 = "01";}
	else if(str2 == "Feb")
	{str2 = "02";}
	else if(str2 == "Mar")
	{str2 = "03";}
	else if(str2 == "Apr")
	{str2 = "04";}
	else if(str2 == "May")
	{str2 = "05";}
	else if(str2 == "June")
	{str2 = "06";}
	else if(str2 == "July")
	{str2 = "07";}
	else if(str2 == "Aug")
	{str2 = "08";}
	else if(str2 == "Sep")
	{str2 = "09";}
	else if(str2 == "Oct")
	{str2 = "10";}
	else if(str2 == "Nov")
	{str2 = "11";}
	else if(str2 == "Dec")
	{str2 = "12";}
    if(data.currentsystime.split(' ')[2] == "")
	{
		var str3 = data.currentsystime.split(' ')[3];
		var str4 = data.currentsystime.split(' ')[4];
		var str5 = data.currentsystime.split(' ')[5];
		var str = str5+'-'+str2;
		var strr = str3+' '+str4;
		
	}
	else
	{
		var str3 = data.currentsystime.split(' ')[2];
		var str4 = data.currentsystime.split(' ')[3];
		var str5 = data.currentsystime.split(' ')[4];
		var str = str5+'-'+str2;
		var strr = str3+' '+str4;
	}
  var strall = str+'-'+strr;
	getTagDom("ntp_info","SystemTime_label","context").html(strall);
	setAppTagData(data);
	});		
}
function set_ntp_server(data){
	if(data.fstserver1 == "other")
	{
		getTag("ntp_info","fstserver1").select.checked(data.fstserver1);
		getTag("ntp_info","fstserver1").text.entity.value="";
		getTag("ntp_info","fstserver1").text.entity.disabled = false;
	}else
	{
		getTag("ntp_info","fstserver1").select.checked(data.fstserver1);
		getTag("ntp_info","fstserver1").text.entity.value=data.fstserver1;
		getTag("ntp_info","fstserver1").text.entity.disabled = true;
	}
	if(data.fstserver2 == "other")
	{
		getTag("ntp_info","fstserver2").select.checked(data.fstserver2);
		getTag("ntp_info","fstserver2").text.entity.value="";
		getTag("ntp_info","fstserver2").text.entity.disabled = false;
	}else
	{
		getTag("ntp_info","fstserver2").select.checked(data.fstserver2);
		getTag("ntp_info","fstserver2").text.entity.value=data.fstserver2;
		getTag("ntp_info","fstserver2").text.entity.disabled = true;
	}
	if(data.fstserver3 == "other")
	{
		getTag("ntp_info","fstserver3").select.checked(data.fstserver3);
		getTag("ntp_info","fstserver3").text.entity.value="";
		getTag("ntp_info","fstserver3").text.entity.disabled = false;
	}else
	{
		getTag("ntp_info","fstserver3").select.checked(data.fstserver3);
		getTag("ntp_info","fstserver3").text.entity.value=data.fstserver3;
		getTag("ntp_info","fstserver3").text.entity.disabled = true;
	}	
	if(data.fstserver4 == "other")
	{
		getTag("ntp_info","fstserver4").select.checked(data.fstserver4);
		getTag("ntp_info","fstserver4").text.entity.value="";
		getTag("ntp_info","fstserver4").text.entity.disabled = false;
	}else
	{
		getTag("ntp_info","fstserver4").select.checked(data.fstserver4);
		getTag("ntp_info","fstserver4").text.entity.value=data.fstserver4;
		getTag("ntp_info","fstserver4").text.entity.disabled = true;
	}	
	if(data.fstserver5 == "other")
	{
		getTag("ntp_info","fstserver5").select.checked(data.fstserver5);
		getTag("ntp_info","fstserver5").text.entity.value="";
		getTag("ntp_info","fstserver5").text.entity.disabled = false;
	}else
	{
		getTag("ntp_info","fstserver5").select.checked(data.fstserver5);
		getTag("ntp_info","fstserver5").text.entity.value=data.fstserver5;
		getTag("ntp_info","fstserver5").text.entity.disabled = true;
	}		
}
function ntpselectchange(tname,val){
	if(val == "other")
	{
		eval('getTag("ntp_info",tname).text.entity.value = " " ;');
		eval('getTag("ntp_info",tname).text.entity.disabled = false;');
	}else
	{
		eval('getTag("ntp_info",tname).text.entity.value = val ;');
		eval('getTag("ntp_info",tname).text.entity.disabled = true;');	
	}
}
/* 保存按钮功能 */
function mod_ntp_set()
{if(!checkTag(["ntp_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("ntp_info","NtpEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.NtpEnable_checkbox = '1';
	 }
	else
	 {
	 	obj.NtpEnable_checkbox = '0';
	 }
	obj.NtpType_select = getTag("ntp_info","NtpType_select").select.entity.value;
	obj.ui_timezone = getTag("ntp_info","ui_timezone").select.entity.value;
	obj.NtpInterval_text = getTag("ntp_info","NtpInterval_text").text.entity.value;
	obj.fstserver1 = getTag("ntp_info","fstserver1").text.entity.value;
	obj.fstserver2 = getTag("ntp_info","fstserver2").text.entity.value;
	obj.fstserver3 = getTag("ntp_info","fstserver3").text.entity.value;
	obj.fstserver4 = getTag("ntp_info","fstserver4").text.entity.value;
	obj.fstserver5 = getTag("ntp_info","fstserver5").text.entity.value;

	setAppDataurl('save','ntp_service_set',obj,function(data){
		$.Refresh();
		});		
}