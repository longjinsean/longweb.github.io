/************************************* 状态》用户侧信息》无线接口信息 *************************************/
function init_Wireless_set(){
	$.CurrentApp = "SL_WLANinfo";
	getRequestData("wlan_newwork_show",{"no":"no"},function(data){
		var onetagtabwlan = getTag("Title_wlan_satus_label","wlaninfo_stat_list").tab;
		if(onetagtabwlan.thead){
			onetagtabwlan.data = data;
			onetagtabwlan.refresh();
		}else{
			if(data.wlaninfo_stat_list[0].Title_wlaninfo4_1_Channel_table == '0')
		  {
			  data.wlaninfo_stat_list[0].Title_wlaninfo4_1_Channel_table = $.CommonLan['auto'];
		  }
		  else
		  {
		  	//data.wlaninfo_stat_list[0].Title_wlaninfo4_1_Channel_table ="";
		  }
		
			if(data.wlaninfo_stat_list[0].Title_wlaninfo3_1_linkstatus_table == '0')
		  {
			  data.wlaninfo_stat_list[0].Title_wlaninfo3_1_linkstatus_table = $.CommonLan['unconnected'];
		  }
		  else if(data.wlaninfo_stat_list[0].Title_wlaninfo3_1_linkstatus_table == '1')
		  {
			  data.wlaninfo_stat_list[0].Title_wlaninfo3_1_linkstatus_table = $.CommonLan['connected'];
		  }
		  else
		  {
		  	data.wlaninfo_stat_list[0].Title_wlaninfo3_1_linkstatus_table ="";
		  }
		
		  getTag("Title_wlan_satus_label","wlaninfo_stat_list").data = data.wlaninfo_stat_list;
			onetagtabwlan.createTableone(data.wlaninfo_stat_list);
		}
	
		for(var i in data.wlan_stat_list)
		{
		}
		for(var j in data.wlanssid_stat_list)
		{
			if(data.wlanssid_stat_list[j].Table_wlanssid_1_3_SecurityConfig_table == '0')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_3_SecurityConfig_table = $.CommonLan['noconfig'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_3_SecurityConfig_table == '1')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_3_SecurityConfig_table = $.CommonLan['configed'];
			}
			else
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_3_SecurityConfig_table = "";
			}
			
			if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '0')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['Open'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '1')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['shared'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '2')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['WPAPSK'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '3')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['WPA2PSK'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '4')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['WPA_WPA2_PSK'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '5')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['WPA_ENTERPRISE'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '6')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['WPA2_ENTERPRISE'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '7')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['WPA_WPA2_ENTERPRISE'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table == '8')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = $.CommonLan['WPS'];
			}
			else
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_4_AuthenticationMode_table = "";
			}
			
			if(data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table == '0')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table = $.CommonLan['NONE'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table == '1')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table = $.CommonLan['WEP'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table == '2')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table = $.CommonLan['TKIP'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table == '3')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table = $.CommonLan['AES'];
			}
			else if(data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table == '4')
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table = $.CommonLan['TKIP_AES'];
			}
			else
			{
				data.wlanssid_stat_list[j].Table_wlanssid_1_5_EncryptionMode_table = "";
			}
			
		}
		setAppTagData(data);
		init_Ethernetport_set();
	});
}
/************************************* 状态》用户侧信息》以太网接口信息 *************************************/
function init_Ethernetport_set(){
	$.CurrentApp = "SL_Ethinfo";
	getRequestData("landhcp_ip_show",{"no":"no"},function(data){
		for(var i in data.landhcp_stat_list)
		{
			if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '0')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_0'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '1')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_1'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '2')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_2'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '3')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_3'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '4')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_4'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '5')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_5'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '6')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_6'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '7')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_7'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '8')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_8'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '9')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_9'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '10')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_10'];
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_4_port_table == '11')
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = $.CommonLan['vlan_11'];
			}
			else
			{
				data.landhcp_stat_list[i].Table_landhcp_4_port_table = "";
			}
		///////////
		  if(data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table == '0')
			{
				data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table = "STB";
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table == '1')
			{
				data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table = "Phone";
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table == '2')
			{
				data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table = "Camera";
			}
			else if(data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table == '3')
			{
				data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table = "Computer";
			}
			else
			{
				data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table = "";
			}
		}
		
		var arr = new Array();
		for(var i in data.landhcp_stat_list)
		{
			var obj = new Object();
			obj.Table_landhcp_1_IP_table = data.landhcp_stat_list[i].Table_landhcp_1_IP_table;
			obj.Table_landhcp_2_MAC_table = data.landhcp_stat_list[i].Table_landhcp_2_MAC_table;
			obj.Table_landhcp_3_DeviceType_table = data.landhcp_stat_list[i].Table_landhcp_3_DeviceType_table;
			obj.Table_landhcp_4_port_table = data.landhcp_stat_list[i].Table_landhcp_4_port_table;
			
			arr.push(obj);
		}
		data.landhcp_stat_list = arr;
		
		for(var j in data.laninterface_stat_list)
		{
			if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '0')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_0'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '1')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_1'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '2')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_2'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '3')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_3'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '4')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_4'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '5')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_5'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '6')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_6'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '7')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_7'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '8')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_8'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '9')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_9'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '10')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_10'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table == '11')
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = $.CommonLan['vlan_11'];
			}
			else
			{
				data.laninterface_stat_list[j].Table_laninterface_1_1_Port_table = "";
			}
		////////////
			if(data.laninterface_stat_list[j].Table_laninterface_2_2_Mode_table == '0')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_2_Mode_table = $.CommonLan['half_duplex'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_2_2_Mode_table == '1')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_2_Mode_table = $.CommonLan['full_duplex'];
			}
			else
			{
				data.laninterface_stat_list[j].Table_laninterface_2_2_Mode_table = "";
			}
	  ///////////
	    if(data.laninterface_stat_list[j].Table_laninterface_2_3_speed_table == '1')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_3_speed_table = "10M";
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_2_3_speed_table == '2')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_3_speed_table = "100M";
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_2_3_speed_table == '3')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_3_speed_table = "1000M";
			}
			else
			{
				data.laninterface_stat_list[j].Table_laninterface_2_3_speed_table = "";
			}
		///////////
		  if(data.laninterface_stat_list[j].Table_laninterface_2_4_link_table == '1')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_4_link_table = $.CommonLan['link_Equipment'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_2_4_link_table == '2')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_4_link_table = $.CommonLan['unlink_Equipment'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_2_4_link_table == '3')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_4_link_table = $.CommonLan['unlink_Equipment'];
			}
			else if(data.laninterface_stat_list[j].Table_laninterface_2_4_link_table == '4')
			{
				data.laninterface_stat_list[j].Table_laninterface_2_4_link_table = $.CommonLan['unlink_Equipment'];
			}
			else
			{
				data.laninterface_stat_list[j].Table_laninterface_2_4_link_table = "";
			}
		}

		setAppTagData(data);
	});
}
/************************************* 状态》用户侧信息》USB状态信息 *************************************/
/*function init_usb_set(){
	getRequestData("usb_connect_show",{"no":"no"},function(data){
		var onetagtabusb = getTag("Title_usb_satus_label","usb_satus_tip").tab;
		if(onetagtabusb.thead){
			onetagtabusb.data = data;
			onetagtabusb.refresh();
		}else{
			for(var i=0;i < data.usb_satus_tip.length;i++)
			{
				if(data.usb_satus_tip[i].Table_usb_1_table == '0')
		  	{
			  	data.usb_satus_tip[i].Table_usb_1_table = $.CommonLan['unconnected'];
		  	}
		 	 	else if(data.usb_satus_tip[i].Table_usb_1_table == '1')
		  	{
			  	data.usb_satus_tip[i].Table_usb_1_table = $.CommonLan['connected'];
		  	}
		  	else if(data.usb_satus_tip[i].Table_usb_1_table == '2')
		  	{	
			  	data.usb_satus_tip[i].Table_usb_1_table = $.CommonLan['connected'];
		  	}
		  	else if(data.usb_satus_tip[i].Table_usb_1_table == '3')
		  	{
			  	data.usb_satus_tip[i].Table_usb_1_table = $.CommonLan['connected'];
		  	}
		  	else if(data.usb_satus_tip[i].Table_usb_1_table == '4')
		  	{
			  	data.usb_satus_tip[i].Table_usb_1_table = $.CommonLan['connected'];
		  	}
		  	else
		  	{
		  		data.usb_satus_tip[i].Table_usb_1_table ="";
		  	}
		  }
		
		  getTag("Title_usb_satus_label","usb_satus_tip").data = data.usb_satus_tip;
			onetagtabusb.createTableone(data.usb_satus_tip);
		}
		
		if(data.UsbShare == '0' )
		{
			data.UsbShare = $.CommonLan['disable'];
		}else if(data.UsbShare == '1' )
		{
			data.UsbShare = $.CommonLan['enable'];
		}
		else
		{
			data.UsbShare = $.CommonLan['unkown'];
		}
		
		if(data.UsbPrintShare == '0' )
		{
			data.UsbPrintShare = $.CommonLan['disable'];
		}else if(data.UsbPrintShare == '1' )
		{
			data.UsbPrintShare = $.CommonLan['enable'];
		}
		else
		{
			data.UsbPrintShare = $.CommonLan['unkown'];
		}
		
		setAppTagData(data);
	});
}	*/
