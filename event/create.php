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

// validation
// title
if (empty($data['title'])) {
  new HttpStatusCode(400, 'Title cannot be blank.');}
  // start_time
  elseif(empty($data['start_time'])) {
    new HttpStatusCode(400, 'Please select start time.');}
    // end_time
    elseif(empty($data['end_time'])) {
      new HttpStatusCode(400, 'Please select end time.');}

// time range
$startTime = explode(':', $data['start_time']);
$endTime = explode(':', $data['end_time']);
if ($startTime[0]>$endTime[0] || ($startTime[0]==$endTime[0] && $startTime[1]>$endTime[1])){
  new HttpStatusCode(400, 'Time range error.');} 



$sql = 'INSERT INTO events (title, start_time, end_time, `description`, `date`)
        VALUES (:title, :start_time, :end_time, :description, :date)';
$statement = $pdo->prepare($sql);
$statement->bindValue(':title', $data['title'], PDO::PARAM_STR);
$statement->bindValue(':start_time', $data['start_time'], PDO::PARAM_STR);
$statement->bindValue(':end_time', $data['end_time'], PDO::PARAM_STR);
$statement->bindValue(':description', $data['description'], PDO::PARAM_STR);
$statement->bindValue(':date', $data['date'], PDO::PARAM_INT);
if ($statement->execute()) {
    $id = $pdo->lastInsertId();    

    $sql = 'SELECT id, title, start_time, end_time, `description`, `date` FROM events WHERE id=:id';
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':id', $id, PDO::PARAM_INT);
    $statement->execute();
    $event = $statement->fetch(PDO::FETCH_ASSOC);
    
    // 10:10:00 => 10:00 don't need the second
    $event['start_time'] = substr($event['start_time'], 0, 5);

        
    echo json_encode($event);
}
?>

