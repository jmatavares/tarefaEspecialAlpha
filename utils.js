import { listaObjetos } from "./listas.js";

/** 
 * Obtém os nomes do input
 * Divide os nomes por vírgulas e remove os espaços em branco
 * Remove itens vazios
 * Verifica se a lista está vazia após o processamento
 * Retorna a lista de nomes ou null se a lista estiver vazia
 * */ 
export function obterNomesDoInput() {
  const input = document.getElementById("nameInput");
  if (/[.!?;:()'/"\\-]/.test(input.value)) {
    alert("Utilize somente vírgula!");
    return null;
  }
  const nomes = input.value
    .split(",")
    .map((nome) => nome.trim())
    .filter((nome) => nome.length > 0);

  if (nomes.length === 0) {
    alert("Por favor, insira pelo menos um nome válido separado por vírgulas.");
    return null;
  }

  return nomes;
}

/** 
 * Salva a lista no localStorage
 * Tenta salvar os dados no localStorage
 * Se houver um erro, exibe uma mensagem de erro no console
 * 
 * @param {string} chave - A chave do localStorage a ser salva
 * @param {Array} dados - Os dados a serem salvo
 * */ 
export function salvarNoLocalStorage(chave, dados) {
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
  } catch (error) {
    console.error("Erro ao salvar no LocalStorage: ", error);
  }
}

/** 
 * Carrega uma lista do localStorage
 * Tenta obter os dados do localStorage
 * Retorna os dados ou null se não houver dados
 * Se houver um erro, exibe uma mensagem de erro no console
 * 
 * @param {string} chave - A chave do localStorage a ser carregada
 * @returns {Array} - Os dados carregados ou null se não houver dados
 * */ 
export function carregarDoLocalStorage(chave) {
  try {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
  } catch (error) {
    console.error("Erro ao carregar do LocalStorage: ", error);
  }
}

/** 
 * Atualiza a lista principal no HTML
 * Esvazia a lista principal na página
 * Adiciona cada nome à lista com o número e o nome
 * 
 * @param {Array} lista - A lista de nomes a ser atualizada
 * */ 
export function atualizarListaHTML(lista) {
  const listaHTML = document.getElementById("nameList");
  listaHTML.innerHTML = "";

  lista.forEach(({ numero, nome }) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${numero}. ${nome}`;
    listaHTML.appendChild(listItem);
  });
}

/** 
 * Função para atualizar a lista de vencedores no HTML
 * Esvazia a lista de vencedores na página
 * Adiciona cada vencedor à lista com o número e o nome
 * Marca o vencedor com a cor verde
 * 
 * @param {Array} lista - A lista de vencedores a ser atualizada
 * */ 
export function atualizarListaDeVencedoresHTML(lista) {
  const vencedoresHTML = document.getElementById("winnerList");
  vencedoresHTML.innerHTML = "";

  lista.forEach((vencedor, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${index + 1}. ${vencedor.nome}`;
    listItem.style.color = "green";
    vencedoresHTML.appendChild(listItem);
  });
}

/** 
 * Função para atualizar o estado do botão de recomeçar
 * Mostra o botão de recomeçar na página
 * */ 
export function atualizarEstadoDoBotao() {
  const recomeçarButton = document.getElementById("recomecarButton");
  recomeçarButton.style.display = "inline-block";
}

/** 
 * Função para substituir o input e o botão de processar pelo botão de recomeçar
 * Se a lista de nomes não estiver vazia
 * Oculta o input e o botão de processar a lista de nomes
 * Mostra o botão de recomeçar
 * Se a lista de nomes estiver vazia
 * Mostra o input e o botão de processar a lista de nomes
 * Oculta o botão de recomeçar
 * */ 
export function substituirInputEbotao() {
  const inputContainer = document.getElementById("inputContainer");
  const input = document.getElementById("nameInput");
  const processButton = document.getElementById("processButton");
  const recomeçarButton = document.getElementById("recomecarButton");
  if (listaObjetos.length > 0) {
    document.getElementById("instruction").innerHTML = "";
    input.style.display = "none";
    processButton.style.display = "none";
    recomeçarButton.style.display = "none";
    inputContainer.appendChild(recomeçarButton);
  } else {
    document.getElementById("instruction").innerHTML = "Insira os nomes separados por vírgula";
    document.getElementById("instruction").style.display = "inline-block";
    input.style.display = "inline-block";
    processButton.style.display = "inline-block";
    recomeçarButton.style.display = "none";
  }
}