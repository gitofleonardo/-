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

$sq="SELECT * FROM applyinfo WHERE id='".$_POST["id"]."'";
$res=mysqli_query($conn,$sq);
if(mysqli_num_rows($res)>0){
	$row=mysqli_fetch_array($res);
	if($row["status"]!=$_POST["status"]){
		$sql="UPDATE applyinfo SET status='".$_POST["status"]."' WHERE id='".$_POST["id"]."';";

		if(mysqli_query($conn,$sql)){
			$back->success=true;
		}else{
			$back->success=false;
		}
	}else{
		$back->success=false;
	}
}else{
	$back->success=false;
}

echo json_encode($back);

mysqli_close($conn);
?>