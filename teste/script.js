const levi = document.querySelector('.levi');
const enemie = document.querySelector('.enemie');
const vidas = 5;

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        levi.src = 'imagens/levi1.gif';
    } else if (!isNaN(event.key)) { 
        if (levi.src.endsWith('levi1.gif' || 'levidano.gif')) {
            levi.src = 'imagens/leviataque.gif'; 

            }
        } 
});

const loop = setInterval(() => {
        
    const enemiePosition = enemie.offsetLeft;
    const leviPosition = levi.offsetLeft
    if (enemiePosition <= leviPosition) {        
        levi.src = 'imagens/estatico.png'; 
        setTimeout(() => {
            levi.src = 'imagens/levi1.gif';
        }, 1350);        
    }
}, 500);







