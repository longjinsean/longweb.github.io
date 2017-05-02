var initDebug = function(){
	var debug_panel = new Element('DIV:df_debug_panel');	
	debug_panel.entity.style.left = '0px';
	debug_panel.entity.style.top = '0px';
	//debug title
	var title = new Element('DIV:df_debug_title');
	title.html('nc Debug');
	title.entity.onmousedown = function(e){$.Drag($.Debug.entity,e);};
	title.entity.onmouseup = function(){document.onmousemove = function(){return false;};};
	title.entity.ondblclick = function(){
		var con = $.Debug.context.entity;
		if(con.style.display == 'block'){
			con.style.display = 'none';		
		}else{
			con.style.display = 'block';		
		}
	}
	//browser_version
	var browser_version = new Element('DIV:df_debug_v_num');
	browser_version.html('<strong>'+$.BrowserVersion+'</strong>'+' : '+navigator.userAgent);
	var error = new Element('DIV:df_debug_err');
	var dl = new Element('DL');	
	var dt = new Element('DT');
	dt.html('<strong>debug error:</strong>');
	var dd = new Element('dd');
	dl.push(dt,dd);
	error.push(dl);
	error.dt = dt;
	error.dd = dd;
	//debug control
	var control = new Element('DIV:df_debug_control');
	//debug context
	var context = new Element('DIV:df_debug_context');
	context.entity.style.display = 'block';
	var tab_h_map = ['Module','Application','Panel','Tag'];
	var info_tab = new Element('TABLE:df_debug_tab');
	info_tab.entity.setAttribute('cellspacing',0);
	info_tab.entity.setAttribute('cellpadding',0);
	var head = new Element('THEAD'); 
	var row = new Element('TR');
	for(var i=0;i<tab_h_map.length;i++){
		var c = new Element('TD');	
		c.entity.style.width = (i<2)?'15%':'35%';
		c.html(tab_h_map[i]);
		row.append(c);
	}
	head.append(row);
	var body = new Element('TBODY');
	var row = new Element('TR');
	for(var i=0;i<tab_h_map.length;i++){
		var c = new Element('TD');	
		c.entity.style.background = '#f3f3f3';
		c.entity.style.color = '#3963B9';
		c.setID(tab_h_map[i]);
		row.append(c);
	}
	body.append(row);
	info_tab.push(head,body);
	info_tab.head = head;
	info_tab.body = body;
	context.push(info_tab);

	debug_panel.push(title,browser_version,error,control,context);
	debug_panel.title = title;
	debug_panel.error = error;
	debug_panel.context = context;
	debug_panel.tab = info_tab;
	$.Debug = debug_panel;
	$.Debug.tab.getInfo = function(p,t){
		ID('Module').innerHTML = $.CurrentModule;
		ID('Application').innerHTML = $.CurrentApp;
		var pan = $.Modules[$.CurrentModule].Apps[$.CurrentModule].Pans;
		if(p){
			ID('Panel').innerHTML = pan.name;
		}else{
			ID('Panel').innerHTML = '--';
		}
		if(t){
			ID('Tag').innerHTML = 'name:' + t.name;
		}else{
			ID('Tag').innerHTML = '--';
		}
	} 
	$.Debug.tab.addRow = function(name){
			
	} 
	$.Debug.showErr = function(msg){
		this.error.dd.html(msg);
	}
	document.body.appendChild(debug_panel.entity);
}

var debugData = {
//add after
	'lanportnum':"4",
	'wlannum':"1",
  /*状态》状态总览》状态总览*/
	'device_base_list':[{devicetype:'3',companyname:'nc',devicemodel:'epon-lixixi',devicenumber:'v521-11.1.1',hwversion:'v0001.0',softwareversion:'nc.gpon.0.0',deviceinfo:'160223'}],
	'pon_info_list':[{lineprotocol:'4',connectstatus:'1',connecttime:'200',Txpower:'40',Rxpower:'50'}],
	'reg_info_list':[{Table_reg1_1_logicID_table:'12345',Table_reg2_1_OLTCertified_table:'2',Table_reg3_1_Manage_table:'2'}],
	'wan_info_list':[{servertype:'4',ipprotocol:'1',connectmode:'1',usableport:'31',connectname:'1_INTERNET_R_VID_999',serveronline:'online',wanstatus:'1'},{servertype:'5',ipprotocol:'1',connectmode:'2',usableport:'8',connectname:'1_INTERNET_R_VID_999',serveronline:'offline',wanstatus:'1'}],
  'wifi_info_list':[{Table_wifi1_1_name_table:'ChinaNet-0001',Table_wifi2_1_Key_table:'0123456789',Table_wifi3_1_status_table:'enable',Table_wifi4_1_mode_table:'enable',Table_wifi5_1_admin_table:'无线配置向导'}],
  'lan_info_list':[{Table_lan1_1_port_table:'0',Table_lan1_2_Equipment_tabl:'1',Table_lan1_3_mac_table:'80:48:A5:08:19:56'},{Table_lan1_1_port_table:'1',Table_lan1_2_Equipment_tabl:'2',Table_lan1_3_mac_table:'80:48:A5:08:19:56'},{Table_lan1_1_port_table:'2',Table_lan1_2_Equipment_tabl:'3',Table_lan1_3_mac_table:'80:48:A5:08:19:56'},{Table_lan1_1_port_table:'3',Table_lan1_2_Equipment_tabl:'4',Table_lan1_3_mac_table:'80:48:A5:08:19:56'}],
	/*状态》状态总览》配置向导*/
	'Wizard_wan_1_label':"2_INTERNET_R_VID_46",
	'Means_access':"1",
	'Wizard_wan_1_text':"telecomadmin",
	'Wizard_wan_1_password':"nE7jA%5m",
	'Wizard_checkbox02_checkbox':"1",
	'Wizard_text02_text':"123456",
	'Wizard_password02_password':"123456",
	'Wizardselect_select':"2",
	'iTV_Label':"3",
	'SmartTV_label':"8",
	'Wizard_checkbox04_checkbox':"1",
	'Wizard_password04_01_text':"123456",
	'Wizard_password04_02_password':"1234567",
	'Wizard_password04_03_password':"1234567",
	'Wizard_wanname':[{wan_name:'1_INTERNET_R_VID_999'},{wan_name:'2_INTERNET_R_VID_46'}],
	'Wizard_itv':[{itv_name:'1'},{itv_name:'2'},{itv_name:'3'},{itv_name:'4'}],
	/*状态》网络侧信息》IP连接信息*/
	'ipv4_stat_list':[{Table_wan_ipv4_1_1_info_table:'1_INTERNET_R_VID_999',Table_wan_ipv4_1_2_enable_table:'0',Table_wan_ipv4_1_3_linkstatus_table:'0',Table_wan_ipv4_1_4_AddressMode_table:'1',Table_wan_ipv4_1_5_IP_table:'172.16.11.195',Table_wan_ipv4_1_6_SubnetMask_table:'255.255.255.0',Table_wan_ipv4_1_7_Gateway_table:'172.16.11.1',Table_wan_ipv4_1_8_PrimaryDNS_table:',,',Table_wan_ipv4_1_9_AlternateDNS_table:',,'}],
	'ipv6_stat_list':[{Table_wan_ipv6_1_1_info_table:'1_INTERNET_R_VID_999',Table_wan_ipv6_1_2_enable_table:'0',Table_wan_ipv6_1_3_linkstatus_table:'0',Table_wan_ipv6_1_4_PrefixMode_table:'1',Table_wan_ipv6_1_5_Prefix_table:'',Table_wan_ipv6_1_6_IPmode_table:'3',Table_wan_ipv6_1_7_IP_table:'172.16.11.1',Table_wan_ipv6_1_8_PrimaryDNS_table:'172.16.11.1',Table_wan_ipv6_1_9_AlternateDNS_table:''}],
	'ipv4_Statistics_list':[{wanname_ipv4:'1_INTERNET_R_VID_999',Uplink_v4:'396771.5',Downlink_v4:'107432.2'},{wanname_ipv4:'3_TR069_R_VID_46',Uplink_v4:'0.0',Downlink_v4:'1705.6'}],
	'ipv6_Statistics_list':[{wanname_ipv6:'1_INTERNET_R_VID_999',Uplink_v6:'396771.5',Downlink_v6:'107432.2'},{wanname_ipv6:'3_TR069_R_VID_46',Uplink_v6:'0.0',Downlink_v6:'1705.6'}],
	/*状态》网络侧信息》链路连接信息*/
	'Table_pon1_Networklinks_list':[{Table_pon2_1_ponlink_table:'1',Table_pon3_1_FECAbility_table:'1',Table_pon4_1_FECstatus_table:'1'}],
	'Table_pon5_Performance_list':[{Table_pon6_1_EmployerNum_table:'0',Table_pon7_1_ReceiveNum_table:'0',Table_pon8_1_ReceiveByte_table:'0',Table_pon9_1_SendByte_table:'0',Table_pon10_1_TXpower_table:'-40 (dBm)',Table_pon11_1_RXpower_table:'-40 (dBm)',Table_pon12_1_Voltage_table:'3.187 (V)',Table_pon13_1_Electric_table:'9.700 (mA)',Table_pon14_1_Temperature_table:'34.902 (℃)',alarmmessage:'无告警'}],
	/*状态》用户侧信息》无线接口信息*/
	'wlan_stat_list':[{ssidindex:'1',ssidname:'ChinaNet-weixi',Rxbytes:'',Rxframe:'',Txbytes:'',Txframe:''},{ssidindex:'2',ssidname:'ChinaNet-0001',Rxbytes:'',Rxframe:'',Txbytes:'',Txframe:''}],
	'wlanssid_stat_list':[{Table_wlanssid_1_1_Index_table:'1',Table_wlanssid_1_2_name_table:'ChinaNet-0001',Table_wlanssid_1_3_SecurityConfig_table:'开启',Table_wlanssid_1_4_AuthenticationMode_table:'wpapskwpa2psk',Table_wlanssid_1_5_EncryptionMode_table:'tkipaes'}],
	'wlaninfo_stat_list':[{Title_wlaninfo3_1_linkstatus_table:'开启',Title_wlaninfo4_1_Channel_table:'自动'}],
	/*状态》用户侧信息》以太网接口信息*/
	'landhcp_stat_list':[{Table_landhcp_1_IP_table:'192.168.6.2',Table_landhcp_2_MAC_table:'F0:4D:A2:F0:03:B5',Table_landhcp_3_DeviceType_table:'0',Table_landhcp_4_port_table:'0',Table_landhcp_5_LeaseTime_table:'123',Table_landhcp_6_name_table:'name1'},{Table_landhcp_1_IP_table:'192.168.6.2',Table_landhcp_2_MAC_table:'F0:4D:A2:F0:03:B5',Table_landhcp_3_DeviceType_table:'0',Table_landhcp_4_port_table:'0',Table_landhcp_5_LeaseTime_table:'123',Table_landhcp_6_name_table:'name2'}],
	'laninterface_stat_list':[{Table_laninterface_1_1_Port_table:'0',Table_laninterface_2_2_Mode_table:'1',Table_laninterface_2_3_speed_table:'1',Table_laninterface_2_4_link_table:'1',Table_laninterface_2_5_typenum_table:'0',Table_laninterface_2_6_Frames_table:'0',Table_laninterface_2_7_typenum_table:'0',Table_laninterface_2_8_Frames_table:'0'}],
	/*状态》用户侧信息》USB接口信息*/
	'usb_satus_tip':[{Table_usb_1_table:'0'},{Table_usb_1_table:'1'}],
	/*状态》语音信息》语音信息*/
	'voice_satus_list':[{Table_voice_1_1_number_table:'1',Table_voice_1_2_name_table:'user',Table_voice_1_3_status_table:'0',Table_voice_1_4_wrong_table:'0'}],
	/*状态》ITMS远程管理》交互建立*/
	'utr069_satus_list':[{Table_itms_1_Report_table:'1',Table_itms_2_link_table:'1'}],
	/*状态》ITMS远程管理》业务配置下发状态*/
	'service_set_satus_list':[{Table_service_state_1_table:'1'}],
	/*状态》智能应用管理》智能网关连接状态*/
	'Distribution_link_satus':"正在尝试连接189cube.com",
	'Distribution_Register_satus':"未连接",
	'Distribution_Widget_satus':"未连接",
	/* 网络 - 网络设置 - 网络连接 */
	'wan_link_list':[
	{indexid:'1',indexid1:'2',indexid2:'3',wanenable:'0',tdaucWanName:'1_TR069_VOICE_R_VID_46',tducIPMode:'1',td8021p:'1',tducAddressingType:'1',tdconnectiontype:'2',tdulBindPort:'8',td_ucLanInterfaceDHCPEnable:'1',tducNATEnabled:'1',tducServiceList:'7',web_vlan_mode:'2',tdvlanid:'111',wan802enabled_checkbox:'1',tdulMulticastVlan:'112',tducDscpEnable:'1',tducDscpValue:'55',tdulMaxMTUSize:'56',tdaucUsername:'useradmin',tdaucPassword:'123456',tducExternalIPAddress:'192.168.2.36',tdaucSubnetMask:'255.255.255.0',tducProxyEnable:'1',tdAuthtype:'3',Dialingmode_select:'1',Timeout_text:'90',tdaucDefaultGateway:'192.168.2.56',tdaucDNSServers:'192.168.6.1,192.168.6.2,192.168.6.3',tducIPv6AddressOrigin:'3',tdaucIPv6Address:'fe::80',tducGetwayAchieve:'0',td_aucDefaultIPv6Gateway:'fe::81',tducDNSAchieve:'1',tdaucIPv6DNSServers:'fe::83,fe::84,fe::85',tducDsliteEnable:'1',tducAftrMode:'0',tdaucAftr:'fe::00',td_IPv6PrefixDelegationEnabled:'1',tdaucIPv6Prefix:'3333'},
	{indexid:'1',indexid1:'2',indexid2:'3',wanenable:'0',tdaucWanName:'1_TR069_R_VID_46',tducIPMode:'1',td8021p:'1',tducAddressingType:'2',tdconnectiontype:'1',tdulBindPort:'8',td_ucLanInterfaceDHCPEnable:'1',tducNATEnabled:'1',tducServiceList:'7',web_vlan_mode:'2',tdvlanid:'111',wan802enabled_checkbox:'1',Option60enabled_checkbox:'1',tdoption60id:'600314STB',tdulMulticastVlan:'112',tducDscpEnable:'1',tducDscpValue:'55',tdulMaxMTUSize:'56',tdaucUsername:'useradmin',tdaucPassword:'123456',tducExternalIPAddress:'192.168.2.36',tdaucSubnetMask:'255.255.255.0',tducProxyEnable:'1',tdAuthtype:'3',Dialingmode_select:'1',Timeout_text:'90',tdaucDefaultGateway:'192.168.2.56',tdaucDNSServers:'192.168.6.1,192.168.6.2,192.168.6.3',tducIPv6AddressOrigin:'3',tdaucIPv6Address:'fe::80',tducGetwayAchieve:'0',td_aucDefaultIPv6Gateway:'fe::81',tducDNSAchieve:'1',tdaucIPv6DNSServers:'fe::83,fe::84,fe::85',tducDsliteEnable:'1',tducAftrMode:'0',tdaucAftr:'fe::00',td_IPv6PrefixDelegationEnabled:'1',tdaucIPv6Prefix:'3333'},
	{indexid:'1',indexid1:'3',indexid2:'3',wanenable:'1',tdaucWanName:'1_TR069_VOICE_R_VID_999',tducIPMode:'2',td8021p:'2',tducAddressingType:'1',tdconnectiontype:'1',tdulBindPort:'7',td_ucLanInterfaceDHCPEnable:'1',tducNATEnabled:'1',tducServiceList:'5',web_vlan_mode:'0',tdvlanid:'111',wan802enabled_checkbox:'0',tdulMulticastVlan:'112',tducDscpEnable:'1',tducDscpValue:'55',tdulMaxMTUSize:'56',tdaucUsername:'useradmin',tdaucPassword:'123456',tducExternalIPAddress:'192.168.2.36',tdaucSubnetMask:'255.255.255.0',tducProxyEnable:'1',tdAuthtype:'3',Dialingmode_select:'1',Timeout_text:'90',tdaucDefaultGateway:'192.168.2.56',tdaucDNSServers:'192.168.6.1,192.168.6.2,192.168.6.3',tducIPv6AddressOrigin:'3',tdaucIPv6Address:'fe::80',tducGetwayAchieve:'0',td_aucDefaultIPv6Gateway:'fe::81',tducDNSAchieve:'1',tdaucIPv6DNSServers:'fe::83,fe::84,fe::85',tducDsliteEnable:'1',tducAftrMode:'0',tdaucAftr:'fe::00',td_IPv6PrefixDelegationEnabled:'1',tdaucIPv6Prefix:'3333'},
	{indexid:'1',indexid1:'1',indexid2:'1',wanenable:'1',tdaucWanName:'1_TR069_VOICE_R_VID_123',tducIPMode:'3',td8021p:'5',tducAddressingType:'1',tdconnectiontype:'1',tdulBindPort:'31',td_ucLanInterfaceDHCPEnable:'1',tducNATEnabled:'1',tducServiceList:'3',web_vlan_mode:'2',tdvlanid:'111',wan802enabled_checkbox:'1',tdulMulticastVlan:'112',tducDscpEnable:'1',tducDscpValue:'55',tdulMaxMTUSize:'56',tdaucUsername:'useradmin',tdaucPassword:'123456',tducExternalIPAddress:'192.168.2.36',tdaucSubnetMask:'255.255.255.0',tducProxyEnable:'1',tdAuthtype:'3',Dialingmode_select:'1',Timeout_text:'90',tdaucDefaultGateway:'192.168.2.56',tdaucDNSServers:'192.168.6.1,192.168.6.2,192.168.6.3',tducIPv6AddressOrigin:'3',tdaucIPv6Address:'fe::80',tducGetwayAchieve:'0',td_aucDefaultIPv6Gateway:'fe::81',tducDNSAchieve:'1',tdaucIPv6DNSServers:'fe::83,fe::84,fe::85',tducDsliteEnable:'1',tducAftrMode:'0',tdaucAftr:'fe::00',td_IPv6PrefixDelegationEnabled:'1',tdaucIPv6Prefix:'3333'}],
	/* 网络 - 网络设置 - vlan绑定 */
	'vlan_connect_list':[{VLANPort:'0x01',Connectmode:'1',Connectport:'1/100,2/100'},{VLANPort:'0x02',Connectmode:'0',Connectport:'1/100,2/100'},{VLANPort:'0x04',Connectmode:'1',Connectport:'1/100,2/100'},{VLANPort:'0x08',Connectmode:'0',Connectport:'1/100,2/100'},{VLANPort:'0x10',Connectmode:'1',Connectport:'1/100,2/100'},{VLANPort:'0x20',Connectmode:'0',Connectport:'1/100,2/100'},{VLANPort:'0x40',Connectmode:'1',Connectport:'1/100,2/100'},{VLANPort:'0x80',Connectmode:'0',Connectport:'1/100,2/100'}],
	'con_mode':['0','1'],

	/* 网络 - 用户侧管理 - IPV4设置 */
	'LanIP_Address_text':"192.168.6.1",
	'LanSubmask_text'		:"255.255.255.0",
	'Lan_DHCP_checkbox' :"1",
	'LanStartAddress_text':"192.168.6.1",
	'LanEndAddress_text'  :"192.168.6.199",
	'LanDHCP_Submask_text':"255.255.255.0",
	'LanLeaseTime_select':"3600",
	'LanAddressRange_checkbox':"1",
	'LanPC_checkbox':"1",
	'LanPC_StartAddress_text':"192.168.6.1",
	'LanPC_EndAddress_text':"192.168.6.10",
	'LanSTB_checkbox'      :"1",
	'LanSTB_StartAddress_text':"192.168.6.11",
	'LanSTB_EndAddress_text':"192.168.6.20",
	'LanPhone_checkbox':"1",
	'LanPhone_StartAddress_text':"192.168.6.21",
	'LanPhone_EndAddress_text':"192.168.6.30",
	'LanCamera_checkbox':"1",
	'LanCamera_StartAddress_text':"192.168.6.31",
	'LanCamera_EndAddress_text':"192.168.6.40",
	'lanipv4_address_list':[{iptype:'PC',ipstart:'192.168.6.1',ipend:'192.168.6.10'},{iptype:'STB',ipstart:'192.168.6.20',ipend:'192.168.6.30'},{iptype:'Phone',ipstart:'192.168.6.40',ipend:'192.168.6.50'},{iptype:'Camera',ipstart:'192.168.6.60',ipend:'192.168.6.70'}],

	/* 网络 - 用户侧管理 - IPV6设置 */
	'ManagerAddress_text'      :"fe80::1",
	'LanDNS_select'            :"2",
	'LanDNS_Interface_select'	 :"2",
	//'Lan_DNS_text'				   :"fe80::1,fe80::100",
	'LanPri_DNS_text'          :"fe80::1,fe80::100",
	'LanSec_DNS_text'          :"fe80::1,fe80::100",
	'LanDHCPv6_checkbox'			 :"1",
	'LanPrefix_select'				 :"WANDelegated",
	'LanPrefix_text'					 :"123",
	'LanInterface_select'			 :"2",
	'LanStartAddress6_text'		 :"0000:0000:0000:0001",
	'LanEndAddress6_text'			 :"0000:0000:0000:0100",
	'circular_route_checkbox'  :"1",
	'LanAddressInfo_checkbox'	 :"0",
	'LanOtherInfo_checkbox'		 :"0",
	//'LanMaxRA_text'					   :"600",
	//'LanMinRA_text'					   :"200",
	'LanAddressRange6_checkbox':"1",
	'LanPC6_checkbox':"1",
	'LanPC_StartAddress6_text':"0000:0000:0000:0011",
	'LanPC_EndAddress6_text':"0000:0000:0000:0020",
	'LanSTB6_checkbox'      :"1",
	'LanSTB_StartAddress6_text':"0000:0000:0000:0021",
	'LanSTB_EndAddress6_text':"0000:0000:0000:0030",
	'LanPhone6_checkbox':"1",
	'LanPhone_StartAddress6_text':"0000:0000:0000:0031",
	'LanPhone_EndAddress6_text':"0000:0000:0000:0040",
	'LanCamera6_checkbox':"1",
	'LanCamera_StartAddress6_text':"0000:0000:0000:0041",
	'LanCamera_EndAddress6_text':"0000:0000:0000:0050",
  'Interface1_list':['1','2','3'],
  'Interface2_list':['1','2','3'],
  'ipv6wan_list1':[{wan_name:'1_TR069_VOICE_R_VID_46'},{wan_name:'1_TR069_VOICE_R_VID_47'},{wan_name:'1_TR069_VOICE_R_VID_48'}],
  'ipv6wan_list2':[{wan_name:'1_TR069_VOICE_R_VID_46'},{wan_name:'1_TR069_VOICE_R_VID_47'},{wan_name:'1_TR069_VOICE_R_VID_48'}],
	/*网络 - 用户侧管理 - 家庭网络命名 */
	'Domain_text':"liuxm",
	'domain_info_list':[{domainindex:'1',domainname:'nc',ipaddr:'192.168.3.2',domainmac:'00:E0:4C:1C:CE:00',devicetype:'0'},{domainindex:'2',domainname:'nc2',ipaddr:'192.168.3.2',domainmac:'00:E0:4C:1C:CE:1C',devicetype:'1'}],
	/* 网络 - 无线设置 - 无线基本设置 */
	'Bus_Switch_radio':"0",
	'wifi_basic_list':[{ssidindex_select:'1',wlanenable:'1',Broadcastssid_checkbox:'1',Multi_media_checkbox:'1',wlanssid:'ChinaNet-0001',WlanAuthMode_select:'2',WlanPwdMode_select:'2',WlanWepPwd_select:'2',WlanKeyBit_select:'1',CurrKeyindex_select:'1',WPSMode_select:'1',WAPPreShared_text:'1ili',WPARangrefreshtime_text:'3660',RASIUAserveradd_text:'1',RASIUSServerport_text:'1',RADIUSSharekey_text:'1',KeyOne_text:'1',KeyTwo_text:'1',KeyThree_text:'1',KeyFour_text:'1',LocalPIN_text:'1',ClientPIN_text:'1'},{ssidindex_select:'2',wlanenable:'0',Broadcastssid_checkbox:'0',Multi_media_checkbox:'1',wlanssid:'ChinaNet-0002',WlanAuthMode_select:'2',WlanPwdMode_select:'2',WlanWepPwd_select:'2',WlanKeyBit_select:'1',CurrKeyindex_select:'1',WPSMode_select:'1',WAPPreShared_text:'1ili',WPARangrefreshtime_text:'3660',RASIUAserveradd_text:'1',RASIUSServerport_text:'1',RADIUSSharekey_text:'1',KeyOne_text:'1',KeyTwo_text:'1',KeyThree_text:'1',KeyFour_text:'1',LocalPIN_text:'1',ClientPIN_text:'1'},{ssidindex_select:'3',wlanenable:'0',Broadcastssid_checkbox:'1',Multi_media_checkbox:'1',wlanssid:'ChinaNet-0003',WlanAuthMode_select:'2',WlanPwdMode_select:'2',WlanWepPwd_select:'2',WlanKeyBit_select:'1',CurrKeyindex_select:'1',WPSMode_select:'1',WAPPreShared_text:'1ili',WPARangrefreshtime_text:'3660',RASIUAserveradd_text:'1',RASIUSServerport_text:'1',RADIUSSharekey_text:'1',KeyOne_text:'1',KeyTwo_text:'1',KeyThree_text:'1',KeyFour_text:'1',LocalPIN_text:'1',ClientPIN_text:'1'},{ssidindex_select:'4',wlanenable:'0',Broadcastssid_checkbox:'1',Multi_media_checkbox:'1',wlanssid:'ChinaNet-0004',WlanAuthMode_select:'2',WlanPwdMode_select:'2',WlanWepPwd_select:'2',WlanKeyBit_select:'1',CurrKeyindex_select:'1',WPSMode_select:'1',WAPPreShared_text:'1ili',WPARangrefreshtime_text:'3660',RASIUAserveradd_text:'1',RASIUSServerport_text:'1',RADIUSSharekey_text:'1',KeyOne_text:'1',KeyTwo_text:'1',KeyThree_text:'1',KeyFour_text:'1',LocalPIN_text:'1',ClientPIN_text:'1'}],

	/* 网络 - 无线设置 - 无线高级设置 */
	'WlanHide_checkbox':"1",
	'WlanChannel_select':"1",
	'WlanPlace_select'  :"8",
	'WlanBandWidth_select':"2",
	'WlanInterval_select':"1",
	'WlanTransmit_select':"2",
	
	'DTIMPeriod_text':"2sss",
	'BeaconPeriod_text':"2ss",
	'RTSLimit_text':"2ddd",
	'FragLimit_text':"2ppp",
	'NWAdvancedsave':"2lll",
	/* 网络 - 远程管理 - ITMS服务器 */
	'Tr69Inform_checkbox':"1",
	'Informinter_text':"43200",
	'Acsurl_text':"http://192.168.100.1:7547/ACS",
	'AcsUserName_text':"ACS",
	'AcsPassWord_password':"1234",
	'ConnReqName_text':"1234",
	'ConnReqPassWord_password':"5678",
	'Middleware_select':"1",
	'MldAddr_text':"0.0.0.1",
	'MldPort_text':"0",
	
	/* 网络 - 远程管理 - 逻辑ID认证*/
	'onuSN_text':"",
	'LoidId_text':"lvgang",
	'Loidpwd_checkbox':"1",
	'Pwd_password':"lvgang",
	'OLT_Registration_Status':"注册成功",
	'itms_Certification_Status':"认证成功",
	/* 网络 - QoS设置 - 基本设置 */
	'QoSEnable_checkbox':"1",
	'Template_Index':"TR069,VOIP,IPTV,INTERNET",
	'Upstream_bandwidth':"11111",
	'QoSPlan_select':"1",
	'DSCPMarkEnable_checkbox':"1",
	'PMarkType_select':"1",
	'queue_info_list':[{queueindex:'1',queueenable:'false',queuepro:'1',weight:'1',CarWeight:'10'},{queueindex:'2',queueenable:'false',queuepro:'2',weight:'1',CarWeight:'11'},{queueindex:'3',queueenable:'true',queuepro:'3',weight:'1',CarWeight:'12'},{queueindex:'4',queueenable:'true',queuepro:'4',weight:'1',CarWeight:'13'},{queueindex:'5',queueenable:'false',queuepro:'5',weight:'1',CarWeight:'14'},{queueindex:'6',queueenable:'false',queuepro:'6',weight:'1',CarWeight:'15'},{queueindex:'7',queueenable:'true',queuepro:'7',weight:'1',CarWeight:'16'},{queueindex:'8',queueenable:'true',queuepro:'8',weight:'1',CarWeight:'17'}],
	/* 网络 - QoS设置 - 分类设置 */
	'NQAdvanced_list':[{data_number:'1',mark_8021p:'3',mark_dscp:'10',mark_tc:'10',queuesel:'1'},{data_number:'2',mark_8021p:'4',mark_dscp:'20',mark_tc:'30',queuesel:'3'},{data_number:'3',mark_8021p:'3',mark_dscp:'10',mark_tc:'10',queuesel:'1'},{data_number:'4',mark_8021p:'3',mark_dscp:'10',mark_tc:'10',queuesel:'1'},{data_number:'5',mark_8021p:'3',mark_dscp:'10',mark_tc:'10',queuesel:'1'},{data_number:'6',mark_8021p:'3',mark_dscp:'10',mark_tc:'10',queuesel:'1'},{data_number:'7',mark_8021p:'7',mark_dscp:'10',mark_tc:'10',queuesel:'1'}],
	/* 网络 - QoS设置 - 分类类型设置 */
	'Categoryset_list':[{typeIndex:'1',data_number:'2',dataProtocol:'14',dataClassification:'1',datamin:'10',datamax:'20'},{typeIndex:'2',data_number:'2',dataProtocol:'2',dataClassification:'2',datamin:'10',datamax:'20'}],
	'data_numberlist':['1','2'],
	/* 网络 - QoS设置 - APP业务 */
	'AppBusiness_list':[{businessname:'TR069',queuename:'1'},{businessname:'VOIP',queuename:'4'}],
	/* 网络 - QoS设置 - 入口限速 */
	'EntranceSpeedup_select':"1",
	'web_aucUpLanLimit':"LAN1/1，SSID1/2",
	'web_aucUpVlanLimit':"LAN1/1，SSID1/3",
	'web_aucUpIpLimit':"LAN1/1，SSID1/4",
	'EntranceSpeeddown_select':"2",
	'web_aucDownLanLimit':"85/1，3001/4",
	'web_aucDownVlanLimit':"LAN1/1，SSID1/5",
	'web_aucDownIpLimit':"LAN1/1，SSID1/6",
	/* 网络 - 时间管理 - 时间服务器 */
	'currentsystime':"Wed Aug 19 07:06:47 2015",
	'NtpEnable_checkbox':"1",
	'NtpType_select':"1",
	'ui_timezone':"8",
	'NtpInterval_text':"86400",
	'fstserver1':"clock.via.net",
	'fstserver2':"other",
	'fstserver3':"clock.nyc.he.net",
	'fstserver4':"clock.sjc.he.net",
	'fstserver5':"other",
	/*网络 - 路由设置 - 路由设置*/
	'static_route_list':[{indexid:'1',interface:'1_TR069_VOICE_R_VID_46',destip:'192.168.2.53',destmask:'255.255.255.0',gatewayip:'192.168.2.1'},{indexid:'2',interface:'2_TR069_VOICE_R_VID_47',destip:'192.168.2.54',destmask:'255.255.255.0',gatewayip:'192.168.2.2'},{indexid:'3',interface:'3_TR069_VOICE_R_VID_48',destip:'192.168.2.55',destmask:'255.255.255.0',gatewayip:'192.168.2.8'},{indexid:'4',interface:'4_TR069_VOICE_R_VID_49',destip:'192.168.2.56',destmask:'255.255.255.0',gatewayip:'192.168.2.9'},{indexid:'5',interface:'5_TR069_VOICE_R_VID_50',destip:'192.168.2.57',destmask:'255.255.255.0',gatewayip:'192.168.2.50'}],
	'wan_connectname':[{wan_name:'1_TR069_VOICE_R_VID_46'},{wan_name:'2_TR069_VOICE_R_VID_47'},{wan_name:'3_TR069_VOICE_R_VID_48'},{wan_name:'4_TR069_VOICE_R_VID_49'},{wan_name:'5_TR069_VOICE_R_VID_50'}],
	/*网络 - 用户数限制 - 用户数限制*/
	'UsersLimit_select':"1",
	'UsersLimit_text':"13",
	/* 安全 - 广域网访问 - 广域网访问 */
	'URL_filter_enable_checkbox':"1",
	'ExcludeMode_select':"1",
	'SeW_list':[{indexid:'1',URLAddress:'www.baidu.com'},{indexid:'2',URLAddress:'www.w3cschool.com'},{indexid:'3',URLAddress:'www.baiduyun.com'}],
	/* 安全 - 防火墙 - 防火墙 */
	'FirewallEnable_checkbox':"1",
	'Firewalllevel_select':"1",
  'DosEnable_checkbox':"1",
	/* 安全 - MAC过滤 - MAC过滤 */
	'MAC_filter_enable_checkbox':"1",
	'ExcludeMode_mac_select':"1",
	'MAC_list':[{indexid:'1',MACAddress:'11:22:33:44:55:66'},{indexid:'2',MACAddress:'AA:BB:CC:DD:EE:FF'},{indexid:'3',MACAddress:'12:13:14:15:16:17'}],
	/* 安全 - 端口过滤 - 端口过滤 */
	'port_filter_enable_checkbox':"1",
	'portMode_select':"1",
	'port_list':[{indexid:'1',protocolsel:'2',lanipfilter_start:'192.168.6.2',lanipfilter_end:'192.168.1.5',lanportfilter_start:'192.168.6.3',lanportfilter_end:'192.168.2.6',wanipfilter_start:'192.168.6.2',wanipfilter_end:'192.168.1.5',wanportfilter_start:'192.168.6.3',wanportfilter_end:'192.168.2.6'}],
	/* 应用 - DDNS设置 - DDNS设置 */
	'DDNSCfgEnabled_Value':"1",
	'ServicePort_text':"123",
	'DDNSUsername_text':"telecomadmin",
	'DDNSPassword_password':"123456789",
	'DDNSWANInterface_select':"2_TR069_VOICE_R_VID_999",
	'DDNSDomainName_text':"111",
	'DDNSHostName_text':"222",
	'ddnswan_list':[{wan_name:'1_TR069_VOICE_R_VID_46'},{wan_name:'2_TR069_VOICE_R_VID_999'}],
	/* 应用 - 高级NAT设置 - ALG设置 */
	'H323Enable_checkbox':"1",
	'RTSPEnable_checkbox':"1",
	'L2TPEnable_checkbox':"1",
	'IPSECEnable_checkbox':"1",
	'SIPEnable_checkbox':"1",
	'FTPEnable_checkbox':"1",
	'PPTPEnable_checkbox':"1",
	/* 应用 - 高级NAT设置 - DMZ设置 */
	'DMZenable_checkbox':"1",
	'DMZwan_select':"2_TR069_VOICE_R_VID_999",
	'DMZ_text':"192.168.6.1",
	'DMZwan_list':[{wan_name:'1_TR069_VOICE_R_VID_46'},{wan_name:'2_TR069_VOICE_R_VID_999'}],
	/* 应用 - 高级NAT设置 - 虚拟服务器设置 */
	'static_VirtualServer_list':[{indexid0:'1',indexid:'1',WANselect:'1_TR069_VOICE_R_VID_46',ExternalPort:'1',PortMappingProtocol:'1',InternalClient:'192.168.2.1',InternalPort:'1'},{indexid0:'1',indexid:'2',WANselect:'2_TR069_VOICE_R_VID_47',ExternalPort:'2',PortMappingProtocol:'2',InternalClient:'192.168.2.1',InternalPort:'2'},{indexid0:'1',indexid:'3',WANselect:'3_TR069_VOICE_R_VID_48',ExternalPort:'3',PortMappingProtocol:'1',InternalClient:'192.168.2.1',InternalPort:'3'},{indexid0:'1',indexid:'4',WANselect:'4_TR069_VOICE_R_VID_49',ExternalPort:'4',PortMappingProtocol:'1',InternalClient:'192.168.2.1',InternalPort:'4'},{indexid0:'1',indexid:'4',WANselect:'5_TR069_VOICE_R_VID_50',ExternalPort:'5',PortMappingProtocol:'1',InternalClient:'192.168.2.1',InternalPort:'5'}],
	'Virtualwan_list':[{wan_name:'1_TR069_VOICE_R_VID_46'},{wan_name:'2_TR069_VOICE_R_VID_47'},{wan_name:'3_TR069_VOICE_R_VID_48'},{wan_name:'4_TR069_VOICE_R_VID_49'},{wan_name:'5_TR069_VOICE_R_VID_50'}],
	/* 应用 - upnp设置 - upnp设置 */
	'UPnPEnable_checkbox':"1",
	/*协议切换 - 语音协议*/
	'ServerType_select':"2",
	'protocolchangesupport':"1",
	/* 应用 - 宽带电话设置 - 基本设置 */
	'ProxyServer_text':"192.168.6.1",
	'ProxyServerPort_text':"65535",
	'RegistrarServer_text':"192.168.6.2",
	'RegistrarServerPort_text':"65535",
	'OutboundProxy_text':"192.168.6.3",
	'OutboundProxyPort_text':"65535",
	'StandbyProxyServer_text':"192.168.6.4",
	'StandbyProxyServerPort_text':"65535",
	'StandbyRegistrarServer_text':"192.168.6.5",
	'StandbyRegistrarServerPort_text':"65535",
	'StandbyOutboundProxy_text':"192.168.6.6",
	'StandbyOutboundProxyPort_text':"65535",
	'sipuser_info_list':[{lineid:'1',phonenumber:'13599367523',authusername:'nc',authpassword:'666666',fxsportenable:'1',linestatus:'noregister'},{lineid:'2',phonenumber:'13599367525',authusername:'nc2',authpassword:'888888',fxsportenable:'0',linestatus:'noregister'}],
	/* 应用 - 宽带电话设置 - 基本设置(h248) */
	'MediaGatewayPort_text':"65535",
	'MediaGatewayControler_text':"192.168.1.1",
	'MediaGatewayControlerPort_text':"65535",
	'StandbyMediaGatewayControler_text':"192.168.1.1",
	'StandbyMediaGatewayControlerPort_text':"65535",
	'DeviceIDType_select':"2",
	'DeviceID_text':"",
	'MessageEncodingType_select':"",
	'Physicalset_select':"1",
	'PhysicalTermIDPrefix_text':"",
	'PhysicalTermIDStart_text':"",
	'PhysicalTermIDAddLen_text':"",
	'RTPPrefix_text':"",
	'EphemeralTermIDStart_text':"",
	'EphemeralTermIDAddLen_text':"",
	'h248user_info_list':[{lineid:'1',physicaltermID:'123',enable:'1',linestatus:'noregister'},{lineid:'2',physicaltermID:'123',enable:'1',linestatus:'noregister'}],
	/* 应用 - 宽带电话设置 - 高级设置(sip/ims)*/
  'URIType_select':"0",
  'DTMFMethod_select':"1",
  'SipLocalPort_text':"65535",
  'SipDSCPMark_text':"30",
  'RtpDSCPMark_text':"30",
  'RegisterExpires_text':"3",
  'RegisterRetryInterval_text':"",
  'SessionExpires_text':"",
  'RtpPortStart_text':"",
  'RtpPortEnd_text':"",
  'PRACKEnable_checkbox':"1",
  'BootDeRegisterEnable_checkbox':"1",
  'FlashMin_text':"",
  'FlashMax_text':"",
  'VadCngEnable_checkbox':"1",
  'RingVoltage_text':"",
	'sipuser_advanced_list':[{siplineid:'1',dsprxgain:'0',dsptxgain:'2',echocancele:'1'},{siplineid:'2',dsprxgain:'-12',dsptxgain:'6',echocancele:'1'}],
	'sipuser_encode_list':[{encodeenable:'1',encodename:'1',rtppakinterval:'20',encodepriority:'1'},{encodeenable:'1',encodename:'2',rtppakinterval:'20',encodepriority:'2'},{encodeenable:'1',encodename:'3',rtppakinterval:'20',encodepriority:'3'},{encodeenable:'1',encodename:'4',rtppakinterval:'20',encodepriority:'4'}],
	/* 应用 - 宽带电话设置 - 高级设置(h248)*/
	'DTMFMethod_h248_select':"0",
	'RtpPortStart_h248_text':"30",
	'RtpPortEnd_h248_text':"60",
	'FlashMin_h248_text':"10",
	'FlashMax_h248_text':"20",
	'VadCngEnable_h248_checkbox':"1",
	'RingVoltage_h248_text':"",
	'h248user_advanced_list':[{h248lineid:'1',dsprxgain:'0',dsptxgain:'2',echocancele:'1'},{h248lineid:'2',dsprxgain:'-12',dsptxgain:'6',echocancele:'1'}],
	'h248user_encode_list':[{encodeenable:'1',encodename:'1',rtppakinterval:'20',encodepriority:'1'},{encodeenable:'1',encodename:'2',rtppakinterval:'20',encodepriority:'2'},{encodeenable:'1',encodename:'3',rtppakinterval:'20',encodepriority:'3'},{encodeenable:'1',encodename:'4',rtppakinterval:'20',encodepriority:'4'}],
	/* 应用 - 宽带电话设置 - 补充业务设置(sip)*/
	'sipTimeSyncMode_select':"1",
	'sipCaller_ID_switch':"1",
	'sipCallIDShowMode_select':"0",
	'sipLine_configuration_list':[{lineid:'1',PolarityReverseEnable:'1',HotLineEnable:'1',HotLineDelay:'5',HotLineURI:'123456789',Three_calling:'1',CallWaitingEnable:'1'},{lineid:'2',PolarityReverseEnable:'1',HotLineEnable:'1',HotLineDelay:'5',HotLineURI:'123456789',Three_calling:'1',CallWaitingEnable:'1'}],
	/* 应用 - 宽带电话设置 - 补充业务设置(ims)*/
	'TimeSyncMode_select':"1",
	'Caller_ID_switch':"1",
	'CallIDShowMode_select':"0",
	'Service_subscription':"1",
	'imsLine_configuration_list':[{lineid:'1',PolarityReverseEnable:'1',HotLineEnable:'1',HotLineDelay:'5',HotLineURI:'123456789',CallWaitingEnable:'1',ConferenceCallway:'0',ConferenceCallURI:'4001000'},{lineid:'2',PolarityReverseEnable:'1',HotLineEnable:'1',HotLineDelay:'5',HotLineURI:'123456789',CallWaitingEnable:'1',ConferenceCallway:'0',ConferenceCallURI:'4001000'}],
	/* 应用 - 宽带电话设置 - 补充业务设置(h248)*/
	'HeartbeatMode_select':"1",
	'HeartbeatCycle_text':"80",
	'HeartbeatCount_text':"80",
	'Caller_switch':"1",
	'CallIDShowModeh248_select':"1",
	/* 应用 - 宽带电话设置 - 拨号设置*/
	'DigitMapEnable_checkbox':"1",
	'DigitMap_textarea':"12345",
	'DigitMapMode_select':"1",
	'TWaitTime_select':"1",
	'DotWaitTime_select':"0",
	'OutNumberContainImmediateDialKey_select':"0",
	'StartDialingTimer_text':"10",
	'LongTimerValue_text':"15",
	'ShortTimerValue_text':"5",
	/* 应用 - 宽带电话设置 - 拨号设置(h248)*/
	'StartDigitTimer_text':"15",
	'LongTimerValueH248_text':"10",
	'ShortTimerValueH248_text':"5",
	'remindersTimerValue_text':"60",
	'busyTimerValue_text':"40",
	'callTimerValue_text':"60",
	/* 应用 - 宽带电话设置 - 传真设置*/
	'FaxMode_select':"1",
	'T30NegotiateMode_select':"1",
	/* 应用 - IGMP设置 - 组播设置*/
	'IGMPSnooping_checkbox':"1",
	'IGMPProxy_checkbox':"0",
	'MLDSnooping_checkbox':"",
	'MLDProxy_checkbox':"",
	'InterfaceSelect_select':"1_TR069_VOICE_R_VID_46",
	'MulticastSettings_text':"1",
	'igmpwan_list':[{wan_name:'1_TR069_VOICE_R_VID_46'},{wan_name:'2_TR069_VOICE_R_VID_999'}],
	/* 应用 - 日常应用 - 远程下载*/	
	'DownloadTransports_Value_select':"FTP",
	'ServerUrl_text':"",
	'ServerPort_text':"",
	'HiddenName_checkbox':"1",
	'DowanloadUserName_text':"useradmin",
	'UserPass_password':"nE7jA%5m",
	'DownloadFilePath_text':"",
	'usbEquipment_select':"USB1",
	'SaveAsPath_text':"",
	'DownloadState_text':"",
	'RFMode_select':'2',
	'downloadwan_list':[{usb_name:'USB1'},{usb_name:'USB2'}],
	'usb_connected_list':[{Table_usb_1_table:'1'},{Table_usb_1_table:'2'}],
	'app_download_list':[{usb_name:'USB1',usb_name1:'test',usb_name2:'USB1',usb_name3:'/s',usb_name4:'USB1',usb_name5:'USB1',usb_name6:'USB1',usb_name7:'USB1',usb_name8:'USB1'}],
	/* 管理 - 用户管理 - 用户管理telecomadmin*/
	'PwdNew_password':"123456789",
	'PwdCfm_password':"1234567890",
	/* 管理 - 用户管理 - 用户管理useradmin*/
	'Pwdold_password':"123456789",
	'Pwdnewn_password':"1234567890",
	/* 管理 - 设备管理 - 设备管理*/
	'rapid_recover_enable':"1",
	'part_select_val':"2",
	'usbshare_checkbox':"1",
	'usb_connected_list':[{Table_usb_1_table:'1'},{Table_usb_1_table:'2'}],
	//'usb_connected_list':[],
	/* 管理 - 日志文件管理 - 日志查看*/
	'Title_log_enable_label':"日志已开启。",
	'Title_access_log_label2':"TEWA;",
	'Title_access_log_label3':"TEWA-300AIGM;",
	'Title_access_log_label4':"8048A56A8318048A5081955;",
	'Title_access_log_label5':"192.168.1.1;",
	'Title_access_log_label6':"V1.0;",
	'Title_access_log_label7':"Tianyi_V1.0;",
	'MLcheck_result_list':[{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'ifNetType=lan;ifAccessType=Ethernet;ifNumber=1;Addedtraffic=268117;upspeed=0;downspeed=0;'},{deta:'2015-06-05',level:'error',message:'ifNetType=lan;ifAccessType=Ethernet;ifNumber=1;Addedtraffic=268117;upspeed=0;downspeed=0;'},{deta:'2015-06-05',level:'error',message:'ifNetType=lan;ifAccessType=Ethernet;ifNumber=1;Addedtraffic=268117;upspeed=0;downspeed=0;'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'},{deta:'2015-06-05',level:'error',message:'帐号:telecomadmin; IP地址:192.168.6.2; 动作:登入'}],
	/* 管理 - 日志文件管理 - 日志设置*/
	'LogEnable_checkbox':"1",
	'LevelLog_select':"3",
	'LevelDisplay_select':"3",
	/* 诊断 - 网络诊断 - ping测试*/
	'Ping_interface_select':"none",
	'Ping_ip_version_select':"IPv4",
	'Ping_host_text':"www.baidu.com",
	'Ping_repetition_Number_text':"5",
	'Ping_result':"loading...",
	'ping_wan_name_list':[{wan_name:'1_INTERNET_R_VID_99',wan_name_value:'wan_99'},{wan_name:'1_INTERNET_R_VID_999',wan_name_value:'wan_999'}],
	/* 诊断 - 网络诊断 - Tracert测试*/
	'Tracert_interface_select':"none",
	'Tracert_ip_version_select':"IPv4",
	'Tracert_host_text':"www.baidu.com",
	'Tracert_repetition_Number_text':"5",
	'Tracert_result':"loading...",
	'ping_wan_name_list':[{wan_name:'1_INTERNET_R_VID_99'},{wan_name:'1_INTERNET_R_VID_999'}],
	/* 诊断 - 业务诊断 - 语言诊断*/
	'linenum':"10086",
	'linediagnose_list':[{usernumber:'1',Out_voltage:'',Ring_impedance:''}],
	
	
	
	
	
	
	'default_flag':"0",
	'language':"13",
	'wakeup_ip':'192.168.1.1',
	'wakeup_port':'80',
	'wakeup_mac':'08:10:11:78:30:cc',

	"reboot_enable":'0',
	"reboot_hour":'3',
	"reboot_min":'30',
	
	"time_type":'1',
	"time_date":'2008',
	"time_date2":'12',
	"time_date3":'08',

	"time_time":'23',
	"time_time2":'60',
	"time_time3":'60',

	'opmode':'1',
//status
	'version_num':'NW604',
	'version':'netis(NW719)-V1.3.22035,2013.05.23,10:43',
	'ip':'192.168.1.6',
	'mask':'255.255.255.0',
	'gw':'192.168.1.1',
	'connected':'1',
	'link_status':'0',
	'run_time':'0.7.57.34',
	'cpu':'1%',
	'mem':'15%',
	'con_time':'10.1.12.2',
	'active_num':'4',
//host
    'lan_all':'2',
    'lan_online':'2',
    'lan_num':'3',
    'lan_require':'0/0',
    'lan_speed':'0/0',
    'lan_byte':'0/0',
//wps
	'wps_enable':'1',
	'pin':'01234567',
//wan_set
	
	'l2tp_user':'l2tp_user',
	'l2tp_pwd':'l2tp_pwd',
	'pptp_user':'pptp_user',
	'pptp_pwd':'pptp_pwd',
	'server_ip_name':'servername',
	'l2tp_type':'0',
	'l2tp_ip':'192.168.2.2',
	'l2tp_mask':'255.255.255.0',
	'l2tp_gw':'192.168.2.1',
	'pptp_type':'1',
	'pptp_ip':'192.168.2.2',
	'pptp_mask':'255.255.255.0',
	'pptp_gw':'192.168.2.1',
	'second_in_type':'0',
	'second_ip':"10.0.0.12",
	'second_mask':'255.255.0.0',

	'access_mode':'0', //接入方式
	'chip_flag':'1',
	'conntype':'0',
	'xk_os_version':'2',
	'xk_version':'6',
	'wt_version':'2',
	'ip_username':'guest',
	'ip_pwd':'guest',
	'ip_server_ip':'10.0.0.1',
	'ip_server_gw':'10.0.1.1',
	'host_name':'nc',
	'work_mode':'1',
	'wan_ip':'172.16.65.103',
	'wan_mask':'255.255.255.0',
	'wan_gw':'172.16.65.1',
	'dhcp_ip':'0.0.0.0',
	'dhcp_mask':'0.0.0.0',
	'dhcp_gw':'0.0.0.0',
	'dhcp_mtu':'1500',
	'dns_a':'10.0.0.1',
	'dns_b':'0.0.0.0',
	'special_access':'0',
	'pppoe_username':'pppoe_user',
	'pppoe_pwd':'123',
	'ppp_connect_mode':'0',
	'pppoe_service_name':'servername',
	'pppoe_ac_name':'acname',
	'ppp_time':'5',
	'l2tp_time':'5',
	'pptp_time':'5',
	'ns_ver':'1',
//lan_set
	'lan_mac':'08:10:11:78:cc:cc',
	'lan_ip':'192.168.1.1',
	'lan_mask':'255.255.255.0',
//mac_clone
	'mac_clone':'00:1c:c0:b0:1e:39',
	'mac_default':'08:10:11:78:30:c9',
//interface_set
	'wan':'3',
	'lan1':'2',
	'lan2':'3',
	'lan3':'0',
	'lan4':'1',

	'igmp_enable':'0',
	'work_mode':'0',

//wireless 
	'wl_power':'0',
	'wl_config':'3',
	'remote_ap_name':'remote_ap_name',
	'remote_ap_mac':'08:10:17:81:96:11',
	'sec_set':'1',		//安全设置	
	'ap_repeater':'0',
	'repeater_enable':'0',
	//sec_ap0
	'wl_enable':'1',	//无线状态
	'ssid':'nc',
	'wl_stand':'7',		//无线标准
	'net_mode':'0',		//网络模式
	'net_type':'0',		//网络类型
	'wl_mac':'08:10:17:81:96:c1',
	'wl_mac_def':'08:10:17:81:96:c1',
	'ssid_broad':'0',		//ssid广播
	'channel_width':'1',	//频段带宽
	'channel_bind':'1',		//频道绑定
	'region':'1',
	'channel':'6',
	'real_channel':'0',
	'sec_contr':'0',
	'con_mac':'',

	'wds_sec_mode':'0',		//安全模式-wds
	'wds_key_mode_wep':'1',
	'wds_key_mode_wpa':'1',
	'wds_key_wep':'wep_password',
	'wds_key_wpa':'wpa_password',
	'sec_mode':'0',			//安全模式
	'key_size':'0',			//密钥长度
	'key_type':'3',			//加密类型
	'key_mode_wep':'1',			//密钥格式
	'key_mode_wpa':'1',			//密钥格式
	'key_wep':'wep_password',	//密钥
	'key_wpa':'wpa_password',	//密钥
	'key_time':'86400',		//更新周期
	'repeater_ssid':'repeater_ssid',
	'repeater_mac':'08:10:11:78:30:00',

	//sec_ap1
	'ap1_wl_enable':'0',	
	'ap1_ssid':'netis_VAP1',
	'ap1_wl_stand':'0',	
	'ap1_net_mode':'2',		
	'ap1_net_type':'1',		
	'ap1_wl_mac':'08:10:17:81:aa:a1',
	'ap1_ssioad':'1',
	'ap1_channel_width':'1',	
	'ap1_channel_bind':'0',	
	'ap1_region':'1',
	'ap1_channel':'3',
	'ap1_sec_contr':'0',
	'ap1_con_mac':'',

	'ap1_wds_sec_mode':'1',	
	'ap1_wds_key_mode_wep':'1',
	'ap1_wds_key_mode_wpa':'1',
	'ap1_wds_key_wep':'wep_password',
	'ap1_wds_key_wpa':'wpa_password',
	'ap1_sec_mode':'0',	
	'ap1_key_size':'1',		
	'ap1_key_type':'1',	
	'ap1_key_mode_wep':'1',		
	'ap1_key_mode_wpa':'1',		
	'ap1_key_wep':'wep_password_ap1',	
	'ap1_key_wpa':'wpa_password_ap1',	
	'ap1_key_time':'864',		
	'ap1_repeater_ssid':'repeater_ssid',

	//sec_ap2
	'ap2_wl_enable':'0',	
	'ap2_ssid':'netis_VAP2',
	'ap2_wl_stand':'0',	
	'ap2_net_mode':'2',		
	'ap2_net_type':'1',		
	'ap2_wl_mac':'08:10:17:81:aa:a2',
	'ap2_ssid_broad':'1',
	'ap2_channel_width':'1',	
	'ap2_channel_bind':'0',	
	'ap2_region':'1',
	'ap2_channel':'3',
	'ap2_sec_contr':'0',
	'ap2_con_mac':'',

	'ap2_wds_sec_mode':'1',	
	'ap2_wds_key_mode_wep':'1',
	'ap2_wds_key_mode_wpa':'1',
	'ap2_wds_key_wep':'wep_password',
	'ap2_wds_key_wpa':'wpa_password',
	'ap2_sec_mode':'1',	
	'ap2_key_size':'1',		
	'ap2_key_type':'1',	
	'ap2_key_mode_wep':'1',		
	'ap2_key_mode_wpa':'1',		
	'ap2_key_wep':'wep_password_ap2',	
	'ap2_key_wpa':'wpa_password_ap2',	
	'ap2_key_time':'864',		
	'ap2_repeater_ssid':'repeater_ssid',

	//sec_ap3
	'ap3_wl_enable':'0',	
	'ap3_ssid':'netis_VAP3',
	'ap3_wl_stand':'0',	
	'ap3_net_mode':'2',		
	'ap3_net_type':'1',		
	'ap3_wl_mac':'08:10:17:81:aa:a3',
	'ap3_ssid_broad':'1',
	'ap3_channel_width':'1',	
	'ap3_channel_bind':'0',	
	'ap3_region':'1',
	'ap3_channel':'3',
	'ap3_sec_contr':'0',
	'ap3_con_mac':'',

	'ap3_wds_sec_mode':'1',	
	'ap3_wds_key_mode_wep':'1',
	'ap3_wds_key_mode_wpa':'1',
	'ap3_wds_key_wep':'wep_password',
	'ap3_wds_key_wpa':'wpa_password',
	'ap3_sec_mode':'0',	
	'ap3_key_size':'1',		
	'ap3_key_type':'1',	
	'ap3_key_mode_wep':'1',		
	'ap3_key_mode_wpa':'1',		
	'ap3_key_wep':'wep_password_ap3',	
	'ap3_key_wpa':'wpa_password_ap3',	
	'ap3_key_time':'864',		
	'ap3_repeater_ssid':'repeater_ssid',

	//client
	'cl_sec_mode':'2',			//安全模式
	'cl_key_size':'0',			//密钥长度
	'cl_key_type':'3',			//加密类型
	'cl_key_mode_wep':'1',			//密钥格式
	'cl_key_mode_wpa':'1',			//密钥格式
	'cl_key_wep':'wep_password',	//密钥
	'cl_key_wpa':'wpa_password',	//密钥
	'cl_key_time':'86400',		//更新周期

	
	//reapter 
	'rp_wl_enable':'0',	
	'rp_ssid':'nc_rp',
	'rp_wl_stand':'10',	
	'rp_net_mode':'2',	
	'rp_net_type':'1',	
	'rp_wl_mac':'08:10:17:81:96:rr',
	'rp_ssid_broad':'0',
	'rp_channel_width':'1',	
	'rp_channel_bind':'0',	
	'rp_region':'1',
	'rp_channel':'9',
	'rp_sec_contr':'0',
	'rp_con_mac':'',

	'rp_wds_sec_mode':'1',
	'rp_wds_key_mode_wep':'1',
	'rp_wds_key_mode_wpa':'1',
	'rp_wds_key_wep':'wep_password',
	'rp_wds_key_wpa':'wpa_password',
	'rp_sec_mode':'1',	
	'rp_key_size':'0',
	'rp_key_type':'3',	
	'rp_key_mode_wep':'1',	
	'rp_key_mode_wpa':'1',	
	'rp_key_wep':'wep_password_rp',
	'rp_key_wpa':'wpa_password_rp',
	'rp_key_time':'8640',
	'rp_repeater_ssid':'repeater_ssid',

	'wds_enable':'0',
//wl_mac_filter
	'wl_mac_filter_enable':'0',
	'wl_mac_filter_rule':'0',
//advance
	'roam':'1',
	'isolotion':'1',
	'shortGi':'1',
	'wmm':'0',
	'protection':'0',
	'out_power':'0',


	'auth_type':'1',
	'beacon':'100',
	'rts':'2347',
	'agg_status':'1',
	'fragment':'2346',
	'rate_mode':'2',
	'preamble':'0',
	'wlan_partition':'1',
	'iapp':'1',


//dhcp
	'dhcp_enable':'1',
	'udhcpc_info':'4',
	'dhcp_start_ip':'192.168.0.6',
	'dhcp_end_ip':'192.168.1.2',
	'dhcp_time':'86400',
//dmz
	'dmz_enable':'0',
	'dmz_ip':'192.168.1.12',
	'super_dmz_enable':'1',
	'super_dmz_addr':'00:1c:c0:b0:1e:39',
	'wan_link_host':'00:1c:c0:b0:1e:40',

	'upnp_enable':'1',
	'ftp_enable':'0',
	'ftp_port':'21',
//vpn
	'ipsec_enable':'1',
	'l2tp_enable':'1',
	'pptp_enable':'1',

	'remote_enable':'0',
	'remote_port':'80',
	'web_port':'80',
//manage
	'ip_filter_enable':'0',
	'ip_filter_rule':'0',
	'mac_filter_enable':'0',
	'mac_filter_rule':'0',
	'dns_filter_enable':'0',
	'dns_filter_rule':'0',
//qos
	'qos_enable':'0',
	'qos_up_rule':'0',
	'qos_up_speed':'111',
	'qos_down_rule':'0',
	'qos_down_speed':'222',
	'qos_rule_up':'up',
	'qos_rule_down':'down',
	'qos_speed_up':'123',
	'qos_speed_down':'456',
//ddns
	'ddns_enable':'1',
	'ddns_sp':'1',
	'ddns_port':'666',
	'ddns_username':'ddns.cn-soft',
	'ddns_password':'ddns',
	'ddns_change_name':'meibu',
	'ddns_hostname':'no',
	'ddns_info':['DDNS_STATE_AUTH_OK','www.fucking.com'],
	//'ddns_info':'DDNS_ERR_CONNECTING',
	//'ddns_info':'DDNS_ERR_OK,ST,www.oray.com',
	//'ddns_info':'DDNS_ERR_OK,www.meibu.com',
//misc
	'time_now':'05/28/2012 18:27:46',
	'timezone':'-8 1',
	'old_user':'guest',
	'old_pwd':'',
	'pc_mac':'00:00:00:00:00:00',
//attack_defense
    'ping_wan':'0',
    'ping_lan':'0',
	'icmp_flood':'0',
	'icmp_flood_v':'22',
	'tcp_flood':'1',
	'tcp_flood_v':'33',
	'udp_flood':'1',
	'udp_flood_v':'44',

//con_limit
    'con_limit_num':'1024',
    'con_limit_all':'30', 
//wol
    'wakeup_ip' :'192.168.1.3',
    'wakeup_port':'8888',
    'wakeup_mac':'12:23:43:ff:dc:e3',
//diag
    'p_output':'jfsjasjfasljfasklklsa',
    'p_running':'0',
    't_output':'jkjjjjjjjjjjjjj',
    't_running':'0',

	'tools_type':'0',
	'tools_ip_url':'192.168.1.1',
	'tools_cmd':'0',
	'tools_count':'4',
	'tools_pkt_size':'64',
	'tools_timeout':'123',
	'tools_ttl':'11',
	'tools_results':"PING 192.168.1.1 (192.168.1.1): 56 data bytes;64 bytes from 192.168.1.1: icmp_seq=0 ttl=255 time=0.0 ms;64 bytes from 192.168.1.1: icmp_seq=1 ttl=255 time=0.0 ms;64 bytes from 192.168.1.1: icmp_seq=2 ttl=255 time=0.0 ms;64 bytes from 192.168.1.1: icmp_seq=3 ttl=255 time=0.0 ms;;--- 192.168.1.1 ping statistics ---;4 packets transmitted, 4 packets received, 0% packet loss;round-trip min/avg/max = 0.0/0.0/0.0 ms;",

    "test":[{'id':'1','type':'test','ip':'192.168.1.12','mac':'00:1c:c0:11:11:11','other':'iiiiiii'},{'id':'2','type':'test2','ip':'192.168.2.22','mac':'00:1c:c0:22:22:22','other':'22222'}],
	//'interface_tab':[{iface:'WAN',iface_mode:'0',st:'连接',sp:'100M',sg:'全双工'},{iface:'LAN1',iface_mode:'1',st:'连接',sp:'100M',sg:'全双工'},{iface:'LAN2',iface_mode:'2',st:'连接',sp:'100M',sg:'全双工'},{iface:'LAN3',iface_mode:'3',st:'连接',sp:'100M',sg:'全双工'},{iface:'LAN4',iface_mode:'0',st:'连接',sp:'100M',sg:'全双工'}],
	'interface_list':[{iface:'WAN',iface_mode:'0',st:'连接',sp:'100M',sg:'全双工'}],
	'statistics_list':[{type:'LAN',rx_pack:'598',rx_byte:'1776',tx_pack:'75',tx_byte:'333'},{type:'WAN',rx_pack:'598',rx_byte:'1776',tx_pack:'75',tx_byte:'333'},{type:'WLAN',rx_pack:'598',rx_byte:'1776',tx_pack:'75',tx_byte:'333'}],
	'host_monitor_list001':[{id:'1',lan_ip:'192.168.1.12',lan_name:'lauai',lan_con:'2',up_speed:'200',down_speed:'200',up_byte:'2000',down_byte:'2000'}],
	'wps_list':[{secmode:"无",type:'',mode:'',key:''}],
	'wl_mac_filter_list':[{id:'1',mac_des:"macs",macaddr:'00:1c:c0:b0:1e:34'},{id:'2',mac_des:"mas",macaddr:'00:1c:c0:b0:1e:33'}],
	'reservation_list':[{id:'1',reserve_des:'des1',reserve_ip:'192.168.1.12',reserve_mac:'12:23:43:ff:dc:e4',xx:'safsafa'},{id:'2',reserve_des:'ds2',reserve_ip:'192.168.3.33',reserve_mac:'00:1c:c0:b0:1e:66',xx:'s111111'}],
	//'wol_list':[{id:'1',wol_status:'1',wol_des:'wol',wol_rule:'Enable',wol_mac:'30:1c:c0:b0:1e:33',wol_host:'status'}],
	'wl_wds_list':[{id:'1',wds_name:'wds',wds_mac:'00:1c:c0:b0:1e:33'},{id:'2',wds_name:'wds',wds_mac:'00:1c:c0:b0:1e:32'}],
	'wl_link_ap0_list':[{id:'1',host:'lauai',mac:'00:1c:c0:b0:1e:55',mode:'WEP',tx_pack:'1157',rx_pack:'1311',speed:'123',ps_mode:'Yes',link_time:'60'}],
	'wl_link_ap1_list':[{id:'1',host:'lauai',mac:'00:1c:c0:b0:1e:55',mode:'WEP',tx_pack:'1157',rx_pack:'1311',speed:'123',ps_mode:'Yes',link_time:'60'}],
	'dhcp_client_list':[{id:'1',ip:'192.168.1.3',mac:'00:1c:c0:b0:1e:66',host:'LAUAI-9C082B5D4',reserved:'Dynamic',status:'0'},{id:'2',ip:'192.168.33.3',mac:'00:1c:c0:b0:1e:66',host:'yyyy',reserved:'Static',status:'0'},{id:'3',ip:'192.168.7.7',mac:'00:1c:c0:b0:1e:77',host:'xxx',reserved:'Dynamic',status:'0'}],
	'dhcp_static_list':[{id:'1',mac:'00:1c:c0:b0:1e:77',ip:'192.168.1.12'}],
	'virtual_server_list':[{id:'1',vir_name:'name',vir_ip:'192.168.1.11',vir_proto:'2',vir_outport_start:'20',vir_outport_end:'30',vir_inport_start:'23',vir_inport_end:'24'},{id:'2',vir_name:'name2',vir_ip:'192.168.1.22',vir_proto:'1',vir_outport_start:'31',vir_outport_end:'33',vir_inport_start:'41',vir_inport_end:'41'}],
	'app_port_list':[{id:'1',app_name:'GuruGuru',trigger_proto:'1',app_port_start:'31200',app_port_end:'31200',forward_proto:'1',forward_port_start:'9292',forward_port_end:'9292'},{id:'2',app_name:'Sxx',trigger_proto:'2',app_port_start:'200',app_port_end:'300',forward_proto:'2',forward_port_start:'92',forward_port_end:'94'}],
	'ip_filter_list':[{id:'1',ip_describe:'ip',ip_status:'1',ip_rule:'0',ip_src_sele:'sub_host',ip_src_start:'192.168.1.1',ip_src_end:'192.168.1.254',ip_des_sele:'all',ip_des_start:'1.0.0.1',ip_des_end:'223.255.255.254',ip_proto:'1',ip_port_start:'33',ip_port_end:'44',ip_day:'Sun Mon Tue Wed Thu Fri Sat',ip_time:'11:30-20:30'},{id:'2',ip_describe:'ip2',ip_status:'0',ip_rule:'1',ip_src_sele:'ip_host',ip_src_start:'192.168.1.11',ip_src_end:'192.168.1.13',ip_des_sele:'all',ip_des_start:'192.168.1.11',ip_des_end:'192.168.1.14',ip_proto:'4',ip_port_start:'',ip_port_end:'',ip_day:'Sun Mon Tue Wed Thu Fri Sat',ip_time:'11:30-20:30'},{id:'3',ip_describe:'ip3',ip_status:'1',ip_rule:'0',ip_src_sele:'sub_host',ip_src_start:'192.168.1.1',ip_src_end:'192.168.1.254',ip_des_sele:'all',ip_des_start:'1.0.0.1',ip_des_end:'223.255.255.254',ip_proto:'3',ip_port_start:'33',ip_port_end:'44',ip_day:'Sun Mon Tue Wed Thu Fri Sat',ip_time:'all'}],
	'mac_filter_list':[{id:'1',mac_describe:'macs1',mac_status:'1',mac_rule:'0',mac_filter:'00:1c:c0:b0:1e:35',mac_day:'Mon',mac_time:'10:30-11:30'},{id:'2',mac_describe:'macs2',mac_status:'1',mac_rule:'1',mac_filter:'00:1c:c0:b0:1e:35',mac_day:'Sun Fri Sat Wed',mac_time:'all'},{id:'3',mac_describe:'macs3',mac_status:'1',mac_rule:'1',mac_filter:'00:1c:c0:b0:1e:35',mac_day:'Sun Fri Sat',mac_time:'all'}],
	'dns_filter_list':[{id:'1',dns_des:'domain',dns_st:'st',dns_rule:'1',dns_key:'key',dns_day:'all',dns_time:'all'},{id:'2',dns_des:'domain',dns_st:'st',dns_rule:'1',dns_key:'key',dns_day:'Mon',dns_time:'09:30-11:30'}],
	'port_filter_list':[{id:'1',describe:'port',st:'st',rule:'rule',pro:'TCP',port:'88',day:'all',time:'all'}],
	'binds_list':[{id:'1',binds_des:'binds1',binds_ip:'192.168.1.12',binds_mac:'00:1c:c0:b0:1e:22',binds_port:'0'},{id:'2',binds_des:'binds2',binds_ip:'192.168.1.11',binds_mac:'00:1c:c0:b0:1e:11',binds_port:'1'}],
	'arp_list':[{id:'1',arp_ip:'192.168.1.111',arp_mac:'00:1c:11:11:11:11',arp_st:'0x2'},{id:'2',arp_ip:'192.168.2.222',arp_mac:'00:1c:22:22:22:22',arp_st:'0x2'}],
	'static_routing_list':[{id:'1',route_des:'route',route_type:'HOST',ip_value:'192.168.1.12',mask_value:'255.255.255.255',gateway_value:'192.168.1.1'},{id:'2',route_des:'routes',route_type:'NET',ip_value:'192.168.1.11',mask_value:'255.255.255.0',gateway_value:'192.168.1.0'}],
	'qos_rule_list':[{id:'1',qos_des:'qos',qos_status:'0',qos_ip_start:'192.168.1.4',qos_ip_end:'192.168.1.5',qos_min_up:'0',qos_max_up:'22',qos_min_down:'33',qos_max_down:'44',qos_sele:'sub_host'},{id:'2',qos_des:'qos2',qos_status:'1',qos_ip_start:'192.168.1.6',qos_ip_end:'192.168.1.8',qos_min_up:'1',qos_max_up:'2',qos_min_down:'3',qos_max_down:'4',qos_sele:'ip_host'}],
	//'sys_log':[{id:'1',time:'no',info:'no'}],
	//'sys_log':[{"time":"2010-12-1 0:1:41","event":"LOG_SYSTEM_EVENT_LOGIN","action":"1","msg":["192.168.1.2"]},{"time":"2010-12-1 0:1:29","event":"LOG_SYSTEM_EVENT_LOGIN","action":"1","msg":["192.168.1.2"]},{"time":"2010-12-1 0:1:24","event":"LOG_SYSTEM_EVENT_LOGIN","action":"2","msg":["192.168.1.2"]},{"time":"2010-12-1 0:1:17","event":"LOG_SYSTEM_EVENT_LOGIN","action":"2","msg":["192.168.1.2"]},{"time":"2010-12-1 0:1:11","event":"LOG_SYSTEM_EVENT_LOGIN","action":"2","msg":["192.168.1.2"]},{"time":"2010-12-1 0:0:0","event":"LOG_SYSTEM_EVENT_STARTUP","action":"1","msg":[]}],
	'sys_log':[{'id':'1','log':'0,CONNECTION,2013-05-04 04:20:41,udhcpc,42,id=1:,["dhcp_send_discover"]'},{'id':'2','log':'0,CONNECTION,2013-05-04 04:20:43,udhcpc,7,id=1:,["dhcp_send_discover_no_respone"]'},{'id':'3','log':'0,CONNECTION,2013-05-04 04:21:55,udhcpc,42,id=1:,["dhcp_send_discover"]'}],
	'connect_log':[{id:'1',time:'no',info:'no'}],
	'attack_log_list':[{id:'1',time:'no',info:'no'},{id:'2',time:'12356',info:'155'}],
	'limit_connect_list':[{id:'1',con_limit_start:'192.168.1.3',con_limit_end:'192.168.1.5',con_limit_one:'0',con_limit_seg:'20'},{id:'2',con_limit_start:'192.168.1.7',con_limit_end:'192.168.1.8',con_limit_one:'10',con_limit_seg:'40'}],
	'ap_scan_list':[{id:'1',wl_ss_ssid:'ssid',wl_ss_bssid:'00:1c:c0:b0:1e:11',wl_ss_channel:'6 (B)',wl_ss_mode:'AP',wl_ss_secmo:'WEP',wl_ss_sin:'sig',wl_ss_type:'--'},{id:'2',wl_ss_ssid:'ssid2',wl_ss_bssid:'00:1c:c0:b0:1e:22',wl_ss_channel:'7 --',wl_ss_mode:'AP2',wl_ss_secmo:'WPA',wl_ss_sin:'sig2',wl_ss_type:'TKIP'},{id:'3',wl_ss_ssid:'ssid3',wl_ss_bssid:'00:1c:c0:b0:1e:33',wl_ss_channel:'12 (B+G)',wl_ss_mode:'AP3',wl_ss_secmo:'WPA2',wl_ss_sin:'sig3',wl_ss_type:'AES'}]
}
