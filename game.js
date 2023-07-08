import { update as updateSnake, draw as drawSnake,
     SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import  { outSideGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

//game loop
function main(currentTime) {
    if (gameOver) {
        if (confirm('You Lost. Press ok to restart.')) {
            window.location = '/'
        }
        return
    }

    //browser, when can i request my next frame? w timestamp
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    //Snake_Speed is like the threshold or convrsn rate so it wont
    // move like every single millisecond or something way too fast
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return



    lastRenderTime = currentTime

    //update game logic, draw is update graphics. draw takes from update/logic
    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood() 
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outSideGrid(getSnakeHead()) || snakeIntersection()
}