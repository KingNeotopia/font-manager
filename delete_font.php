<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];

$response = ['success' => false];

if (!empty($id)) {
    $stmt = $conn->prepare("DELETE FROM fonts WHERE id=?");
    $stmt->bind_param("i", $id);
    if ($stmt->execute()) {
        $response['success'] = true;
    }
    $stmt->close();
}

echo json_encode($response);

$conn->close();
?>
