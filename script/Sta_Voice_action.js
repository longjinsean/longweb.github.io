/************************************* 状态》语音信息》语音信息 *************************************/
/*function init_Voiceinfo_set(){
	getRequestData("voice_user_show",{"no":"no"},function(data){
		for(var j in data.voice_satus_list){
			if(data.voice_satus_list[j].Table_voice_1_3_status_table == '0')
			{
				data.voice_satus_list[j].Table_voice_1_3_status_table = $.CommonLan['nofinishset'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_3_status_table == '1')
			{
				data.voice_satus_list[j].Table_voice_1_3_status_table = $.CommonLan['noenabled'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_3_status_table == '2')
			{
				data.voice_satus_list[j].Table_voice_1_3_status_table = $.CommonLan['Registring'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_3_status_table == '3')
			{
				data.voice_satus_list[j].Table_voice_1_3_status_table = $.CommonLan['registered_success'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_3_status_table == '4')
			{
				data.voice_satus_list[j].Table_voice_1_3_status_table = $.CommonLan['registered_faild'];
			}
			else
			{
				data.voice_satus_list[j].Table_voice_1_3_status_table = "";
			}
			//注册错误信息
			if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '0')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err0'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '1')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err1'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '2')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err2'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '3')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err3'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '4')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err4'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '5')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err5'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '6')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err6'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '7')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err7'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '8')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err8'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '9')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = $.CommonLan['Registration_err9'];
			}
			else if(data.voice_satus_list[j].Table_voice_1_4_wrong_table == '10')
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = "";
			}
			else
			{
				data.voice_satus_list[j].Table_voice_1_4_wrong_table = "";
			}
		}
		setAppTagData($.DataMap);
	});
}*/
