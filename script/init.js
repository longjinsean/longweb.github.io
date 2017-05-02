nc.init({
	debug:true,		// if you want off-line Debug set true.
	language:'CN',		// set the language you want display.
	lock:true,
	maxLockTime:15,
	cgi_path:"/boaform/",
	menu1:($.CurrentApp!="Welcome")?ID("menu_layer1"):null,
	menu2:($.CurrentApp!="Welcome")?ID("menu_layer2"):null,
	//menu3:($.CurrentApp!="Welcome")?ID("menu_layer3"):null,
	content:($.CurrentApp!="Welcome")?ID("content_layer"):null,
	showlan:false,		// if false hidden the select language in welcome page.
	help:null			// if you want help set ID("help_layer").
},initMenu);

function initMenu(){
	var menu = new Menu({loadPage:"Status:Sta_Overview"});
}
