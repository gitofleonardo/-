function loadlayer(){
	return parent.layer.load();
}
function htStatus(){
	var status =$("input[name=status]:checked").val();
	if(typeof(status) == "undefined"){
		parent.layer.msg("请选择审核状态！", 2, 8);
		return false;
	}
	loadlayer();
}
function tcdiv(){
	var r_status =$("input[name=r_status]:checked").val();
	if(typeof(r_status) == "undefined"){
	   parent.layer.msg("请选择审核状态！", 2, 8);
	   return false;
	}
	loadlayer();
}
function toDate(str){
    var sd=str.split("-"); 
    return new Date(parseInt(sd[0]),parseInt(sd[1]),parseInt(sd[2]));
}
function check_username(){
	var username=$.trim($("#username").val());
	var pytoken=$.trim($("#pytoken").val());
	if(username){
		$.post("index.php?m=admin_resume&c=checkUsername",{username:username,pytoken:pytoken},function(data){
			if(data){
				res = JSON.parse(data);
				if(res.error){
					layer.tips(res.msg,"#username" , {guide: 1,style: ['background-color:#F26C4F; color:#fff;top:-7px', '#F26C4F']});
					$("#username").attr("vtype",'1');
				}else if($("#username").attr('vtype')=='1'){
					layer.closeAll('tips');
					$("#username").attr("vtype",'0');
				}
			}
		});
	}
}
 
function returnmessage(frame_id){
	if(typeof(parent.layer) != 'undefined'){
		parent.layer.closeAll('loading');
	}
	if(typeof(layer) != 'undefined'){
		layer.closeAll('loading');
	}

	if(frame_id==''||frame_id==undefined){
		frame_id='supportiframe';
	}
	
	var message = $(window.frames[frame_id].document).find("#layer_msg").val();
	if(message != null){
		var layerTmp ;
		if(typeof(parent.layer) != 'undefined'){
			layerTmp = parent.layer;
		}
		else{
			layerTmp = layer;
		}

		var url=$(window.frames[frame_id].document).find("#layer_url").val();
		var layer_time=$(window.frames[frame_id].document).find("#layer_time").val();
		var layer_st=$(window.frames[frame_id].document).find("#layer_st").val();
		if(url=='1'){
			layerTmp.msg(message, layer_time, Number(layer_st),function(){ location.reload();});
		}else if(url==''){
			layerTmp.msg(message, layer_time, Number(layer_st));
		}else{
			layerTmp.msg(message, layer_time, Number(layer_st),function(){location.href = url;});
		}
	}
}
function clearqrcode(url){
    $.post(url,{},function(message){
        parent.layer.msg(message, 1, 9,function(data){
			window.location.reload();
		});
    });
}
function clearloginlog(url){
    $.post(url,{},function(message){
        parent.layer.msg(message, 1, 9,function(data){
			window.location.reload();
		});
    });
}
function config_msg(data){
	$("body").append(data);
	var message = $("#layer_msg").val();
	var url=$("#layer_url").val();
	var layer_time=$("#layer_time").val();
	var layer_st=$("#layer_st").val();
	if(url=='1'){
		parent.layer.msg(message, layer_time, Number(layer_st),function(){
			location.reload();
			// parent.layer.closeAll('loading');
		});
	}else if(url==''){
		parent.layer.msg(message, layer_time, Number(layer_st), function(){
			// parent.layer.closeAll('loading');
		});
	}else{
		parent.layer.msg(message, layer_time, Number(layer_st),function(){
			top.location.href =url;
			// parent.layer.closeAll('loading');
		});
	}
	return false;
}
function resetpw(uname,uid){
	var pytoken = $('#pytoken').val();
	var pwcf = parent.layer.confirm("确定要重置密码吗？",function(){
		$.get("index.php?m=user_member&c=reset_pw&uid="+uid+"&pytoken="+pytoken,function(data){
			parent.layer.close(pwcf);
			parent.layer.alert("用户："+uname+" 密码已经重置为123456！", 9);
		});
	});
}
function really(name){
	var chk_value =[];
	$('input[name="'+name+'"]:checked').each(function(){
		chk_value.push($(this).val());
	});
	if(chk_value.length==0){
		parent.layer.msg("请选择要删除的数据！",2,8);return false;
	}else{
		var delcf = parent.layer.confirm("确定删除吗？",function(){
			parent.layer.close(delcf);
			parent.layer.load('执行中，请稍候...',0);
 			setTimeout(function(){$('#myform').submit()},0);
		});
	}
}
function layer_logout(url){
	loadlayer();
	$.get(url,function(data){
		parent.layer.closeAll('loading');
		var data=eval('('+data+')');
		if(data.url=='1'){
			parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){top.location.reload();});return false;
		}else{
			parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){top.location.href=data.url;});return false;
		}
	});
}
function layer_del(msg,url){
	if(msg==''){
		loadlayer();
		$.get(url,function(data){
			parent.layer.closeAll('loading');
			var data=eval('('+data+')');
			if(data.url=='1'){
				parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){location.reload();});return false;
			}else{
				parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){location.href=data.url;});return false;
			}
		});
	}else{
		var pytoken = $('#pytoken').val();
		parent.layer.confirm(msg, function(){
			loadlayer();
			$.get(url+'&pytoken='+pytoken,function(data){
				parent.layer.closeAll();
				var data=eval('('+data+')');
				if(data.url=='1' || data.url == ''){
					parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){location.reload();});return false;
				}else{
					parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){location.href=data.url;});return false;
				}
			});
		});
	}
}
function unselectall(){
	if(document.getElementById('chkAll') && document.getElementById('chkAll').checked){
		document.getElementById('chkAll').checked = document.getElementById('chkAll').checked&0;
	}
	if(document.getElementById('chkAll2') && document.getElementById('chkAll2').checked){
		document.getElementById('chkAll2').checked = document.getElementById('chkAll2').checked&0;
	}
	getbg();
}
function CheckAll(form){
	for (var i=0;i<form.elements.length;i++){
		var e = form.elements[i];
		if (e.Name != 'chkAll'&&e.disabled==false){
			e.checked = form.chkAll.checked;
		}
	}
	getbg();
}
function CheckAll2(form){
	for (var i=0;i<form.elements.length;i++){
		var e = form.elements[i];
		if (e.Name != 'chkAll2'&&e.disabled==false){
			e.checked = form.chkAll2.checked;
		}
	}
	getbg();
}
function getbg(){
	$("tr").attr("style","");
	var id;
	$("input[type=checkbox]:checked").each(function(){
		id=$(this).val();
		$("#list"+id).attr("style","background:#d0e3ef;");
	});
} 
function Close(id){
	$("#"+id).hide();
}
$(document).ready(function(){
	$("#domain_name").click(function(){
		$("#domain_list").show();
	});
	$(".admin_new_tip_close").click(function(){
		$(".admin_new_tip").animate({height:'20px'},300);
		$(".admin_new_tip").animate({width:'120px'},500);
		$(".admin_new_tip_list_cont").hide().animate({height:'20px'},500);
		$(this).hide().animate({height:'20px'},500);
		$(".admin_new_tip_open").show().animate({height:'20px'},500);
	});
	$(".admin_new_tip_open").click(function(){
		$(".admin_new_tip_close").show().animate({height:'20px'},500);
		$(".admin_new_tip_list_cont").show().animate({height:'20px'},500);
		$(".admin_new_tip").animate({width:'97%'},500);
		var num=$(".admin_new_tip_list_cont>.admin_new_tip_list").length;
		var h=40+num*20;
		$(".admin_new_tip").animate({height:h+'px'},300);
		$(this).hide().animate({height:'20px'},500);
	});
	$(".admin_Operating_c").hover(function(){
		var aid=$(this).attr("aid");
		$("#list"+aid).show();
		$("#list_"+aid).attr("class","admin_Operating_c admin_Operating_hover");
		goTopEx("list"+aid);
	},function(){
		var aid=$(this).attr("aid");
		$("#list"+aid).hide();
		$("#list_"+aid).attr("class","admin_Operating_c");
		goTopEx("list"+aid);
	}); 
	$(".formselect").hover(function(){
		var did=$(this).attr("did");
		$("#"+did).show();
	},function(){
		var did=$(this).attr("did");
		$("#"+did).hide();
	}); 
	$(".admin_Prompt_close").click(function(){
		$(".admin_Prompt").hide();
	});
	/*高级搜索滑动效果*/ 
	if($(".admin_Filter").length > 0){ 
		var height=$(".admin_adv_search_box").height();  
		var admin_Filter=$(".admin_Filter").offset().top; 
		height=Math.abs(parseInt(height)-parseInt(admin_Filter));	 
		$(".admin_adv_search_box").css('top','-'+height+'px');
		$(".admin_search_div,.admin_adv_search_box").hover(function(){
			var top=parseInt(35)+parseInt(admin_Filter);
			$(".admin_search_div .admin_adv_search_bth").addClass('admin_adv_search_bth_hover'); 
			$(".admin_adv_search_box").stop().animate({top:top+'px'});
		},function(){     
			$(".admin_adv_search_box").stop().animate({top:'-'+height+'px'});
			$(".admin_search_div .admin_adv_search_bth").removeClass('admin_adv_search_bth_hover');		
		});
	};
	/*高级搜索结束*/
}) 
function formselect(val,id,name){ 
	$("#b"+id).val(name);
	$("#"+id).val(val);
	$("#d"+id).hide();
}
function goTopEx(id){
	var top=document.getElementById(id).getBoundingClientRect().top;
	var height=$(window).height();
	var height=height-5;
	$(".infoboxp").attr("style","min-height:"+height+"px;");
	var ttop=height-top;
	if(ttop<80){
		$("#"+id).attr("class","admin_Operating_list admin_Operating_up");
	}else{
		$("#"+id).attr("class","admin_Operating_list admin_Operating_down");
	}
}
function add_class(name,width,height,divid,url){
	if(url){$(divid).append("<input id='surl' value='"+url+"' type='hidden'/>");}
	$.layer({
		type : 1,
		title : name,
		offset: [($(window).height() - height)/2 + 'px', ''],
		closeBtn : [0 , true],
		border : [10 , 0.3 , '#000', true],
		area : [width+'px',height+'px'],
		page : {dom :divid}
	});
}
function status_div(name,width,height){
	$.layer({
		type : 1,
		title :name,
		offset: [($(window).height() - height)/2 + 'px', ''],
		closeBtn : [0 , true],
		border : [10 , 0.3 , '#000', true],
		area : [width+'px',height+'px'],
		page : {dom :"#status_div"}
	});
}
function copy_url(name,url){
	$("#copy_url").val(url);
	$.layer({
		type : 1,
		title : name,
		offset: [($(window).height() - 110)/2 + 'px', ''],
		closeBtn : [0 , true],
		border : [10 , 0.3 , '#000', true],
		area : ['350px','160px'],
		page : {dom :'#wname'}
	});
}
function copy_adclass(name,url){
	$("#copy_url").val(url);
	$.layer({
		type : 1,
		title : name,
		closeBtn : [0 , true],
		border : [10 , 0.3 , '#000', true],
		area : ['420px','320px'],
		page : {dom :'#wname'}
	});
}
function adminmap(){
	$.layer({
		type : 2,
		title : '后台地图',
		offset: [($(window).height() - 500)/2 + 'px', ''],
		closeBtn : [0 , true],
		border : [10 , 0.3 , '#000', true],
		area : ['700px','500px'],
		iframe: {src: 'index.php?c=map'}
	});
}
function rec_up(url,id,rec,type){
		var pytoken=$("#pytoken").val();
		$.get(url+"&id="+id+"&rec="+rec+"&type="+type+"&pytoken="+pytoken,function(data){
			if(data==1){
				if(rec=="1"){
					$("#"+type+id).html("<a href=\"javascript:void(0);\" onClick=\"rec_up('"+url+"','"+id+"','0','"+type+"');\"><img src=\"../config/ajax_img/doneico.gif\"></a>");
				}else{
					$("#"+type+id).html("<a href=\"javascript:void(0);\" onClick=\"rec_up('"+url+"','"+id+"','1','"+type+"');\"><img src=\"../config/ajax_img/errorico.gif\"></a>");
				}
			}
		});
}
function appendData(frame_id){
	var message = $(window.frames[frame_id].document).find("#layer_msg").html();
	$("#jobsynch").before(message);
	$("#viewMore").parent().parent().parent().find("tr:gt(10)").hide();
	$("#viewMore").parent().parent().show();
	$("#viewMore").click(function(){
		if($(this).html()=="查看详细"){
			$("#viewMore").parent().parent().parent().find("tr:gt(10)").show();
			$(this).html("收起详细");
		}
		else{
			$("#viewMore").parent().parent().parent().find("tr:gt(10)").hide();
			$(this).html("查看详细");
		}
	});
	$("#jobsynchFrom").show();
}
function check_email(strEmail) {
	 var emailReg = /^([a-zA-Z0-9\-]+[_|\_|\.]?)*[a-zA-Z0-9\-]+@([a-zA-Z0-9\-]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	 if (emailReg.test(strEmail))
	 return true;
	 else
	 return false;
 }
function isjsMobile(obj) {
	var reg= /^[1][3456789]\d{9}$/;   
	
    if (obj.length != 11) return false;
    else if (!reg.test(obj)) return false;
    else if (isNaN(obj)) return false;
    else return true;
}
function isjsTell(str) {
//	var result = str.match(/^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/);
	var result = str.match(/^[0-9-]+?$/);

	if (result == null) return false;
    return true;
}
function domain_show(num){
	if(num<=1){
		var height='100';
	}else{
		var height=parseInt(num)*38+60;
	} 
 	$.layer({
		type:1,
		title:'选择分站',
		closeBtn:[0,true],
		offset:['20%','30%'],
		border:[10 , 0.3 , '#000', true],
		area:['550px',height+'px'],
		page:{dom : '#domainlist'}
	});
}

//修改用户名
function editname(oldname){
	var username=$("#username").val();
	var uid=$("#uid").val();
	var pytoken=$("#pytoken").val();
	if(username.length<2||username.length>16){
		layer.msg("请输入2至16位字符的用户名！",2,8);return false;
	}
	if(username==oldname){
		layer.msg("用户名没有改变！",2,9);return false;
	}else{
		loadlayer();
		$.post("index.php?m=admin_company&c=saveusername",{username:username,uid:uid,pytoken:pytoken},function(data){
			parent.layer.closeAll('loading');
			
			if(data==1){
			
				layer.msg("用户名已存在！",2,8);
			}else if(data==2){
				
				layer.msg("用户名不得包含特殊字符！",2,8);
			}else{
				
				layer.msg("修改成功！",2,9);
			}
		});
	}
}
//添加只有一级类别的分类
function save_dclass(url){
	var pytoken=$("#pytoken").val(); 
	var position = $("#position").val().split("\n");
	var name=position.join("-");
	if(position==''){
		parent.layer.msg('类别名称不能为空！', 2, 8);return false;
	}
	loadlayer();
	$.post(url,{name:name,pytoken:pytoken},function(msg){
		parent.layer.closeAll('loading');
		if(msg==1){
			parent.layer.msg('已有此类别，请重新输入！', 2, 8);return false;
		}else if(msg==2){
			parent.layer.msg('添加成功！', 2,9,function(){location=location ;});return false;
		}else if(msg==3){
			parent.layer.msg('添加失败！', 2,8,function(){location=location ;});return false;
		}
	}); 
}
//添加带排序的分类（有二级）
function save_bclass(){
	var ctype=$('input[name="btype"]:checked').val(); 
	var nid=$("#keyid_val").val(); 
	var url=$('#surl').val();
	var position = $("#classname").val().split("\n");
	var name=position.join("-");
	if(position==''){
		parent.layer.msg('类别名称不能为空！', 2, 8);return false;
	}
	var pytoken=$("#pytoken").val();
	loadlayer();
	$.post(url,{ctype:ctype,nid:nid,name:name,pytoken:pytoken},function(msg){ 
		parent.layer.closeAll('loading');
		if(msg==1){ 
			parent.layer.msg('已有此类别，请重新输入！', 2, 8);return false;
		}else if(msg==2){
			parent.layer.msg('添加成功！', 2,9,function(){location=location ;});return false;
		}else if(msg==3){
			parent.layer.msg('添加失败！', 2,8,function(){location=location ;});return false;
		} 
	}); 
}
//添加带调用变量名的分类（有二级）
function save_class(){
	var ctype=$('input[name="ctype"]:checked').val();
	var nid=$('#nid_val').val();
	var url=$('#surl').val();
	var position = $("#position").val().split("\n");
	var name=position.join("-");
	var variable= $("#variable").val().split("\n");
	var str=variable.join("-");
	if(ctype==''||ctype==null){
		parent.layer.msg('请选择类型！', 2, 8);return false;
	}
	if(position==''){
		parent.layer.msg('类别名称不能为空！', 2, 8);return false;
	}
	if(ctype=='1'&&$.trim(variable)==''){
		parent.layer.msg('调用变量名不能为空！', 2, 8);return false;
	}
	loadlayer();
	$.post(url,{ctype:ctype,nid:nid,name:name,str:str,pytoken:$('#pytoken').val()},function(msg){
		parent.layer.closeAll('loading');
		if(msg==1){
			parent.layer.msg('已有此类别，请重新输入！', 2, 8);return false;
		}else if(msg==2){
			parent.layer.msg('添加成功！', 2,9,function(){location=location ;});return false;
		}else{
			parent.layer.msg('添加失败！', 2,8,function(){location=location ;});return false;
		}
	}); 
}
//添加新闻分类
function saveNclass(url){
	var pytoken=$("#pytoken").val(); 
	var position = $("#classname").val().split("\n");
	var name=position.join("-");
	var fid=$("#f_id_val").val();
	var rec=$("#rec_val").val();
	if(position==''){
		parent.layer.msg('类别名称不能为空！', 2, 8);return false;
	}
	loadlayer();
	$.post(url,{name:name,fid:fid,rec:rec,pytoken:pytoken},function(msg){
		parent.layer.closeAll('loading');
		if(msg==1){
			parent.layer.msg('已有此类别，请重新输入！', 2, 8);return false;
		}else if(msg==2){
			parent.layer.msg('添加成功！', 2,9,function(){location=location ;});return false;
		}else if(msg==3){
			parent.layer.msg('添加失败！', 2,8,function(){location=location ;});return false;
		}
	}); 
} 
function checksort(id){
	$("#sort"+id).hide();
	$("#input"+id).show();
	$("#input"+id).focus();
} 
function checkname(id){
	$("#name"+id).hide();
	$("#inputname"+id).show();
	$("#inputname"+id).focus();
}
function subsort(id,url){
	var sort=$("#input"+id).val();
	var pytoken=$("#pytoken").val();
	$.post(url,{id:id,sort:sort,pytoken:pytoken},function(data){
		$("#sort"+id).html(sort);
		$("#sort"+id).show();
		$("#input"+id).hide(); 
	})
}
function subname(id,url){
	var name=$("#inputname"+id).val();
	if($.trim(name)==""){
		parent.layer.msg("类别名称不能为空！",2,8,function(){location.reload();});return false;
	}
	var pytoken=$("#pytoken").val();
	$.post(url,{id:id,name:name,pytoken:pytoken},function(data){
		$("#name"+id).html(name);
		$("#name"+id).show();
		$("#inputname"+id).hide(); 
	})
}
function checke_name(id){
	$("#e_name"+id).hide();
	$("#inpute_name"+id).show();
	$("#inpute_name"+id).focus();
}
function sube_name(id,url){
	var e_name=$("#inpute_name"+id).val();
	var pytoken=$("#pytoken").val();
	$.post(url,{id:id,e_name:e_name,pytoken:pytoken},function(data){
		$("#e_name"+id).html(e_name);
		$("#e_name"+id).show();
		$("#inpute_name"+id).hide(); 
	})
}
function checkename(id){
	$("#ename"+id).hide();
	$("#inputename"+id).show();
	$("#inputename"+id).focus();
}
function subename(id,url){
	var name=$("#inputname"+id).val();
	var ename=$("#inputename"+id).val();
	var pytoken=$("#pytoken").val();
	$.post(url,{id:id,name:name,e_name:ename,pytoken:pytoken},function(data){
		$("#ename"+id).html(ename);
		$("#ename"+id).show();
		$("#inputename"+id).hide();
	})
}

//select4.3版新样式开始
function select_click(name){
	$("#"+name+"_select").show();//弹出框显示
}
function select_wx(name,val,valname){
	
	var name,val,valname;
	if(val!='0'){

		$('.buttonson').show();
		add_class('新增微信菜单','420','365','#houtai_div','');	
	}else{
		$('.buttonson').hide();
		add_class('新增微信菜单','420','365','#houtai_div','');		
	}
	$("#"+name+"_name").val(valname);//替换新名称
	$("#"+name+"_val").val(val);//替换新值
	$("#"+name+"_select").hide();//弹出框隐藏		
}	
function select_zph(name,val,valname,type){
	var name,val,valname;
	//招聘会场地
	if(val>0&&type=='job_keyid'){
		$("#content").hide();
		$("#pricelist").show();
		$.get("index.php?m=zph_space&c=ajaxspace&ajax=1&id="+val,function(data){	
			$("#job_keyid_select").html(data);
		});	
	}	
	$("#"+name+"_name").val(valname);//替换新名称
	$("#"+name+"_val").val(val);//替换新值
	$("#"+name+"_select").hide();//弹出框隐藏		
}
function select_ask(name,val,valname){
	var name,val,valname;	
	//问答
	if(name=='pid'){		
		$("#cid_name").val('请选择');				
	}
	var pytoken=$("#pytoken").val(); 
	$.post("index.php?m=admin_question&c=get_class",{pid:val,pytoken:pytoken},function(data){		   
		$("#cid_select").html(data); 
	});
	$("#"+name+"_name").val(valname);//替换新名称
	$("#"+name+"_val").val(val);//替换新值
	$("#"+name+"_select").hide();//弹出框隐藏		
}
function select_subject(name,val,valname){
	var name,val,valname;	
	//培训课程
	if(name=='nid'){		
		$("#tnid_name").val('请选择');				
	} 	
	$.post(weburl+"/index.php?m=ajax&c=ajax_subject", {"str":val},function(data) {
		$("#tnid_select").html(data);
	})	
	$("#"+name+"_name").val(valname);//替换新名称
	$("#"+name+"_val").val(val);//替换新值
	$("#"+name+"_select").hide();//弹出框隐藏		
}
//后台企业管理会员等级
function select_rating(name,val,valname){
	var name,val,valname;	
	var pytoken=$("#pytoken").val();
	if(val){
		$.post("index.php?m=admin_company&c=getrating",{id:val,pytoken:pytoken},function(data){
			if(data){
				var dataJson = eval("(" + data + ")"); 
				$('#lt_job_num').val(dataJson.lt_job_num);
				$('#lt_down_resume').val(dataJson.lt_resume);
				$('#lt_editjob_num').val(dataJson.lt_editjob_num);
				$('#lt_breakjob_num').val(dataJson.lt_breakjob_num);
				$('#job_num').val(dataJson.job_num);
				$('#down_resume').val(dataJson.resume);
				$('#editjob_num').val(dataJson.editjob_num);
				$('#invite_resume').val(dataJson.interview);
				$('#breakjob_num').val(dataJson.breakjob_num);
				$('#part_num').val(dataJson.part_num);
				$('#editpart_num').val(dataJson.editpart_num);
				$('#breakpart_num').val(dataJson.breakpart_num);
				$('#zph_num').val(dataJson.zph_num);
				$('#vipetime').text(dataJson.vipetime);
				$('#oldetime').val(dataJson.oldetime);				
				$('#rating_name').val(dataJson.name);
				$('#com_rating_val').val(dataJson.id);
			}
		});
	}
	$("#"+name+"_name").val(valname);//替换新名称
	$("#"+name+"_val").val(val);//替换新值
	$("#"+name+"_select").hide();//弹出框隐藏		
}
//后台猎头管理会员等级
function select_ltrating(name,val,valname){
	var name,val,valname;	
	var pytoken=$("#pytoken").val();
	if(val){
		$.post("index.php?m=admin_lt_member&c=getrating",{id:val,pytoken:pytoken},function(data){
			if(data){
				var dataJson = eval("(" + data + ")"); 
				$('#lt_job_num').val(dataJson.lt_job_num);
				$('#lt_down_resume').val(dataJson.lt_resume);
				$('#lt_editjob_num').val(dataJson.lt_editjob_num);
				$('#lt_breakjob_num').val(dataJson.lt_breakjob_num); 
				$('#vipetime').text(dataJson.vipetime);
				$('#oldetime').val(dataJson.oldetime);				
				$('#rating_name').val(dataJson.name);
			}
		});
	}
	$("#"+name+"_name").val(valname);//替换新名称
	$("#"+name+"_val").val(val);//替换新值
	$("#"+name+"_select").hide();//弹出框隐藏		
}
function select_new(name,val,valname){
	if(name=='type'){
		if(val==2){ 
			$("#photo").show();
			$(".pic").show();
		}
		if(val==1){ 
			$("#photo").hide();
			$(".pic").hide();
		}
	}	
	if(name=='fz_type'){
		if(val==1){
			$("#fz_type_1").show();
			$("#fz_type_2").hide();
		}else{
			$("#fz_type_1").hide();
			$("#fz_type_2").show();
		} 
	}
	if(name=='datetype'){
		$("#xfilename").attr('value',val);
	}
	val=='0'?$("#is_rec").show():$("#is_rec").hide();	
	$("#"+name+"_name").val(valname);//替换新名称
	$("#"+name+"_val").val(val);//替换新值
	$("#"+name+"_select").hide();//弹出框隐藏	 	
}
//select4.3版新样式结束

function dchange(){
	var datetype=$("#datetype").val();
	$("#filename").val(datetype);
} 

//地点和类别三节联动

function showbox(title,url,width,height){
	var pytoken=$("input[name='pytoken']").val();
	$.get(url+'&pytoken='+pytoken,function(data){
		var data=eval("(" + data + ")");
		if(data.name){
			$('#showname').html(data.name);
		}
		if(data.type){
			$('#showtype').html(data.type);
		}
		if(data.mobile){
			$('#showmoblie').html(data.mobile);
		}
		if(data.ctime){
			$('#showdate').html(data.ctime);
		}
		if(data.content){
			$('#showcontent').html(data.content);
		}
		$('#showdelet').attr('onclick',"showdelet('index.php?m=admin_message&c=del&del="+data.id+"')");
		$.layer({
			type:1,
			title:title,
			closeBtn:[0,true],
			border:[10 , 0.3 , '#000', true],
			area:[width,height],
			page:{dom : '#showbox'}
		});
	})
}
function showdelet(url){
	var pytoken=$("input[name='pytoken']").val();
	$.post(url+'&pytoken='+pytoken,function(data){
		var data=eval('('+data+')');
		if(data.url=='1'){
			parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){location.reload();});return false;
		}else{
			parent.layer.msg(data.msg, Number(data.tm), Number(data.st),function(){location.href=data.url;});return false;
		}
	});
}

//消费设置里，根据积分兑换比例限制金额
function payintegral(obj,pro){
	var price_n	= 	1/pro;
	var price	=	obj.value;

	if(price < price_n && price > 0){
		$(obj).val(price_n);
	}
}

$.ajaxSetup({error: function(jqXHR, textStatus, errorThrown) {
        switch(jqXHR.status) {
            case(777):
				parent.layer.closeAll();
                parent.layer.msg("您暂无操作权限！",2,8);
                break;
        }
}});