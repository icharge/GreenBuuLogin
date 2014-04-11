<?php
/*
 * ALL Functions is here !!
 */

	// This function return null -or- nothing -or- empty String when $dat is undefined //
	function wempty($dat) {
		return (!empty($dat) ? $dat : "");
	}

	function wisset($dat) {
		return (isset($dat) ? $dat : "");
	}