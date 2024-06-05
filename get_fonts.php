<?php
include 'db.php';

$sql = "SELECT * FROM fonts";
$result = $conn->query($sql);
$fonts = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $fonts[] = $row;
    }
}

echo json_encode(['fonts' => $fonts]);
$conn->close();
?>
