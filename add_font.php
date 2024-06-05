<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$title = $data['title'];
$family = $data['family'];
$url = $data['url'];

$response = ['success' => false];

if (!empty($title) && !empty($family) && !empty($url)) {
    $stmt = $conn->prepare("INSERT INTO fonts (title, family, url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $family, $url);
    if ($stmt->execute()) {
        $response['success'] = true;
    }
    $stmt->close();
}

echo json_encode($response);

$conn->close();
?>
