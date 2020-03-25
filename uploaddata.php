<?php

class apply_result{
	public $success;
}
$result=new apply_result();
$result->success="true";

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname="bookms";

$pictureDir="C:\\xampp\\htdocs\\temp\\";   //图片存放地址
$pictureUrl="http://localhost:82/temp/";

$idCardImgFront="";
$idCardImgBack="";
$bankCardImg="";
$signature="";
$contracts="";
$ins="";
$signNameInput="";

$conn= mysqli_connect($servername,$username,$password);
	
mysqli_query($conn,"use ".$dbname);


if($_FILES["idCardImgFront"]["error"]>0)
{
	echo "错误：".$_FILES["idCardImgFront"]["error"]."<br>";
}else{	
	if(file_exists($pictureDir.$_POST["username"].date("YmdHis")."1.jpg")){
		unlink($pictureDir.$_POST["username"].date("YmdHis")."1.jpg");
		move_uploaded_file($_FILES["idCardImgFront"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."1.jpg");
		$idCardImgFront=$pictureDir.$_POST["username"].date("YmdHis")."1.jpg";
	}else{
		move_uploaded_file($_FILES["idCardImgFront"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."1.jpg");
		$idCardImgFront=$pictureDir.$_POST["username"].date("YmdHis")."1.jpg";
	}
}

if($_FILES["idCardImgBack"]["error"]>0)
{
	echo "错误：".$_FILES["idCardImgBack"]["error"]."<br>";
}else{	
	if(file_exists($pictureDir.$_POST["username"].date("YmdHis")."2.jpg")){
		unlink($pictureDir.$_POST["username"].date("YmdHis")."2.jpg");
		move_uploaded_file($_FILES["idCardImgBack"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."2.jpg");
		$idCardImgBack=$pictureDir.$_POST["username"].date("YmdHis")."2.jpg";
	}else{
		move_uploaded_file($_FILES["idCardImgBack"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."2.jpg");
		$idCardImgBack=$pictureDir.$_POST["username"].date("YmdHis")."2.jpg";
	}
}

if($_FILES["bankCardImg"]["error"]>0)
{
	echo "错误：".$_FILES["bankCardImg"]["error"]."<br>";
}else{	
	if(file_exists($pictureDir.$_POST["username"].date("YmdHis")."3.jpg")){
		unlink($pictureDir.$_POST["username"].date("YmdHis")."3.jpg");
		move_uploaded_file($_FILES["bankCardImg"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."3.jpg");
		$bankCardImg=$pictureDir.$_POST["username"].date("YmdHis")."3.jpg";
	}else{
		move_uploaded_file($_FILES["bankCardImg"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."3.jpg");
		$bankCardImg=$pictureDir.$_POST["username"].date("YmdHis")."3.jpg";
	}
}

if($_FILES["signature"]["error"]>0)
{
	echo "错误：".$_FILES["signature"]["error"]."<br>";
}else{	
	if(file_exists($pictureDir.$_POST["username"].date("YmdHis")."4.jpg")){
		unlink($pictureDir.$_POST["username"].date("YmdHis")."4.jpg");
		move_uploaded_file($_FILES["signature"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."4.jpg");
		$signature=$pictureUrl.$_POST["username"].date("YmdHisx")."4.jpg";
	}else{
		move_uploaded_file($_FILES["signature"]["tmp_name"],$pictureDir.$_POST["username"].date("YmdHis")."4.jpg");
		$signature=$pictureUrl.$_POST["username"].date("YmdHisx")."4.jpg";
	}
}

if(isset($_POST["signNameInput"])){
	$signNameInput=$_POST["signNameInput"];
}

$sql=
"INSERT INTO applyInfo
(username,idCode,phone,company,userPost,entryTime,canbaoTime,originCompany,originCompanyLocation,bankCardNumber,bankName,applyAmount,signNameInput,idCardImgFront,idCardImgBack,bankCardImg,signature,contracts,ins)
 VALUES 
 ('".$_POST["username"]."','".$_POST["idCode"]."','".$_POST["phone"]."','".$_POST["company"]."','".$_POST["userPost"]."','".$_POST["entryTime"]."','".$_POST["canbaoTime"]."','".$_POST["originCompany"]."','".$_POST["originCompanyLocation"]."','".$_POST["bankCardNumber"]."','".$_POST["bankName"]."','".$_POST["applyAmount"]."','".$signNameInput."','".$idCardImgFront."','".$idCardImgBack."','".$bankCardImg."','".$signature."','".$contracts."','".$ins."')";
mysqli_query($conn,$sql);
echo json_encode($result);
?>