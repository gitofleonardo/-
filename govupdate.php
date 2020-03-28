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

if(isset($_POST["id"])&&isset($_POST["gov_status"])){
	if(($_POST["gov_status"]==1)||$_POST["gov_status"]==0){
		$sql="UPDATE applyinfo SET gov_status='".$_POST["gov_status"]."' WHERE id='".$_POST["id"]."'";
		if(mysqli_query($conn,$sql)){
			$back->success=true;
		}else{
			$back->success=false;
		}
	}else{
		$sql="UPDATE applyinfo SET gov_status='".$_POST["gov_status"]."',status='".$_POST["gov_status"]."',to_gov='false' WHERE id='".$_POST["id"]."'";
		if(mysqli_query($conn,$sql)){
			$back->success=true;
		}else{
			$back->success=false;
		}
	}
}else{
	$back->success=false;
}

echo json_encode($back);

mysqli_close($conn);

?>