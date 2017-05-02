/************************************* 网络》用户侧管理》IPV4设置 *************************************/
var lanIp;
var lanIpSubMask;

function init_ipv4_set(){
	$.CurrentApp = "ND_IPv4";
	getRequestData("lan_ipaddress_show",{"no":"no"},function(data){
		if(data.Lan_DHCP_checkbox == "1")
		{
			getTag("ipv4title_set","Lan_DHCP_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv4title_set","Lan_DHCP_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanAddressRange_checkbox == "1")
		{
			getTag("ipv4title_set","LanAddressRange_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv4title_set","LanAddressRange_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanPC_checkbox == "1")
		{
			getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanSTB_checkbox == "1")
		{
			getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanPhone_checkbox == "1")
		{
			getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanCamera_checkbox == "1")
		{
			getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.checked = false;	
		}

	//Address_disable();
	setAppTagData(data);
	var arr = new Array();
		for (var i=0;i<4;i++){
			var obj = new Object();
			if(i == 0)
			{
				obj.iptype = "PC";
				obj.ipstart = data.LanPC_StartAddress_text;
				obj.ipend = data.LanPC_EndAddress_text;
				//obj.lanleasetime = data.pcleasetime;
			}
			else if(i == 1)
			{
				obj.iptype = "STB";
				obj.ipstart = data.LanSTB_StartAddress_text;
				obj.ipend = data.LanSTB_EndAddress_text;
				//obj.lanleasetime = data.stbleasetime;
			}
			else if(i == 2)
			{
				obj.iptype = "Phone";
				obj.ipstart = data.LanPhone_StartAddress_text;
				obj.ipend = data.LanPhone_EndAddress_text;
				//obj.lanleasetime = data.phoneleasetime;
			}
			else if(i == 3)
			{
				obj.iptype = "Camera";
				obj.ipstart = data.LanCamera_StartAddress_text;
				obj.ipend = data.LanCamera_EndAddress_text;
				//obj.lanleasetime = data.cameraleasetime;
			}
			arr.push(obj);
		}
		var tab = getTag("ipv4title_set","lanipv4_address_list").tab;
		if(tab.tbody){
			tab.data = arr;
			tab.tbody.refresh();
		}else{
			tab.createTablecheck(arr);
		}
	//var lanleasetime = parseInt(data.LanLeaseTime_select);
	//var dayval = parseInt(lanleasetime/86400);
	//var daymo = parseInt(lanleasetime%86400);
	//var hourval = parseInt(daymo/3600);
	//var hourmo = parseInt(daymo%3600);
	//var minuteval = parseInt(hourmo/60);
	//getTag("ipv4title_set","LanLeaseTime_select").text_a.entity.value = dayval;
	//getTag("ipv4title_set","LanLeaseTime_select").text_b.entity.value = hourval;
	//getTag("ipv4title_set","LanLeaseTime_select").text_c.entity.value = minuteval;
	lanIp = data.LanIP_Address_text;
	lanIpSubMask = data.LanSubmask_text;
	//init follow app
	//init_dnsconf_set();
	});
	init_ipv6_set();
	
}
function Address_disable(){
	$.CurrentApp = "ND_IPv4";
if(getTag("ipv4title_set","LanAddressRange_checkbox").checkbox.entity.checked == true)
	  {  
	  	 getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.disabled=false;
	  	 getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.disabled=false;
	  	 getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.disabled=false;
	  	 getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.disabled=false;
		 getTag("ipv4title_set","lanipv4_address_list").show();
		 getTag("ipv4title_set","lanipv4_tableinfo").show();
	  }
else
	  {  
	  	 getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.disabled=true;
	  	 getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.disabled=true;
	  	 getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.disabled=true;
	  	 getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.disabled=true;
		 getTag("ipv4title_set","lanipv4_address_list").hide();
		 getTag("ipv4title_set","lanipv4_tableinfo").hide();
	  }
	
}
function set_ipv4ip_save(){
	$.CurrentApp = "ND_IPv4";
	var lanipval = "192.168.1.1";
	if(!checkTag(["ipv4_set"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.LanIP_Address_text = getTag("ipv4_set","LanIP_Address_text").text.entity.value;
	lanipval = getTag("ipv4_set","LanIP_Address_text").text.entity.value;
	obj.LanSubmask_text = getTag("ipv4_set","LanSubmask_text").text.entity.value;

	if ((lanIpSubMask == obj.LanSubmask_text) && (obj.LanIP_Address_text == lanIp)) {
		alert("配置相同");
		return;
	}
	setAppDataurl('save','lan_ipaddress_set',obj,function(data){
			if((data == '4') || (data == '15'))
			{
				alert("配置失败！");	
		$.Refresh();
				return;	
			}else	
			{
				$.lockWin(" ");
				$.unlockWin($.CommonLan['success']);
			}
		});	
	window.setTimeout(function(){
					var nonedatav = Math.random();
					window.location.replace("http://"+ lanipval +"/index.html?none="+nonedatav);
				},15000);	
} 
function set_ipv4_save(){
	$.CurrentApp = "ND_IPv4";
	if(!checkTag(["ipv4title_set"])){return;}
	////////地址池合法性判断
	var hostip = getTag("ipv4_set","LanIP_Address_text").text.entity.value;
	var hostip1 = hostip.split('.')[0]+hostip.split('.')[1]+hostip.split('.')[2];
	var hostipstart = getTag("ipv4title_set","LanStartAddress_text").text.entity.value;
	var hostipstart1 = hostipstart.split('.')[0]+hostipstart.split('.')[1]+hostipstart.split('.')[2];
	var hostipstart2 = hostipstart.split('.')[3];
	var hostipstart2 = parseInt(hostipstart2);
	var hostipend = getTag("ipv4title_set","LanEndAddress_text").text.entity.value;
	var hostipend1 = hostipend.split('.')[0]+hostipend.split('.')[1]+hostipend.split('.')[2];
	var hostipend2 = hostipend.split('.')[3];
	var hostipend2 = parseInt(hostipend2);
	
	var computerstart = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[1].text_a.entity.value;
	var computerstart1 = computerstart.split('.')[0]+computerstart.split('.')[1]+computerstart.split('.')[2];
	var computerstart2 = computerstart.split('.')[3];
	var computerstart2 = parseInt(computerstart2);
	var computerend = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[2].text_a.entity.value;
	var computerend1 = computerend.split('.')[0]+computerend.split('.')[1]+computerend.split('.')[2];
	var computerend2 = computerend.split('.')[3];
	var computerend2 = parseInt(computerend2);
	
	var stbstart = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[1].text_a.entity.value;
	var stbstart1 = stbstart.split('.')[0]+stbstart.split('.')[1]+stbstart.split('.')[2];
	var stbstart2 = stbstart.split('.')[3];
	var stbstart2 = parseInt(stbstart2);
	var stbend = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[2].text_a.entity.value;
	var stbend1 = stbend.split('.')[0]+stbend.split('.')[1]+stbend.split('.')[2];
	var stbend2 = stbend.split('.')[3];
	var stbend2 = parseInt(stbend2);
	
	var phonestart = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[1].text_a.entity.value;
	var phonestart1 = phonestart.split('.')[0]+phonestart.split('.')[1]+phonestart.split('.')[2];
	var phonestart2 = phonestart.split('.')[3];
	var phonestart2 = parseInt(phonestart2);
	var phoneend = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[2].text_a.entity.value;
	var phoneend1 = phoneend.split('.')[0]+phoneend.split('.')[1]+phoneend.split('.')[2];
	var phoneend2 = phoneend.split('.')[3];
	var phoneend2 = parseInt(phoneend2);
	
	var camerastart = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[1].text_a.entity.value;
	var camerastart1 = camerastart.split('.')[0]+camerastart.split('.')[1]+camerastart.split('.')[2];
	var camerastart2 = camerastart.split('.')[3];
	var camerastart2 = parseInt(camerastart2);
	var cameraend = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[2].text_a.entity.value;
	var cameraend1 = cameraend.split('.')[0]+cameraend.split('.')[1]+cameraend.split('.')[2];
	var cameraend2 = cameraend.split('.')[3];
	var cameraend2 = parseInt(cameraend2);
	if(hostipstart1 != hostip1)
	{
		checkShow(getTag("ipv4title_set","LanStartAddress_text").text,$.CommonLan['ip_err']);return;
	}
	if(hostipend1 != hostip1)
	{
		checkShow(getTag("ipv4title_set","LanEndAddress_text").text,$.CommonLan['ip_err']);return;
	}
	if(hostipstart2 >= hostipend2)
	{
		checkShow(getTag("ipv4title_set","LanEndAddress_text").text,$.CommonLan['ipcompare_err']);return;
	}
	//地址池需要增加判断
	if(getTag("ipv4title_set","LanAddressRange_checkbox").checkbox.entity.checked)
	{
		if(getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.checked)
		{
			if(computerstart1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(computerend1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(computerstart2 >= computerend2)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
	  }
	  if(getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.checked)
		{
			if(stbstart1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(stbend1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(stbstart2 >= stbend2)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[1].text_a,$.CommonLan['ipcompare_err']);return;
			}
		}
		if(getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.checked)
		{
			if(phonestart1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(phoneend1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(phonestart2 >= phoneend2)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[1].text_a,$.CommonLan['ipcompare_err']);return;
			}
		}
		if(getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.checked)
		{
			if(camerastart1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(cameraend1 != hostip1)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[1].text_a,$.CommonLan['ip_err']);return;
			}
			if(camerastart2 >= cameraend2)
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[1].text_a,$.CommonLan['ipcompare_err']);return;
			}
		}
	}
	////////
	if(getTag("ipv4title_set","LanAddressRange_checkbox").checkbox.entity.checked)
	{
		if(getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.checked)
	  {
			if((computerstart2 < hostipstart2) || (computerstart2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[1].text_a,$.CommonLan['ipsomeone_err']);return;
			}
			if((computerend2 < hostipstart2) || (computerend2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[2].text_a,$.CommonLan['ipsomeone_err']);return;
			}
		}
		if(getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.checked)
	  {
			if((stbstart2 < hostipstart2) || (stbstart2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[1].text_a,$.CommonLan['ipsomeone_err']);return;
			}
			if((stbend2 < hostipstart2) || (stbend2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[2].text_a,$.CommonLan['ipsomeone_err']);return;
			}
		}
		if(getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.checked)
	  {
			if((phonestart2 < hostipstart2) || (phonestart2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[1].text_a,$.CommonLan['ipsomeone_err']);return;
			}
			if((phoneend2 < hostipstart2) || (phoneend2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[2].text_a,$.CommonLan['ipsomeone_err']);return;
			}
		}
		if(getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.checked)
	  {
			if((camerastart2 < hostipstart2) || (camerastart2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[1].text_a,$.CommonLan['ipsomeone_err']);return;
			}
			if((cameraend2 < hostipstart2) || (cameraend2 > hostipend2))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[2].text_a,$.CommonLan['ipsomeone_err']);return;
			}
		}
	}
	////////////computerstart2 computerend2 stbstart2 stbend2 phonestart2 phoneend2 camerastart2 cameraend2
	if(getTag("ipv4title_set","LanAddressRange_checkbox").checkbox.entity.checked)
	{
		if(getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.checked)
		{
			if(((computerstart2 > stbstart2) && (computerstart2 < stbend2)) || ((computerstart2 > phonestart2) && (computerstart2 < phoneend2)) || ((computerstart2 > camerastart2) && (computerstart2 < cameraend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[1].text_a,$.CommonLan['ipCross']);return;
			}
			if(((computerend2 > stbstart2) && (computerend2 < stbend2)) || ((computerend2 > phonestart2) && (computerend2 < phoneend2)) || ((computerend2 > camerastart2) && (computerend2 < cameraend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[2].text_a,$.CommonLan['ipCross']);return;
			}
		}
		if(getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.checked)
		{
			if(((stbstart2 > computerstart2) && (stbstart2 < computerend2)) || ((stbstart2 > phonestart2) && (stbstart2 < phoneend2)) || ((stbstart2 > camerastart2) && (stbstart2 < cameraend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[1].text_a,$.CommonLan['ipCross']);return;
			}
			if(((stbend2 > computerstart2) && (stbend2 < computerend2)) || ((stbend2 > phonestart2) && (stbend2 < phoneend2)) || ((stbend2 > camerastart2) && (stbend2 < cameraend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[2].text_a,$.CommonLan['ipCross']);return;
			}
		}
		if(getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.checked)
		{
			if(((phonestart2 > computerstart2) && (phonestart2 < computerend2)) || ((phonestart2 > stbstart2) && (phonestart2 < stbend2)) || ((phonestart2 > camerastart2) && (phonestart2 < cameraend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[1].text_a,$.CommonLan['ipCross']);return;
			}
			if(((phoneend2 > computerstart2) && (phoneend2 < computerend2)) || ((phoneend2 > stbstart2) && (phoneend2 < stbend2)) || ((phoneend2 > camerastart2) && (phoneend2 < cameraend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[2].text_a,$.CommonLan['ipCross']);return;
			}
		}
		if(getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.checked)
		{
			if(((camerastart2 > computerstart2) && (camerastart2 < computerend2)) || ((camerastart2 > stbstart2) && (camerastart2 < stbend2)) || ((camerastart2 > phonestart2) && (camerastart2 < phoneend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[1].text_a,$.CommonLan['ipCross']);return;
			}
			if(((cameraend2 > computerstart2) && (cameraend2 < computerend2)) || ((cameraend2 > stbstart2) && (cameraend2 < stbend2)) || ((cameraend2 > phonestart2) && (cameraend2 < phoneend2)))
			{
				checkShow(getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[2].text_a,$.CommonLan['ipCross']);return;
			}
		}
	}
	
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";

	if(getTag("ipv4title_set","Lan_DHCP_checkbox").checkbox.entity.checked)
	 {
	 	obj.Lan_DHCP_checkbox = '1';
	 }
	else
	 {
	 	obj.Lan_DHCP_checkbox = '0';
	 }
	obj.LanStartAddress_text = getTag("ipv4title_set","LanStartAddress_text").text.entity.value;
	obj.LanEndAddress_text = getTag("ipv4title_set","LanEndAddress_text").text.entity.value;
	obj.LanDHCP_Submask_text = getTag("ipv4title_set","LanDHCP_Submask_text").text.entity.value;
	//var daystr = getTag("ipv4title_set","LanLeaseTime_select").text_a.entity.value;
	//var hourstr = getTag("ipv4title_set","LanLeaseTime_select").text_b.entity.value;
	//var minutestr = getTag("ipv4title_set","LanLeaseTime_select").text_c.entity.value;
	obj.LanLeaseTime_select = getTag("ipv4title_set","LanLeaseTime_select").select.entity.value;
	if(getTag("ipv4title_set","LanAddressRange_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanAddressRange_checkbox = '1';
	 }
	else
	 {
	 	obj.LanAddressRange_checkbox = '0';
	 }
	if(getTag("ipv4title_set","LanPC_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanPC_checkbox = '1';
	 }
	else
	 {
	 	obj.LanPC_checkbox = '0';
	 }
	obj.LanPC_StartAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[1].text_a.entity.value;
	obj.LanPC_EndAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[2].text_a.entity.value;
	if(getTag("ipv4title_set","LanSTB_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanSTB_checkbox = '1';
	 }
	else
	 {
	 	obj.LanSTB_checkbox = '0';
	 }
	obj.LanSTB_StartAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[1].text_a.entity.value;
	obj.LanSTB_EndAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[2].text_a.entity.value;
	if(getTag("ipv4title_set","LanPhone_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanPhone_checkbox = '1';
	 }
	else
	 {
	 	obj.LanPhone_checkbox = '0';
	 }
	obj.LanPhone_StartAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[1].text_a.entity.value;
	obj.LanPhone_EndAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[2].text_a.entity.value;
	if(getTag("ipv4title_set","LanCamera_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanCamera_checkbox = '1';
	 }
	else
	 {
	 	obj.LanCamera_checkbox = '0';
	 }
	obj.LanCamera_StartAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[1].text_a.entity.value;
	obj.LanCamera_EndAddress_text = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[2].text_a.entity.value;
	//obj.pcleasetime = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[0].Cells[3].text_a.entity.value;
	//obj.stbleasetime = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[1].Cells[3].text_a.entity.value;
	//obj.phoneleasetime = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[2].Cells[3].text_a.entity.value;
	//obj.cameraleasetime = getTag("ipv4title_set","lanipv4_address_list").tab.tbody.Rows[3].Cells[3].text_a.entity.value;
	
	setAppDataurl('save','lan_ip_dhcp_pool_set',obj,function(data){
		$.CurrentApp = "ND_IPv4";
		$.Refresh();
		});	
	
}
/************************************* 网络》用户侧管理》IPV6设置 *************************************/
function init_ipv6_set(){
	$.CurrentApp = "ND_IPv6";
	getRequestData("lan_ipv6ipaddress_show",{"no":"no"},function(data){
		var wanarryipv6port1 = new Array();
		for(var i in data.ipv6wan_list1){
			wanarryipv6port1.push(data.ipv6wan_list1[i].wan_name);
		}
		var wanarryipv6port2 = new Array();
		for(var i in data.ipv6wan_list2){
			wanarryipv6port2.push(data.ipv6wan_list2[i].wan_name);
		}
		data.LanPri_DNS_text = data.LanPri_DNS_text.split(',')[0];
		data.LanSec_DNS_text = data.LanSec_DNS_text.split(',')[1];
		if(data.LanAddressInfo_checkbox == '1')
  	{
  		getTag("ipv6_set","Lanip_radio").panel[0].radio.entity.checked = true;
  		getTag("ipv6_set","Lanip_radio").panel[1].radio.entity.checked = false;
  	}
  	else if(data.LanAddressInfo_checkbox == '0')
  	{
  		getTag("ipv6_set","Lanip_radio").panel[0].radio.entity.checked = false;
  		getTag("ipv6_set","Lanip_radio").panel[1].radio.entity.checked = true;
  	}
  	if(data.LanOtherInfo_checkbox == '1')
  	{
  		getTag("ipv6_set","Landns_radio").panel[0].radio.entity.checked = true;
  		getTag("ipv6_set","Landns_radio").panel[1].radio.entity.checked = false;
  	}
  	else if(data.LanOtherInfo_checkbox == '0')
  	{
  		getTag("ipv6_set","Landns_radio").panel[0].radio.entity.checked = false;
  		getTag("ipv6_set","Landns_radio").panel[1].radio.entity.checked = true;
  	}
  	
		if(data.LanAddressRange6_checkbox == "1")
		{
			getTag("ipv6_set","LanAddressRange6_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv6_set","LanAddressRange6_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanPC6_checkbox == "1")
		{
			getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.checked = false;	
		}
    if(data.LanSTB6_checkbox == "1")
		{
			getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanPhone6_checkbox == "1")
		{
			getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.checked = false;	
		}
		if(data.LanCamera6_checkbox == "1")
		{
			getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.checked = false;	
		}
	LanDNS_disable();
	LanPrefix_display();
	Address_ipv6disable();
	autoInterface1_select(wanarryipv6port1);
	autoshow_Interface1(wanarryipv6port1);
	autoInterface2_select(wanarryipv6port2);
  autoshow_Interface2(wanarryipv6port2);
	setAppTagData(data);
	});
	init_ndnamed_set();
	
}
function LanPrefix_display(){
	$.CurrentApp = "ND_IPv6";
if(getTag("ipv6_set","LanPrefix_select").select.entity.value == "1")
	{  
	 getTag("ipv6_set","LanPrefix_text").hide();
	 getTag("ipv6_set","LanInterface_select").show();
  }
	else
	{
	 getTag("ipv6_set","LanPrefix_text").show();
	 getTag("ipv6_set","LanInterface_select").hide();
	}
}
function LanDNS_disable(){
	$.CurrentApp = "ND_IPv6";
if(getTag("ipv6_set","LanDNS_select").select.entity.value == "1")
	  {  
	  	setTagDomAction("ipv6_set",["LanDNS_Interface_select","LanPri_DNS_text","LanSec_DNS_text"],null,'hide');
	  }
else if(getTag("ipv6_set","LanDNS_select").select.entity.value == "3")
	  {  
	  	setTagDomAction("ipv6_set",["LanPri_DNS_text","LanSec_DNS_text"],null,'show');
	  	setTagDomAction("ipv6_set",["LanDNS_Interface_select"],null,'hide');
	  }
else if(getTag("ipv6_set","LanDNS_select").select.entity.value == "2")
	  {
	  	setTagDomAction("ipv6_set",["LanDNS_Interface_select"],null,'show');
	  	setTagDomAction("ipv6_set",["LanPri_DNS_text","LanSec_DNS_text"],null,'hide');
	  }
}
function Address_ipv6disable(){
	$.CurrentApp = "ND_IPv6";
if(getTag("ipv6_set","LanAddressRange6_checkbox").checkbox.entity.checked == true)
	  {  
	  	 getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.disabled=false;
	  	 getTag("ipv6_set","LanPC_StartAddress6_text").text.entity.disabled=false;
	  	 getTag("ipv6_set","LanPC_EndAddress6_text").text.entity.disabled=false;
	  	 getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.disabled=false;
	  	 getTag("ipv6_set","LanSTB_StartAddress6_text").text.entity.disabled=false;
	  	 getTag("ipv6_set","LanSTB_EndAddress6_text").text.entity.disabled=false;
	  	 getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.disabled=false;
	  	 getTag("ipv6_set","LanPhone_StartAddress6_text").text.entity.disabled=false;
	  	 getTag("ipv6_set","LanPhone_EndAddress6_text").text.entity.disabled=false;
	  	 getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.disabled=false;
	  	 getTag("ipv6_set","LanCamera_StartAddress6_text").text.entity.disabled=false;
	  	 getTag("ipv6_set","LanCamera_EndAddress6_text").text.entity.disabled=false;
	  	 PCAddress_ipv6disable();
	     STBAddress_ipv6disable();
	     PhoneAddress_ipv6disable();
	     CameraAddress_ipv6disable();
	  }
else
	  {  
	  	 getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.disabled=true;
	  	 getTag("ipv6_set","LanPC_StartAddress6_text").text.entity.disabled=true;
	  	 getTag("ipv6_set","LanPC_EndAddress6_text").text.entity.disabled=true;
	  	 getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.disabled=true;
	  	 getTag("ipv6_set","LanSTB_StartAddress6_text").text.entity.disabled=true;
	  	 getTag("ipv6_set","LanSTB_EndAddress6_text").text.entity.disabled=true;
	  	 getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.disabled=true;
	  	 getTag("ipv6_set","LanPhone_StartAddress6_text").text.entity.disabled=true;
	  	 getTag("ipv6_set","LanPhone_EndAddress6_text").text.entity.disabled=true;
	  	 getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.disabled=true;
	  	 getTag("ipv6_set","LanCamera_StartAddress6_text").text.entity.disabled=true;
	  	 getTag("ipv6_set","LanCamera_EndAddress6_text").text.entity.disabled=true;
	  }
	
}
function PCAddress_ipv6disable(){
	$.CurrentApp = "ND_IPv6";
if(getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.checked == true)
	  {  
	  	getTag("ipv6_set","LanPC_StartAddress6_text").text.entity.disabled=false;
	  	getTag("ipv6_set","LanPC_EndAddress6_text").text.entity.disabled=false;
	  }
else
	  {  
	  	getTag("ipv6_set","LanPC_StartAddress6_text").text.entity.disabled=true;
	  	getTag("ipv6_set","LanPC_EndAddress6_text").text.entity.disabled=true;
	  }
}
function STBAddress_ipv6disable(){
	$.CurrentApp = "ND_IPv6";
if(getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.checked == true)
	  {  
	  	getTag("ipv6_set","LanSTB_StartAddress6_text").text.entity.disabled=false;
	  	getTag("ipv6_set","LanSTB_EndAddress6_text").text.entity.disabled=false;
	  }
else
	  {  
	  	getTag("ipv6_set","LanSTB_StartAddress6_text").text.entity.disabled=true;
	  	getTag("ipv6_set","LanSTB_EndAddress6_text").text.entity.disabled=true;
	  }
}
function PhoneAddress_ipv6disable(){
	$.CurrentApp = "ND_IPv6";
if(getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.checked == true)
	  { 
	  	getTag("ipv6_set","LanPhone_StartAddress6_text").text.entity.disabled=false;
	  	getTag("ipv6_set","LanPhone_EndAddress6_text").text.entity.disabled=false;
	  }
else
	  {  
	  	getTag("ipv6_set","LanPhone_StartAddress6_text").text.entity.disabled=true;
	  	getTag("ipv6_set","LanPhone_EndAddress6_text").text.entity.disabled=true;
	  }
}
function CameraAddress_ipv6disable(){
	$.CurrentApp = "ND_IPv6";
if(getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.checked == true)
	  {  
	  	getTag("ipv6_set","LanCamera_StartAddress6_text").text.entity.disabled=false;
	  	getTag("ipv6_set","LanCamera_EndAddress6_text").text.entity.disabled=false;
	  }
else
	  {  
	  	getTag("ipv6_set","LanCamera_StartAddress6_text").text.entity.disabled=true;
	  	getTag("ipv6_set","LanCamera_EndAddress6_text").text.entity.disabled=true;
	  }
}
function set_ManagerAddress_save(){
	$.CurrentApp = "ND_IPv6";
	if(!checkTag(["ipv6total_set"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.ManagerAddress_text = getTag("ipv6total_set","ManagerAddress_text").text.entity.value;
	setAppDataurl('save','lan_ipv6ipaddress_set',obj,function(data){
		$.Refresh();
		});	
}
function set_ipv6_save(){
	$.CurrentApp = "ND_IPv6";
	if(!checkTag(["ipv6_set"])){return;}
/*	var LanMaxRA=ID("LanMaxRA_text").value;
	var LanMinRA=ID("LanMinRA_text").value;
	if((parseInt(LanMaxRA)< 10)||(parseInt(LanMaxRA)>1800 )){
	    checkShow(getTag("ipv6_set","LanMaxRA_text").text,$.CommonLan['range_err']);return;
	}	
	if((parseInt(LanMinRA)< 10)||(parseInt(LanMinRA)>1800 )){
	    checkShow(getTag("ipv6_set","LanMinRA_text").text,$.CommonLan['range_err']);return;
	}
	if(parseInt(LanMaxRA) < parseInt(LanMinRA))	
	{
			checkShow(getTag("ipv6_set","LanMinRA_text").text,$.CommonLan['ra_err']);return;
	}*/
	/////ipv6地址池的合法性验证
	var ipv6start = getTag("ipv6_set","LanStartAddress6_text").text.entity.value;
	var ipv6start1 = ipv6start.split(':')[0];
	if(ipv6start1.length == 4)
	{ipv6start1 = ipv6start1;}
	else if(ipv6start1.length == 3)
	{ipv6start1 = "0"+ipv6start1;}
	else if(ipv6start1.length == 2)
	{ipv6start1 = "00"+ipv6start1;}
	else if(ipv6start1.length == 1)
	{ipv6start1 = "000"+ipv6start1;}
	var ipv6start2 = ipv6start.split(':')[1];
	if(ipv6start2.length == 4)
	{ipv6start2 = ipv6start2;}
	else if(ipv6start2.length == 3)
	{ipv6start2 = "0"+ipv6start2;}
	else if(ipv6start2.length == 2)
	{ipv6start2 = "00"+ipv6start2;}
	else if(ipv6start2.length == 1)
	{ipv6start2 = "000"+ipv6start2;}
	var ipv6start3 = ipv6start.split(':')[2];
	if(ipv6start3.length == 4)
	{ipv6start3 = ipv6start3;}
	else if(ipv6start3.length == 3)
	{ipv6start3 = "0"+ipv6start3;}
	else if(ipv6start3.length == 2)
	{ipv6start3 = "00"+ipv6start3;}
	else if(ipv6start3.length == 1)
	{ipv6start3 = "000"+ipv6start3;}
	var ipv6start4 = ipv6start.split(':')[3];
	if(ipv6start4.length == 4)
	{ipv6start4 = ipv6start4;}
	else if(ipv6start4.length == 3)
	{ipv6start4 = "0"+ipv6start4;}
	else if(ipv6start4.length == 2)
	{ipv6start4 = "00"+ipv6start4;}
	else if(ipv6start4.length == 1)
	{ipv6start4 = "000"+ipv6start4;}
	var ipv6start5 = ipv6start1+ipv6start2+ipv6start3+ipv6start4;///////组合结果
	var ipv6end = getTag("ipv6_set","LanEndAddress6_text").text.entity.value;
	var ipv6end1 = ipv6end.split(':')[0];
	if(ipv6end1.length == 4)
	{ipv6end1 = ipv6end1;}
	else if(ipv6end1.length == 3)
	{ipv6end1 = "0"+ipv6end1;}
	else if(ipv6end1.length == 2)
	{ipv6end1 = "00"+ipv6end1;}
	else if(ipv6end1.length == 1)
	{ipv6end1 = "000"+ipv6end1;}
	var ipv6end2 = ipv6end.split(':')[1];
	if(ipv6end2.length == 4)
	{ipv6end2 = ipv6end2;}
	else if(ipv6end2.length == 3)
	{ipv6end2 = "0"+ipv6end2;}
	else if(ipv6end2.length == 2)
	{ipv6end2 = "00"+ipv6end2;}
	else if(ipv6end2.length == 1)
	{ipv6end2 = "000"+ipv6end2;}
	var ipv6end3 = ipv6end.split(':')[2];
	if(ipv6end3.length == 4)
	{ipv6end3 = ipv6end3;}
	else if(ipv6end3.length == 3)
	{ipv6end3 = "0"+ipv6end3;}
	else if(ipv6end3.length == 2)
	{ipv6end3 = "00"+ipv6end3;}
	else if(ipv6end3.length == 1)
	{ipv6end3 = "000"+ipv6end3;}
	var ipv6end4 = ipv6end.split(':')[3];
	if(ipv6end4.length == 4)
	{ipv6end4 = ipv6end4;}
	else if(ipv6end4.length == 3)
	{ipv6end4 = "0"+ipv6end4;}
	else if(ipv6end4.length == 2)
	{ipv6end4 = "00"+ipv6end4;}
	else if(ipv6end4.length == 1)
	{ipv6end4 = "000"+ipv6end4;}
	var ipv6end5 = ipv6end1+ipv6end2+ipv6end3+ipv6end4;///////组合结果
	
	var ipv6pcstart = getTag("ipv6_set","LanPC_StartAddress6_text").text.entity.value;
	var ipv6pcstart1 = ipv6pcstart.split(':')[0];
	if(ipv6pcstart1.length == 4)
	{ipv6pcstart1 = ipv6pcstart1;}
	else if(ipv6pcstart1.length == 3)
	{ipv6pcstart1 = "0"+ipv6pcstart1;}
	else if(ipv6pcstart1.length == 2)
	{ipv6pcstart1 = "00"+ipv6pcstart1;}
	else if(ipv6pcstart1.length == 1)
	{ipv6pcstart1 = "000"+ipv6pcstart1;}
	var ipv6pcstart2 = ipv6pcstart.split(':')[1];
	if(ipv6pcstart2.length == 4)
	{ipv6pcstart2 = ipv6pcstart2;}
	else if(ipv6pcstart2.length == 3)
	{ipv6pcstart2 = "0"+ipv6pcstart2;}
	else if(ipv6pcstart2.length == 2)
	{ipv6pcstart2 = "00"+ipv6pcstart2;}
	else if(ipv6pcstart2.length == 1)
	{ipv6pcstart2 = "000"+ipv6pcstart2;}
	var ipv6pcstart3 = ipv6pcstart.split(':')[2];
	if(ipv6pcstart3.length == 4)
	{ipv6pcstart3 = ipv6pcstart3;}
	else if(ipv6pcstart3.length == 3)
	{ipv6pcstart3 = "0"+ipv6pcstart3;}
	else if(ipv6pcstart3.length == 2)
	{ipv6pcstart3 = "00"+ipv6pcstart3;}
	else if(ipv6pcstart3.length == 1)
	{ipv6pcstart3 = "000"+ipv6pcstart3;}
	var ipv6pcstart4 = ipv6pcstart.split(':')[3];
	if(ipv6pcstart4.length == 4)
	{ipv6pcstart4 = ipv6pcstart4;}
	else if(ipv6pcstart4.length == 3)
	{ipv6pcstart4 = "0"+ipv6pcstart4;}
	else if(ipv6pcstart4.length == 2)
	{ipv6pcstart4 = "00"+ipv6pcstart4;}
	else if(ipv6pcstart4.length == 1)
	{ipv6pcstart4 = "000"+ipv6pcstart4;}
	var ipv6pcstart5 = ipv6pcstart1+ipv6pcstart2+ipv6pcstart3+ipv6pcstart4;
	var ipv6pcend = getTag("ipv6_set","LanPC_EndAddress6_text").text.entity.value;
	var ipv6pcend1 = ipv6pcend.split(':')[0];
	if(ipv6pcend1.length == 4)
	{ipv6pcend1 = ipv6pcend1;}
	else if(ipv6pcend1.length == 3)
	{ipv6pcend1 = "0"+ipv6pcend1;}
	else if(ipv6pcend1.length == 2)
	{ipv6pcend1 = "00"+ipv6pcend1;}
	else if(ipv6pcend1.length == 1)
	{ipv6pcend1 = "000"+ipv6pcend1;}
	var ipv6pcend2 = ipv6pcend.split(':')[1];
	if(ipv6pcend2.length == 4)
	{ipv6pcend2 = ipv6pcend2;}
	else if(ipv6pcend2.length == 3)
	{ipv6pcend2 = "0"+ipv6pcend2;}
	else if(ipv6pcend2.length == 2)
	{ipv6pcend2 = "00"+ipv6pcend2;}
	else if(ipv6pcend2.length == 1)
	{ipv6pcend2 = "000"+ipv6pcend2;}
	var ipv6pcend3 = ipv6pcend.split(':')[2];
	if(ipv6pcend3.length == 4)
	{ipv6pcend3 = ipv6pcend3;}
	else if(ipv6pcend3.length == 3)
	{ipv6pcend3 = "0"+ipv6pcend3;}
	else if(ipv6pcend3.length == 2)
	{ipv6pcend3 = "00"+ipv6pcend3;}
	else if(ipv6pcend3.length == 1)
	{ipv6pcend3 = "000"+ipv6pcend3;}
	var ipv6pcend4 = ipv6pcend.split(':')[3];
	if(ipv6pcend4.length == 4)
	{ipv6pcend4 = ipv6pcend4;}
	else if(ipv6pcend4.length == 3)
	{ipv6pcend4 = "0"+ipv6pcend4;}
	else if(ipv6pcend4.length == 2)
	{ipv6pcend4 = "00"+ipv6pcend4;}
	else if(ipv6pcend4.length == 1)
	{ipv6pcend4 = "000"+ipv6pcend4;}
	var ipv6pcend5 = ipv6pcend1+ipv6pcend2+ipv6pcend3+ipv6pcend4;
	var ipv6stbstart = getTag("ipv6_set","LanSTB_StartAddress6_text").text.entity.value;
	var ipv6stbstart1 = ipv6stbstart.split(':')[0];
	if(ipv6stbstart1.length == 4)
	{ipv6stbstart1 = ipv6stbstart1;}
	else if(ipv6stbstart1.length == 3)
	{ipv6stbstart1 = "0"+ipv6stbstart1;}
	else if(ipv6stbstart1.length == 2)
	{ipv6stbstart1 = "00"+ipv6stbstart1;}
	else if(ipv6stbstart1.length == 1)
	{ipv6stbstart1 = "000"+ipv6stbstart1;}
	var ipv6stbstart2 = ipv6stbstart.split(':')[1];
	if(ipv6stbstart2.length == 4)
	{ipv6stbstart2 = ipv6stbstart2;}
	else if(ipv6stbstart2.length == 3)
	{ipv6stbstart2 = "0"+ipv6stbstart2;}
	else if(ipv6stbstart2.length == 2)
	{ipv6stbstart2 = "00"+ipv6stbstart2;}
	else if(ipv6stbstart2.length == 1)
	{ipv6stbstart2 = "000"+ipv6stbstart2;}
	var ipv6stbstart3 = ipv6stbstart.split(':')[2];
	if(ipv6stbstart3.length == 4)
	{ipv6stbstart3 = ipv6stbstart3;}
	else if(ipv6stbstart3.length == 3)
	{ipv6stbstart3 = "0"+ipv6stbstart3;}
	else if(ipv6stbstart3.length == 2)
	{ipv6stbstart3 = "00"+ipv6stbstart3;}
	else if(ipv6stbstart3.length == 1)
	{ipv6stbstart3 = "000"+ipv6stbstart3;}
	var ipv6stbstart4 = ipv6stbstart.split(':')[3];
	if(ipv6stbstart4.length == 4)
	{ipv6stbstart4 = ipv6stbstart4;}
	else if(ipv6stbstart4.length == 3)
	{ipv6stbstart4 = "0"+ipv6stbstart4;}
	else if(ipv6stbstart4.length == 2)
	{ipv6stbstart4 = "00"+ipv6stbstart4;}
	else if(ipv6stbstart4.length == 1)
	{ipv6stbstart4 = "000"+ipv6stbstart4;}
	var ipv6stbstart5 = ipv6stbstart1+ipv6stbstart2+ipv6stbstart3+ipv6stbstart4;
	var ipv6stbend = getTag("ipv6_set","LanSTB_EndAddress6_text").text.entity.value;
	var ipv6stbend1 = ipv6stbend.split(':')[0];
	if(ipv6stbend1.length == 4)
	{ipv6stbend1 = ipv6stbend1;}
	else if(ipv6stbend1.length == 3)
	{ipv6stbend1 = "0"+ipv6stbend1;}
	else if(ipv6stbend1.length == 2)
	{ipv6stbend1 = "00"+ipv6stbend1;}
	else if(ipv6stbend1.length == 1)
	{ipv6stbend1 = "000"+ipv6stbend1;}
	var ipv6stbend2 = ipv6stbend.split(':')[1];
	if(ipv6stbend2.length == 4)
	{ipv6stbend2 = ipv6stbend2;}
	else if(ipv6stbend2.length == 3)
	{ipv6stbend2 = "0"+ipv6stbend2;}
	else if(ipv6stbend2.length == 2)
	{ipv6stbend2 = "00"+ipv6stbend2;}
	else if(ipv6stbend2.length == 1)
	{ipv6stbend2 = "000"+ipv6stbend2;}
	var ipv6stbend3 = ipv6stbend.split(':')[2];
	if(ipv6stbend3.length == 4)
	{ipv6stbend3 = ipv6stbend3;}
	else if(ipv6stbend3.length == 3)
	{ipv6stbend3 = "0"+ipv6stbend3;}
	else if(ipv6stbend3.length == 2)
	{ipv6stbend3 = "00"+ipv6stbend3;}
	else if(ipv6stbend3.length == 1)
	{ipv6stbend3 = "000"+ipv6stbend3;}
	var ipv6stbend4 = ipv6stbend.split(':')[3];
	if(ipv6stbend4.length == 4)
	{ipv6stbend4 = ipv6stbend4;}
	else if(ipv6stbend4.length == 3)
	{ipv6stbend4 = "0"+ipv6stbend4;}
	else if(ipv6stbend4.length == 2)
	{ipv6stbend4 = "00"+ipv6stbend4;}
	else if(ipv6stbend4.length == 1)
	{ipv6stbend4 = "000"+ipv6stbend4;}
	var ipv6stbend5 = ipv6stbend1+ipv6stbend2+ipv6stbend3+ipv6stbend4;
	var ipv6phonestart = getTag("ipv6_set","LanPhone_StartAddress6_text").text.entity.value;
	var ipv6phonestart1 = ipv6phonestart.split(':')[0];
	if(ipv6phonestart1.length == 4)
	{ipv6phonestart1 = ipv6phonestart1;}
	else if(ipv6phonestart1.length == 3)
	{ipv6phonestart1 = "0"+ipv6phonestart1;}
	else if(ipv6phonestart1.length == 2)
	{ipv6phonestart1 = "00"+ipv6phonestart1;}
	else if(ipv6phonestart1.length == 1)
	{ipv6phonestart1 = "000"+ipv6phonestart1;}
	var ipv6phonestart2 = ipv6phonestart.split(':')[1];
	if(ipv6phonestart2.length == 4)
	{ipv6phonestart2 = ipv6phonestart2;}
	else if(ipv6phonestart2.length == 3)
	{ipv6phonestart2 = "0"+ipv6phonestart2;}
	else if(ipv6phonestart2.length == 2)
	{ipv6phonestart2 = "00"+ipv6phonestart2;}
	else if(ipv6phonestart2.length == 1)
	{ipv6phonestart2 = "000"+ipv6phonestart2;}
	var ipv6phonestart3 = ipv6phonestart.split(':')[2];
	if(ipv6phonestart3.length == 4)
	{ipv6phonestart3 = ipv6phonestart3;}
	else if(ipv6phonestart3.length == 3)
	{ipv6phonestart3 = "0"+ipv6phonestart3;}
	else if(ipv6phonestart3.length == 2)
	{ipv6phonestart3 = "00"+ipv6phonestart3;}
	else if(ipv6phonestart3.length == 1)
	{ipv6phonestart3 = "000"+ipv6phonestart3;}
	var ipv6phonestart4 = ipv6phonestart.split(':')[3];
	if(ipv6phonestart4.length == 4)
	{ipv6phonestart4 = ipv6phonestart4;}
	else if(ipv6phonestart4.length == 3)
	{ipv6phonestart4 = "0"+ipv6phonestart4;}
	else if(ipv6phonestart4.length == 2)
	{ipv6phonestart4 = "00"+ipv6phonestart4;}
	else if(ipv6phonestart4.length == 1)
	{ipv6phonestart4 = "000"+ipv6phonestart4;}
	var ipv6phonestart5 = ipv6phonestart1+ipv6phonestart2+ipv6phonestart3+ipv6phonestart4;
	var ipv6phoneend = getTag("ipv6_set","LanPhone_EndAddress6_text").text.entity.value;
	var ipv6phoneend1 = ipv6phoneend.split(':')[0];
	if(ipv6phoneend1.length == 4)
	{ipv6phoneend1 = ipv6phoneend1;}
	else if(ipv6phoneend1.length == 3)
	{ipv6phoneend1 = "0"+ipv6phoneend1;}
	else if(ipv6phoneend1.length == 2)
	{ipv6phoneend1 = "00"+ipv6phoneend1;}
	else if(ipv6phoneend1.length == 1)
	{ipv6phoneend1 = "000"+ipv6phoneend1;}
	var ipv6phoneend2 = ipv6phoneend.split(':')[1];
	if(ipv6phoneend2.length == 4)
	{ipv6phoneend2 = ipv6phoneend2;}
	else if(ipv6phoneend2.length == 3)
	{ipv6phoneend2 = "0"+ipv6phoneend2;}
	else if(ipv6phoneend2.length == 2)
	{ipv6phoneend2 = "00"+ipv6phoneend2;}
	else if(ipv6phoneend2.length == 1)
	{ipv6phoneend2 = "000"+ipv6phoneend2;}
	var ipv6phoneend3 = ipv6phoneend.split(':')[2];
	if(ipv6phoneend3.length == 4)
	{ipv6phoneend3 = ipv6phoneend3;}
	else if(ipv6phoneend3.length == 3)
	{ipv6phoneend3 = "0"+ipv6phoneend3;}
	else if(ipv6phoneend3.length == 2)
	{ipv6phoneend3 = "00"+ipv6phoneend3;}
	else if(ipv6phoneend3.length == 1)
	{ipv6phoneend3 = "000"+ipv6phoneend3;}
	var ipv6phoneend4 = ipv6phoneend.split(':')[3];
	if(ipv6phoneend4.length == 4)
	{ipv6phoneend4 = ipv6phoneend4;}
	else if(ipv6phoneend4.length == 3)
	{ipv6phoneend4 = "0"+ipv6phoneend4;}
	else if(ipv6phoneend4.length == 2)
	{ipv6phoneend4 = "00"+ipv6phoneend4;}
	else if(ipv6phoneend4.length == 1)
	{ipv6phoneend4 = "000"+ipv6phoneend4;}
	var ipv6phoneend5 = ipv6phoneend1+ipv6phoneend2+ipv6phoneend3+ipv6phoneend4;
	var ipv6Camerastart = getTag("ipv6_set","LanCamera_StartAddress6_text").text.entity.value;
	var ipv6Camerastart1 = ipv6Camerastart.split(':')[0];
	if(ipv6Camerastart1.length == 4)
	{ipv6Camerastart1 = ipv6Camerastart1;}
	else if(ipv6Camerastart1.length == 3)
	{ipv6Camerastart1 = "0"+ipv6Camerastart1;}
	else if(ipv6Camerastart1.length == 2)
	{ipv6Camerastart1 = "00"+ipv6Camerastart1;}
	else if(ipv6Camerastart1.length == 1)
	{ipv6Camerastart1 = "000"+ipv6Camerastart1;}
	var ipv6Camerastart2 = ipv6Camerastart.split(':')[1];
	if(ipv6Camerastart2.length == 4)
	{ipv6Camerastart2 = ipv6Camerastart2;}
	else if(ipv6Camerastart2.length == 3)
	{ipv6Camerastart2 = "0"+ipv6Camerastart2;}
	else if(ipv6Camerastart2.length == 2)
	{ipv6Camerastart2 = "00"+ipv6Camerastart2;}
	else if(ipv6Camerastart2.length == 1)
	{ipv6Camerastart2 = "000"+ipv6Camerastart2;}
	var ipv6Camerastart3 = ipv6Camerastart.split(':')[2];
	if(ipv6Camerastart3.length == 4)
	{ipv6Camerastart3 = ipv6Camerastart3;}
	else if(ipv6Camerastart3.length == 3)
	{ipv6Camerastart3 = "0"+ipv6Camerastart3;}
	else if(ipv6Camerastart3.length == 2)
	{ipv6Camerastart3 = "00"+ipv6Camerastart3;}
	else if(ipv6Camerastart3.length == 1)
	{ipv6Camerastart3 = "000"+ipv6Camerastart3;}
	var ipv6Camerastart4 = ipv6Camerastart.split(':')[3];
	if(ipv6Camerastart4.length == 4)
	{ipv6Camerastart4 = ipv6Camerastart4;}
	else if(ipv6Camerastart4.length == 3)
	{ipv6Camerastart4 = "0"+ipv6Camerastart4;}
	else if(ipv6Camerastart4.length == 2)
	{ipv6Camerastart4 = "00"+ipv6Camerastart4;}
	else if(ipv6Camerastart4.length == 1)
	{ipv6Camerastart4 = "000"+ipv6Camerastart4;}
	var ipv6Camerastart5 = ipv6Camerastart1+ipv6Camerastart2+ipv6Camerastart3+ipv6Camerastart4;
	var ipv6Cameraend = getTag("ipv6_set","LanCamera_EndAddress6_text").text.entity.value;
	var ipv6Cameraend1 = ipv6Cameraend.split(':')[0];
	if(ipv6Cameraend1.length == 4)
	{ipv6Cameraend1 = ipv6Cameraend1;}
	else if(ipv6Cameraend1.length == 3)
	{ipv6Cameraend1 = "0"+ipv6Cameraend1;}
	else if(ipv6Cameraend1.length == 2)
	{ipv6Cameraend1 = "00"+ipv6Cameraend1;}
	else if(ipv6Cameraend1.length == 1)
	{ipv6Cameraend1 = "000"+ipv6Cameraend1;}
	var ipv6Cameraend2 = ipv6Cameraend.split(':')[1];
	if(ipv6Cameraend2.length == 4)
	{ipv6Cameraend2 = ipv6Cameraend2;}
	else if(ipv6Cameraend2.length == 3)
	{ipv6Cameraend2 = "0"+ipv6Cameraend2;}
	else if(ipv6Cameraend2.length == 2)
	{ipv6Cameraend2 = "00"+ipv6Cameraend2;}
	else if(ipv6Cameraend2.length == 1)
	{ipv6Cameraend2 = "000"+ipv6Cameraend2;}
	var ipv6Cameraend3 = ipv6Cameraend.split(':')[2];
	if(ipv6Cameraend3.length == 4)
	{ipv6Cameraend3 = ipv6Cameraend3;}
	else if(ipv6Cameraend3.length == 3)
	{ipv6Cameraend3 = "0"+ipv6Cameraend3;}
	else if(ipv6Cameraend3.length == 2)
	{ipv6Cameraend3 = "00"+ipv6Cameraend3;}
	else if(ipv6Cameraend3.length == 1)
	{ipv6Cameraend3 = "000"+ipv6Cameraend3;}
	var ipv6Cameraend4 = ipv6Cameraend.split(':')[3];
	if(ipv6Cameraend4.length == 4)
	{ipv6Cameraend4 = ipv6Cameraend4;}
	else if(ipv6Cameraend4.length == 3)
	{ipv6Cameraend4 = "0"+ipv6Cameraend4;}
	else if(ipv6Cameraend4.length == 2)
	{ipv6Cameraend4 = "00"+ipv6Cameraend4;}
	else if(ipv6Cameraend4.length == 1)
	{ipv6Cameraend4 = "000"+ipv6Cameraend4;}
	var ipv6Cameraend5 = ipv6Cameraend1+ipv6Cameraend2+ipv6Cameraend3+ipv6Cameraend4;
	/////
	if(ipv6start5 >= ipv6end5)
	{
		checkShow(getTag("ipv6_set","LanEndAddress6_text").text,$.CommonLan['ipcompare_err']);return;
	}
	if(getTag("ipv6_set","LanAddressRange6_checkbox").checkbox.entity.checked)
	{
	if(getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.checked)
	{
		if(ipv6pcstart5 >= ipv6pcend5)
		{
			checkShow(getTag("ipv6_set","LanPC_EndAddress6_text").text,$.CommonLan['ipcompare_err']);return;
		}
	}
	if(getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.checked)
	{
		if(ipv6stbstart5 >= ipv6stbend5)
		{
			checkShow(getTag("ipv6_set","LanSTB_EndAddress6_text").text,$.CommonLan['ipcompare_err']);return;
		}
	}
	if(getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.checked)
	{
		if(ipv6phonestart5 >= ipv6phoneend5)
		{
			checkShow(getTag("ipv6_set","LanPhone_EndAddress6_text").text,$.CommonLan['ipcompare_err']);return;
		}
	}
	if(getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.checked)
	{
		if(ipv6Camerastart5 >= ipv6Cameraend5)
		{
			checkShow(getTag("ipv6_set","LanCamera_EndAddress6_text").text,$.CommonLan['ipcompare_err']);return;
		}
	}
	}
	//////
	if(getTag("ipv6_set","LanAddressRange6_checkbox").checkbox.entity.checked)
	{
		if(getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.checked)
		{
			if((ipv6pcstart5 < ipv6start5) || (ipv6pcstart5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanPC_StartAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
			if((ipv6pcend5 < ipv6start5) || (ipv6pcend5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanPC_EndAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
		}
		if(getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.checked)
		{
			if((ipv6stbstart5 < ipv6start5) || (ipv6stbstart5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanSTB_StartAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
			if((ipv6stbend5 < ipv6start5) || (ipv6stbend5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanSTB_EndAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
		}
		if(getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.checked)
		{
			if((ipv6phonestart5 < ipv6start5) || (ipv6phonestart5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanPhone_StartAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
			if((ipv6phoneend5 < ipv6start5) || (ipv6phoneend5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanPhone_EndAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
		}
		if(getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.checked)
		{
			if((ipv6Camerastart5 < ipv6start5) || (ipv6Camerastart5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanCamera_StartAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
			if((ipv6Cameraend5 < ipv6start5) || (ipv6Cameraend5 > ipv6end5))
			{
				checkShow(getTag("ipv6_set","LanCamera_EndAddress6_text").text,$.CommonLan['ipsomeone_err']);return;
			}
		}
	}
	//////ipv6pcstart5 ipv6pcend5 ipv6stbstart5 ipv6stbend5 ipv6phonestart5 ipv6phoneend5 ipv6Camerastart5 ipv6Cameraend5
	if(getTag("ipv6_set","LanAddressRange6_checkbox").checkbox.entity.checked)
	{
		if(getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.checked)
		{
			if(((ipv6pcstart5 >ipv6stbstart5) && (ipv6pcstart5 < ipv6stbend5)) || ((ipv6pcstart5 >ipv6phonestart5) && (ipv6pcstart5 < ipv6phoneend5)) || ((ipv6pcstart5 >ipv6Camerastart5) && (ipv6pcstart5 < ipv6Cameraend5)))
			{
				checkShow(getTag("ipv6_set","LanPC_StartAddress6_text").text,$.CommonLan['ipCross']);return;
			}
			if(((ipv6pcend5 >ipv6stbstart5) && (ipv6pcend5 < ipv6stbend5)) || ((ipv6pcend5 >ipv6phonestart5) && (ipv6pcend5 < ipv6phoneend5)) || ((ipv6pcend5 >ipv6Camerastart5) && (ipv6pcend5 < ipv6Cameraend5)))
			{
				checkShow(getTag("ipv6_set","LanPC_EndAddress6_text").text,$.CommonLan['ipCross']);return;
			}
		}
		if(getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.checked)
		{
			if(((ipv6stbstart5 >ipv6pcstart5) && (ipv6stbstart5 < ipv6pcend5)) || ((ipv6stbstart5 >ipv6phonestart5) && (ipv6stbstart5 < ipv6phoneend5)) || ((ipv6stbstart5 >ipv6Camerastart5) && (ipv6stbstart5 < ipv6Cameraend5)))
			{
				checkShow(getTag("ipv6_set","LanSTB_StartAddress6_text").text,$.CommonLan['ipCross']);return;
			}
			if(((ipv6stbend5 >ipv6pcstart5) && (ipv6stbend5 < ipv6pcend5)) || ((ipv6stbend5 >ipv6phonestart5) && (ipv6stbend5 < ipv6phoneend5)) || ((ipv6stbend5 >ipv6Camerastart5) && (ipv6stbend5 < ipv6Cameraend5)))
			{
				checkShow(getTag("ipv6_set","LanSTB_EndAddress6_text").text,$.CommonLan['ipCross']);return;
			}
		}
		if(getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.checked)
		{
			if(((ipv6phonestart5 >ipv6pcstart5) && (ipv6phonestart5 < ipv6pcend5)) || ((ipv6phonestart5 >ipv6stbstart5) && (ipv6phonestart5 < ipv6stbend5)) || ((ipv6phonestart5 >ipv6Camerastart5) && (ipv6phonestart5 < ipv6Cameraend5)))
			{
				checkShow(getTag("ipv6_set","LanPhone_StartAddress6_text").text,$.CommonLan['ipCross']);return;
			}
			if(((ipv6phoneend5 >ipv6pcstart5) && (ipv6phoneend5 < ipv6pcend5)) || ((ipv6phoneend5 >ipv6stbstart5) && (ipv6phoneend5 < ipv6stbend5)) || ((ipv6phoneend5 >ipv6Camerastart5) && (ipv6phoneend5 < ipv6Cameraend5)))
			{
				checkShow(getTag("ipv6_set","LanPhone_EndAddress6_text").text,$.CommonLan['ipCross']);return;
			}
		}
		if(getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.checked)
		{
			if(((ipv6Camerastart5 >ipv6pcstart5) && (ipv6Camerastart5 < ipv6pcend5)) || ((ipv6Camerastart5 >ipv6stbstart5) && (ipv6Camerastart5 < ipv6stbend5)) || ((ipv6Camerastart5 >ipv6phonestart5) && (ipv6Camerastart5 < ipv6phoneend5)))
			{
				checkShow(getTag("ipv6_set","LanCamera_StartAddress6_text").text,$.CommonLan['ipCross']);return;
			}
			if(((ipv6Cameraend5 >ipv6pcstart5) && (ipv6Cameraend5 < ipv6pcend5)) || ((ipv6Cameraend5 >ipv6stbstart5) && (ipv6Cameraend5 < ipv6stbend5)) || ((ipv6Cameraend5 >ipv6phonestart5) && (ipv6Cameraend5 < ipv6phoneend5)))
			{
				checkShow(getTag("ipv6_set","LanCamera_EndAddress6_text").text,$.CommonLan['ipCross']);return;
			}
		}
	}
	//////
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	obj.LanDNS_select = getTag("ipv6_set","LanDNS_select").select.entity.value;
	obj.LanDNS_Interface_select = getTag("ipv6_set","LanDNS_Interface_select").select.entity.value;
	var dnspri = getTag("ipv6_set","LanPri_DNS_text").text.entity.value;
	var dnssec = getTag("ipv6_set","LanSec_DNS_text").text.entity.value;
	obj.Lan_DNS_text = dnspri+","+dnssec;
	 obj.LanPrefix_select = getTag("ipv6_set","LanPrefix_select").select.entity.value;
	 obj.LanPrefix_text = getTag("ipv6_set","LanPrefix_text").text.entity.value;
	 obj.LanInterface_select = getTag("ipv6_set","LanInterface_select").select.entity.value;
	 obj.LanStartAddress6_text = getTag("ipv6_set","LanStartAddress6_text").text.entity.value;
	 obj.LanEndAddress6_text = getTag("ipv6_set","LanEndAddress6_text").text.entity.value;
	 if(getTag("ipv6_set","Lanip_radio").panel[0].radio.entity.checked == true)
	 {
			obj.LanAddressInfo_checkbox = "1";
	 }
	 else if(getTag("ipv6_set","Lanip_radio").panel[1].radio.entity.checked == true)
	 {
	 		obj.LanAddressInfo_checkbox = "0";
	 }
	 if(getTag("ipv6_set","Landns_radio").panel[0].radio.entity.checked == true)
	 {
			obj.LanOtherInfo_checkbox = "1";
	 }
	 else if(getTag("ipv6_set","Landns_radio").panel[1].radio.entity.checked == true)
	 {
			obj.LanOtherInfo_checkbox = "0";
	 }
	 obj.LanDHCPv6_checkbox = "1";
	 obj.circular_route_checkbox = "1";
	 obj.LanMaxRA_text = "600";
	 obj.LanMinRA_text = "300";
	 if(getTag("ipv6_set","LanAddressRange6_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanAddressRange6_checkbox = '1';
	 }
	else
	 {
	 	obj.LanAddressRange6_checkbox = '0';
	 }
	 if(getTag("ipv6_set","LanPC6_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanPC6_checkbox = '1';
	 }
	else
	 {
	 	obj.LanPC6_checkbox = '0';
	 }
	 obj.LanPC_StartAddress6_text = getTag("ipv6_set","LanPC_StartAddress6_text").text.entity.value;
	 obj.LanPC_EndAddress6_text = getTag("ipv6_set","LanPC_EndAddress6_text").text.entity.value;
	 if(getTag("ipv6_set","LanSTB6_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanSTB6_checkbox = '1';
	 }
	else
	 {
	 	obj.LanSTB6_checkbox = '0';
	 }
	 obj.LanSTB_StartAddress6_text = getTag("ipv6_set","LanSTB_StartAddress6_text").text.entity.value;
	 obj.LanSTB_EndAddress6_text = getTag("ipv6_set","LanSTB_EndAddress6_text").text.entity.value;
	 if(getTag("ipv6_set","LanPhone6_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanPhone6_checkbox = '1';
	 }
	else
	 {
	 	obj.LanPhone6_checkbox = '0';
	 }
	 obj.LanPhone_StartAddress6_text = getTag("ipv6_set","LanPhone_StartAddress6_text").text.entity.value;
	 obj.LanPhone_EndAddress6_text = getTag("ipv6_set","LanPhone_EndAddress6_text").text.entity.value;
	 if(getTag("ipv6_set","LanCamera6_checkbox").checkbox.entity.checked)
	 {
	 	obj.LanCamera6_checkbox = '1';
	 }
	else
	 {
	 	obj.LanCamera6_checkbox = '0';
	 }
	 obj.LanCamera_StartAddress6_text = getTag("ipv6_set","LanCamera_StartAddress6_text").text.entity.value;
	 obj.LanCamera_EndAddress6_text = getTag("ipv6_set","LanCamera_EndAddress6_text").text.entity.value;
	 
	setAppDataurl('save','lan_ipv6ipaddresspool_set',obj,function(data){
		$.Refresh();
		});	
}
function autoInterface1_select(wanarryipv6port1){
	$.CurrentApp = "ND_IPv6";
	var sel = getTag('ipv6_set','LanDNS_Interface_select').select.entity;
	sel.options.length = wanarryipv6port1.length;
	for(var i=0;i < wanarryipv6port1.length+1;i++)
	{
		
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0'];   /*显示*/
		}
		else
		{
			 val = wanarryipv6port1[i-1]; /*值*/
			 str = wanarryipv6port1[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_Interface1(data){
	$.CurrentApp = "ND_IPv6";
	var rowarry = getTag('ipv6_set','LanDNS_Interface_select');
	rowarry.select.checked(data.LanDNS_Interface_select);
}
function autoInterface2_select(wanarryipv6port2){
	$.CurrentApp = "ND_IPv6";
	var sel = getTag('ipv6_set','LanInterface_select').select.entity;
	sel.options.length = wanarryipv6port2.length;
	for(var i=0;i < wanarryipv6port2.length+1;i++)
	{
		
		if(i == "0")
		{
			var val = "none"; /*值*/
			var str = $.CommonLan['none_0']; /*显示*/
		}
		else
		{
			 val = wanarryipv6port2[i-1]; /*值*/
			 str = wanarryipv6port2[i-1]; /*显示*/
		}
		var opt = new Option(str,val);
    	sel.options[i] = opt;
	}
}
function autoshow_Interface2(data){
	$.CurrentApp = "ND_IPv6";
	var rowarry = getTag('ipv6_set','LanInterface_select');
	rowarry.select.checked(data.LanInterface_select);
}
/************************************* 网络》用户侧管理》家庭网络命名 *************************************/
function init_ndnamed_set(){
	$.CurrentApp = "ND_Named";
	creat_ndnamed_tab();
}

function creat_ndnamed_tab(){
	$.CurrentApp = "ND_Named";
getRequestData("domain_name_show",{"no":"no"},function(data){
		setAppTagData(data);
		var tab = getTag("domain_info","domain_info_list").tab;
		if(tab.tbody){
			tab.data = data.domain_info_list;
			tab.tbody.refresh();
		}else{
				for(var j in data.domain_info_list)
				{
					if(data.domain_info_list[j].devicetype == '0')
					{
						data.domain_info_list[j].devicetype = "STB";
					}
					else if(data.domain_info_list[j].devicetype == '1')
					{
						data.domain_info_list[j].devicetype = "Phone";
					}
					else if(data.domain_info_list[j].devicetype == '2')
					{
						data.domain_info_list[j].devicetype = "Camera";
					}
					else if(data.domain_info_list[j].devicetype == '3')
					{
						data.domain_info_list[j].devicetype = "Computer";
					}
					else
		  			{
		  				data.domain_info_list[j].devicetype = "";
		  			}
				}
			tab.createTablecheck(data.domain_info_list);
		}
		disable_domain_name();
	});	
	
}

function disable_domain_name(){
	$.CurrentApp = "ND_Named";
	var rowarry = getTag("domain_info","domain_info_list").tab.tbody.Rows;
	for(var i=0;i < rowarry.length;i++)
	{
		getTag("domain_info","domain_info_list").tab.tbody.Rows[i].Cells[1].text_a.entity.disabled = true;
	}
}
/*设备重命名 函数*/
function enable_name_edit(){
	$.CurrentApp = "ND_Named";
	var rowarry = getTag("domain_info","domain_info_list").tab.tbody.Rows;
	for(var i=0;i < rowarry.length;i++)
	{
		getTag("domain_info","domain_info_list").tab.tbody.Rows[i].Cells[1].text_a.entity.disabled = false;
	}
}
/*设备名保存 函数*/
function domain_name_save(){
	$.CurrentApp = "ND_Named";
	if(subdebug)
	{
		alert(MOD);	
	}
	MOD = "save";
	var rowarry = getTag("domain_info","domain_info_list").tab.tbody.Rows;
	var domainobj = new Object();
	domainobj.mode = "save";
	//var arr = new Array();
	var domainval = "";
	for(var i=0;i < rowarry.length;i++)
	{
		//var obj = new Object();
		var valname = getTag("domain_info","domain_info_list").tab.tbody.Rows[i].Cells[1].text_a.entity.value;
		//obj.domainname = valname;
		var valmac = getTag("domain_info","domain_info_list").tab.data[i]["domainmac"];
		//obj.domainmac = valmac;
		//arr.push(obj);
		domainval += valmac + "/" + valname +",";
	}
	domainval = domainval.slice(0,domainval.length-1);
	domainobj.domain_info_list = domainval;
	//alert(domainobj);
	setAppDataurl('save','network_device_name_set',domainobj,function(data){
		$.Refresh();
		});
	
}
function set_Domain_save(){
	$.CurrentApp = "ND_Named";
	if(!checkTag(["domain_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	obj.Domain_text = getTag("domain_info","Domain_text").text.entity.value;
	
	setAppDataurl('save','device_network_name_set',obj,function(data){
		$.Refresh();
		});	
	}
