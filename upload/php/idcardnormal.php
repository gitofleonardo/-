<?php

class idcardnormal{
	public $name;
	public $id;
	public $success;
}

function request_access_token($url = '', $param = '') {
    if (empty($url) || empty($param)) {
        return false;
    }
        
    $postUrl = $url;
    $curlPost = $param;
    $curl = curl_init();//初始化curl
    curl_setopt($curl, CURLOPT_URL,$postUrl);//抓取指定网页
    curl_setopt($curl, CURLOPT_HEADER, 0);//设置header
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_POST, 1);//post提交方式
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    $data = curl_exec($curl);//运行curl
    curl_close($curl);
        
    return $data;
}

function request_card($url = '', $param = ''){
    if (empty($url) || empty($param)) {
        return false;
    }

    $postUrl = $url;
    $curlPost = $param;
    // 初始化curl
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $postUrl);
    curl_setopt($curl, CURLOPT_HEADER, 0);
    // 要求结果为字符串且输出到屏幕上
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
    // post提交方式
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $curlPost);
    // 运行curl
    $data = curl_exec($curl);
    curl_close($curl);

    return $data;
}

function idcard_normal($picture_path){

	$url = 'https://aip.baidubce.com/oauth/2.0/token';
    $post_data['grant_type']       = 'client_credentials';
    $post_data['client_id']      = 'EE3hI20Aox48RIWPWDg6hjHF';
    $post_data['client_secret'] = 'lN3VLp3rF6OhVvoZMaMwlhSPhwg88E17';
    $o = "";
    foreach ( $post_data as $k => $v ) 
    {
    	$o.= "$k=" . urlencode( $v ). "&" ;
    }
    $post_data = substr($o,0,-1);
    
    $res = request_access_token($url, $post_data);
	
	$b=json_decode($res);

	$token = $b->access_token;
	$url = 'https://aip.baidubce.com/rest/2.0/ocr/v1/idcard?access_token=' . $token;
	$img = file_get_contents($picture_path);
	$img = base64_encode($img);
	$bodys = array(
    	'id_card_side' => "front",
    	'image' => $img
	);
	$res = request_card($url, $bodys);
	
	$b=json_decode($res);
	$idcard=new idcardnormal();
	if($b->image_status=="normal"){
		$idcard->name=urlencode($b->words_result->姓名->words);
		$idcard->id=$b->words_result->公民身份号码->words;
		$idcard->success=true;
	}else{
		$idcard->name="";
		$idcard->id="";
		$idcard->success=false;
	}
	return $idcard;
}

if($_FILES["file"]["error"]>0){
	echo $_FILES["file"]["error"]."<br>";
}
else{
	if(file_exists("C:\\temp\\".$_FILES["file"]["name"])){
		unlink("C:\\temp\\".$_FILES["file"]["name"]);
		move_uploaded_file($_FILES["file"]["tmp_name"],"C:\\temp\\".$_FILES["file"]["name"]);
	}
	else{
		move_uploaded_file($_FILES["file"]["tmp_name"],"C:\\temp\\".$_FILES["file"]["name"]);
	}
}


$picture_path="C:\\temp\\".$_FILES["file"]["name"];
$idcardnormal=new idcardnormal();
$idcardnormal=idcard_normal($picture_path);
$data[]=$idcardnormal;
echo urldecode(json_encode($data));
?>