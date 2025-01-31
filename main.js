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
  const processButton = document.getElementById("processButton");

  const processar = () => {
    if (!processButton.disabled) {
      processarNomes();
      processButton.disabled = true; // Desativa o botão
    }
  };

  processButton.addEventListener("click", processar);

  document.getElementById("recomecarButton").addEventListener("click", () => {
    reiniciarSorteio();
    processButton.disabled = false;
  });

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

  // Pressionar Enter ativa o processButton (se não estiver desativado)
  document.addEventListener("keypress", (event) => {
    processButton.click();
    event.preventDefault();
  });
});
