<?php

function saveCodeOnJsonFile($code) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);
    $data["codes"][$code]["players"][] = "j1";
    file_put_contents(dirname(__FILE__) . "\..\..\data.json", json_encode($data));
}

function deleteCodeFromJsonFile($code) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);
    unset($data["codes"][$code]);
    file_put_contents(dirname(__FILE__) . "\..\..\data.json", json_encode($data));
}

function jsonFileContainsCode($code) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);

    if (!isset($data["codes"])) {
        return false;
    }

    return array_key_exists($code, $data["codes"]);
}

function addPlayerOnCodeToJsonFile($code) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);
    $data["codes"][$code]["players"][] = "j2";
    file_put_contents(dirname(__FILE__) . "\..\..\data.json", json_encode($data));
}


function cellIsYetPlayed($code, $cell_id) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);

    return isset($data["codes"][$code]["cells_played"][$cell_id]);
}

function addCellPlayedOnJsonFile($code, $cell_id, $player) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);
    $data["codes"][$code]["cells_played"][$cell_id] = $player;
    file_put_contents(dirname(__FILE__) . "\..\..\data.json", json_encode($data));
}

function getPlayerWhoHasToPlay($code, $player) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);
    $countJ1 = 0;
    $countJ2 = 0;

    if (!isset($data["codes"][$code]["cells_played"])) {
        return "j1";
    }

    foreach ($data["codes"][$code]["cells_played"] as $player) {
        if ($player == "j1") {
            $countJ1++;
        } else {
            $countJ2++;
        }
    }

    if ($countJ1 == $countJ2) {
        return "j1";
    } else {
        return "j2";
    }
}

function getCellsPlayedOnJsonFile($code) {
    $data = json_decode(file_get_contents(dirname(__FILE__) . "\..\..\data.json"), true);
    
    if (!isset($data["codes"][$code]["cells_played"])) {
        return [];
    }

    //to array
    $cells_id = [];
    foreach ($data["codes"][$code]["cells_played"] as $cell_id => $player) {
        $cells_id[] = $cell_id;
    }

    return $cells_id;

    // return $data["codes"][$code]["cells_played"];
}