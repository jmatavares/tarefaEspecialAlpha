const svg = document.getElementById("animationBox");

const centerX = 150 + 17.876995; // Centro do círculo maior
const centerY = 150; // Centro do círculo maior
const radius = 135; // Raio do círculo maior menos o raio das bolinhas

/**
 * Gera uma cor aleatória
 * @returns {string} - A cor gerada
 */
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Gera uma posição aleatória dentro do círculo maior
 * @returns {Object} - Um objeto com as coordenadas x e y
 */
function getRandomPosition() {
    let angle = Math.random() * 2 * Math.PI;
    let r = Math.sqrt(Math.random()) * radius;
    return {
        x: centerX + r * Math.cos(angle),
        y: centerY + r * Math.sin(angle)
    };
}

/**
 * Cria uma bolinha
 * @returns {Element} - A bolinha criada
 */
function createBall() {
    const position = getRandomPosition();
    const ball = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    ball.setAttribute("cx", position.x);
    ball.setAttribute("cy", position.y);
    ball.setAttribute("r", 15);
    ball.setAttribute("fill", getRandomColor());
    return ball;
}

/**
 * Move uma bolinha para uma nova posição
 * @param {Element} ball - A bolinha a ser movida
 */
function moveBall(ball) {
    const position = getRandomPosition();
    ball.setAttribute("cx", position.x);
    ball.setAttribute("cy", position.y);
}

/**
 * Move todas as bolinhas
 */
function moveAllBalls() {
    const balls = svg.querySelectorAll("circle.small-ball");
    balls.forEach(ball => moveBall(ball));
}


/**
 * Gera bolinhas
 * Inicia a animação
 * @param {number} quant - Quantidade de bolinhas a serem geradas
 */
function generateBalls(quant) {

    for (let i = 0; i < quant; i++) {
        const ball = createBall();
        ball.classList.add("small-ball");
        svg.appendChild(ball);
    }

    setInterval(moveAllBalls, 100); /*time interval*/
};

/**
 * Recebe mensagens do sorteio
 * 
 * @param {Event} event - Evento de mensagem
 */
window.addEventListener("message", (event) => {
    
    // A mensagem para gerar bolinhas
    const { tipo, quantidade } = event.data;
    if (tipo === "gerarBolinhas") {
        generateBalls(quantidade);
    }

    /**
     * Se o tipo for removerBolinhas, então:
     * Remove uma bolinha
     * Pega a cor da bolinha removida
     * Remove a bolinha
     * Exibe o #resultadoBolinha com animação reiniciada e valores dinâmicos
     * Pega o nome associado à bolinha removida
     * Reinicia as animações
     * Torna a bolinha escolhida visível
     * Oculta novamente após 3 segundos
     */
    if (tipo === "removerBolinhas") {
       const ballToRemove = document.querySelector("circle.small-ball");

       if (ballToRemove) {
           const corRemovida = ballToRemove.getAttribute("fill");

           ballToRemove.remove();

           const resultadoBolinha = document.getElementById("resultadoBolinha");
           const animatedCircle = document.getElementById("animatedCircle");
           const circleText = document.getElementById("circleText");

           animatedCircle.setAttribute("fill", corRemovida); 
           circleText.firstChild.textContent = event.data.nome;

           animatedCircle.setAttribute("r", "10"); // Resetar raio inicial
           const circleAnimation = animatedCircle.querySelector("animate");
           circleAnimation.beginElement(); // Reiniciar animação da bolinha

           const textAnimation = circleText.querySelector("animate");
           textAnimation.beginElement(); // Reiniciar animação do texto

           resultadoBolinha.style.display = "block";
           resultadoBolinha.style.zIndex = "2";

           setTimeout(() => {
               resultadoBolinha.style.display = "none";
           }, 3000);
       }
    }

    // Remove todas as bolinhas restantes para reiniciar o sorteio
    if (tipo === "reiniciar") {
        document.querySelectorAll("circle.small-ball").forEach(ball => ball.remove());
    }
});