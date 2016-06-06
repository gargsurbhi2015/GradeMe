<?php
ob_start();
	
	echo "Saumeel";
	
	if(!$_POST['userName']=="" && !$_POST['password']==""){
			$userName = $_POST['userName'];
			$password = $_POST['password'];
			setcookie( "userName", $userName, $date_of_expiry, "/integrated");

		$db = new PDO('mysql:host=saumeelcom.ipagemysql.com;dbname=project235', 'saumeel', 'saumeel_123');
			if ($db->connect_error) {
			    die("Connection failed: " . $db->connect_error);
			}

			foreach($db->query('SELECT * FROM users') as $row) {
				if($row['userName']==$userName && $row['password']==$password){
					$date_of_expiry = time() + 300 ;
					setcookie( "firstName", $row['firstName'], $date_of_expiry );
					setcookie( "lastName", $row['lastName'], $date_of_expiry );					
					setcookie( "programmer", $row['programmer'], $date_of_expiry );
					setcookie( "university", $row['university'], $date_of_expiry );
					setcookie( "student_id", $row['student_id'], $date_of_expiry );
					setcookie( "imageURL", $row['imageURL'], $date_of_expiry );
					setcookie( "error", "", $date_of_expiry, "/integrated" );
			       	header("location: /integrated/www/mainpage.php");
			    	ob_end_clean();
					exit();

				}
				else{
					$date_of_expiry = time() + 300 ;
					setcookie( 'error', 'Username and Password do not match', $date_of_expiry, "/235");
			    	// echo "no match";
					header('location: index.php#login');
					
				}
			}
	}
	else{
		$date_of_expiry = time() + 300 ;
		setcookie( 'error', 'Please enter your credentials', $date_of_expiry, "/235");
    	// echo "enter credentials";
		header('Location: index.php#login');
		exit();
	}
?>