/************************************* 网络》无线设置》无线基本设置 *************************************/
function init_nwbasic_set(){
		$.CurrentApp = "NW_Basic";
		getRequestData("wlan_basic_show",{"no":"no"},function(datav){
		if(datav.Bus_Switch_radio == '1')
		{
			getTag("wlan_set","Bus_Switch_radio").panel[0].radio.entity.checked = true;
			getTag("wlan_set","Bus_Switch_radio").panel[1].radio.entity.checked = false;
		}else
		{
			getTag("wlan_set","Bus_Switch_radio").panel[0].radio.entity.checked = false;
			getTag("wlan_set","Bus_Switch_radio").panel[1].radio.entity.checked = true;
		}
		var data = datav.wifi_basic_list[0];
		for(var i=0;i < 4;i++)
		{
			if(datav.wifi_basic_list[i].ssidindex_select == '1')
			{
				data = datav.wifi_basic_list[i];
			}
		}
		
		if(data.Broadcastssid_checkbox == "0")
		{
			getTag("wlan_set","Broadcastssid_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("wlan_set","Broadcastssid_checkbox").checkbox.entity.checked = false;	
		}
		if(data.Multi_media_checkbox == "1")
		{
			getTag("wlan_set","Multi_media_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("wlan_set","Multi_media_checkbox").checkbox.entity.checked = false;	
		}
		var array = new Array();
		var ssid = data.wlanssid.split("-");
		getTag("wlan_set","wlanssid").text_a.setValue(ssid[0]);
		getTag("wlan_set","wlanssid").text_b.setValue(ssid[1]);
		
	  getTag("wlan_set","WlanAuthMode_select").select.entity.value = data.WlanAuthMode_select;
	  getTag("wlan_set","WlanPwdMode_select").select.entity.value = data.WlanPwdMode_select;
	  getTag("wlan_set","CurrKeyindex_select").select.entity.value = data.CurrKeyindex_select;
	  getTag("wlan_set","WlanKeyBit_select").select.entity.value = data.WlanKeyBit_select;
	  getTag("wlan_set","WPSMode_select").select.entity.value = data.WPSMode_select;
	  
	  getTag("wlan_set","wlanssid").text_a.entity.disabled=true;
	  
		setAppTagData(data);
		
		WlanAuthMode_disabled(data);
		
		if(data.CONFIG_NC_WPS == '0')
		{
			getTag("wlan_set","WPSMode_select").hide();
			getTag("wlan_set","LocalPIN_text").hide();
		 	getTag("wlan_set","ClientPIN_text").hide();
		}else
		{
			/*getTag("wlan_set","WPSMode_select").show();
			getTag("wlan_set","LocalPIN_text").show();
		 	getTag("wlan_set","ClientPIN_text").show();*/
		}
		
		if(data.CONFIG_NC_WPA_ENTERPRISE == '0')
		{
			getTag("wlan_set","RASIUAserveradd_text").hide();
		 	getTag("wlan_set","RASIUSServerport_text").hide();
		 	getTag("wlan_set","RADIUSSharekey_text").hide();	
		}else
		{
			/*getTag("wlan_set","RASIUAserveradd_text").show();
		 	getTag("wlan_set","RASIUSServerport_text").show();
		 	getTag("wlan_set","RADIUSSharekey_text").show();	*/
		}
		setAppTagData(data);
		init_nwAdvanced_set();
		$.CurrentApp = "NW_Basic";
	});	
}

function ssidindex_init()
{
	$.CurrentApp = "NW_Basic";
	var currentindex = getTag("wlan_set","ssidindex_select").select.entity.value;
	getRequestData("wlan_basic_show",{"no":"no"},function(dataf){
		if(dataf.Bus_Switch_radio == '1')
		{
			getTag("wlan_set","Bus_Switch_radio").panel[0].radio.entity.checked = true;
			getTag("wlan_set","Bus_Switch_radio").panel[1].radio.entity.checked = false;
		}else
		{
			getTag("wlan_set","Bus_Switch_radio").panel[0].radio.entity.checked = false;
			getTag("wlan_set","Bus_Switch_radio").panel[1].radio.entity.checked = true;
		}
		var data = dataf.wifi_basic_list[0];
		for(var i=0;i < 4;i++)
		{
			if(dataf.wifi_basic_list[i].ssidindex_select == currentindex)
			{
				data = dataf.wifi_basic_list[i];
			}
		}
		if(data.wlanenable == '1')
		{
			getTag("wlan_set","wlanenable").panel[0].radio.entity.checked = true;
			getTag("wlan_set","wlanenable").panel[1].radio.entity.checked = false;
		}else
		{
			getTag("wlan_set","wlanenable").panel[0].radio.entity.checked = false;
			getTag("wlan_set","wlanenable").panel[1].radio.entity.checked = true;
		}
		if(data.Broadcastssid_checkbox == "0")
		{
			getTag("wlan_set","Broadcastssid_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("wlan_set","Broadcastssid_checkbox").checkbox.entity.checked = false;	
		}
		if(data.Multi_media_checkbox == "1")
		{
			getTag("wlan_set","Multi_media_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("wlan_set","Multi_media_checkbox").checkbox.entity.checked = false;	
		}
		var array = new Array();
		var ssid = data.wlanssid.split("-");
		getTag("wlan_set","wlanssid").text_a.setValue(ssid[0]);
		getTag("wlan_set","wlanssid").text_b.setValue(ssid[1]);
		getTag("wlan_set","wlanssid").text_a.entity.disabled=true;
	  getTag("wlan_set","WlanAuthMode_select").select.entity.value = data.WlanAuthMode_select;
	  getTag("wlan_set","WlanPwdMode_select").select.entity.value = data.WlanPwdMode_select;
	  getTag("wlan_set","CurrKeyindex_select").select.entity.value = data.CurrKeyindex_select;
	  getTag("wlan_set","WlanKeyBit_select").select.entity.value = data.WlanKeyBit_select;
	  getTag("wlan_set","WPSMode_select").select.entity.value = data.WPSMode_select;
	  
	  getTag("wlan_set","WAPPreShared_text").text.setValue(data.WAPPreShared_text);
	  getTag("wlan_set","WPARangrefreshtime_text").text.setValue(data.WPARangrefreshtime_text);
	  getTag("wlan_set","RASIUAserveradd_text").text.setValue(data.RASIUAserveradd_text);
	 	getTag("wlan_set","RASIUSServerport_text").text.setValue(data.RASIUSServerport_text);
	 	getTag("wlan_set","RADIUSSharekey_text").text.setValue(data.RADIUSSharekey_text);
	 	getTag("wlan_set","KeyOne_text").text.setValue(data.KeyOne_text);
	 	getTag("wlan_set","KeyTwo_text").text.setValue(data.KeyTwo_text);
	 	getTag("wlan_set","KeyThree_text").text.setValue(data.KeyThree_text);
	 	getTag("wlan_set","KeyFour_text").text.setValue(data.KeyFour_text);
	 	getTag("wlan_set","LocalPIN_text").text.setValue(data.LocalPIN_text);
	 	getTag("wlan_set","ClientPIN_text").text.setValue(data.ClientPIN_text);

		 //setAppTagData(data);
		
		WlanAuthMode_disabled(data);
		
		if(data.CONFIG_NC_WPS == '0')
		{
			getTag("wlan_set","WPSMode_select").hide();
			getTag("wlan_set","LocalPIN_text").hide();
		 	getTag("wlan_set","ClientPIN_text").hide();
		}else
		{
		}
		
		if(data.CONFIG_NC_WPA_ENTERPRISE == '0')
		{
			getTag("wlan_set","RASIUAserveradd_text").hide();
		 	getTag("wlan_set","RASIUSServerport_text").hide();
		 	getTag("wlan_set","RADIUSSharekey_text").hide();	
		}else
		{	
		}
		
	});	
}

function wlan_Certain(){
	$.CurrentApp = "NW_Basic";
	if(!checkTag(["wlan_set"])){return;}
	var ssidvalue = getTag("wlan_set","wlanssid").text_b.entity.value;
	if(!(/^[A-Za-z0-9]*$/g.test(ssidvalue)))
	{
		checkShow(getTag("wlan_set","wlanssid").text_b,$.CommonLan['ssid_err']);return;
	}
	if(ssidvalue.length > 23)
	{
		checkShow(getTag("wlan_set","wlanssid").text_b,$.CommonLan['ssid_err']);return;
	}
	var TimeWpa = getTag("wlan_set","WPARangrefreshtime_text").text.entity.value;
	if((600 > TimeWpa)||(TimeWpa > 86400))
	{
		checkShow(getTag("wlan_set","WPARangrefreshtime_text").text,$.CommonLan['WAPPreShared_err']);
		return;
	}
	var wappassword = getTag("wlan_set","WAPPreShared_text").text.entity.value;
	
	if((wappassword.length < 8)||(wappassword.length > 63))
	{
		checkShow(getTag("wlan_set","WAPPreShared_text").text,$.CommonLan['WAPPreShared_err2']);
		return;
	}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.ssidindex_select = getTag("wlan_set","ssidindex_select").select.entity.value;
	//obj.ssidindex_select = 1;
	if(getTag("wlan_set","wlanenable").panel[0].radio.entity.checked == true)
	{
		obj.wlanenable = "1";
	}else
		{
			obj.wlanenable = "0";
		}
	if(getTag("wlan_set","Bus_Switch_radio").panel[0].radio.entity.checked == true)
	{
		obj.Bus_Switch_radio = "1";
	}
	else
	{
			obj.Bus_Switch_radio = "0";
	}
	if(getTag("wlan_set","Broadcastssid_checkbox").checkbox.entity.checked)
	 {
	 	obj.Broadcastssid_checkbox = '0';
	 }
	else
	 {
	 	obj.Broadcastssid_checkbox = '1';
	 }
	 
	 if(getTag("wlan_set","Multi_media_checkbox").checkbox.entity.checked)
	 {
	 	obj.Multi_media_checkbox = '1';
	 }
	else
	 {
	 	obj.Multi_media_checkbox = '0';
	 }	 
	obj.wlanssid =getTag("wlan_set","wlanssid").text_a.entity.value + "-" + getTag("wlan_set","wlanssid").text_b.entity.value;
	obj.WlanAuthMode_select = getTag("wlan_set","WlanAuthMode_select").select.entity.value;
	obj.WlanPwdMode_select = getTag("wlan_set","WlanPwdMode_select").select.entity.value;
/*	obj.WlanWepPwd_select = getTag("wlan_set","WlanWepPwd_select").select.entity.value; */
	obj.WlanKeyBit_select = getTag("wlan_set","WlanKeyBit_select").select.entity.value;
	
	obj.CurrKeyindex_select = getTag("wlan_set","CurrKeyindex_select").select.entity.value;
	if (getTag("wlan_set","WlanAuthMode_select").select.entity.value == "8")
	{
		obj.WPSMode_select = getTag("wlan_set","WPSMode_select").select.entity.value;	
	}
	else
	{
		obj.WPSMode_select = '0';	
	}
	obj.WAPPreShared_text = getTag("wlan_set","WAPPreShared_text").text.entity.value;
	obj.WPARangrefreshtime_text = getTag("wlan_set","WPARangrefreshtime_text").text.entity.value;
	obj.RASIUAserveradd_text = getTag("wlan_set","RASIUAserveradd_text").text.entity.value;
	obj.RASIUSServerport_text = getTag("wlan_set","RASIUSServerport_text").text.entity.value;
	obj.RADIUSSharekey_text = getTag("wlan_set","RADIUSSharekey_text").text.entity.value;
	obj.KeyOne_text = getTag("wlan_set","KeyOne_text").text.entity.value;
	obj.KeyTwo_text = getTag("wlan_set","KeyTwo_text").text.entity.value;
	obj.KeyThree_text = getTag("wlan_set","KeyThree_text").text.entity.value;
	obj.KeyFour_text = getTag("wlan_set","KeyFour_text").text.entity.value;
	obj.LocalPIN_text = getTag("wlan_set","LocalPIN_text").text.entity.value;
	obj.ClientPIN_text = getTag("wlan_set","ClientPIN_text").text.entity.value;
	
	setAppDataurl('save','wlan_basic_set',obj,function(data){
		//$.Refresh();
		init_nwbasic_set();
		});	
}
function wlan_Cancel(){
	$.CurrentApp = "NW_Basic";
	$.Refresh();
}
/*function change_password(){
	getTag("wlan_set","WlanPassword_password").text.entity.type = "simple_text";
}*/
/************************************* 网络》无线设置》无线高级设置 *************************************/
function init_nwAdvanced_set(){
	$.CurrentApp = "NW_Advanced";
		getRequestData("wlan_advanced_show",{"no":"no"},function(data){
		/*if(data.WlanHide_checkbox == "1")
		{
			getTag("nw_Advanced_info","WlanHide_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("nw_Advanced_info","WlanHide_checkbox").checkbox.entity.checked = false;	
		}*/
	  getTag("nw_Advanced_info","WlanChannel_select").select.entity.value = data.WlanChannel_select;
	  getTag("nw_Advanced_info","WlanPlace_select").select.entity.value = data.WlanPlace_select;
	  getTag("nw_Advanced_info","WlanBandWidth_select").select.entity.value = data.WlanBandWidth_select;
	  getTag("nw_Advanced_info","WlanInterval_select").select.entity.value = data.WlanInterval_select;
	  getTag("nw_Advanced_info","WlanTransmit_select").select.entity.value = data.WlanTransmit_select;
	  
		setAppTagData(data);
	});		
}
function NW_Advanced_Certain(){
	$.CurrentApp = "NW_Advanced";
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	/*if(getTag("nw_Advanced_info","WlanHide_checkbox").checkbox.entity.checked)
	 {
	 	obj.WlanHide_checkbox = '1';
	 }
	else
	 {
	 	obj.WlanHide_checkbox = '0';
	 }*/
	obj.WlanChannel_select = getTag("nw_Advanced_info","WlanChannel_select").select.entity.value;
	obj.WlanPlace_select = getTag("nw_Advanced_info","WlanPlace_select").select.entity.value;
	obj.WlanBandWidth_select = getTag("nw_Advanced_info","WlanBandWidth_select").select.entity.value;
	obj.WlanInterval_select = getTag("nw_Advanced_info","WlanInterval_select").select.entity.value;
	obj.WlanTransmit_select = getTag("nw_Advanced_info","WlanTransmit_select").select.entity.value;
	obj.RFMode_select = getTag("nw_Advanced_info","RFMode_select").select.entity.value;
	
	setAppDataurl('save','wlan_advanced_set',obj,function(data){
		$.Refresh();
		});	
	
}
function NW_Advanced_Cancel(){
	$.CurrentApp = "NW_Advanced";
	$.Refresh();
}
/*-----------------------设置界面隐藏项------------------------------*/
function WlanAuthMode_disabled(data){
	$.CurrentApp = "NW_Basic";
	WlanAuthMode_show();
	WlanPwdMode_init();
	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "0")
	{
		 getTag("wlan_set","WlanKeyBit_select").hide();
		 getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPSMode_select").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").hide();
		 getTag("wlan_set","WAPPreShared_text").hide();
		 getTag("wlan_set","RASIUAserveradd_text").hide();
		 getTag("wlan_set","RASIUSServerport_text").hide();
		 getTag("wlan_set","RADIUSSharekey_text").hide();		 
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
		 getTag("wlan_set","LocalPIN_text").hide();
		 getTag("wlan_set","ClientPIN_text").hide();
		// getTag("wlan_set","WlanPwdMode_select").select.entity.value = "1";
		 document.getElementById("WlanPwdMode_select").options[0].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[3].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='none';
		
		 document.getElementById("WlanPwdMode_select").options[2].disabled = true;
		 document.getElementById("WlanPwdMode_select").options[3].disabled = true;
		 document.getElementById("WlanPwdMode_select").options[4].disabled = true;
		 if(getTag("wlan_set","WlanPwdMode_select").select.entity.value != "1" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "0")
		 {
         	 getTag("wlan_set","WlanPwdMode_select").select.entity.value = "1";
		 }
	}
	
	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "1")
	{
	   getTag("wlan_set","WlanKeyBit_select").show();
	   getTag("wlan_set","wlan_tips").show();
		 getTag("wlan_set","CurrKeyindex_select").show();
		 getTag("wlan_set","WPSMode_select").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").hide();
		 getTag("wlan_set","WAPPreShared_text").hide();
		 getTag("wlan_set","RASIUAserveradd_text").hide();
		 getTag("wlan_set","RASIUSServerport_text").hide();
		 getTag("wlan_set","RADIUSSharekey_text").hide();		 
		 getTag("wlan_set","KeyOne_text").show();
		 getTag("wlan_set","KeyTwo_text").show();
		 getTag("wlan_set","KeyThree_text").show();
		 getTag("wlan_set","KeyFour_text").show();
		 getTag("wlan_set","LocalPIN_text").hide();
		 getTag("wlan_set","ClientPIN_text").hide();
		// getTag("wlan_set","WlanPwdMode_select").select.entity.value = "1"
		 document.getElementById("WlanPwdMode_select").options[0].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[3].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='none';

		 document.getElementById("WlanPwdMode_select").options[0].disabled = true;
		 document.getElementById("WlanPwdMode_select").options[2].disabled = true;
		 document.getElementById("WlanPwdMode_select").options[3].disabled = true;
		 document.getElementById("WlanPwdMode_select").options[4].disabled = true;
		 if(getTag("wlan_set","WlanPwdMode_select").select.entity.value != "1")
		 {
		 	   getTag("wlan_set","WlanPwdMode_select").select.entity.value = "1";
		 }
	}

	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "2")
	{
	   getTag("wlan_set","WlanKeyBit_select").hide();
	   getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPSMode_select").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").show();
		 getTag("wlan_set","WAPPreShared_text").show();
		 getTag("wlan_set","RASIUAserveradd_text").hide();
		 getTag("wlan_set","RASIUSServerport_text").hide();
		 getTag("wlan_set","RADIUSSharekey_text").hide();		 
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
		 getTag("wlan_set","LocalPIN_text").hide();
		 getTag("wlan_set","ClientPIN_text").hide();
		// getTag("wlan_set","WlanPwdMode_select").select.entity.value = "3"
		 document.getElementById("WlanPwdMode_select").options[3].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[0].style.display='none'; 
	   document.getElementById("WlanPwdMode_select").options[0].disabled='true';
		 document.getElementById("WlanPwdMode_select").options[1].disabled='true';	
		 if(getTag("wlan_set","WlanPwdMode_select").select.entity.value != "2" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "3" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "4" )
		 {
		 	   getTag("wlan_set","WlanPwdMode_select").select.entity.value = "3";
		 }
	}

	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "3")
	{
	   getTag("wlan_set","WlanKeyBit_select").hide();
	   getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPSMode_select").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").show();
		 getTag("wlan_set","WAPPreShared_text").show();
		 getTag("wlan_set","RASIUAserveradd_text").hide();
		 getTag("wlan_set","RASIUSServerport_text").hide();
		 getTag("wlan_set","RADIUSSharekey_text").hide();		 
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
		 getTag("wlan_set","LocalPIN_text").hide();
		 getTag("wlan_set","ClientPIN_text").hide();
		// getTag("wlan_set","WlanPwdMode_select").select.entity.value = "2"
     document.getElementById("WlanPwdMode_select").options[3].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[0].style.display='none'; 
	   document.getElementById("WlanPwdMode_select").options[0].disabled='true';
		 document.getElementById("WlanPwdMode_select").options[1].disabled='true'; 
		 if(getTag("wlan_set","WlanPwdMode_select").select.entity.value != "2" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "3" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "4" )
		 {
		 	   getTag("wlan_set","WlanPwdMode_select").select.entity.value = "2";
		 }
	   
	}

	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "4")
	{
	   getTag("wlan_set","WlanKeyBit_select").hide();
	   getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPSMode_select").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").show();
		 getTag("wlan_set","WAPPreShared_text").show();
		 getTag("wlan_set","RASIUAserveradd_text").hide();
		 getTag("wlan_set","RASIUSServerport_text").hide();
		 getTag("wlan_set","RADIUSSharekey_text").hide();		 
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
		 getTag("wlan_set","LocalPIN_text").hide();
		 getTag("wlan_set","ClientPIN_text").hide();
		// getTag("wlan_set","WlanPwdMode_select").select.entity.value = "2"
		 document.getElementById("WlanPwdMode_select").options[3].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[0].style.display='none'; 
	   document.getElementById("WlanPwdMode_select").options[0].disabled='true';
		 document.getElementById("WlanPwdMode_select").options[1].disabled='true';
		 if(getTag("wlan_set","WlanPwdMode_select").select.entity.value != "2" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "3" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "4" )
		 {
		 	   getTag("wlan_set","WlanPwdMode_select").select.entity.value = "2";
		 }
	}
  if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "5")
  {
  	 getTag("wlan_set","WlanKeyBit_select").hide();
  	 getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPSMode_select").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").show();
		 getTag("wlan_set","WAPPreShared_text").hide();
		 getTag("wlan_set","RASIUAserveradd_text").show();
		 getTag("wlan_set","RASIUSServerport_text").show();
		 getTag("wlan_set","RADIUSSharekey_text").show();		 
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
		 getTag("wlan_set","LocalPIN_text").hide();
		 getTag("wlan_set","ClientPIN_text").hide();
		// getTag("wlan_set","WlanPwdMode_select").select.entity.value = "3"
	   document.getElementById("WlanPwdMode_select").options[3].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[0].style.display='none'; 
	   document.getElementById("WlanPwdMode_select").options[0].disabled='true';
		 document.getElementById("WlanPwdMode_select").options[1].disabled='true';
		 if(getTag("wlan_set","WlanPwdMode_select").select.entity.value != "2" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "3" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "4" )
		 {
		 	   getTag("wlan_set","WlanPwdMode_select").select.entity.value = "3";
		 }
  }
	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "6" || getTag("wlan_set","WlanAuthMode_select").select.entity.value == "7")
	{
	   getTag("wlan_set","WlanKeyBit_select").hide();
	   getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPSMode_select").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").show();
		 getTag("wlan_set","WAPPreShared_text").hide();
		 getTag("wlan_set","RASIUAserveradd_text").show();
		 getTag("wlan_set","RASIUSServerport_text").show();
		 getTag("wlan_set","RADIUSSharekey_text").show();		 
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
		 getTag("wlan_set","LocalPIN_text").hide();
		 getTag("wlan_set","ClientPIN_text").hide();
		// getTag("wlan_set","WlanPwdMode_select").select.entity.value = "2"
	   document.getElementById("WlanPwdMode_select").options[3].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='none';
		 document.getElementById("WlanPwdMode_select").options[0].style.display='none'; 
	   document.getElementById("WlanPwdMode_select").options[0].disabled='true';
		 document.getElementById("WlanPwdMode_select").options[1].disabled='true';
		 if(getTag("wlan_set","WlanPwdMode_select").select.entity.value != "2" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "3" && getTag("wlan_set","WlanPwdMode_select").select.entity.value != "4" )
		 {
		 	   getTag("wlan_set","WlanPwdMode_select").select.entity.value = "2";
		 }
	}

	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "8")
	{
	   getTag("wlan_set","WlanKeyBit_select").hide();
	   getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPSMode_select").show();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","WPARangrefreshtime_text").hide();
		 getTag("wlan_set","WAPPreShared_text").hide();
		 getTag("wlan_set","RASIUAserveradd_text").hide();
		 getTag("wlan_set","RASIUSServerport_text").hide();
		 getTag("wlan_set","RADIUSSharekey_text").hide();		 
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
		 getTag("wlan_set","WlanPwdMode_select").hide();
		 getTag("wlan_set","LocalPIN_text").show();
		 getTag("wlan_set","ClientPIN_text").show();
		 WPSMode_select_disable();
	}
	Key_disabled();
	
		if(data.CONFIG_NC_WPS == '0')
		{
			getTag("wlan_set","WPSMode_select").hide();
			getTag("wlan_set","LocalPIN_text").hide();
		 	getTag("wlan_set","ClientPIN_text").hide();
		}else
		{
			/*getTag("wlan_set","WPSMode_select").show();
			getTag("wlan_set","LocalPIN_text").show();
		 	getTag("wlan_set","ClientPIN_text").show();*/
		}
		
		if(data.CONFIG_NC_WPA_ENTERPRISE == '0')
		{
			getTag("wlan_set","RASIUAserveradd_text").hide();
		 	getTag("wlan_set","RASIUSServerport_text").hide();
		 	getTag("wlan_set","RADIUSSharekey_text").hide();	
		}else
		{
			/*getTag("wlan_set","RASIUAserveradd_text").show();
		 	getTag("wlan_set","RASIUSServerport_text").show();
		 	getTag("wlan_set","RADIUSSharekey_text").show();	*/
		}
		
	/*	if(getTag("wlan_set","WlanPwdMode_select").select.entity.value == "1")
		{
			getTag("wlan_set","wlan_tips").show();
		}else
		{
			getTag("wlan_set","wlan_tips").hide();
		}*/
	
}
 function WlanPwdMode_init()
 {
	 $.CurrentApp = "NW_Basic";
   	 document.getElementById("WlanPwdMode_select").options[0].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[1].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[2].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[3].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[4].style.display='block';
		 document.getElementById("WlanPwdMode_select").options[0].disabled = false;
		 document.getElementById("WlanPwdMode_select").options[1].disabled = false;
		 document.getElementById("WlanPwdMode_select").options[2].disabled = false;
		 document.getElementById("WlanPwdMode_select").options[3].disabled = false;
		 document.getElementById("WlanPwdMode_select").options[4].disabled = false;
 }
 
 function WlanAuthMode_show()
 {
	   $.CurrentApp = "NW_Basic";
 	   getTag("wlan_set","WlanPwdMode_select").show();
 	   getTag("wlan_set","WlanKeyBit_select").show();
 	   getTag("wlan_set","wlan_tips").show();
		 getTag("wlan_set","CurrKeyindex_select").show();
		 getTag("wlan_set","WPSMode_select").show();
		 getTag("wlan_set","WAPPreShared_text").show();
		 getTag("wlan_set","WPARangrefreshtime_text").show();
		 getTag("wlan_set","RASIUAserveradd_text").show();
		 getTag("wlan_set","RASIUSServerport_text").show();
		 getTag("wlan_set","RADIUSSharekey_text").show();	
		 getTag("wlan_set","KeyOne_text").show();
		 getTag("wlan_set","KeyTwo_text").show();
		 getTag("wlan_set","KeyThree_text").show();
		 getTag("wlan_set","KeyFour_text").show();
		 getTag("wlan_set","LocalPIN_text").show();
		 getTag("wlan_set","ClientPIN_text").show();
		 
 }
 
 function Key_disabled()
 {
	$.CurrentApp = "NW_Basic";
 	if(getTag("wlan_set","WlanAuthMode_select").select.entity.value == "0" && getTag("wlan_set","WlanPwdMode_select").select.entity.value == "1")
 	{
 		 getTag("wlan_set","WlanKeyBit_select").show();
 		 getTag("wlan_set","wlan_tips").show();
		 getTag("wlan_set","CurrKeyindex_select").show();
		 getTag("wlan_set","KeyOne_text").show();
		 getTag("wlan_set","KeyTwo_text").show();
		 getTag("wlan_set","KeyThree_text").show();
		 getTag("wlan_set","KeyFour_text").show();
  }
  if (getTag("wlan_set","WlanAuthMode_select").select.entity.value == "1" && getTag("wlan_set","WlanPwdMode_select").select.entity.value == "1")
  {
  	 getTag("wlan_set","WlanKeyBit_select").show();
  	 getTag("wlan_set","wlan_tips").show();
		 getTag("wlan_set","CurrKeyindex_select").show();
		 getTag("wlan_set","KeyOne_text").show();
		 getTag("wlan_set","KeyTwo_text").show();
		 getTag("wlan_set","KeyThree_text").show();
		 getTag("wlan_set","KeyFour_text").show();
  }
  
  else if(!(getTag("wlan_set","WlanPwdMode_select").select.entity.value == "1"))
  {
  	 getTag("wlan_set","WlanKeyBit_select").hide();
  	 getTag("wlan_set","wlan_tips").hide();
		 getTag("wlan_set","CurrKeyindex_select").hide();
		 getTag("wlan_set","KeyOne_text").hide();
		 getTag("wlan_set","KeyTwo_text").hide();
		 getTag("wlan_set","KeyThree_text").hide();
		 getTag("wlan_set","KeyFour_text").hide();
  }
 }
 function WPSMode_select_disable()
 {
	$.CurrentApp = "NW_Basic";
 	if(getTag("wlan_set","WPSMode_select").select.entity.value == "1")
 	{
        getTag("wlan_set","LocalPIN_text").hide();
        getTag("wlan_set","ClientPIN_text").hide();
 	}
 	else if(getTag("wlan_set","WPSMode_select").select.entity.value == "2")
    {
        getTag("wlan_set","LocalPIN_text").show();
        getTag("wlan_set","ClientPIN_text").hide();
    }
 	else if(getTag("wlan_set","WPSMode_select").select.entity.value == "3")
    {
        getTag("wlan_set","LocalPIN_text").hide();
        getTag("wlan_set","ClientPIN_text").show();
    }
 }