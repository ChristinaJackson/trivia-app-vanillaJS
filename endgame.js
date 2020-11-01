if (window.location.pathname === '/end.html') { updateGameStats() }


function updateGameStats() {
    let currentFinalScore = localStorage.getItem('score');
    let highScore = localStorage.getItem('highScore');
    let endGameStatus = document.getElementById('endGameStatus');
    let yourScore = document.getElementById('yourScore');
    let previousScore = document.getElementById('previousScore');

    yourScore.textContent = currentFinalScore;
    previousScore.textContent = highScore;
    console.log(endGameStatus + 'hello')
    if (!highScore) {
        localStorage.setItem('highScore', currentFinalScore);
        endGameStatus.textContent = 'You are the first to play! You win'
    } else if (highScore > currentFinalScore) {
        endGameStatus.textContent = 'Oh no! You Lost!'
    } else if (highScore === currentFinalScore) {
        endGameStatus.textContent = 'You tied the best score!'
    } else {
        localStorage.setItem('highScore', currentFinalScore)
        endGameStatus.textContent = 'You are the winner!'
    }
}
