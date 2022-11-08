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

if (!isset($_POST["cell_id"])) {
    echo json_encode(["status" => "error", "error" => "You must specify a cell id"]);
}


$player = $_SESSION["player"];
$code = $_SESSION["code"];
$cell_id = $_POST["cell_id"];


if (!jsonFileContainsCode($code)) {
    echo json_encode(["status" => "error", "error" => "This code does not exist"]);
    die();
}

if (cellIsYetPlayed($code, $cell_id)) {
    echo json_encode(["status" => "error", "error" => "This cell is already played"]);
    die();
}

if (getPlayerWhoHasToPlay($code, $player) != $player) {
    echo json_encode(["status" => "error", "error" => "It's not your turn"]);
    die();
}

addCellPlayedOnJsonFile($code, $cell_id, $player);

echo json_encode(["status" => "success"]);