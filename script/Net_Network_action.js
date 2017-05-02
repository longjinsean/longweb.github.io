/************************************* 网络》网络设置》网络连接 *******************************************/
var flaginit = 0;
var modflag = 0;
function init_nnwan_set(){
	$.CurrentApp = "NN_WAN";
	check_item = [];
	getRequestData("network_wan_show",{"no":"no"},function(data){
		//setAppTagData(data);
		//creat_wan_tab();
		if(data.wan_link_list.length == 0)
		{
			add_wan_info();	
			WanIP_Mode_disabled();
			wan_disabled_show();
			WanServicemode_disabled();
			Obtain_address_disabled();
			Obtain_Gateway_disabled();
			DSCP_disabled();
			SetupMod_disabled();
			WanDslite_disabled();
			dhcpPrefix_disabled();
			wanv6_disabled_show();
			wanv4v6_disabled_show();
			Wan_linkmode_show();
			getTag("wan_set_label","AuthenticationType_select").select.entity.disabled = true;
		}
		else
		{
			selectonedata1();
			WanIP_Mode_disabled();
			wan_disabled_show();
			WanServicemode_disabled();
			Obtain_address_disabled();
			Obtain_Gateway_disabled();
			DSCP_disabled();
			SetupMod_disabled();
			WanDslite_disabled();
			dhcpPrefix_disabled();
			wanv6_disabled_show();
			wanv4v6_disabled_show();
			Wan_linkmode_show();
			getTag("wan_set_label","AuthenticationType_select").select.entity.disabled = true;
			flaginit = 1;
			MOD = "save";
		}
	});
	//getTag("wan_set_label","wan_port").checkbox3.hide();
	//getTag("wan_set_label","wan_port").checkbox4.hide();
	getPan("wan_set_label").entity.style.display='none';
	getPan("wanconnect").entity.style.display='';
	getTag("wan_set_label","WanIP_Mode_select").select.entity.value = '1';
	getTag("wanconnect","del_waninfo").hide();
	init_vlan_set();
}
function mode_wan_info(row){
	var wanname = row.data.name;
	mod_waninfo(row);
	getPan("wan_set_label").entity.style.display='';
	getPan("wanconnect").entity.style.display='none';
}
function disabledfun(){
	document.getElementById("add_wanset_save").disabled = true;
}
function enabledfun(){
	document.getElementById("add_wanset_save").disabled = false;
}
function selectonedata1(){
modflag = 1;
MOD = "mod";
	getRequestData("network_wan_show",{"no":"no"},function(data){
		var arr = new Array();
		for(var i in data.wan_link_list){
			var obj = new Object();
			obj.name = data.wan_link_list[i].tdaucWanName;
			//obj.wanenable = data.wan_link_list[i].wanenable;
			//obj.td8021p = data.wan_link_list[i].td8021p;
			var port = "";
			if(data.wan_link_list[i].tdulBindPort&0x01)
			{
				port += "lan1,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x02)
			{
				port += "lan2,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x04)
			{
				port += "lan3,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x08)
			{
				port += "lan4,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x10)
			{
				port += "wlan1,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x20)
			{
				port += "wlan2,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x40)
			{
				port += "wlan3,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x80)
			{
				port += "wlan4,";
			}
			obj.tdulBindPort = port.substring(0,port.length-1);
			obj.action_operation = "mod_del";
			arr.push(obj);
		} 
		var tab = getTag("wanconnect","wan_link_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
		getTag("wanconnect","wan_link_list").tab.tbody.Rows[0].entity.click();
	});	
}
function selectonedata(){
        modflag = 1;
	MOD = "mod";
	var j = 0;
	var rowdataval = new Object();
for(var i in $.DataMap.wan_link_list[j])
	{
		switch(i){
			    case "indexid":
						rowdataval.indexid_text = $.DataMap.wan_link_list[j][i];
						break;
					case "indexid1":
						rowdataval.indexid1_text = $.DataMap.wan_link_list[j][i];
						break;
					case "indexid2":
						rowdataval.indexid2_text = $.DataMap.wan_link_list[j][i];
						break;
					case "tducIPMode":
						rowdataval.WanIP_Mode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "td8021p":
						rowdataval.Wan_802_1_P_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tducAddressingType":
							rowdataval.WanAddress_select = $.DataMap.wan_link_list[j][i];
							if($.DataMap.wan_link_list[j][i] == '3')
							{
								rowdataval.WanAddressv6_select = $.DataMap.wan_link_list[j][i];
							}
							else
							{
								rowdataval.WanAddressv6_select = "IP";
								rowdataval.WanAddresstype_select = $.DataMap.wan_link_list[j][i];
							}
						break;
						case "tdconnectiontype":
						rowdataval.Wan_linkmode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdulBindPort":
						rowdataval.tdulBindPort = parseInt($.DataMap.wan_link_list[j][i]);
						break;
						case "td_ucLanInterfaceDHCPEnable":
						rowdataval.dhcpserver_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tducNATEnabled":
						rowdataval.NAT_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tducServiceList":
						rowdataval.WanServicemode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdvlanid":
						rowdataval.WanVlanID_text = $.DataMap.wan_link_list[j][i];
						break;
						case "web_vlan_mode":
							if($.DataMap.wan_link_list[j][i] == '0')
							{
								rowdataval.vlanenabled_checkbox = '0';
							}
							else if($.DataMap.wan_link_list[j][i] == '2')
							{
								rowdataval.vlanenabled_checkbox = '1';
							}
						break;
						case "wan802enabled_checkbox":
							if($.DataMap.wan_link_list[j][i] == '0')
							{
								rowdataval.wan802enabled_checkbox = '0';
							}
							else if($.DataMap.wan_link_list[j][i] == '1')
							{
								rowdataval.wan802enabled_checkbox = '1';
							}
						break;
						case "tdulMulticastVlan":
						if($.DataMap.wan_link_list[j][i] == "-1")
						{
							rowdataval.MulticastVlan_text = " ";
						}
						else
						{
							rowdataval.MulticastVlan_text = $.DataMap.wan_link_list[j][i];
						}
						break;
						case "tducDscpEnable":
						rowdataval.DSCP_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tducDscpValue":
						rowdataval.DSCP_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdulMaxMTUSize":
						rowdataval.WanMTU_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucUsername":
						rowdataval.WanUserName_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucPassword":
						rowdataval.WanPassword_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducExternalIPAddress":
						rowdataval.WanIPaddress_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucSubnetMask":
						rowdataval.Wanmask_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducProxyEnable":
						rowdataval.pppoeProxy_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tdAuthtype":
						if($.DataMap.wan_link_list[j][i] == '3')
						{
						rowdataval.AuthenticationType_select = '2';
						}
						else
						{
						rowdataval.AuthenticationType_select = $.DataMap.wan_link_list[j][i];
					  }
						break;
						case "Dialingmode_select":
						rowdataval.Dialingmode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "Timeout_text":
						rowdataval.Timeout_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucDefaultGateway":
						rowdataval.DefaultGateway_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucDNSServers":
						rowdataval.DNS1_text = $.DataMap.wan_link_list[j][i].split(',')[0];
						rowdataval.DNS2_text = $.DataMap.wan_link_list[j][i].split(',')[1];
						rowdataval.DNS3_text = $.DataMap.wan_link_list[j][i].split(',')[2];
						break;
						case "tducIPv6AddressOrigin":
						rowdataval.Obtain_address_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucIPv6Address":
						rowdataval.ipv6addr_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducGetwayAchieve":
						rowdataval.Obtain_Gateway_select = $.DataMap.wan_link_list[j][i];
						break;
						case "td_aucDefaultIPv6Gateway":
						rowdataval.ipv6Gate_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducDNSAchieve":
						rowdataval.Obtain_dns_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucIPv6DNSServers":
						rowdataval.ManualDNS1_text = $.DataMap.wan_link_list[j][i].split(',')[0];
						rowdataval.ManualDNS2_text = $.DataMap.wan_link_list[j][i].split(',')[1];
						rowdataval.ManualDNS3_text = $.DataMap.wan_link_list[j][i].split(',')[2];
						break;
						case "tducDsliteEnable":
						rowdataval.WanDslite_checkbox = $.DataMap.wan_link_list[j][i];
						break;
						case "tducAftrMode":
						rowdataval.SetupMode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucAftr":
						rowdataval.aftraddr_text = $.DataMap.wan_link_list[j][i];
						break;
						case "td_IPv6PrefixDelegationEnabled":
						rowdataval.dhcpPrefix_delegation_checkbox = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucIPv6Prefix":
						rowdataval.ipv6addrPrefix_text = $.DataMap.wan_link_list[j][i];
						break;
		}
	}
	setModify(rowdataval);
	checkboxdisplay(rowdataval);
}
function checkboxdisplay(data){
		if(data.pppoeProxy_Enable == "1")
		{
		  getTag("wan_set_label","pppoeProxy_Enable").checkbox.entity.checked = true;	
		}
		else
		{
			getTag("wan_set_label","pppoeProxy_Enable").checkbox.entity.checked = false;	
		}
		if(data.vlanenabled_checkbox == "0")
		{
			getTag("wan_set_label","vlanenabled_checkbox").checkbox.entity.checked = false;
			getTag("wan_set_label","WanVlanID_text").text.entity.disabled = true;
		  getTag("wan_set_label","Wan_802_1_P_select").hide();
		  getTag("wan_set_label","wan802enabled_checkbox").hide();
		}
		else if(data.vlanenabled_checkbox == "1")
		{
			getTag("wan_set_label","vlanenabled_checkbox").checkbox.entity.checked = true;	
			getTag("wan_set_label","WanVlanID_text").text.entity.disabled = false;
		  getTag("wan_set_label","Wan_802_1_P_select").show();
		  getTag("wan_set_label","wan802enabled_checkbox").show();
		  wan802_disabled();
		}
		if(data.wan802enabled_checkbox == "0")
		{
			getTag("wan_set_label","wan802enabled_checkbox").checkbox.entity.checked = false;
		  getTag("wan_set_label","Wan_802_1_P_select").select.entity.disabled = false;	
		}
		else if(data.wan802enabled_checkbox == "1")
		{
			getTag("wan_set_label","wan802enabled_checkbox").checkbox.entity.checked = true;	
			getTag("wan_set_label","Wan_802_1_P_select").select.entity.disabled = true;
		}
		if(data.Option60enabled_checkbox == "0")
		{
			getTag("wan_set_label","Option60enabled_checkbox").checkbox.entity.checked = false;
		}
		else if(data.Option60enabled_checkbox == "1")
		{
			getTag("wan_set_label","Option60enabled_checkbox").checkbox.entity.checked = true;
		}
		if(data.dhcpserver_Enable == "1")
		{
		  getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
		}
		if(data.NAT_Enable == "1")
		{
		  getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = false;
		}
		if(data.DSCP_Enable == "1")
		{
		  getTag("wan_set_label","DSCP_Enable").checkbox.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","DSCP_Enable").checkbox.entity.checked = false;
		}
		if(data.WanDslite_checkbox == "1")
		{
		  getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.checked = false;
		}
		if(data.td_IPv6PrefixDelegationEnabled == '1')
  	{
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[0].radio.entity.checked = true;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[1].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[2].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[3].radio.entity.checked = false;
  	}
  	else if(data.td_IPv6PrefixDelegationEnabled == '2')
  	{
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[0].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[1].radio.entity.checked = true;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[2].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[3].radio.entity.checked = false;
  	}
  	else if(data.td_IPv6PrefixDelegationEnabled == '3') 
  	{
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[0].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[1].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[2].radio.entity.checked = true;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[3].radio.entity.checked = false;
 	 	}
 	 	else if(data.td_IPv6PrefixDelegationEnabled == '4') 
  	{
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[0].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[1].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[2].radio.entity.checked = false;
  		getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[3].radio.entity.checked = true;
 	 	}
		if(data.tdulBindPort&0x01)
		{
			getTag("wan_set_label","wan_port").checkbox1.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","wan_port").checkbox1.entity.checked = false;
		}
		if(data.tdulBindPort&0x02)
		{
			getTag("wan_set_label","wan_port").checkbox2.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","wan_port").checkbox2.entity.checked = false;
		}
		if(data.tdulBindPort&0x04)
		{
			getTag("wan_set_label","wan_port").checkbox3.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","wan_port").checkbox3.entity.checked = false;
		}
		if(data.tdulBindPort&0x08)
		{
			getTag("wan_set_label","wan_port").checkbox4.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","wan_port").checkbox4.entity.checked = false;
		}
		if(data.tdulBindPort&0x10)
		{
			getTag("wan_set_label","ssid_port").checkbox1.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","ssid_port").checkbox1.entity.checked = false;
		}
		if(data.tdulBindPort&0x20)
		{
			getTag("wan_set_label","ssid_port").checkbox2.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","ssid_port").checkbox2.entity.checked = false;
		}
		if(data.tdulBindPort&0x40)
		{
			getTag("wan_set_label","ssid_port").checkbox3.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","ssid_port").checkbox3.entity.checked = false;
		}
		if(data.tdulBindPort&0x80)
		{
			getTag("wan_set_label","ssid_port").checkbox4.entity.checked = true;
		}
		else
		{
			getTag("wan_set_label","ssid_port").checkbox4.entity.checked = false;
		}
}
function creat_wan_tab(){
	getRequestData("network_wan_show",{"no":"no"},function(data){
		var arr = new Array();
		for(var i in data.wan_link_list){
			var obj = new Object();
			obj.name = data.wan_link_list[i].tdaucWanName;
			//obj.wanenable = data.wan_link_list[i].wanenable;
			//obj.td8021p = data.wan_link_list[i].td8021p;
			var port = "";
			if(data.wan_link_list[i].tdulBindPort&0x01)
			{
				port += "lan1,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x02)
			{
				port += "lan2,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x04)
			{
				port += "lan3,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x08)
			{
				port += "lan4,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x10)
			{
				port += "wlan1,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x20)
			{
				port += "wlan2,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x40)
			{
				port += "wlan3,";
			}
			if(data.wan_link_list[i].tdulBindPort&0x80)
			{
				port += "wlan4,";
			}
			obj.tdulBindPort = port.substring(0,port.length-1);
			obj.action = data.wan_link_list[i].wanenable;
			arr.push(obj);
		} 
		var tab = getTag("wanconnect","wan_link_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
	});	
}
function add_wan_info(){
	$.CurrentApp = "NN_WAN";
	getPan("wan_set_label").entity.style.display='';
	getPan("wanconnect").entity.style.display='none';
	modflag = 0;
	MOD = "save";
	creat_wan_tab();
	var datat = new Object();
	datat.indexid_text = " ";
	datat.indexid1_text = " ";
	datat.indexid2_text = " ";
	datat.WanIP_Mode_select = "1";
	datat.WanAddress_select = "3";
	datat.WanAddressv6_select = "3";
	datat.WanAddresstype_select = "1";
	datat.Wan_linkmode_select = "1";
	datat.WanVlanID_text = " ";
	datat.MulticastVlan_text = " ";
	datat.DSCP_text = " ";
	if((datat.WanAddress_select == "3" && datat.Wan_linkmode_select == "1") || (datat.WanAddressv6_select == "3" && datat.Wan_linkmode_select == "1"))
	{
		datat.WanMTU_text = "1492";
  }
  else
  {
  	datat.WanMTU_text = "1500";
  }
	datat.WanUserName_text = " ";
	datat.WanPassword_text = "";
	datat.WanIPaddress_text = " ";
	datat.Wanmask_text = " ";
	datat.Timeout_text = "1200";
	datat.DefaultGateway_text = " ";
	datat.DNS1_text = " ";
	datat.DNS2_text = " ";
	datat.DNS3_text = " ";
	datat.ipv6addr_text = " ";
	datat.ipv6Gate_text = " ";
	datat.ManualDNS1_text = " ";
	datat.ManualDNS2_text = " ";
	datat.ManualDNS3_text = " ";
	datat.aftraddr_text = " ";
	datat.ipv6addrPrefix_text = " ";
	datat.AuthenticationType_select = "0";
	datat.Dialingmode_select = "2";
	datat.Wan_802_1_P_select = "0";
	datat.AuthenticationType_select = "0";
	datat.Obtain_address_select = "3";
	datat.Obtain_Gateway_select = "0";
	datat.Obtain_dns_select = "0";
	datat.SetupMode_select = "0";
	datat.WanServicemode_select = "4";
	datat.Option60enabled_checkbox = "0";
	datat.tdoption60id = "";
	setAppTagData(datat);
	getTag("wan_set_label","vlanenabled_checkbox").checkbox.entity.checked = true;
	vlan_disabled();
	getTag("wan_set_label","wan802enabled_checkbox").checkbox.entity.checked = true;
	wan802_disabled();
	getTag("wan_set_label","Option60enabled_checkbox").checkbox.entity.checked = true;
	getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
	getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = true;
	getTag("wan_set_label","DSCP_Enable").checkbox.entity.checked = false;
	getTag("wan_set_label","pppoeProxy_Enable").checkbox.entity.checked = false;
	getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.checked = false;
	getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[0].radio.entity.checked = true;
  getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[1].radio.entity.checked = false;
  getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[2].radio.entity.checked = false;
  getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[3].radio.entity.checked = false;
	getTag("wan_set_label","wan_port").checkbox1.entity.checked = false;
	getTag("wan_set_label","wan_port").checkbox2.entity.checked = false;
	getTag("wan_set_label","wan_port").checkbox3.entity.checked = false;
	getTag("wan_set_label","wan_port").checkbox4.entity.checked = false;
	getTag("wan_set_label","ssid_port").checkbox1.entity.checked = false;
	getTag("wan_set_label","ssid_port").checkbox2.entity.checked = false;
	getTag("wan_set_label","ssid_port").checkbox3.entity.checked = false;
	getTag("wan_set_label","ssid_port").checkbox4.entity.checked = false;
	getTag("wan_set_label","WanPassword_text").text.entity.value = "";
	enabledfun();
}
function del_wan_info(row){
	 if(!confirm($.CommonLan['del_info'])){
          return;
      }
	var wanname = row.data.name;
	if(subdebug)
	{
		alert("check_item:"+wanname);
	}
	getRequestData("network_wan_show",{"no":"no"},function(data){
		if(data.wan_link_list.length == 1)
		{
			getTag("wanconnect","del_waninfo").show();
		}
		else
		{
			wan_del_set(wanname);
		}
	});
}
function wan_del_set(index_select)
{
	var obj = new Object();
	obj.mode = "del";
	obj.data = index_select;
	setAppDataurl('del','network_wan_del',obj,function(data){
		$.Refresh();
		check_item = [];
		});
}
function mod_waninfo(row){
	$.CurrentApp = "NN_WAN";
	modflag = 1;
	MOD = "mod";
	var rowdataval = new Object();
	for(var j in $.DataMap.wan_link_list)
	{
		if($.DataMap.wan_link_list[j].tdaucWanName == row.data.name)
		{
			break;
		}
	}
	for(var i in $.DataMap.wan_link_list[j])
	{
		switch(i){
			    case "indexid":
						rowdataval.indexid_text = $.DataMap.wan_link_list[j][i];
						break;
					case "indexid1":
						rowdataval.indexid1_text = $.DataMap.wan_link_list[j][i];
						break;
					case "indexid2":
						rowdataval.indexid2_text = $.DataMap.wan_link_list[j][i];
						break;
					case "tducIPMode":
						rowdataval.WanIP_Mode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "td8021p":
						rowdataval.Wan_802_1_P_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tducAddressingType":
							rowdataval.WanAddress_select = $.DataMap.wan_link_list[j][i];
							if($.DataMap.wan_link_list[j][i] == '3')
							{
								rowdataval.WanAddressv6_select = $.DataMap.wan_link_list[j][i];
							}
							else
							{
								rowdataval.WanAddressv6_select = "IP";
								rowdataval.WanAddresstype_select = $.DataMap.wan_link_list[j][i];
							}
						break;
						case "tdconnectiontype":
						rowdataval.Wan_linkmode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdulBindPort":
						rowdataval.tdulBindPort = parseInt($.DataMap.wan_link_list[j][i]);
						break;
						case "td_ucLanInterfaceDHCPEnable":
						rowdataval.dhcpserver_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tducNATEnabled":
						rowdataval.NAT_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tducServiceList":
						rowdataval.WanServicemode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdvlanid":
						rowdataval.WanVlanID_text = $.DataMap.wan_link_list[j][i];
						break;
						case "web_vlan_mode":
							if($.DataMap.wan_link_list[j][i] == '0')
							{
								rowdataval.vlanenabled_checkbox = '0';
							}
							else if($.DataMap.wan_link_list[j][i] == '2')
							{
								rowdataval.vlanenabled_checkbox = '1';
							}
						break;
						case "wan802enabled_checkbox":
							if($.DataMap.wan_link_list[j][i] == '0')
							{
								rowdataval.wan802enabled_checkbox = '0';
							}
							else if($.DataMap.wan_link_list[j][i] == '1')
							{
								rowdataval.wan802enabled_checkbox = '1';
							}
						break;
						case "tdoption60id":
						rowdataval.Option60_text = $.DataMap.wan_link_list[j][i];
						break;
						case "Option60enabled_checkbox":
							if($.DataMap.wan_link_list[j][i] == '0')
							{
								rowdataval.Option60enabled_checkbox = '0';
							}
							else if($.DataMap.wan_link_list[j][i] == '1')
							{
								rowdataval.Option60enabled_checkbox = '1';
							}
						break;
						case "tdulMulticastVlan":
						if($.DataMap.wan_link_list[j][i] == "-1")
						{
							rowdataval.MulticastVlan_text = " ";
						}
						else
						{
							rowdataval.MulticastVlan_text = $.DataMap.wan_link_list[j][i];
						}
						break;
						case "tducDscpEnable":
						rowdataval.DSCP_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tducDscpValue":
						rowdataval.DSCP_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdulMaxMTUSize":
						rowdataval.WanMTU_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucUsername":
						rowdataval.WanUserName_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucPassword":
						rowdataval.WanPassword_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducExternalIPAddress":
						rowdataval.WanIPaddress_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucSubnetMask":
						rowdataval.Wanmask_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducProxyEnable":
						rowdataval.pppoeProxy_Enable = $.DataMap.wan_link_list[j][i];
						break;
						case "tdAuthtype":
						if($.DataMap.wan_link_list[j][i] == '3')
						{
						rowdataval.AuthenticationType_select = '2';
						}
						else
						{
						rowdataval.AuthenticationType_select = $.DataMap.wan_link_list[j][i];
					  }
						break;
						case "Dialingmode_select":
						rowdataval.Dialingmode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "Timeout_text":
						rowdataval.Timeout_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucDefaultGateway":
						rowdataval.DefaultGateway_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucDNSServers":
						rowdataval.DNS1_text = $.DataMap.wan_link_list[j][i].split(',')[0];
						rowdataval.DNS2_text = $.DataMap.wan_link_list[j][i].split(',')[1];
						rowdataval.DNS3_text = $.DataMap.wan_link_list[j][i].split(',')[2];
						break;
						case "tducIPv6AddressOrigin":
						rowdataval.Obtain_address_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucIPv6Address":
						rowdataval.ipv6addr_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducGetwayAchieve":
						rowdataval.Obtain_Gateway_select = $.DataMap.wan_link_list[j][i];
						break;
						case "td_aucDefaultIPv6Gateway":
						rowdataval.ipv6Gate_text = $.DataMap.wan_link_list[j][i];
						break;
						case "tducDNSAchieve":
						rowdataval.Obtain_dns_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucIPv6DNSServers":
						rowdataval.ManualDNS1_text = $.DataMap.wan_link_list[j][i].split(',')[0];
						rowdataval.ManualDNS2_text = $.DataMap.wan_link_list[j][i].split(',')[1];
						rowdataval.ManualDNS3_text = $.DataMap.wan_link_list[j][i].split(',')[2];
						break;
						case "tducDsliteEnable":
						rowdataval.WanDslite_checkbox = $.DataMap.wan_link_list[j][i];
						break;
						case "tducAftrMode":
						rowdataval.SetupMode_select = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucAftr":
						rowdataval.aftraddr_text = $.DataMap.wan_link_list[j][i];
						break;
						case "td_IPv6PrefixDelegationEnabled":
						rowdataval.dhcpPrefix_delegation_checkbox = $.DataMap.wan_link_list[j][i];
						break;
						case "tdaucIPv6Prefix":
						rowdataval.ipv6addrPrefix_text = $.DataMap.wan_link_list[j][i];
						break;
		}
	}
    setModify(rowdataval);
    checkboxdisplay(rowdataval);
    MODData = $.DataMap.wan_link_list[j][i];
    WanIP_Mode_disabled();
    wan_disabled_show();
    wanv6_disabled_show();
	  wanv4v6_disabled_show();
	  Wan_linkmode_show();
	  vlan_disabled();
	  if($.DataMap.wan_link_list[j].wanenable == "0")
	  {
	  	disabledfun();
	  }
	  else
	  {
	  	enabledfun();
	  }
	if(flaginit == 1)
	{
		MOD = "save";
	}
}
function add_wanset_save(){
	$.CurrentApp = "NN_WAN";
	if(!checkTag(["wan_set_label"])){return;}
	var str1=getTag("wan_set_label","WanVlanID_text").text.entity.value;
	if(getTag("wan_set_label","WanVlanID_text").text.entity.disabled == false){
		if((parseInt(str1)< 1)||(parseInt(str1)> 4095)){
	    	checkShow(getTag("wan_set_label","WanVlanID_text").text,$.CommonLan['range_err']);return;
		}	
	}
	var str2=getTag("wan_set_label","MulticastVlan_text").text.entity.value;
	if((parseInt(str2)< 1)||(parseInt(str2)> 4094)){
	   	checkShow(getTag("wan_set_label","MulticastVlan_text").text,$.CommonLan['range_err']);return;
	}	
	var str3=getTag("wan_set_label","WanMTU_text").text.entity.value;
	if((parseInt(str3)< 128)||(parseInt(str3)> 1540)){
	  	checkShow(getTag("wan_set_label","WanMTU_text").text,$.CommonLan['range_err']);return;
	}
	var obj = new Object();
	//if(MOD == "save")
	if(modflag == 0)
	{
		obj.mode = "add";
	}
	else if(modflag == 1) //else if(MOD == "mod")
	{
		obj.mode = "mod";
	}else
	{
		alert($.CommonLan['undefined']);
		return;	
	}
	if(obj.mode == "mod")
	{
	obj.indexid = getTag("wan_set_label","indexid_text").text.entity.value;
	obj.indexid1 = getTag("wan_set_label","indexid1_text").text.entity.value;
	obj.indexid2 = getTag("wan_set_label","indexid2_text").text.entity.value;
  }
	obj.WanIP_Mode_select = getTag("wan_set_label","WanIP_Mode_select").select.entity.value;
	var WanAddressv4 = getTag("wan_set_label","WanAddress_select").select.entity.value;
	var WanAddressv6 = getTag("wan_set_label","WanAddressv6_select").select.entity.value;
	var WanAddressv6iptype = getTag("wan_set_label","WanAddresstype_select").select.entity.value;
	if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == '1')
	{
		obj.ucAddressingType = WanAddressv4;
	}
	else
	{
		if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
		{
			obj.ucAddressingType = WanAddressv6;
		}
		else
		{
			obj.ucAddressingType = WanAddressv6iptype;
		}
	}
	var str = "";
	if(getTag("wan_set_label","wan_port").checkbox1.entity.checked == true)
	  {
	  	str = (str | 0x01);
	  }
	if(getTag("wan_set_label","wan_port").checkbox2.entity.checked == true)
	  {
	  	str = (str | 0x02);
	  }
	if(getTag("wan_set_label","wan_port").checkbox3.entity.checked == true)
	  {
	  	str = (str | 0x04);
	  }
	if(getTag("wan_set_label","wan_port").checkbox4.entity.checked == true)
	  {
	  	str = (str | 0x08);
	  }
	if(getTag("wan_set_label","ssid_port").checkbox1.entity.checked == true)
	  {
	  	str = (str | 0x10);
	  }
	if(getTag("wan_set_label","ssid_port").checkbox2.entity.checked == true)
	  {
	  	str = (str | 0x20);
	  }
	if(getTag("wan_set_label","ssid_port").checkbox3.entity.checked == true)
	  {
	  	str = (str | 0x40);
	  }
	if(getTag("wan_set_label","ssid_port").checkbox4.entity.checked == true)
	  {
	  	str = (str | 0x80);
	  }
	if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
	{
		obj.BindPort = "";
	}
	else
	{
		obj.BindPort = str;
  }
///////////////////////加逻辑
	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")//桥
	{
		/*if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "8")//other
		{
			obj.dhcpserver_Enable = '0';
		}
		else if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "4")//internet
		{
			obj.dhcpserver_Enable = '1';
		}*/
			if(getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked)
			{
				obj.dhcpserver_Enable = '1';
		}
			else
			{
				obj.dhcpserver_Enable = '0';
			}
	}
	else
	{
		/* 'TR069','VOIP','TR069,VOIP' */
		if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
		{
			obj.dhcpserver_Enable = '0';
		}
		else
		{
			if(getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked)
	 		{
	 			obj.dhcpserver_Enable = '1';
	 		}
			else
	 		{
	 			obj.dhcpserver_Enable = '0';
	 		}
		}
		
	}
	 
	 if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 {
			obj.NAT_Enable = '0';
	 }
	 else
	 {  if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
	 		{
				obj.NAT_Enable = '0';
	 		}
	 		else
	 		{
	 			if(getTag("wan_set_label","NAT_Enable").checkbox.entity.checked)
	 			{
	 				obj.NAT_Enable = '1';
	 			}
				else
				{
	 				obj.NAT_Enable = '0';
	 			}
	 		}
	 		
	 }
	 	
	obj.WanServicemode_select = getTag("wan_set_label","WanServicemode_select").select.entity.value;
	//obj.vlanmode_select = getTag("wan_set_label","vlanmode_select").select.entity.value;
	if(getTag("wan_set_label","vlanenabled_checkbox").checkbox.entity.checked)
	{
		obj.web_vlan_mode = '2';
		obj.WanVlanID_text = getTag("wan_set_label","WanVlanID_text").text.entity.value;
		if(getTag("wan_set_label","wan802enabled_checkbox").checkbox.entity.checked)
		{
			obj.wan802enabled_checkbox = '1';
		}else
		{
			obj.wan802enabled_checkbox = '0';
		}
		obj.Wan_802_1_P_select = getTag("wan_set_label","Wan_802_1_P_select").select.entity.value;
	}
	else
	{
		obj.web_vlan_mode = '0';
		obj.WanVlanID_text = "";
		obj.wan802enabled_checkbox = '0';
		obj.Wan_802_1_P_select = '0'; 
	}
	if(getTag("wan_set_label","DSCP_Enable").checkbox.entity.checked)
	 {
	 	obj.DSCP_Enable = '1';
	 }
	else
	 {
	 	obj.DSCP_Enable = '0';
	 }
	if(getTag("wan_set_label","Option60enabled_checkbox").checkbox.entity.checked)
	{
		obj.Option60enabled_checkbox = '1';
		obj.Option60_text = getTag("wan_set_label","Option60_text").text.entity.value;
	}
	else
	{
		obj.Option60enabled_checkbox = '0';
		obj.Option60_text = "";
	}


	obj.DSCP_text = getTag("wan_set_label","DSCP_text").text.entity.value;
	if((getTag("wan_set_label","WanMTU_text").text.entity.value == " ") || (getTag("wan_set_label","WanMTU_text").text.entity.value == ""))
	{
		obj.WanMTU_text = "1480";
	}
	else
	{
		obj.WanMTU_text = getTag("wan_set_label","WanMTU_text").text.entity.value;
	}
	obj.WanUserName_text = getTag("wan_set_label","WanUserName_text").text.entity.value;
	obj.WanPassword_text = getTag("wan_set_label","WanPassword_text").text.entity.value;
	obj.WanIPaddress_text = getTag("wan_set_label","WanIPaddress_text").text.entity.value;
	obj.Wanmask_text = getTag("wan_set_label","Wanmask_text").text.entity.value;
	obj.AuthenticationType_select = getTag("wan_set_label","AuthenticationType_select").select.entity.value; //认证类型
	obj.Dialingmode_select = getTag("wan_set_label","Dialingmode_select").select.entity.value;
	obj.Timeout_text = getTag("wan_set_label","Timeout_text").text.entity.value;
	obj.DefaultGateway_text = getTag("wan_set_label","DefaultGateway_text").text.entity.value;
	var ipv4DNS1 = getTag("wan_set_label","DNS1_text").text.entity.value;
	var ipv4DNS2 = getTag("wan_set_label","DNS2_text").text.entity.value;
	var ipv4DNS3 = getTag("wan_set_label","DNS3_text").text.entity.value;
	obj.ipv4dns = trim(ipv4DNS1) + "," + trim(ipv4DNS2) + "," + trim(ipv4DNS3);
	obj.Obtain_address_select = getTag("wan_set_label","Obtain_address_select").select.entity.value;
	obj.ipv6addr_text = getTag("wan_set_label","ipv6addr_text").text.entity.value;
	obj.Obtain_Gateway_select = getTag("wan_set_label","Obtain_Gateway_select").select.entity.value;
	obj.ipv6Gate_text = getTag("wan_set_label","ipv6Gate_text").text.entity.value;
	obj.Obtain_dns_select = getTag("wan_set_label","Obtain_dns_select").select.entity.value;
	var ipv6ManualDNS1 = getTag("wan_set_label","ManualDNS1_text").text.entity.value;
	var ipv6ManualDNS2 = getTag("wan_set_label","ManualDNS2_text").text.entity.value;
	var ipv6ManualDNS3 = getTag("wan_set_label","ManualDNS3_text").text.entity.value;
	obj.ipv6ManualDNS = trim(ipv6ManualDNS1) + "," + trim(ipv6ManualDNS2) + "," + trim(ipv6ManualDNS3);
	if(getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.checked)
	 {
	 	obj.WanDslite_checkbox = '1';
	 }
	else
	 {
	 	obj.WanDslite_checkbox = '0';
	 }
	 if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[0].radio.entity.checked == true)
	 {
		 obj.dhcpPrefix_delegation_checkbox = "1";
	 }
	 else if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[1].radio.entity.checked == true)
	 {
		 obj.dhcpPrefix_delegation_checkbox = "2";
	 }
	 else if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[2].radio.entity.checked == true)
	 {
		 obj.dhcpPrefix_delegation_checkbox = "3";
	 }
	 else if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[3].radio.entity.checked == true)
	 {
		 obj.dhcpPrefix_delegation_checkbox = "4";
	 }
	 ///new
	 
	 obj.Wan_linkmode_select = getTag("wan_set_label","Wan_linkmode_select").select.entity.value;
	 if((getTag("wan_set_label","MulticastVlan_text").text.entity.value == "") || (getTag("wan_set_label","MulticastVlan_text").text.entity.value ==" "))
	 {
	 		obj.MulticastVlan_text = "-1";
	 }
	 else
	 {
	 		obj.MulticastVlan_text = getTag("wan_set_label","MulticastVlan_text").text.entity.value;
	 }
	 if(getTag("wan_set_label","pppoeProxy_Enable").checkbox.entity.checked)
	 {
	 	obj.pppoeProxy_Enable = '1';
	 }
	else
	 {
	 	obj.pppoeProxy_Enable = '0';
	 }
	 /*
	 if(getTag("wan_set_label","Iptv_Enable").checkbox.entity.checked)
	 {
	 	obj.Iptv_Enable = '1';
	 }
	else
	 {
	 	obj.Iptv_Enable = '0';
	 }
	 */
	 obj.ipv6addrPrefix_text = getTag("wan_set_label","ipv6addrPrefix_text").text.entity.value;
	 obj.SetupMode_select = getTag("wan_set_label","SetupMode_select").select.entity.value;
	 obj.aftraddr_text = getTag("wan_set_label","aftraddr_text").text.entity.value;
	 ////////////////////////////////////
	/*
	if(obj.WanServicemode_select == '8' && obj.Wan_linkmode_select == '2')
	{
		var other_result=confirm($.CommonLan['otherconfirm']);
		if(other_result == false)
		{
			return;
		}
  }*/
	 ////////////////////////////////////
	if(obj.mode == "add")
	{
	setAppDataurl('save','network_wan_add',obj,function(data){
		$.Refresh();
		//add_wan_info();
		});
	}
 else if(obj.mode == "mod")
 	{
 	setAppDataurl('mod','network_wan_mod',obj,function(data){
		$.Refresh();
		//add_wan_info();
		});	
 	}
}

function WanIP_Mode_disabled(){
if(MOD == "save")
{
if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1")
{
		if(getTag("wan_set_label","WanAddress_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
			}
		}
		else
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			}
		}
}
else if((getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "2" || getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "3") && MOD == "save")
{
  	if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
			}
		}
		else
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			}
		}	
}
}
if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1")//ipv4
{ 
	 getTag("wan_set_label","WanAddressv6_select").hide();
	 getTag("wan_set_label","WanAddresstype_select").hide();
	wanv4v6_disabled_show();
   getTag("wan_set_label","ipv6addrPrefix_text").hide();
   getTag("wan_set_label","SetupMode_select").hide();
   getTag("wan_set_label","aftraddr_text").hide();
   wan_disabled_show();
   WanServicemode_disabled();
   getTag("wan_set_label","Obtain_address_select").hide();
	 getTag("wan_set_label","ipv6addr_text").hide();
	 getTag("wan_set_label","Obtain_Gateway_select").hide();
	 getTag("wan_set_label","ipv6Gate_text").hide();
	 getTag("wan_set_label","Obtain_dns_select").hide();
	 getTag("wan_set_label","ManualDNS1_text").hide();
	 getTag("wan_set_label","ManualDNS2_text").hide();
	 getTag("wan_set_label","ManualDNS3_text").hide();
	 getTag("wan_set_label","WanDslite_checkbox").hide();
	 getTag("wan_set_label","dhcpPrefix_delegation_checkbox").hide();
	 getTag("wan_set_label","dhcpserver_Enable").show();
	 if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 {
	 		getTag("wan_set_label","WanAddress_select").hide();
	 }
	 else
	 {
	 		getTag("wan_set_label","WanAddress_select").show();
	 }
   if(getTag("wan_set_label","WanAddress_select").select.entity.value == "3")
   {  
	 	  getTag("wan_set_label","WanMTU_text").show();
      if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	  {
	 	     //getTag("wan_set_label","WanAddress_select").hide();
	 	     getTag("wan_set_label","NAT_Enable").hide();
	 	     getTag("wan_set_label","WanUserName_text").hide();
	 	     getTag("wan_set_label","WanPassword_text").hide();
	 	     getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	     getTag("wan_set_label","AuthenticationType_select").hide();
	 	     getTag("wan_set_label","Dialingmode_select").hide();
	 	     getTag("wan_set_label","Timeout_text").hide();
	 		}
	 	  else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	  {
	 	  	//getTag("wan_set_label","WanAddress_select").show();
	 	    getTag("wan_set_label","NAT_Enable").show();
	 	    getTag("wan_set_label","WanUserName_text").show();
	 	    getTag("wan_set_label","WanPassword_text").show();
	 	    getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    getTag("wan_set_label","AuthenticationType_select").show();
	 	    getTag("wan_set_label","Dialingmode_select").show();
	 	    getTag("wan_set_label","Timeout_text").show();
	 		}	 	    
  }
	else if(getTag("wan_set_label","WanAddress_select").select.entity.value == "1")
	{   
		getTag("wan_set_label","NAT_Enable").show();
	 	getTag("wan_set_label","WanMTU_text").show();
	 	getTag("wan_set_label","pppoeProxy_Enable").hide();
  }
  else if(getTag("wan_set_label","WanAddress_select").select.entity.value == "2")
	{   
		getTag("wan_set_label","NAT_Enable").show();
	 	getTag("wan_set_label","WanMTU_text").show();
	 	getTag("wan_set_label","pppoeProxy_Enable").hide();
  }
}
else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "2")//ipv6
{  
	 WanServicemode_disabled();
	 getTag("wan_set_label","WanAddress_select").hide();
	 wan_disabled_show();
   wanv6_disabled_show();
	 Obtain_address_disabled();
	 Obtain_Gateway_disabled();
	 Obtain_dns_disabled();
	 getTag("wan_set_label","dhcpserver_Enable").hide();
	 getTag("wan_set_label","NAT_Enable").hide();
	 getTag("wan_set_label","WanMTU_text").show();
	 if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 {
	 		getTag("wan_set_label","WanAddressv6_select").hide();
	    getTag("wan_set_label","WanAddresstype_select").hide();
		wanv4v6_disabled_show();
	    getTag("wan_set_label","Obtain_address_select").hide();
	    getTag("wan_set_label","Obtain_Gateway_select").hide();
	    getTag("wan_set_label","Obtain_dns_select").hide();
	    getTag("wan_set_label","dhcpPrefix_delegation_checkbox").hide();
	    getTag("wan_set_label","ipv6addrPrefix_text").hide();
	 }
	 else
	 {
	 		getTag("wan_set_label","WanAddressv6_select").show();
	 		if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 		{
	    	getTag("wan_set_label","WanAddresstype_select").hide();
			wanv4v6_disabled_show();
	    }
	    else
	    {
	    	getTag("wan_set_label","WanAddresstype_select").show();
	    }
	    getTag("wan_set_label","Obtain_address_select").show();
	    getTag("wan_set_label","Obtain_Gateway_select").show();
	    getTag("wan_set_label","Obtain_dns_select").show();
	    getTag("wan_set_label","dhcpPrefix_delegation_checkbox").show();
	    //getTag("wan_set_label","ipv6addrPrefix_text").show();
	    dhcpPrefix_disabled();
	 }
    if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
     {   
	        getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
	        if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	   getTag("wan_set_label","WanUserName_text").hide();
	 	    	   getTag("wan_set_label","WanPassword_text").hide();
	 	    	   getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	   getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	   getTag("wan_set_label","Dialingmode_select").hide();
	 	    	   getTag("wan_set_label","Timeout_text").hide();
	 	    	   getTag("wan_set_label","WanDslite_checkbox").hide();
	 	    	   getTag("wan_set_label","SetupMode_select").hide();
	 	    	   getTag("wan_set_label","aftraddr_text").hide();
	 	    	 }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	    	  getTag("wan_set_label","WanDslite_checkbox").show();
	 	       }
     }
	else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	  {    
	  	 SetupMod_disabled();
	     WanDslite_disabled();
       getTag("wan_set_label","AuthenticationType_select").hide();	
	 	   getTag("wan_set_label","WanUserName_text").hide();	
	     getTag("wan_set_label","WanPassword_text").hide();
	     getTag("wan_set_label","Dialingmode_select").hide();
	     getTag("wan_set_label","Timeout_text").hide();
	     getTag("wan_set_label","pppoeProxy_Enable").hide();
	     ///ppp扩展效应
	     getTag("wan_set_label","Obtain_address_select").select.entity.disabled = false;
		   getTag("wan_set_label","ipv6addr_text").text.entity.disabled = false;
		   getTag("wan_set_label","Obtain_Gateway_select").select.entity.disabled = false;
		   getTag("wan_set_label","ipv6Gate_text").text.entity.disabled = false;
		   getTag("wan_set_label","Obtain_dns_select").select.entity.disabled = false;
		   getTag("wan_set_label","ManualDNS1_text").text.entity.disabled = false;
		   getTag("wan_set_label","ManualDNS2_text").text.entity.disabled = false;
		   getTag("wan_set_label","ManualDNS3_text").text.entity.disabled = false;
		   getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.disabled = false;
		   //getTag("wan_set_label","dhcpPrefix_delegation_checkbox").checkbox.entity.disabled = false;
		   getTag("wan_set_label","WanIPaddress_text").hide();	
	     getTag("wan_set_label","Wanmask_text").hide();
	     getTag("wan_set_label","DefaultGateway_text").hide();
	     getTag("wan_set_label","DNS1_text").hide();
	     getTag("wan_set_label","DNS2_text").hide();
	     getTag("wan_set_label","DNS3_text").hide();
	     getTag("wan_set_label","WanMTU_text").show();
	     getTag("wan_set_label","WanDslite_checkbox").show();
	     WanDslite_disabled();
	     SetupMod_disabled();
   }
}
else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "3")//v4/v6
{  
	 WanServicemode_disabled();
	 getTag("wan_set_label","WanAddress_select").hide();
   wan_disabled_show();
   wanv6_disabled_show();
	 Obtain_address_disabled();
	 Obtain_Gateway_disabled();
	 Obtain_dns_disabled();
	 getTag("wan_set_label","WanDslite_checkbox").hide();
	 getTag("wan_set_label","dhcpserver_Enable").show();
	 getTag("wan_set_label","WanMTU_text").show();
	 getTag("wan_set_label","SetupMode_select").hide();
   getTag("wan_set_label","aftraddr_text").hide();
	 ///ppp扩展效应
	 getTag("wan_set_label","Obtain_address_select").select.entity.disabled = false;
	 getTag("wan_set_label","ipv6addr_text").text.entity.disabled = false;
	 getTag("wan_set_label","Obtain_Gateway_select").select.entity.disabled = false;
	 getTag("wan_set_label","ipv6Gate_text").text.entity.disabled = false;
	 getTag("wan_set_label","Obtain_dns_select").select.entity.disabled = false;
	 getTag("wan_set_label","ManualDNS1_text").text.entity.disabled = false;
	 getTag("wan_set_label","ManualDNS2_text").text.entity.disabled = false;
	 getTag("wan_set_label","ManualDNS3_text").text.entity.disabled = false;
	 getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.disabled = false;
	 //getTag("wan_set_label","dhcpPrefix_delegation_checkbox").checkbox.entity.disabled = false;
	 if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 {
	 		getTag("wan_set_label","WanAddressv6_select").hide();
	    getTag("wan_set_label","WanAddresstype_select").hide();
	    wanv4v6_disabled_show();
	    getTag("wan_set_label","Obtain_address_select").hide();
	    getTag("wan_set_label","Obtain_Gateway_select").hide();
	    getTag("wan_set_label","Obtain_dns_select").hide();
	    getTag("wan_set_label","dhcpPrefix_delegation_checkbox").hide();
	    getTag("wan_set_label","ipv6addrPrefix_text").hide();
	    getTag("wan_set_label","WanIPaddress_text").hide();	
	    getTag("wan_set_label","Wanmask_text").hide();
	    getTag("wan_set_label","DefaultGateway_text").hide();
	    getTag("wan_set_label","DNS1_text").hide();
	    getTag("wan_set_label","DNS2_text").hide();
	    getTag("wan_set_label","DNS3_text").hide();
	 }
	 else
	 {
	 		getTag("wan_set_label","WanAddressv6_select").show();
	    if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 		{
	    	getTag("wan_set_label","WanAddresstype_select").hide();
	    	wanv4v6_disabled_show();
	    }
	    else
	    {
	    	getTag("wan_set_label","WanAddresstype_select").show();
	    	wanv4v6_disabled_show();
	    }
	    getTag("wan_set_label","Obtain_address_select").show();
	    getTag("wan_set_label","Obtain_Gateway_select").show();
	    getTag("wan_set_label","Obtain_dns_select").show();
	    getTag("wan_set_label","dhcpPrefix_delegation_checkbox").show();
	    if(getTag("wan_set_label","WanAddresstype_select").select.entity.value == "2")
	    {
	        getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
	    }
	    else
	    {
	        getTag("wan_set_label","WanIPaddress_text").show();	
	        getTag("wan_set_label","Wanmask_text").show();
	        getTag("wan_set_label","DefaultGateway_text").show();
	        getTag("wan_set_label","DNS1_text").show();
	        getTag("wan_set_label","DNS2_text").show();
	        getTag("wan_set_label","DNS3_text").show();
	    }
	 }
    if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
     {    
	        getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();	
     	   if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	  getTag("wan_set_label","WanUserName_text").hide();
	 	    	  getTag("wan_set_label","WanPassword_text").hide();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	  getTag("wan_set_label","NAT_Enable").hide();
	 	    	  getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	  getTag("wan_set_label","Dialingmode_select").hide();
	 	    	  getTag("wan_set_label","Timeout_text").hide();
	 	    	 }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	      	getTag("wan_set_label","NAT_Enable").show();
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	       }
     }
	else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	  {     getTag("wan_set_label","AuthenticationType_select").hide();
	 	   		getTag("wan_set_label","WanUserName_text").hide();	
	        getTag("wan_set_label","WanPassword_text").hide();
	        getTag("wan_set_label","Dialingmode_select").hide();
	        getTag("wan_set_label","Timeout_text").hide();
          getTag("wan_set_label","pppoeProxy_Enable").hide();
          if(getTag("wan_set_label","WanAddresstype_select").select.entity.value == "1")
		     {
		     		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 					{
	 						  getTag("wan_set_label","NAT_Enable").hide();
			    			getTag("wan_set_label","WanIPaddress_text").hide();	
	        			getTag("wan_set_label","Wanmask_text").hide();
	        			getTag("wan_set_label","DefaultGateway_text").hide();
	        			getTag("wan_set_label","DNS1_text").hide();
	        			getTag("wan_set_label","DNS2_text").hide();
	        			getTag("wan_set_label","DNS3_text").hide();
	        	}
	        	else
	        	{
	        			getTag("wan_set_label","NAT_Enable").show();
	        			getTag("wan_set_label","WanIPaddress_text").show();	
	        			getTag("wan_set_label","Wanmask_text").show();
	        			getTag("wan_set_label","DefaultGateway_text").show();
	        			getTag("wan_set_label","DNS1_text").show();
	        			getTag("wan_set_label","DNS2_text").show();
	        			getTag("wan_set_label","DNS3_text").show();
	        	}
		     }
		     else
		     {
		     	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
		     	{
		     		getTag("wan_set_label","NAT_Enable").hide();
		     	}
		     	else
		     	{
		     		getTag("wan_set_label","NAT_Enable").show();
		     	}
			    getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
			
		    }
    }
}
}
function wan_disabled_show(){
	Option60_disabled();
if(MOD == "mod")
{
		if(getTag("wan_set_label","WanAddress_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
				getTag("wan_set_label","Timeout_text").text.entity.value = "1200";
			}
		}
		else if(getTag("wan_set_label","WanAddress_select").select.entity.value != '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
}
	if(MOD == "save")
	{
		if(getTag("wan_set_label","WanAddress_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
			}
		}
		else
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			}
		}
	}
  if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1")//////////////////////////ipv4_start
  {  
    getTag("wan_set_label","ManualDNS1_text").hide();
		getTag("wan_set_label","ManualDNS2_text").hide();
		getTag("wan_set_label","ManualDNS3_text").hide();
	  if(getTag("wan_set_label","WanAddress_select").select.entity.value == "3")
	  { 
	   getTag("wan_set_label","WanMTU_text").show();	//
	   getTag("wan_set_label","WanIPaddress_text").hide();
	   getTag("wan_set_label","Wanmask_text").hide();
	   getTag("wan_set_label","DefaultGateway_text").hide();
	   getTag("wan_set_label","DNS1_text").hide();
	   getTag("wan_set_label","DNS2_text").hide();
	   getTag("wan_set_label","DNS3_text").hide();
	   WanServicemode_disabled();
	   if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	  getTag("wan_set_label","NAT_Enable").hide();
	 	    	  getTag("wan_set_label","WanUserName_text").hide();
	 	    	  getTag("wan_set_label","WanPassword_text").hide();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	  getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	  getTag("wan_set_label","Dialingmode_select").hide();
	 	    	  getTag("wan_set_label","Timeout_text").hide();
	 	       }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	      	//getTag("wan_set_label","NAT_Enable").show();
	 	      	WanServicemode_disabled();
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	       }
	  }
	  else
	  {
		if(getTag("wan_set_label","WanAddress_select").select.entity.value == "1")
		{
			getTag("wan_set_label","WanMTU_text").show();
			getTag("wan_set_label","NAT_Enable").show();
			getTag("wan_set_label","WanUserName_text").hide();
			getTag("wan_set_label","WanPassword_text").hide();
			getTag("wan_set_label","AuthenticationType_select").hide();
			getTag("wan_set_label","Dialingmode_select").hide();
			getTag("wan_set_label","Timeout_text").hide();
			getTag("wan_set_label","pppoeProxy_Enable").hide();
			WanServicemode_disabled();
			if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
			{
	   			getTag("wan_set_label","WanIPaddress_text").hide();
	   			getTag("wan_set_label","Wanmask_text").hide();
	   			getTag("wan_set_label","DefaultGateway_text").hide();
	   			getTag("wan_set_label","DNS1_text").hide();
	   			getTag("wan_set_label","DNS2_text").hide();
	   			getTag("wan_set_label","DNS3_text").hide();
	   		}
	   		else
	   		{
	   			getTag("wan_set_label","WanIPaddress_text").show();
	   			getTag("wan_set_label","Wanmask_text").show();
	   			getTag("wan_set_label","DefaultGateway_text").show();
	   			getTag("wan_set_label","DNS1_text").show();
	   			getTag("wan_set_label","DNS2_text").show();
	   			getTag("wan_set_label","DNS3_text").show();
	   	}
	  }
	  else if(getTag("wan_set_label","WanAddress_select").select.entity.value == "2")
	  { 
	   getTag("wan_set_label","WanMTU_text").show();	
	   getTag("wan_set_label","NAT_Enable").show();	
	   getTag("wan_set_label","WanUserName_text").hide();	
	   getTag("wan_set_label","WanPassword_text").hide();	
	   getTag("wan_set_label","AuthenticationType_select").hide();	
	   getTag("wan_set_label","Dialingmode_select").hide();	
	   getTag("wan_set_label","Timeout_text").hide();	
	   getTag("wan_set_label","WanIPaddress_text").hide();
	   getTag("wan_set_label","Wanmask_text").hide();
	   getTag("wan_set_label","DefaultGateway_text").hide();
	   getTag("wan_set_label","DNS1_text").hide();
	   getTag("wan_set_label","DNS2_text").hide();
	   getTag("wan_set_label","DNS3_text").hide();
	   getTag("wan_set_label","pppoeProxy_Enable").hide();
	   WanServicemode_disabled();
	  }
	}//////////////////////////ipv4_END
}
}
function wanv6_disabled_show(){
  SetupMod_disabled();
	WanDslite_disabled();	
if(MOD == "mod")
{
	if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
	{
		if(MOD == "save")
		{
			getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
			getTag("wan_set_label","Timeout_text").text.entity.value = "1200";
		}
	}
	else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value != '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
	{
		if(MOD == "save")
		{
			getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			getTag("wan_set_label","Timeout_text").text.entity.value = "";
		}
	}
	else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2')
	{
		if(MOD == "save")
		{
			getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			getTag("wan_set_label","Timeout_text").text.entity.value = "";
		}
	}
}
	if(MOD == "save")
	{
  	if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
			}
		}
		else
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			}
		}
	}
	 if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "2")//v6
	 {
	 	   if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 	    { getTag("wan_set_label","WanAddresstype_select").hide();	
				wanv4v6_disabled_show();
	        getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
	 	    	getTag("wan_set_label","WanMTU_text").show();
	 	    	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	   getTag("wan_set_label","WanUserName_text").hide();
	 	    	   getTag("wan_set_label","WanPassword_text").hide();
	 	    	   getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	   getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	   getTag("wan_set_label","Dialingmode_select").hide();
	 	    	   getTag("wan_set_label","Timeout_text").hide();
	 	    	   getTag("wan_set_label","WanDslite_checkbox").hide();
	 	    	   getTag("wan_set_label","SetupMode_select").hide();
	 	    	   getTag("wan_set_label","aftraddr_text").hide();
	 	    	 }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	    	  getTag("wan_set_label","WanDslite_checkbox").show();
	 	       }
	 	    }
	 	   else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	 	   	{  getTag("wan_set_label","WanAddresstype_select").show();
				wanv4v6_disabled_show();
	 	   		getTag("wan_set_label","WanUserName_text").hide();	
	        getTag("wan_set_label","WanPassword_text").hide();
	        getTag("wan_set_label","AuthenticationType_select").hide();	
	        getTag("wan_set_label","Dialingmode_select").hide();
	        getTag("wan_set_label","Timeout_text").hide();
          getTag("wan_set_label","pppoeProxy_Enable").hide();
	        ///ppp扩展效应
	        getTag("wan_set_label","Obtain_address_select").select.entity.disabled = false;
		      getTag("wan_set_label","ipv6addr_text").text.entity.disabled = false;
		      getTag("wan_set_label","Obtain_Gateway_select").select.entity.disabled = false;
		      getTag("wan_set_label","ipv6Gate_text").text.entity.disabled = false;
		      getTag("wan_set_label","Obtain_dns_select").select.entity.disabled = false;
		      getTag("wan_set_label","ManualDNS1_text").text.entity.disabled = false;
		      getTag("wan_set_label","ManualDNS2_text").text.entity.disabled = false;
		      getTag("wan_set_label","ManualDNS3_text").text.entity.disabled = false;
		      getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.disabled = false;
		      //getTag("wan_set_label","dhcpPrefix_delegation_checkbox").checkbox.entity.disabled = false;
          getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
			    getTag("wan_set_label","WanMTU_text").show();
			    getTag("wan_set_label","WanDslite_checkbox").show();
			    WanDslite_disabled();
					SetupMod_disabled();
	 	   	}
	 }
	 else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "3")//v4/v6
	 {   
	 	   if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 	    { getTag("wan_set_label","WanAddresstype_select").hide();
			wanv4v6_disabled_show();
	        getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();	
	        if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	  getTag("wan_set_label","WanUserName_text").hide();
	 	    	  getTag("wan_set_label","WanPassword_text").hide();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	  getTag("wan_set_label","NAT_Enable").hide();
	 	    	  getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	  getTag("wan_set_label","Dialingmode_select").hide();
	 	    	  getTag("wan_set_label","Timeout_text").hide();
	 	    	 }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	      	getTag("wan_set_label","NAT_Enable").show();
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	       }
	 	    	
	 	    }
	 	   else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	 	   	{ getTag("wan_set_label","WanAddresstype_select").show();
				wanv4v6_disabled_show();
	 	   		getTag("wan_set_label","AuthenticationType_select").hide();
	 	   		getTag("wan_set_label","WanUserName_text").hide();	
	        getTag("wan_set_label","WanPassword_text").hide();
	        getTag("wan_set_label","Dialingmode_select").hide();
	        getTag("wan_set_label","Timeout_text").hide();
	        getTag("wan_set_label","pppoeProxy_Enable").hide();
	        getTag("wan_set_label","NAT_Enable").show();
	        if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	{
	 	    		getTag("wan_set_label","WanIPaddress_text").hide();	
	        	getTag("wan_set_label","Wanmask_text").hide();
	        	getTag("wan_set_label","DefaultGateway_text").hide();
	        	getTag("wan_set_label","DNS1_text").hide();
	        	getTag("wan_set_label","DNS2_text").hide();
	        	getTag("wan_set_label","DNS3_text").hide();
	        }
	        else
	        {
	        	if(getTag("wan_set_label","WanAddresstype_select").select.entity.value == "1")
		     		{
			    		getTag("wan_set_label","WanIPaddress_text").show();	
	        		getTag("wan_set_label","Wanmask_text").show();
	        		getTag("wan_set_label","DefaultGateway_text").show();
	        		getTag("wan_set_label","DNS1_text").show();
	        		getTag("wan_set_label","DNS2_text").show();
	        		getTag("wan_set_label","DNS3_text").show();
		     		}
		     		else
		     		{
			    		getTag("wan_set_label","WanIPaddress_text").hide();	
	        		getTag("wan_set_label","Wanmask_text").hide();
	        		getTag("wan_set_label","DefaultGateway_text").hide();
	        		getTag("wan_set_label","DNS1_text").hide();
	        		getTag("wan_set_label","DNS2_text").hide();
	        		getTag("wan_set_label","DNS3_text").hide();
		     		}
		     }
	 	  }
	 }	
}
function wanv4v6_disabled_show(){
	 if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "2")
	 {
	 	   if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 	    { 
	 	    	getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
	        getTag("wan_set_label","WanMTU_text").show();
	 	    	
	 	    }
	 	   else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	 	   	{  
	 	   		getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
			    getTag("wan_set_label","WanMTU_text").show();
	 	   		
	 	   	}
	 }
	 else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "3")
	 {   
	 	   if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 	    { 
	 	    	getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
	 	    }
	 	   else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	 	   	{ 
	 	   		if(getTag("wan_set_label","WanAddresstype_select").select.entity.value == "1")
		     	{
			    getTag("wan_set_label","WanIPaddress_text").show();	
	        getTag("wan_set_label","Wanmask_text").show();
	        getTag("wan_set_label","DefaultGateway_text").show();
	        getTag("wan_set_label","DNS1_text").show();
	        getTag("wan_set_label","DNS2_text").show();
	        getTag("wan_set_label","DNS3_text").show();
		     	}
		     	else
		     	{
			    getTag("wan_set_label","WanIPaddress_text").hide();	
	        getTag("wan_set_label","Wanmask_text").hide();
	        getTag("wan_set_label","DefaultGateway_text").hide();
	        getTag("wan_set_label","DNS1_text").hide();
	        getTag("wan_set_label","DNS2_text").hide();
	        getTag("wan_set_label","DNS3_text").hide();
		     }
	 	   	}
	 }
}
function Wan_linkmode_show(){
	Option60_disabled();
	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	{
			getTag("wan_set_label","WanAddress_select").hide();
			wan_disabled_show();
			getTag("wan_set_label","WanAddressv6_select").hide();
			getTag("wan_set_label","WanAddresstype_select").hide();
			wanv4v6_disabled_show();
			getTag("wan_set_label","Obtain_address_select").hide();
	    getTag("wan_set_label","Obtain_Gateway_select").hide();
	    getTag("wan_set_label","Obtain_dns_select").hide();
	    getTag("wan_set_label","dhcpPrefix_delegation_checkbox").hide();
	    getTag("wan_set_label","ipv6addrPrefix_text").hide();
	    getTag("wan_set_label","WanDslite_checkbox").hide();
		if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "8")
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
			}
		}else
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
			}
		}
	}
	else
	{
		if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1")
		{
			getTag("wan_set_label","WanAddress_select").show();
			wan_disabled_show();
			getTag("wan_set_label","WanAddressv6_select").hide();
			getTag("wan_set_label","WanAddresstype_select").hide();
			wanv4v6_disabled_show();
			getTag("wan_set_label","Obtain_address_select").hide();
	    getTag("wan_set_label","Obtain_Gateway_select").hide();
	    getTag("wan_set_label","Obtain_dns_select").hide();
	    getTag("wan_set_label","dhcpPrefix_delegation_checkbox").hide();
	    getTag("wan_set_label","ipv6addrPrefix_text").hide();
	    getTag("wan_set_label","WanDslite_checkbox").hide();
		}
		else
		{
			getTag("wan_set_label","WanAddress_select").hide();
			wan_disabled_show();
			getTag("wan_set_label","WanAddressv6_select").show();
			if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
			{
				getTag("wan_set_label","WanAddresstype_select").hide();
				wanv4v6_disabled_show();
			}
			else
			{
				getTag("wan_set_label","WanAddresstype_select").show();
				wanv4v6_disabled_show();
		  }
			getTag("wan_set_label","Obtain_address_select").show();
	    getTag("wan_set_label","Obtain_Gateway_select").show();
	    getTag("wan_set_label","Obtain_dns_select").show();
	    getTag("wan_set_label","dhcpPrefix_delegation_checkbox").show();
	    //getTag("wan_set_label","ipv6addrPrefix_text").show();
	    dhcpPrefix_disabled();
	    getTag("wan_set_label","WanDslite_checkbox").show();
		}
	}
if(MOD == "mod")
{
	if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1")
	{
		if(getTag("wan_set_label","WanAddress_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
				getTag("wan_set_label","Timeout_text").text.entity.value = "1200";
			}
		}
		else if(getTag("wan_set_label","WanAddress_select").select.entity.value != '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
	  ////nat
		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value != "1" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "2" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = true;
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = false;
			}
		}
		////dhcp
		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value != "1" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "2" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2' && getTag("wan_set_label","WanServicemode_select").select.entity.value == "4")
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2' && getTag("wan_set_label","WanServicemode_select").select.entity.value == "8")
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
			}
		}
	}
	else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "2")
	{
		if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
				getTag("wan_set_label","Timeout_text").text.entity.value = "1200";
			}
		}
		else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value != '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
	}
	else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "3")
	{
		if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
				getTag("wan_set_label","Timeout_text").text.entity.value = "1200";
			}
		}
		else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value != '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
				getTag("wan_set_label","Timeout_text").text.entity.value = "";
			}
		}
		
		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value != "1" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "2" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = true;
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = false;
			}
		}
		
		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value != "1" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "2" && getTag("wan_set_label","WanServicemode_select").select.entity.value != "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3"))
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
			}	
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2' && getTag("wan_set_label","WanServicemode_select").select.entity.value == "4")
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
			}
		}
		else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2' && getTag("wan_set_label","WanServicemode_select").select.entity.value == "8")
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
			}
		}
	}
}
if(MOD == "save")
{
	if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1")
	{
		if(getTag("wan_set_label","WanAddress_select").select.entity.value == '3' && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
			}
		}
		else
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			}
		}
	}
	else
	{
  	if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == '3' && MOD == "save" && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1492";
			}
		}
		else
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","WanMTU_text").text.entity.value = "1500";
			}
		}	
	}
	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2" && (getTag("wan_set_label","WanServicemode_select").select.entity.value == '1' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '2' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '3' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '5' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '6' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '7'))
  {
  	if(MOD == "save")
  	{
  		getTag("wan_set_label","WanServicemode_select").select.entity.value = '4';
  	}
  	WanServicemode_disabled();
  }
}
	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	{
		document.getElementById("WanServicemode_select").options[0].style.display='none';
		document.getElementById("WanServicemode_select").options[1].style.display='none';
		document.getElementById("WanServicemode_select").options[2].style.display='none';
		document.getElementById("WanServicemode_select").options[3].style.display='block';
		document.getElementById("WanServicemode_select").options[4].style.display='none';
		document.getElementById("WanServicemode_select").options[5].style.display='none';
		document.getElementById("WanServicemode_select").options[6].style.display='none';
		document.getElementById("WanServicemode_select").options[7].style.display='block';
		document.getElementById("WanServicemode_select").options[0].disabled = true;
		document.getElementById("WanServicemode_select").options[1].disabled = true;
		document.getElementById("WanServicemode_select").options[2].disabled = true;
		document.getElementById("WanServicemode_select").options[4].disabled = true;
		document.getElementById("WanServicemode_select").options[5].disabled = true;
		document.getElementById("WanServicemode_select").options[6].disabled = true;
	}
	else
	{
		document.getElementById("WanServicemode_select").options[0].style.display='block';
		document.getElementById("WanServicemode_select").options[1].style.display='block';
		document.getElementById("WanServicemode_select").options[2].style.display='block';
		document.getElementById("WanServicemode_select").options[3].style.display='block';
		document.getElementById("WanServicemode_select").options[4].style.display='block';
		document.getElementById("WanServicemode_select").options[5].style.display='block';
		document.getElementById("WanServicemode_select").options[6].style.display='block';
		document.getElementById("WanServicemode_select").options[7].style.display='block';
		document.getElementById("WanServicemode_select").options[0].disabled = false;
		document.getElementById("WanServicemode_select").options[1].disabled = false;
		document.getElementById("WanServicemode_select").options[2].disabled = false;
		document.getElementById("WanServicemode_select").options[4].disabled = false;
		document.getElementById("WanServicemode_select").options[5].disabled = false;
		document.getElementById("WanServicemode_select").options[6].disabled = false;
	}
	//////
	if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1")//v4
	{  
		   if(getTag("wan_set_label","WanAddress_select").select.entity.value == "3")
	 	    { 
	 	    	 if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	  getTag("wan_set_label","NAT_Enable").hide();
	 	    	  getTag("wan_set_label","WanUserName_text").hide();
	 	    	  getTag("wan_set_label","WanPassword_text").hide();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	  getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	  getTag("wan_set_label","Dialingmode_select").hide();
	 	    	  getTag("wan_set_label","Timeout_text").hide();
	 	       }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	       	WanServicemode_disabled();
	 	       	if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
	 	      	{
	 	      		getTag("wan_set_label","NAT_Enable").hide();
	 	    	  }
	 	    	  else
	 	    	  {
	 	    	  	getTag("wan_set_label","NAT_Enable").show();
	 	    	  }
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	       }
	 	    }
	 	   else if(getTag("wan_set_label","WanAddress_select").select.entity.value == "1")
	 	    {
          if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	   			{
	   				getTag("wan_set_label","NAT_Enable").hide();
	   				getTag("wan_set_label","WanIPaddress_text").hide();
	   				getTag("wan_set_label","Wanmask_text").hide();
	   				getTag("wan_set_label","DefaultGateway_text").hide();
	   				getTag("wan_set_label","DNS1_text").hide();
	   				getTag("wan_set_label","DNS2_text").hide();
	   				getTag("wan_set_label","DNS3_text").hide();
	   			}
	   			else
	   			{
	   				WanServicemode_disabled();
	   				if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
	 	      	{
	 	      		getTag("wan_set_label","NAT_Enable").hide();
	 	    	  }
	 	    	  else
	 	    	  {
	 	    	  	getTag("wan_set_label","NAT_Enable").show();
	 	    	  }
	   				getTag("wan_set_label","WanIPaddress_text").show();
	   				getTag("wan_set_label","Wanmask_text").show();
	   				getTag("wan_set_label","DefaultGateway_text").show();
	   				getTag("wan_set_label","DNS1_text").show();
	   				getTag("wan_set_label","DNS2_text").show();
	   				getTag("wan_set_label","DNS3_text").show();
	   			}	 	    	
	 	    }
	 	   else if(getTag("wan_set_label","WanAddress_select").select.entity.value == "2")
	 	    {
	 	    	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	   			{
	 	    		getTag("wan_set_label","NAT_Enable").hide();
	 	    	}
	 	    	else
	 	    	{
	 	    		WanServicemode_disabled();
	 	    		if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
	 	      	{
	 	      		getTag("wan_set_label","NAT_Enable").hide();
	 	    	  }
	 	    	  else
	 	    	  {
	 	    	  	getTag("wan_set_label","NAT_Enable").show();
	 	    	  }
	 	    	}
	 	    }
	}
  else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "2")//v6
	{
	 	   if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 	    { 
	 	    	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	   getTag("wan_set_label","WanUserName_text").hide();
	 	    	   getTag("wan_set_label","WanPassword_text").hide();
	 	    	   getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	   getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	   getTag("wan_set_label","Dialingmode_select").hide();
	 	    	   getTag("wan_set_label","Timeout_text").hide();
	 	    	   getTag("wan_set_label","WanDslite_checkbox").hide();
	 	    	   getTag("wan_set_label","SetupMode_select").hide();
	 	    	   getTag("wan_set_label","aftraddr_text").hide();
	 	    	 }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	    	  getTag("wan_set_label","WanDslite_checkbox").show();
	 	    	  WanServicemode_disabled();
	 	       }
	 	    }
	 	   else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	 	   	{  
	 	   		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	{
	 	   			getTag("wan_set_label","WanDslite_checkbox").hide();
	 	   	  }
	 	   	  else
	 	   	  {
	 	   	  	getTag("wan_set_label","WanDslite_checkbox").show();
	 	   	  }
	 	   		WanDslite_disabled();
					SetupMod_disabled();	
	 	   	}
	 }
	 else if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "3")//v4/v6
	 {  
	 	   if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 	    { 
	 	    	 if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	 {
	 	    	  getTag("wan_set_label","WanUserName_text").hide();
	 	    	  getTag("wan_set_label","WanPassword_text").hide();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").hide();
	 	    	  getTag("wan_set_label","NAT_Enable").hide();
	 	    	  getTag("wan_set_label","AuthenticationType_select").hide();
	 	    	  getTag("wan_set_label","Dialingmode_select").hide();
	 	    	  getTag("wan_set_label","Timeout_text").hide();
	 	    	  getTag("wan_set_label","WanIPaddress_text").hide();	
	        	getTag("wan_set_label","Wanmask_text").hide();
	       	 	getTag("wan_set_label","DefaultGateway_text").hide();
	        	getTag("wan_set_label","DNS1_text").hide();
	        	getTag("wan_set_label","DNS2_text").hide();
	        	getTag("wan_set_label","DNS3_text").hide();
	 	    	 }
	 	      else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1")
	 	       {
	 	       	WanServicemode_disabled();
	 	      	if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
	 	      	{
	 	      		getTag("wan_set_label","NAT_Enable").hide();
	 	    	  }
	 	    	  else
	 	    	  {
	 	    	  	getTag("wan_set_label","NAT_Enable").show();
	 	    	  }
	 	    	  getTag("wan_set_label","WanUserName_text").show();
	 	    	  getTag("wan_set_label","WanPassword_text").show();
	 	    	  getTag("wan_set_label","pppoeProxy_Enable").show();
	 	    	  getTag("wan_set_label","AuthenticationType_select").show();
	 	    	  getTag("wan_set_label","Dialingmode_select").show();
	 	    	  getTag("wan_set_label","Timeout_text").show();
	 	    	  if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "3")
	 	    	  {
	 	    	  	getTag("wan_set_label","WanIPaddress_text").hide();	
	        		getTag("wan_set_label","Wanmask_text").hide();
	        		getTag("wan_set_label","DefaultGateway_text").hide();
	        		getTag("wan_set_label","DNS1_text").hide();
	        		getTag("wan_set_label","DNS2_text").hide();
	        		getTag("wan_set_label","DNS3_text").hide();
	          }
	          else 
	          {
	          	if(getTag("wan_set_label","WanAddresstype_select").select.entity.value == "2")
	          	{
	          		getTag("wan_set_label","WanIPaddress_text").hide();	
	        			getTag("wan_set_label","Wanmask_text").hide();
	        			getTag("wan_set_label","DefaultGateway_text").hide();
	        			getTag("wan_set_label","DNS1_text").hide();
	        			getTag("wan_set_label","DNS2_text").hide();
	        			getTag("wan_set_label","DNS3_text").hide();
	        		}
	        		else
	        		{
	        			getTag("wan_set_label","WanIPaddress_text").show();	
	        			getTag("wan_set_label","Wanmask_text").show();
	        			getTag("wan_set_label","DefaultGateway_text").show();
	        			getTag("wan_set_label","DNS1_text").show();
	        			getTag("wan_set_label","DNS2_text").show();
	        			getTag("wan_set_label","DNS3_text").show();
	        		}
	          }
	 	       }
	 	    	
	 	    }
	 	   else if(getTag("wan_set_label","WanAddressv6_select").select.entity.value == "IP")
	 	   	{ 
	 	   		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
	 	    	{
	 	    		getTag("wan_set_label","NAT_Enable").hide();
	 	    		getTag("wan_set_label","WanIPaddress_text").hide();	
	        	getTag("wan_set_label","Wanmask_text").hide();
	        	getTag("wan_set_label","DefaultGateway_text").hide();
	        	getTag("wan_set_label","DNS1_text").hide();
	        	getTag("wan_set_label","DNS2_text").hide();
	        	getTag("wan_set_label","DNS3_text").hide();
	 	      }
	 	      else
	 	      {
	 	      	WanServicemode_disabled();
	 	      	if(getTag("wan_set_label","WanServicemode_select").select.entity.value == "1" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "2" || getTag("wan_set_label","WanServicemode_select").select.entity.value == "3")
	 	      	{
	 	      		getTag("wan_set_label","NAT_Enable").hide();
	 	    	  }
	 	    	  else
	 	    	  {
	 	    	  	getTag("wan_set_label","NAT_Enable").show();
	 	    	  }
	 	      	if(getTag("wan_set_label","WanAddresstype_select").select.entity.value == "2")
	          	{
	          		getTag("wan_set_label","WanIPaddress_text").hide();	
	        			getTag("wan_set_label","Wanmask_text").hide();
	        			getTag("wan_set_label","DefaultGateway_text").hide();
	        			getTag("wan_set_label","DNS1_text").hide();
	        			getTag("wan_set_label","DNS2_text").hide();
	        			getTag("wan_set_label","DNS3_text").hide();
	        		}
	        		else
	        		{
	        			getTag("wan_set_label","WanIPaddress_text").show();	
	        			getTag("wan_set_label","Wanmask_text").show();
	        			getTag("wan_set_label","DefaultGateway_text").show();
	        			getTag("wan_set_label","DNS1_text").show();
	        			getTag("wan_set_label","DNS2_text").show();
	        			getTag("wan_set_label","DNS3_text").show();
	        		}
	 	      }
	 	   	}
	 }
}
function WanServicemode_disabled(){
if(MOD == "mod")
{
	if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2' && getTag("wan_set_label","WanServicemode_select").select.entity.value == '4')
	{
		if(MOD == "save")
		{
			getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
		}
	}
	else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2' && getTag("wan_set_label","WanServicemode_select").select.entity.value == '8')
	{
		if(MOD == "save")
		{
			getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
		}
	}
	else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value == '4' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '5' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '6' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '7' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '8'))
	{
		if(MOD == "save")
		{
			getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
			getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = true;
		}
	}
	else if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '1' && (getTag("wan_set_label","WanServicemode_select").select.entity.value == '1' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '2' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '3'))
	{
		if(MOD == "save")
		{
			getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
			getTag("wan_set_label","NAT_Enable").checkbox.entity.checked = false;
		}
	}
}
  if(MOD == "save" && getTag("wan_set_label","Wan_linkmode_select").select.entity.value == '2')
	{
		if(getTag("wan_set_label","WanServicemode_select").select.entity.value == '8')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = false;
			}
		}
		else if(getTag("wan_set_label","WanServicemode_select").select.entity.value == '4')
		{
			if(MOD == "save")
			{
				getTag("wan_set_label","dhcpserver_Enable").checkbox.entity.checked = true;
			}
		}
	}	
	if(getTag("wan_set_label","WanServicemode_select").select.entity.value == '2' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '1' || getTag("wan_set_label","WanServicemode_select").select.entity.value == '3')
	{
		getTag("wan_set_label","wan_port").hide();
		getTag("wan_set_label","ssid_port").hide();
	  if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value != "2")
	  {
		   getTag("wan_set_label","dhcpserver_Enable").hide();
		   getTag("wan_set_label","NAT_Enable").hide();
	  }
	}
	else
	{
		getTag("wan_set_label","wan_port").show();
		getTag("wan_set_label","ssid_port").show();
		if(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "2")
		{
			if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value != "2")
	  	{
		   	getTag("wan_set_label","dhcpserver_Enable").show();
		   	getTag("wan_set_label","NAT_Enable").hide();
	  	}
		}
		else
		{
			if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value != "2")
	  	{
		   	getTag("wan_set_label","dhcpserver_Enable").show();
				getTag("wan_set_label","NAT_Enable").show();
			}
		}
	}
}
function vlanmode_disabled(){
	if(getTag("wan_set_label","vlanmode_select").select.entity.value == "UNTAG" || getTag("wan_set_label","vlanmode_select").select.entity.value == "TRANSPAREN")
	{
		getTag("wan_set_label","WanVlanID_text").hide();
		getTag("wan_set_label","Wan_802_1_P_select").hide();
	}
	else
	{
		getTag("wan_set_label","WanVlanID_text").show();
		getTag("wan_set_label","Wan_802_1_P_select").show();
	}
}
function Obtain_address_disabled(){
	if(getTag("wan_set_label","Obtain_address_select").select.entity.value == '1') 
	{
		getTag("wan_set_label","ipv6addr_text").show();
	}
	else
	{
		getTag("wan_set_label","ipv6addr_text").hide();
	}
}
function Obtain_Gateway_disabled(){
	if(getTag("wan_set_label","Obtain_Gateway_select").select.entity.value == '1') 
	{
		getTag("wan_set_label","ipv6Gate_text").show();
	}
	else
	{
		getTag("wan_set_label","ipv6Gate_text").hide();
	}
}
function Obtain_dns_disabled(){
	if(getTag("wan_set_label","WanIP_Mode_select").select.entity.value != '1')
{
	if(getTag("wan_set_label","Obtain_dns_select").select.entity.value == '1') 
	{
		getTag("wan_set_label","ManualDNS1_text").show();
		getTag("wan_set_label","ManualDNS2_text").show();
		getTag("wan_set_label","ManualDNS3_text").show();
	}
	else
	{
		getTag("wan_set_label","ManualDNS1_text").hide();
		getTag("wan_set_label","ManualDNS2_text").hide();
		getTag("wan_set_label","ManualDNS3_text").hide();
	}
}
else
{
	getTag("wan_set_label","ManualDNS1_text").hide();
		getTag("wan_set_label","ManualDNS2_text").hide();
		getTag("wan_set_label","ManualDNS3_text").hide();
}
}
function PPPExpand_disabled(){
  if(getTag("wan_set_label","PPPExpand_Enable").checkbox.entity.checked == true)
	 {
		getTag("wan_set_label","Obtain_address_select").select.entity.disabled = true;
		getTag("wan_set_label","ipv6addr_text").text.entity.disabled = true;
		getTag("wan_set_label","Obtain_Gateway_select").select.entity.disabled = true;
		getTag("wan_set_label","ipv6Gate_text").text.entity.disabled = true;
		getTag("wan_set_label","Obtain_dns_select").select.entity.disabled = true;
		getTag("wan_set_label","ManualDNS1_text").text.entity.disabled = true;
		getTag("wan_set_label","ManualDNS2_text").text.entity.disabled = true;
		getTag("wan_set_label","ManualDNS3_text").text.entity.disabled = true;
		getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.disabled = true;
		//getTag("wan_set_label","dhcpPrefix_delegation_checkbox").checkbox.entity.disabled = true;
	 }
	 else
	 {
		getTag("wan_set_label","Obtain_address_select").select.entity.disabled = false;
		getTag("wan_set_label","ipv6addr_text").text.entity.disabled = false;
		getTag("wan_set_label","Obtain_Gateway_select").select.entity.disabled = false;
		getTag("wan_set_label","ipv6Gate_text").text.entity.disabled = false;
		getTag("wan_set_label","Obtain_dns_select").select.entity.disabled = false;
		getTag("wan_set_label","ManualDNS1_text").text.entity.disabled = false;
		getTag("wan_set_label","ManualDNS2_text").text.entity.disabled = false;
		getTag("wan_set_label","ManualDNS3_text").text.entity.disabled = false;
		getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.disabled = false;
		//getTag("wan_set_label","dhcpPrefix_delegation_checkbox").checkbox.entity.disabled = false;
	 }
}
function DSCP_disabled(){
	if(getTag("wan_set_label","DSCP_Enable").checkbox.entity.checked == true)
	{
		getTag("wan_set_label","DSCP_text").text.entity.disabled = false;
	}
	else
	{
		getTag("wan_set_label","DSCP_text").text.entity.disabled = true;
	}
}
function WanDslite_disabled(){
	if(getTag("wan_set_label","WanDslite_checkbox").checkbox.entity.checked == true)
	{ 
		getTag("wan_set_label","SetupMode_select").show();
		if(getTag("wan_set_label","SetupMode_select").select.entity.value == '0')
		{
			getTag("wan_set_label","aftraddr_text").hide();
		}
		else
		{
			getTag("wan_set_label","aftraddr_text").show();
		}
	}
	else
	{ 
		getTag("wan_set_label","SetupMode_select").hide();
		getTag("wan_set_label","aftraddr_text").hide();
	}
}
function SetupMod_disabled(){
	if(getTag("wan_set_label","SetupMode_select").select.entity.value == '0')
	{
		getTag("wan_set_label","aftraddr_text").hide();
	}
	else
	{
		getTag("wan_set_label","aftraddr_text").show();
	}
}
function dhcpPrefix_disabled(){
	if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[0].radio.entity.checked == true)
	{
		getTag("wan_set_label","ipv6addrPrefix_text").hide();
	}
	else if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[1].radio.entity.checked == true)
	{
		getTag("wan_set_label","ipv6addrPrefix_text").show();
	}
	else if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[2].radio.entity.checked == true)
	{
		getTag("wan_set_label","ipv6addrPrefix_text").hide();
	}
	else if(getTag("wan_set_label","dhcpPrefix_delegation_checkbox").panel[3].radio.entity.checked == true)
	{
		getTag("wan_set_label","ipv6addrPrefix_text").hide();
	}
}
function vlan_disabled(){
	if(getTag("wan_set_label","vlanenabled_checkbox").checkbox.entity.checked)
	{ 
		getTag("wan_set_label","WanVlanID_text").text.entity.disabled = false;
		//getTag("wan_set_label","Wan_802_1_P_select").select.entity.disabled = false;
		getTag("wan_set_label","Wan_802_1_P_select").show();
		getTag("wan_set_label","wan802enabled_checkbox").show();
		wan802_disabled();
	}
	else
	{
		getTag("wan_set_label","WanVlanID_text").text.entity.disabled = true;
		//getTag("wan_set_label","Wan_802_1_P_select").select.entity.disabled = true;
		getTag("wan_set_label","Wan_802_1_P_select").hide();
		getTag("wan_set_label","wan802enabled_checkbox").hide();
	}
}
function Option60_disabled() {
	if ((getTag("wan_set_label","WanIP_Mode_select").select.entity.value == "1") &&
		(getTag("wan_set_label","Wan_linkmode_select").select.entity.value == "1") &&
		(getTag("wan_set_label","WanAddress_select").select.entity.value == "2"))
	{
		getTag("wan_set_label","Option60enabled_checkbox").show();
		if (MOD == "save") {
			if(getTag("wan_set_label","Option60enabled_checkbox").checkbox.entity.checked){
				getTag("wan_set_label","Option60_text").show();
				getTag("wan_set_label","Option60_text").text.entity.value = "600831STB";
			}else {
				getTag("wan_set_label","Option60_text").hide();
				getTag("wan_set_label","Option60_text").text.entity.value = "";
			}
		}else if (MOD == "mod") {
			if (getTag("wan_set_label","Option60enabled_checkbox").checkbox.entity.checked ) {
				getTag("wan_set_label","Option60_text").show();
			}else {
				getTag("wan_set_label","Option60_text").hide();
			}
		}
	}
	else
	{
		getTag("wan_set_label","Option60enabled_checkbox").hide();
		getTag("wan_set_label","Option60_text").hide();
		if (MOD == "save") {
			getTag("wan_set_label","Option60enabled_checkbox").checkbox.entity.checked = false;
			getTag("wan_set_label","Option60_text").text.entity.value = "";
		}
	}

}

function wan802_disabled(){
	if(getTag("wan_set_label","wan802enabled_checkbox").checkbox.entity.checked)
	{ 
		getTag("wan_set_label","Wan_802_1_P_select").select.entity.disabled = false;
	}
	else
	{
		getTag("wan_set_label","Wan_802_1_P_select").select.entity.disabled = true;
	}
}

function Cancel_addwanlist(){
	$.Refresh();
}
/************************************* 网络》网络设置》vlan绑定 *************************************/
function init_vlan_set(){
	creat_vlanconnect_tab();
}
function creat_vlanconnect_tab(){
	$.CurrentApp = "NN_VLAN";
getRequestData("vlan_binding_show",{"no":"no"},function(data){
	  for(var j in data.vlan_connect_list)
		{
			if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x01)
			{
				data.vlan_connect_list[j].VLANPort = "LAN1";
			}
			else if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x02)
			{
				data.vlan_connect_list[j].VLANPort = "LAN2";
			}
			else if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x04)
			{
				data.vlan_connect_list[j].VLANPort = "LAN3";
			}
			else if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x08)
			{
				data.vlan_connect_list[j].VLANPort = "LAN4";
			}
			else if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x10)
			{
				data.vlan_connect_list[j].VLANPort = "SSID1";
			}
			else if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x20)
			{
				data.vlan_connect_list[j].VLANPort = "SSID2";
			}
			else if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x40)
			{
				data.vlan_connect_list[j].VLANPort = "SSID3";
			}
			else if(parseInt(data.vlan_connect_list[j].VLANPort) == 0x80)
			{
				data.vlan_connect_list[j].VLANPort = "SSID4";
			}
			else
			{
				data.vlan_connect_list[j].VLANPort = "";
			}
		}
		//setAppTagData(data);
		var tab = getTag("VLAN_info","vlan_connect_list").tab;
		if(tab.tbody){
			tab.data = data.vlan_connect_list;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(data.vlan_connect_list);
		}
		conmode_sel();
	});	
}
function conmode_sel(tagname,selname){
	var rowarry = getTag("VLAN_info","vlan_connect_list").tab.tbody.Rows;
  for(var i=0;i < rowarry.length;i++)
	{ 
	  if(rowarry[i].Cells[1].select_a.entity.value == 1)
	   {
	   		rowarry[i].Cells[2].text_b.entity.disabled = true;
	   	//rowarry[i].Cells[2].hide();
	   }
	  else
	   {
	   	//rowarry[i].Cells[2].show();
	  		rowarry[i].Cells[2].text_b.entity.disabled = false;
	   }
	}
}
function add_vlantable_save(){
	MOD = "save";
	var rowarry = getTag("VLAN_info","vlan_connect_list").tab.tbody.Rows;
	var obj = new Object();
	obj.mode = "save";
	
	for(var i=0;i < rowarry.length;i++)
	{
		//eval('var VLANPort_'+i+' = parseInt('+i+'+1);');
		//eval('obj.VLANPort_'+i+' = VLANPort_'+i+';');
		if(i == 0)
		{
			obj.VLANPort_0 = 0x01;
		}
		else if(i == 1)
		{
			obj.VLANPort_1 = 0x02;
		}
		else if(i == 2)
		{
			obj.VLANPort_2 = 0x04;
		}
		else if(i == 3)
		{
			obj.VLANPort_3 = 0x08;
		}
		else if(i == 4)
		{
			obj.VLANPort_4 = 0x10;
		}
		else if(i == 5)
		{
			obj.VLANPort_5 = 0x20;
		}
		else if(i == 6)
		{
			obj.VLANPort_6 = 0x40;
		}
		else if(i == 7)
		{
			obj.VLANPort_7 = 0x80;
		}
		
		eval('var Connectmode_'+i+' = rowarry[i].Cells[1].select_a.entity.value;');
		eval('obj.Connectmode_'+i+' = Connectmode_'+i+';');
		if(rowarry[i].Cells[1].select_a.entity.value == 0)
		{
			var strtext = new Array();
			if(rowarry[i].Cells[2].text_b.entity.value == "")
			{
				checkShow(rowarry[i].Cells[2].text_b,$.CommonLan['empty_err']);return;
			}
			else
			{
				strtext = rowarry[i].Cells[2].text_b.entity.value.split(",");
				for(var j=0;j<strtext.length;j++)
				{
		   		var vlandata = new Array();
			 		vlandata = strtext[j].split("/");
		   		if(vlandata[0] == "0" || vlandata[0] == "1" || vlandata[1] == "0" || vlandata[1] == "1")
		   		{
		   				checkShow(rowarry[i].Cells[2].text_b,$.CommonLan['range_err0']);return;
		   		}
		
	  		}
	  	}
		eval('var Connectport_'+i+' = rowarry[i].Cells[2].text_b.entity.value;');
		eval('obj.Connectport_'+i+' = Connectport_'+i+';');
	  }
	}
	setAppDataurl('save','vlan_binding_set',obj,function(data){
		$.Refresh();
		});
	
}
function Cancel_vlantable(){
	$.Refresh();
}
