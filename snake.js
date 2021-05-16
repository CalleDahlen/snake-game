import { getInputDirection } from "./controls.js";
const speedRate = document.querySelector("#speed");

export let snakeSpeed;


// snake start in the middle of the board
const snakeBody = [{ x: 11, y: 11 }]
let newPiece = 0;


export function update() {
    addPiece();
    snakeSpeed = parseInt(speedRate.value);
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;

}

export function render(board) {
    snakeBody.forEach(piece => {
        const snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = piece.y;
        snakeElement.style.gridColumnStart = piece.x;
        snakeElement.classList.add("snake");
        board.appendChild(snakeElement);
    })
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((piece, index) => {
        if (ignoreHead && index === 0) return false;
        return samePosition(piece, position);
    })

}

export function eat(amount) {
    newPiece += amount;
}

export function getSnakeHead() {
    return snakeBody[0];
}

export function snakeCrash() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function samePosition(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addPiece() {
    // duplicate the last piece of the snake to expand it.
    for (let i = 0; i < newPiece; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newPiece = 0
}
