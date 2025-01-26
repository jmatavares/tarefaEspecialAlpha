import { listaObjetos } from "./listas.js";

// Obtém os nomes do input e transforma em array
export function obterNomesDoInput() {
  const input = document.getElementById("nameInput");

  // Divide os nomes por vírgulas e remove espaços em branco
  const nomes = input.value
    .split(",")
    .map((nome) => nome.trim()) // Remove espaços ao redor de cada nome
    .filter((nome) => nome.length > 0); // Remove itens vazios

  // Verifica se a lista está vazia após o processamento
  if (nomes.length === 0) {
    alert("Por favor, insira pelo menos um nome válido separado por vírgulas.");
    return null; // Retorna uma lista vazia e impede a continuação
  }

  return nomes; // Retorna os nomes válidos
}

// Salva a lista no localStorage
export function salvarNoLocalStorage(chave, dados) {
  try {
    localStorage.setItem(chave, JSON.stringify(dados));
  } catch (error) {
    console.error("Erro ao salvar no LocalStorage: ", error);
  }
}

// Carrega uma lista do localStorage
export function carregarDoLocalStorage(chave) {
  try {
    const dados = localStorage.getItem(chave);
    return dados ? JSON.parse(dados) : null;
  } catch (error) {
    console.error("Erro ao carregar do LocalStorage: ", error);
  }
}

// Atualiza a lista principal no HTML
export function atualizarListaHTML(lista) {
  const listaHTML = document.getElementById("nameList");
  listaHTML.innerHTML = "";

  lista.forEach(({ numero, nome }) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${numero}. ${nome}`;
    listaHTML.appendChild(listItem);
  });
}

// Atualiza a lista de vencedores no HTML
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

export function atualizarEstadoDoBotao(listaObjetos) {
  const recomeçarButton = document.getElementById("recomecarButton");
  recomeçarButton.style.display = "inline-block";
}

export function substituirInputEbotao() {
  const inputContainer = document.getElementById("inputContainer");
  const input = document.getElementById("nameInput");
  const processButton = document.getElementById("processButton");
  const recomeçarButton = document.getElementById("recomecarButton");
  if (listaObjetos.length > 0) {
    input.style.display = "none";
    processButton.style.display = "none";
    recomeçarButton.style.display = "inline-block";
    inputContainer.appendChild(recomeçarButton);
  } else {
    input.style.display = "inline-block";
    processButton.style.display = "inline-block";
    recomeçarButton.style.display = "none";
  }
}
