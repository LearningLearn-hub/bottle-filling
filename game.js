// Initialize game state
let score = 0;
let level = 1;
let currentColor = '';
let gameInterval;

// Color options
const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700']; // Red, Blue, Green, Yellow
const colorNames = ['Red', 'Blue', 'Green', 'Yellow'];

// DOM elements
const startButton = document.getElementById('start-btn');
const levelDisplay = document.getElementById('level');
const scoreDisplay = document.getElementById('score');
const bottles = document.querySelectorAll('.bottle');
const adsenseSpace = document.getElementById('adsense-space');
const gameTitle = document.getElementById('game-title');

// Functions to start the game
function startGame() {
    score = 0;
    level = 1;
    updateUI();
    enableBottleClicks();
    changeColor();
    gameInterval = setInterval(() => {
        window.open("https://www.example.com", "_blank"); // Example link
    }, 15000); // Open external link every 15 seconds
}

// Update game UI (score and level)
function updateUI() {
    levelDisplay.textContent = level;
    scoreDisplay.textContent = score;
}

// Enable clicking on bottles
function enableBottleClicks() {
    bottles.forEach(bottle => {
        bottle.addEventListener('click', fillBottle);
    });
}

// Function to fill the bottle when clicked
function fillBottle(e) {
    const bottle = e.target;
    if (bottle.querySelector('.bottle-filled')) {
        return; // Bottle already filled
    }

    const filled = document.createElement('div');
    filled.classList.add('bottle-filled');
    filled.style.backgroundColor = currentColor;
    bottle.appendChild(filled);

    score += 10; // Increase score
    updateUI();

    // Check if all bottles are filled
    if (document.querySelectorAll('.bottle .bottle-filled').length === bottles.length) {
        nextLevel();
    }
}

// Change color for the next round
function changeColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    currentColor = colors[randomIndex];
    gameTitle.textContent = `Fill the Bottles with ${colorNames[randomIndex]}`;
}

// Move to the next level
function nextLevel() {
    level++;
    if (level > 5) {
        endGame();
    } else {
        changeColor();
        updateUI();
    }
}

// End game
function endGame() {
    clearInterval(gameInterval); // Stop external redirection
    alert(`Game Over! Final Score: ${score}`);
    resetGame();
}

// Reset game to initial state
function resetGame() {
    score = 0;
    level = 1;
    updateUI();
    disableBottleClicks();
    changeColor();
}

// Disable clicking after game over
function disableBottleClicks() {
    bottles.forEach(bottle => {
        bottle.removeEventListener('click', fillBottle);
    });
}

// Adsense mock function (can be replaced with actual ad code)
function showAds() {
    adsenseSpace.style.display = 'block';
}

// Start button event listener
startButton.addEventListener('click', startGame);

// Show Ads every 30 seconds (simulating)
setInterval(showAds, 30000);

