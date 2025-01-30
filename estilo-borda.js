// Função responsável por criar as bolinhas dentro do contêiner especificado
function criarBolinhas(containerClass) {
  const container = document.querySelector(containerClass); // Seleciona o contêiner onde as bolinhas serão inseridas

  container.innerHTML = ""; // Remove qualquer bolinha existente para evitar duplicação ao redimensionar a tela

  // Obtém a largura total da janela do navegador
  const larguraTela = window.innerWidth;

  // Define o tamanho aproximado de cada bolinha (incluindo espaçamento)
  const tamanhoBolinha = 60; // Considera 50px de bolinha + margem entre elas

  // Calcula quantas bolinhas cabem em uma única linha dentro da largura da tela
  const quantidadeBolinhas = Math.floor(larguraTela / tamanhoBolinha) - 1;

  // Loop para criar a quantidade exata de bolinhas
  for (let i = 0; i < quantidadeBolinhas; i++) {
    let bolinha = document.createElement("div"); // Cria um elemento <div> para a bolinha
    bolinha.classList.add("bolinha"); // Adiciona a classe CSS que estiliza a bolinha

    let numero = document.createElement("span"); // Cria um <span> para conter o número dentro da bolinha
    numero.textContent = Math.floor(Math.random() * 99) + 1; // Gera um número aleatório entre 1 e 99

    bolinha.appendChild(numero); // Insere o número dentro da bolinha
    container.appendChild(bolinha); // Adiciona a bolinha ao contêiner correto
  }
}

// Aguarda até que o DOM seja carregado para executar a função
document.addEventListener("DOMContentLoaded", function () {
  // Criar bolinhas no carregamento inicial da página
  criarBolinhas(".bolinhas-topo"); // Cria a linha de bolinhas na parte superior
  criarBolinhas(".bolinhas-base"); // Cria a linha de bolinhas na parte inferior
});

// Adiciona um evento que escuta mudanças no tamanho da tela
window.addEventListener("resize", () => {
  criarBolinhas(".bolinhas-topo"); // Atualiza as bolinhas do topo quando a tela for redimensionada
  criarBolinhas(".bolinhas-base"); // Atualiza as bolinhas da base quando a tela for redimensionada
});
