<?php
// php/courses/edit.php

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
        // Get the course ID
        $id = $_POST['id'] ?? '';
        if (empty($id)) {
            throw new Exception("Course ID is required");
        }

        // First get the current course data
        $stmt = $conn->prepare("SELECT image, file FROM courses WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $current_course = $result->fetch_assoc();
        $stmt->close();

        if (!$current_course) {
            throw new Exception("Course not found");
        }

        $current_image_path = $current_course['image'];
        $current_file_path = $current_course['file'];
        $new_image_path = $current_image_path;
        $new_file_path = $current_file_path;

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

            // Create upload directory if it doesn't exist
            $image_upload_dir = __DIR__ . '/../uploads/course-images/';
            if (!file_exists($image_upload_dir)) {
                mkdir($image_upload_dir, 0777, true);
            }

            // Generate new filename while keeping same extension pattern if exists
            if (!empty($current_image_path)) {
                $file_extension = pathinfo($current_image_path, PATHINFO_EXTENSION);
                $image_filename = pathinfo($current_image_path, PATHINFO_FILENAME) . '.' . $file_extension;
            } else {
                $file_extension = pathinfo($image['name'], PATHINFO_EXTENSION);
                $image_filename = uniqid() . '.' . $file_extension;
            }
            
            $image_filepath = $image_upload_dir . $image_filename;

            // Delete old image file if exists
            if (!empty($current_image_path)) {
                $old_image_path = __DIR__ . '/../' . ltrim($current_image_path, '/');
                if (file_exists($old_image_path)) {
                    unlink($old_image_path);
                }
            }

            // Move new uploaded file
            if (!move_uploaded_file($image['tmp_name'], $image_filepath)) {
                throw new Exception("Failed to upload image");
            }

            $new_image_path = '/php/uploads/course-images/' . $image_filename;
        }

        // Handle file upload if provided
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

            // Generate new filename while keeping same extension pattern if exists
            if (!empty($current_file_path)) {
                $file_extension = pathinfo($current_file_path, PATHINFO_EXTENSION);
                $file_filename = pathinfo($current_file_path, PATHINFO_FILENAME) . '.' . $file_extension;
            } else {
                $file_extension = pathinfo($file['name'], PATHINFO_EXTENSION);
                $file_filename = uniqid() . '.' . $file_extension;
            }
            
            $file_filepath = $file_upload_dir . $file_filename;

            // Delete old file if exists
            if (!empty($current_file_path)) {
                $old_file_path = __DIR__ . '/../' . ltrim($current_file_path, '/');
                if (file_exists($old_file_path)) {
                    unlink($old_file_path);
                }
            }

            // Move new uploaded file
            if (!move_uploaded_file($file['tmp_name'], $file_filepath)) {
                throw new Exception("Failed to upload file");
            }

            $new_file_path = '/php/uploads/course-files/' . $file_filename;
        }

        // Get other form data
        $title = $_POST['title'] ?? '';
        $timing = $_POST['timing'] ?? '';
        $enrolled = isset($_POST['enrolled']) ? (int)$_POST['enrolled'] : 0;
        $price = isset($_POST['price']) ? (float)$_POST['price'] : 0.0;
        $status = $_POST['status'] ?? 'draft';
        $content = $_POST['content'] ?? '';

        // Validate required fields
        if (empty($title)) {
            throw new Exception("Title is required");
        }

        // Prepare SQL statement
        $stmt = $conn->prepare("UPDATE courses SET title = ?, timing = ?, enrolled = ?, price = ?, file = ?, status = ?, content = ?, image = ? WHERE id = ?");
        $stmt->bind_param("ssidssssi", $title, $timing, $enrolled, $price, $new_file_path, $status, $content, $new_image_path, $id);

        // Execute query
        if ($stmt->execute()) {
            $response = [
                "status" => "success",
                "message" => "Course updated successfully",
                "data" => [
                    "id" => $id,
                    "title" => $title,
                    "image" => $new_image_path,
                    "file" => $new_file_path
                ]
            ];
            http_response_code(200);
        } else {
            throw new Exception("Failed to update course: " . $stmt->error);
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