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

// Define uma nova lista de nomes
export function definirNovaLista(nomes) {
  const botaoSorteio = document.getElementById("sorteioButton");
  botaoSorteio.style.display = "inline-block";
  botaoSorteio.addEventListener("click", realizarSorteio);
  listaObjetos = nomes;
  //vencedores = []; // Limpa a lista de vencedores
  salvarNoLocalStorage("listaObjetos", listaObjetos);
  //salvarNoLocalStorage("vencedores", vencedores);
}

export function carregarListas() {
  // Carrega os participantes e vencedores do localStorage
  const participantesSalvos = carregarDoLocalStorage("listaObjetos") || [];
  const vencedoresSalvos = carregarDoLocalStorage("vencedores") || [];

  // Verifica se há dados salvos
  if (!participantesSalvos && !vencedoresSalvos) {
    alert(
      "Nenhuma lista de participantes ou vencedores encontrada no localStorage."
    );
    return;
  }

  // Atualiza as listas globais
  listaObjetos.splice(0, listaObjetos.length, ...participantesSalvos);
  vencedores.splice(0, vencedores.length, ...vencedoresSalvos);

  // Atualiza a interface
  atualizarListaHTML(listaObjetos);
  atualizarListaDeVencedoresHTML(vencedores);

  alert("Listas carregadas com sucesso!");
}

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

// Remove um nome da lista principal
export function removerNomeDaLista(indice) {
  listaObjetos.splice(indice, 1);
  salvarNoLocalStorage("listaObjetos", listaObjetos);
  atualizarListaHTML(listaObjetos);
}

// Reinicia completamente as listas
export function reiniciarListas() {
  listaObjetos = [];
  vencedores = [];
  //salvarNoLocalStorage("listaObjetos", listaObjetos);
  //salvarNoLocalStorage("vencedores", vencedores);
  atualizarListaHTML(listaObjetos);
  atualizarListaDeVencedoresHTML(vencedores);
  atualizarEstadoDoBotao(listaObjetos);
}

// Função para carregar as listas do localStorage
