let boxes = document.querySelectorAll(".game-box");
let restartBtn = document.querySelector("#restart-game");
let newgameBtn = document.querySelector("#new-game-btn");
let messageContainer = document.querySelector(".message-container");
let gameMessage = document.querySelector("#game-message");

let count = 0;
let turnO = true;

const winPatterns = [
    [0,1,2], [0,3,6], [0,4,8], [1,4,7],
    [2,5,8], [2,4,6], [3,4,5], [6,7,8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "X" : "O";
            turnO = !turnO;
            count++;
            let isWinner = checkWinner();
            if (count === 9 && !isWinner) gameDraw();
        }
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            return true;
        }
    }
    return false;
};

const showWinner = (winner) => {
    gameMessage.innerText = `CONGRATS BUDDY YOU WON ${winner} !`;
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const gameDraw = () => {
    gameMessage.innerText = "YOUR IQ LEVELS ARE EQUAL!!!";
    messageContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => box.style.pointerEvents = "none");
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.style.pointerEvents = "auto";
    });
};

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    messageContainer.classList.add("hide");
};

newgameBtn.addEventListener("click", resetGame);
restartBtn.addEventListener("click", resetGame);
