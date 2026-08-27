---
tipo: aula enriquecida
disciplina: Decisão em Finanças e Introdução à Análise de Risco
professor: Marcel Guedes Leite
semestre: 2026.2
aula: 4
data: 2026-08-25
origem: "[[01 - Matérias/Decisão em Finanças e Introdução à Análise de Risco/Anotações RAW/2026-08-25 - Fundamentos de Matemática Financeira]]"
obras:
  - Matemática Comercial e Financeira — Fabiano Porto de Aguiar
  - Matemática Financeira, volume 1 — Haroldo da Costa Belo
status: enriquecida
tags:
  - aula
  - financas
  - matematica-financeira
  - fluxo-de-caixa
  - taxas-de-juros
---

# Fluxo de caixa, valor do dinheiro e taxas de juros

## Síntese da aula

A aula conectou quatro fundamentos: representação temporal dos fluxos de caixa, comparação entre valor presente e valor futuro, distinção entre taxas nominais e efetivas e convenções de contagem de dias. A regra operacional que une os temas é simples: **taxa e prazo precisam estar expressos no mesmo período antes de qualquer cálculo**.

## Desenvolvimento

### Fluxo de caixa

Um fluxo de caixa registra entradas e saídas de dinheiro e o instante em que cada uma ocorre. Adotando o ponto de vista de quem investe, desembolsos são negativos e recebimentos são positivos. Na representação convencional, entradas aparecem acima do eixo do tempo e saídas abaixo dele. Essa convenção também é usada nas funções financeiras do Excel. [Belo, 2010, pp. 24–25](https://canal.cecierj.edu.br/012016/e956f650049a7287968ee68ff830d284.pdf); [Microsoft — função VF](https://support.microsoft.com/pt-br/excel/functions/fv-function).

Exemplo: investimento inicial de R$ 1.000,00 seguido de três recebimentos.

```cashflow
unidade: R$
eixo: períodos
legenda: Investimento inicial de R$ 1.000,00 e três recebimentos mensais.
0 | -1000
1 | 300
2 | 400
3 | 500
```

O diagrama não diz, sozinho, se o investimento é bom. Para comparar os valores, todos os fluxos devem ser levados a uma mesma data por uma taxa de juros adequada.

### Valor presente e valor futuro

Em juros compostos, um valor presente $VP$ levado por $n$ períodos à taxa $i$ produz:

$$
VF = VP(1+i)^n
$$

O caminho inverso desconta um valor futuro para hoje:

$$
VP = \frac{VF}{(1+i)^n}
$$

As funções `VF` e `VP` do Excel exigem que a taxa e o número de períodos sejam coerentes: taxa mensal com quantidade de meses, taxa anual com quantidade de anos. [Microsoft — função VF](https://support.microsoft.com/pt-br/excel/functions/fv-function); [Microsoft — função VP](https://support.microsoft.com/pt-br/excel/functions/pv-function).

#### Exemplo direto

Aplicação de R$ 1.000,00 por três meses a 2% ao mês:

$$
VF = 1.000(1+0{,}02)^3 = R\$\ 1.061{,}21
$$

No Excel em português:

```excel
=VF(2%;3;0;-1000;0)
```

Para descobrir quanto precisa ser aplicado hoje para obter R$ 1.061,21 em três meses:

```excel
=VP(2%;3;0;-1061,21;0)
```

O sinal negativo representa o desembolso; o positivo representa o recebimento. Trocar o ponto de vista troca os sinais, mas não a equivalência financeira.

### Taxa nominal e taxa efetiva

A distinção técnica depende da periodicidade de capitalização:

| Taxa | Critério | Exemplo |
|---|---|---|
| Efetiva | O período da taxa coincide com o período de capitalização. | 2% ao mês, capitalizados mensalmente. |
| Nominal | O período de referência da taxa não coincide com o período de capitalização. | 24% ao ano, capitalizados mensalmente. |

Essa definição e a conversão correspondente aparecem em material didático do IFCE/UAB: a taxa efetiva coincide com o período de capitalização; a nominal precisa ser desdobrada até a taxa do período de capitalização. [Aguiar, 2011, pp. 23–25](https://educapes.capes.gov.br/bitstream/capes/429283/2/Matem_Finan.pdf).

#### Exemplo: 24% a.a. nominais, capitalizados mensalmente

A taxa efetiva mensal é proporcionalmente:

$$
i_m = \frac{24\%}{12}=2\%\ a.m.
$$

A taxa efetiva anual é:

$$
i_a=(1+0{,}02)^{12}-1=26{,}8242\%\ a.a.
$$

No Excel:

```excel
=EFETIVA(24%;12)
```

A função `EFETIVA` retorna a taxa anual efetiva a partir da taxa anual nominal e do número de capitalizações no ano. [Microsoft — função EFETIVA](https://support.microsoft.com/pt-BR/Excel/functions/effect-function).

### Da taxa diária para a mensal

A relação anotada em aula,

$$
i_{a.d.}\times 30=i_{a.m.}\;(\text{nominal}),
$$

é uma conversão **proporcional**, adequada para expressar uma taxa mensal nominal a partir de uma taxa diária. Se houver capitalização composta diária, a taxa mensal efetiva é:

$$
i_{a.m.,efetiva}=(1+i_{a.d.})^{30}-1
$$

Exemplo com 0,1% ao dia:

- taxa mensal nominal: $0{,}1\%\times30=3\%$;
- taxa mensal efetiva: $(1+0{,}001)^{30}-1=3{,}0439\%$.

No Excel:

```excel
=0,1%*30
=(1+0,1%)^30-1
```

### Juros comerciais e juros exatos

Em juros simples, a contagem pode usar uma base $B$:

$$
J=C\times i_a\times\frac{d}{B}
$$

Na convenção exata, usa-se o ano civil de 365 dias — ou 366 em ano bissexto. Na convenção comercial, usa-se o ano de 360 dias, normalmente associado a meses de 30 dias. [Belo, 2010, pp. 25–26](https://canal.cecierj.edu.br/012016/e956f650049a7287968ee68ff830d284.pdf).

#### Exemplo direto

Capital de R$ 10.000,00, taxa simples de 18% ao ano e prazo de 45 dias:

| Base | Cálculo | Juros |
|---|---|---:|
| Comercial, 360 | $10.000\times0{,}18\times45/360$ | R$ 225,00 |
| Exata, 365 | $10.000\times0{,}18\times45/365$ | R$ 221,92 |

No Excel:

```excel
=10000*18%*45/360
=10000*18%*45/365
```

### Taxa over

No mercado brasileiro, *over* remete a uma operação de um dia útil — *overnight*. A Taxa DI é apurada a partir dessas operações e expressa em base anual de 252 dias úteis; portanto, essa convenção não deve ser confundida com os anos comercial de 360 dias ou civil de 365 dias. [B3 — metodologia do DI](https://www.b3.com.br/pt_br/market-data-e-indices/indices/indices-de-segmentos-e-setoriais/metodologia-do-di.htm); [B3 — especificações do DI](https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/juros/s_di_train_prog/04-especificacoes-do-contrato.htm).

Exemplo hipotético com taxa efetiva anual de 14% na base 252:

$$
i_{du}=(1+0{,}14)^{1/252}-1=0{,}05201\%\ a.d.u.
$$

Para cinco dias úteis:

$$
i_{5du}=(1+0{,}14)^{5/252}-1=0{,}2603\%
$$

No Excel:

```excel
=(1+14%)^(1/252)-1
=(1+14%)^(5/252)-1
```

## Conceitos centrais

- **Fluxo de caixa:** sequência temporal de entradas e saídas de dinheiro, sempre definida a partir de um ponto de vista.
- **Valor presente:** valor equivalente de um fluxo em uma data de referência atual.
- **Valor futuro:** valor equivalente após a capitalização por determinada taxa e prazo.
- **Taxa efetiva:** taxa cujo período coincide com o período de capitalização.
- **Taxa nominal:** taxa expressa em período diferente daquele em que ocorre a capitalização.
- **Base de contagem:** denominador usado para converter uma taxa anual em fração do ano, como 360, 365/366 ou 252 dias úteis.
- **Taxa over:** taxa associada a operações de um dia útil; no DI brasileiro, é anualizada na base de 252 dias úteis.

## Roteiro rápido para exercícios

1. Defina o ponto de vista e os sinais dos fluxos.
2. Desenhe a linha do tempo.
3. Identifique se o regime é simples ou composto.
4. Faça a taxa e o prazo usarem a mesma unidade.
5. Confirme a base de dias: 360, 365/366 ou 252 úteis.
6. Leve todos os valores para uma única data focal.
7. Refaça no Excel e confira se os sinais e as unidades foram mantidos.

## Obras e textos tratados

A RAW não registra livro ou texto explicitamente citado pelo professor nesta aula. Os materiais abaixo foram consultados apenas para verificar e complementar os conceitos anotados; não devem ser atribuídos à exposição do professor.

## Notas de verificação

1. **Nominal versus efetiva:** a RAW associa taxa nominal a períodos-padrão e taxa efetiva ao período do contrato. A formulação técnica mais precisa é a coincidência — ou não — entre o período de referência da taxa e o período de capitalização.
2. **Taxa diária multiplicada por 30:** a expressão anotada produz uma taxa mensal nominal/proporcional. Se os juros forem incorporados diariamente, a taxa mensal efetiva exige composição exponencial.
3. **Taxa over:** a RAW a aproxima das convenções 360/365, mas a Taxa DI overnight utiliza base de 252 dias úteis. O sentido específico adotado pelo professor para “taxa over” ainda pode ser confirmado em aula.
4. **Arquivo Excel:** a planilha simples mencionada pelo estudante não foi recuperada. Os exemplos acima reconstroem apenas os cálculos essenciais, sem alegar reproduzir o arquivo original.

## Fontes consultadas

- AGUIAR, Fabiano Porto de. *Matemática Comercial e Financeira*. Fortaleza: UAB/IFCE, 2011, pp. 23–25. ISBN 978-85-475-0031-3. [PDF no eduCAPES](https://educapes.capes.gov.br/bitstream/capes/429283/2/Matem_Finan.pdf).
- BELO, Haroldo da Costa. *Matemática Financeira*. v. 1, 2. ed. Rio de Janeiro: Fundação CECIERJ, 2010, pp. 24–26. ISBN 978-85-7648-467-7. [PDF da Fundação CECIERJ](https://canal.cecierj.edu.br/012016/e956f650049a7287968ee68ff830d284.pdf).
- B3. *Metodologia do DI*. Consultado em 26 ago. 2026. [Página institucional](https://www.b3.com.br/pt_br/market-data-e-indices/indices/indices-de-segmentos-e-setoriais/metodologia-do-di.htm).
- B3. *Especificações do contrato de DI*. Consultado em 26 ago. 2026. [Página institucional](https://www.b3.com.br/pt_br/produtos-e-servicos/negociacao/juros/s_di_train_prog/04-especificacoes-do-contrato.htm).
- MICROSOFT. Documentação das funções financeiras [VF](https://support.microsoft.com/pt-br/excel/functions/fv-function), [VP](https://support.microsoft.com/pt-br/excel/functions/pv-function) e [EFETIVA](https://support.microsoft.com/pt-BR/Excel/functions/effect-function). Consultada em 26 ago. 2026.
- ESCOLA NACIONAL DE ADMINISTRAÇÃO PÚBLICA. *Conceitos Essenciais para ASP — Matemática Financeira*. 2013. [Registro na Biblioteca Digital do Ministério da Gestão](https://bibliotecadigital.economia.gov.br/handle/123456789/523752).
