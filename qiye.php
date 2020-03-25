<?php

$servername = "localhost:3306";
$username = "root";
$password = "";
$dbname="bookms";

class qiye{
	public $id;
	public $name;
}

$conn= mysqli_connect($servername,$username,$password);
	
mysqli_query($conn,"use ".$dbname);

$result=mysqli_query($conn,"SELECT * FROM qiye");

while($row=mysqli_fetch_array($result)){
	foreach($row as $key => $value){
		$row[$key]=urlencode($value);
	}
	$qiye=new qiye();
	$qiye->id=$row['id'];
	$qiye->name=$row['name'];
	$data[]=$qiye;
}

echo urldecode(json_encode($data));

?>