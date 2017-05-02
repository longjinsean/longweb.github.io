/************************************* 管理》设备管理》设备管理 *******************************************/
function init_MDdevice_set(){
	
}

/*function init_USB_Backup_set(){

    getRequestData("usb_query_show",{"no":"no"},function(data){ 
	  	var wanarryusb = new Array();
	   	for(var i in data.usb_connected_list){
			wanarryusb.push(data.usb_connected_list[i].Table_usb_1_table);
		}
		if(data.rapid_recover_enable == "1")
		{
			getTag("MDUsbdevice_info","RecEnable_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("MDUsbdevice_info","RecEnable_checkbox").checkbox.entity.checked = false;	
		}
		if(data.usbshare_checkbox == "1")
		{
			getTag("MDUsbdevice_info","usbshare_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("MDUsbdevice_info","usbshare_checkbox").checkbox.entity.checked = false;	
		}
	autoselect_mngusb(wanarryusb);
	autoshow_mngusb(data);
	setAppTagData(data);
	});
}*/

function RecEnable_save()
{
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("MDUsbdevice_info","RecEnable_checkbox").checkbox.entity.checked)
	 {
	 	obj.rapid_recover_enable = '1';
	 }
	else
	 {
	 	obj.rapid_recover_enable = '0';
	 }
	 setAppDataurl('save','usb_rapid_recovery_set',obj,function(data){
		$.Refresh();
		});
}

function usbshare_save()
{
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	if(getTag("MDUsbdevice_info","usbshare_checkbox").checkbox.entity.checked)
	 {
	 	obj.usbshare_checkbox = '1';
	 }
	else
	 {
	 	obj.usbshare_checkbox = '0';
	 }
	 setAppDataurl('save','usb_PrintShare_set',obj,function(data){
		$.Refresh();
		});
}

function MDdevice_save(){
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.part_select = getTag("MDUsbdevice_info","Usbsubarea_select").select.entity.value;
	 
	setAppDataurl('save','usb_backup_config_set',obj,function(data){
		$.Refresh();
		});
	
	
}
function factoryset_save(){
	var r_result=confirm($.CommonLan['factoryconfirm']);
	if(r_result == false)
	{
		return;
	}
	var name = escape("flag");
	var path = "/";
	var expires = new Date(0);
	path = path == "" ? "" : ";path=" + path;
	document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
	$.lockWin($.CommonLan['factorysetinfo'],1);
getRequestData("onu_restore_factory",{"no":"no"},function(data){
	});	
	var count = 120;
	var count_time = window.setInterval(function(){
		if(count == 0)
		{
			window.clearInterval(count_time);
			$.unlockWin('');
			//跳转到 index.html 页面
			if(accountlevel == 1)
			{
					log_out();
			}
			else
			{
				log_out_user();
			}
			//window.location = "./index.html";
		}else
		{
			$.lockWin($.CommonLan['factorysetinfo']+":   "+count,1);
			count--;
		}
	 	}, 1000);
}


function reboot_save(){
	if(change_reboot != 1)
	{
		var r_result=confirm($.CommonLan['rebootconfirm']);
		if(r_result == false)
		{
			return;
		}
	}
	$.lockWin($.CommonLan['rebootsetinfo'],1);
	getRequestData("device_reset",{"no":"no"},function(data){
	});
	var count = 120;
	var count_time2 = window.setInterval(function(){
		if(count == 0)
		{
			window.clearInterval(count_time2);
			$.unlockWin('');
			//跳转到 index.html 页面
			if(accountlevel == 1)
			{
					log_out();
			}
			else
			{
				log_out_user();
			}
			//window.location = "./index.html";
		}else
		{
			$.lockWin($.CommonLan['rebootsetinfo']+":   "+count,1);
			count--;
		}
	 	}, 1000);
}
function factorysetall_save(){
	var f_result=confirm($.CommonLan['factoryallconfirm']);
	if(f_result == false)
	{
		return;
	}
	var name = escape("flag");
	var path = "/";
	var expires = new Date(0);
	path = path == "" ? "" : ";path=" + path;
	document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path;
	$.lockWin($.CommonLan['factorysetallinfo'],1);
getRequestData("onu_restore_factory_long",{"no":"no"},function(data){
	});	
	var count = 150;
	var count_time = window.setInterval(function(){
		if(count == 0)
		{
			window.clearInterval(count_time);
			$.unlockWin('');
			//跳转到 index.html 页面
			if(accountlevel == 1)
			{
					log_out();
			}
			else
			{
				log_out_user();
			}
			//window.location = "./index.html";
		}else
		{
			$.lockWin($.CommonLan['factorysetallinfo']+":   "+count,1);
			count--;
		}
	 	}, 1000);
}
function autoselect_mngusb(wanarryusb){
	var sel = getTag('MDUsbdevice_info','Usbsubarea_select').select.entity;
	sel.options.length = wanarryusb.length;
	var usb = "USB";
	for(var i=0;i < wanarryusb.length;i++)
	{
		var val = wanarryusb[i]; /*值*/
		var str = usb + wanarryusb[i]; /*显示*/
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_mngusb(data){
	
	var rowarry = getTag('MDUsbdevice_info','Usbsubarea_select');
	rowarry.select.checked(data.part_select_val);
}
