<?php
// get.php

// Set headers for CORS and JSON response
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database configuration (same as your login.php)
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "refermegroup";

// Create database connection
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(array("message" => "Database connection failed: " . $conn->connect_error));
    exit();
}

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // You can modify this query to target your specific table
    $query = "SELECT * FROM blogs"; // Change 'blogs' to your table name
    
    $result = $conn->query($query);
    
    if (!$result) {
        http_response_code(500);
        echo json_encode(array("message" => "Error executing query: " . $conn->error));
        exit();
    }
    
    $data = array();
    
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        http_response_code(200);
        echo json_encode($data);
    } else {
        http_response_code(404);
        echo json_encode(array("message" => "No records found."));
    }
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Method not allowed."));
}

// Close database connection
$conn->close();
?>