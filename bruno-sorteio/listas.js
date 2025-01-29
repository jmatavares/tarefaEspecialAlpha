import { realizarSorteio } from "./sorteio.js";
import {
  salvarNoLocalStorage,
  carregarDoLocalStorage,
  atualizarListaHTML,
  atualizarListaDeVencedoresHTML,
  atualizarEstadoDoBotao,
  obterNomesDoInput,
  substituirInputEbotao,
} from "./utils.js";

export let listaObjetos = []; // Lista principal
export let vencedores = []; // Lista de vencedores

/** 
 * Função para definir uma nova lista de nomes
 * Mostra o botão de sorteio
 * Adiciona um evento de clique ao botão de sorteio
 * A listaObjetos é atualizada com a nova lista de nomes
 * A nova lista é salva no localStorage
 * 
 * @param {Array} nomes - A lista de nomes a ser definida
 * */ 
export function definirNovaLista(nomes) {
  const botaoSorteio = document.getElementById("sorteioButton");
  botaoSorteio.style.display = "inline-block";
  botaoSorteio.addEventListener("click", realizarSorteio);
  listaObjetos = nomes;
  salvarNoLocalStorage("listaObjetos", listaObjetos);
}

/** 
 * Função para carregar as listas do localStorage
 * Carrega os participantes e vencedores do localStorage
 * Verifica se há dados salvos
 * Se não houver dados, exibe uma mensagem de erro
 * Atualiza as listas globais
 * Atualiza a interface
 * */ 
export function carregarListas() {
  const participantesSalvos = carregarDoLocalStorage("listaObjetos") || [];
  const vencedoresSalvos = carregarDoLocalStorage("vencedores") || [];

  if (!participantesSalvos && !vencedoresSalvos) {
    alert(
      "Nenhuma lista de participantes ou vencedores encontrada no localStorage."
    );
    return;
  }

  listaObjetos.splice(0, listaObjetos.length, ...participantesSalvos);
  vencedores.splice(0, vencedores.length, ...vencedoresSalvos);

  atualizarListaHTML(listaObjetos);
  atualizarListaDeVencedoresHTML(vencedores);

  alert("Listas carregadas com sucesso!");
}

/** 
 * Filtra os nomes do input e gera a lista de nomes para o sorteio
 * Mapeia os nomes para criar um objeto com o número e o nome
 * Oculta o botão de carregar e envia a quantidade de bolinhas para o iframe
 * Define a nova lista de nomes
 * */ 
export function processarNomes() {
  const nomesFiltrados = obterNomesDoInput();
  if (!nomesFiltrados) {
    return null;
  }
  const novaLista = nomesFiltrados.map((nome, index) => ({
    numero: index + 1,
    nome: nome,
  }));
  document.getElementById("carregarButton").style.display = "none";
  const iframe = document.getElementById("meuIframe");
  if (iframe.contentWindow) {
    iframe.contentWindow.postMessage({ tipo: "gerarBolinhas", quantidade: novaLista.length }, "*"); // Envia a quantidade de bolinhas para o iframe
  }
  definirNovaLista(novaLista);
  atualizarListaHTML(listaObjetos);
  //atualizarListaDeVencedoresHTML(vencedores);
  substituirInputEbotao();
}

// Remove um nome da lista principal //JAMILE
//export function removerNomeDaLista(indice) {
//  listaObjetos.splice(indice, 1);
//  salvarNoLocalStorage("listaObjetos", listaObjetos);
//  atualizarListaHTML(listaObjetos);
//}

/** 
 * Função para remover um nome da lista principal
 * Armazena o nome antes de remover
 * Remove o objeto da lista
 * Salva a lista atualizada no localStorage
 * Atualiza a lista no HTML
 * Retorna o nome removido
 * 
 * @param {number} indice - O índice do nome a ser removido
 * @returns {string} - O nome removido
 * */ 
export function removerNomeDaLista(indice) {
  const nomeRemovido = listaObjetos[indice].nome;
  listaObjetos.splice(indice, 1);
  salvarNoLocalStorage("listaObjetos", listaObjetos);
  atualizarListaHTML(listaObjetos);
  return nomeRemovido;
}


/** 
 * Função para reiniciar completamente as listas
 * Esvazia as listas de nomes e vencedores
 * Atualiza a lista de nomes no HTML
 * Atualiza a lista de vencedores no HTML
 * Atualiza o estado do botão de recomeçar
 * */ 
export function reiniciarListas() {
  listaObjetos = [];
  vencedores = [];
  //salvarNoLocalStorage("listaObjetos", listaObjetos);
  //salvarNoLocalStorage("vencedores", vencedores);
  atualizarListaHTML(listaObjetos);
  atualizarListaDeVencedoresHTML(vencedores);
  atualizarEstadoDoBotao(listaObjetos);
}