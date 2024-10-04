const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const heartsDisplay = document.getElementById('hearts');
const gameOverScreen = document.getElementById('game-over');

canvas.width = 800;
canvas.height = 600;

let score = 0;
let wrongAnswers = 0;
let gameOver = false;
let gameLoopId;
let userInput = ""; // Variável para armazenar a entrada do usuário
const totalLives = 5; // Total de vidas

const cat = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 300,
    width: 100,
    height: 100,
    img: new Image()
};
cat.img.src = 'imagens/cat_image.png';

const ghost = {
    x: canvas.width / 2 - 40,
    y: -80,
    width: 80,
    height: 80,
    speed: 1,
    img: new Image(),
    mathProblem: {
        num1: Math.floor(Math.random() * 10),
        num2: Math.floor(Math.random() * 10),
        correctAnswer: null
    }
};
ghost.img.src = 'imagens/ghost.png';
ghost.mathProblem.correctAnswer = ghost.mathProblem.num1 + ghost.mathProblem.num2;

function drawCat() {
    ctx.drawImage(cat.img, cat.x, cat.y, cat.width, cat.height);
}

function drawGhost() {
    ctx.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`${ghost.mathProblem.num1} + ${ghost.mathProblem.num2} = ?`, ghost.x + 10, ghost.y - 10);
}

function drawScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function drawHearts() {
    heartsDisplay.innerHTML = '';
    for (let i = 0; i < totalLives; i++) { // Usando totalLives
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        heart.style.opacity = (i < wrongAnswers) ? '0.5' : '1';
        heartsDisplay.appendChild(heart);
    }
}

function drawUserInput() {
    ctx.fillStyle = "white"; // Cor do texto
    ctx.font = "30px 'Press Start 2P'"; // Estilo da fonte com a fonte "Press Start 2P"
    ctx.fillText(`Sua resposta: ${userInput}`, canvas.width / 2 - 100, 550); // Mostra a entrada do usuário na parte inferior do canvas
}

function resetGhost() {
    ghost.x = canvas.width / 2 - 40;
    ghost.y = -ghost.height;
    ghost.mathProblem.num1 = Math.floor(Math.random() * 10);
    ghost.mathProblem.num2 = Math.floor(Math.random() * 10);
    ghost.mathProblem.correctAnswer = ghost.mathProblem.num1 + ghost.mathProblem.num2;
    userInput = ""; // Reseta a entrada do usuário
}

function checkAnswer() {
    // Converte a entrada do usuário para um número
    const userAnswer = parseInt(userInput, 10);
    if (userAnswer === ghost.mathProblem.correctAnswer) {
        score++;
        resetGhost();
    } else {
        wrongAnswers++;
        if (wrongAnswers >= totalLives) { // Verifica se as vidas acabaram
            triggerGameOver();
        }
    }
    userInput = ""; // Reseta a entrada do usuário após verificar
}

function triggerGameOver() {
    gameOver = true;
    gameOverScreen.classList.remove('hidden');
    document.getElementById('score').style.display = 'none';
    document.getElementById('hearts').style.display = 'none';
}

function restartGame() {
    score = 0;
    wrongAnswers = 0;
    gameOver = false;
    gameOverScreen.classList.add('hidden');
    document.getElementById('score').style.display = 'block';
    document.getElementById('hearts').style.display = 'block';
    resetGhost();
    drawScore();
    drawHearts();
    gameLoop();
}

function gameLoop() {
    gameLoopId = requestAnimationFrame(gameLoop);
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCat();
        drawGhost();
        drawScore();
        drawHearts();
        drawUserInput(); // Desenha a entrada do usuário na tela
        ghost.y += ghost.speed;
        if (ghost.y + ghost.height >= cat.y) {
            resetGhost();
            wrongAnswers++;
            if (wrongAnswers >= totalLives) { // Verifica se as vidas acabaram
                triggerGameOver();
            }
        }
    }
}

window.addEventListener("keydown", function(event) {
    if (!gameOver && event.key >= 0 && event.key <= 9) {
        userInput += event.key; // Adiciona o número pressionado à entrada do usuário
    } else if (event.key === "Enter") {
        if (userInput.length > 0) { // Verifica se há entrada do usuário
            checkAnswer(); // Verifica a resposta
        }
    }
});

document.getElementById('play-again').addEventListener('click', restartGame);
document.getElementById('exit-game').addEventListener('click', function() {
    gameOver = true;
    cancelAnimationFrame(gameLoopId);
    document.getElementById('game-container').style.display = 'none';
});

gameLoop();
