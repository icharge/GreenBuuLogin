<?php

	sleep(2);

	$arr = array('msg' => "Logged out", 'error' => "");
	$jsn = json_encode($arr);
	print_r($jsn);
