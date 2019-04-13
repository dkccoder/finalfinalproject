<?php
	include("dp.php");
	$username = $_POST["username"]
    $telephone = $_POST["telephone"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    $selsql = "select * from users where telephone='$telephone'";
	$selres = mysql_query($selsql);
	if(mysql_num_rows($selres) >= 1){
		echo  json_encode(array('res_code' => 0, 'res_message' => '手机号已注册' ));
	}else{
		$sql = "insert into users(telephone,email,password，username) values('$telephone','$email','$password','$username')";
		$res = mysql_query($sql);
		if($res){
			echo json_encode(array('res_code' => 1,'res_message' => '注册成功，即将跳转首页'));
		}else{
			echo json_encode(array('res_code' => 0,'res_message' => '注册失败'));
		}
	}
?>