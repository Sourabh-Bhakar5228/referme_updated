<?php
// Show all PHP errors (dev only)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    http_response_code(200);
    exit();
}

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit();
}

// Read input
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit();
}

// Validate fields
$requiredFields = ['fullName', 'email', 'phone', 'message'];
foreach ($requiredFields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(["error" => "All fields are required"]);
        exit();
    }
}

// Validate email
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email format"]);
    exit();
}

// Validate phone (simple format, e.g. +91 98765 43210)
if (!preg_match('/^[0-9+\-\s]{10,15}$/', $data['phone'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid phone number"]);
    exit();
}

// Sanitize inputs
function clean($str) {
    return htmlspecialchars(strip_tags(trim($str)));
}

$name = clean($data['fullName']);
$email = clean($data['email']);
$phone = clean($data['phone']);
$message = clean($data['message']);

// PHPMailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'nanybharadwaj1979@gmail.com'; // ✅ your Gmail
    $mail->Password   = 'bnlx ezno xhrx rmfr';           // ✅ app password (not Gmail login)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($email, $name);
    $mail->addAddress('nanybharadwaj1979@gmail.com', 'Enquiry Team');

    $mail->isHTML(true);
    $mail->Subject = "New Enquiry from $name";
    $mail->Body    = "
        <h3>New Enquiry Submission</h3>
        <p><strong>Name:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Message:</strong><br>" . nl2br($message) . "</p>
    ";
    $mail->AltBody = "$name\n$email\n$phone\n\n$message";

    $mail->send();
    echo json_encode(["message" => "Enquiry sent successfully!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Message could not be sent.",
        "details" => $mail->ErrorInfo,
        "exception" => $e->getMessage()
    ]);
}
