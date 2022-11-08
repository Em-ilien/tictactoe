<?php

session_start();

require_once("../util/json_file.php");


if (!isset($_SESSION["player"])) {
    echo json_encode(["status" => "error", "error" => "You are not connected"]);
    die();
}

if (!isset($_SESSION["code"])) {
    echo json_encode(["status" => "error", "error" => "You are not connected"]);
    die();
}

if (!isset($_POST["otherPlayerInvited"])) {
    echo json_encode(["status" => "error", "error" => "You must specify if the other player is invited"]);
    die();
}


$player = $_SESSION["player"];
$code = $_SESSION["code"];
$theOtherPlayerIsInvited = $_POST["otherPlayerInvited"];
$theOtherPlayerIsInvited = $theOtherPlayerIsInvited == "true" ? true : false;


if (!jsonFileContainsCode($code)) {
    echo json_encode(["status" => "error", "error" => "This code does not exist"]);
    die();
}

// TODO: check if the game is finished

if (!jsonFileContainsInvitationToPlayAgainFor($player, $code)) {
    echo json_encode(["status" => "success",
        "theOtherPlayerInvitedMe" => false, "theOtherPlayerIsInvited" => $theOtherPlayerIsInvited]);
    die();
}

if ($theOtherPlayerIsInvited) {
    resetGameOnJsonFile($code);
}

echo json_encode(["status" => "success",
    "theOtherPlayerInvitedMe" => true, "theOtherPlayerIsInvited" => $theOtherPlayerIsInvited]);