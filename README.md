# JOVI Smart Assist

Landing page do JOVI Smart Assist, uma proposta de câmera inteligente que utiliza inteligência artificial para recomendar modos de captura e organizar conteúdos visuais de estudo.

## Finalidade acadêmica

O projeto foi desenvolvido pela Debug Team como atividade acadêmica do curso de Engenharia de Software. A página apresenta o conceito, o público-alvo, o fluxo do protótipo, a equipe e uma demonstração em vídeo.

O formulário de contato é apenas uma simulação: nenhuma informação é enviada para servidor, API ou banco de dados.

## Integrantes

- Daniel Silva — RM 569617
- Kaik Sales — RM 571558
- Matheus Augusto — RM 572976
- Matheus Ferraz — RM 572238
- Thiago Vitelo — RM 569726

## Tecnologias utilizadas

- HTML5
- CSS3
- CSS Grid
- Flexbox
- JavaScript

O projeto não utiliza frameworks ou bibliotecas de interface.

## Estrutura de pastas

```text
.
├── index.html
├── README.md
├── INTEGRANTES.TXT
├── css/
│   └── style.css
├── js/
│   └── script.js
├── img/
│   ├── galeria/
│   └── logo_time/
│       └── logo_debugteam.png
└── video/
    └── video-prototipo.mp4
```

## Como executar localmente

O projeto é estático e não exige instalação de dependências.

1. Clone ou baixe este repositório.
2. Abra o arquivo `index.html` diretamente no navegador.

Como alternativa, se o Python estiver disponível, execute na raiz do projeto:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000` no navegador.

## Funcionalidades

- Navegação suave entre as seções.
- Menu responsivo com controle por mouse e teclado.
- Hero com composição visual conceitual.
- Seções construídas com CSS Grid e reorganizadas por breakpoint.
- Galeria responsiva com seis telas do protótipo.
- Cards dos integrantes com links para o LinkedIn.
- Modal acessível com demonstração em vídeo.
- Fechamento do modal pelo botão, pelo fundo ou pela tecla `Escape`.
- Isolamento do conteúdo de fundo enquanto o modal está aberto.
- Formulário acadêmico com validação acessível e simulação de envio.
- Suporte a navegação por teclado e `prefers-reduced-motion`.

## Repositório

[github.com/ferrazmattheuuss/jovi-smart-assist-landing-page](https://github.com/ferrazmattheuuss/jovi-smart-assist-landing-page)
