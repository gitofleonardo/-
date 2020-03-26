<?php

class apply_result{
	public $success;
}

$result				=		new apply_result();
$result->success	=		"false";     			 //回传到前端的参数

$servername			= 		"localhost:3306";
$username			= 		"root";
$password			= 		"";
$dbname				=		"bookms";             //数据库信息填写

$applyTime			=		date("Y-m-d");              //申请时间
$uidInt				=		111;                   //uid  外键  部署时修改
$sessionname		=		"sessionname";     //默认session，共开发调用
//$sessionname		=		$_SESSION[''];   //填写session用户名字段
$pictureDir			=		"C:\\xampp\\htdocs\\temp\\";   //图片存放地址
$pictureUrl			=		"/temp/";             //url相对地址

$idCardImgFront		=		"";            //此处均为图片url及拼接
$idCardImgBack		=		"";
$bankCardImg		=		"";
$signature			=		"null";
$contracts			=		"";
$ins				=		"";
$signNameInput		=		"null";

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

if(isset($_POST["username"])&&isset($_POST["idCode"])&&isset($_POST["phone"])&&isset($_POST["company"])&&isset($_POST["userPost"])&&isset($_POST["entryTime"])&&isset($_POST["originCompany"])&&isset($_POST["originCompanyLocation"])&&isset($_POST["bankCardNumber"])&&isset($_POST["bankName"])&&isset($_POST["applyAmount"])&&isset($_POST["signNameInput"])&&!empty($_FILES["idCardImgFront"]["tmp_name"])&&!empty($_FILES["idCardImgBack"]["tmp_name"])&&!empty($_FILES["bankCardImg"]["tmp_name"])&&!empty($_FILES["signature"]["tmp_name"])&&isset($_POST["contracts"])&&isset($_POST["ins"])&&isset($_POST["canbaoTime"])){   //一层判断  所有字段是否都存在数据
	

	$sq=mysqli_query($conn,"SELECT * FROM applyinfo WHERE uid='".$uidInt."';");
	if(mysqli_num_rows($sq)<=0){  //二层判断    是否已经申请
	
		if(isset($_POST["signNameInput"])){
			$signNameInput=$_POST["signNameInput"];
		}

		if($_FILES["idCardImgFront"]["error"]>0)
		{
			echo "错误：".$_FILES["idCardImgFront"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."1.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."1.jpg");
				move_uploaded_file($_FILES["idCardImgFront"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."1.jpg");
				$idCardImgFront=$pictureUrl.$sessionname.date("YmdHis")."1.jpg";
			}else{
				move_uploaded_file($_FILES["idCardImgFront"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."1.jpg");
				$idCardImgFront=$pictureUrl.$sessionname.date("YmdHis")."1.jpg";
			}
		}

		if($_FILES["idCardImgBack"]["error"]>0)
		{
			echo "错误：".$_FILES["idCardImgBack"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."2.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."2.jpg");
				move_uploaded_file($_FILES["idCardImgBack"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."2.jpg");
				$idCardImgBack=$pictureUrl.$sessionname.date("YmdHis")."2.jpg";
			}else{
				move_uploaded_file($_FILES["idCardImgBack"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."2.jpg");
				$idCardImgBack=$pictureUrl.$sessionname.date("YmdHis")."2.jpg";
			}
		}

		if($_FILES["bankCardImg"]["error"]>0)
		{
			echo "错误：".$_FILES["bankCardImg"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."3.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."3.jpg");
				move_uploaded_file($_FILES["bankCardImg"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."3.jpg");
				$bankCardImg=$pictureUrl.$sessionname.date("YmdHis")."3.jpg";
			}else{
				move_uploaded_file($_FILES["bankCardImg"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."3.jpg");
				$bankCardImg=$pictureUrl.$sessionname.date("YmdHis")."3.jpg";
			}
		}

		if($_FILES["signature"]["error"]>0)
		{
			echo "错误：".$_FILES["signature"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."4.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."4.jpg");
				move_uploaded_file($_FILES["signature"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."4.jpg");
				$signature=$pictureUrl.$sessionname.date("YmdHis")."4.jpg";
			}else{
				move_uploaded_file($_FILES["signature"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."4.jpg");
				$signature=$pictureUrl.$sessionname.date("YmdHis")."4.jpg";
			}
		}

		$j=5;
		for($i=0;$i<$_POST["contracts"];$i++){
			if(file_exists($pictureDir.$sessionname.date("YmdHis").$j."jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis").$j."jpg");
				move_uploaded_file($_FILES["contracts_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$contracts=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data[]=$contracts;
			}else{
				move_uploaded_file($_FILES["contracts_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$contracts=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data[]=$contracts;
			}
			$j++;
		}
		$contracts=json_encode($data);

		for($i=0;$i<$_POST["ins"];$i++){
			if(file_exists($pictureDir.$sessionname.date("YmdHis").$j."jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis").$j."jpg");
				move_uploaded_file($_FILES["ins_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$ins=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data1[]=$ins;
			}else{
				move_uploaded_file($_FILES["ins_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$ins=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data1[]=$ins;
			}
			$j++;
		}
		$ins=json_encode($data1);

		$j=5;

		$sql=
				"INSERT INTO applyInfo (username,idCode,phone,company,userPost,entryTime,canbaoTime,originCompany,originCompanyLocation,bankCardNumber,bankName,applyAmount,signNameInput,idCardImgFront,idCardImgBack,bankCardImg,signature,contracts,ins,status,uid,applyTime)
 				VALUES 
 ('".$_POST["username"]."','".$_POST["idCode"]."','".$_POST["phone"]."','".$_POST["company"]."','".$_POST["userPost"]."','".$_POST["entryTime"]."','".$_POST["canbaoTime"]."','".$_POST["originCompany"]."','".$_POST["originCompanyLocation"]."','".$_POST["bankCardNumber"]."','".$_POST["bankName"]."','".$_POST["applyAmount"]."','".$signNameInput."','".$idCardImgFront."','".$idCardImgBack."','".$bankCardImg."','".$signature."','".$contracts."','".$ins."','0','".$uidInt."','".$applyTime."')";
 
		if(mysqli_query($conn,$sql)){
			$result->success="true";
		}
		echo json_encode($result);
	}else{
		$row=mysqli_fetch_array($sq);
		if($row["status"]==0){
			
			$time=substr($row["idCardImgFront"],-19,14);
			for($i=1;$i<20;$i++){
				$filename=$pictureDir.$sessionname.$time.$i.".jpg";
				if(file_exists($filename)){
					unlink($filename);
				}
			}
			
		if(isset($_POST["signNameInput"])){
			$signNameInput=$_POST["signNameInput"];
		}

		if($_FILES["idCardImgFront"]["error"]>0)
		{
			echo "错误：".$_FILES["idCardImgFront"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."1.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."1.jpg");
				move_uploaded_file($_FILES["idCardImgFront"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."1.jpg");
				$idCardImgFront=$pictureUrl.$sessionname.date("YmdHis")."1.jpg";
			}else{
				move_uploaded_file($_FILES["idCardImgFront"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."1.jpg");
				$idCardImgFront=$pictureUrl.$sessionname.date("YmdHis")."1.jpg";
			}
		}

		if($_FILES["idCardImgBack"]["error"]>0)
		{
			echo "错误：".$_FILES["idCardImgBack"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."2.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."2.jpg");
				move_uploaded_file($_FILES["idCardImgBack"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."2.jpg");
				$idCardImgBack=$pictureUrl.$sessionname.date("YmdHis")."2.jpg";
			}else{
				move_uploaded_file($_FILES["idCardImgBack"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."2.jpg");
				$idCardImgBack=$pictureUrl.$sessionname.date("YmdHis")."2.jpg";
			}
		}

		if($_FILES["bankCardImg"]["error"]>0)
		{
			echo "错误：".$_FILES["bankCardImg"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."3.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."3.jpg");
				move_uploaded_file($_FILES["bankCardImg"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."3.jpg");
				$bankCardImg=$pictureUrl.$sessionname.date("YmdHis")."3.jpg";
			}else{
				move_uploaded_file($_FILES["bankCardImg"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."3.jpg");
				$bankCardImg=$pictureUrl.$sessionname.date("YmdHis")."3.jpg";
			}
		}

		if($_FILES["signature"]["error"]>0)
		{
			echo "错误：".$_FILES["signature"]["error"]."<br>";
		}else{	
			if(file_exists($pictureDir.$sessionname.date("YmdHis")."4.jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis")."4.jpg");
				move_uploaded_file($_FILES["signature"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."4.jpg");
				$signature=$pictureUrl.$sessionname.date("YmdHis")."4.jpg";
			}else{
				move_uploaded_file($_FILES["signature"]["tmp_name"],$pictureDir.$sessionname.date("YmdHis")."4.jpg");
				$signature=$pictureUrl.$sessionname.date("YmdHis")."4.jpg";
			}
		}

		$j=5;
		for($i=0;$i<$_POST["contracts"];$i++){
			if(file_exists($pictureDir.$sessionname.date("YmdHis").$j."jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis").$j."jpg");
				move_uploaded_file($_FILES["contracts_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$contracts=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data[]=$contracts;
			}else{
				move_uploaded_file($_FILES["contracts_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$contracts=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data[]=$contracts;
			}
			$j++;
		}
		$contracts=json_encode($data);

		for($i=0;$i<$_POST["ins"];$i++){
			if(file_exists($pictureDir.$sessionname.date("YmdHis").$j."jpg")){
				unlink($pictureDir.$sessionname.date("YmdHis").$j."jpg");
				move_uploaded_file($_FILES["ins_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$ins=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data1[]=$ins;
			}else{
				move_uploaded_file($_FILES["ins_".$i]["tmp_name"],$pictureDir.$sessionname.date("YmdHis").$j.".jpg");
				$ins=$pictureUrl.$sessionname.date("YmdHis").$j.".jpg";
				$data1[]=$ins;
			}
			$j++;
		}
		$ins=json_encode($data1);
		$j=5;
			
			$sql1="UPDATE applyinfo SET 
username='".$_POST["username"]."',idCode='".$_POST["idCode"]."',phone='".$_POST["phone"]."',company='".$_POST["company"]."',userPost='".$_POST["userPost"]."',entryTime='".$_POST["entryTime"]."',canbaoTime='".$_POST["canbaoTime"]."',originCompany='".$_POST["originCompany"]."',originCompanyLocation='".$_POST["originCompanyLocation"]."',bankCardNumber='".$_POST["bankCardNumber"]."',bankName='".$_POST["bankName"]."',applyAmount='".$_POST["applyAmount"]."',signNameInput='".$signNameInput."',idCardImgFront='".$idCardImgFront."',idCardImgBack='".$idCardImgBack."',bankCardImg='".$bankCardImg."',signature='".$signature."',contracts='".$contracts."',ins='".$ins."',applyTime='".$applyTime."' WHERE uid='".$uidInt."';";
			
			if(mysqli_query($conn,$sql1)){
			$result->success="true";
			}
			echo json_encode($result);
		}else{
			$result->success="false";
			echo json_encode($result);
		}
	}
}else{
	$result->success="false";
	echo json_encode($result);
}

mysqli_close($conn);
?>