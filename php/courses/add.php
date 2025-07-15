<?php
// php/courses/add.php

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
        if (empty($_POST['title'])) {
            throw new Exception("Title is required");
        }

        // Process image upload
        $image_path = '';
        if (!empty($_FILES['image']['name'])) {
            $image = $_FILES['image'];
            
            // Validate image
            $allowed_image_types = ['image/jpeg', 'image/png', 'image/gif'];
            if (!in_array($image['type'], $allowed_image_types)) {
                throw new Exception("Only JPG, PNG, and GIF images are allowed");
            }

            if ($image['size'] > 5 * 1024 * 1024) { // 5MB max
                throw new Exception("Image size must be less than 5MB");
            }

            // Create upload directory if it doesn't exist
            $image_upload_dir = __DIR__ . '/../uploads/course-images/';
            if (!file_exists($image_upload_dir)) {
                mkdir($image_upload_dir, 0777, true);
            }

            // Generate unique filename
            $file_extension = pathinfo($image['name'], PATHINFO_EXTENSION);
            $image_filename = uniqid() . '.' . $file_extension;
            $image_filepath = $image_upload_dir . $image_filename;

            // Move uploaded file
            if (!move_uploaded_file($image['tmp_name'], $image_filepath)) {
                throw new Exception("Failed to upload image");
            }

            $image_path = '/php/uploads/course-images/' . $image_filename;
        }

        // Process file upload
        $file_path = '';
        if (!empty($_FILES['file']['name'])) {
            $file = $_FILES['file'];
            
            // Validate file (adjust allowed types as needed)
            $allowed_file_types = ['application/pdf', 'application/msword', 'application/vnd.ms-excel'];
            if (!in_array($file['type'], $allowed_file_types)) {
                throw new Exception("Only PDF, DOC, and XLS files are allowed");
            }

            if ($file['size'] > 10 * 1024 * 1024) { // 10MB max
                throw new Exception("File size must be less than 10MB");
            }

            // Create upload directory if it doesn't exist
            $file_upload_dir = __DIR__ . '/../uploads/course-files/';
            if (!file_exists($file_upload_dir)) {
                mkdir($file_upload_dir, 0777, true);
            }

            // Generate unique filename while preserving extension
            $file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
            $file_filename = uniqid() . '.' . $file_extension;
            $file_filepath = $file_upload_dir . $file_filename;

            // Move uploaded file
            if (!move_uploaded_file($file['tmp_name'], $file_filepath)) {
                throw new Exception("Failed to upload file");
            }

            $file_path = '/php/uploads/course-files/' . $file_filename;
        }

        // Get other form data
        $title = $_POST['title'] ?? '';
        $timing = $_POST['timing'] ?? '';
        $enrolled = isset($_POST['enrolled']) ? (int)$_POST['enrolled'] : 0;
        $price = isset($_POST['price']) ? (float)$_POST['price'] : 0.0;
        $status = $_POST['status'] ?? 'draft';
        $content = $_POST['content'] ?? '';

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO courses (title, timing, enrolled, price, file, status, content, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssidssss", $title, $timing, $enrolled, $price, $file_path, $status, $content, $image_path);

        // Execute query
        if ($stmt->execute()) {
            $response = [
                "status" => "success",
                "message" => "Course created successfully",
                "data" => [
                    "id" => $stmt->insert_id,
                    "title" => $title,
                    "image" => $image_path,
                    "file" => $file_path
                ]
            ];
            http_response_code(201);
        } else {
            throw new Exception("Failed to save course: " . $stmt->error);
        }

        $stmt->close();
    } catch (Exception $e) {
        // Clean up uploaded files if error occurred
        if (!empty($image_filepath) && file_exists($image_filepath)) {
            unlink($image_filepath);
        }
        if (!empty($file_filepath) && file_exists($file_filepath)) {
            unlink($file_filepath);
        }

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