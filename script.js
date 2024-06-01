function createObstacle() {
    let obstacle = document.createElement('div');
    let obstacleType = getRandomObstacleType(); // Ensure you have this function

    switch (obstacleType) {
        case 'skull':
            obstacle.style.backgroundImage = 'url("images/skull.png")';
            break;
        case 'flower':
            obstacle.style.backgroundImage = 'url("images/flower.png")';
            obstacle.classList.add('obstacle', 'flower');
            break;
        case 'scorpion':
            obstacle.style.backgroundImage = 'url("images/scorpion.png")';
            obstacle.classList.add('obstacle', 'scorpion');
            break;
    }

    obstacle.classList.add('obstacle');
    document.getElementById('obstacles').appendChild(obstacle);
    moveObstacle(obstacle); // Ensure you have this function
}

function moveObstacle(obstacle) {
    obstacle.style.animation = 'moveObstacle 3s linear infinite'; // Adjust the animation duration as needed
}

// Add event listener or game loop to create obstacles periodically
setInterval(createObstacle, 2000); // Adjust the interval as needed

function getRandomObstacleType() {
    const types = ['skull', 'flower', 'scorpion'];
    return types[Math.floor(Math.random() * types.length)];
}

