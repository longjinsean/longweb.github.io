/************************************* 网络》远程管理》ITMS服务器 *************************************/
file_form1 = null;
file_val1 = null;
target1 = null;
function init_nmitms_set(){
	if(document.getElementById('userlevel').value == '1'){
		$.CurrentApp = "NM_ITMS";
		getRequestData("tr69_inform_show",{"no":"no"},function(data){
			Middleware_display();
			setAppTagData(data);
			if(data.Tr69Inform_checkbox == "1")
			{
				getTag("itms_info","Tr69Inform_checkbox").checkbox.entity.checked = true;
			}else
			{
				getTag("itms_info","Tr69Inform_checkbox").checkbox.entity.checked = false;
			}
			getTagDom("Import_info","itmsfile","file").setAttr({
				"allowtransparency":"yes",
				"width":"460px",
				"height":"25px",
				"scrolling":"no",
				"border":"0",
				"id":"Import_frame",
				"src":"./certificate.html"
			});
			getTag("Import_info","Import_file").btn.entity.value=$.CommonLan['import'];
			getTag("Import_info","Import_file").text.entity.style.width="200px";
			getTagDom("Import_info","itmsfile","file").entity.setAttribute("frameborder","0",0);
			disableDom(getTag("Import_info","Import_file").text,true);

			getTag("Import_info","Import_file").btn.entity.onclick = function(){
				$.CurrentApp="NM_ITMS";
				/*执行选择证书函数*/
				file_form1.import1.click();
				file_form1.import1.onchange =function(){
					getTag("Import_info","Import_file").text.entity.value = file_form1.import1.value;
				}
				getTag("Import_info","Import_file").text.entity.value = file_form1.import1.value;
			}
		});
		init_loid_set();
	}
	else
	{
		$.CurrentApp = "NM_Loid";
		init_loid_set();
	}

}
/*配置保存页面的其他数据*/
function set_itms_save(){
	$.CurrentApp = "NM_ITMS";
	if(!checkTag(["itms_info"])){return;}
	var informtime=ID("Informinter_text").value;
	if((parseInt(informtime)< 1)||(parseInt(informtime)>86400 )){
	    checkShow(getTag("itms_info","Informinter_text").text,$.CommonLan['range_err']);return;
	}	
	if(getTag("itms_info","Middleware_select").select.entity.value != '1')
	{
		var portnum=getTag("itms_info","MldPort_text").text.entity.value;
		if((parseInt(portnum)< 1)||(parseInt(portnum)>65535 )){
	    checkShow(getTag("itms_info","MldPort_text").text,$.CommonLan['range_err']);return;
		}	
		var ipaddr=getTag("itms_info","MldAddr_text").text.entity.value;
		var reg = /^((22[0-3])|(2[0-1]\d)|(1\d\d)|([1-9]\d)|[1-9])(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}$/;
		if(!reg.test(ipaddr))
		{
			checkShow(getTag("itms_info","MldAddr_text").text,$.CommonLan['ip_addr_err']);return;
		}
		var str2=ipaddr.split(".");
		if(str2[0]==127){
			checkShow(getTag("itms_info","MldAddr_text").text,$.CommonLan['ip_addr_err']);return;
		}
	}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	
	if(getTag("itms_info","Tr69Inform_checkbox").checkbox.entity.checked)
	 {
	 	obj.Tr69Inform_checkbox = '1';
	 }
	else
	 {
	 	obj.Tr69Inform_checkbox = '0';
	 }
	obj.Informinter_text = getTag("itms_info","Informinter_text").text.entity.value;
	obj.Acsurl_text = getTag("itms_info","Acsurl_text").text.entity.value;
	obj.AcsUserName_text = getTag("itms_info","AcsUserName_text").text.entity.value;
	obj.AcsPassWord_password = getTag("itms_info","AcsPassWord_password").text.entity.value;
	obj.ConnReqName_text = getTag("itms_info","ConnReqName_text").text.entity.value;
	obj.ConnReqPassWord_password = getTag("itms_info","ConnReqPassWord_password").text.entity.value;
	obj.Middleware_select = getTag("itms_info","Middleware_select").select.entity.value;
	obj.MldAddr_text = getTag("itms_info","MldAddr_text").text.entity.value;
	obj.MldPort_text = getTag("itms_info","MldPort_text").text.entity.value;
	
	setAppDataurl('save','tr69_inform_set',obj,function(data){
		$.Refresh();
		});	
	
	
}
/*上传证书*/
function itmssave_set(){
	$.CurrentApp="NM_ITMS";
	if(getTag("Import_info","Import_file").text.entity.value==''){
		$.CurrentApp="import_err";				
		checkShow(ID('Import_file'),$.CommonLan['import_err']);return;
	}
	//$.lockWin();
	try{
		file_form1.submit();
		$.lockWin($.CommonLan['cardupload']);
		var import_timer=window.setInterval(function(){
			if(target1.contentWindow.document.body.innerText != "")
			{
					window.clearInterval(import_timer); 
					if((target1.contentWindow.document.body.innerText.indexOf("SUCCESS")) != -1)
					{
						$.unlockWin($.CommonLan['uploadsuccess']);
					}
					else if((target1.contentWindow.document.body.innerText.indexOf("fileopenfaild")) != -1)
					{
						$.unlockWin($.CommonLan['uploadfailed']);
					}
			}
		}, 1000);
	}catch(e){};
}
function Middleware_display(){
	$.CurrentApp = "NM_ITMS";
	if(getTag("itms_info","Middleware_select").select.entity.value == '1')
	{
		 getTag("itms_info","MldAddr_text").text.entity.disabled=true;
		 getTag("itms_info","MldPort_text").text.entity.disabled=true;
	}
	else
	{
		 getTag("itms_info","MldAddr_text").text.entity.disabled=false;
		 getTag("itms_info","MldPort_text").text.entity.disabled=false;
	}
	
}
/************************************* 网络》远程管理》逻辑ID认证 *************************************/
function init_loid_set(){
	$.CurrentApp = "NM_Loid";
	getRequestData("web_loid_show",{"no":"no"},function(data){
		setAppTagData(data);
		if(data.Loidpwd_checkbox == "1")
		{
			getTag("nm_Loid_info","Loidpwd_checkbox").checkbox.entity.checked = true;
		}else
		{
			getTag("nm_Loid_info","Loidpwd_checkbox").checkbox.entity.checked = false;	
		}
		loid_password_disable();
});
}
function set_loid_save(){
	$.CurrentApp = "NM_Loid";
MOD = "save";
	var obj = new Object();
	obj.mode = "save";
	//obj.onuSN_text = getTag("nm_Loid_info","onuSN_text").text.entity.value;
	if(getTag("nm_Loid_info","Loidpwd_checkbox").checkbox.entity.checked)
	 {
	 	obj.Loidpwd_checkbox = '1';
	 }
	else
	 {
	 	obj.Loidpwd_checkbox = '0';
	 }
	obj.LoidId_text = getTag("nm_Loid_info","LoidId_text").text.entity.value;
	obj.Pwd_password = getTag("nm_Loid_info","Pwd_password").text.entity.value;
	
	setAppDataurl('save','web_loid_set',obj,function(data){
		//$.Refresh();
		init_loid_set();
		});	

}
function loid_password_disable(){
	$.CurrentApp = "NM_Loid";
if(getTag("nm_Loid_info","Loidpwd_checkbox").checkbox.entity.checked == true)
	  {  
	  	setTagDomAction("nm_Loid_info",["Pwd_password"],null,'show');
	  }
else 
	  {  
	  	setTagDomAction("nm_Loid_info",["Pwd_password"],null,'hide');
	  }	
}
function itms_Certified(){


}
