# Sorteio Estilo Bingo

## Descrição

Este projeto realiza sorteios estilo bingo, onde você pode inserir uma lista de nomes (separados por vírgula) e sortear aleatoriamente um vencedor por vez. O sistema armazena os participantes e vencedores, além de incluir uma animação para tornar a experiência mais visual.

## Funcionalidades

- Aceita uma lista de nomes separados por vírgulas.
- Realiza sorteios de forma aleatória e evita repetições.
- Exibe uma animação para exibição do vencedor.
- Permite reinicio do sorteio, para diversos sorteios.
- Salva a lista de participantes e vencedores no localStorage.
- Permite carregamento do último sorteio realizado.

## Como Usar

1. **Preparar a lista de nomes**:

   - Insira todos os nomes que participarão do sorteio, separados por vírgulas.
   - Exemplo: `Bruno, Jamile, Maikon, Vinicius`.

2. **Gerar a lista**:

   - Clique no botão "Gerar Lista" para criar uma lista de participantes.
   - Será gerado uma lista com todos os participantes e uma lista de vencedores (inicialmente vazia).

3. **Realizar o sorteio**:

   - Clique no botão "Sortear Vencedor" para selecionar um vencedor aleatório.
   - O nome/número do vencedor aparecerá na animação, sendo removido da lista de participantes e adicionado a lista de vencedores.

4. **Repetir se desejado**:

   - A aplicação permite que mais de um nome seja sorteado.
   - Caso desejado mais um vencedor, clicar no botão "Sortear Vencedor" e um novo nome será sorteado, passando pelo mesmo processo do sorteio.

5. **Reiniciar o Sorteio**

   - Caso todos os nomes sejam sorteados, ou se apenas desejar reiniciar o sorteio, o botão "Começar Novo Sorteio" pode ser clicado.
   - Ao clicar o botão as listas de participantes e vencedores serão apagadas e será possível _Gerar a Lista_ novamente.

6. **Carregar um sorteio salvo**

   - Se desejar, ou se o sorteio tenha sido interrompido, é possível clicar em "Carregar o Último Sorteio" para carregar a lista do último sorteio realizado.

7. **PRECAUÇÕES**
   - A cada vez que uma lista é gerada ou o sorteio reiniciado a lista do último sorteio é atualizada.
   - Se desejar carregar o último sorteio salvo, não gerar novas listas.

## Exemplo de Entrada e Saída

**Entrada:**

```
Digite os nomes separados por vírgulas: Bruno, Jamile, Maikon, Vinicius
```

**Saída:**

```
Sorteio #1: Vinicius
Sorteio #2: Jamile
Sorteio #3: Maikon
Sorteio #4: Bruno
```

## Informações

- Estrutura da página: HTML
- Estilização: CSS
- Linguagem de programação: JavaScript

---

**Divirta-se com o sorteio e boa sorte aos participantes!**
