<?php
// php/enrolled/edit.php

// Set headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database configuration
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "refermegroup";

// Create connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $response = [];
    
    try {
        // Check if required fields are present
        if (empty($_POST['id'])) {
            throw new Exception("Enrollment ID is required");
        }
        if (empty($_POST['courseId'])) {
            throw new Exception("Course ID is required");
        }
        if (empty($_POST['username'])) {
            throw new Exception("Username is required");
        }
        if (empty($_POST['email'])) {
            throw new Exception("Email is required");
        }

        // Validate email format
        $email = $_POST['email'];
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new Exception("Invalid email format");
        }

        // Get form data
        $id = (int)($_POST['id'] ?? 0);
        $courseId = (int)($_POST['courseId'] ?? 0);
        $username = $_POST['username'] ?? '';
        $email = $_POST['email'] ?? '';
        $mobile = $_POST['mobile'] ?? '';

        // Validate IDs
        if ($id <= 0) {
            throw new Exception("Invalid Enrollment ID");
        }
        if ($courseId <= 0) {
            throw new Exception("Invalid Course ID");
        }

        // Check if enrollment exists
        $checkStmt = $conn->prepare("SELECT id FROM enrolled WHERE id = ?");
        $checkStmt->bind_param("i", $id);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows === 0) {
            $checkStmt->close();
            throw new Exception("Enrollment not found");
        }
        $checkStmt->close();

        // Prepare SQL statement for update
        $stmt = $conn->prepare("UPDATE enrolled SET courseId = ?, username = ?, email = ?, mobile = ? WHERE id = ?");
        $stmt->bind_param("isssi", $courseId, $username, $email, $mobile, $id);

        // Execute query
        if ($stmt->execute()) {
            $response = [
                "status" => "success",
                "message" => "Enrollment updated successfully",
                "data" => [
                    "id" => $id,
                    "courseId" => $courseId,
                    "username" => $username,
                    "email" => $email,
                    "mobile" => $mobile
                ]
            ];
            http_response_code(200);
        } else {
            throw new Exception("Failed to update enrollment: " . $stmt->error);
        }

        $stmt->close();
    } catch (Exception $e) {
        $response = [
            "status" => "error",
            "message" => $e->getMessage()
        ];
        http_response_code(400);
    }

    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
?>