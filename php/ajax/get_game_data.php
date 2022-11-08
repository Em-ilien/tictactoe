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

$cells_id = getCellsPlayedOnJsonFile($code);
$playerWhoHaveToPlay = getPlayerWhoHasToPlay($code, $player);

if ($playerWhoHaveToPlay == $player) {
    echo json_encode(["status" => "success", "youHaveToPlay" => true, "cells_id" => $cells_id]);
    die();
}


echo json_encode(["status" => "success", "youHaveToPlay" => false, "cells_id" => $cells_id]);