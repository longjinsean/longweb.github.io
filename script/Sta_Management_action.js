/************************************* 状态》ITMS远程管理》交互建立 *************************************/
function init_tr069satus_set(){
	$.CurrentApp = "SM_Interactive";
	getRequestData("itms_report_show",{"no":"no"},function(data){
		
		var onetagtab = getTag("Title_tr069_satus_label","utr069_satus_list").tab;
		if(onetagtab.thead){
			onetagtab.data = data;
			onetagtab.refresh();
		}else{
			//解析主动上报
			if(data.utr069_satus_list[0].Table_itms_1_Report_table == 0)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['report_success'];
		   }
	   	else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 1)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['unreporting'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 2)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['report_noresponse'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_1_Report_table == 3)
		   {
			   data.utr069_satus_list[0].Table_itms_1_Report_table = $.CommonLan['report_interrupt'];
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
		   	 data.utr069_satus_list[0].Table_itms_1_Report_table =$.CommonLan['unknow_status'];
		   }
		   //解析接受ITMS连接
		   if(data.utr069_satus_list[0].Table_itms_2_link_table == 0)
		   {
			   data.utr069_satus_list[0].Table_itms_2_link_table = $.CommonLan['itmsstatus2'];
		   }
	   	else if(data.utr069_satus_list[0].Table_itms_2_link_table == 1)
		   {
			   data.utr069_satus_list[0].Table_itms_2_link_table = $.CommonLan['itmsstatus0'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_2_link_table == 2)
		   {
			   data.utr069_satus_list[0].Table_itms_2_link_table = $.CommonLan['itmsstatus2'];
		   }
		  else if(data.utr069_satus_list[0].Table_itms_2_link_table == 3)
		   {
			   data.utr069_satus_list[0].Table_itms_2_link_table = $.CommonLan['itmsstatus2'];
		   }
		  else
		   {
		   	 data.utr069_satus_list[0].Table_itms_2_link_table =$.CommonLan['unknow_status'];
		   }
		    getTag("Title_tr069_satus_label","utr069_satus_list").data = data.utr069_satus_list;
			onetagtab.createTableone(data.utr069_satus_list);
		}
		
		setAppTagData(data.utr069_satus_list);
		init_service_setsatus_set();
	});
}
/************************************* 状态》ITMS远程管理》业务配置下发状态 *************************************/
function init_service_setsatus_set(){
	$.CurrentApp = "SM_Setupstatus";
	getRequestData("itms_service_show",{"no":"no"},function(data){
		
		var onetagtab = getTag("Title_service_set_satus_label","service_set_satus_list").tab;
		if(onetagtab.thead){
			onetagtab.data = data;
			onetagtab.refresh();
		}else{
			//解析业务下发状态
			if(data.service_set_satus_list[0].Table_service_state_1_table == "99")
		   {
			   data.service_set_satus_list[0].Table_service_state_1_table = $.CommonLan['Serviceissuedstate0'];
		   }
	   	else if(data.service_set_satus_list[0].Table_service_state_1_table == '0')
		   {
			   data.service_set_satus_list[0].Table_service_state_1_table = $.CommonLan['Serviceissuedstate3'];
		   }
		  else if(data.service_set_satus_list[0].Table_service_state_1_table == '1')
		   {
			   data.service_set_satus_list[0].Table_service_state_1_table = $.CommonLan['Serviceissuedstate1'];
		   }
		  else if(data.service_set_satus_list[0].Table_service_state_1_table == '2')
		   {
			   data.service_set_satus_list[0].Table_service_state_1_table = $.CommonLan['Serviceissuedstate2'];
		   }
		  else
		   {
		   	 data.service_set_satus_list[0].Table_service_state_1_table =$.CommonLan['unknow_status'];
		   }
		   getTag("Title_service_set_satus_label","service_set_satus_list").data = data.service_set_satus_list;
			onetagtab.createTableone(data.service_set_satus_list);
		}
		
		
		setAppTagData(data);
	});
}