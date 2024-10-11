const levi = document.querySelector('.levi');
const enemie = document.querySelector('.enemie');

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        levi.src = 'imagens/levi1.gif';
    } else if (!isNaN(event.key)) { 
        if (levi.src.endsWith('levi1.gif' || 'levidano.gif')) {
            levi.src = 'imagens/leviataque.gif'; 

            }
        } 
});



const loop = setInterval(() => { /*Criar uma função com isso, já que vai repetir 4 vezes no código*/
        
    const enemiePosition = enemie.offsetLeft;
    if (enemiePosition <= 70) {        
        levi.src = 'imagens/levidano.gif'; /*TimeOut or Usar dois gifs, um com uma animação de 900ms, if levi.style.animation === 'none', troca pro outro gif*/
    }

    


}, 10);


/*enemie.style.animation = 'none' para quando for game over*/

