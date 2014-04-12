<?php

	$data = json_decode(file_get_contents("php://input"));

	$user = (!empty($data->user) ? mysql_real_escape_string($data->user) : "");
	$pwd = (!empty($data->password) ? mysql_real_escape_string($data->password) : "");

	sleep(2);

	if ($user == "54310104" && $pwd == "1234") {
		$arr = array('msg' => "Logged in", 'error' => '');
		$jsn = json_encode($arr);
		print_r($jsn);
	} else {
		$arr = array('msg' => "", 'error' => 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
		$jsn = json_encode($arr);
		print_r($jsn);
	}