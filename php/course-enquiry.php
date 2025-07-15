<?php
// Error reporting for development
ini_set('display_errors', 1);
error_reporting(E_ALL);

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method Not Allowed"]);
    exit();
}

$json = file_get_contents("php://input");
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid JSON"]);
    exit();
}

$requiredFields = ['name', 'email', 'phone'];
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

// Validate phone (basic)
if (!preg_match('/^[0-9+\-\s]{10,15}$/', $data['phone'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid phone number"]);
    exit();
}

function clean($str) {
    return htmlspecialchars(strip_tags(trim($str)));
}

$name = clean($data['name']);
$email = clean($data['email']);
$phone = clean($data['phone']);

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
    $mail->Username   = 'nanybharadwaj1979@gmail.com';
    $mail->Password   = 'bnlx ezno xhrx rmfr'; // Replace with App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->setFrom($email, $name);
    $mail->addAddress('nanybharadwaj1979@gmail.com', 'Course Enquiry');

    $mail->isHTML(true);
    $mail->Subject = "New Course Enquiry";
    $mail->Body    = "
        <h2>New Course Enquiry Received</h2>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Phone:</strong> {$phone}</p>
    ";
    $mail->AltBody = "Name: $name\nEmail: $email\nPhone: $phone";

    $mail->send();
    echo json_encode(["message" => "Enquiry submitted successfully!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "error" => "Message could not be sent.",
        "details" => $mail->ErrorInfo
    ]);
}
