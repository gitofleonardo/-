<?php

class apply{
	public $id;
	public $username;
	public $idCode;
	public $phone;
	public $company;
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
	public $uid;
	public $applyTime;
}

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname="bookms";             //数据库信息填写

$conn= mysqli_connect($servername,$username,$password);//连接数据库
mysqli_query($conn,"use ".$dbname);

$company=0;            //公司id



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
		$apply->uid=(int)$row["uid"];
		$apply->applyTime=$row["applyTime"];
		$data[]=$apply;
	}
	echo urldecode(json_encode($data));
}else{
	$data=array();
	echo urldecode(json_encode($data));
}

mysqli_close($conn);
?>