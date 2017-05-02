/*菜单控制*/
function devicetypechange(){

	var hgutype = "0";  
	/*设备类型*/
	/* 0-默认中国电信;  telhubei-电信湖北; telanhui-安微电信*/
	var potsnumstr = "1";  
	/*语音支持：
					0 - 不支持
					1 - 支持1个语音口
					2 - 支持2个语音口
	*/
	var wlannumstr = "0";  
	/*无线支持：
					0 - 不支持
					1 - 支持1个无线口
					2 - 支持2个无线口
					4 - 支持4个无线口
	*/
	
	var usbnumstr = "0";  
	/*USB支持：
					0 - 不支持
					1 - 支持1个USB口
					2 - 支持2个USB口
					4 - 支持4个USB口
	*/
	
	var CONFIG_WEB_PREDICTIVE = "0";
	var CONFIG_WEB_ITMS_DISABLED_2 = "0";
	var CONFIG_WEB_USER_FEC = "0";
	var CONFIG_WEB_USER_ALERT = "0";
	
	
	/*功能变量定义 按地域:
	*/
	///////////////////////////////////////////////////////////
	var localstr = window.location.href;
	var hrefstr = localstr.split("?");
	var paramstr = hrefstr[1].split("&");
	
	for(var s=0; s < paramstr.length; s++)
	{
	    var parampre = paramstr[s].split("=");	
	    var paramname = parampre[0];
	    var paramval =  parampre[1];
	    
	    if(paramname == "potsnum")
	    {
	    	switch(paramval){
					case '0':
						potsnumstr = "0"; 
					break;
					case '1':
						potsnumstr = "1"; 
					break;
					case '2':
						potsnumstr = "2"; 
					break;
					case 'default':
					break;
				}
	    }else if(paramname == "areainfo")
	    {
	    	switch(paramval){
					case 'anhui':
						CONFIG_WEB_PREDICTIVE = "1";
					break;
					case 'hubei':
						CONFIG_WEB_USER_FEC = "1"; 
						CONFIG_WEB_USER_ALERT = "1";
					break;
					case 'neimeng':
						CONFIG_WEB_ITMS_DISABLED_2 = "1"; 
					break;
					case 'jilin':
						CONFIG_WEB_ITMS_DISABLED_2 = "1"; 
					break;
					case 'yiqi':
						CONFIG_WEB_ITMS_DISABLED_2 = "1"; 
					break;
					case 'default':
					break;
				}
	    }else if(paramname == "wlannum")
	    {
	    	switch(paramval){
					case '0':
						wlannumstr = "0"; 
					break;
					case '1':
						wlannumstr = "1"; 
					break;
					case '2':
						wlannumstr = "2"; 
					break;
					case '4':
						wlannumstr = "4"; 
					break;
					case 'default':
						wlannumstr = "0"; 
					break;
				}
	    }else if(paramname == "usbnum")
	    {
	    	switch(paramval){
					case '0':
						usbnumstr = "0"; 
					break;
					case '1':
						usbnumstr = "1"; 
					break;
					case '2':
						usbnumstr = "2"; 
					break;
					case '4':
						usbnumstr = "4"; 
					break;
					case 'default':
						usbnumstr = "0"; 
					break;
				}
	    } 	 	
	}
	
	/////////////////////////////////////////////////////////////
		if(hgutype == "0")
		{
			/* 一级菜单控制 */
			for(var i=0;i<Modules.length;i++)
			{
				switch(Modules[i].name){
					case "Status": Modules[i].display = "1";break;
					case "Network": Modules[i].display = "1";break;
					case "Secure": Modules[i].display = "1";break;
					case "Application": Modules[i].display = "1";break;
					case "Management": Modules[i].display = "1";break;
					case "diagnose": Modules[i].display = "1";break;
					case "Help":Modules[i].display = "1";break;
					default:break;
				}
			}
			/* 二级菜单控制 */
			for(var i in Apppanels)
			{
				if(!Apppanels[i].length)
				{
					switch(Apppanels[i].name){
						/* diagnose */
						case "Dia_Diagnose": Apppanels[i].display = "1";break;
						/* Help */
						case "Help_Help": Apppanels[i].display = "1";break;
						default:break;
					}	
					continue;
				}
				for(var j=0;j<Apppanels[i].length;j++)
				{
					switch(Apppanels[i][j].name){
						/* Status */
						case "Sta_Overview": Apppanels[i][j].display = "1";break;
						case "Sta_WAN": Apppanels[i][j].display = "1";break;
						case "Sta_LAN": Apppanels[i][j].display = "1";break;
						case "Sta_Voice": 
							if(potsnumstr == "0")
							{
								Apppanels[i][j].display = "0";
							}else
							{
								Apppanels[i][j].display = "1";
							}
						break;
						case "Sta_Management": Apppanels[i][j].display = "1";break;
						case "Sta_telligent": Apppanels[i][j].display = "0";break;
						/* Network */
						case "Net_Network": Apppanels[i][j].display = "1";break;
						case "Net_LAN": Apppanels[i][j].display = "1";break;
						case "Net_WLAN":
						if(wlannumstr == "0")
						{
							 Apppanels[i][j].display = "0";
						}else
						{
							Apppanels[i][j].display = "1";
						}
						break;
						case "Net_Management": Apppanels[i][j].display = "1";break;
						case "Net_QoS": Apppanels[i][j].display = "1";break;
						case "Net_NTP": Apppanels[i][j].display = "1";break;
						case "Net_Route": Apppanels[i][j].display = "1";break;
						case "Net_UsersLimit": Apppanels[i][j].display = "0";break;
						/* Secure */
						case "Secu_WAN": Apppanels[i][j].display = "1";break;
						case "Secu_Firewall": Apppanels[i][j].display = "1";break;
						case "Secu_MAC": Apppanels[i][j].display = "1";break;
						case "Secu_port": Apppanels[i][j].display = "1";break;
						/* Application */
						case "App_DDNS": Apppanels[i][j].display = "1";break;
						case "App_NAT": Apppanels[i][j].display = "1";break;
						case "App_UPnP": Apppanels[i][j].display = "1";break;
						case "App_Voice": 
							if(potsnumstr == "0")
							{
								Apppanels[i][j].display = "0";
							}else
							{
								Apppanels[i][j].display = "1";
							}
						break;
						case "App_IGMP": Apppanels[i][j].display = "1";break;
						case "App_Application":
						if(usbnumstr == "0")
						{
							 Apppanels[i][j].display = "0";
						}else
						{
							 Apppanels[i][j].display = "1";
						}
						break;
						/* Management */
						case "Mng_User": Apppanels[i][j].display = "1";break;
						case "Mng_Device": Apppanels[i][j].display = "1";break;
						case "Mng_Log": Apppanels[i][j].display = "1";break;
						case "Mng_upgrade": Apppanels[i][j].display = "0";break;
						case "Mng_Maintain": Apppanels[i][j].display = "1";break;
						/* diagnose */
						case "Dia_Diagnose": Apppanels[i][j].display = "1";break;
						case "Dia_Busdiagnose": 
							if(potsnumstr == "0")
							{
								Apppanels[i][j].display = "0";
							}else
							{
								Apppanels[i][j].display = "1";
							}
						break;
						case "Dia_predictive": 
							if(CONFIG_WEB_PREDICTIVE == "1")
							{
								Apppanels[i][j].display = "1";
							}else
							{
								Apppanels[i][j].display = "0";
							}
						break; /*预检修*/
						/* help */
						case "Help_Help": Apppanels[i][j].display = "1";break;
						default:break;
					}
				}
			}
			/* 三级菜单控制 */
			for(var i in Applications)
			{
				if(!Applications[i].length)
				{
					switch(Applications[i].name){
						/* Sta_Voice */
						case "SV_Voiceinfo": Applications[i].display = "1";break;
						default:break;
					}
				}
				for(var j=0;j<Applications[i].length;j++)
				{
					switch(Applications[i][j].name){
						/* Sta_Overview */
						case "SO_Overview": Applications[i][j].display = "1";break;
						case "SO_Wizard": Applications[i][j].display = "0";break;
						/* Sta_WAN */
						case "SW_IPinfo": Applications[i][j].display = "1";break;
						case "SW_Linkinfo": Applications[i][j].display = "1";break;
						/* Sta_LAN */
						case "SL_WLANinfo":
						if(wlannumstr == "0")
						{
							 Applications[i][j].display = "0";
						}else
						{
							 Applications[i][j].display = "1";
						}
						break;
						case "SL_Ethinfo": Applications[i][j].display = "1";break;
						case "SL_USBinfo":
						if(usbnumstr == "0")
						{
							 Applications[i][j].display = "0";
						}else
						{
							 Applications[i][j].display = "1";
						}
						break;
						/* Sta_Voice */
						case "SV_Voiceinfo": 
							if(potsnumstr == "0")
							{
								Apppanels[i][j].display = "0";
							}else
							{
								Apppanels[i][j].display = "1";
							}
						break;
						/* Sta_Management */
						case "SM_Interactive": Applications[i][j].display = "1";break;
						case "SM_Setupstatus": Applications[i][j].display = "1";break;
						/* Sta_telligent */
						case "SI_Intelligent": Applications[i][j].display = "1";break;
						/* Net_Network */
						case "NN_WAN": Applications[i][j].display = "1";break;
						case "NN_VLAN": Applications[i][j].display = "1";break;
						/* Net_LAN */
						case "ND_IPv4": Applications[i][j].display = "1";break;
						case "ND_IPv6": Applications[i][j].display = "1";break;
						case "ND_Named": Applications[i][j].display = "1";break;
						/* Net_WLAN */
						case "NW_Basic": Applications[i][j].display = "1";break;
						case "NW_Advanced": Applications[i][j].display = "1";break;
						/* Net_Management */
						case "NM_ITMS": Applications[i][j].display = "1";break;
						case "NM_Loid": Applications[i][j].display = "1";break;
						/* Net_QoS */
						case "NQ_Basic": Applications[i][j].display = "1";break;
						case "NQ_Advanced": Applications[i][j].display = "1";break;
						case "NQ_AppBusiness": Applications[i][j].display = "1";break;
						case "NQ_Categoryset": Applications[i][j].display = "1";break;
						case "NQ_EntranceSpeed": Applications[i][j].display = "1";break;
						/* Net_NTP */
						case "NNTP_NTP": Applications[i][j].display = "1";break;
						/* Net_Route */
						case "NR_Route": Applications[i][j].display = "1";break;
						/* Secu_WAN */
						case "SeW_WAN": Applications[i][j].display = "1";break;
						/* Secu_Firewall */
						case "SeF_Firewall": Applications[i][j].display = "1";break;
						/* Secu_MAC */
						case "SeM_MAC": Applications[i][j].display = "1";break;
						/* Secu_port */
						case "SeP_port": Applications[i][j].display = "1";break;
						/* App_DDNS */
						case "AD_DDNS": Applications[i][j].display = "1";break;
						/* App_NAT */
						case "AN_ALG": Applications[i][j].display = "1";break;
						case "AN_DMZ": Applications[i][j].display = "1";break;
						case "AN_VirtualServer": Applications[i][j].display = "1";break;
						/* App_UPnP */
						case "AU_UPnP": Applications[i][j].display = "1";break;
						/* App_Voice */
						case "AV_Pchange": Applications[i][j].display = "1";break;
						case "AV_Basic": Applications[i][j].display = "1";break;
						case "AV_BasicH248":Applications[i][j].display = "1";break;
						case "AV_Advanced": Applications[i][j].display = "1";break;
						case "AV_AdvancedH248":Applications[i][j].display = "1";break;
						case "AV_Addtional": Applications[i][j].display = "1";break;
						case "AV_AddtionalIMS":Applications[i][j].display = "1";break;
						case "AV_AddtionalH248":Applications[i][j].display = "1";break;
						case "AV_Digitalmap": Applications[i][j].display = "1";break;
						case "AV_DigitalmapH248":Applications[i][j].display = "1";break;
						case "AV_Fax": Applications[i][j].display = "1";break;
						/* App_IGMP */
						case "AI_Muticast": Applications[i][j].display = "1";break;
						/* App_Application */
						case "AA_Dowanload": Applications[i][j].display = "1";break;
						/* Mng_User */
						case "MU_User": Applications[i][j].display = "1";break;
						/*MU_Useradmin*/
						case "MU_Useradmin": Applications[i][j].display = "0";break;
						/* Mng_Device */
						case "MD_Device": Applications[i][j].display = "1";break;
						case "USB_Backup": 
							if(usbnumstr == "0")
							{
								Applications[i][j].display = "0";
							}else
							{
								Applications[i][j].display = "1";
							}
						break;
						/* Mng_Log */
						case "ML_Check": Applications[i][j].display = "1";break;
						case "ML_Setting": Applications[i][j].display = "1";break;
						/* MU_upgrade */
						case "MU_upgrade": Applications[i][j].display = "1";break;
						/* Mng_Maintain */
						case "MM_Maintain": Applications[i][j].display = "1";break;
						/* Dia_Diagnose */
						case "DD_Ping": Applications[i][j].display = "1";break;
						case "DD_Tracert": Applications[i][j].display = "1";break;
						case "DD_Inform": Applications[i][j].display = "1";break;
						/* Dia_Busdiagnose */
						case "DB_diagnose": Applications[i][j].display = "1";break;
						/* Help_Help */
						case "HH_Help": Applications[i][j].display = "1";break;
						default:break;
					}
				}
				
			}
			/* 页面内容 pan div 控制 */		
			for(var i in Panels)
			{
				/* pannel - 页面块显示控制 */
				for(var j=0;j<Panels[i].length;j++){
					switch(Panels[i][j].name)
					{
						case "Title_pon": Panels[i][j].display = "1";break;
						case "Title_wifi": 
						if(wlannumstr == "0")
						{
							Panels[i][j].display = "0";
						}else
						{
							Panels[i][j].display = "1";
						}
						break;
						default:break;
					}
					/* tag - 单个元素行控制 */
					for(var k=0;k<Panels[i][j].tags.length;k++)
					{
						switch(Panels[i][j].tags[k].name)
						{
						case "tips": Panels[i][j].tags[k].display = "1";break;
						case "MDdevice_infocontext": 
							if(usbnumstr == "0")
							{
							Panels[i][j].tags[k].display = "0";
							}else
							{
							Panels[i][j].tags[k].display = "1";	
							}
							break;
						case "RecEnable_checkbox": 
							if(usbnumstr == "0")
							{
							Panels[i][j].tags[k].display = "0";
							}else
							{
							Panels[i][j].tags[k].display = "1";	
							}
						break;
						case "Usbsubarea_select": 
							if(usbnumstr == "0")
							{
							Panels[i][j].tags[k].display = "0";
							}else
							{
							Panels[i][j].tags[k].display = "1";	
							}
						break;
						case "MDdevice_button": 
							if(usbnumstr == "0")
							{
							Panels[i][j].tags[k].display = "0";
							}else
							{
							Panels[i][j].tags[k].display = "1";	
							}
						break;
						case "usbEquipment_select": 
							if(usbnumstr == "0")
							{
							Panels[i][j].tags[k].display = "0";
							}else
							{
							Panels[i][j].tags[k].display = "1";	
							}
						break;
						
						case "ssid_port": 
							if(wlannumstr == "0")
							{
								Panels[i][j].tags[k].display = "0";
							}else
							{
								Panels[i][j].tags[k].display = "1";
							}
						break;
						case "LanAddressRange_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanPC_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanSTB_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanPhone_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanCamera_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanDHCP_Submask_text": Panels[i][j].tags[k].display = "0";break;
						case "LanLeaseTime_select": Panels[i][j].tags[k].display = "1";break;
						//case "LanAddressRange6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanPC6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanSTB6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanPhone6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanCamera6_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "Table_pon1_Networklinks_list": Panels[i][j].tags[k].display = "1";break;
						case "Table_pon1_Networklinks_userlist": Panels[i][j].tags[k].display = "0";break;
						case "Table_pon5_Performance_list": Panels[i][j].tags[k].display = "1";break;
						case "Table_pon5_Performance_userlist": Panels[i][j].tags[k].display = "0";break;
						case "Table_pon5_Performance_userlist_hubei": Panels[i][j].tags[k].display = "0";break;
						case "FirewallEnable_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "DTIMPeriod_text": Panels[i][j].tags[k].display = "0";break;
						case "BeaconPeriod_text": Panels[i][j].tags[k].display = "0";break;
						case "RTSLimit_text": Panels[i][j].tags[k].display = "0";break;
						case "FragLimit_text": Panels[i][j].tags[k].display = "0";break;
						case "PrinterInfo": Panels[i][j].tags[k].display = "0";break;
						//case "ssidindex_select": Panels[i][j].tags[k].display = "0";break;
						default:break;
						}
					}
				}
			}
		}else
		{
			/* 一级菜单控制 */
			for(var i=0;i<Modules.length;i++)
			{
				switch(Modules[i].name){
					case "Status": Modules[i].display = "1";break;
					case "Network": Modules[i].display = "1";break;
					case "Secure": Modules[i].display = "1";break;
					case "Application": Modules[i].display = "1";break;
					case "Management": Modules[i].display = "1";break;
					case "diagnose": Modules[i].display = "1";break;
					case "Help":Modules[i].display = "1";break;
					default:break;
				}
			}
			/* 二级菜单控制 */
			for(var i in Apppanels)
			{
				if(!Apppanels[i].length)
				{
					switch(Apppanels[i].name){
						/* diagnose */
						case "Dia_Diagnose": Apppanels[i].display = "1";break;
						/* Help */
						case "Help_Help": Apppanels[i].display = "1";break;
						default:break;
					}	
					continue;
				}
				for(var j=0;j<Apppanels[i].length;j++)
				{
					switch(Apppanels[i][j].name){
						/* Status */
						case "Sta_Overview": Apppanels[i][j].display = "1";break;
						case "Sta_WAN": Apppanels[i][j].display = "1";break;
						case "Sta_LAN": Apppanels[i][j].display = "1";break;
						case "Sta_Voice": Apppanels[i][j].display = "1";break;
						case "Sta_Management": Apppanels[i][j].display = "1";break;
						case "Sta_telligent": Apppanels[i][j].display = "0";break;
						/* Network */
						case "Net_Network": Apppanels[i][j].display = "1";break;
						case "Net_LAN": Apppanels[i][j].display = "1";break;
						case "Net_WLAN":
						if(wlannumstr == "0")
						{
							 Apppanels[i][j].display = "0";
						}else
						{
							 Apppanels[i][j].display = "1";
						}
						break;
						case "Net_Management": Apppanels[i][j].display = "1";break;
						case "Net_QoS": Apppanels[i][j].display = "1";break;
						case "Net_NTP": Apppanels[i][j].display = "1";break;
						case "Net_Route": Apppanels[i][j].display = "1";break;
						/* Secure */
						case "Secu_WAN": Apppanels[i][j].display = "1";break;
						case "Secu_Firewall": Apppanels[i][j].display = "1";break;
						case "Secu_MAC": Apppanels[i][j].display = "1";break;
						case "Secu_port": Apppanels[i][j].display = "1";break;
						/* Application */
						case "App_DDNS": Apppanels[i][j].display = "1";break;
						case "App_NAT": Apppanels[i][j].display = "1";break;
						case "App_UPnP": Apppanels[i][j].display = "1";break;
						case "App_Voice": Apppanels[i][j].display = "1";break;
						case "App_IGMP": Apppanels[i][j].display = "1";break;
						case "App_Application":
						if(usbnumstr == "0")
						{
							 Apppanels[i][j].display = "0";
						}else
						{
							 Apppanels[i][j].display = "1";
						}
						break;
						/* Management */
						case "Mng_User": Apppanels[i][j].display = "1";break;
						case "Mng_Device": Apppanels[i][j].display = "1";break;
						case "Mng_Log": Apppanels[i][j].display = "1";break;
						case "Mng_upgrade": Apppanels[i][j].display = "0";break;
						case "Mng_Maintain": Apppanels[i][j].display = "1";break;
						/* diagnose */
						case "Dia_Diagnose": Apppanels[i][j].display = "1";break;
						case "Dia_Busdiagnose": Apppanels[i][j].display = "1";break;
						/* help */
						case "Help_Help": Apppanels[i][j].display = "1";break;
						default:break;
					}
				}
			}
			/* 三级菜单控制 */
			for(var i in Applications)
			{
				if(!Applications[i].length)
				{
					switch(Applications[i].name){
						/* Sta_Voice */
						case "SV_Voiceinfo": Applications[i].display = "1";break;
						default:break;
					}
				}
				for(var j=0;j<Applications[i].length;j++)
				{
					switch(Applications[i][j].name){
						/* Sta_Overview */
						case "SO_Overview": Applications[i][j].display = "1";break;
						case "SO_Wizard": Applications[i][j].display = "0";break;
						/* Sta_WAN */
						case "SW_IPinfo": Applications[i][j].display = "1";break;
						case "SW_Linkinfo": Applications[i][j].display = "1";break;
						/* Sta_LAN */
						case "SL_WLANinfo":
						if(wlannumstr == "0")
						{
							 Applications[i][j].display = "0";
						}else
						{
							 Applications[i][j].display = "1";
						}
						break;
						case "SL_Ethinfo": Applications[i][j].display = "1";break;
						case "SL_USBinfo":
						if(usbnumstr == "0")
						{
							 Applications[i][j].display = "0";
						}else
						{
							 Applications[i][j].display = "1";
						}
						break;
						/* Sta_Voice */
						case "SV_Voiceinfo": Applications[i][j].display = "1";break;
						/* Sta_Management */
						case "SM_Interactive": Applications[i][j].display = "1";break;
						case "SM_Setupstatus": Applications[i][j].display = "1";break;
						/* Sta_telligent */
						case "SI_Intelligent": Applications[i][j].display = "1";break;
						/* Net_Network */
						case "NN_WAN": Applications[i][j].display = "1";break;
						case "NN_VLAN": Applications[i][j].display = "1";break;
						/* Net_LAN */
						case "ND_IPv4": Applications[i][j].display = "1";break;
						case "ND_IPv6": Applications[i][j].display = "1";break;
						case "ND_Named": Applications[i][j].display = "1";break;
						/* Net_WLAN */
						case "NW_Basic": Applications[i][j].display = "1";break;
						case "NW_Advanced": Applications[i][j].display = "1";break;
						/* Net_Management */
						case "NM_ITMS": Applications[i][j].display = "1";break;
						case "NM_Loid": Applications[i][j].display = "1";break;
						/* Net_QoS */
						case "NQ_Basic": Applications[i][j].display = "1";break;
						case "NQ_Advanced": Applications[i][j].display = "1";break;
						case "NQ_AppBusiness": Applications[i][j].display = "1";break;
						case "NQ_Categoryset": Applications[i][j].display = "1";break;
						case "NQ_EntranceSpeed": Applications[i][j].display = "1";break;
						/* Net_NTP */
						case "NNTP_NTP": Applications[i][j].display = "1";break;
						/* Net_Route */
						case "NR_Route": Applications[i][j].display = "1";break;
						/* Secu_WAN */
						case "SeW_WAN": Applications[i][j].display = "1";break;
						/* Secu_Firewall */
						case "SeF_Firewall": Applications[i][j].display = "1";break;
						/* Secu_MAC */
						case "SeM_MAC": Applications[i][j].display = "1";break;
						/* Secu_port */
						case "SeP_port": Applications[i][j].display = "1";break;
						/* App_DDNS */
						case "AD_DDNS": Applications[i][j].display = "1";break;
						/* App_NAT */
						case "AN_ALG": Applications[i][j].display = "1";break;
						case "AN_DMZ": Applications[i][j].display = "1";break;
						case "AN_VirtualServer": Applications[i][j].display = "1";break;
						/* App_UPnP */
						case "AU_UPnP": Applications[i][j].display = "1";break;
						/* App_Voice */
						case "AV_Pchange": Applications[i][j].display = "1";break;
						case "AV_Basic": Applications[i][j].display = "1";break;
						case "AV_BasicH248":Applications[i][j].display = "1";break;
						case "AV_Advanced": Applications[i][j].display = "1";break;
						case "AV_AdvancedH248":Applications[i][j].display = "1";break;
						case "AV_Addtional": Applications[i][j].display = "1";break;
						case "AV_AddtionalIMS":Applications[i][j].display = "1";break;
						case "AV_AddtionalH248":Applications[i][j].display = "1";break;
						case "AV_Digitalmap": Applications[i][j].display = "1";break;
						case "AV_DigitalmapH248":Applications[i][j].display = "1";break;
						case "AV_Fax": Applications[i][j].display = "1";break;
						/* App_IGMP */
						case "AI_Muticast": Applications[i][j].display = "1";break;
						/* App_Application */
						case "AA_Dowanload": Applications[i][j].display = "1";break;
						/* Mng_User */
						case "MU_User": Applications[i][j].display = "1";break;
						/*MU_Useradmin*/
						case "MU_Useradmin": Applications[i][j].display = "0";break;
						/* Mng_Device */
						case "MD_Device": Applications[i][j].display = "1";break;
						case "USB_Backup": 
							if(usbnumstr == "0")
							{
								Applications[i][j].display = "0";
							}else
							{
								Applications[i][j].display = "1";
							}
						break;
						/* Mng_Log */
						case "ML_Check": Applications[i][j].display = "1";break;
						case "ML_Setting": Applications[i][j].display = "1";break;
						/* MU_upgrade */
						case "MU_upgrade": Applications[i][j].display = "1";break;
						/* Mng_Maintain */
						case "MM_Maintain": Applications[i][j].display = "1";break;
						/* Dia_Diagnose */
						case "DD_Ping": Applications[i][j].display = "1";break;
						case "DD_Tracert": Applications[i][j].display = "1";break;
						case "DD_Inform": Applications[i][j].display = "1";break;
						/* Dia_Busdiagnose */
						case "DB_diagnose": Applications[i][j].display = "1";break;
						/* Help_Help */
						case "HH_Help": Applications[i][j].display = "1";break;
						default:break;
					}
				}
				
			}
			/* 页面内容 pan div 控制 */		
			for(var i in Panels)
			{
				/* pannel - 页面块显示控制 */
				for(var j=0;j<Panels[i].length;j++){
					switch(Panels[i][j].name)
					{
						case "Title_pon": Panels[i][j].display = "1";break;
						case "Title_wifi": 
						if(wlannumstr == "0")
						{
							Panels[i][j].display = "0";
						}else
						{
							Panels[i][j].display = "1";
						}
						break;
						default:break;
					}
					/* tag - 单个元素行控制 */
					for(var k=0;k<Panels[i][j].tags.length;k++)
					{
						switch(Panels[i][j].tags[k].name)
						{
						case "tips": Panels[i][j].tags[k].display = "1";break;
					
						case "MDdevice_infocontext": 
						if(usbnumstr == "0")
						{
						Panels[i][j].tags[k].display = "0";
						}else
						{
						Panels[i][j].tags[k].display = "1";	
						}
						break;
						case "RecEnable_checkbox": 
						if(usbnumstr == "0")
						{
						Panels[i][j].tags[k].display = "0";
						}else
						{
						Panels[i][j].tags[k].display = "1";	
						}
						break;
						case "Usbsubarea_select": 
						if(usbnumstr == "0")
						{
						Panels[i][j].tags[k].display = "0";
						}else
						{
						Panels[i][j].tags[k].display = "1";	
						}
						break;
						case "MDdevice_button": 
						if(usbnumstr == "0")
						{
						Panels[i][j].tags[k].display = "0";
						}else
						{
						Panels[i][j].tags[k].display = "0";	
						}
						break;
						case "usbEquipment_select": 
						if(usbnumstr == "0")
						{
						Panels[i][j].tags[k].display = "0";
						}else
						{
						Panels[i][j].tags[k].display = "0";	
						}
						break;
						case "ssid_port": 
							if(wlannumstr == "0")
							{
								Panels[i][j].tags[k].display = "0";
							}else
							{
								Panels[i][j].tags[k].display = "1";
							}
						break;
						case "LanAddressRange_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanPC_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanSTB_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanPhone_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanCamera_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "LanDHCP_Submask_text": Panels[i][j].tags[k].display = "0";break;
						case "LanLeaseTime_select": Panels[i][j].tags[k].display = "1";break;
						//case "LanAddressRange6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanPC6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanSTB6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanPhone6_checkbox": Panels[i][j].tags[k].display = "0";break;
						//case "LanCamera6_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "Table_pon1_Networklinks_list": Panels[i][j].tags[k].display = "1";break;
						case "Table_pon1_Networklinks_userlist": Panels[i][j].tags[k].display = "0";break;
						case "Table_pon5_Performance_list": Panels[i][j].tags[k].display = "1";break;
						case "Table_pon5_Performance_userlist": Panels[i][j].tags[k].display = "0";break;
						case "Table_pon5_Performance_userlist_hubei": Panels[i][j].tags[k].display = "0";break;
						case "FirewallEnable_checkbox": Panels[i][j].tags[k].display = "0";break;
						case "DTIMPeriod_text": Panels[i][j].tags[k].display = "0";break;
						case "BeaconPeriod_text": Panels[i][j].tags[k].display = "0";break;
						case "RTSLimit_text": Panels[i][j].tags[k].display = "0";break;
						case "FragLimit_text": Panels[i][j].tags[k].display = "0";break;
						case "PrinterInfo": Panels[i][j].tags[k].display = "0";break;
						case "ssidindex_select": Panels[i][j].tags[k].display = "0";break;
						default:break;
						}
					}
				}
			}	
		}
	return true;	
}