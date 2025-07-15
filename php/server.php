<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Allow CORS for all origins (during development)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS request before continuing
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit();
}

// Get JSON input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON data"]);
    exit();
}

// Validate required fields
$requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required"]);
        exit();
    }
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email format"]);
    exit();
}

// Validate phone format (Indian format)
if (!preg_match('/^\+91[6-9][0-9]{9}$/', $data['phone'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid phone format. Use +91XXXXXXXXXX"]);
    exit();
}

// Sanitize inputs
function sanitizeInput($input) {
    return htmlspecialchars(strip_tags(trim($input)));
}

$name = sanitizeInput($data['name']);
$email = sanitizeInput($data['email']);
$phone = sanitizeInput($data['phone']);
$subject = sanitizeInput($data['subject']);
$message = sanitizeInput($data['message']);

// For testing purposes - comment out in production
// echo json_encode([
//     "message" => "Form data received successfully!",
//     "data" => [
//         "name" => $name,
//         "email" => $email,
//         "phone" => $phone,
//         "subject" => $subject,
//         "message" => $message
//     ]
// ]);
// exit();

// Load PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'nanybharadwaj1979@gmail.com';
    $mail->Password   = 'bnlx ezno xhrx rmfr'; // Replace with your app-specific password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Recipients
    $mail->setFrom($email, $name);
    $mail->addAddress('nanybharadwaj1979@gmail.com', 'Recipient Name');

    // Content
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = "
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
        <p><strong>Subject:</strong> {$subject}</p>
        <p><strong>Message:</strong></p>
        <p>" . nl2br($message) . "</p>
    ";
    $mail->AltBody = strip_tags($message);

    $mail->send();
    echo json_encode(["message" => "Message has been sent successfully!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
?>