<?php
    include("dp.php");
    $telephone = $_POST["telephone"];
    $email = $_POST["email"];
    $password = $_POST["password"];
    if($telephone == null){
        $sql = "select * from users where email='$email' and password='$password'";
    }else{
        $sql = "select * from users where telephone='$telephone' and password='$password'";
    }
    $res = mysql_query($sql);
    $arr = array();
	while($row = mysql_fetch_assoc($res)){
		array_push($arr,$row);
	}
	if(mysql_num_rows($res) >= 1){
		$resArr = array(
			"res_code" => 1,
			"res_message" => "登陆成功",
			"res_body" => array("data" => $arr)
		);
	}else{
		$resArr = array(
			"res_code" => 0,
			"res_message" => "账号或密码错误"
		);
	}
	echo json_encode($resArr);
?>