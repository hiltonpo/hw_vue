<?php
header('Content-Type: application/json; charset=utf-8');
include('db.php');
include('HTTPStatusCode.php');
$data = json_decode(file_get_contents("php://input"), true);
$event=[];

try {
     $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]", 
     $db['username'], $db['password']);
}    catch (PDOException $e) {
     echo "Database connection failed.";
     exit;
}



$sql = 'SELECT id, `date`, title, start_time, end_time, `description` FROM events ORDER BY id ASC';
$statement = $pdo->prepare($sql);
$statement->execute();


while ($result = $statement->fetch(PDO::FETCH_ASSOC)) {

         // 10:10:00 => 10:00 don't need the second
     $result['start_time'] = substr($result['start_time'], 0, 5);
     $event[] = $result;
}



if ($event==false)
  new HTTPStatusCode(400, 'No such event.');
echo json_encode($event);
?>

