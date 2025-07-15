<?php
// edit.php

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
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

// Handle POST/PUT request
if ($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'PUT') {
    $response = [];
    
    try {
        // Get the blog ID
        $id = $_POST['id'] ?? '';
        if (empty($id)) {
            throw new Exception("Blog ID is required");
        }

        // First get the current blog data
        $stmt = $conn->prepare("SELECT image FROM blogs WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $current_blog = $result->fetch_assoc();
        $stmt->close();

        if (!$current_blog) {
            throw new Exception("Blog post not found");
        }

        $current_image_path = $current_blog['image'];
        $new_image_path = $current_image_path;

        // Handle image upload if provided
        if (!empty($_FILES['image']['name'])) {
            $image = $_FILES['image'];
            
            // Validate image
            $allowed_types = ['image/jpeg', 'image/png', 'image/gif'];
            if (!in_array($image['type'], $allowed_types)) {
                throw new Exception("Only JPG, PNG, and GIF images are allowed");
            }

            if ($image['size'] > 5 * 1024 * 1024) { // 5MB max
                throw new Exception("Image size must be less than 5MB");
            }

            // Generate new filename but keep the same extension pattern
            $file_extension = pathinfo($current_image_path, PATHINFO_EXTENSION);
            $new_filename = pathinfo($current_image_path, PATHINFO_FILENAME) . '.' . $file_extension;
            $upload_dir = '../uploads/blog-images/';
            $filepath = $upload_dir . $new_filename;

            // Delete old image file
            $old_filepath = '../' . ltrim($current_image_path, '/');
            if (file_exists($old_filepath)) {
                unlink($old_filepath);
            }

            // Move new uploaded file
            if (!move_uploaded_file($image['tmp_name'], $filepath)) {
                throw new Exception("Failed to upload image");
            }

            $new_image_path = '/php/uploads/blog-images/' . $new_filename;
        }

        // Get other form data
        $title = $_POST['title'] ?? '';
        $content = $_POST['content'] ?? '';
        $category = $_POST['category'] ?? '';
        $tags = $_POST['tags'] ?? '';
        $date = $_POST['date'] ?? '';

        // Validate required fields
        if (empty($title) || empty($content) || empty($date)) {
            throw new Exception("Title, content, and date are required");
        }

        // Validate date format
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date)) {
            throw new Exception("Date must be in YYYY-MM-DD format");
        }

        // Prepare SQL statement
        $stmt = $conn->prepare("UPDATE blogs SET title = ?, date = ?, image = ?, category = ?, content = ?, tags = ? WHERE id = ?");
        $stmt->bind_param("ssssssi", $title, $date, $new_image_path, $category, $content, $tags, $id);

        // Execute query
        if ($stmt->execute()) {
            $response = [
                "status" => "success",
                "message" => "Blog post updated successfully",
                "data" => [
                    "id" => $id,
                    "title" => $title,
                    "date" => $date,
                    "image" => $new_image_path
                ]
            ];
            http_response_code(200);
        } else {
            throw new Exception("Failed to update blog post: " . $stmt->error);
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