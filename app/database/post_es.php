<?php

	$data = json_decode(file_get_contents("php://input"));

	$stuid = mysql_real_escape_string($data->student-id);
	$stuname = mysql_real_escape_string($data->student-name);
	$stumajor = mysql_real_escape_string($data->student-major);

	$db->Table = "student";
	$db->Where = "Stu_id = '$tStu_id'";
	$checkuser = $db->Select1();

	if(!$checkuser){
	$qry = 'INSERT INTO users (name,pass,email) values ("' . $usrname . '","' . $upswd . '","' . $uemail . '")';
	$qry_res = mysql_query($qry);
	if ($qry_res) {
		$arr = array('msg' => "User Created Successfully!!!", 'error' => '');
		$jsn = json_encode($arr);
		print_r($jsn);
	} else {
		$arr = array('msg' => "", 'error' => 'Error In inserting record');
		$jsn = json_encode($arr);
		print_r($jsn);
	}
	}
	else
	{
		 $arr = array('msg' => "", 'error' => 'User Already exists with same email');
		$jsn = json_encode($arr);
		print_r($jsn);
	}
?>