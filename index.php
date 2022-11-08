<?php

session_start();
require_once("php/util/json_file.php");

function generateCode() {
    $characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    $code = "";

    for ($i = 0; $i < 6; $i++) {
        $code .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $code;
}

if (!isset($_GET["game"])) {
    include_once("php/launcher.php");
    exit();
}

if ($_GET["game"] == "online") {
    if (!isset($_GET["code"])) {
        header("Location: .?game=online&code=" . generateCode());
        die();
    }

    $isOnline = true;
    $code = $_GET["code"];

    $isPlayer1 = false;
    $isPlayer2 = false;

    if (isset($_SESSION["player"])) {
        if ($_SESSION["player"] == "j1") {
            if (!isset($_SESSION["code"]) || $_SESSION["code"] == $code) {
                $isPlayer1 = true;
            } else {
                deleteCodeFromJsonFile($_SESSION["code"]);
            }
        } else {
            $isPlayer2 = true;
        }
    }

    if (!$isPlayer1 && !$isPlayer2) {
        if (jsonFileContainsCode($code)) {
            addPlayerOnCodeToJsonFile($code);
            $_SESSION["player"] = "j2";
            $isPlayer2 = true;
        } else {
            saveCodeOnJsonFile($code);
            $_SESSION["player"] = "j1";
            $isPlayer1 = true;
        }
    }

    $_SESSION["code"] = $code;
} else {
    $isOnline = false;
}

?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Morpion</title>
</head>
<body>
    <div class="tictactoe <?=($isOnline ? 'online ' . ($isPlayer1 ? "j1" : "j2") : 'offline')?>" id="<?=$code?>">
        <div class="column">
            <div id="1" class="c1"></div>
            <div id="2" class="c2"></div>
            <div id="3" class="c3"></div>
        </div>
        <div class="column">
            <div id="4" class="c1"></div>
            <div id="5" class="c2"></div>
            <div id="6" class="c3"></div>
        </div>
        <div class="column">
            <div id="7" class="c1"></div>
            <div id="8" class="c2"></div>
            <div id="9" class="c3"></div>
        </div>
    </div>

    <button id="play-again">Jouer encore</button>

    <script src="main.js"></script>
    <?=($isOnline ? '<script src="online.js"></script>' : '')?>
</body>
</html>