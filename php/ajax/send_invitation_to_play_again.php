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


$player = $_SESSION["player"];
$code = $_SESSION["code"];


if (!jsonFileContainsCode($code)) {
    echo json_encode(["status" => "error", "error" => "This code does not exist"]);
    die();
}

// TODO: check if the game is finished

if (jsonFileContainsInvitationToPlayAgainFor($player, $code)) {
    acceptInvitationToPlayAgain($player, $code);
    echo json_encode(["status" => "success", "otherPlayerInvitedMeToPlayAgain" => true, "otherPlayerIsInvitedToPlayAgain" => true]);
    die();
}

setInvitationOnJsonFileFrom($player, $code);

echo json_encode(["status" => "success", "otherPlayerInvitedMeToPlayAgain" => false, "otherPlayerIsInvitedToPlayAgain" => true]);