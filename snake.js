import { getInputDirection } from "./input.js"

export const SNAKE_SPEED = 5
//how we reference the snake character as the player sees it
const snakeBody = [{x: 11, y: 11}]
let newSegments = 0

//update() and draw() are getting fired off every 1/5 secs -
// because they're called as updateSnake within game.js's update()
//each time the specified rate calculated in the game loop ticks.
export function update() {
    addSegments()
    const inputDirection = getInputDirection()
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        // the {...} snakeBody is like a new instance of
        //snakeBody i.e. our snake is getting set to the
        //new instance of itself visually
        snakeBody[i + 1] = { ...snakeBody[i] }
    }
        //update head of snake based on new direction chosen
    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
  snakeBody.forEach(segment => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = segment.y
    snakeElement.style.gridColumnStart = segment.x
    snakeElement.classList.add('snake')
    gameBoard.appendChild(snakeElement)
  })
}

export function expandSnake(amount) {
    newSegments += amount
}

export function onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments() {
 for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newSegments = 0
}