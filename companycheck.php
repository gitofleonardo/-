<?php

class apply{
	public $id;
	public $username;
	public $idCode;
	public $phone;
	public $company;
	public $companyName;
	public $userPost;
	public $entryTime;
	public $canbaoTime;
	public $originCompany;
	public $originCompanyLocation;
	public $bankCardNumber;
	public $bankName;
	public $applyAmount;
	public $signNameInput;
	public $idCardImgFront;
	public $idCardImgBack;
	public $bankCardImg;
	public $signature;
	public $contracts;
	public $ins;
	public $status;
	public $gov_status;
	public $uidInt;
	public $applyTime;
	public $to_gov;
}

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname="bookms";             //数据库信息填写

$conn= mysqli_connect($servername,$username,$password);//连接数据库
mysqli_query($conn,"use ".$dbname);

$companyName		=		"";
$company			=		0;            //公司id
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
	$sqll="SELECT namevarcharNULL FROM phpyun_company WHERE uidInt='".$uidInt."'";    //根据uid查询company,部署时启用
	mysqli_query($conn,$sqll);
	if(mysqli_num_rows($result)>0){
		$row=mysqli_fetch_array($result);
		$company=$row['uidIntNULL'];
	}
*/
$sqll="SELECT * FROM qiye WHERE $company='".$company."'";
$resl=mysqli_query($conn,$sqll);
if(mysqli_num_rows($resl)>0){
	$rowl=mysqli_fetch_array($resl);
	$companyName=$rowl["name"];

	$sql="SELECT * FROM applyInfo WHERE company='".$company."'";
	$result=mysqli_query($conn,$sql);
	if(mysqli_num_rows($result)>0){
		while($row=mysqli_fetch_array($result)){
			foreach($row as $key => $value){
				$row[$key]=urlencode($value);
			}
			$apply=new apply();
			$apply->id=(int)$row["id"];
			$apply->username=$row["username"];
			$apply->idCode=$row["idCode"];
			$apply->phone=$row["phone"];
			$apply->company=$row["company"];
			$apply->companyName=$companyName;
			$apply->userPost=$row["userPost"];
			$apply->entryTime=$row["entryTime"];
			$apply->canbaoTime=$row["canbaoTime"];
			$apply->originCompany=$row["originCompany"];
			$apply->originCompanyLocation=$row["originCompanyLocation"];
			$apply->bankCardNumber=$row["bankCardNumber"];
			$apply->bankName=$row["bankName"];
			$apply->applyAmount=$row["applyAmount"];
			$apply->signNameInput=$row["signNameInput"];
			$apply->idCardImgFront=$row["idCardImgFront"];
			$apply->idCardImgBack=$row["idCardImgBack"];
			$apply->bankCardImg=$row["bankCardImg"];
			$apply->signature=$row["signature"];
			$apply->contracts=json_decode(urldecode($row["contracts"]));
			$apply->ins=json_decode(urldecode($row["ins"]));
			$apply->status=(int)$row["status"];
			$apply->gov_status=(int)$row["gov_status"];
			$apply->uidInt=(int)$row["uid"];
			$apply->applyTime=$row["applyTime"];
			if($row["to_gov"]==1){
				$apply->to_gov=true;
			}else{
				$apply->to_gov=false;
			}
			$data[]=$apply;
		}
		echo urldecode(json_encode($data));
	}else{
		$data=array();
		echo urldecode(json_encode($data));
	}
}else{
	$data=array();
	echo urldecode(json_encode($data));
}

mysqli_close($conn);
?>