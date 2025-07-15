<?php
// login.php

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

// Simple token generation function (you can replace this with a more secure method like JWT)
function generateToken($userId) {
    $secret = "a2b9c8d7e6f5g4h3i2j1k0l9m8n7o6p5q4r3s2t1u0v9w8x7y6z5"; // Change this to a secure, unique secret
    $time = time();
    $token = base64_encode($userId . '.' . $time . '.' . hash('sha256', $userId . $time . $secret));
    return $token;
}

try {
    // Handle preflight OPTIONS request
    if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
        http_response_code(200);
        exit;
    }

    // Create database connection
    $conn = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER["REQUEST_METHOD"] === "POST") {
        // Check content type
        $contentType = $_SERVER["CONTENT_TYPE"] ?? '';

        // Initialize variables
        $email = '';
        $password = '';

        // Handle different content types
        if (stripos($contentType, 'application/json') !== false) {
            $rawData = file_get_contents("php://input");
            $data = json_decode($rawData, true);
            $email = $data['email'] ?? ''; // Changed from username to email
            $password = $data['password'] ?? '';
        } elseif (stripos($contentType, 'multipart/form-data') !== false || stripos($contentType, 'application/x-www-form-urlencoded') !== false) {
            $email = $_POST['email'] ?? ''; // Changed from username to email
            $password = $_POST['password'] ?? '';
        } else {
            $email = $_POST['email'] ?? ''; // Changed from username to email
            $password = $_POST['password'] ?? '';
        }

        // Validate required fields
        if (!empty($email) && !empty($password)) {
            // Fetch user by email instead of username
            $sql = "SELECT id, email, username, password FROM users WHERE email = :email";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':email', $email);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user) {
                // Verify the password hash
                $stored_hash = $user['password'];
                $verify_result = password_verify($password, $stored_hash);

                if ($verify_result) {
                    // Generate a token
                    $token = generateToken($user['id']);

                    http_response_code(200);
                    echo json_encode([
                        "message" => "Login successful",
                        "token" => $token, // Return the token
                        "user" => [
                            "id" => $user['id'],
                            "email" => $user['email'],
                            "username" => $user['username']
                        ]
                    ]);
                } else {
                    http_response_code(401);
                    echo json_encode([
                        "message" => "Invalid password",
                        "debug" => [
                            "input_password" => $password,
                            "stored_hash" => $stored_hash,
                            "verify_result" => $verify_result
                        ]
                    ]);
                }
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Email not found"]);
            }
        } else {
            http_response_code(400);
            echo json_encode([
                "message" => "Incomplete data provided",
                "received" => $_POST,
                "content_type" => $contentType
            ]);
        }
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "message" => "Database error: " . $e->getMessage()
    ]);
}
?>