var APINPUT = null;
var APMAC = '';
var APSSID = '';
var APCHAN = '';
var MOD = "save";
var MODData = '';
var sec_map = {'0':'None','1':'WEP','2':'WPA-PSK','3':'WPA2-PSK','4':'WPA/WPA2-PSK'};
var net_map = {'0':'AP','1':'WDS','2':'AP+WDS','3':'CLIENT','4':'REPEATER'};
var wisp_map = {'3':'WISP-PPPoE','1':'WISP-Dynamic IP','0':'WISP-Static IP'};
var comm_map = {'3':'PPPoE','1':'动态IP','0':'静态IP','4':'Russia PPPoE','5':'Unifi PPPoE','6':'L2TP/Russia L2TP','7':'PPTP/Russia PPTP'};

var subdebug = false;
var check_item = new Array();  /*checkbox tab 选择子项，其中flag==1的为选中项。*/
var check_port = new Array();

var accountlevel = "2";
accountlevel = document.getElementById("userlevel").value;

var change_reboot = 0;
var idle_time = 0;
/**************每隔10s页面重新从CGI获取一次数据***********/
var refresh_time = null;
function refresh_ten_time(){
	if(refresh_time!=null){
		window.clearInterval(refresh_time);
	}
	refresh_time = window.setInterval(function(){getAppData(function(data){$.Refresh();})},10000);
}
/**************checkbox选择***********/
function check_sel(p1,p2){
	if(p1)
	{
		var obj = new Object();
		obj.flag = 1;
		obj.name = p2.data.name;
		check_item.push(obj);
	}else
		{
			for(var i in check_item)
			{
				if(check_item[i].name==p2.data.name)
				{
					 check_item[i].flag = 0;
				}
			}
		}
	var debugstr="";
	for(var i in check_item)
	{
		if(check_item[i].flag)
		{
			debugstr+=check_item[i].name+",\n";
		}
	}
	if(subdebug)
	{
		alert(debugstr);
	}
}
function check_selqos(p1,p2){
	if(p1)
	{
		var obj = new Object();
		obj.flag = 1;
		obj.name = p2.data.name;
		obj.index = p2.data.typeIndex;
		check_item.push(obj);
	}else
		{
			for(var i in check_item)
			{
				if(check_item[i].name==p2.data.name)
				{
					 check_item[i].flag = 0;
				}
			}
		}
	var debugstr="";
	for(var i in check_item)
	{
		if(check_item[i].flag)
		{
			debugstr+=check_item[i].name+",\n";
		}
	}
	if(subdebug)
	{
		alert(debugstr);
	}
}
function all_port_choose(p){
	check_item = [];
	var tab = getTag("ethinterp","attribute").tab;
	tab.tbody.checkall(p);
}

function init_help_set(){
}

function log_out()
{
	getRequestData("web_logout_ext",{"user_level":"1"},function(data){
		var nonedatav = Math.random();
		window.location = "./index.html?none="+nonedatav;
	});
	
}

function log_out_user()
{
	getRequestData("web_logout_ext",{"user_level":"2"},function(data){
		var nonedatav = Math.random();
		window.location = "./index.html?none="+nonedatav;
	});
}

function idle_time_clean()
{	
	idle_time = 0;
}

function idle_time_get()
{
	return idle_time;
}

function idle_time_increase()
{
	idle_time++;
}
















