<?php
header('Content-Type: application/json; charset=utf-8');
include('db.php');
include('HTTPStatusCode.php');
$data = json_decode(file_get_contents("php://input"), true);

try {
     $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]", 
     $db['username'], $db['password']);
}    catch (PDOException $e) {
     echo "Database connection failed.";
     exit;
}




$sql = 'DELETE FROM events 
        WHERE id=:id';
$statement = $pdo->prepare($sql);
$statement->bindValue(':id', $data['id'], PDO::PARAM_INT);
if ($statement->execute()) {
  echo json_encode(['id' => $data['id']]);
}
else
  new HTTPStatusCode(400, 'Wrong event.');
?>

