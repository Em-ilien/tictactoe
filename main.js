let whoHaveToPlayIsJ1 = true;

let morpion = document.getElementById("morpion");
let columns = morpion.querySelectorAll(".column");
let cells = morpion.querySelectorAll(".column > div");
let rows = [
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]]
];

let playAgainButton = document.getElementById("play-again");


function showWinner(cell1, cell2, cell3) {
    cell1.classList.add("win");
    cell2.classList.add("win");
    cell3.classList.add("win");
}

function playOn(cell) {
    cell.classList.remove("preview");
    cell.classList.add("played");

    whoHaveToPlayIsJ1 = !whoHaveToPlayIsJ1;
}

function cellsAreSameType(cell1, cell2, cell3) {
    let type1 = cell1.classList[1];
    let type2 = cell2.classList[1];
    let type3 = cell3.classList[1];

    if (type1 == undefined || type2 == undefined || type3 == undefined) {
        return false;
    }

    if (type1 == type2 && type2 == type3) {
        showWinner(cell1, cell2, cell3);
        return true;
    }

    return false;
}

function checkIfWeHaveAWinner() {
    for (const column of columns) {
        if (cellsAreSameType(column.children[0], column.children[1], column.children[2])) {
            return true;
        }
    }

    for (const row of rows) {
        if (cellsAreSameType(row[0], row[1], row[2])) {
            return true;
        }
    }

    if (cellsAreSameType(cells[0], cells[4], cells[8])) {
        return true;
    }

    if (cellsAreSameType(cells[2], cells[4], cells[6])) {
        return true;
    }

    return false;
}

function checkIfTheGameIsFinished() {
    return morpion.classList.contains("game-finished");
}

function checkIfAllCellsAreFilled() {
    for (const cell of cells) {
        if (!cell.classList.contains("played")) {
            return false;
        }
    }

    return true;
}

function showPreview(cell) {
    if (whoHaveToPlayIsJ1) {
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


cells.forEach(cell => {
    cell.addEventListener("click", () => {
        if (checkIfTheGameIsFinished())
            return;

        if (cell.classList.contains("played")) {
            return;
        }

        playOn(cell);

        if (checkIfWeHaveAWinner() || checkIfAllCellsAreFilled()) {
            morpion.classList.add("game-finished");
            playAgainButton.classList.add("highlight");
        }
    });

    cell.addEventListener("mouseenter", () => {
        if (checkIfTheGameIsFinished())
            return;

        if (cell.classList.contains("played"))
            return;

        showPreview(cell);
    });

    cell.addEventListener("mouseleave", () => {
        if (!cell.classList.contains("preview"))
            return;

        hidePreview(cell);
    });
});

playAgainButton.addEventListener("click", () => {
    cells.forEach(cell => {
        cell.classList.remove("circle");
        cell.classList.remove("cross");
        cell.classList.remove("played");
        cell.classList.remove("preview");
        cell.innerHTML = "";
        cell.classList.remove("win");
    });

    morpion.classList.remove("game-finished");
    playAgainButton.classList.remove("highlight");
});