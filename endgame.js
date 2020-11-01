if (window.location.pathname === '/end.html') { updateGameStats() };

const resetScoresButton = document.getElementById('reset');

function updateGameStats() {
    let currentFinalScore = localStorage.getItem('score');
    let highScore = localStorage.getItem('highScore');
    let endGameStatus = document.getElementById('endGameStatus');
    let yourScore = document.getElementById('yourScore');
    let previousScore = document.getElementById('previousScore');
    let previousScoreP = document.getElementById('previousScoreP');

    yourScore.textContent = currentFinalScore;
    previousScore.textContent = highScore;
    console.log('current score' + currentFinalScore)

    if (!highScore && !currentFinalScore) {
        localStorage.setItem('highScore', 0);
        localStorage.setItem('score', 0);
        endGameStatus.textContent = 'You are the first to play! So...you win?';
        yourScore.textContent = 0;
        previousScoreP.style.display = 'none';
    } else if (!currentFinalScore) {
        localStorage.setItem('score', 0);
        yourScore.textContent = 0;
    } else if (!highScore) {
        localStorage.setItem('highScore', currentFinalScore);
        endGameStatus.textContent = 'You are the first to play! So...you win?';
        previousScoreP.style.display = 'none';
    } else if (highScore > currentFinalScore) {
        endGameStatus.textContent = 'Oh no! You Lost!';
    } else if (highScore === currentFinalScore) {
        endGameStatus.textContent = 'You tied the best score!';
    } else {
        localStorage.setItem('highScore', currentFinalScore);
        endGameStatus.textContent = 'You are the winner!';
    }
};

resetScoresButton.addEventListener('click', (e) => {
    localStorage.clear()
});

