const canvas = document.getElementById('gameCanvas'); // chama a id do canvas do html
const ctx = canvas.getContext('2d'); // contexto 2d do canvas, permite criar formas, imagens e textos. ctx é abreviação de context e é usado para desenhar no canvas

// elementos de interface abaixo
const exibirpontuacao = document.getElementById('pontuacao'); // chama a pontuação do html (placar)
const exibirvidas = document.getElementById('vidas'); // vidas do usuário (corações no canto superior esquerdo)
const exibirgameover = document.getElementById('game_over'); // tela de game over
const gifFrames = [
    'imagens/l.normal1',
    'imagens/l.normal2',
    'imagens/l.normal3',
    'imagens/l.normal4',
    'imagens/l.normal5',
];

canvas.width = 800;
canvas.height = 600; // configurações do tamanho da tela que vai rodar o jogo

// Variáveis de estado
let pontuacao = 0;
let respostaserradas = 0;
let gameover = false; 
let loopdojg;
let userinput = "";
const totaldevida = 5;

const levizao = {
    x: canvas.width / 10,
    y: canvas.height - 220,
    width: 150,
    height: 200,
    currentFrame: 0,
};

// Carregando imagens do Levi
const images = gifFrames.map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

// Função para desenhar o Levi animado
function desenhaFrame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    const frame = images[levizao.currentFrame];
    ctx.drawImage(frame, levizao.x, levizao.y, levizao.width, levizao.height);

    levizao.currentFrame = (levizao.currentFrame + 1) % images.length; // Próximo frame

    requestAnimationFrame(desenhaFrame);
}

// Quando todas as imagens estiverem carregadas, iniciar a animação
Promise.all(images.map(img => new Promise(resolve => {
    img.onload = resolve;
}))).then(() => {
    desenhaFrame();
});

const ghost = { 
    x: canvas.width / 10 - 40,
    y: -100,
    width: 80,
    height: 80,
    speed: 1,
    img: new Image(),
    contademat: {
        num1: Math.floor(Math.random() * 11),
        num2: Math.floor(Math.random() * 11),
        respostacerta: null
    }
};
ghost.img.src = 'imagens/ghost.png'; 
ghost.contademat.respostacerta = ghost.contademat.num1 + ghost.contademat.num2;

function desenhoghost() {
    ctx.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);
    ctx.fillStyle = "white";
    ctx.font = "15px 'Press Start 2P'";
    ctx.fillText(`${ghost.contademat.num1} + ${ghost.contademat.num2} = ?`, ghost.x + 10, ghost.y - 10);
}

function checarresposta() {
    const entradadousuario = parseInt(userinput, 10); 
    if (entradadousuario === ghost.contademat.respostacerta) {
        pontuacao++;
        resetarghost(); 
    } else {
        respostaserradas++;
        if (respostaserradas >= totaldevida) {
            telagameover();
        }
    }
    userinput = "";
}

function resetarghost() {
    const lado = Math.random() < 0.5 ? 'horizontal' : 'vertical'; 
    if (lado === 'horizontal') {
        ghost.x = Math.random() * canvas.width;
        ghost.y = -canvas.height; 
    } else {
        ghost.x = canvas.width; 
        ghost.y = Math.random() * canvas.height;
    }

    ghost.contademat.num1 = Math.floor(Math.random() * 10); 
    ghost.contademat.num2 = Math.floor(Math.random() * 10);
    ghost.contademat.respostacerta = ghost.contademat.num1 + ghost.contademat.num2;
    userinput = "";
    ghost.speed = 1;
}

function telagameover() {
    gameover = true;
    exibirgameover.classList.remove('hidden');
    document.getElementById('pontuacao').style.display = 'none';
    document.getElementById('vidas').style.display = 'none';
}

function loopdogame() {
    loopdojg = requestAnimationFrame(loopdogame);
    if (!gameover) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        desenhaFrame();
        desenhoghost();
        desenhopontuacao();
        desenhovidas();
        desenhoinput(); 

        const dx = levizao.x - ghost.x; 
        const dy = levizao.y - ghost.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            ghost.x += (dx / distance) * ghost.speed; 
            ghost.y += (dy / distance) * ghost.speed; 
        }

        if (ghost.y + ghost.height >= levizao.y && ghost.x < levizao.x + levizao.width) {
            resetarghost();
            respostaserradas++;
            if (respostaserradas >= totaldevida) {
                telagameover();
            }
        }
    }
}
