<?php
	include("../autostart.php");
	
	$db->Table = "student";
	$db->Where = "1";
	$result = $db->RawSelect($numr);
	$json = new mysql2json();
	$data = $json->getJSON($result, $numr);
	
	$find = array('female', 'male');
	$replace = array('หญิง', 'ชาย');
	echo str_replace($find, $replace, $data);
