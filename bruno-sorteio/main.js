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
    carregarListas();
    atualizarListaHTML(listaObjetos);
    atualizarListaDeVencedoresHTML(vencedores);
    atualizarEstadoDoBotao(listaObjetos);
  });
});
