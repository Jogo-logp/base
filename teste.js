function loopdogame() {
    loopdojg = requestAnimationFrame(loopdogame);
    if (!gameover) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenholevi();
        desenhoghost();
        desenhopontuacao();
        desenhovidas();
        desenhoinput(); 
        ghost.x += ghost.speed; // Move o fantasma para a direita

        if (ghost.y + ghost.height >= levizao.y) {
            resetarghost();
            respostaserradas++;
            if (respostaserradas >= totaldevida) { // Verifica se as vidas acabaram
                telagameover();
            }
        }
    }
}

window.addEventListener("keydown", function(event) {
    if (!gameover && event.key >= 0 && event.key <= 9) {
        userinput += event.key; // Adiciona o número pressionado à entrada do usuário
    } else if (event.key === "Enter") {
        if (userinput.length > 0) {
            checarresposta(); // Verifica a resposta quando o usuário pressiona Enter
        }
    } else if (event.key === "Backspace") {
        userinput = userinput.slice(0, -1); // Remove o último caractere da entrada do usuário
    }
});

document.getElementById('play-again').addEventListener('click', restart); // Reinicia o jogo quando clica em "Play Again"
document.getElementById('exit-game').addEventListener('click', function() {
    gameover = true;
    cancelAnimationFrame(loopdojg);
    document.getElementById('game-container').style.display = 'none';
});

loopdogame();
