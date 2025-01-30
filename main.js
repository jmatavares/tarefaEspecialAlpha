import {
  atualizarListaHTML,
  atualizarListaDeVencedoresHTML,
  atualizarEstadoDoBotao,
} from "./utils.js";
import {
  processarNomes,
  carregarListas,
  listaObjetos,
  vencedores,
} from "./listas.js";
import { realizarSorteio, reiniciarSorteio } from "./sorteio.js";

// Garante que os eventos só sejam adicionados após o DOM estar carregado
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("processButton")
    .addEventListener("click", processarNomes);
  document
    .getElementById("recomecarButton")
    .addEventListener("click", reiniciarSorteio);
  document.getElementById("carregarButton").addEventListener("click", () => {
    localStorage.removeItem("listaObjetos");
    document.getElementById("nameInput").style.display = "none";
    document.getElementById("processButton").style.display = "none";
    document.getElementById("instruction").style.display = "none";
    carregarListas();
    atualizarListaHTML(listaObjetos);
    atualizarListaDeVencedoresHTML(vencedores);
    atualizarEstadoDoBotao();
  });
});

// Aguarda até que todo o HTML seja carregado antes de executar o código
document.addEventListener("DOMContentLoaded", function () {

  // Função para criar as bolinhas dentro do contêiner especificado
  function criarBolinhas(containerClass) {
    const container = document.querySelector(containerClass); // Seleciona o contêiner
    
    for (let i = 0; i < 25; i++) { // Cria 10 bolinhas
        let bolinha = document.createElement("div"); // Cria uma bolinha
        bolinha.classList.add("bolinha"); // Adiciona a classe de estilo
        
        let numero = document.createElement("span"); // Cria um <span> para o número
        numero.textContent = Math.floor(Math.random() * 99) + 1; // Gera um número aleatório
        bolinha.appendChild(numero); // Adiciona o número dentro da bolinha
        
        container.appendChild(bolinha); // Adiciona a bolinha ao contêiner
    }
}

criarBolinhas(".bolinhas-topo"); // Cria as bolinhas no topo
criarBolinhas(".bolinhas-base"); // Cria as bolinhas na base
});