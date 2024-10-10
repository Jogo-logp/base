const canvas = document.getElementById('gameCanvas'); // chama a id do canvas do html
const ctx = canvas.getContext('2d'); // contexto 2d do canvas, permite criar formas, imagens e textos. ctx é abreviação de context e é usado para desenhar no canvas

// elementos de interface abaixo
const exibirpontuacao = document.getElementById('pontuacao'); // chama a pontuação do html (placar)
const exibirvidas = document.getElementById('vidas'); // vidas do usuário (corações no canto superior esquerdo)
const exibirgameover = document.getElementById('game_over'); // tela de game over

canvas.width = 800;
canvas.height = 600; // configurações do tamanho da tela que vai rodar o jogo

// abaixoo encontram-se as *variáveis de estado*(variável que mantém informações sobre a condição atual do jogo, como ele ainda não começou, tudo é false/0/vazio, exceto a quantidade de vidas)
let pontuacao = 0; // placar(pontuação)
let respostaserradas = 0; // contador de respostas erradas 
let gameover = false; 
let loopdojg; // chama o loop do jogo
let userinput = ""; // entrada do usuário
const totaldevida = 5; // total de vidas

const levizao = { // chamando a variável do levi e configurando ela
    x: canvas.width / 10 - 20,
    y: canvas.height - 220,
    width: 150,
    height: 200,
    img: new Image()
};
levizao.img.src = 'imagens/levi1.gif'; // chamando a img do levi

const ghost = { // mesma coisa com o fantasma
    x: canvas.width / 10 - 40,
    y: -100,
    width: 80,
    height: 80,
    speed: 1.3,
    img: new Image(),
    contademat: { //configurando a conta de matemática para somar 2 números aleatórios entre 0 e 10
        num1: Math.floor(Math.random() * 11),
        num2: Math.floor(Math.random() * 11),
        respostacerta: null // Inicializa respostacerta
    }
};
ghost.img.src = 'imagens/ghost.png'; // chamando a img do fantasma
ghost.contademat.respostacerta = ghost.contademat.num1 + ghost.contademat.num2; // Calcula a resposta certa na inicialização

function desenholevi() {  // função para desenhar o levi
    console.log("desenhandolevi")
    ctx.drawImage(levizao.img, levizao.x, levizao.y, levizao.width, levizao.height);
}

function desenhoghost() { // função para desenhar o fantasma e configurar a conta p aparecer acima dele
    ctx.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);
    ctx.fillStyle = "white";
    ctx.font = "15px 'Press Start 2P'";
    ctx.fillText(`${ghost.contademat.num1} + ${ghost.contademat.num2} = ?`, ghost.x + 10, ghost.y - 10);
}

function desenhopontuacao() { // função pra desenhar a pontuação do usuário
    exibirpontuacao.textContent = `Pontuação: ${pontuacao}`;
}

function desenhovidas() { // função para exibir as vidas do usuário com corações
    exibirvidas.innerHTML = '';
    for (let i = 0; i < totaldevida; i++) {  // iterando de 0 até o total de vidas (definido como 5) de 1 em 1.
        const vida = document.createElement('span');
        vida.textContent = '❤️';
        vida.style.opacity = (i < respostaserradas) ? '0.5' : '1'; //se o i do for (que basicamente conta quantas rodadas o usuário jogou) for menor que a quantidade de respostas erradas, o coração ficará translúcido, indicando que o usuário perdeu uma vida, se não a opacidade continua a mesma coisa
        exibirvidas.appendChild(vida);
    }
}

function desenhoinput() { // função para desenhar o que o usuário digita como resposta, para que fique mais intuitivo o que acontece no jogo
    ctx.fillStyle = "black"; 
    ctx.font = "15px 'Press Start 2P'"; 
    ctx.fillText(`Sua resposta: ${userinput}`, canvas.width / 2 - 100, 550); 
}

function resetarghost() { // função para resetar o ghost quando necessário
    const lado = Math.random() < 0.5 ? 'horizontal' : 'vertical'; //define se o fantasma vai aparecer no eixo x ou y, a função math.random gera um n aleatório entre 0 e 1 e se o n for menor que 0.5 o lado será horizontal, caso contrário será vertical
    if (lado === 'horizontal') { //condição para saber se o lado "sorteado" é horizontal
        ghost.x = Math.random() * canvas.width;//se refere à posição horizontal do fantasma, se for verdadeiro, o fantasma iniciará fora da tela à esquerda, garantindo que ele não apareça no meio da tela. se não for verdadeiro, o fantasma vai começar fora da tela à direita
        ghost.y = -canvas.height; //define aleatoriamente a posição do ghost em relação ao eixo y
    } else { //se a condição anterior não for verdadeira (vertical) define outro eixo x e y para o fantasma
        ghost.x = canvas.width; // Pode começar em qualquer ponto no eixo x
        ghost.y = Math.random() *  canvas.height;
    }

    // novo problema matemático
    ghost.contademat.num1 = Math.floor(Math.random() * 10); //nv n aleatorio ate 10
    ghost.contademat.num2 = Math.floor(Math.random() * 10);
    ghost.contademat.respostacerta = ghost.contademat.num1 + ghost.contademat.num2;
    userinput = ""; // Reseta a entrada do usuário
    ghost.speed = 1; // Garante que a velocidade seja resetada
}


function checarresposta() { // checa a resposta do usuário
    const entradadousuario = parseInt(userinput, 10); 
    if (entradadousuario === ghost.contademat.respostacerta) {
        pontuacao++;
        resetarghost(); 
         //condição que verifica se a resposta está certa, se for verdadeiro aumenta a pontuação e reseta o ghost para uma nova conta aparecer
    } else {
        respostaserradas++;
        if (respostaserradas >= totaldevida) {
            telagameover();
        }
         //se a resposta estiver errada, a quantidade de respostas erradas aumenta (usuário perde uma vida) e caso as vidas já tenham sido todas perdidas o jogo acaba
    }
    userinput = ""; // Reseta a entrada do usuário após verificar
}

function telagameover() {
    gameover = true;
    exibirgameover.classList.remove('hidden');
    document.getElementById('pontuacao').style.display = 'none';
    document.getElementById('vidas').style.display = 'none';
}

function restart() { // reinicia o jogo
    pontuacao = 0;
    respostaserradas = 0;
    gameover = false;
    exibirgameover.classList.add('hidden');
    document.getElementById('pontuacao').style.display = 'block';
    document.getElementById('vidas').style.display = 'block';
    resetarghost();
    desenhopontuacao();
    desenhovidas();
    loopdogame();
}

function loopdogame() {
    console.log("tafuncioando")
    loopdojg = requestAnimationFrame(loopdogame);
    if (!gameover) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenholevi();
        desenhoghost();
        desenhopontuacao();
        desenhovidas();
        desenhoinput(); 
        const dx = levizao.x - ghost.x; // Diferença em x
        const dy = levizao.y - ghost.y; // Diferença em y
        const distance = Math.sqrt(dx * dx + dy * dy); // Distância até o Levi

        if (distance > 0) { // Verifica se o fantasma não está exatamente em cima do Levi
            ghost.x += (dx / distance) * ghost.speed; // Atualiza a posição em x
            ghost.y += (dy / distance) * ghost.speed; // Atualiza a posição em y
        }

        // Checa se o fantasma chegou ao Levi
        if (ghost.y + ghost.height >= levizao.y && ghost.x < levizao.x + levizao.width) {
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
