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

/** 
 * Função que sorteia um vencedor aleatório
 * Verifica se a lista tem apenas um item
 * Oculta o botão de sorteio se a lista tiver apenas um item
 * Gera um índice aleatório baseado no tamanho da lista
 * Retorna o índice e o nome sorteado
 * 
 * @param {Array} lista - A lista de nomes a ser sorteada
 * @returns {Object} - Um objeto com o índice e o nome sorteado
 */
export function sortearVencedor(lista) {
  if (lista.length === 1) {
    document.getElementById("sorteioButton").style.display = "none";
  }

  const indiceAleatorio = Math.floor(Math.random() * lista.length);

  const vencedor = lista[indiceAleatorio];
  return { indice: indiceAleatorio, vencedor };
}

/** 
 * Função que realiza o sorteio
 * Desabilita os botões de sorteio e recomeçar
 * Sorteia um vencedor
 * Se não houver vencedor, retorna
 * Obtém o índice e o nome do vencedor
 * Marca o nome do vencedor na lista de nomes
 * Adiciona o vencedor à lista de vencedores
 * Envia o nome do vencedor para o iframe
 * Salva a lista de vencedores no localStorage
 * Atualiza a lista de vencedores no HTML
 * Remove o nome do vencedor da lista principal
 * Atualiza a lista principal no HTML
 * Atualiza o estado dos botões de sorteio e recomeçar
 * */ 
export function realizarSorteio() {
  document.getElementById("sorteioButton").setAttribute("disabled", "true");
  document.getElementById("recomecarButton").setAttribute("disabled", "true");

  const resultado = sortearVencedor(listaObjetos);
  if (!resultado) return;

  const { indice, vencedor } = resultado;
  //const listaHTML = document.getElementById("nameList").children;
  //listaHTML[indice].style.color = "green";

  vencedores.push(vencedor);

  const iframe = document.getElementById("meuIframe");
  if (iframe.contentWindow) {
    iframe.contentWindow.postMessage({ tipo: "removerBolinhas", nome: vencedor.nome }, "*");
  }

  salvarNoLocalStorage("vencedores", vencedores);
  atualizarListaDeVencedoresHTML(vencedores);
  removerNomeDaLista(indice);
  atualizarListaHTML(listaObjetos);
  atualizarEstadoDoBotao(listaObjetos);

  setTimeout(() => {
    document.getElementById("sorteioButton").removeAttribute("disabled");
    document.getElementById("recomecarButton").removeAttribute("disabled");
  }, 3000);
}

/** 
 * Função que reinicia o sorteio
 * Limpa o campo de entrada de nomes
 * Envia uma mensagem para o iframe para reiniciar as bolinhas
 * Reinicia as listas de nomes e vencedores
 * Atualiza a lista de nomes no HTML
 * Atualiza a lista de vencedores no HTML
 * Volta com o input e o botão de processar a lista de nomes
 * Mostra o botão de carregar o último resultado
 * Oculta o botão de sorteio
 * */ 
export function reiniciarSorteio() {
  document.getElementById("nameInput").value = "";
  const iframe = document.getElementById("meuIframe");
  if(iframe.contentWindow){
    iframe.contentWindow.postMessage({ tipo: "reiniciar", }, "*"); // Apagar as bolinhas restantes, se houverem
  }
  reiniciarListas();
  //atualizarListaHTML(listaObjetos);
  //atualizarListaDeVencedoresHTML(vencedores);
  substituirInputEbotao(listaObjetos);
  document.getElementById("carregarButton").style.display = "inline-block";
  document.getElementById("sorteioButton").style.display = "none";
}