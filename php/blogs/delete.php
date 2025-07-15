<?php
// php/blogs/delete.php

// Set headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, POST, OPTIONS");
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

// Handle DELETE/POST request
if ($_SERVER['REQUEST_METHOD'] == 'DELETE' || $_SERVER['REQUEST_METHOD'] == 'POST') {
    $response = [];
    
    try {
        // Get the input data
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        // For form-data submission
        if (empty($data)) {
            $data = $_POST;
        }

        // Get the blog ID
        $id = $data['id'] ?? '';
        if (empty($id) || !is_numeric($id)) {
            throw new Exception("Valid blog ID is required");
        }

        // First get the current blog data to find the image path
        $stmt = $conn->prepare("SELECT image FROM blogs WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $blog = $result->fetch_assoc();
        $stmt->close();

        if (!$blog) {
            throw new Exception("Blog post not found");
        }

        // Delete the associated image file if it exists
        if (!empty($blog['image'])) {
            // Construct the full server path (relative to this script location)
            $image_path = __DIR__ . '/../..' . $blog['image'];
            
            // Security check - verify path is within uploads directory
            $allowed_path = realpath(__DIR__ . '/../../uploads/blog-images/');
            $image_realpath = realpath($image_path);
            
            if (!$image_realpath || strpos($image_realpath, $allowed_path) !== 0) {
                throw new Exception("Invalid image path");
            }

            // Check if file exists and delete it
            if (file_exists($image_path)) {
                if (!unlink($image_path)) {
                    throw new Exception("Failed to delete image file");
                }
            }
        }

        // Delete the blog post from database
        $stmt = $conn->prepare("DELETE FROM blogs WHERE id = ?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                $response = [
                    "status" => "success",
                    "message" => "Blog post and image deleted successfully",
                    "deleted_id" => $id,
                    "deleted_image" => $blog['image']
                ];
                http_response_code(200);
            } else {
                throw new Exception("No blog post was deleted");
            }
        } else {
            throw new Exception("Database error: " . $stmt->error);
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