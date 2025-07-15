<?php
// php/users/get.php

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
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

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    try {
        // Query to get all non-admin users
        $query = "SELECT id, username, email, mobile, role FROM users WHERE role != 'admin'";
        $result = $conn->query($query);
        
        if (!$result) {
            throw new Exception("Error executing query: " . $conn->error);
        }
        
        $users = array();
        
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                // Format any fields if needed
                $formattedRow = array_map(function($value) {
                    return $value === null ? '' : $value;
                }, $row);
                
                $users[] = $formattedRow;
            }
            
            http_response_code(200);
            echo json_encode(array(
                "status" => "success",
                "data" => $users,
                "count" => count($users))
            );
        } else {
            http_response_code(200);
            echo json_encode(array(
                "status" => "success",
                "data" => array(),
                "count" => 0,
                "message" => "No users found"
            ));
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(array(
            "status" => "error",
            "message" => $e->getMessage()
        ));
    }
} else {
    http_response_code(405);
    echo json_encode(array("status" => "error", "message" => "Method not allowed"));
}

// Close database connection
$conn->close();
?>