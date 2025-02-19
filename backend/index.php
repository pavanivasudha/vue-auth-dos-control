<?php

require 'vendor/autoload.php';

use MongoDB\Client;

// Set CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}


$client = new Client("mongodb://localhost:27017");
$collection = $client->authDB->users;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data["username"]) || !isset($data["password"])) {
        echo json_encode(["message" => "All fields are required"]);
        exit();
    }
    
    $username = $data["username"];
    $password = password_hash($data["password"], PASSWORD_BCRYPT);
    
    $existingUser = $collection->findOne(["username" => $username]);
    
    if ($existingUser) {
        echo json_encode(["message" => "Username already exists"]);
    } else {
        $collection->insertOne([
            "username" => $username,
            "password" => $password
        ]);
        echo json_encode(["message" => "User registered successfully"]);
    }
}
?>
