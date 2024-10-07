const levi = document.querySelector('.levi');
const inimigo = document.querySelector('.inimigo');

const loop = setInterval(() => {

    const inimigoPosition = inimigo.offsetleft;

    if (inimigoPosition = 510) {
        
        inimigo.style.Animation = 'none'
        inimigo.style.left = '${inimigoPosition}px';
    }

}, 10);