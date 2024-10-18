const canvas = document.getElementById('gameCanvas'); // chama a id do canvas do html
const ctx = canvas.getContext('2d'); // contexto 2d do canvas, permite criar formas, imagens e textos. ctx é abreviação de context e é usado para desenhar no canvas

// elementos de interface abaixo
const exibirpontuacao = document.getElementById('pontuacao'); // chama a pontuação do html (placar)
const exibirvidas = document.getElementById('vidas'); // vidas do usuário (corações no canto superior esquerdo)
const exibirgameover = document.getElementById('game_over'); // tela de game over
const exibirfase1  = document.getElementById('fase1');
//const exibirfase2  = document.getElementById('fase2');
//const exibirfase3  = document.getElementById('fase3');
const levigif = new Image ();
levigif.src='imagens/levi1.gif'



canvas.width = 800;
canvas.height = 600; // configurações do tamanho da tela que vai rodar o jogo

// abaixoo encontram-se as *variáveis de estado*(variável que mantém informações sobre a condição atual do jogo, como ele ainda não começou, tudo é false/0/vazio, exceto a quantidade de vidas)
let pontuacao = 0; // placar(pontuação)
let respostaserradas = 0; // contador de respostas erradas 
let gameover = false; 
let fase1= false;
//let fase2= false;
//let fase3= false;
let loopdojg; // chama o loop do jogo
let userinput = ""; // entrada do usuário
let totaldevida = 5; // total de vidas

const levizao = { // chamando a variável do levi e configurando ela
    x: canvas.width / 10,
    y: canvas.height - 220,
    width: 150,
    height: 200,
    img: levigif
};



const ghost = { // mesma coisa com o fantasma
    x: 800,
    y: 140,
    width: 80,
    height: 80,
    speed: 1,
    img: new Image(),
};
ghost.img.src = 'imagens/ghost.png'; // chamando a img do fantasma

let contademat={
    num1:0,
    num2:0,
    respostacerta:0,
    operacao:""
};

function contas(){
    if (pontuacao <= 5) {
        contademat.num1 = Math.floor(Math.random() * 11);
        contademat.num2 = Math.floor(Math.random() * 11);
        contademat.respostacerta = contademat.num1 + contademat.num2;
        contademat.operacao ='+'
        
    } else if (pontuacao > 5 && pontuacao <= 10) {
        contademat.num1 = Math.floor(Math.random() * 11);
        contademat.num2 = Math.floor(Math.random() * 11);
        contademat.respostacerta = contademat.num1 - contademat.num2;
        contademat.operacao="-"
    } else if (pontuacao > 10 && pontuacao <= 15) {
        contademat.num1 = Math.floor(Math.random() * 11);
        contademat.num2 = Math.floor(Math.random() * 11);
        contademat.respostacerta = contademat.num1 * contademat.num2;
        contademat.operacao="x"
    } else if (pontuacao > 15) {
        do {
            contademat.num2 = Math.floor(Math.random() * 10) + 1; // Denominador não pode ser zero
            contademat.num1 = contademat.num2 * Math.floor(Math.random() * 10); // Garante que o numerador seja divisível pelo denominador
        } while (contademat.num2 === 0); // Evita divisão por zero
        contademat.respostacerta = contademat.num1 / contademat.num2;
        contademat.operacao=":"
    }
    
}



function desenholevi() {  // função para desenhar o levi
    ctx.drawImage(levigif, levizao.x, levizao.y, levizao.width, levizao.height);
}

function desenhoghost() { // função para desenhar o fantasma e configurar a conta p aparecer acima dele
    ctx.drawImage(ghost.img, ghost.x, ghost.y, ghost.width, ghost.height);
    ctx.fillStyle = "white";
    ctx.font = "15px 'Press Start 2P'";
    ctx.fillText(`${contademat.num1} ${contademat.operacao} ${contademat.num2} = ?`, ghost.x + 10, ghost.y - 10);
}

function desenhopontuacao() { // função pra desenhar a pontuação do usuário
    exibirpontuacao.textContent = `Pontuação: ${pontuacao}`;
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
    ctx.fillStyle = "black"; 
    ctx.font = "15px 'Press Start 2P'"; 
    ctx.fillText(`Sua resposta: ${userinput}`, canvas.width / 2 - 100, 550); 
}


function resetarghost() { // função para resetar o ghost quando necessário
    const lado = Math.random() *(1-0.5)+0.5; 
       // ghost.x = Math.random() * canvas.width;
        //ghost.y = -canvas.height; 
        ghost.x = canvas.width; // Pode começar em qualquer ponto no eixo x
        ghost.y = Math.random() *  canvas.height;

    // novo problema matemático
    contas()
    
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

function telafase1() {
    fase1 = true;
    exibirfase1.classList.remove('hidden');
    setTimeout(() => {
        telafase1 = false;
        exibirfase1.classList.add('hidden');
    }, 2000);

}

//function telafase2() {
   // fase2 = true;
   // exibirfase2.classList.remove('hidden');
   // setTimeout(() => {
       // telafase2 = false;
      //  exibirfase2.classList.add('hidden');
  //  }, 2000);

//}

//function telafase3() {
    //fase3 = true;
    //exibirfase3.classList.remove('hidden');
    //setTimeout(() => {
        // = false;
        //exibirfase3.classList.add('hidden');
    //}, 2000);

//}
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
    exibirgameover.classList.remove('hidden');
    document.getElementById('pontuacao').style.display = 'none';
    document.getElementById('vidas').style.display = 'none';
}

function restart() { // reinicia o jogo
    pontuacao = 0;
    respostaserradas = 0;
    v=totaldevida;
    gameover = false;
    exibirgameover.classList.add('hidden');
    document.getElementById('pontuacao').style.display = 'block';
    document.getElementById('vidas').style.display = 'block';
    resetarghost();
    desenhopontuacao();
    desenhovidas();
    loopdogame();
}


contas();

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
            v--;
            desenhovidas()
            if (respostaserradas >= totaldevida) { // Verifica se as vidas acabaram
                telagameover();
            }
        }
        if(pontuacao===2){
            telafase1()
        }


    } else {
        loopdojg = requestAnimationFrame(loopdogame);
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
    }
});

document.getElementById('play-again').addEventListener('click', restart); // Reinicia o jogo quando clica em "Play Again"
document.getElementById('exit-game').addEventListener('click', function() {
    gameover = true;
    cancelAnimationFrame(loopdojg);
    document.getElementById('game-container').style.display = 'none';
});

loopdogame();
