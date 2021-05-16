import { update as updateSnake, render as renderSnake, snakeSpeed, getSnakeHead, snakeCrash } from "./snake.js"
import { update as updateFood, render as renderFood } from "./food.js"
import { wallCrash } from "./grid.js"
let lastRenderTime = 0;
const board = document.querySelector('#board');

let gameover = false;


function run(currentTime) {
    if (gameover) {
        if (confirm("You died. Press OK to restart.")) {
            window.location.reload();
        }
        return
    }
    window.requestAnimationFrame(run);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
    lastRenderTime = currentTime;

    // update the logic and state of the game
    update()
    // render the snake and food in correct position
    render();
}

window.requestAnimationFrame(run);

function update() {
    updateSnake();
    updateFood();
    checkCrash();
}

function render() {
    board.innerHTML = ""
    renderSnake(board);
    renderFood(board);
}

function checkCrash() {
    gameover = wallCrash(getSnakeHead()) || snakeCrash()
}
