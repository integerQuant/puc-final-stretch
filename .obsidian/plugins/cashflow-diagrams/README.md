# Cash Flow Diagrams

Plugin local do vault para representar fluxos de caixa segundo a convenção de matemática financeira: períodos no eixo horizontal, entradas para cima e saídas para baixo.

## Uso

Crie um bloco `cashflow`. Cada fluxo ocupa uma linha no formato `período | valor | descrição opcional`.

````markdown
```cashflow
unidade: R$
eixo: períodos
legenda: Investimento inicial e recebimentos mensais.
0 | -1000 | investimento
1 | 300 | recebimento
2 | 400 | recebimento
3 | 500 | recebimento
```
````

- valores positivos produzem setas para cima;
- valores negativos produzem setas para baixo;
- o tamanho da seta acompanha o módulo do valor;
- períodos numéricos são espaçados proporcionalmente;
- `unidade`, `eixo`, `legenda` e a descrição de cada fluxo são opcionais;
- vírgula ou ponto podem ser usados como separador decimal.

O gráfico é um SVG responsivo, acompanha as cores do tema e permanece legível na impressão. Depois de atualizar os arquivos do vault, recarregue o Obsidian e confirme que **Cash Flow Diagrams** está ativo em **Configurações → Plugins comunitários**.
