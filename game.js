const gameContainer = document.getElementById('gameContainer');
const spider = document.getElementById('spider');
const scoreElement = document.getElementById('score');
const backgroundMusic = document.getElementById('backgroundMusic');

let spiderBottom = 0; // Adjusted initial bottom position to match CSS
let isJumping = false;
let gravity = 2;
let obstacles = [];
let gameInterval;
let score = 0;

scoreElement.textContent = `Score: 0`;

console.log("Script loaded");

function jump() {
    if (isJumping) return;
    isJumping = true;
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
        if (jumpHeight >= 220) { // Increased jump height
            clearInterval(jumpInterval);
            fall();
        } else {
            jumpHeight += 10; // Increased jump increment
            spiderBottom += 10;
            spider.style.bottom = spiderBottom + 'px';
        }
    }, 20);
    console.log("Jumping");
}

function fall() {
    const fallInterval = setInterval(() => {
        if (spiderBottom <= 0) { // Adjusted bottom limit to match CSS
            clearInterval(fallInterval);
            isJumping = false;
        } else {
            spiderBottom -= gravity;
            spider.style.bottom = spiderBottom + 'px';
        }
    }, 20);
    console.log("Falling");
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    const obstacleType = Math.floor(Math.random() * 3);
    switch (obstacleType) {
        case 0:
            obstacle.style.backgroundImage = "url('assets/skull.png')";
            obstacle.style.width = '50px';
            obstacle.style.height = '50px';
            obstacle.classList.add('skull-obstacle');
            break;
        case 1:
            obstacle.style.backgroundImage = "url('assets/scorpion.gif')"; // Updated to use GIF
            obstacle.style.width = '180px'; // Increased size of the scorpion
            obstacle.style.height = '180px'; // Increased size of the scorpion
            obstacle.classList.add('scorpion-obstacle');
            break;
        case 2:
            obstacle.style.backgroundImage = "url('assets/flower.png')";
            obstacle.style.width = '100px'; // Adjusted size of the flower
            obstacle.style.height = '100px'; // Adjusted size of the flower
            obstacle.classList.add('flower-obstacle');
            break;
    }
    obstacle.style.left = '800px';
    gameContainer.appendChild(obstacle);
    obstacles.push(obstacle);

    console.log("Obstacle created: ", obstacle);

    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let obstacleLeft = 800;
    const moveInterval = setInterval(() => {
        if (obstacleLeft <= -50) {
            clearInterval(moveInterval);
            if (gameContainer.contains(obstacle)) {
                gameContainer.removeChild(obstacle);
            }
            obstacles.shift();
            updateScore(); // Update score when an obstacle is successfully passed
        } else {
            obstacleLeft -= 5; // Slow down the movement speed
            obstacle.style.left = obstacleLeft + 'px';

            const spiderRect = spider.getBoundingClientRect();
            const obstacleRect = obstacle.getBoundingClientRect();

            if (
                spiderRect.left < obstacleRect.left + obstacleRect.width &&
                spiderRect.left + spiderRect.width > obstacleRect.left &&
                spiderRect.top < obstacleRect.top + obstacleRect.height &&
                spiderRect.top + spiderRect.height > obstacleRect.top
            ) {
                clearInterval(moveInterval);
                gameOver();
            }
        }
    }, 20);
}

function updateScore() {
    score++;
    scoreElement.textContent = `Score: ${score}`;
    console.log("Score updated: ", score);
}

function gameOver() {
    clearInterval(gameInterval);
    alert(`Game Over! Your score was ${score}`);
    location.reload();
}

function startGame() {
    backgroundMusic.play(); // Play background music when the game starts
    gameInterval = setInterval(() => {
        createObstacle();
    }, 3000); // Increase the interval to 3000ms for more spacing between obstacles
}

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' || e.key === 'ArrowUp') {
        if (backgroundMusic.paused) {
            backgroundMusic.play(); // Ensure music starts on user interaction
        }
        jump();
    }
});

// Add touch event listeners for mobile controls
document.addEventListener('touchstart', (e) => {
    if (backgroundMusic.paused) {
        backgroundMusic.play(); // Ensure music starts on user interaction
    }
    jump();
});

startGame();
console.log("Game started");
