# 📚 Book Finder — Projeto IONIC/Angular

Aplicativo de busca de livros usando a [Open Library API](https://openlibrary.org/developers/api) (pública, sem token, sem autenticação).

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- Node.js 18+ instalado
- npm instalado

### Instalação

```bash
# 1. Instalar o Ionic CLI globalmente (se não tiver)
npm install -g @ionic/cli

# 2. Entrar na pasta do projeto
cd book-finder-ionic

# 3. Instalar as dependências
npm install

# 4. Rodar o projeto
ionic serve
# OU
ng serve
```

O app estará disponível em: **http://localhost:4200**

---

## 📁 Estrutura do Projeto

```
src/
└── app/
    ├── app.component.ts          ← Raiz da aplicação
    ├── app.config.ts             ← Configuração (providers)
    ├── app.routes.ts             ← Rotas (home e detail/:id)
    │
    ├── home/
    │   ├── home.page.ts          ← Lógica da tela principal
    │   ├── home.page.html        ← Template com @for, @if, pipes, diretiva
    │   └── home.page.scss        ← Estilização
    │
    ├── detail/
    │   ├── detail.page.ts        ← Lógica da tela de detalhe (lê parâmetro de rota)
    │   ├── detail.page.html      ← Template da tela de detalhe
    │   └── detail.page.scss      ← Estilização
    │
    ├── services/
    │   └── books.service.ts      ← Service com HttpClient e métodos GET
    │
    ├── pipes/
    │   └── book-pages.pipe.ts    ← Pipe personalizado (formata nº de páginas)
    │
    └── directives/
        └── highlight.directive.ts ← Diretiva personalizada (destaque visual)
```

---

## ✅ Checklist de Requisitos

| Req | Descrição | Arquivo | Responsável |
|-----|-----------|---------|-------------|
| 1 | Mínimo 2 pages (home + detail) | `home/`, `detail/`, `app.routes.ts` | Guilherme Amaral |
| 2 | Uso do HttpClient | `services/books.service.ts` | Pedro |
| 3 | API com método GET | `services/books.service.ts` | Pedro |
| 4a | Pipe personalizado (`bookPages`) | `pipes/book-pages.pipe.ts` | Vitor |
| 4b | Pipe built-in (`uppercase`) | `home.page.html` e `detail.page.html` | Miqueias |
| 5 | Service com HttpClient | `services/books.service.ts` | Pedro |
| 6a | Diretiva personalizada (`appHighlight`) | `directives/highlight.directive.ts` | Letícia |
| 6b | Diretivas estruturais (`@if` e `@for`) | `home.page.html`, `detail.page.html` | Lucas |
| 7⭐ | Parâmetro por rota (bônus +1pt) | `app.routes.ts`, `home.page.ts`, `detail.page.ts` | Guilherme Amaral |

---

---

## 🎤 Guia de Apresentação — O que cada um mostra ao Professor

---

### 👤 PEDRO — Req 2, 3 e 5 (HttpClient, API GET, Service)

**Arquivo:** `src/app/services/books.service.ts`

**O que apresentar:**
1. Abrir o arquivo `books.service.ts`
2. Mostrar o `@Injectable({ providedIn: 'root' })` — explica que é o Service
3. Mostrar o `constructor(private http: HttpClient)` — é aqui que o HttpClient é injetado
4. Mostrar o método `searchBooks()` e o `this.http.get<SearchResponse>(url)` — esse é o método GET
5. Explicar que a API usada é a **Open Library** (pública, sem token)
6. Mostrar em `home.page.ts` onde o Service é injetado: `constructor(private booksService: BooksService)`
7. Mostrar o `this.booksService.searchBooks(this.searchTerm).subscribe(...)` — é como os dados chegam na tela

**Frase de efeito:** *"O Service centraliza todas as chamadas HTTP. Ele usa o HttpClient do Angular para fazer o GET na API e devolve os dados para a tela via Observable."*

---

### 👤 GUILHERME AMARAL — Req 1 (2 Pages) e Req 7 (Parâmetro por rota — bônus)

**Arquivos:** `src/app/app.routes.ts`, `src/app/home/home.page.ts`, `src/app/detail/detail.page.ts`

**O que apresentar:**
1. Abrir `app.routes.ts` — mostrar as duas rotas: `/home` e `/detail/:id`
2. Navegar no app mostrando as **duas páginas** (Home e Detalhe)
3. Em `home.page.ts`, mostrar o método `goToDetail(book)` e o `this.router.navigate(['/detail', encodedKey])`
   - Explicar: *"Aqui eu pego a chave do livro e mando como parâmetro na URL"*
4. Em `detail.page.ts`, mostrar o `this.route.snapshot.paramMap.get('id')` no `ngOnInit`
   - Explicar: *"Aqui a segunda tela LEITURA o parâmetro que veio na rota e usa para buscar os detalhes"*
5. Demonstrar no app: clicar num livro e mostrar que a URL muda com o ID do livro

**Frase de efeito:** *"A Home envia o ID do livro pela rota. O Detail usa o ActivatedRoute para ler esse parâmetro e buscar os dados corretos na API."*

---

### 👤 LETÍCIA — Req 6 Parte 1 (Diretiva Personalizada)

**Arquivo:** `src/app/directives/highlight.directive.ts`

**O que apresentar:**
1. Abrir `highlight.directive.ts`
2. Mostrar o decorador `@Directive({ selector: '[appHighlight]' })`
3. Mostrar o `@HostBinding('style.transition')` — vincula propriedade de estilo ao elemento
4. Mostrar o `@HostListener('mouseenter')` — escuta o evento de mouse entrar
5. Mostrar o `@HostListener('mouseleave')` — escuta o evento de mouse sair
6. Abrir `home.page.html` e mostrar onde a diretiva é usada: `<ion-card appHighlight highlightColor="#4f8ef7">`
7. Demonstrar no app: passar o mouse sobre um card e mostrar o efeito visual

**Frase de efeito:** *"A diretiva é aplicada como atributo no HTML. Ela usa @HostBinding e @HostListener para reagir a eventos do mouse e mudar o estilo do elemento dinamicamente."*

---

### 👤 LUCAS — Req 6 Parte 2 (Diretivas Estruturais @if e @for)

**Arquivo:** `src/app/home/home.page.html`

**O que apresentar:**
1. Abrir `home.page.html`
2. Mostrar o `@if (isLoading)` — explica que verifica se está carregando antes de mostrar o spinner
3. Mostrar o `@if (books.length > 0)` — verifica se tem itens na lista antes de renderizar
4. Mostrar o `@for (book of books; track book.key)` — itera sobre a lista de livros da API
5. Mostrar o `@if (book.author_name && ...)` dentro do card — @if condicional dentro do @for
6. Abrir `detail.page.html` e mostrar o `@for` que lista os assuntos do livro
7. Demonstrar no app rodando a busca e vendo os cards aparecerem

**Frase de efeito:** *"O @for percorre a lista de livros que veio da API e renderiza um card para cada um. O @if controla o que aparece na tela dependendo do estado: se está carregando, se tem itens, se deu erro."*

---

### 👤 VITOR — Req 4 Parte 1 (Pipe Personalizado)

**Arquivo:** `src/app/pipes/book-pages.pipe.ts`

**O que apresentar:**
1. Abrir `book-pages.pipe.ts`
2. Mostrar o decorador `@Pipe({ name: 'bookPages', standalone: true })`
3. Mostrar o método `transform(pages: number | undefined): string`
4. Explicar a lógica: se não tiver páginas, retorna `"N/A páginas"`, senão retorna `"312 páginas"`
5. Abrir `home.page.html` e mostrar onde o pipe é usado: `{{ book.number_of_pages_median | bookPages }}`
6. Mostrar que o pipe foi importado no `imports[]` do componente em `home.page.ts`
7. Demonstrar no app mostrando a informação de páginas nos cards

**Frase de efeito:** *"O pipe personalizado recebe um número de páginas e formata para exibição. Quando não há dado, mostra 'N/A páginas' em vez de ficar vazio. É aplicado direto no HTML com o símbolo pipe ( | )."*

---

### 👤 MIQUEIAS — Req 4 Parte 2 (Pipe Built-in / Nativo)

**Arquivos:** `src/app/home/home.page.html` e `src/app/detail/detail.page.html`

**O que apresentar:**
1. Abrir `home.page.html`
2. Mostrar na linha do título da toolbar: `{{ 'book finder' | uppercase }}`
3. Mostrar nos títulos dos cards: `{{ book.title | uppercase }}`
4. Abrir `detail.page.html` e mostrar: `{{ 'Detalhes' | uppercase }}` e `{{ bookDetail.title | uppercase }}`
5. Mostrar em `home.page.ts` que `UpperCasePipe` está importado na lista `imports: [...]`
6. Explicar: *"O UpperCasePipe é um pipe nativo do Angular que já vem pronto, sem precisar criar nada"*
7. Demonstrar no app mostrando os títulos em maiúsculo

**Frase de efeito:** *"O UpperCasePipe é um pipe built-in do Angular. Não precisei criar nada, só importei o `UpperCasePipe` do `@angular/common` e usei direto no template com `| uppercase`."*

---

### 👤 MATHEUS — UI/UX, Estilização e Submissão

**Arquivos:** `src/app/home/home.page.scss`, `src/app/detail/detail.page.scss`, `src/theme/variables.css`

**O que apresentar:**
1. Mostrar o `src/theme/variables.css` — paleta de cores customizada com variáveis CSS do Ionic
2. Mostrar `home.page.scss` — estilização dos cards, cores, bordas, layout
3. Mostrar `detail.page.scss` — estilização da página de detalhes
4. Demonstrar o app rodando mostrando que **não é só o esqueleto** — tem estilo e identidade visual
5. Mostrar o repositório no GitHub com o projeto publicado
6. Mostrar o arquivo .zip postado no Teams

**Frase de efeito:** *"Usei os componentes padrão do Ionic combinados com SCSS customizado e variáveis de tema. A paleta foi definida em `variables.css` e aplicada em todo o app."*

---

## 🌐 API Utilizada

**Open Library Search API**
- URL: `https://openlibrary.org/search.json?q=tolkien&limit=20`
- Tipo: Pública, gratuita, **sem necessidade de token ou cadastro**
- Retorna: lista de livros com título, autor, ano, número de páginas e ID da capa
- Detalhe de obra: `https://openlibrary.org/works/{id}.json`

---

## 📝 Observações Finais

- Projeto usa **Angular 18 com Standalone Components** (sem NgModule)
- Todos os componentes, pipes e diretivas são `standalone: true`
- O `HttpClient` é provido via `provideHttpClient()` no `app.config.ts`
- O `IonApp` e `IonRouterOutlet` estão no `app.component.ts`
