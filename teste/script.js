const levi = document.querySelector('.levi');
const enemie = document.querySelector('.enemie');
const enemyText = document.getElementById('enemy-text'); // Selecione o texto
const vidas = 5;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        levi.src = 'imagens/levi1.gif';
    } else if (!isNaN(event.key)) { 
        if (levi.src.endsWith('levi1.gif') || levi.src.endsWith('levidano.gif')) {
            levi.src = 'imagens/leviataque.gif'; 
        }
    }
});

const loop = setInterval(() => {
    const enemiePosition = enemie.offsetLeft;
    const leviPosition = levi.offsetLeft;
    enemyText.style.left = (enemiePosition + 100) + 'px';
    enemyText.style.top = (enemie.offsetTop - 20) + 'px'; // Ajusta a posição do texto

       
    if (enemiePosition <= leviPosition) {        
        levi.src = 'imagens/estatico.png'; 
        setTimeout(() => {
            levi.src = 'imagens/levi1.gif';
        }, 2000);     /*1350*/   
    }
}, 0); /*500*/






