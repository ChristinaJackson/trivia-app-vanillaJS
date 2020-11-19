if (window.location.pathname === '/end.html') { updateGameStatsDisplay() };

const resetScoresButton = document.getElementById('reset');

//updates final page scores and sets local storage values
function updateGameStatsDisplay() {
    let currentFinalScore = parseInt(localStorage.getItem('score'));
    let highScore = parseInt(localStorage.getItem('highScore'));
    let yourScore = document.getElementById('yourScore');
    let previousScore = document.getElementById('previousScore');

    yourScore.textContent = currentFinalScore;
    previousScore.textContent = highScore;

    updateGameResults(highScore, currentFinalScore)

}

function updateGameResults(highScore, currentScore) {
    const endGameStatus = document.getElementById('endGameStatus');
    const previousScoreP = document.getElementById('previousScoreP');

    if (!highScore && currentScore === 0) {
        localStorage.setItem('highScore', 0);
        localStorage.setItem('score', 0);
        endGameStatus.textContent = 'You got none correct :(';
        yourScore.textContent = 0;
        previousScoreP.style.display = 'none';
    } else if (!highScore && currentScore) {
        localStorage.setItem("highScore", currentScore);
        previousScoreP.style.display = 'none';
        endGameStatus.textContent = 'You are the first to play! So...you win?';
    } else if (highScore && !currentScore || highScore > currentScore) {
        yourScore.textContent = 0;
        endGameStatus.textContent = 'You can do better!';
    } else if (highScore < currentScore) {
        localStorage.setItem('highScore', currentScore);
        endGameStatus.textContent = 'You are the winner!';
    } else if (highScore === currentScore) {
        endGameStatus.textContent = 'You tied the best score';
    }
}

//clear local storage to reset game scores
resetScoresButton.addEventListener('click', (e) => {
    localStorage.clear()
});

