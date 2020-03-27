<?php

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname="bookms";             //数据库信息填写

$conn= mysqli_connect($servername,$username,$password);//连接数据库
mysqli_query($conn,"use ".$dbname);

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
}

function checkname($conn,$company){
	$sqll="SELECT * FROM qiye WHERE $company='".$company."'";
	$resl=mysqli_query($conn,$sqll);
	if(mysqli_num_rows($resl)>0){
		$rowl=mysqli_fetch_array($resl);
		$companyName=$rowl["name"];
		return $companyName;
	}else{
		return $company;
	}
}

$sql="SELECT * FROM applyInfo WHERE to_gov='1'";
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
		$apply->companyName=urlencode(checkname($conn,$row["company"]));
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
		$data[]=$apply;
	}
	echo urldecode(json_encode($data));
}else{
	$data=array();
	echo urldecode(json_encode($data));
}

?>