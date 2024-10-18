const levi = document.querySelector('.levi');
const enemie = document.querySelector('.enemie');
const enemyText = document.getElementById('enemy-text'); // Selecione o texto
const exibirpontuacao = document.getElementById('pontuacao'); // chama a pontuação do html (placar)
const exibirvidas = document.getElementById('vidas'); // vidas do usuário (corações no canto superior esquerdo)
const vidas = 5
let gameover = false


function animacao () {
    setInterval(() => {
        const enemiePosition = enemie.offsetLeft;
        const leviPosition = levi.offsetLeft;
        if (enemiePosition <= leviPosition && levi.src.endsWith('.gif')) {        
            levi.src = 'imagens/estatico.png'; 
            /*Colocar vidas-- e tela de gameover pra condição */
            setTimeout(() => {
                levi.src = 'imagens/levi1.gif';
            }, 2000);     /*1350*/   
        }
    }, 0); /*500*/
} 

function acomp_texto (){
    setInterval (() => {
        const enemiePosition = enemie.offsetLeft;
        enemyText.style.left = (enemiePosition + 100) + 'px';
        enemyText.style.top = (enemie.offsetTop - 20) + 'px'; 
    }, 0);
}

function input() {
    const inputField = document.getElementById('inputField');
    inputField.focus();
}

function checarresposta () {
    if (inputField.value === numbers.right_answer) { /*Comparação está errada, um é str e o outro int*/
        sequen++;
        score++;
        /* Animação restart e restart do tempo de numbers, SÓ do tempo*/    
        animacao();    
        if (sequen === 10) {
            vidas ++;
            sequen = 0;
        }
    } else {
        vidas --;
        sequen = 0;
            if (vidas <= 0) {
                /*game over*/
                document.getElementById('gameOverScreen').style.display = 'flex' /************************************/
            }
        
    }
}

function numbers() {
    acomp_texto ();
    let count = 0;
    const num1 = Math.floor(Math.random() * 11);
    const num2 = Math.floor(Math.random() * 11);
    const conta = num1 + ' + ' + num2;
    document.getElementById("enemy-text").innerText = conta;
    const right_answer = num1 + num2;
    
    setInterval(() => {
        count++;
        if (count < 2) {
            const num1 = Math.floor(Math.random() * 11);
            const num2 = Math.floor(Math.random() * 11);
            const conta = num1 + ' + ' + num2;
            document.getElementById("enemy-text").innerText = conta;
            const right_answer = num1 + num2;
            return right_answer;
        }
        else if (count < 4) {
            const num1 = Math.floor(Math.random() * 11);
            const num2 = Math.floor(Math.random() * 11);
            const conta = num1 + ' - ' + num2;
            document.getElementById("enemy-text").innerText = conta;
            const right_answer = num1 - num2;
            return right_answer;
        }
        else if (count < 6) {
            const num1 = Math.floor(Math.random() * 11);
            const num2 = Math.floor(Math.random() * 11);
            const conta = num1 + ' x ' + num2;
            document.getElementById("enemy-text").innerText = conta;
            const right_answer = num1 * num2;
            return right_answer;
        }
        else if (count < 8) {
            const num1 = Math.floor(Math.random() * 11);
            const num2 = Math.floor(Math.random() * 11) + 1;
            const conta = num1*num2 + ' ÷ ' + num2;
            document.getElementById("enemy-text").innerText = conta;
            const right_answer = num1;
            return right_answer;
        }
        /*Tela de vitória */
        }, 6000);
}

animacao ();
numbers ();
document.addEventListener('keydown', function(event) {
    acomp_texto ();
    window.onload = input ();
    if (event.key === 'Enter') {
        levi.src = 'imagens/levi1.gif';
        inputField.value = '';
        checarresposta ();        
    } 
    else if (!isNaN(event.key)) { 
        if (levi.src.endsWith('levi1.gif')) {
            levi.src = 'imagens/leviataque.gif'; 
        }
    } 

});



    







