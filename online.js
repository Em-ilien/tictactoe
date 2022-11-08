const IS_J1 = tictactoe.classList.contains("j1");


function itsToMeToPlay() {
    return (IS_J1 && whoHaveToPlayIsJ1) || (!IS_J1 && !whoHaveToPlayIsJ1);
}

function notifyServer(cell) {
    const data = new FormData();
    data.append("cell_id", cell.id);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/ajax/play.php", true);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.response.status == "success") {
            console.log(xhr.response);
        }
    }
    xhr.send(data);
}


function refreshGame() {
    if (itsToMeToPlay())
        return;
    
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/ajax/get_game_data.php", true);
    xhr.responseType = "json";
    xhr.onload = () => {
        
        if (xhr.response.status == "success") {
            console.log(xhr.response);
            if (xhr.response.youHaveToPlay) {
                for (const cell_id of xhr.response.cells_id) {
                    let cell = tictactoe.querySelector(".column > div[id='" + cell_id + "']");
                    
                    if (!cell.classList.contains("played")) {
                        playOn(cell, true);
                        break;
                    }
                }
            }
        }
    };
    xhr.send();
}

setInterval(() => {
    refreshGame();
}, 1000);
