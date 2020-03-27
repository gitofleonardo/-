<?php

class back{
	public $success;
}
$back=new back();

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname="bookms";             //数据库信息填写

$conn= mysqli_connect($servername,$username,$password);//连接数据库
mysqli_query($conn,"use ".$dbname);

$company=0;            //公司id
$uidInt				=		111;                   //uid  外键  部署时修改
//$sessionname		=		$_SESSION[''];   //填写session用户名字段

/*
	$sqll="SELECT uidInt FROM phpyun_member WHERE usernamevarcharNULL='".$sessionname."'";    //根据session查询uidInt,部署时启用
	mysqli_query($conn,$sqll);
	if(mysqli_num_rows($result)>0){
		$row=mysqli_fetch_array($result);
		$uidInt=$row['uidInt'];
	}
*/

/*
	$sqll="SELECT namevarcharNULL FROM phpyun_company WHERE uidInt='".$sessionname."'";    //根据uid查询company,部署时启用
	mysqli_query($conn,$sqll);
	if(mysqli_num_rows($result)>0){
		$row=mysqli_fetch_array($result);
		$uidInt=$row['uidInt'];
	}
*/

$sql="UPDATE applyinfo SET to_gov='1' WHERE company='".$company."' and status='1';";
if(mysqli_query($conn,$sql)){
	$back->success=true;
}else{
	$back->success=false;
}
echo json_encode($back);
mysqli_close($conn);
?>