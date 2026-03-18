const n = 9;
let board = [], solution = [];
let R = [], C = [], B = [];
let pickedNum = -1;

let success;
function RandomizeBoardState(step) {
    if (step === n * n) {
        success = true;
    }
    else {
        let choices = [], move = 0;
        for (let i = 1; i <= n; i++) {
            choices.push(i);
        }
        success = false;
        while (move < n && !success) {
            let index = Math.floor(Math.random() * choices.length), num = choices[index];
            let row = Math.floor(step / n), col = step % n;
            let rootN = Math.floor(Math.sqrt(n));
            let bNum = rootN * Math.floor(row / rootN) + Math.floor(col / rootN);
            choices.splice(index, 1);
            if (R[row][num - 1] && C[col][num - 1] && B[bNum][num - 1]) {
                board[row][col] = num;
                R[row][num - 1] = false;
                C[col][num - 1] = false;
                B[bNum][num - 1] = false;
                if (!RandomizeBoardState(step + 1)) {
                    board[row][col] = 0;
                    R[row][num - 1] = true;
                    C[col][num - 1] = true;
                    B[bNum][num - 1] = true;
                }
            }
            move++;
        }
    }
    return success;
}

function FillBoard() {
    let emptyCellsCnt = 0, cellChoices = [];
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).innerText = "";
            document.getElementById(i + "" + j).style.backgroundColor = "white";
            document.getElementById(i + "" + j).style.color = "black";
            document.getElementById(i + "" + j).classList = [];
            document.getElementById(i + "" + j).className = "cell";
            board[i][j] = 0;
            solution[i][j] = 0;
            R[i][j] = true;
            C[i][j] = true;
            B[i][j] = true;
        }
    }
    RandomizeBoardState(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            solution[i][j] = board[i][j];
            document.getElementById(i + "" + j).innerText = board[i][j];
            document.getElementById(i + "" + j).classList.add("generated");
            cellChoices.push([i, j])
        }
    }
    emptyCellsCnt = Math.floor(n * n * (Math.random() + 1) / 3)
    for (let i = 1; i <= emptyCellsCnt; i++) {
        let index = Math.floor(Math.random() * cellChoices.length);
        document.getElementById(cellChoices[index][0] + "" + cellChoices[index][1]).innerText = "";
        document.getElementById(cellChoices[index][0] + "" + cellChoices[index][1]).classList.remove("generated");
        document.getElementById(cellChoices[index][0] + "" + cellChoices[index][1]).classList.add("to-be-filled");
        board[cellChoices[index][0]][cellChoices[index][1]] = 0;
        cellChoices.splice(index, 1);
    }
}

function Load() {
    for (let i = 0; i < n; i++) {
        board[i] = [];
        R[i] = [];
        C[i] = [];
        B[i] = [];
        solution[i] = [];
        for (let j = 0; j < n; j++) {
            board[i][j] = 0;
            solution[i][j] = 0;
            document.getElementById(i + "" + j).disabled = true;
            document.getElementById(i + "" + j).style.backgroundColor = "white";
            document.getElementById(i + "" + j).style.color = "black";
            document.getElementById(i + "" + j).innerText = "";
            document.getElementById(i + "" + j).classList = [];
            document.getElementById(i + "" + j).className = "cell";
        }
        document.getElementById((i + 1) + "").disabled = true;
    }
    FillBoard();
    document.getElementById("startBtn").disabled = false;
    document.getElementById("restartBtn").disabled = true;
    document.getElementById("randomBtn").disabled = false;
    document.getElementById("solveBtn").disabled = true;
}

function IsSolved(n, board, solution) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] !== solution[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function Start() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = false;
        }
        document.getElementById((i + 1) + "").disabled = false;
    }
    document.getElementById("startBtn").disabled = true;
    document.getElementById("randomBtn").disabled = true;
    document.getElementById("restartBtn").disabled = false;
    document.getElementById("solveBtn").disabled = false;
}

function Random() {
    FillBoard();
}

function Restart() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = true;
            document.getElementById(i + "" + j).style.backgroundColor = "white";
            document.getElementById(i + "" + j).style.color = "black";
            if (document.getElementById(i + "" + j).classList.contains("to-be-filled")) {
                document.getElementById(i + "" + j).innerText = "";
                board[i][j] = 0;
            }
        }
        document.getElementById((i + 1) + "").disabled = true;
    }
    pickedNum = -1;
    document.getElementById("startBtn").disabled = false;
    document.getElementById("randomBtn").disabled = false
    document.getElementById("restartBtn").disabled = true;
    document.getElementById("solveBtn").disabled = true;
}

function Solve() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (document.getElementById(i + "" + j).classList.contains("to-be-filled")) {
                document.getElementById(i + "" + j).style.color = "blue";
                document.getElementById(i + "" + j).innerText = solution[i][j];
                board[i][j] = solution[i][j];
            }
            document.getElementById(i + "" + j).disabled = true;
            document.getElementById(i + "" + j).style.backgroundColor = "white";
        }
    }
    document.getElementById("solveBtn").disabled = true;
}

function GameOver() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            document.getElementById(i + "" + j).disabled = true;
        }
        document.getElementById(i + 1).disabled = true;
    }
    document.getElementById("randomBtn").disabled = false
    document.getElementById("solveBtn").disabled = true;
}

function PickNumber(num) {
    pickedNum = num;
}

function FillNumber(row, col) {
    if (document.getElementById(row + "" + col).classList.contains("to-be-filled")) {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                document.getElementById(i + "" + j).style.backgroundColor = "white";
            }
        }
        document.getElementById(row + "" + col).style.color = "blue";
        if (board[row][col] !== 0) {
            document.getElementById(row + "" + col).innerText = "";
            board[row][col] = 0;
        }
        else if (pickedNum !== -1) {
            document.getElementById(row + "" + col).innerText = pickedNum;
            board[row][col] = pickedNum;
        }
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (board[i][j] !== 0) {
                    let rootN = Math.floor(Math.sqrt(n)), isDuplicate = false;
                    let bULrow = rootN * Math.floor(i / rootN), bULcol = rootN * Math.floor(j / rootN);
                    for (let k = 0; k < n; k++) {
                        if (k !== i && board[k][j] === board[i][j]) {
                            document.getElementById(k + "" + j).style.backgroundColor = "red";
                            isDuplicate = true;
                        }
                        if (k !== j && board[i][k] === board[i][j]) {
                            document.getElementById(i + "" + k).style.backgroundColor = "red";
                            isDuplicate = true;
                        }
                    }
                    for (let r = bULrow; r < bULrow + rootN; r++) {
                        for (let c = bULcol; c < bULcol + rootN; c++) {
                            if ((r !== i || c !== j) && board[r][c] === board[i][j]) {
                                document.getElementById(r + "" + c).style.backgroundColor = "red";
                                isDuplicate = true;
                            }
                        }
                    }
                    if (isDuplicate) {
                        document.getElementById(i + "" + j).style.backgroundColor = "red";
                    }
                }
            }
        }
        if (IsSolved(n, board, solution)) {
            GameOver();
            alert("Solved!");
        }
    }
}

Load();