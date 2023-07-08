let inputDirection = { x: 0, y: 0 }//by default dont move
let lastInputDirection = { x: 0, y: 0 }

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastInputDirection.y !== 0) break
            inputDirection = { x: 0, y: -1 }
            break 
        case 'ArrowDown':
            inputDirection = { x: 0, y: 1 }
            break 
        case 'ArrowLeft':
            inputDirection = { x: -1, y: 0 }
            break 
        case 'ArrowRight':
            inputDirection = { x: 1, y: 0 }
            break 
    }
})

export function getInputDirection() {
    lastInputDirection = inputDirection
    return inputDirection
}