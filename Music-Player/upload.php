<?php
	$filename = $_FILES['file']['name'];
	$location_music = "music/".$filename;

	if (move_uploaded_file($_FILES['file']['tmp_name'], $location_music)) {
		echo 'Success';
	}else{
		echo 'Failure';
	}

?>