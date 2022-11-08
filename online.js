const IS_J1 = tictactoe.classList.contains("j1");
let otherPlayerInvitedToPlayAgain = false;


function itsToMeToPlay() {
    return (IS_J1 && j1HaveToPlay) || (!IS_J1 && !j1HaveToPlay);
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
    if (checkIfTheGameIsFinished())
        return;

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
                    
                    if (cell.classList.contains("played"))
                        continue;

                    playOn(cell, true);
                }

                j1HaveToPlay = IS_J1;
            }
        }
    };
    xhr.send();
}

function showInvitationWindowToPlayAgain() {
    let wall = document.createElement("div");
    wall.classList.add("wall");
    wall.addEventListener("click", closeWindow);
    document.body.appendChild(wall);

    let invitationWindow = document.createElement("div");
    invitationWindow.classList.add("invitation-window");
    invitationWindow.innerHTML = `
        <h2>Rejouer ?</h2>
        <p>${IS_J1 ? "Joueur 2" : "Joueur 1"} vous invite à rejouer.</p>
        <div class="invitation-window-buttons">
            <button class="invitation" onclick="closeWindow(); sendInvitationToTheOtherPlayerToPlayAgain()">Rejouer</button>
            <button class="invitation" onclick="closeWindow()">Refuser</button>
        </div>
    `;
    document.body.appendChild(invitationWindow);
}

function closeWindow() {
    document.querySelector(".invitation-window").remove();
    document.querySelector(".wall").remove();
}

function refreshInvitationToPlayAgain() {
    if (!checkIfTheGameIsFinished())
        return;

    const data = new FormData();
    data.append("otherPlayerInvited", otherPlayerInvitedToPlayAgain);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/ajax/get_invitation_to_play_again.php", true);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.response.status == "success") {
            console.log(xhr.response);
            if (xhr.response.theOtherPlayerInvitedMe && otherPlayerInvitedToPlayAgain) {
                relaunchGame();
            }
        }
    }
    xhr.send(data);
}

function sendInvitationToTheOtherPlayerToPlayAgain() {
    if (!checkIfTheGameIsFinished())
        return;

    otherPlayerInvitedToPlayAgain = true;

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "php/ajax/send_invitation_to_play_again.php", true);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.response.status == "success") {
            console.log(xhr.response);
            if (xhr.response.theOtherPlayerInvitedMe) {
                relaunchGame();
            }
        }
    }
    xhr.send();
}

setInterval(() => {
    refreshGame();
    refreshInvitationToPlayAgain();
}, 1000);
