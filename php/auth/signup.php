<?php
// register.php

// Set headers for CORS and JSON response
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

// Function to sanitize input
function sanitizeInput($data) {
    return htmlspecialchars(strip_tags(trim($data)));
}

// Function to validate mobile number
function validateMobile($mobile) {
    return preg_match('/^[0-9]{10,15}$/', $mobile);
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
        // Get the raw POST data
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        // If json_decode failed (regular form submission)
        if ($data === null) {
            $data = $_POST;
        }

        // Extract and sanitize fields
        $email = sanitizeInput($data['email'] ?? '');
        $username = sanitizeInput($data['username'] ?? '');
        $mobile = sanitizeInput($data['mobile'] ?? '');
        $password = sanitizeInput($data['password'] ?? '');
        $role = sanitizeInput($data['role'] ?? 'student'); // Default to 'user' if not provided

        // Validate required fields
        $errors = [];
        
        if (empty($username)) {
            $errors['username'] = "Username is required";
        } elseif (strlen($username) < 4) {
            $errors['username'] = "Username must be at least 4 characters";
        }

        if (empty($email)) {
            $errors['email'] = "Email is required";
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = "Invalid email format";
        }

        if (empty($mobile)) {
            $errors['mobile'] = "Mobile number is required";
        } elseif (!validateMobile($mobile)) {
            $errors['mobile'] = "Invalid mobile number format";
        }

        if (empty($password)) {
            $errors['password'] = "Password is required";
        } elseif (strlen($password) < 8) {
            $errors['password'] = "Password must be at least 8 characters";
        }

        // Validate role (if provided)
        $allowed_roles = ['student', 'admin']; // Add other roles as needed
        if (!empty($role) && !in_array($role, $allowed_roles)) {
            $errors['role'] = "Invalid user role";
        }

        if (!empty($errors)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Validation errors",
                "errors" => $errors
            ]);
            exit;
        }

        // Check if email, username or mobile already exists
        $sql_check = "SELECT id FROM users WHERE email = :email OR username = :username OR mobile = :mobile";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bindParam(':email', $email);
        $stmt_check->bindParam(':username', $username);
        $stmt_check->bindParam(':mobile', $mobile);
        $stmt_check->execute();

        if ($stmt_check->rowCount() > 0) {
            http_response_code(409); // Conflict
            echo json_encode([
                "success" => false,
                "message" => "Registration failed",
                "errors" => ["account" => "Email, username or mobile number already exists"]
            ]);
            exit;
        }

        // Hash the password
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Prepare SQL statement to insert user with all fields
        $sql = "INSERT INTO users (email, username, mobile, password, role) 
                VALUES (:email, :username, :mobile, :password, :role)";
        $stmt = $conn->prepare($sql);
        
        // Bind parameters
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':mobile', $mobile);
        $stmt->bindParam(':password', $hashed_password);
        $stmt->bindParam(':role', $role);

        // Execute the query
        if ($stmt->execute()) {
            // Get the newly created user (without password)
            $user_id = $conn->lastInsertId();
            $sql_user = "SELECT id, username, email, mobile, role FROM users WHERE id = ?";
            $stmt_user = $conn->prepare($sql_user);
            $stmt_user->execute([$user_id]);
            $user = $stmt_user->fetch(PDO::FETCH_ASSOC);

            http_response_code(201);
            echo json_encode([
                "success" => true,
                "message" => "User registered successfully",
                "user" => $user
            ]);
        } else {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Failed to register user",
                "error" => $stmt->errorInfo()
            ]);
        }
    } else {
        http_response_code(405);
        echo json_encode([
            "success" => false,
            "message" => "Method not allowed"
        ]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "message" => "Database error",
        "error" => $e->getMessage()
    ]);
}
?>