/************************************* 诊断》业务诊断》语言诊断 *******************************************/
function init_Busdiagnose_set(){
	//getRequestData("line_diagnose_exe",{"no":"no"},function(data){
	//	setAppTagData(data);
	//});
}
function linediagnose_save(){
	getRequestData("line_diagnose_exe",{"no":"no"},function(data){
		setAppTagData(data);
	});
}
function Simulation_save(){
//	if(!checkTag(["Simulation_info"])){return;}
	MOD = "save";
	var obj = new Object();
	obj.mode = "save";

	obj.Simulate_Test_number = getTag("Simulation_info","Simulationnum_text").text.entity.value;
	setAppDataurl(null,'calling_phone_test',obj,function(data){
		if(data.ucStatus == '0')
		{
			data.ucStatus = $.CommonLan[""];
		}
		else if(data.ucStatus == '1')
		{
			data.ucStatus = $.CommonLan["hook"];
		}
		else if(data.ucStatus == '2')
		{
			data.ucStatus = $.CommonLan["calling"];
		}
		else if(data.ucStatus == '3')
		{
			data.ucStatus = $.CommonLan["creat_connect"];
		}
		else if(data.ucStatus == '4')
		{
			data.ucStatus = $.CommonLan["finish_connect"];
		}
		else if(data.ucStatus == '5')
		{
			data.ucStatus = $.CommonLan["Processing"];
		}
		else if(data.ucStatus == '6')
		{
			data.ucStatus = $.CommonLan["link_success"];
		}
		else if(data.ucStatus == '7')
		{
			data.ucStatus = $.CommonLan["test_over"];
		}
		else
		{
			data.ucStatus = "";
		}
		//////
		if(data.result1 == '0')
		{
			data.result1 = $.CommonLan["test_fail"];
		}
    else if(data.result1 == '1')
    {
    	data.result1 = $.CommonLan["test_success"];
    }		
    else
    {
    	data.result1 = "";
    }
		/////
		if(data.result2 == '0')
		{
			data.result2 = $.CommonLan["no_call"];
		}
		else if(data.result2 == '1')
		{
			data.result2 = $.CommonLan["hook_release"];
		}
		else if(data.result2 == '2')
		{
			data.result2 = $.CommonLan["dialing_release"];
		}
		else if(data.result2 == '3')
		{
			data.result2 = $.CommonLan["call_fail"];
		}
		else if(data.result2 == '4')
		{
			data.result2 = $.CommonLan["noresponse"];
		}
		else if(data.result2 == '5')
		{
			data.result2 = $.CommonLan["call_fail"];
		}
		else
		{
			data.result2 = "";
		}
		////
		if(data.result3 == '0')
		{
			data.result3 = $.CommonLan["unable_access"];
		}
    else if(data.result3 == '1')
    {
    	data.result3 = $.CommonLan["hook_release"];
    }		
    else if(data.result3 == '2')
    {
    	data.result3 = $.CommonLan["noresponse"];
    }	
    else
    {
    	data.result3 = "";
    }
		getTag("Simulation_info","Simulationnum_text").text.entity.value = data.linenum;
		getTagDom("Simulation_info","Simulation_result","context").html(data.ucStatus+','+data.result1+','+data.result2+','+data.result3);
		});	
}

/************************************* 诊断》预检修》预检修 *******************************************/
function init_predictive_set(){
	
	
	
}
function predictivebtn_save(){
	/*
	getRequestData("maintain_end_done",{"no":"no"},function(data){
	});*/
}