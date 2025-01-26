import {
  salvarNoLocalStorage,
  atualizarListaDeVencedoresHTML,
  substituirInputEbotao,
  atualizarEstadoDoBotao,
  atualizarListaHTML,
} from "./utils.js";
import {
  listaObjetos,
  vencedores,
  reiniciarListas,
  removerNomeDaLista,
} from "./listas.js";

// Função para sortear um vencedor aleatório
export function sortearVencedor(lista) {
  if (lista.length === 1) {
    document.getElementById("sorteioButton").style.display = "none";
  }

  // Gera um índice aleatório baseado no tamanho da lista
  const indiceAleatorio = Math.floor(Math.random() * lista.length);

  // Retorna o índice e o nome sorteado
  const vencedor = lista[indiceAleatorio];
  return { indice: indiceAleatorio, vencedor };
}

export function realizarSorteio() {
  const resultado = sortearVencedor(listaObjetos);
  if (!resultado) return;

  const { indice, vencedor } = resultado;
  const listaHTML = document.getElementById("nameList").children;
  listaHTML[indice].style.color = "green";

  vencedores.push(vencedor);
  salvarNoLocalStorage("vencedores", vencedores);
  atualizarListaDeVencedoresHTML(vencedores);

  removerNomeDaLista(indice);

  atualizarListaHTML(listaObjetos);

  atualizarEstadoDoBotao(listaObjetos);
}

export function reiniciarSorteio() {
  document.getElementById("nameInput").value = "";
  reiniciarListas();
  atualizarListaHTML(listaObjetos);
  atualizarListaDeVencedoresHTML(vencedores);
  substituirInputEbotao(listaObjetos);
}
