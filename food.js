import { eat, onSnake } from "./snake.js"
import { randomGridPosition } from "./grid.js"

const scoreBoard = document.querySelector("#score");
const scoreText = document.querySelector("#scoreText");
const growthRate = document.querySelector("#growth");
let food = getRandomPosition();
let score = 0;


export function update() {
    let nutritionRate = parseInt(growthRate.value);
    if (onSnake(food)) {
        eat(nutritionRate);
        food = getRandomPosition();
        score += nutritionRate;
        scoreText.innerText = "";
        scoreText.innerText = `Score ${score}`;
        scoreBoard.appendChild(scoreText);

    }

}

export function render(board) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

function getRandomPosition() {
    let newPosition;
    while (newPosition == null || onSnake(newPosition)) {
        newPosition = randomGridPosition();
    }
    return newPosition;
}