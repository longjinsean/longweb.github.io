/************************************* 软件升级 *************************************/
file_form = null;
file_val=null;
function init_upgrade_set(){
	setAppTagData($.DataMap);
	getPan("load_info").hide();
	getTagDom("upgrade_info","upgradefile","file").setAttr({
		"allowtransparency":"yes",
		"width":"460px",
		"height":"25px",
		"scrolling":"no",
		"border":"0",
		"id":"update_frame",
		"src":"./update.html"
	});
	getTag("upgrade_info","updata_file").btn.entity.value=$.CommonLan['browse'];
	getTag("upgrade_info","updata_file").text.entity.style.width="250px";
	getTagDom("upgrade_info","upgradefile","file").entity.setAttribute("frameborder","0",0);
	disableDom(getTag("upgrade_info","updata_file").text,true);
	
	getTag("upgrade_info","updata_file").btn.entity.onclick = function(){
		$.CurrentApp="MU_upgrade";					
	    file_form.update.click();
	    file_form.update.onchange =function(){ 
	        getTag("upgrade_info","updata_file").text.entity.value = file_form.update.value;
	    }
		getTag("upgrade_info","updata_file").text.entity.value = file_form.update.value;
	}
}

function upgrade_set(){
	$.CurrentApp="MU_upgrade";
	if(getTag("upgrade_info","updata_file").text.entity.value==''){
		$.CurrentApp="update_err";			
		checkShow(ID('updata_file'),$.CommonLan['update_err']);return;
	}
		
	getPan("load_info").show();
	getPan("upgrade_info").hide();
	
	$.lockWin();
	window.onresize = function(){$.lockWin();}
	getTag("load_info","load").setTimeout(280);
	try{
		file_form.submit();
		//check_update_faild("update_faild",13000);
	}catch(e){};
}

function check_update_faild(info,time){
/*	window.setTimeout(function(data){
		getRequestData("form_upload_file",{"up_grade_set":"1"},function(data){
			if(data.upgrade_err&&data.upgrade_err!=0){
				getPan("load_info").hide();
				getPan("upgrade_info").show();
				$.lockWin(" ");
				$.unlockWin($.CommonLan[info]);
			}else if((data.upgrade_err == 0) || (data.upgrade_err == "") || (data.upgrade_err == null))
			{
				$.unlockWin("");		
			}
		});
	},time); */
}

