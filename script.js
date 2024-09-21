const player = document.getElementById('player');
const obstacle = document.getElementById('obstacle');
const gameOverText = document.getElementById('gameOver');

let isJumping = false;
let isGameOver = false;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space') {
        if (isGameOver) {
            restartGame();
        } else if (!isJumping) {
            jump();
        }
    }
});

function jump() {
    if (isJumping) return;
    isJumping = true;
    player.style.animation = 'jump 0.5s';
    
    setTimeout(() => {
        player.style.animation = '';
        isJumping = false;
    }, 500);
}

// Function to detect collision
function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.left + obstacleRect.width &&
        playerRect.left + playerRect.width > obstacleRect.left &&
        playerRect.top < obstacleRect.top + obstacleRect.height &&
        playerRect.top + playerRect.height > obstacleRect.top
    ) {
        endGame();
    }
}

function endGame() {
    obstacle.style.animationPlayState = 'paused';
    gameOverText.style.display = 'block';
    isGameOver = true;
}

function restartGame() {
    gameOverText.style.display = 'none';
    obstacle.style.animationPlayState = 'running';
    isGameOver = false;
}

// Continuously check for collision
setInterval(checkCollision, 100);
