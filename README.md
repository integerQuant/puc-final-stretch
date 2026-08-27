# PUC-SP — Economia | Vault de estudos

Este repositório é um vault do [Obsidian](https://obsidian.md/) para organizar anotações, leituras, fichamentos, trabalhos e revisões dos semestres finais do curso de Ciências Econômicas da PUC-SP.

## Como abrir

1. Clone este repositório.
2. No Obsidian, escolha **Abrir pasta como cofre**.
3. Selecione a raiz deste repositório.
4. Comece pela nota [[00 - Início]].

Na primeira abertura, confirme a ativação dos plugins comunitários e recarregue a janela. O vault já inclui uma configuração portátil do Obsidian com tema OLED, ligaturas e plugins de produtividade. A combinação recomendada é [Literata](https://fonts.google.com/specimen/Literata) para leitura e [JetBrains Mono](https://www.jetbrains.com/lp/mono/) para código.

## Obsidian

A interface usa o tema **Minimal** em modo escuro *true black*, fonte nativa do sistema nos controles, Literata nas notas e JetBrains Mono apenas em código e metadados. O atalho `Cmd/Ctrl + Shift + O` abre a busca do Omnisearch.

Plugins incluídos:

- **Minimal Theme Settings** e **Style Settings** para aparência;
- **Omnisearch** para busca rápida no vault;
- **Templater**, apontado para `90 - Templates`;
- **Linter**, configurado para uso manual, sem alterar notas ao salvar;
- **Git**, também manual, sem commits ou sincronização automáticos;
- **Cash Flow Diagrams**, para diagramas financeiros com eixo temporal e setas de entradas e saídas.

As versões armazenadas no vault são compatíveis com o runtime Obsidian 1.13.7 e podem ser atualizadas pela tela de plugins.

## Organização

- `01 - Matérias`: uma pasta por disciplina.
- `90 - Templates`: modelos reutilizáveis para notas acadêmicas.
- `99 - Caixa de entrada`: captura rápida antes da organização definitiva.
- `.obsidian`: apenas configurações portáveis do vault.

Cada matéria pode conter:

- `Anotações RAW`: registros rápidos de aula, passíveis de correção ortográfica, normalização semântica, metadados e paráfrase fiel;
- `Anotações`: versões organizadas e enriquecidas com fontes;
- `Aulas`: notas de aula e cronograma;
- `Leituras`: textos indicados e notas de leitura;
- `Fichamentos`: fichamentos bibliográficos ou temáticos;
- `Trabalhos`: avaliações, trabalhos e entregas;
- `Listas`: exercícios avaliativos e controle de entregas;
- `Planilhas`: modelos e cálculos próprios em Excel; arquivos originais do professor permanecem em `Anexos`;
- `Revisões`: sínteses para provas e fechamento do curso;
- `Anexos`: planos de ensino, PDFs, imagens e outros documentos-fonte.

O fluxo principal é `Anotações RAW` → limpeza fiel do registro → pesquisa nas obras e fontes acadêmicas → `Anotações`. As regras de edição, pesquisa e citação estão em `AGENTS.md`.

## Convenções

- Aula com data conhecida: `AAAA-MM-DD - Tema da aula.md`.
- Aula sem data conhecida: `Aula NN - Tema.md`.
- Leitura ou fichamento: `Autor - Ano - Título.md`.
- Documentos-fonte devem ser preservados em `Anexos` e ligados pela nota que os descreve.
- Use propriedades YAML para semestre, professor, disciplina, tipo e status.

## Git

O histórico do Git deve registrar mudanças pequenas e descritivas. Antes de começar uma sessão em outro dispositivo, atualize a cópia local; ao terminar, revise as alterações antes de criar o commit.

Arquivos de estado local do Obsidian, como `workspace.json`, não são versionados. Notas, anexos acadêmicos, templates e configurações portáveis são versionados.

O repositório é público para leitura e forks. Apenas o proprietário e colaboradores explicitamente autorizados têm permissão de escrita no repositório principal.
