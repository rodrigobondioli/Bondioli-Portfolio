# rodrigobondioli.com

Site pessoal do Rodrigo Bondioli. Next.js 15 (App Router) na Vercel (Hobby).
Todas as páginas são pré-geradas no build; a única rota de servidor é
`/api/contact`, que manda o formulário por e-mail.

Saímos do Framer em 21/09/2026 pra cortar custo. **A regra que rege tudo aqui:
mesma cara do Framer, código e design system novos.**

## O que está pronto e o que falta

- [x] `/` — capa de uma tela, logo girando (física própria, portada do Framer)
- [x] `/thanks`
- [x] `/work` — a página grande: hero, reel, manifesto, arquivo, sobre, YouTube, contato. O destaque do Go Ink saiu em 12/10/2026, a pedido
- [ ] `/projects/[slug]` — 16 páginas, conteúdo em `src/content/projects.json`.
      Estrutura extraída do Framer está descrita na conversa. Era escuro
      fixo (`--bg-dark`); desde 12/10/2026 segue o tema (ver "Tema").
- [x] `/mediakit` — conteúdo em `src/content/mediakit.json` (era `/mediakit/home`
      no Framer; a URL nova é `/mediakit`). Números e estrutura medidos no
      Framer, roupa da `/work` — decisão do Rodrigo em 23/09/2026.

As URLs antigas foram mantidas. Só essa mudou.

**Cases fora do ar (12/10/2026):** Filmboss e C-Carbon saíram, a pedido.
Não foram apagados: ficam como `"draft": true` no `projects.json` (rascunho
não entra em lista nenhuma e a página dá 404), as imagens estão em
`_originais/fora-do-ar-2026-10-12/` com um LEIA-ME de como voltar, e as
URLs antigas redirecionam pra `/work` (307, porque podem voltar).

## Como trabalhar nisso

O jeito que funcionou, e que vale repetir: **medir o Framer, não estimar.**

O site antigo continua publicado em <https://only-experiment-626593.framer.app>.
Abrir a página lá e a nossa lado a lado, e comparar com `getComputedStyle` —
não no olho. Quase todo erro desta migração veio de estimar em vez de medir:
raio de borda que não existia, entrelinha 1.5 onde era 1.3, largura máxima de
container que o Framer não tem, régua de 88 onde era 224.

Duas armadilhas que já custaram tempo:

1. **Nem todo "efeito" é animação.** A régua do projeto em destaque (bloco que saiu da /work em 12/10, mas a lição vale) sobe sozinha
   e só depois o texto chega — isso é *layout*, 788px de espera, não um fade.
   Medir a distância entre os elementos antes de escrever qualquer `transition`.
2. **`100vw` conta a barra de rolagem.** Foi o que criou scroll horizontal no
   ticker. Usar `100%` e deixar a seção cortar.

```bash
npm run dev     # localhost:3000
npm run build   # build de produção (.next)
npm run start   # serve o build em localhost:3000
```

## Decisões que não são negociáveis sem falar com o Rodrigo

- **Fonte: só a Geist.** Geist em tudo (títulos e texto) e Geist Mono na
  "ficha técnica" (`.overline`, metadados de projeto, "Services", números
  da faixa do herói, EN/BR, a abertura — texto que se lê como dado). OFL
  1.1, variáveis (um arquivo cada), auto-hospedadas em `public/fonts` com a
  licença ao lado (`OFL-Geist.txt`). `--font-display` ainda existe, mas
  aponta pra Geist. Pesos: todos os títulos em 500, h1 inclusive (o
  mesmo do tumulto.ai; passou por 300 e voltou, a pedido). Os títulos têm entreletra negativa (h1 -0.04em, h2
  -0.03em, resto -0.02em) — a Geist grande no 0 fica frouxa.
  Histórico: Alpha Lyrae (títulos) + Inter (resto) desde 21/09. Em 23/09
  ele testou a Geist e manteve a Alpha. Em 12/10/2026 trocou a Inter pela
  Geist e, no mesmo dia, tirou a Alpha também: a Geist é a única família
  do site. Inter e Alpha estão em `_to_delete/2026-10-12-*`.
- **Espaçamento:** sete passos, `--s1` a `--s7` em `globals.css`. O Framer tinha
  acumulado 19 valores onde o sistema documentava 7. Não inventar um oitavo.
- **Réguas** (as linhas curtas ao lado dos títulos) têm largura fixa por
  instância: `.rule-lg` 224, `.rule-md` 156, `.rule-sm` 88. Isso foi decisão
  dele depois de um teste com `1fr` que deu errado — a linha encostava no texto.
  Não "consertar" isso.
- **Nada arredondado** no `/work`. Thumbs, vídeos e imagens são de canto vivo.
- **Botão:** sempre `PillButton`. Rosa, texto preto, 48 de altura, cambalhota 3D
  no hover.

## Armadilhas do projeto

- **`overflow-x: clip`** no html/body, não `hidden`: `hidden` vira contexto de
  rolagem e mata o `position: sticky` da imagem do destaque.
- **Scroll suave é Lenis** — o mesmo que o Framer usava (dá pra ver a classe
  `.lenis` no html do site publicado).
- **O formulário envia de verdade**, por `/api/contact` → Resend. Isso é o
  motivo de o site não ser mais `output: "export"`: export puro não compila
  rota nenhuma. A conta Resend já tem `send.rodrigobondioli.com` verificado
  (SPF/DKIM) e uma chave só de envio travada nesse domínio. As variáveis
  estão em `.env.example`; sem elas a rota responde 500 e o formulário mostra
  o caminho manual em vez de engolir o que a pessoa escreveu.
- **Legenda do YouTube:** `cc_load_policy=0` é só sugestão. O player recarrega o
  módulo de legenda a cada volta do loop. Só segura chamando `unloadModule`
  (nos dois nomes, `captions` e `cc`) de tempos em tempos enquanto toca.
- **Imagens dos projetos** estão em `public/projects/<slug>/`. O CMS do Framer
  guardava URLs de `framerusercontent.com`; `src/content/assets.json` traduz
  URL → arquivo local, e `asset()` em `src/lib/projects.ts` faz a busca.
- **Rodapé:** as redes ficam no centro exato da tela (`1fr auto 1fr`
  acima de 900). Na grade (12/10) elas começaram na linha da coluna 13, e
  o Rodrigo achou torto, puxado pra direita — voltou pro centro no mesmo
  dia. O último item é ".md", o download do portfólio (`/portfolio.md`),
  sem ícone, no mesmo estilo das redes. No celular empilha à esquerda.
- **A raiz foi limpa em 28/09/2026.** O que não fazia parte do site no ar
  (site-v2, landings do curso, assets do site estático antigo, backups)
  está em `_to_delete/2026-09-28-faxina/`, com um LEIA-ME. `_to_delete/`
  e `_originais/` ficam fora do git e do deploy. O Anti Designer Pato
  (landings, app do curso, `Marketing/`) saiu de vez, a pedido. Original
  pesado de vídeo/foto vai em `_originais/`; só a versão comprimida entra
  em `public/`.

## Animações — o que já deu errado

- **`StripReveal`** (12/10/2026, no lugar do `MaskReveal`) é a revelação do
  tumulto.ai, trabalho do Rodrigo (código em `~/Developer/Tumulto/site`,
  `lib/reveal.ts`): imagens e vídeos se abrem em faixas verticais de ~30px
  (grade da página, `src/lib/strips.ts`), subindo de baixo pra cima, da
  esquerda pra direita, por TEMPO (1.3s, expo.inOut) quando o topo passa de
  85% da janela. Herdou as três lições do MaskReveal: o HTML nasce sem
  máscara (quem põe é o efeito); a "porta" espera a imagem carregar (até
  1,2s) pra não abrir caixa vazia; e uma rede tira a máscara se o laço não
  terminar.
- **A abertura (`Preloader`) só existe na `/work`**, e só quando a pessoa
  chega direto nela (14/10, pedido do Rodrigo: a capa entra sem loading;
  navegando da capa pra /work ela não volta). Ela também é a do tumulto (`components/Loader.tsx`
  de lá), com a marca do Rodrigo no lugar do asterisco e a cortina no rosa.
  Lá é GSAP; aqui é WAAPI com as mesmas curvas e tempos (~6s no total). Ela
  ainda trava o scroll (CSS + Lenis) e só dispara `marcarPronto` quando a
  cortina começa a subir. Com movimento reduzido, não aparece.
- **Links de texto: `TextRoll`** (14/10). O cubo 3D numa mola (CubeLink,
  CopyEmail, RollLabel) "parecia bugado": a mola passava do ponto e
  voltava, a letra pequena borrava no giro e o sublinhado girava junto.
  Agora é 2D — o texto sobe e a cópia entra por baixo (700ms, expo out,
  sem repique) e o sublinhado fica parado, fazendo uma passada (some pela
  direita, volta pela esquerda). Vale pra redes da capa, e-mail e redes do
  rodapé. O `PillButton` continua com a cambalhota: é decisão do botão.
  **Todo link de texto fica rosa (`--accent-pink`) no hover**, além do
  movimento — TextRoll, links da barra do topo, nome do projeto e qualquer
  `<a>` sublinhado (regra em globals) (14/10, pedido do Rodrigo).
- **`lag`** desencontra uma grade: a peça espera mais um tanto da janela antes
  de largar. O valor vem de hash do índice, **nunca `Math.random`** — o
  servidor e o navegador têm que chegar no mesmo número, senão é erro de
  hidratação.
- **Perspectiva aumenta o que está na frente.** No `PillButton`, a face em
  `translateZ(10px)` com `perspective(280px)` renderiza 3,7% maior que a
  caixa, e a última letra batia na janela do recorte. A folga lateral no
  `.mask` (com margem negativa devolvendo a largura) é o que conserta — não
  mexer nela achando que é sobra.
- **`MeetingBar`** entra depois que o hero sai e sai de novo quando a seção
  amarela (`.on-accent`, `#contact`) alcança a altura dela.

## Responsivo: três degraus e uma curva

O site tem **exatamente três breakpoints** — `640`, `900`, `1100`. Não
existe um quarto. Um valor novo (620, 768, 1024…) é sinal de que a regra
está compensando um layout que não flexiona; conserte o layout ou suba/desça
pro degrau vizinho.

- **640** — celular: gutter já está em 16, grade do arquivo vira uma coluna,
  herói empilha, overline sobe pra 12px.
- **900** — tablet: grade do arquivo em duas colunas, rodapé empilha, faixa
  de números solta a altura fixa.
- **1100** — o bloco de duas colunas da página de projeto vira uma.

**Por que o rodapé quebra em 900 e não em 640:** medido, em 641px os três
blocos somam 528px numa caixa de 518. Em fila eles estouram *antes* de
chegar no celular, então a quebra sobe pro degrau de cima. Não baixe isso
sem medir de novo.

**Existe uma única consulta de altura**, `@media (max-height: 560px)`, no
herói da `/work`. Ela não é um quarto degrau — os três degraus são de
largura. Ela existe porque a faixa de números é `position: absolute`
presa no fundo de um herói com `min-height: 100svh`: em tela baixa
(celular deitado, janela de desktop achatada) o herói cresce além da
janela e leva a faixa junto. Medido antes da correção: 47px de
sobreposição em 932×430, 30px em 1024×500, 25px em 1180×560, e em
844×390 a faixa inteira fora da tela. A correção tira a faixa do
absoluto. **Um bug de tela baixa não se conserta com breakpoint de
largura** — foi o que deixou esse passar: 844 de largura é "desktop".

**A margem lateral é igual ao vão entre as colunas** (14/10/2026, pedido
do Rodrigo): **32 acima de 640, 16 no celular**. `--gutter` aponta pra
`--col-gap`, então as duas andam juntas — não separar. (Testou 24 no
mesmo dia e subiu pra 32: 24 apertava a barra lateral na margem.) A capa
usa a mesma medida nos quatro lados. E em cima e embaixo também, em todas as páginas:
a barra do topo, a barra lateral, a pílula e o fim do rodapé ficam a
`--gutter` das bordas (14/10).

Histórico: 8.6vw/124 do Framer → 6vw (22/09) → 56 fixo no desktop numa
curva sem media query (12/10) → margem = vão, 32/16 (14/10). Comparar
posições horizontais com o Framer tem que descontar a diferença de margem.

**`scrollbar-gutter: stable`** reserva o lugar da barra de rolagem em toda
página. Na capa, que não rola, isso virava 15px a mais de margem só à
direita — por isso a capa desliga (`html:has(.page)` no home.module.css).

## O que a `/mediakit` não herdou do Framer

A página foi medida lá (getComputedStyle, como o resto), mas o desenho
final é o da `/work`: mesmo `SiteNav`, `SiteFooter`, `MeetingBar`,
`YouTube`, `MaskReveal` e `Brands`, cabeçalho de seção com régua, canto
vivo e hairline de `--rule`. Ficaram pra trás, de propósito: o raio de
16px dos cards, os paddings de 40/56 (aqui são `--s3`/`--s4`), a fita
adesiva colada no vídeo e o roxo #822DFF — o roxo é o `--accent-violet`
do sistema, escolha do Rodrigo. Esta página não tem formulário: o contato
é o e-mail da barra do topo.

A faixa gigante da capa ("MEDIA KIT —") é `min(288px, 20vw)`: 288 é a
medida do Framer e vale de 1440 pra cima. No celular ela sai de trás do
vídeo e desce pro fim do herói — atrás dele viraria um caco de letra de
cada lado.

O vídeo da capa é o mesmo `eu-profile.mp4` do "about" da `/work` (o
arquivo do Framer é byte a byte o mesmo). O retrato do "about" daqui é
novo: `public/images/rodrigo-retrato.webp`.

O `mediakit.json` deixou de ser o despejo do Framer (uma lista de textos
com nome de estilo) e virou conteúdo com forma: números, países, faixas
etárias, formatos, vídeos. O despejo antigo não tinha a faixa de dez
números que a página mostra — ela não existia no arquivo, só na tela.

## Números ao vivo na `/mediakit`

O que é público vem da YouTube Data API, uma vez por dia (`revalidate` de
24h na página): **inscritos**, **total de vídeos** e os **quatro vídeos
mais vistos** do canal — por isso a seção chama "Most watched", e não
"Editor's choice": o título tem que dizer o que a lista faz. Shorts ficam
de fora (a grade é 16:9; o corte é por duração, abaixo de 3 minutos).

Regras do `src/lib/youtube.ts`, nenhuma opcional:

- **Sem `YOUTUBE_API_KEY`, nem tenta** — devolve nulo sem tocar na rede, e
  tudo cai no `mediakit.json`. O build tem que rodar offline, pelo mesmo
  motivo das fontes auto-hospedadas.
- **Falha não derruba build**: timeout de 4s, `try/catch` em tudo, JSON
  como rede. Número velho é melhor que página que não sobe.
- **A chave nunca vai pro navegador.** É lida no servidor, no build e na
  revalidação.
- A ordenação sai da playlist de uploads, não de `search?order=viewCount`:
  a busca custa 100 unidades de cota, atrasa e não devolve as views pra
  conferir. Assim são ~5 unidades por atualização, de 10.000 por dia.

O **"Last updated"** da capa é a data da busca, não uma constante: sai do
mesmo `dadosDoCanal()`, no fuso de São Paulo (o build da Vercel roda em
UTC, e depois das 21h aqui a data viraria "amanhã"). Sem API, ele volta a
ser a data escrita no JSON — que nesse caso é a verdade.

O resto do kit — impressões, CTR, retenção, crescimento, idade, gênero,
países — vive na YouTube Analytics API, que exige OAuth do dono do canal.
Ainda não é feito; esses números continuam na mão no JSON. Ou seja: a data
da capa fala pelos números automáticos, não pelos do JSON.

**O "12.0% de engajamento" e o "top 10%" não são campos de API nenhuma.**
São contas. Se um dia forem automatizados, a fórmula tem que ser decidida
antes — senão vira número oficial inventado.

## A pílula "See if we're a fit" (era a barra "Book a call")

Desde 12/10/2026 o `MeetingBar` tem o desenho do brandbeet.com: pílula
pequena de vidro, a marca num disco claro (28 em 34) e "See if we're a
fit". A marca gira **com o scroll** (0.25° por pixel: descendo, horário;
subindo, anti-horário; parado, parada) — não com o vento da capa, que é
aleatório. Pedido do Rodrigo. Atrás dela, um desfoque progressivo
no pé da tela — quatro camadas de `backdrop-filter` (2/5/10/18px), cada
uma com a sua faixa de máscara — que aparece e some junto. Uma camada só
com blur forte faz emenda visível; em degraus ela some. A lógica de
entrar e sair abaixo continua a mesma.

O "Selected work" também veio do brandbeet: `ProjectShowcase` — nome
grande + "Services" (o campo `type`) e uma colagem de quatro imagens em
5·7·4·8 colunas de 24, presas pelo topo, nos formatos medidos lá (quase
quadrada, retrato 4:5, quadrada e 6:5 — a última mais deitada que a de
lá, pra ficar entre o retrato e a quadrada (14/10) — recorte com
`object-fit: cover`, as fotos são 16:9), espelhada projeto sim, projeto
não. Sem botão: a barra "View project" saiu no mesmo dia; o nome e
qualquer imagem levam pra `/projects/<slug>`. As
fotos saem da galeria; a thumb só entra se faltar imagem (ela costuma ser
recorte da primeira da galeria, e as duas lado a lado se repetiam).

### Entrar e sair

O `MeetingBar` é o mesmo componente em todas as páginas, e o que muda é
**quem manda nele entrar e sair**:

- **Entrar:** o piso é sempre a altura medida da navegação — enquanto o
  contato do topo estiver na tela, seriam dois convites ao mesmo tempo.
  `entraApos` é um piso a mais, em frações da janela. Na `/work` ele é 0.9
  porque lá o herói termina com a faixa de números presa no rodapé da tela,
  e a barra entrando antes sentaria em cima dela. Na `/mediakit` é 0: não
  há faixa, e ela entra assim que o botão do topo some.
- **Sair:** `hideOver`. O padrão é `.on-accent, #contact` — o amarelo do
  fecho, onde o convite já ocupa a página inteira. Em página sem contato
  (o media kit) quem a esconde é o `footer`, senão ela termina sentada em
  cima das redes.

## O herói da `/work` (14/10/2026)

H1 = "If your product is hard to understand, it's impossible to sell.",
**em duas linhas quebrando na vírgula, à esquerda**, no maior corpo em que
a primeira linha cabe (4.9vw, ~70px em 1440) — no tamanho do display do
tumulto ficava "exagerado", e centralizado foi testado e descartado. **No meio exato da altura entre o
topo da tela e a linha da faixa de números** (a reserva de 88px embaixo é
a faixa). A linha de apoio sai do fluxo (absoluta) pra não contar no
centro, fica a `min(--s7, 12svh)` abaixo do título e começa na mesma
linha do "Get in touch" da barra (coluna 15 de 24), em duas linhas. No
celular e em tela baixa ela volta pro fluxo.

## A barra do topo (14/10/2026)

Quatro blocos: "Rodrigo Bondioli / Selected Work 15' — 26'", "Creative
Director / São Paulo, Brazil", "Get in touch / e-mail" e o idioma/tema.
Nome no canto esquerdo, idioma/tema no direito, e cargo e contato **em
cima de linhas da grade**, num ritmo de 7 em 7 colunas: coluna 8 e 15 de
24 (4 e 7 de 12). Foi primeiro `space-between` (espaço exato entre os
quatro), mas aí o "Get in touch" caía entre duas linhas — o Rodrigo
preferiu as linhas. A segunda linha de cada bloco é cinza (`--ink-60`).
A linha de apoio do herói começa na mesma coluna do contato. Abaixo de 900 o
cargo sai; o que não couber desce pra linha de baixo.

## A grade (12/10/2026, do tumulto.ai)

Linhas verticais fixas na tela (`GridLines`), bem apagadas, e o conteúdo
encostado nelas — pedido do Rodrigo, a partir do tumulto.ai (trabalho
dele, código em `~/Developer/Tumulto/site`). 24 colunas acima de 1100, 12
acima de 640, 6 no celular, vão de 16/12, entre as margens (`--gutter`).
Linha na borda esquerda de cada coluna e no meio do passo (uma a cada
~28px) + fechamento na borda direita do conteúdo.

**A regra:** todo bloco começa em cima de uma linha. Pra isso:
- `.grid` (globals) monta as mesmas colunas dentro de uma `.section`;
  `.g-left` / `.g-right` são as duas metades; `.to-line` faz uma caixa
  terminar na linha do meio da última coluna dela (o vão até a vizinha
  vira meio passo e as duas bordas caem em linhas).
- `--col` é o passo; `--gap-line` (meio passo) é o recuo interno dos cards,
  pra o texto de dentro também cair numa linha.
- Texto alinhado à direita conta como alinhado se terminar numa linha.
- Imagens e vídeos ficam por cima das linhas (`z-index: 2`); fundos, por
  baixo.

Pra conferir depois de mexer: medir com as linhas na tela, não no olho —
o script de auditoria compara a borda esquerda de cada bloco com a linha
mais próxima.

## Só a Tattoaria tem link (14/10/2026)

Decisão do Rodrigo: a Tattoaria é o único projeto com case de verdade
(resultados, história), então é o **único com página interna linkada**.
Os outros aparecem no Selected work só pelas imagens, pelo craft — sem
link e sem zoom de hover. A lista mora em `COM_CASE` (`lib/projects.ts`):
pôr um slug lá liga o link, a pílula e o `.md` daquele projeto.

- Fotos da Tattoaria: no hover a foto dá o zoom, escurece e mostra "View
  case study" no meio dela. Sem cápsula nem bolinha que siga o mouse —
  testadas no mesmo dia e descartadas ("muita capsulinha"). Ao lado do
  nome, "(case study)" na fonte e cor da lista de serviços.
- A colagem aceita até 8 mídias (duas linhas; a de baixo espelha a de
  cima, como no brandbeet) e vídeo curto (.mp4, mudo, em loop, sem a
  revelação em faixas). Projeto com lista própria em
  `src/content/showcase.ts` usa ela, na ordem do Rodrigo; `null` guarda a
  vaga de uma mídia que ainda não chegou. O Flex Pharma (14/10, segundo da
  lista) é o primeiro assim. Os outros usam as 4 primeiras da galeria.
- Uma vaga pode ser um **flipbook** (`{ flipbook: [...] }` no
  showcase.ts): fotos que se alternam em corte seco a cada 0,7s, sem
  arquivo de vídeo — `Flipbook`, para fora da tela e com movimento
  reduzido. A Tattoaria usa na vaga 1 (as roupas, P&B, 14/10). Regra do
  Rodrigo: só algumas vagas animadas, "pra não virar carnaval".
  A colagem da Tattoaria (14/10): 1 flipbook das roupas · 2 **reel** de
  ~12,5s (os 10 takes que o Rodrigo escolheu nos vídeos do canal da
  Tattoaria, ~1,3s cada, recortado em pé 4:5, sem som, ~1,2MB; originais
  e o script que monta, `montar-reel.py`, em `_originais/tattoaria-reel/`,
  baixados com yt-dlp) · 3 logo · 4 a sinuca.
- **Entrada das peças = a do brandbeet.com/work** (`CardReveal`, medida
  lá em 14/10): a peça sobe 24px, aparece e se abre de cima pra baixo
  (`clip-path` de 100% a 0) enquanto a mídia assenta de 1.08 pra 1, ~1s,
  uma ~150ms depois da outra. Substitui o StripReveal no Selected work
  (pedido do Rodrigo: "bem parecido, com o refinamento", em todos). Vale
  pra foto, vídeo e flipbook.
- Roadr (14/10): vaga 1 é o app em movimento, feito em **Remotion** a
  partir do frame "Roadr1" do Figma Boards (home da Maia → carrossel →
  toque em "Tire change" → tela do pneu → "Front left" → capô ("Hood",
  no laranja do Roadr) → "Next", em loop, 10s, fundo cinza do campo;
  projeto em `_originais/roadr-remotion/`, `npm run render`, depois
  comprimir pra 768×800). Vaga 2 é o "brand showcase": a câmera avança devagar
  por um campo de telas do site/app e fotos em 3D (CSS preserve-3d), e o
  campo balança e gira — algumas peças passam bem perto, pra ver detalhe —,
  a partir do vídeo do Minx Law do brandbeet (composição `Campo` no mesmo
  projeto Remotion; loop perfeito, 15s). A colagem que rola em perspectiva
  (`_originais/roadr-colagem/`) foi a versão anterior. vaga 4
  o vídeo do card "Car wash" do roadr.com.
- Cada foto é o seu próprio link: a colagem tem alturas diferentes, e com
  ela inteira como link o vão embaixo das fotos menores virava área de
  clique (mão e bolinha no vazio).
- As páginas dos outros (`/projects/[slug]`) **continuam existindo**, mas
  nada no site leva até elas: a página da Tattoaria não tem mais
  anterior/próximo, o `/portfolio.md` só dá o link do case, e elas saem
  do Google (`robots: noindex`). Quem tiver o link direto ainda abre.

## O case da Tattoaria (12/10/2026)

`/projects/tattoaria` não é o template do CMS: é o case completo do
tumulto.ai (`/en/projects/tattoaria`, código em `~/Developer/Tumulto/site`,
`components/case/` e `content/en/tattoaria.ts`), trazido pra cá a pedido do
Rodrigo — é o projeto principal dele, por isso abre o Selected work. Os
projetos não são todos iguais: cada um tem o tamanho que tem, e só a
Tattoaria tem um case deste porte.

- Rota fixa em `src/app/projects/tattoaria/` (ganha da dinâmica; o
  `[slug]` tira a Tattoaria do `generateStaticParams`). Conteúdo em
  `src/content/cases/tattoaria.ts`, fotos em `public/projects/tattoaria/case/`.
- Estrutura de lá; roupa daqui (barra, rodapé, pílula, grade, faixas).
  Lá é GSAP; aqui o texto que acende (`case/LitText`) e o passeio pelo
  galpão (`case/Tour`, preso com `position: sticky`) são feitos à mão,
  com as mesmas contas.
- Tipos e pesos **iguais aos de lá**, medidos com getComputedStyle (título
  500, frases 500, números 700, textos pequenos 500), pedido do Rodrigo.
- A voz muda: lá "we" é a agência; aqui os créditos e o fecho são do
  Rodrigo, e o "Let's talk" desce pro contato da própria página.

## Tema claro e escuro (12/10/2026)

Dark (`#121211`) é o padrão; light é o site como era. O tema mora no
`data-theme` do `<html>`, posto por um script no `<head>` antes da primeira
pintura; o `ThemeToggle` troca e grava em `localStorage`. Ele mora **na barra do topo**, em
linha e só texto: EN, BR, um tracinho e o sol — o quarto bloco dela
(14/10; passou por uma cápsula de vidro em pé na margem direita, que era
"informação demais na tela"). Por isso não existe em página sem a barra
(a capa, o /thanks). O que tem fundo próprio claro (o amarelo das seções de
destaque) usa `.on-accent`, que devolve os tokens escuros de texto.

**As páginas de projeto seguem o tema também** (12/10/2026, pedido do
Rodrigo, a partir da Tattoaria): `<main class="on-project">` usa `--bg` e
`--ink`, e tudo dentro delas — template do CMS, case da Tattoaria,
`ProjectPager`, `case/*` — vai por token: `--ink`, `--ink-60`, `--rule`,
`--card` (cartão/fundo de mídia) e `--lit` (o destaque do texto que
acende: verde-limão no escuro, verde escuro no claro, porque o limão some
no fundo claro). Nada de cor escrita, nem `--bg-dark`/`--rule-dark`; a
exceção é texto por cima de foto (o contador do passeio), que é branco
nos dois temas. A `SiteNav` perdeu o modo `dark` forçado.

## Idioma

O site é **em inglês**. Isso vale pro texto visível, `alt`, `aria-label` e
`title` — comentário de código e mensagem de commit seguem em português.

## Onde vai cada arquivo

| o quê | pasta |
|---|---|
| fotos, avatar, logos do site | `public/images/` |
| assets da página `/work` | `public/site/` |
| vídeos | `public/video/` |
| originais pesados (fora do deploy) | `_originais/` |
| imagens dos projetos | `public/projects/<slug>/` |
| logos de cliente | `public/logos/` |
