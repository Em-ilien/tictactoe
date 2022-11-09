let j1HaveToPlay = true;

let tictactoe = document.querySelector(".tictactoe");
let columns = tictactoe.querySelectorAll(".column");
let cells = tictactoe.querySelectorAll(".column > div");
let rows = [
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]]
];

const IS_ONLINE = tictactoe.classList.contains("online");

let playAgainButton = document.getElementById("play-again");


function showWinningCombinaison(cell1, cell2, cell3) {
    cell1.classList.add("win");
    cell2.classList.add("win");
    cell3.classList.add("win");
}

function cellsAreSameType(cell1, cell2, cell3) {
    let type1 = cell1.classList[1];
    let type2 = cell2.classList[1];
    let type3 = cell3.classList[1];

    if (type1 == undefined || type2 == undefined || type3 == undefined) {
        return false;
    }

    if (type1 == type2 && type2 == type3) {
        showWinningCombinaison(cell1, cell2, cell3);
        return true;
    }

    return false;
}

function checkIfWeHaveAWinner() {
    let win = false;    //this variable allow to show multiple winning rows/columns/diagonals if there are multiple
    //so we don't return the first one we find

    for (const column of columns) {
        if (cellsAreSameType(column.children[0], column.children[1], column.children[2])) {
            win = true;
        }
    }

    for (const row of rows) {
        if (cellsAreSameType(row[0], row[1], row[2])) {
            win = true;
        }
    }

    if (cellsAreSameType(cells[0], cells[4], cells[8])) {
        win = true;
    }

    if (cellsAreSameType(cells[2], cells[4], cells[6])) {
        win = true;
    }

    return win;
}

function checkIfAllCellsAreFilled() {
    for (const cell of cells) {
        if (!cell.classList.contains("played")) {
            return false;
        }
    }

    return true;
}

function changeTheTurn() {
    j1HaveToPlay = !j1HaveToPlay;
}

function playOn(cell, playAsTheOtherPlayer = false) {
    cell.classList.remove("preview");
    cell.classList.add("played");

    if (IS_ONLINE && playAsTheOtherPlayer) {
        if (IS_J1) {
            cell.classList.add("cross");
            cell.innerHTML = "<span></span><span></span>";
        } else {
            cell.classList.add("circle");
            cell.innerHTML = "<span></span>";
        }        
    }

    if (checkIfWeHaveAWinner() || checkIfAllCellsAreFilled()) {
        tictactoe.classList.add("game-finished");

        setTimeout(() => {
            playAgainButton.parentElement.classList.add("show");
            setTimeout(() => {
                playAgainButton.classList.add("highlight");
            }, 1000);
        }, 1000/2);
    }

    if (IS_ONLINE && !playAsTheOtherPlayer) {
        notifyServer(cell);
    }
}

function checkIfTheGameIsFinished() {
    return tictactoe.classList.contains("game-finished");
}

function showPreview(cell) {
    if (j1HaveToPlay) {
        cell.classList.add("circle");
        cell.innerHTML = "<span></span>";
    } else {
        cell.classList.add("cross");
        cell.innerHTML = "<span></span><span></span>";
    }

    cell.classList.add("preview");
}

function hidePreview(cell) {
    cell.classList.remove("circle");
    cell.classList.remove("cross");
    cell.innerHTML = "";
    cell.classList.remove("preview");
}

function relaunchGame() {
    cells.forEach(cell => {
        cell.classList.remove("circle");
        cell.classList.remove("cross");
        cell.classList.remove("played");
        cell.classList.remove("preview");
        cell.innerHTML = "";
        cell.classList.remove("win");
    });

    tictactoe.classList.remove("game-finished");
    playAgainButton.classList.remove("highlight");
    playAgainButton.parentElement.classList.remove("show");

    j1HaveToPlay = true;
}


cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (checkIfTheGameIsFinished())
            return;

        if (cell.classList.contains("played")) {
            return;
        }

        if (IS_ONLINE && !itsToMeToPlay()) {
            return;
        }        

        playOn(cell);

        changeTheTurn();
    });

    cell.addEventListener("mouseenter", () => {
        if (checkIfTheGameIsFinished())
            return;

        if (cell.classList.contains("played"))
            return;

        if (IS_ONLINE && !itsToMeToPlay()) {
            return;
        }

        showPreview(cell);
    });

    cell.addEventListener("mouseleave", () => {
        if (!cell.classList.contains("preview"))
            return;

        hidePreview(cell);
    });
});

playAgainButton.addEventListener("click", () => {
    if (IS_ONLINE) {
        sendInvitationToTheOtherPlayerToPlayAgain();
        return;
    }

    relaunchGame();
});