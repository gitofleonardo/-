<?php

class result{
	public $passed;
}
$result=new result();

$servername			= 		"localhost:3306";
$username			= 		"root";
$password			= 		"";
$dbname				=		"bookms";             //数据库信息填写

$uidInt				=		111;                   //uid  外键  部署时修改
$sessionname		=		"sessionname";     //默认session，共开发调用
//$sessionname		=		$_SESSION[''];   //填写session用户名字段

$conn= mysqli_connect($servername,$username,$password);//连接数据库
mysqli_query($conn,"use ".$dbname);

/*
	$sqll="SELECT uidInt FROM phpyun_member WHERE usernamevarcharNULL='".$sessionname."'";    //根据session查询uidInt,部署时启用
	mysqli_query($conn,$sqll);
	if(mysqli_num_rows($result)>0){
		$row=mysqli_fetch_array($result);
		$uidInt=$row['uidInt'];
	}
*/

$sq=mysqli_query($conn,"SELECT * FROM applyinfo WHERE uid='".$uidInt."';");
if(mysqli_num_rows($sq)>0){  //
	$row=mysqli_fetch_array($sq);
	if($row["status"]==1){
		$result->passed=false;
		echo json_encode($result);
	}else{
		$result->passed=true;
		echo json_encode($result);
	}
}else{
	$result->passed=true;
	echo json_encode($result);
}

mysqli_close($conn);
?>