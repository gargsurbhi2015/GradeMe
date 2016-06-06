<?php

ob_start();


// $link = mysqli_connect('mysql-instance.caywog581zwf.us-west-2.rds.amazonaws.com', 'root', 'root1234','project235','3306');
echo "sau";
$db = new PDO('mysql:host=saumeelcom.ipagemysql.com;dbname=project235', 'saumeel', 'saumeel_123');
	// $conn = mysql_connect('saumeelcom.ipagemysql.com','saumeel', 'saumeel_123');

if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
// echo "gaj";
// $con = mysqli_connect("localhost","my_user","my_password","my_db");

// Check connection

// if (mysqli_connect_errno())
//   {
//   echo "Failed to connect to MySQL: " . mysqli_connect_error();
//   }




// $conn = mysql_connect('localhost','root', 'root');

// if (!$conn) { 
//   echo "Failed to connect to MySQL: " . mysql_error();
// } 
// echo 'Connected successfully'; 
// mysql_select_db('project235');

foreach($db->query('SELECT * FROM users') as $row) {
	// echo "inside for";
    var_dump($row); //etc...
}

// $sql = "SELECT * FROM users ";
// 		$result = mysql_query( $sql, $conn );
// 		// var_dump($result);
// 		while($row = mysql_fetch_array($result, MYSQL_ASSOC)) {
// 		    	var_dump($row);
// 		    	echo $row['userName'];
// 		    }
		    // mysql_close($conn);

		  // header("location: http://saumeel.com/235/index.php");
		  // exit();  
		    
?>


