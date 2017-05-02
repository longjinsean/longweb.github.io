// 配置当前版本表单需要的数据（注：须根据不同版本配置）
var TableList = {
	//"test"				:['id','type','ip','mac'],
	//'ap_scan_list'			:['wl_ss_ssid','wl_ss_bssid','wl_ss_channel','wl_ss_mode','wl_ss_secmo','wl_ss_sin']
}
//  从CGI获取到参数后首先转换成页面需要的值。
function parameLogic(parame){
	//var data = new Object();
	obj2obj($.DataMap,parame);
	//设置所有CGI返回的表单适应页面
/*	for(var i in TableList){
		var obj = new Array();
		if(!data[i]){continue;}
		for(var k=0;k<data[i].length;k++){
			obj[k] = {};
			for(var j in TableList[i]){
				var par = TableList[i][j];
				obj[k][par] = data[i][k][TableList[i][j]];
			}
		}
		data[i] = obj;
	}*/
	return parame;
}

//  逻辑显示设置。
/* anhui */
var CONFIG_WEB_LOID_DISABLED = '0';
var CONFIG_WEB_ITMS_DISABLED = '0';
/* neimeng,jilin */
var CONFIG_WEB_ITMS_DISABLED_2 = '0';
function inLogic(n){
//alert(accountlevel);
	if($.DataMap.areaversion == "anhui")
	{
		CONFIG_WEB_LOID_DISABLED = '1';
		CONFIG_WEB_ITMS_DISABLED = '1';
	}else if($.DataMap.areaversion == "neimeng")
	{
		CONFIG_WEB_ITMS_DISABLED_2 = '1';
	}else if($.DataMap.areaversion == "jilin")
	{
		CONFIG_WEB_ITMS_DISABLED_2 = '1';
		if(accountlevel == 2)
		{
			CONFIG_WEB_LOID_DISABLED = '1';
		}
	}else if($.DataMap.areaversion == "yiqi")
	{
		CONFIG_WEB_ITMS_DISABLED_2 = '1';
	}
	switch(n){
		case 'MD_Device':
		if($.DataMap.CONFIG_WEB_RESTORE == '1')
		{
			getTag("MDdevice_info","factoryset_all_label").show();	
			getTag("MDdevice_info","factoryset_all_tips_label").show();	
			getTag("MDdevice_info","factoryset_all_button").show();	
		}
		else
		{
			getTag("MDdevice_info","factoryset_all_label").hide();	
			getTag("MDdevice_info","factoryset_all_tips_label").hide();	
			getTag("MDdevice_info","factoryset_all_button").hide();	
		}
		break;
		case 'NN_WAN':
		if($.DataMap.lanportnum == '4')
		{
			getTag("wan_set_label","wan_port").checkbox3.show();
			getTag("wan_set_label","wan_port").checkbox4.show();
			getTag("wan_set_label","wan_port").after3.show();
			getTag("wan_set_label","wan_port").after4.show();
		}
		else if($.DataMap.lanportnum == '2')
		{
			getTag("wan_set_label","wan_port").checkbox3.hide();
			getTag("wan_set_label","wan_port").checkbox4.hide();
			getTag("wan_set_label","wan_port").after3.hide();
			getTag("wan_set_label","wan_port").after4.hide();
		}else
		{
			getTag("wan_set_label","wan_port").checkbox3.hide();
			getTag("wan_set_label","wan_port").checkbox4.hide();
			getTag("wan_set_label","wan_port").after3.hide();
			getTag("wan_set_label","wan_port").after4.hide();
		}
		if($.DataMap.wlannum == '0')
		{
			getTag("wan_set_label","ssid_port").checkbox1.hide();
			getTag("wan_set_label","ssid_port").checkbox2.hide();
			getTag("wan_set_label","ssid_port").checkbox3.hide();
			getTag("wan_set_label","ssid_port").checkbox4.hide();
			getTag("wan_set_label","ssid_port").after1.hide();
			getTag("wan_set_label","ssid_port").after2.hide();
			getTag("wan_set_label","ssid_port").after3.hide();
			getTag("wan_set_label","ssid_port").after4.hide();
		}else
		{
			getTag("wan_set_label","ssid_port").checkbox1.show();
			getTag("wan_set_label","ssid_port").checkbox2.show();
			getTag("wan_set_label","ssid_port").checkbox3.show();
			getTag("wan_set_label","ssid_port").checkbox4.show();
			getTag("wan_set_label","ssid_port").after1.show();
			getTag("wan_set_label","ssid_port").after2.show();
			getTag("wan_set_label","ssid_port").after3.show();
			getTag("wan_set_label","ssid_port").after4.show();
		}
		
		break;
		case 'NM_Loid':
		if(CONFIG_WEB_LOID_DISABLED == '1') 
		{
			if($.DataMap.itms_reg_status_index == '1')
			{
				getTag("nm_Loid_info","Loidpwd_checkbox").checkbox.entity.disabled = true;
				getTag("nm_Loid_info","LoidId_text").text.entity.disabled = true;
				getTag("nm_Loid_info","Pwd_password").text.entity.disabled = true;
				setTagDomAction("nm_Loid_info",["Applyloid_button"],null,'hide');
			}
			else
			{
				getTag("nm_Loid_info","Loidpwd_checkbox").checkbox.entity.disabled = false;
				getTag("nm_Loid_info","LoidId_text").text.entity.disabled = false;
				getTag("nm_Loid_info","Pwd_password").text.entity.disabled = false;
				setTagDomAction("nm_Loid_info",["Applyloid_button"],null,'show');
			}
		}
		break;
		case 'NM_ITMS':
		if(CONFIG_WEB_ITMS_DISABLED == '1')
		{
			getTag("itms_info","Acsurl_text").text.entity.disabled = true;
			getTag("itms_info","AcsUserName_text").text.entity.disabled = true;
			getTag("itms_info","ConnReqName_text").text.entity.disabled = true;
		}
		if(CONFIG_WEB_ITMS_DISABLED_2 == '1')
		{
			getTag("itms_info","AcsUserName_text").text.entity.disabled = true;
			getTag("itms_info","AcsPassWord_password").text.entity.disabled = true;
			getTag("itms_info","ConnReqName_text").text.entity.disabled = true;
			getTag("itms_info","ConnReqPassWord_password").text.entity.disabled = true;
		}
		break;
		
		case 'default':
			//getPan(1).display='0';
		break;
	}
}
//  提交参数时补充逻辑设置。
function setLogic(parame){
	var obj = new Object;
	obj.default_flag='1';
	obj2obj(parame,obj);
	return parame;
}

function getParame(obj){
	var str = '';
	for(var i in obj){
		str += i + ',';
	}
	str = str.substring(0,str.length-1);
	return str;
}
// 改变LAN口IP地址时的逻辑设置。


