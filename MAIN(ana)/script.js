const canvas = document.getElementById('gameCanvas'); // chama a id do canvas do html
const ctx = canvas.getContext('2d'); // contexto 2d do canvas, permite criar formas, imagens e textos. ctx é abreviação de context e é usado para desenhar no canvas

// elementos de interface abaixo

const exibirvidas = document.getElementById('vidas'); // vidas do usuário (corações no canto superior esquerdo)
const exibirgameover = document.getElementById('game_over'); // tela de game over
const exibirgamewon = document.getElementById('game_won'); // tela de game won
const exibirinstrucoes=document.getElementById('instrucoes');
const exibirfase1  = document.getElementById('fase1');
const exibirfase2  = document.getElementById('fase2');
const exibirfase3  = document.getElementById('fase3');
const gamewonsound =document.getElementById('gamewonsound');
const gameoversound =document.getElementById('gameoversound');
const musicaambiente =document.getElementById('ambientesound');
const levelupsound = document.getElementById ('levelupsound');
const introsound = document.getElementById ('introsound');
const play=document.getElementById('play')
const levigif = new Image ();
levigif.src='imagens/levi1.gif'



canvas.width = 800;
canvas.height = 600; // configurações do tamanho da tela que vai rodar o jogo

// abaixoo encontram-se as *variáveis de estado*(variável que mantém informações sobre a condição atual do jogo, como ele ainda não começou, tudo é false/0/vazio, exceto a quantidade de vidas)
let pontuacao = 0; // placar(pontuação)
let respostaserradas = 0; // contador de respostas erradas 
let gameover = false; 
let gamewon =false;
let instrucoes=true;
let fase1= false;
let fase2= false;
let fase3= false;
let loopdojg; // chama o loop do jogo
let userinput = ""; // entrada do usuário
let totaldevida = 5; // total de vidas

const levizao = { // chamando a variável do levi e configurando ela
    x: canvas.width / 10 + 50,
    y: canvas.height - 250,
    width: 150,
    height: 200,
    img: levigif
};



const ghost = { // mesma coisa com o fantasma
    x: 800,
    y: 140,
    width: 120,
    height: 100,
    speed: 1,
    img: new Image(),
};
ghost.img.src = 'imagens/ghost.png'; // chamando a img do fantasma
ghost.img.transf

let contademat={
    num1:0,
    num2:0,
    respostacerta:0,
    operacao:""
};

function contas(){
    if (pontuacao <= 4) {
        contademat.num1 = Math.floor(Math.random() * 11);
        contademat.num2 = Math.floor(Math.random() * 11);
        contademat.respostacerta = contademat.num1 + contademat.num2;
        contademat.operacao ='+'
        
    } else if (pontuacao > 4 && pontuacao <= 9) {
        contademat.num1 = Math.floor(Math.random() * 11);
        contademat.num2 = Math.floor(Math.random() * 11);
        contademat.respostacerta = contademat.num1 - contademat.num2;
        contademat.operacao="-"
    } else if (pontuacao > 9 && pontuacao <= 14) {
        contademat.num1 = Math.floor(Math.random() * 11);
        contademat.num2 = Math.floor(Math.random() * 11);
        contademat.respostacerta = contademat.num1 * contademat.num2;
        contademat.operacao="x"
    } else if (pontuacao > 14) {
        do {
            contademat.num2 = Math.floor(Math.random() * 10) + 1; // Denominador não pode ser zero
            contademat.num1 = contademat.num2 * Math.floor(Math.random() * 10); // Garante que o numerador seja divisível pelo denominador
        } while (contademat.num2 === 0); // Evita divisão por zero
        contademat.respostacerta = contademat.num1 / contademat.num2;
        contademat.operacao=":"
    }
    
}

function playgamewonsound(){
    gamewonsound.play();
}

function playgameoversound(){
    gameoversound.play();
}

function playambientesound(){
    musicaambiente.play();
}

function pauseambientesound() {
    musicaambiente.pause(); 
}

function playlevelupsound(){
    levelupsound.play();
}
function playintrosound(){
    introsound.play();
}


function desenholevi() {  // função para desenhar o levi
    ctx.drawImage(levigif, levizao.x, levizao.y, levizao.width, levizao.height);
}

function desenhoghost() { // função para desenhar o fantasma e configurar a conta p aparecer acima dele
    ctx.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);
    ctx.fillStyle = "black";
    ctx.lineWidth = 3; // espessura da borda
    ctx.strokeStyle = "white";
    ctx.font = "15px 'Press Start 2P'";
    ctx.strokeText(`${contademat.num1} ${contademat.operacao} ${contademat.num2} = ?`, ghost.x + 10, ghost.y - 10);
    ctx.fillText(`${contademat.num1} ${contademat.operacao} ${contademat.num2} = ?`, ghost.x + 10, ghost.y - 10);
}

function desenhopontuacao() { // função pra desenhar a pontuação do usuário
    ctx.fillStyle='rgb(241, 40, 36)';
    ctx.lineWidth=3;
    ctx.strokeStyle='black';
    ctx.font ="20px 'Press Start 2P'";
    ctx.strokeText(`Pontuação: ${pontuacao}`, canvas.width / 2 + 100, 50);
    ctx.fillText(`Pontuação: ${pontuacao}`, canvas.width / 2 + 100, 50); 
}

function desenhovidas() { // função para exibir as vidas do usuário com corações
    exibirvidas.innerHTML = '';
    for (let i = 0; i < totaldevida; i++) {  // iterando de 0 até o total de vidas (definido como 5) de 1 em 1.
        const vida = document.createElement('span');
        vida.textContent = '❤️';
        // A opacidade deve ser 0.5 se o número de respostas erradas for maior ou igual ao número de vidas disponíveis
        vida.style.opacity = (i < v) ? '1' : '0.5'; 
        exibirvidas.appendChild(vida);
    }
    
}


function desenhoinput() { // função para desenhar o que o usuário digita como resposta, para que fique mais intuitivo o que acontece no jogo
    ctx.fillStyle = "white"; 
    ctx.lineWidth= 4;
    ctx.strokeStyle='black';
    ctx.font = "20px 'Press Start 2P'"; 
    ctx.strokeText(`${userinput}`,  380, 150);
    ctx.fillText(`${userinput}`, 380, 150); 
}


function resetarghost() { // função para resetar o ghost quando necessário
    contas()
    const lado = Math.random() *(1-0.5)+0.5; 
       // ghost.x = Math.random() * canvas.width;
        //ghost.y = -canvas.height; 
        ghost.x = canvas.width; // Pode começar em qualquer ponto no eixo x
        ghost.y = Math.random() *  canvas.height;

    // novo problema matemático
    
    userinput = ""; // Reseta a entrada do usuário
    ghost.speed = 1; // Garante que a velocidade seja resetada
}

let acertosconsecutivos = 0;
let v=totaldevida;
function checarresposta() {
    const entradadousuario = parseInt(userinput, 10); 
    if (entradadousuario === contademat.respostacerta) {
        pontuacao++;
        acertosconsecutivos++; // Incrementa os acertos consecutivos
        
        // Adiciona vida se houver mais de 10 acertos consecutivos
        if (acertosconsecutivos > 10) {
            if (v<totaldevida){
                v++
                acertosconsecutivos=0;
            }
        }
        telas()        
        resetarghost(); 
    } else {
        respostaserradas++;
        acertosconsecutivos = 0; // Reseta os acertos consecutivos se errar
        if (respostaserradas >= totaldevida) {
            telagameover();
        } else {
            v--
        }
    }
    
    userinput = ""; // Reseta a entrada do usuário após verificar
    desenhovidas(); // Atualiza a visualização das vidas
    console.log(`Acertos Consecutivos: ${acertosconsecutivos}, Total de Vidas: ${totaldevida}, Respostas Erradas: ${respostaserradas}`);

}

function desenharTexto() {
    ctx.fillStyle = 'white'; 
    ctx.lineWidth= 4;
    ctx.strokeStyle='black';
    ctx.font = "10px 'Press Start 2P'"; 
    ctx.strokeText('Pressione P para pausar e R para retornar', 30, 590);
    ctx.fillText('Pressione P para pausar e R para retornar', 30, 590);
}      


function telafase1() {
    fase1 = true;
    exibirfase1.classList.remove('hidden');
    setTimeout(() => {
        telafase1 = false;
        exibirfase1.classList.add('hidden');
    }, 2000);
    playlevelupsound();
    

}

function telafase2() {
   fase2 = true;
   exibirfase2.classList.remove('hidden');
   setTimeout(() => {
    telafase2 = false;
    exibirfase2.classList.add('hidden');
}, 2000);
playlevelupsound();


}

function telafase3() {
    fase3 = true;
    exibirfase3.classList.remove('hidden');
    setTimeout(() => {
        telafase3 = false;
        exibirfase3.classList.add('hidden');
    }, 2000);
    playlevelupsound();
    

}
function telas (){
    console.log(`Pontuação atual: ${pontuacao}`);
    if(pontuacao===5){
        telafase1()
    }
    //else if(pontuacao==10){
       // telafase2()
    //}
    //else if(pontuacao==15){
        //telafase3()
    //}
}

function telagameover() {
    gameover = true;
    cancelAnimationFrame(loopdojg);
    exibirgameover.classList.remove('hidden');
    playgameoversound();
    pauseambientesound();
}

document.getElementById('play').addEventListener('click', function(){
    instrucoes=false;
    gameover=false;
    exibirinstrucoes.classList.add('hidden');
    requestAnimationFrame(loopdogame);
})

function telainstrucoes() {
    instrucoes = true;
    exibirinstrucoes.classList.remove('hidden');
    pauseambientesound();
}

function voltaraojogo() {
requestAnimationFrame(loopdogame);
}
function pararojogo(){
    cancelAnimationFrame(loopdojg);
    pauseambientesound();
}

function telagamewon() {
    gamewon = true;
    pararojogo();
    exibirgamewon.classList.remove('hidden');
    playgamewonsound();
    pauseambientesound();
}

function restart() { // reinicia o jogo
    resetarghost();
    pontuacao = 0;
    respostaserradas = 0;
    v = totaldevida;
    ghost.x= 800,
    ghost.y= 140,
    gameover = false;
    gamewon = false;
    exibirgameover.classList.add('hidden');
    exibirgamewon.classList.add('hidden');
    exibirinstrucoes.classList.add('hidden');
    exibirfase1.classList.add('hidden');
    exibirfase2.classList.add('hidden');
    exibirfase3.classList.add('hidden');
    document.getElementById('pontuacao').style.display = 'block';
    document.getElementById('vidas').style.display = 'block';
    contas();
    desenhopontuacao();
    desenhovidas();
    playambientesound();
    requestAnimationFrame(loopdogame);  // Iniciar o loop de animação do jogo
}
//o restart nao esta voltando a fase de soma de primeira, arrumar isso***********
telainstrucoes();
contas();
function loopdogame() {
    if (!gameover && !gamewon && !instrucoes) {
        loopdojg = requestAnimationFrame(loopdogame);  // Continua o loop

        playambientesound();
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        desenholevi();
        desenhoghost();
        desenhopontuacao();
        desenhovidas();
        desenhoinput(); 
        desenharTexto();

        const dx = levizao.x - ghost.x;  // Diferença em x
        const dy = levizao.y - ghost.y;  // Diferença em y
        const distance = Math.sqrt(dx * dx + dy * dy);  // Distância até o Levi

        if (distance > 0) {  // Verifica se o fantasma não está exatamente em cima do Levi
            ghost.x += (dx / distance) * ghost.speed;  // Atualiza a posição em x
            ghost.y += (dy / distance) * ghost.speed;  // Atualiza a posição em y
        }

        // Checa se o fantasma chegou ao Levi
        if (ghost.y + ghost.height >= levizao.y && ghost.x < levizao.x + levizao.width) {
            resetarghost();  // Reseta a posição do fantasma
            respostaserradas++;  // Incrementa respostas erradas
            v--;  // Reduz as vidas

            desenhovidas();  // Atualiza as vidas na tela

            if (respostaserradas >= totaldevida) {  // Verifica se as vidas acabaram
                telagameover();  // Chama a tela de "Game Over"
                return;  // Sai do loop para evitar o loop continuo
            }
        }

        // Verifica a pontuação para mudança de fase ou vitória
        if (pontuacao === 5) {
            telafase1();
        } else if (pontuacao === 10) {
            telafase2();
        } else if (pontuacao === 15) {
            telafase3();
        } else if (pontuacao >= 20) {
            telagamewon();
            return;  // Sai do loop para evitar continuação após vitória
        }

    } else {
        // Pause o som e não chame `requestAnimationFrame` aqui
        pauseambientesound();
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
      else if (event.key === "-" && userinput.length === 0) {
        userinput += event.key; // Permite que o usuário insira o sinal negativo 
    } else if (event.key === 'P' || event.key ==='p'){
        pararojogo();
    } else if (event.key == 'R'  || event.key ==='r'){
        voltaraojogo();
    }
});

document.getElementById('play-again').addEventListener('click', function(){
    gameover=false;
    requestAnimationFrame(loopdogame);
    restart();
});

document.getElementById('play-again2').addEventListener('click', function(){
    gameover=false;
    requestAnimationFrame(loopdogame);
    restart();
});
document.getElementById('exit-game').addEventListener('click', function() {
    gameover = true;
    cancelAnimationFrame(loopdojg);
    document.getElementById('game-container').style.display = 'none';
    pauseambientesound();
});
document.getElementById('exit-game2').addEventListener('click', function() {
    gameover = true;
    cancelAnimationFrame(loopdojg);
    document.getElementById('game-container').style.display = 'none';
    pauseambientesound;
});



loopdogame();
