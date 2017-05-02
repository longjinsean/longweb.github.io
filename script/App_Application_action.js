/************************************* 应用》日常应用》远程下载 *******************************************/
function init_Dowanload_set(){
		getRequestData("usb_query_show",{"no":"no"},function(data){
		var wanarrydownload = new Array();
	  for(var i in data.usb_connected_list)
	  {
			wanarrydownload.push(data.usb_connected_list[i].Table_usb_1_table);
		}

		autoselect_usb(wanarrydownload);
//  setAppTagData(data);
	});
}
function userdisabled(){
	if(getTag("Dowanload_info","HiddenName_checkbox").checkbox.entity.checked)
	  {  
	  	setTagDomAction("Dowanload_info",["DowanloadUserName_text","UserPass_password"],null,'hide');
	  }
  else 
	  {  
	  	setTagDomAction("Dowanload_info",["DowanloadUserName_text","UserPass_password"],null,'show');
	  }
	
}
function Begin_download(){
	if(!checkTag(["Dowanload_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	obj.DownloadTransports_Value_select = getTag("Dowanload_info","DownloadTransports_Value_select").select.entity.value;
	obj.ServerUrl_text = getTag("Dowanload_info","ServerUrl_text").text.entity.value;
	obj.ServerPort_text = getTag("Dowanload_info","ServerPort_text").text.entity.value;
	
	if(getTag("Dowanload_info","HiddenName_checkbox").checkbox.entity.checked)
	{
		obj.HiddenName_checkbox = '1';
		obj.DowanloadUserName_text = "";
		obj.UserPass_password = "";
	}
	else
	{
	 	obj.HiddenName_checkbox = '0';
	 	obj.DowanloadUserName_text = getTag("Dowanload_info","DowanloadUserName_text").text.entity.value;
		obj.UserPass_password = getTag("Dowanload_info","UserPass_password").text.entity.value;
	}
	obj.usbEquipment_select = getTag("Dowanload_info","usbEquipment_select").select.entity.value; 
	obj.DownloadFilePath_text = getTag("Dowanload_info","DownloadFilePath_text").text.entity.value;
	obj.SaveAsPath_text = getTag("Dowanload_info","SaveAsPath_text").text.entity.value;
	
	if((obj.usbEquipment_select == "") || (obj.usbEquipment_select == null))
	{
		alert("请选择USB后再进行下载！");
		return;
	}
	
	setAppDataurl('save','app_download_set',obj,function(datav){
		var data = "";
		if((datav != "undefined") && (datav != null))
		{
			data = datav;	
		}
		if(data.indexOf("DOWNLOADING") != -1)
		{
			alert($.CommonLan['download_err_1']);
		}else if(data.indexOf("SavePathNull") != -1)
		{
			alert($.CommonLan['download_err_4']);
		}else if(data.indexOf("DownloadPathNull") != -1)
		{
			alert($.CommonLan['download_err_5']);
		}else if(data.indexOf("UserNameNull") != -1)
		{
			alert($.CommonLan['download_err_7']);
		}

		$.Refresh();
		});
	
}
function Refresh_download(){
	getRequestData("app_download_show",{"no":"no"},function(data){
		for(var i in data.app_download_list)
		{
			if(data.app_download_list[i].DownloadTransports_Value_select == '0')
			{
				data.app_download_list[i].DownloadTransports_Value_select = $.CommonLan['http'];
			}
			else if(data.app_download_list[i].DownloadTransports_Value_select == '1')
			{
				data.app_download_list[i].DownloadTransports_Value_select = $.CommonLan['ftp'];
			}
			else
			{
				data.app_download_list[i].DownloadTransports_Value_select = "";
			}
		///////////
		 	/*if(data.app_download_list[i].HiddenName_checkbox == '0')
			{
				data.app_download_list[i].HiddenName_checkbox = $.CommonLan['false'];
			}
			else if(data.app_download_list[i].HiddenName_checkbox == '1')
			{
				data.app_download_list[i].HiddenName_checkbox = $.CommonLan['true'];
			}
			else
			{
				data.app_download_list[i].HiddenName_checkbox = "";
			}*/
			
			if(data.app_download_list[i].DownloadState_text == '0')
			{
				data.app_download_list[i].DownloadState_text = $.CommonLan['nodownload'];
			}
			else if(data.app_download_list[i].DownloadState_text == '1')
			{
				data.app_download_list[i].DownloadState_text = $.CommonLan['downloading'];
			}
			else if(data.app_download_list[i].DownloadState_text == '2')
			{
				data.app_download_list[i].DownloadState_text = $.CommonLan['downloaded'];
			}
			else if(data.app_download_list[i].DownloadState_text == '3')
			{
				data.app_download_list[i].DownloadState_text = $.CommonLan['downloadfaild'];
			}
			else
			{
				data.app_download_list[i].DownloadState_text = "";
			}
		}
		setAppTagData(data);
	});
}
function Cancel_download(){
	setAppDataurl('save','app_download_cancel',obj,function(data){        
		$.Refresh();
		});
}
function autoselect_usb(wanarrydownload){
	var sel = getTag('Dowanload_info','usbEquipment_select').select.entity;
	sel.options.length = wanarrydownload.length;
	var usb = "USB";
	for(var i=0;i < wanarrydownload.length;i++)
	{
		var val = wanarrydownload[i]; /*值*/
		var str = usb + wanarrydownload[i]; /*显示*/
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
	if(wanarrydownload.length >= 1)
	{
		getTag("Dowanload_info","usbEquipment_select").select.entity.value = 	wanarrydownload[0];
	}
}
function autoshow_usb(data){
	var rowarry = getTag('Dowanload_info','usbEquipment_select');
	rowarry.select.checked(data.usbEquipment_select);
}