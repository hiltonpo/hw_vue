<?php
header('Content-Type: application/json; charset=utf-8');
include('db.php');
include('HTTPStatusCode.php');

try {
     $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]", 
     $db['username'], $db['password']);
}    catch (PDOException $e) {
     echo "Database connection failed.";
     exit;
}

// validation
// title
if (empty($data['title'])) {
    //error
    new HttpStatusCode(400, 'Title cannot be blank.');
}
// time range
$startTime = explode(':', $data['start_time']);
$endTime = explode(':', $data['end_time']);
if ($startTime[0]>$endTime[0] || ($startTime[0]==$endTime[0] && $startTime[1]>$endTime[1]))
  {new HttpStatusCode(400, 'Time range error.');
  }


$sql = 'UPDATE events 
        SET title=:title, start_time=:start_time, end_time=:end_time, `description`=:description 
        WHERE id=:id';
$statement = $pdo->prepare($sql);
$statement->bindValue(':id', $data['id'], PDO::PARAM_INT);
$statement->bindValue(':title', $data['title'], PDO::PARAM_STR);
$statement->bindValue(':start_time', $data['start_time'], PDO::PARAM_STR);
$statement->bindValue(':end_time', $data['end_time'], PDO::PARAM_STR);
$statement->bindValue(':description', $data['description'], PDO::PARAM_STR);
if ($statement->execute()) {
    $sql = 'SELECT id, title, start_time FROM events WHERE id=:id';
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':id', $data['id'], PDO::PARAM_INT);
    $statement->execute();
    $event = $statement->fetch(PDO::FETCH_ASSOC);
    
    // 10:10:00 > 10:00
    $event['start_time'] = substr($event['start_time'], 0, 5);

        
    echo json_encode($event);
}
?>

