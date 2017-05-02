/* 一级菜单实现 */
function Parent(m,menu){
	Element.call(this,"TD:Menu_L1_Link");
	this.setID("Menu1_" + m.name);
	var _this = this;
	this.mode = m.mode;
	this.setClass("Menu_L1_Link");
	this.name=m.name;
	
	this.html($.CommonLan[m.name]);

	this.entity.onclick = function(){
		$.CurrentModule = m.name;
		//document.getElementById("LocationDisplay").innerHTML = $.CommonLan[m.name+"1"];
		document.getElementById("LocationDisplay").innerHTML = $.CommonLan[m.name];
		for(var i=0;i<menu.Parent.length;i++){
			var p = menu.Parent[i];
			p.entity.className = 'Menu_L1_Link';
			_this.entity.className = 'Menu_L1_Active';
		}
		
		menu.Child = new Array();
		for(var i=0;i<menu.Panel.length;i++){
			menu.Panel[i].show();
			if($.CurrentModule != menu.Panel[i].parenttip)
			{
				menu.Panel[i].hide();
			}else
			{
				menu.Child.push(menu.Panel[i]);
			}
			menu.Panel[i].entity.className = 'Menu_L2_Link';
		}
		menu.Child[0].entity.onclick();
	}
	return this;
}

/* 二级菜单实现 */
function PannelChild(m,menu,p,t){
	Element.call(this,"TD:Menu_L2_Link");
	this.setID("Menu2_" + m.name);
	var _this = this;
	this.mode = m.mode;
	this.setClass("Menu_L2_Link");
	this.name=m.name;
	this.parenttip=p;
	this.html(m.Lan.txt+"<span style=\"color:#000000;font-weight:bold;\">|</span>");

	this.entity.onclick = function(){
		$.CurrentApptip = m.name;
		for(var i=0;i<menu.Parent.length;i++){
			var p = menu.Parent[i];
			p.entity.className = 'Menu_L2_Link';
			_this.entity.className = 'Menu_L2_Active';
		}
		
		menu.Child = new Array();
		for(var i=0;i<menu.Panel.length;i++){
			var thmenu = menu.Panel[i]; 
			menu.Panel[i].show();
			if($.CurrentApptip != thmenu.parenttip)
			{
				menu.Panel[i].hide();
			}else
			{
				menu.Panel[i].show();
				menu.Child.push(menu.Panel[i]);
			}
			menu.Panel[i].entity.className = 'Item_L2';
		}
		var bs = t;
		for(var k in bs)
		{
			$.CurrentApp = bs[k].name;
		}
		nc.load(m.name);
		//menu.Child[0].entity.onclick();
	}
	return this;
}

/* 三级菜单实现 */
function threeChild(m,menu,p,r){
	Element.call(this,"TD:Item_L2");
	this.setID("Menu3_" + m.name);
	var _this = this;
	this.setClass("Item_L2");
	this.name=m.name;
	this.parenttip = p;
	this.roottip = r;
	this.html(m.Lan.txt+"&nbsp;&nbsp;&nbsp;");

	this.entity.onclick = function(){
		$.CurrentApp = m.name;
		for(var i=0;i<menu.Parent.length;i++){
			var p = menu.Parent[i];
			p.entity.className = 'Item_L2';
			_this.entity.className = 'Item_L1';
		}
		nc.load(m.name);
	}
	return this;
}

function Menu(o){
	$.CurrentModule = o.loadPage.split(":")[0];	
	$.CurrentApptip = o.loadPage.split(":")[1];
	$.CurrentApp = o.loadPage.split(":")[2];
	
	var menuone = document.createElement("TABLE");
	var menuonetbody = document.createElement("TBODY");
	var menuonetr = document.createElement("TR");
	menuonetr.Parent = new Array();
	menuonetr.Panel = new Array();
	
	var menutwo = document.createElement("TABLE");
	var menutwotbody = document.createElement("TBODY");
	var menutwotr = document.createElement("TR");

	menutwotr.Parent = new Array();
	menutwotr.Panel = new Array();

	
	
	var menuthree = document.createElement("TABLE");
	var menuthreetbody = document.createElement("TBODY");
	menuthree.Parent = new Array();

	
	var ms = $.Modules;
	for(var i in ms)
	{   
		if(checknobj(i))
		{
			continue;	
		}
		
		var menuonetd = new Parent(ms[i],menuonetr);
		menuonetr.appendChild(menuonetd.entity);  
		menuonetr.Parent.push(menuonetd);  
		
		var as = ms[i].Appstip;
		for(var j in as)
		{
			if(checknobj(j))
			{
				continue;	
			}
			
			var menutwotd = new PannelChild(as[j],menutwotr,i,as[j].Apps);
			menutwotr.appendChild(menutwotd.entity);
			menutwotr.Parent.push(menutwotd);
			menuonetr.Panel.push(menutwotd);
			/*
			var bs = as[j].Apps;
			for(var k in bs)
			{
				if(checknobj(k))
				{
					continue;	
				}
				var menuthreetr = document.createElement("TR");
				var menuthreetd = new threeChild(bs[k],menuthree,j,i);
				menuthreetr.appendChild(menuthreetd.entity);
				menuthree.Parent.push(menuthreetd);
				menutwotr.Panel.push(menuthreetd);
				
				menuthreetbody.appendChild(menuthreetr);
			}
			*/
		}
	
	}
	
	menuonetbody.appendChild(menuonetr);
	menuone.appendChild(menuonetbody);
	menutwotbody.appendChild(menutwotr);
	menutwo.appendChild(menutwotbody);
	//menuthree.appendChild(menuthreetbody);
	
	$.MenuLayer1.appendChild(menuone);
	$.MenuLayer2.appendChild(menutwo);
	//$.MenuLayer3.appendChild(menuthree);
	
	
	var clear = new Element("DIV");
	clear.setAttr({"style":"clear:both"});
	$.MenuLayer1.appendChild(clear.entity);
	$.MenuLayer2.appendChild(clear.entity);
	//$.MenuLayer3.appendChild(clear.entity);
	
	ID("Menu1_" + $.CurrentModule).onclick();
}


