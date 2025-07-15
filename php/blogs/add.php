<?php
// add.php

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

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
        // Check if image was uploaded
        if (empty($_FILES['image'])) {
            throw new Exception("Image file is required");
        }

        $image = $_FILES['image'];
        
        // Validate image
        $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
        if (!in_array($image['type'], $allowed_types)) {
            throw new Exception("Only JPG, PNG, and GIF images are allowed");
        }

        if ($image['size'] > 5 * 1024 * 1024) { // 5MB max
            throw new Exception("Image size must be less than 5MB");
        }

        // Create upload directory
        $upload_dir = '../uploads/blog-images/';
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        // Generate unique filename
        $file_extension = pathinfo($image['name'], PATHINFO_EXTENSION);
        $filename = uniqid() . '.' . $file_extension;
        $filepath = $upload_dir . $filename;

        // Move uploaded file
        if (!move_uploaded_file($image['tmp_name'], $filepath)) {
            throw new Exception("Failed to upload image");
        }

        // Get form data
        $title = $_POST['title'] ?? '';
        $content = $_POST['content'] ?? '';
        $category = $_POST['category'] ?? '';
        $tags = $_POST['tags'] ?? '';
        $date = $_POST['date'] ?? ''; // Get date from form data

        // Validate required fields
        if (empty($title) || empty($content) || empty($date)) {
            throw new Exception("Title, content, and date are required");
        }

        // Validate date format (YYYY-MM-DD)
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            throw new Exception("Date must be in YYYY-MM-DD format");
        }

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO blogs (title, date, image, category, content, tags) VALUES (?, ?, ?, ?, ?, ?)");
        $image_path = '/php/uploads/blog-images/' . $filename;
        $stmt->bind_param("ssssss", $title, $date, $image_path, $category, $content, $tags);

        // Execute query
        if ($stmt->execute()) {
            $response = [
                "status" => "success",
                "message" => "Blog post created successfully",
                "data" => [
                    "id" => $stmt->insert_id,
                    "title" => $title,
                    "date" => $date,
                    "image" => $image_path
                ]
            ];
            http_response_code(201);
        } else {
            throw new Exception("Failed to save blog post: " . $stmt->error);
        }

        $stmt->close();
    } catch (Exception $e) {
        // Clean up uploaded file if error occurred
        if (isset($filepath) && file_exists($filepath)) {
            unlink($filepath);
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