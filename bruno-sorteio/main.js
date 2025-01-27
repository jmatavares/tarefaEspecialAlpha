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
