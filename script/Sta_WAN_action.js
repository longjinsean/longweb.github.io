/************************************* 状态》网络侧信息》IP连接信息 *************************************/

function init_IPlink_set(){
	$.CurrentApp = "SW_IPinfo";
	getRequestData("wan_ipconnectinfo_show",{"no":"no"},function(data){
		///ipv4
	if(data.ipv4_stat_list.length != 0)
	{
		for(var i in data.ipv4_stat_list)
		{
	  	if(data.ipv4_stat_list[i].Table_wan_ipv4_1_2_enable_table == '0')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_2_enable_table = $.CommonLan['close'];
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_2_enable_table == '1')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_2_enable_table = $.CommonLan['open'];
			}
			else
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_2_enable_table = "";
			}
	  //////////
	    if(data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table == '0')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table == '1')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table == '2')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table == '3')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = $.CommonLan['connected'];
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table == '4')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table == '5')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table == '6')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_3_linkstatus_table = "";
			}
	    //////////////
	    if(data.ipv4_stat_list[i].Table_wan_ipv4_1_4_AddressMode_table == '1')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_4_AddressMode_table = "static";
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_4_AddressMode_table == '2')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_4_AddressMode_table = "dhcp";
			}
			else if(data.ipv4_stat_list[i].Table_wan_ipv4_1_4_AddressMode_table == '3')
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_4_AddressMode_table = "pppoe";
			}
			else
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_4_AddressMode_table = "";
			}
			if((data.ipv4_stat_list[i].Table_wan_ipv4_1_8_PrimaryDNS_table.indexOf(",")) != -1)
			{
			data.ipv4_stat_list[i].Table_wan_ipv4_1_8_PrimaryDNS_table = data.ipv4_stat_list[i].Table_wan_ipv4_1_8_PrimaryDNS_table.split(',')[0];
		  }
			if(data.ipv4_stat_list[i].Table_wan_ipv4_1_8_PrimaryDNS_table == "," || data.ipv4_stat_list[i].Table_wan_ipv4_1_8_PrimaryDNS_table == ",,")
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_8_PrimaryDNS_table = " ";
			}
			if((data.ipv4_stat_list[i].Table_wan_ipv4_1_9_AlternateDNS_table.indexOf(",")) != -1)
			{
			data.ipv4_stat_list[i].Table_wan_ipv4_1_9_AlternateDNS_table = data.ipv4_stat_list[i].Table_wan_ipv4_1_9_AlternateDNS_table.split(',')[1];
		  }
			if(data.ipv4_stat_list[i].Table_wan_ipv4_1_9_AlternateDNS_table == "," || data.ipv4_stat_list[i].Table_wan_ipv4_1_9_AlternateDNS_table == ",,")
			{
				data.ipv4_stat_list[i].Table_wan_ipv4_1_9_AlternateDNS_table = " ";
			}
	  }
	 }
	  ///ipv6
	 if(data.ipv6_stat_list.length != 0)
	{
		for(var j in data.ipv6_stat_list)
		{
			if(data.ipv6_stat_list[j].Table_wan_ipv6_1_2_enable_table == '0')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_2_enable_table = $.CommonLan['close'];
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_2_enable_table == '1')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_2_enable_table = $.CommonLan['open'];
			}
			else
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_2_enable_table = "";
			}
		///////
		  if(data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table == '0')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table == '1')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table == '2')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table == '3')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = $.CommonLan['connected'];
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table == '4')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table == '5')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table == '6')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = $.CommonLan['unconnected'];
			}
			else
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_3_linkstatus_table = "";
			}
		////////
		  if(data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table == '1')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table = "none";
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table == '2')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table = "Static";
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table == '3')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table = "PD";
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table == '4')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table = "RA";
			}
			else
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_4_PrefixMode_table = "";
			}
		  ////////
		  if(data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table == '3')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table = "SLAAC";
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table == '1')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table = "static";
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table == '2')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table = "dhcpv6";
			}
			else if(data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table == '4')
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table = "auto";
			}
			else
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_6_IPmode_table = "";
			}	
			////
			if((data.ipv6_stat_list[j].Table_wan_ipv6_1_8_PrimaryDNS_table.indexOf(",")) != -1)
			{
			data.ipv6_stat_list[j].Table_wan_ipv6_1_8_PrimaryDNS_table = data.ipv6_stat_list[j].Table_wan_ipv6_1_8_PrimaryDNS_table.split(',')[0];
		  }
			if(data.ipv6_stat_list[j].Table_wan_ipv6_1_8_PrimaryDNS_table == "," || data.ipv6_stat_list[j].Table_wan_ipv6_1_8_PrimaryDNS_table == ",,")
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_8_PrimaryDNS_table = "";
			}
			if((data.ipv6_stat_list[j].Table_wan_ipv6_1_9_AlternateDNS_table.indexOf(",")) != -1)
			{
			data.ipv6_stat_list[j].Table_wan_ipv6_1_9_AlternateDNS_table = data.ipv6_stat_list[j].Table_wan_ipv6_1_9_AlternateDNS_table.split(',')[1];
		  }
			if(data.ipv6_stat_list[j].Table_wan_ipv6_1_9_AlternateDNS_table == "," || data.ipv6_stat_list[j].Table_wan_ipv6_1_9_AlternateDNS_table == ",,")
			{
				data.ipv6_stat_list[j].Table_wan_ipv6_1_9_AlternateDNS_table = "";
			}
		
		}
	}
	/*
	if(data.ipv4_Statistics_list.length != 0)
	{
		for(var k in data.ipv4_Statistics_list)
		{
		  data.ipv4_Statistics_list[k].Uplink_v4 = data.ipv4_Statistics_list[k].Uplink_v4 + "(KB)";
		  data.ipv4_Statistics_list[k].Downlink_v4 = data.ipv4_Statistics_list[k].Downlink_v4 + "(KB)";
	  }
	}
	if(data.ipv6_Statistics_list.length != 0)
	{
	  for(var t in data.ipv6_Statistics_list)
		{
		  data.ipv6_Statistics_list[t].Uplink_v6 = data.ipv6_Statistics_list[t].Uplink_v6 + "(KB)";
		  data.ipv6_Statistics_list[t].Downlink_v6 = data.ipv6_Statistics_list[t].Downlink_v6 + "(KB)";
	  }
  }*/
		setAppTagData(data);
		init_link_set();
	});
}
/************************************* 状态》网络侧信息》链路连接信息 *************************************/
function init_link_set(){
	$.CurrentApp = "SW_Linkinfo";
	getRequestData("pon_link_show",{"no":"no"},function(data){
		setAppTagData(data);
		////////////////////////////////////////////////////////////
		var Table_pon1_Networklinks_userlist = new Array();
		var bakobject = new Object();
		bakobject.Table_pon2_1_ponlink_table = data.Table_pon1_Networklinks_list[0].Table_pon2_1_ponlink_table;
		Table_pon1_Networklinks_userlist[0] = bakobject;
		////////////////////////////////////////////////////////////
		var Table_pon5_Performance_userlist = new Array();
		var bak1object = new Object();
		bak1object.Table_pon6_1_EmployerNum_table = data.Table_pon5_Performance_list[0].Table_pon6_1_EmployerNum_table;
		bak1object.Table_pon7_1_ReceiveNum_table = data.Table_pon5_Performance_list[0].Table_pon7_1_ReceiveNum_table;
		bak1object.Table_pon8_1_ReceiveByte_table = data.Table_pon5_Performance_list[0].Table_pon8_1_ReceiveByte_table;
		bak1object.Table_pon9_1_SendByte_table = data.Table_pon5_Performance_list[0].Table_pon9_1_SendByte_table;
		bak1object.Table_pon10_1_TXpower_table = data.Table_pon5_Performance_list[0].Table_pon10_1_TXpower_table;
		bak1object.Table_pon11_1_RXpower_table = data.Table_pon5_Performance_list[0].Table_pon11_1_RXpower_table;
		Table_pon5_Performance_userlist[0] = bak1object;
		////////////////////////////////////////////////////////////*湖北*/
		var Table_pon5_Performance_userlist_hubei = new Array();
		var hubeiobject = new Object();
		hubeiobject.Table_pon6_1_EmployerNum_table = data.Table_pon5_Performance_list[0].Table_pon6_1_EmployerNum_table;
		hubeiobject.Table_pon7_1_ReceiveNum_table = data.Table_pon5_Performance_list[0].Table_pon7_1_ReceiveNum_table;
		hubeiobject.Table_pon8_1_ReceiveByte_table = data.Table_pon5_Performance_list[0].Table_pon8_1_ReceiveByte_table;
		hubeiobject.Table_pon9_1_SendByte_table = data.Table_pon5_Performance_list[0].Table_pon9_1_SendByte_table;
		hubeiobject.Table_pon10_1_TXpower_table = data.Table_pon5_Performance_list[0].Table_pon10_1_TXpower_table;
		hubeiobject.Table_pon11_1_RXpower_table = data.Table_pon5_Performance_list[0].Table_pon11_1_RXpower_table;
		hubeiobject.Table_pon11_1_alarm_table = "";
		Table_pon5_Performance_userlist_hubei[0] = hubeiobject;
    ////////////////////////////////////////////////////////////加告警信息
    var Table_pon5_Performance_list_admin = new Array();
		var bak2object = new Object();
		bak2object.Table_pon6_1_EmployerNum_table = data.Table_pon5_Performance_list[0].Table_pon6_1_EmployerNum_table;
		bak2object.Table_pon7_1_ReceiveNum_table = data.Table_pon5_Performance_list[0].Table_pon7_1_ReceiveNum_table;
		bak2object.Table_pon8_1_ReceiveByte_table = data.Table_pon5_Performance_list[0].Table_pon8_1_ReceiveByte_table;
		bak2object.Table_pon9_1_SendByte_table = data.Table_pon5_Performance_list[0].Table_pon9_1_SendByte_table;
		bak2object.Table_pon10_1_TXpower_table = data.Table_pon5_Performance_list[0].Table_pon10_1_TXpower_table;
		bak2object.Table_pon11_1_RXpower_table = data.Table_pon5_Performance_list[0].Table_pon11_1_RXpower_table;
		bak2object.Table_pon12_1_Voltage_table = data.Table_pon5_Performance_list[0].Table_pon12_1_Voltage_table;
		bak2object.Table_pon13_1_Electric_table = data.Table_pon5_Performance_list[0].Table_pon13_1_Electric_table;
		bak2object.Table_pon14_1_Temperature_table = data.Table_pon5_Performance_list[0].Table_pon14_1_Temperature_table;
		bak2object.Table_pon11_1_alarm_table = "";
		Table_pon5_Performance_list_admin[0] = bak2object;
  
    ///////////////////////////////////////////////////////////////////
		var onetagtab = getTag("Title_pon_satus_label","Table_pon1_Networklinks_list").tab;
		if(onetagtab.thead){
			onetagtab.data = data.Table_pon1_Networklinks_list;
			onetagtab.refresh();
		}else{
			//pon链路连接状态解析
			if(data.Table_pon1_Networklinks_list[0].Table_pon2_1_ponlink_table == '1')
		   {
			   data.Table_pon1_Networklinks_list[0].Table_pon2_1_ponlink_table = $.CommonLan['connected'];
		   }
	     else
		   {
		   	 data.Table_pon1_Networklinks_list[0].Table_pon2_1_ponlink_table = $.CommonLan['unconnected'];
		   }
		   //FEC能力
		   if(data.Table_pon1_Networklinks_list[0].Table_pon3_1_FECAbility_table == '0')
		   {
			   data.Table_pon1_Networklinks_list[0].Table_pon3_1_FECAbility_table = $.CommonLan['unsupported'];
		   }
	   	else if(data.Table_pon1_Networklinks_list[0].Table_pon3_1_FECAbility_table == '1')
		   {
			   data.Table_pon1_Networklinks_list[0].Table_pon3_1_FECAbility_table = $.CommonLan['supported'];
		   }
		  else
		   {
		   	 data.Table_pon1_Networklinks_list[0].Table_pon3_1_FECAbility_table ="";
		   }
		   //FEC状态
		   if(data.Table_pon1_Networklinks_list[0].Table_pon4_1_FECstatus_table == '0')
		   {
			   data.Table_pon1_Networklinks_list[0].Table_pon4_1_FECstatus_table = $.CommonLan['close'];
		   }
	   	else if(data.Table_pon1_Networklinks_list[0].Table_pon4_1_FECstatus_table == '1')
		   {
			   data.Table_pon1_Networklinks_list[0].Table_pon4_1_FECstatus_table = $.CommonLan['open'];
		   }
		  else
		   {
		   	 data.Table_pon1_Networklinks_list[0].Table_pon4_1_FECstatus_table ="";
		   }
		   getTag("Title_pon_satus_label","Table_pon1_Networklinks_list").data = data.Table_pon1_Networklinks_list;
			onetagtab.createTableone(data.Table_pon1_Networklinks_list);
		}
		
		var onetagtab2 = getTag("Title_pon_satus_label","Table_pon5_Performance_list").tab;
		if(onetagtab2.thead){
			onetagtab2.data = data.Table_pon5_Performance_list;
			onetagtab2.refresh();
		}else{
			if(Table_pon5_Performance_list_admin[0].Table_pon10_1_TXpower_table == "-inf" || Table_pon5_Performance_list_admin[0].Table_pon10_1_TXpower_table == "inf")
			{
				Table_pon5_Performance_list_admin[0].Table_pon10_1_TXpower_table = "-40.00(dBm)";
			}
			else
		  {
		  	Table_pon5_Performance_list_admin[0].Table_pon10_1_TXpower_table += "(dBm)"; 
		  }
			if(Table_pon5_Performance_list_admin[0].Table_pon11_1_RXpower_table == "-inf" || Table_pon5_Performance_list_admin[0].Table_pon11_1_RXpower_table == "inf")
			{
				Table_pon5_Performance_list_admin[0].Table_pon11_1_RXpower_table = "-40.00(dBm)";
			}
			else
		  {
		  	Table_pon5_Performance_list_admin[0].Table_pon11_1_RXpower_table += "(dBm)"; 
		  }
			Table_pon5_Performance_list_admin[0].Table_pon12_1_Voltage_table += "(V)"; 
			Table_pon5_Performance_list_admin[0].Table_pon13_1_Electric_table += "(mA)"; 
			Table_pon5_Performance_list_admin[0].Table_pon14_1_Temperature_table += $.CommonLan['temp']; 
			if(Table_pon5_Performance_list_admin[0].Table_pon11_1_alarm_table == "")
			{
				Table_pon5_Performance_list_admin[0].Table_pon11_1_alarm_table = $.CommonLan['noalarm'];
			}
			getTag("Title_pon_satus_label","Table_pon5_Performance_list").data = Table_pon5_Performance_list_admin;
			onetagtab2.createTableone(Table_pon5_Performance_list_admin);
		}
		
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////start
		var onetagtab3 = getTag("Title_pon_satus_label","Table_pon1_Networklinks_userlist").tab;
		if(onetagtab3.thead){
			onetagtab3.data = Table_pon1_Networklinks_userlist;
			onetagtab3.refresh();
		}else{
			//pon链路连接状态解析
			if(Table_pon1_Networklinks_userlist[0].Table_pon2_1_ponlink_table == '1')
		   {
			  	Table_pon1_Networklinks_userlist[0].Table_pon2_1_ponlink_table = $.CommonLan['connected'];
		   }
	     else
		   {
		   	 Table_pon1_Networklinks_userlist[0].Table_pon2_1_ponlink_table = $.CommonLan['unconnected'];
		   }
		  getTag("Title_pon_satus_label","Table_pon1_Networklinks_userlist").data = Table_pon1_Networklinks_userlist;
			onetagtab3.createTableone(Table_pon1_Networklinks_userlist);
		}
		////////////////////////
		var onetagtab4 = getTag("Title_pon_satus_label","Table_pon5_Performance_userlist").tab;
		if(onetagtab4.thead){
			onetagtab4.data = Table_pon5_Performance_userlist;
			onetagtab4.refresh();
		}else{
			if(Table_pon5_Performance_userlist[0].Table_pon10_1_TXpower_table == "-inf" || Table_pon5_Performance_userlist[0].Table_pon10_1_TXpower_table == "inf")
			{
				Table_pon5_Performance_userlist[0].Table_pon10_1_TXpower_table = "-40.00(dBm)";
			}
			else
		  {
		  	Table_pon5_Performance_userlist[0].Table_pon10_1_TXpower_table += "(dBm)"; 
		  }
			if(Table_pon5_Performance_userlist[0].Table_pon11_1_RXpower_table == "-inf" || Table_pon5_Performance_userlist[0].Table_pon11_1_RXpower_table == "inf")
			{
				Table_pon5_Performance_userlist[0].Table_pon11_1_RXpower_table = "-40.00(dBm)";
			}
			else
		  {
		  	Table_pon5_Performance_userlist[0].Table_pon11_1_RXpower_table += "(dBm)"; 
		  }
		  getTag("Title_pon_satus_label","Table_pon5_Performance_userlist").data = Table_pon5_Performance_userlist;
			onetagtab4.createTableone(Table_pon5_Performance_userlist);
		}
		////////////////////////*hubei*/
		var onetagtabhubei = getTag("Title_pon_satus_label","Table_pon5_Performance_userlist_hubei").tab;
		if(onetagtabhubei.thead){
			onetagtabhubei.data = Table_pon5_Performance_userlist_hubei;
			onetagtabhubei.refresh();
		}else{
			if(Table_pon5_Performance_userlist_hubei[0].Table_pon10_1_TXpower_table == "-inf" || Table_pon5_Performance_userlist_hubei[0].Table_pon10_1_TXpower_table == "inf")
			{
				Table_pon5_Performance_userlist_hubei[0].Table_pon10_1_TXpower_table = "-40.00(dBm)";
			}
			else
		  {
		  	Table_pon5_Performance_userlist_hubei[0].Table_pon10_1_TXpower_table += "(dBm)"; 
		  }
			if(Table_pon5_Performance_userlist_hubei[0].Table_pon11_1_RXpower_table == "-inf" || Table_pon5_Performance_userlist_hubei[0].Table_pon11_1_RXpower_table == "inf")
			{
				Table_pon5_Performance_userlist_hubei[0].Table_pon11_1_RXpower_table = "-40.00(dBm)";
			}
			else
		  {
		  	Table_pon5_Performance_userlist_hubei[0].Table_pon11_1_RXpower_table += "(dBm)"; 
		  }
		  if(Table_pon5_Performance_userlist_hubei[0].Table_pon11_1_alarm_table == "")
			{
				Table_pon5_Performance_userlist_hubei[0].Table_pon11_1_alarm_table = $.CommonLan['noalarm'];
			}
		  getTag("Title_pon_satus_label","Table_pon5_Performance_userlist_hubei").data = Table_pon5_Performance_userlist_hubei;
			onetagtabhubei.createTableone(Table_pon5_Performance_userlist_hubei);
		}
				
///////////////////////////////////////////////////////////////////////////////////////////end
	});
}
