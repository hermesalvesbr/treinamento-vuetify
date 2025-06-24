# Curso Intensivo 5 Dias – Projeto Árvore Genealógica (HTML Semântico, Vuetify 3.8, Nuxt 4)

Este curso prático de 5 dias (2 horas por dia) guiará desenvolvedores juniores na construção de um sistema público de **árvore genealógica** da cidade de Araripina. Vamos utilizar **Nuxt 4** (em modo de compatibilidade com a versão 4 futura), **Vuetify 3.8** como biblioteca de UI, **HTML semântico** para marcação acessível, e código **TypeScript** executando no ambiente Bun. O backend já está configurado usando **Directus 11** na nuvem (com login via GitHub), fornecendo APIs REST/GraphQL e autenticação pronta para uso. O frontend será implantado no **Cloudflare Pages** (com suporte a Workers para SSR).

O foco do curso é reforçar boas práticas: uso correto de HTML semântico, utilização de classes utilitárias do Vuetify 3.8 para estilização rápida, e fundamentos do Vue 3/Nuxt 4 de forma acessível. Estruturaremos o projeto seguindo princípios de Clean Architecture, separando lógica de negócio da interface. Cada dia trará instruções passo a passo, com exercícios práticos e soluções comentadas em Markdown.

## Dia 1 – Configuração do Projeto e HTML Semântico

**Objetivos do dia:** Preparar o ambiente de desenvolvimento, criar o projeto Nuxt com suporte a Vuetify, organizar a estrutura de pastas visando compatibilidade futura, e construir a página inicial com HTML **semântico** básico.

### 1.1 Preparando o Ambiente (Node/Bun e Ferramentas)

* **Instalar o Bun:** Caso não tenha, instale o runtime Bun (substituto do Node) seguindo a documentação oficial. Por exemplo, no Linux/Mac: `curl https://bun.sh/install | bash`. Verifique com `bun --version`. O Bun será usado como gerenciador de pacotes e servidor de desenvolvimento.
* **Iniciar projeto Nuxt:** Em uma pasta de trabalho, execute o comando de criação do Nuxt:

  ```bash
  bunx nuxi init genealogia-araripina
  ```

  Isso usará o utilitário `nuxi` para gerar um projeto Nuxt 3 padrão. Se for perguntado o gerenciador de pacotes, escolha **bun**.
* **Instalar dependências:** Entre no diretório do projeto (`cd genealogia-araripina`) e rode `bun install` para instalar as dependências iniciais.

### 1.2 Estrutura de Projeto com Nuxt 4 (Compatibilidade Futura)

Para garantir compatibilidade com o futuro Nuxt 4, ajustaremos a estrutura do projeto agora. A versão 4 do Nuxt (prevista para 2025) introduz uma nova estrutura de pastas usando um diretório raiz `app/` para o código da aplicação. Vamos adotar essa estrutura já no Nuxt 3:

1. **Ativar modo compatibilidade Nuxt 4:** Abra o arquivo `nuxt.config.ts` e adicione:

   ```ts
   export default defineNuxtConfig({
     future: {
       compatibilityVersion: 4
     },
     // ... outras configurações ...
   })
   ```

   Isso faz o Nuxt usar padrões da v4 (ex.: nova estrutura de diretórios).
2. **Mover pastas para `app/`:** Crie um diretório chamado `app` na raiz do projeto. Mova as pastas geradas (`components/`, `pages/`, `layouts/`, etc.) para dentro de `app/`. Após mover, a estrutura principal deve ficar assim:

   ```text
   app/
     components/
     layouts/
     pages/
     plugins/
     app.vue
   nuxt.config.ts
   ```

   Conforme a especificação do Nuxt 4, `app/` conterá os assets, componentes, páginas, etc., enquanto `nuxt.config.ts` e `server/` (caso exista lógica server) permanecem na raiz. *Obs:* O Nuxt detecta a presença de `app/` e ajusta automaticamente o comportamento; caso algo não funcione, confira se as pastas foram movidas corretamente.

### 1.3 Integrando Vuetify 3.8 ao Nuxt

Agora vamos adicionar o Vuetify (versão 3.8) para usar seus componentes UI e classes utilitárias.

* **Instalar pacotes Vuetify:** Rode:

  ```bash
  bun add vuetify@3.8 sass @mdi/font
  ```

  Isso instala o Vuetify, o pré-processador Sass (necessário para estilos do Vuetify) e o pacote de ícones Material Design (usado pelos componentes).
* **Configurar plugin do Vuetify:** Crie o arquivo `app/plugins/vuetify.ts` e adicione o seguinte conteúdo:

  ```ts
  import { defineNuxtPlugin } from '#app'
  import { createVuetify } from 'vuetify'
  import * as components from 'vuetify/components'
  import * as directives from 'vuetify/directives'

  export default defineNuxtPlugin((nuxtApp) => {
    const vuetify = createVuetify({
      ssr: true,
      components,
      directives,
    })
    nuxtApp.vueApp.use(vuetify)
  })
  ```

  Este plugin cria uma instância do Vuetify registrando todos os componentes e diretivas necessários, e integra no app Vue/Nuxt. Com `ssr: true`, ativamos suporte a server-side rendering.
* **Incluir estilos globais:** Edite `nuxt.config.ts` para importar os estilos do Vuetify e os ícones. Dentro do `defineNuxtConfig`, adicione:

  ```ts
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],
  build: {
    transpile: ['vuetify']
  }
  ```

  Isso garante que os estilos do Vuetify sejam aplicados e que o código do Vuetify seja transpilado adequadamente (necessário por usar ES modules/TypeScript).
* **Fonte padrão (opcional):** O Vuetify usa por padrão a fonte Roboto. Para carregá-la, podemos adicionar links no `<head>` via `app.vue` ou via configuração. Por exemplo, adicionar no `nuxt.config.ts`:

  ```ts
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap' }
      ]
    }
  }
  ```

  *(Fonte Roboto não é obrigatória, mas deixará o app com visual padrão do Material Design.)*

Após essas configurações, reinicie o servidor de dev se necessário: `bun --bun run dev` (o flag `--bun` assegura que o Nuxt use o runtime Bun para executar). Abra `http://localhost:3000` para verificar se o projeto carrega sem erros. Você deve ver a tela de boas-vindas padrão do Nuxt (ou possivelmente em branco se nenhum conteúdo definido).

### 1.4 Página Inicial com HTML Semântico

Com o ambiente pronto, vamos construir a página inicial do sistema, enfatizando **HTML semântico**. HTML semântico significa usar elementos adequados ao significado do conteúdo, melhorando acessibilidade e SEO. Por exemplo, usar `<header>` para cabeçalhos de página, `<nav>` para menus de navegação, `<main>` para conteúdo principal, `<section>`/`<article>` para agrupar conteúdo, `<footer>` para rodapé, e assim por diante. O uso correto de semântica traz benefícios como código mais fácil de manter, melhor performance em dispositivos móveis e melhor ranqueamento em buscadores.

Vamos criar uma estrutura básica com cabeçalho, conteúdo principal e rodapé:

* **Editar `app/app.vue`:** Este arquivo define o componente raiz da aplicação (layout padrão). Modifique-o para incluir um header, main e footer semânticos utilizando componentes do Vuetify:

  ```html
  <template>
    <v-app>
      <!-- Cabeçalho -->
      <v-app-bar color="primary" dark>
        <v-app-bar-title>Árvore Genealógica - Araripina</v-app-bar-title>
      </v-app-bar>

      <!-- Conteúdo principal -->
      <v-main class="pa-4">
        <NuxtPage /> <!-- Aqui as páginas serão injetadas -->
      </v-main>

      <!-- Rodapé -->
      <v-footer class="pa-4">
        <span>&copy; 2025 Cidade de Araripina</span>
      </v-footer>
    </v-app>
  </template>
  ```

  Explicação:

  * `<v-app-bar>` foi usado para o cabeçalho do site (estilizado com cor primária e texto claro). Internamente, esse componente do Vuetify representa semanticamente um **header** de aplicação (podemos assumir que possui papel de banner ou `<header>` equivalente).
  * `<v-main>` envolve o conteúdo principal da página, equivalente ao elemento `<main>` semântico. Adicionamos a classe utilitária `pa-4` (padding em todos os lados de 4 \* 8px = 32px) para dar espaçamento interno.
  * `<NuxtPage />` é o placeholder onde cada página será renderizada.
  * `<v-footer>` representa o rodapé do site (podemos considerá-lo similar a um `<footer>` semanticamente).
  * Usamos `<v-app>` para englobar toda a estrutura, conforme exigido pelo Vuetify para aplicar seu tema e contexto.

* **Criar conteúdo da página inicial:** Abra (ou crie) o arquivo `app/pages/index.vue`. Vamos inserir conteúdo introdutório utilizando tags semânticas HTML5:

  ```html
  <template>
    <section>
      <h1>Árvore Genealógica de Araripina</h1>
      <p>Bem-vindo ao sistema público de genealogia da cidade de Araripina. Aqui você pode pesquisar pessoas e famílias e descobrir graus de parentesco.</p>
      <div>
        <label for="search">Buscar indivíduo:</label>
        <input id="search" type="text" placeholder="Nome ou sobrenome" />
      </div>
    </section>
  </template>
  ```

  Detalhes importantes:

  * Usamos `<section>` para encapsular a seção principal de conteúdo da página.
  * `<h1>` serve como título da página (há apenas um `h1` por página para indicar o tópico principal).
  * Utilizamos `<p>` para texto de introdução.
  * Implementamos um pequeno formulário de busca: um `<label>` associado a um `<input>` de texto (`id="search"` no input e `for="search"` no label para acessibilidade). Isso segue boas práticas de acessibilidade, permitindo que leitores de tela associem o rótulo ao campo.
  * Note que usamos elementos HTML nativos aqui para exemplificar semântica; posteriormente podemos aprimorar esse input com componentes Vuetify, mas já garantimos uma base semântica correta.

📖 *Dica:* Escrever HTML semântico não exige esforço adicional se feito desde o início, e traz vantagens em acessibilidade e SEO. Por exemplo, usar um `<button>` genuíno para ações de clique (em vez de um `<div>` clicável) garante suporte nativo a teclado e leitor de tela. Sempre que possível, escolha tags que descrevam o significado do conteúdo. Isso torna o código mais legível e **fácil de manter**, beneficia **usuários móveis** (código mais leve) e melhora o **ranqueamento em mecanismos de busca**.

* **Visualizar na aplicação:** Salve as alterações e confira no navegador a página inicial. Deverá aparecer o título, texto de boas-vindas e o campo de busca. O estilo ainda está básico, mas já estamos empregando estrutura semântica correta.

### 1.5 Exercício Prático do Dia 1

**Tarefa:** Crie uma página "Sobre" para o projeto, utilizando HTML semântico. Em `app/pages/sobre.vue`, escreva um conteúdo que explique o propósito do sistema e as tecnologias usadas. Siga as orientações: use um `<article>` ou `<section>` para agrupar o texto, inclua um título adequado (`<h2>` ou outro nível apropriado, já que o `<h1>` foi usado na página inicial), e utilize parágrafos `<p>` para o conteúdo. Adicione também, no cabeçalho do site, um link de navegação para a nova página "Sobre".

*Dicas:*

* Você pode usar `<NuxtLink>` (com `to="/sobre"`) para criar links de navegação entre páginas no Nuxt.
* Envolva os links de navegação em um elemento `<nav>` para indicar semânticamente uma seção de menu.
* Mantenha o estilo consistente com o cabeçalho, podendo reutilizar o `<v-app-bar>` existente.

#### Solução do Exercício do Dia 1

Crie o arquivo `app/pages/sobre.vue` com o seguinte conteúdo:

```html
<template>
  <article>
    <h2>Sobre o Projeto</h2>
    <p>Este projeto foi desenvolvido para catalogar a árvore genealógica da cidade de Araripina. É um sistema público onde usuários convidados podem inserir e pesquisar indivíduos e famílias, descobrindo relações de parentesco.</p>
    <p>O frontend é construído com <strong>Nuxt 4</strong> (Vue 3) e <strong>Vuetify 3.8</strong>, utilizando HTML semântico e seguindo boas práticas de acessibilidade. O backend é provido pelo Directus 11 (um CMS headless) e a aplicação é implantada via Cloudflare Pages.</p>
  </article>
</template>
```

Explicação:

* Usamos `<article>` para delimitar um conteúdo independente sobre o projeto.
* `<h2>` foi escolhido para o título da seção, pois em hierarquia este é um título secundário (o da página principal era `h1`).
* O texto é dividido em parágrafos para facilitar a leitura.
* Foram adicionadas marcações como `<strong>` para destacar nomes de tecnologias.

Agora, edite o cabeçalho na `app/app.vue` para incluir links de navegação. Podemos atualizar o `<v-app-bar>` assim:

```html
<v-app-bar color="primary" dark>
  <v-app-bar-title>Árvore Genealógica - Araripina</v-app-bar-title>
  <nav class="ms-4">
    <NuxtLink to="/" class="me-3" style="text-decoration:none; color: inherit;">Início</NuxtLink>
    <NuxtLink to="/sobre" style="text-decoration:none; color: inherit;">Sobre</NuxtLink>
  </nav>
</v-app-bar>
```

Aqui, adicionamos um elemento `<nav>` contendo dois `<NuxtLink>`: um para "Início" e outro para "Sobre". Utilizamos classes utilitárias do Vuetify/Bootstrap (`ms-4` para margem à esquerda no nav, `me-3` para margem à direita no link "Início") para espaçamento horizontal. Também aplicamos um estilo inline simples para remover sublinhado e preservar a cor do texto (por estarem dentro de um app-bar dark, a cor herdada é branca, assim os links aparecem em branco).

Abra o site e verifique:

* O cabeçalho agora exibe o título e os links "Início" e "Sobre". Clicar em "Sobre" deve navegar para a nova página, exibindo o conteúdo informativo criado.
* A estrutura permanece semântica: `<nav>` indica área de navegação, `<article>` na página sobre indica um conteúdo independente sobre o projeto.

Com isso, encerramos o Dia 1, tendo configurado o projeto e aplicado conceitos de HTML semântico na estrutura básica do app.

## Dia 2 – Interfaces com Vuetify e Classes Utilitárias

**Objetivos do dia:** Desenvolver a interface de busca e listagem de pessoas/famílias usando componentes do Vuetify 3.8, e estilizar o layout rapidamente com utilitários CSS do Vuetify. Reforçaremos conceitos de Vue 3 (Bindings, reatividade e composição) ao implementar a funcionalidade de busca no frontend.

### 2.1 Componentes Vuetify e Utilitários de Estilo

No Dia 1 utilizamos principalmente HTML nativo. Agora vamos aproveitar os **componentes Vuetify** para melhorar a UI. Vuetify 3.8 traz uma variedade de componentes (listas, botões, ícones, etc.) e um conjunto de **classes utilitárias CSS** que agilizam o design (similar a utility classes do Tailwind). Essas classes facilitam aplicar **espaçamentos**, layouts flex, tamanhos, cores, etc, sem escrever CSS manualmente. Por exemplo, `ma-2` adiciona margem *all* de 16px (2 \* 8px), `px-4` adiciona padding horizontal de 32px, `d-flex` torna um elemento um container flex, `justify-center` centraliza conteúdo, `align-end` alinha ao final, etc. Elas seguem uma escala de 8px por unidade e podem ser combinadas para obter espaçamentos consistentes.

Antes de codificar, vamos planejar as funcionalidades obrigatórias e como dividir a interface:

* **Busca de indivíduos e famílias:** teremos um campo de busca que filtra uma lista de pessoas e possivelmente outra lista de famílias.
* **Listagem de resultados:** exibir resultados de pessoas e/ou famílias correspondentes.
* **Convites:** permitir que usuários convidem parentes (ex.: botão "Convidar primo").
* (Os recursos de análise de parentesco e conexões complexas serão tratados no Dia 4.)

Para simplificar, começaremos com foco na lista de **indivíduos**. Depois podemos pensar em famílias separadamente.

### 2.2 Lista de Pessoas (com Dados Simulados)

Enquanto não conectamos ao backend (isso será no Dia 3), podemos simular alguns dados de pessoas para construir a interface. Vamos criar uma página de listagem de pessoas e integrar com o campo de busca.

* **Criar Página de Pessoas:** Crie o arquivo `app/pages/pessoas/index.vue`. Este será acessível via `/pessoas` e mostrará todos os indivíduos cadastrados (por ora, dados fictícios).
* **Simular dados:** Dentro da `<script setup>`, defina uma lista reativa com alguns objetos representando pessoas. Cada objeto pode ter `id`, `nome` e talvez ano de nascimento para demonstrar múltiplos campos.

Exemplo de implementação em `pages/pessoas/index.vue`:

```html
<template>
  <section>
    <h2>Lista de Indivíduos</h2>
    
    <!-- Campo de busca -->
    <v-text-field v-model="searchQuery" label="Buscar pessoa" prepend-icon="mdi-magnify" hide-details="auto" />
    
    <!-- Lista de resultados -->
    <v-list>
      <v-list-item 
        v-for="person in filteredPeople" :key="person.id" 
        @click="selectPerson(person)"
      >
        <v-list-item-avatar>
          <v-icon color="primary">mdi-account-circle</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ person.nome }}</v-list-item-title>
          <v-list-item-subtitle>Nasc.: {{ person.nascimento }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <!-- Botão de convidar primo (por exemplo) -->
          <v-btn icon="mdi-account-plus" @click.stop="inviteRelative(person)" :title="'Convidar parente de ' + person.nome"></v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Person {
  id: number;
  nome: string;
  nascimento: number;
}

const people = ref<Person[]>([
  { id: 1, nome: "Ana Silva", nascimento: 1980 },
  { id: 2, nome: "Bruno Souza", nascimento: 1992 },
  { id: 3, nome: "Carlos Lima", nascimento: 1975 },
  // ...adicione mais conforme necessário
])

const searchQuery = ref('')

const filteredPeople = computed(() => {
  if (!searchQuery.value) {
    return people.value
  }
  const query = searchQuery.value.toLowerCase()
  return people.value.filter(p => p.nome.toLowerCase().includes(query))
})

// Ações (a implementar posteriormente)
const selectPerson = (person: Person) => {
  // ex: navegar para página de detalhes (implementaremos depois)
  navigateTo(`/pessoas/${person.id}`)
}
const inviteRelative = (person: Person) => {
  alert(`Convite enviado para parente de ${person.nome}! (Simulação)`)
}
</script>
```

Vamos entender o código acima:

* No template, usamos **componentes Vuetify**:

  * `<v-text-field>` para o campo de busca, com `v-model="searchQuery"` conectando ao estado reativo `searchQuery`. Atribuímos um ícone de lupa (`mdi-magnify`) e um rótulo. `hide-details="auto"` oculta mensagens de erro/ajuda quando não necessárias.
  * `<v-list>` e `<v-list-item>` para criar uma lista. Utilizamos `v-for` para iterar sobre `filteredPeople` (lista computada de pessoas filtradas).
  * Dentro de cada item, usamos `<v-list-item-avatar>` com um ícone de usuário (`mdi-account-circle`) para ilustrar uma pessoa. Depois `<v-list-item-content>` com título e subtítulo exibindo nome e ano de nascimento.
  * `<v-list-item-action>` contém um botão de ação - no caso, um botão de convite (ícone de adicionar usuário). Repare no `@click.stop` no botão: usamos `.stop` para evitar que o clique no botão acione também o `@click` do item (que selecionaria a pessoa). Ou seja, clicando no ícone de convite, não navegaremos para detalhes, apenas trataremos o convite.

* No script, definimos:

  * Uma interface TypeScript `Person` para tipar nossos objetos (id, nome, nascimento).
  * `people`: um ref (reativo) contendo um array de pessoas simuladas.
  * `searchQuery`: um ref para a string de busca inserida.
  * `filteredPeople`: um `computed` que retorna a lista filtrada conforme o `searchQuery`. Fazemos case-insensitive match do texto da busca com o nome da pessoa.
  * Funções `selectPerson` e `inviteRelative` para tratar cliques. Por ora, `selectPerson` navega para uma rota de detalhe (usando `navigateTo` do Nuxt, que é similar ao `useRouter().push`) – a página de detalhes será implementada depois. `inviteRelative` simula o envio de convite com um `alert` (posteriormente ligaremos isso à funcionalidade real).

* **Estilização com utilitários:** Note que, além das classes utilitárias já usadas (`pa-4`, `ms-4`, etc.), podemos melhorar a aparência:

  * Envolva o `<v-list>` em um contêiner com classe utilitária para limitar largura e centralizar. Por exemplo:

    ```html
    <div class="mx-auto mt-4" style="max-width: 600px;">
      ... <v-list> ... </v-list> ...
    </div>
    ```

    Aqui `mx-auto` centraliza horizontalmente (margens auto) e `mt-4` dá margem-top de 32px. A largura máxima de 600px evita que a lista fique muito longa em telas grandes, melhorando legibilidade.
  * Adicionamos `mt-4` também no campo de busca talvez, para separar do título.

  *Exemplo atualizado do template com melhorias de layout:*

  ```html
  <section>
    <h2 class="mb-3">Lista de Indivíduos</h2>
    <v-text-field 
      v-model="searchQuery" label="Buscar pessoa" prepend-icon="mdi-magnify"
      hide-details="auto" class="mb-4"
    />
    <div class="mx-auto" style="max-width: 600px;">
      <v-list>
        <!-- ...items... -->
      </v-list>
    </div>
  </section>
  ```

  Aqui usamos `mb-3` (margin-bottom 24px) no título e `mb-4` (32px) no campo de busca, para espaçamento vertical adequado. O container `.mx-auto` com max-width limita a largura da lista.

* **Testar a Busca:** Execute o projeto e navegue até `http://localhost:3000/pessoas`. A lista de indivíduos simulados deve aparecer. Teste digitar letras no campo "Buscar pessoa": a lista deverá filtrar em tempo real mostrando apenas os nomes que contêm a substring. Por exemplo, buscar "Br" deve exibir apenas "Bruno Souza". Isso confirma o binding reativo via `v-model` e o cálculo em `computed`.

### 2.3 Melhorando a UI e Navegabilidade

Vamos integrar a nova página de pessoas com o restante do site:

* **Adicionar link no menu:** Edite novamente o cabeçalho em `app/app.vue` para incluir um link de navegação para "Pessoas":

  ```html
  <NuxtLink to="/pessoas" style="text-decoration:none; color: inherit;">Pessoas</NuxtLink>
  ```

  Coloque esse link no `<nav>` junto com "Início" e "Sobre" (por exemplo, antes de "Sobre"). Assim os usuários podem acessar a lista de indivíduos facilmente.

* **Página inicial:** Podemos reutilizar o campo de busca da home para redirecionar para a página de pessoas mostrando os resultados. Uma abordagem simples: quando o usuário pressionar Enter no input da página inicial, navegar para `/pessoas` levando a query. No input HTML puro isso exigiria JS para capturar o evento. Uma ideia mais avançada é transformar o input inicial num componente de busca global, mas por simplicidade, poderíamos mencionar ao usuário: "Use a aba Pessoas para buscar registros".

(Se preferir, poderia fazer um refinamento: substituir o `<input>` simples da home por um `<v-text-field>` e, no evento @keydown.enter, fazer `navigateTo('/pessoas?q=' + searchTerm)`. Depois, em `pages/pessoas/index.vue`, ler esse query param via useRoute e iniciar `searchQuery` com ele. Deixamos isso como opcional, pois envolve mais detalhes de Nuxt routing.)

* **Botão "Convidar":** Repare que adicionamos um ícone de convite (contorno de pessoa com +) em cada item da lista. Por enquanto ele só mostra um alert. No dia 4 integraremos isso para acionar o sistema de convite real. Mas visualmente, temos um botão icônico em cada linha. Você pode adicionar um pequeno **tooltip** (usamos prop `title` no `<v-btn>` que mostra texto ao pairar, indicando "Convidar parente").

* **Responsividade:** Os componentes Vuetify já são responsivos. Nossas classes utilitárias também suportam sufixos para breakpoints, por exemplo `d-md-flex` (só aplicar flex em telas médias e acima) ou `mb-sm-4` (margem-bottom 32px em telas pequenas). Até agora não usamos muitos sufixos, mas saiba que existem e podem ajudar em refinamentos.

Até aqui, a interface de listagem e busca de pessoas está funcional localmente (ainda com dados fake). Observamos o uso de:

* **Componentes**: `<v-text-field>`, `<v-list>` etc.
* **Classes utilitárias do Vuetify** para espaçamento e layout rápido, evitando escrever CSS. Essas utilities seguem padrão consistente (escala de 0 a 12, onde 1 = 8px).
* **Reatividade Vue 3**: usamos `ref()` e `computed()` para gerenciar estado e derivar filtragem reativamente.
* **TypeScript**: definimos uma interface Person para garantir que nossos objetos tenham as propriedades esperadas, ajudando o editor/compilador a pegar erros cedo.

### 2.4 Exercício Prático do Dia 2

**Tarefa:** Melhore a interface adicionando um componente de botão de convite global e aplicando utilitários Vuetify para aprimorar o layout:

1. **Botão "Convidar Parente":** Insira no cabeçalho do site (provavelmente no `<v-app-bar>` ao lado do título ou links) um botão Vuetify que, ao clicar, simule a ação de convidar um novo membro. Use um ícone apropriado (por exemplo, `mdi-email-plus` ou `mdi-account-plus`) e um rótulo. O botão deve se destacar (por exemplo, cor secundária) e ficar alinhado à direita.
2. **Estilização com Grid/Colunas:** Na página de pessoas, reorganize os elementos usando o sistema de grid do Vuetify. Por exemplo, coloque o campo de busca e a lista em colunas distintas em desktops (campo de busca em uma coluna menor à esquerda e lista à direita), mas empilhados no mobile. *Dica:* Você pode usar `<v-row>` e `<v-col>` com prop `cols="..."` ou breakpoints (`<v-col cols="12" md="4">` para busca, `<v-col cols="12" md="8">` para lista).
3. **Visualização de famílias:** (Opcional/desafio) Crie uma seção ou página para listar **famílias**. Isso poderia ser similar à lista de pessoas, mas agrupando pessoas por sobrenome ou mostrando pares de pais. Sem dados reais, você pode simular algo como: lista de sobrenomes mais frequentes, ou "Família Silva (42 membros)", "Família Souza (37 membros)". Use `<v-list>` ou `<v-card>`s para apresentar essas informações.

#### Solução do Exercício do Dia 2

1. **Botão "Convidar Parente":** Vamos adicionar o botão no cabeçalho. Editando `app/app.vue`:

   ```html
   <v-app-bar color="primary" dark>
     <v-app-bar-title>Árvore Genealógica - Araripina</v-app-bar-title>
     <v-spacer></v-spacer> <!-- empurra itens subsequentes para direita -->
     <v-btn color="secondary" class="me-4" prepend-icon="mdi-account-plus">
       Convidar
     </v-btn>
     <nav> ...links... </nav>
   </v-app-bar>
   ```

   Explicação: adicionamos `<v-spacer>` para ocupar espaço flexível, empurrando o botão e os links para o lado direito do app-bar. O `<v-btn>` tem cor secundária (destacando do fundo primário) e um ícone de usuário com + antes do texto. Aplicamos `class="me-4"` para margem à direita de 16px, separando do menu de links. (Você poderia também envolver o botão e os links juntos dentro de um `<nav>` ou `<div class="d-flex align-center">` se preferir agrupá-los.)
   Resultado: O topo do site agora tem um botão "Convidar" à direita; clicá-lo por enquanto não faz nada (poderia disparar um modal de convite, mas implementaremos lógica depois).

2. **Layout responsivo com Grid:** Na página `/pessoas/index.vue`, vamos usar a grid Vuetify para dispor a busca e a lista:

   ```html
   <v-row>
     <v-col cols="12" md="4">
       <v-text-field ... class="mb-4" />
     </v-col>
     <v-col cols="12" md="8">
       <v-list class="mx-auto" style="max-width: 600px;">
         ... lista de pessoas ...
       </v-list>
     </v-col>
   </v-row>
   ```

   Aqui, `<v-row>` cria uma linha flexível. Definimos dois `<v-col>` (colunas):

   * O primeiro ocupa 12 colunas em telas XS (mobile) ou seja, largura total, e 4 colunas em telas MD (médias) ou maiores. Contém o campo de busca.
   * O segundo ocupa 12 colunas em XS (vai para baixo do primeiro no mobile) e 8 colunas em MD+ (ficando ao lado do primeiro). Contém a lista.
     O total 4+8 = 12, ou seja, em telas médias a busca ocupará 1/3 da largura e a lista 2/3, lado a lado. Em telas pequenas, são blocos empilhados verticalmente. Mantivemos a classe `mx-auto` e `max-width` na lista para não ficar muito larga.
     Essa mudança melhora o uso do espaço em desktops e mantém boa usabilidade no mobile.

3. **Lista de famílias (opcional):** Uma possível implementação simples:

   * Criar `app/pages/familias/index.vue` com:

     ```html
     <template>
       <section>
         <h2>Famílias</h2>
         <v-list>
           <v-list-item v-for="familia in familias" :key="familia.sobrenome">
             <v-list-item-title>{{ familia.sobrenome }}</v-list-item-title>
             <v-list-item-subtitle>{{ familia.membros }} membros</v-list-item-subtitle>
           </v-list-item>
         </v-list>
       </section>
     </template>
     <script setup>
     const familias = [
       { sobrenome: 'Silva', membros: 42 },
       { sobrenome: 'Souza', membros: 37 },
       { sobrenome: 'Lima', membros: 29 }
     ]
     </script>
     ```
   * Adicionar um link "Famílias" no menu de navegação do cabeçalho.
     Isso exibiria uma lista simples de sobrenomes e quantos membros em cada (dados fictícios). O ideal seria integrar com dados reais do Directus (que fornecerá relações familiares), o que faremos em seguida.

Agora a interface está mais completa: temos **menu** com Início, Pessoas, Famílias, Sobre; **campo de busca** integrado com listagem; **botão de convite** evidente; e layout responsivo aprimorado. Tudo isso usando os recursos do Vuetify e boas práticas de HTML/CSS semântico e utilitário.

## Dia 3 – Integração com Backend Directus (Dados Reais)

**Objetivos do dia:** Conectar o frontend ao backend Directus 11 para carregar dados reais de pessoas e famílias, substituindo os mocks. Implementar busca utilizando a API e preparar terreno para funcionalidades de login/invite. Também vamos discutir brevemente como o Directus está configurado (coleções e permissões) para entender a comunicação.

### 3.1 Configurando Acesso à API do Directus

O Directus oferece uma API REST pronta para cada coleção de dados. Vamos supor que no Directus temos pelo menos:

* Uma coleção **people** (indivíduos) com campos como: `id`, `nome` (nome completo), `nascimento` (data ou ano de nascimento), possivelmente relacionamentos para parentes (pai, mãe, cônjuge, etc).
* Uma coleção **families** (famílias) ou alguma forma de agrupar pessoas (pode ser uma coleção representando núcleos familiares ou sobrenomes).

**Permissões:** Por padrão, os dados do Directus são privados. Para nosso aplicativo público poder ler os dados sem exigir login imediato, devemos habilitar permissões de leitura para o *role* público nas coleções relevantes (People, Families). Isso pode ser feito no Directus Studio, e permite acesso aberto aos endpoints GET dessas coleções. *Nota:* Apenas dados públicos serão acessíveis assim; convites e modificações ainda requerem autenticação, o que é adequado.

Com permissões ajustadas, não precisamos enviar token de autenticação para obter os dados de listagem. Podemos usar diretamente a URL da API.

**Endpoint base:** Digamos que o projeto Directus na nuvem esteja em `https://araripina.directus.app` (exemplo). Os endpoints seriam:

* `GET /items/people` – retorna lista de pessoas.
* `GET /items/people/{id}` – retorna dados de uma pessoa específica.
* `GET /items/families` – retorna lista de famílias (se aplicável).
* E assim por diante, conforme nomes das coleções.

Vamos integrar isso no Nuxt:

* **Configurar URL do Directus no projeto:** Uma boa prática é armazenar a URL em uma variável de ambiente. Crie um arquivo `.env` na raiz (adicionado no `.gitignore`) com:

  ```
  NUXT_PUBLIC_API_BASE=https://araripina.directus.app
  ```

  O prefixo `NUXT_PUBLIC_` expõe a variável no front. Reinicie `npm run dev` (ou `bun run dev`) para garantir que o Nuxt carregue essa var.
* **Utilitário de requisição:** Podemos usar o composable `$fetch` do Nuxt (baseado em ofetch) ou `useFetch` para SSR. Como queremos que a página já venha com dados server-side, usaremos `useFetch` dentro do setup.

### 3.2 Listando Pessoas via API Directus

Vamos modificar a página de pessoas para carregar dados reais da API:

Em `app/pages/pessoas/index.vue` (dentro do `<script setup>`), substitua o mock pela chamada fetch:

```ts
const { data: peopleData, pending, error } = await useFetch(
  `${process.env.NUXT_PUBLIC_API_BASE}/items/people`
)
// `peopleData` will be a ref (reactive) containing the response.
```

Após essa linha, `peopleData.value` deve conter algo como `{ data: [ {...person1}, {...person2}, ... ] }` de acordo com a estrutura da resposta Directus. Vamos extrair a lista de pessoas:

```ts
const people = ref<Person[]>([])
if (peopleData.value && 'data' in peopleData.value) {
  people.value = peopleData.value.data as Person[]
}
```

Aqui assumimos que a interface `Person` corresponde aos campos retornados (podemos ajustar se os nomes diferem). Certifique-se que o nome das propriedades bate: talvez no Directus o campo nome seja "name" em vez de "nome". Ajuste a interface ou mapeie conforme necessário.

Com isso, nossa lista reativa `people` passa a ser preenchida com dados do backend. Todo o resto (computed `filteredPeople`, template) continua funcionando, mas agora reflete dados reais.

**Observação de SSR:** Ao usar `useFetch` como acima, Nuxt fará a requisição no lado do servidor durante a renderização inicial, então a página já chega ao cliente com os dados (evitando carregamento extra). O indicador `pending` poderia ser usado para mostrar um spinner enquanto carrega, mas para simplicidade podemos ignorar ou adicionar um pequeno `v-progress-circular` se quisermos.

* **Testar:** Inicie o servidor e acesse `/pessoas`. Você deverá ver a listagem de pessoas vindas do Directus. (No ambiente real, isso depende do Directus estar populado; se estiver vazio, talvez exiba nada). Verifique no console/network se a requisição para `/items/people` ocorreu e foi bem-sucedida. Em caso de erro (por exemplo, CORS ou permissão), reveja a URL e config do Directus:

  * Se CORS: talvez habilitar no Directus ou usar proxy. (Directus Cloud geralmente habilita CORS para requests públicas, então deve funcionar).
  * Se 403 Forbidden: cheque permissões público.
  * Se 404: cheque o endpoint (coleção existe? nome correto?).

**Filtro de busca pela API (Opcional):** Atualmente filtramos no cliente. Para bases muito grandes, poderíamos fazer buscas diretamente na API usando query params (e.g. `?filter[nome][_contains]=texto`). Directus também oferece um param global `search` que busca em todos campos de texto. Exemplo: `/items/people?search=Ana`. Contudo, para fins didáticos manteremos o filtro no cliente e usaremos a API para dados brutos.

### 3.3 Listando Famílias via API

Se o Directus tiver uma coleção de famílias, podemos integrá-la similarmente na página `/familias`. Suponha que a coleção **families** possua campos `id`, `sobrenome` ou `nome` da família, e talvez contagem ou relação de membros.

Em `pages/familias/index.vue`:

```ts
const { data: famData } = await useFetch(`${process.env.NUXT_PUBLIC_API_BASE}/items/families`)
const families = ref([])
if (famData.value && 'data' in famData.value) {
  families.value = famData.value.data
}
```

E adapte o template para iterar `families` em vez do array fixo.

Caso não haja uma coleção pronta de famílias, outra abordagem: derivar famílias dos indivíduos (por exemplo, agrupar por sobrenome). Isso poderia ser feito no cliente com JavaScript, mas não faremos aqui por não estar explicitamente pedido.

### 3.4 Página de Detalhes de Pessoa

Vamos criar a página dinâmica para exibir detalhes de um indivíduo selecionado, cumprindo parte da funcionalidade de explorar família e parentes.

* **Criação da página dinâmica:** Crie o arquivo `app/pages/pessoas/[id].vue`. A sintaxe `[id]` indica uma rota dinâmica em Nuxt; acessos a `/pessoas/1`, `/pessoas/2`, etc, cairão nesse componente com `$route.params.id`.

No conteúdo, podemos mostrar informações básicas da pessoa (nome, nascimento, possivelmente outros campos como cidade, etc.) e links ou listas de parentes imediatos (pais, filhos, cônjuge).

Implementação básica de `[id].vue`:

```html
<template>
  <section v-if="person">
    <h2>{{ person.nome }}</h2>
    <p>Nascimento: {{ person.nascimento || 'N/D' }}</p>
    <div class="mt-4">
      <h3>Relações Familiares</h3>
      <ul>
        <li v-if="person.pai">Pai: {{ person.pai.nome }}</li>
        <li v-if="person.mae">Mãe: {{ person.mae.nome }}</li>
        <li v-if="children.length">Filhos: 
          <ul>
            <li v-for="child in children" :key="child.id">{{ child.nome }}</li>
          </ul>
        </li>
        <!-- ... outros relacionamentos ... -->
      </ul>
    </div>
  </section>
  <section v-else>
    <p>Carregando...</p>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

interface PersonDetails extends Person {
  pai?: Person;
  mae?: Person;
  // outros campos relacionais se existirem
}

const route = useRoute()
const personId = route.params.id

// Buscar dados da pessoa pelo ID, incluindo pai, mãe e filhos
const { data: personData } = await useFetch(`${process.env.NUXT_PUBLIC_API_BASE}/items/people/${personId}`, {
  query: {
    fields: "*,pai.nome,mae.nome"
  }
})
const person = ref<PersonDetails | null>(null)
if (personData.value && 'data' in personData.value) {
  person.value = personData.value.data as PersonDetails
}

// Buscar filhos desta pessoa (supondo campo pai_id ou mae_id relacionando)
const { data: childrenData } = await useFetch(`${process.env.NUXT_PUBLIC_API_BASE}/items/people`, {
  query: {
    filter: { 
      "pai": personId  // supondo 'pai' é um campo relacional 
    },
    fields: "id,nome"
  }
})
const children = ref<Person[]>([])
if (childrenData.value && 'data' in childrenData.value) {
  children.value = childrenData.value.data as Person[]
}
</script>
```

Explicação:

* Usamos `useRoute()` para obter o `id` atual da URL.
* Primeiro `useFetch` pega os dados da pessoa. Usamos a query param `fields` para pedir ao Directus os campos relacionados: `pai.nome` e `mae.nome`. Isso supõe que no Directus há relacionamentos self-referenciados chamados "pai" e "mae" ligando a pessoa a seus genitores. Directus permite expandir relações assim na query (se os campos existem e estão configurados).
* Armazenamos em `person` (ref reativa). Agora `person.value` tem a pessoa incluindo possivelmente sub-objetos pai e mae (com apenas nome carregado devido ao fields).
* Em seguida, outro fetch busca filhos onde `pai == personId`. Isso também supõe que cada pessoa tem um campo pai (ID do pai). Se também houver campo mãe, ideal seria filtrar ambos. Para simplicidade, filtramos só por pai. (Numa implementação real, buscar filhos por pai OU mãe requer lógica extra ou dois calls.)
* Preenchemos `children` com o resultado (lista de Person com id e nome).
* No template, exibimos:

  * Nome e nascimento.
  * Lista de relações: se `person.pai` existe, mostra nome do pai; similar para mãe.
  * Lista de filhos, se houver. (Aqui fazemos nested `<ul>` para listar filhos.)
  * Podemos adicionar mais, como cônjuge (caso haja campo) ou irmãos (que seriam crianças do mesmo pai/mãe, poderia derivar do children do pai excluindo a própria pessoa).
* Se `person` ainda não carregou (antes da fetch resolver), mostramos "Carregando..." (poderia ser um spinner).

*N.B.:* A implementação exata depende do modelo de dados no Directus. Os nomes de campos e como as relações estão definidas podem variar. Adapte de acordo com o esquema real (por exemplo, `pai_id` em vez de `pai`, etc., e ajuste a query `filter` e `fields`). Aqui ilustramos o conceito assumindo campos relacionais diretos.

* **Testar navegação detalhe:** Agora, na página de listagem de pessoas, ao clicar em um item, chamamos `selectPerson(person)` que faz `navigateTo('/pessoas/'+person.id)`. Essa rota deve exibir a página de detalhes com as informações daquela pessoa. Teste clicar em alguns nomes. Você deve ver o nome, nascimento e se a API trouxe, os nomes de pai/mãe e lista de filhos (se aplicável). Caso não haja relacionamentos configurados ou dados preenchidos, as seções podem ficar vazias (nesse caso, ajuste o template para lidar quando `person.pai` não existe, etc., como fizemos com `v-if`).

### 3.5 Sistema de Convite (visão geral)

Uma das funcionalidades é o **sistema de acesso por convite** – por exemplo, convidar um primo para contribuir. No contexto Directus, isso seria tratado via a API de usuários:

* Um administrador (ou um fluxo backend) pode usar o endpoint **POST `/users/invite`** do Directus para enviar um email de convite. Esse convite cria um usuário com status "invited". O email contém um link com token; quando o convidado se cadastra (define senha), o token ativa o usuário.
* Para nosso frontend, podemos implementar um formulário onde o usuário insere o email do convidado e aciona essa API. *Contudo*, a chamada à `/users/invite` exige autenticação de admin ou permissão adequada, pois cria usuários. Provavelmente não queremos expor isso diretamente no cliente público.

**Abordagem possível:** Criar um **endpoint server-side** (por exemplo, uma API route Nuxt ou uma função serverless) que receba o email e acione o invite usando um token de admin do Directus (segurança). Outra abordagem: usar as *Flows* do Directus ou webhooks. Mas tudo isso é avançado para nosso escopo.

Para fins didáticos, podemos simular o processo ou simplesmente descrever como seria:

* Ao clicar no botão "Convidar", abrir um diálogo pedindo o email do convidado.
* No submit, chamar uma função (que poderíamos integrar ao backend no futuro).
* Exibir mensagem de sucesso.

Não implementaremos toda a lógica, mas vamos deixar o front preparado:
No exercício anterior, já adicionamos um botão de convite no cabeçalho. Poderíamos torná-lo funcional com um modal:

**Extra (opcional):** Poderíamos usar o componente `<v-dialog>` do Vuetify para um pop-up. Dentro, um `<v-form>` com `<v-text-field label="Email do convidado">` e botoões "Enviar" e "Cancelar". Ao enviar, chamar um método `inviteByEmail(email)` que faria um `$fetch` POST para nosso (futuro) endpoint. Mas como não criamos esse endpoint aqui, deixaremos sem funcionalidade real. Ainda assim, apresentamos a ideia para fins de completude.

### 3.6 Exercício Prático do Dia 3

**Tarefa:** Integrar a página de famílias com dados reais (ou derivados) e preparar a ação de convite:

* Utilize a API do Directus para preencher a lista de famílias em `/familias`. Se não houver coleção families, agrupe os indivíduos por sobrenome no front e exiba a contagem por grupo.
* Implemente no botão "Convidar" (cabeçalho) a abertura de um diálogo solicitando o email. Você pode usar `window.prompt` simples para simular (ex: `const email = prompt('Informe o email do parente a convidar')`) e então exibir um alerta de sucesso.
* Verifique as páginas criadas (Pessoas e detalhes) com dados reais do Directus. Ajuste quaisquer discrepâncias de nomes de campos ou endpoints até tudo funcionar.

#### Solução do Exercício do Dia 3

1. **Lista de famílias via API:** Supondo que haja a coleção *families*, já mostramos como usar `useFetch`. Uma melhoria: exibir também quantos membros cada família tem. Se a API não fornece diretamente, poderíamos contar associando pessoas às famílias. Uma solução no front: após obter `families`, para cada família, contar pessoas cujo campo `familia` (id) corresponda. Como isso pode ser custoso, o ideal é que o Directus tenha um campo calculado ou agregação. Mas, para demonstrar, poderíamos:

   ```ts
   const { data: allPeopleData } = await useFetch(`${base}/items/people?fields=familia`)
   const peopleList = allPeopleData.value?.data || []
   families.value = families.value.map(fam => {
     const count = peopleList.filter(p => p.familia === fam.id).length
     return { ...fam, membros: count }
   })
   ```

   E no template usar `fam.membros`.
   Isso faz 2 chamadas (pega todas pessoas e todas famílias) – aceitável para volumes pequenos.

   *Caso sem collection families:* Podemos derivar sobrenomes:

   ```ts
   const sobrenomesMap = {} as Record<string, number>
   peopleList.forEach(p => {
     const lastName = p.nome.split(' ').slice(-1)[0]
     sobrenomesMap[lastName] = (sobrenomesMap[lastName] || 0) + 1
   })
   families.value = Object.entries(sobrenomesMap).map(([sobrenome, count]) => ({ sobrenome, membros: count }))
   ```

   Isso criaria uma lista de sobrenomes com contagem.

   Em resumo, existem várias abordagens; escolha conforme os dados disponíveis.

2. **Ação do botão Convidar:** Implementação simples:
   No `app/app.vue` script:

   ```js
   const inviteUser = () => {
     const email = window.prompt("Informe o e-mail do parente a convidar:")
     if (email) {
       // Aqui chamaríamos a API de convite; vamos simular sucesso:
       alert(`Convite enviado para ${email} (verifique seu e-mail).`)
     }
   }
   ```

   E no template do botão:
   `<v-btn ... @click="inviteUser">Convidar</v-btn>`.

   Isso proporciona uma experiência mínima: ao clicar, aparece um prompt para digitar o email, e depois um alerta. Na prática, integraríamos com o backend. Mas assim já indicamos ao usuário que um convite seria enviado. *(Obs: para não confundir, usamos uma função global simples; em aplicação real, preferiríamos um diálogo bonitinho em vez de prompt.)*

3. **Testes e ajustes:**

   * Acesse `/familias` e veja se a listagem aparece corretamente (se testou com derivação de sobrenome, confira se faz sentido).
   * Teste o botão "Convidar": insira um email. Deve mostrar o alerta simulado.
   * Revise a página de detalhes de pessoa para ver se campos como `person.pai.nome` funcionam. Caso os nomes de campos no Directus sejam diferentes, ajuste o parâmetro `fields` e uso de `personData`. Por exemplo, se o campo pai for `father` no schema, usar `fields: "*,father.nome"` e `person.value.father.nome` no template.
   * Se a API Directus requer autenticação para esses GETs (devido a configuração), você teria que usar um token público ou role; mas conforme dito, definindo permissões públicas de leitura isso não deve ser necessário.

Neste ponto, temos o frontend conectado ao backend: a página **Pessoas** traz dados do Directus, a página **Famílias** também (ou calcula), e a página de **Detalhes** mostra parentesco imediato. Já é um mini sistema funcional de consulta genealógica!

## Dia 4 – Lógica Avançada: Grau de Parentesco e Conexões Complexas

**Objetivos do dia:** Implementar a lógica para calcular automaticamente o grau de parentesco entre duas pessoas e identificar conexões familiares complexas (como casamentos cruzados, ancestrais comuns distantes, etc.). Essa parte é desafiadora e envolve algoritmos de grafos. Vamos focar em explicar a abordagem e criar uma função utilitária, testando com alguns exemplos.

### 4.1 Modelagem de Parentesco como Grafo

Uma **árvore genealógica** pode ser vista como um **grafo**: cada pessoa é um nó, e relações (pai->filho, casamento) são arestas conectando nós. Para descobrir o parentesco entre duas pessoas A e B, podemos encontrar o caminho no grafo que liga A até B. Por exemplo:

* A -> ... -> X <- ... <- B, onde X é um ancestral comum. O caminho passa pelos ascendentes de A até X e depois desce até B.
* Ou A -> cônjuge -> ... -> B, etc., considerando laços matrimoniais.

Para encontrar o **menor caminho** entre A e B no grafo familiar, podemos usar **busca em largura (BFS)**. O BFS vai camada por camada e encontrará a conexão com menos "passos" (arestas). Cada passo pode ser subir de filho para pai, ou descer de pai para filho, ou atravessar para cônjuge. A quantidade de passos mínima dá o *grau de separação*.

No entanto, traduzir o número de passos para o nome do parentesco requer análise:

* Se A e B estão conectados por 1 passo:

  * 1 passo ascendente: pai/mãe <-> filho/filha (grau de parentesco de 1º grau).
  * 1 passo lateral (cônjuge): marido <-> esposa (não se define em grau de sangue, mas é relação de afinidade).
* 2 passos:

  * A -> pai -> B (2 passos sendo um ascendente e um descendente): então A é avô/avó de B, e B é neto(a) de A.
  * A -> irmão/irmã <- B (A -> pai <- B): 2 passos passando por um pai comum: irmãos (parentesco colateral de 2º grau, pois irmãos em linha reta é 2º grau civil).
* Mais passos:

  * 3 passos: poderia ser tio/tia e sobrinho (A -> pai -> filho = sobrinho), etc.
  * 4 passos: primos de primeiro grau (A -> pai -> avô <- pai <- B: compartilham avô, são **primos de 1º grau**).
  * 6 passos: primos de segundo grau (compartilham bisavô: 2 ascendentes cada um, total 4 passos ascensão + 2 descendentes = 6 arestas) – chamados de "primos de segundo grau".

Em geral, se duas pessoas compartilham um ancestral comum:

* Se cada uma está **n** gerações distante desse ancestral, e não há ancestral comum mais próximo, então elas são **primos de (n-1)º grau**, possivelmente com "removed" se níveis diferentes. Ex: ancestral comum 3 gerações acima de cada -> primos de 2º grau.
* Se uma está a n gerações e outra a m gerações do ancestral comum (n != m), então a relação é desigual (ex: se um é pai do outro ancestral, etc). Por exemplo, se ancestral comum é avô de A (2 gen) e bisavô de B (3 gen), então B é sobrinho-neto de A (A é tio-avô de B).

Isso pode ficar complexo de programar em todos casos. Vamos focar em alguns casos pedidos:

* **Primo de segundo grau:** Tipicamente significa que compartilham bisavós (tataravós não, bisavô sim) – ou seja, são **primos de primeiro dos pais**. Em termos de grafo, distância = 6 como citado.
* **Tio-avô:** É o irmão do avô/avó de alguém. A é tio-avô de B se A é irmão de um dos avós de B. Em grafo: A -> pai (ancestral comum) -> filho (avô de B) -> filho (B). Isso é 3 arestas: A -> seu pai (X), X -> filho (Y, avô de B), Y -> B. BFS encontraria caminho A -> (irmão) Y -> B com 2 passos se considerarmos "irmão" uma relação lateral derivada (A -> X <- Y e Y -> B – 3 passos via X, ou se considerarmos irmão como direto?). Simplificando: grau civil do tio-avô é 3º grau.

Uma forma de implementar:

* Construir um grafo das pessoas: para cada pessoa, definir conexões:

  * pai e mãe (se existem) – ligação bidirecional (filho->pai e pai->filho).
  * cônjuge (se existe) – ligação bidirecional.
* Usar BFS para achar o caminho mínimo entre A e B.
* Analisar o caminho:

  * Extrair sequência de relações (ex: \[A, paiDeA, avôComum, paiDeB, B]).
  * Interpretar:

    * Contar quantos "subir" (de criança para pai) e quantos "descer" (de pai para filho) e se há trocas laterais (cônjuges, irmãos).
    * Se o caminho sobe k passos de A para o ancestral comum e desce m passos até B:

      * Se k==0 ou m==0 (um é ancestral do outro): então relação direta ascend/descend. Ex: se A subiu 0 (A é anc comum) e desceu 2 até B => B é neto de A (A é avô). Se A subiu 1 e B 0 => A é pai de B.
      * Se k==m (>0): então são primos. Se k=m=2 => primos de primeiro grau (compartilham avô), k=m=3 => primos de segundo grau (compartilham bisavô).
      * Se k != m e ambos >0: então são primos "removed". Ex: se k=1, m=2 => A é tio de B (primos de 0º? Na verdade A é irmão do avô de B = tio-avô).

        * A heurística: se diferença = 1, provavelmente tio/ sobrinho; diferença = 2, tio-avô/ sobrinho-neto; etc.

Devido à complexidade, vamos implementar uma versão simplificada da função que distingue alguns casos comuns:

```ts
function relationshipName(personAId: number, personBId: number, graph: Record<number, number[]>) {
  // graph: adjacência simples (ids conectados via parent/child/spouse)
  if (personAId === personBId) return "Mesma pessoa";

  // BFS para achar distâncias
  const visited = new Set<number>()
  const queue: Array<{id: number, dist: number, pred: number | null}> = [{ id: personAId, dist: 0, pred: null }]
  let foundNode: {id: number, dist: number, pred: number | null} | null = null

  while (queue.length) {
    const node = queue.shift()!
    if (node.id === personBId) {
      foundNode = node
      break
    }
    visited.add(node.id)
    for (const neighbor of graph[node.id] || []) {
      if (!visited.has(neighbor)) {
        queue.push({ id: neighbor, dist: node.dist + 1, pred: node.id })
        visited.add(neighbor)
      }
    }
  }

  if (!foundNode) return "Sem relação direta encontrada"
  
  const dist = foundNode.dist
  // Baseado apenas na distância:
  if (dist === 1) {
    // Um passo: pode ser pai/mãe/filho ou cônjuge ou irmão (caso irmão: pai comum mas BFS não distingue tipo)
    // Precisaríamos contexto para diferenciar, mas assumindo:
    // Podemos verificar se há relação de parental ou conjugal:
    // (Omite implementação detalhada aqui)
    return "Parentesco de 1º grau"
  } else if (dist === 2) {
    // Dois passos: pode ser avô/avó <-> neto, ou irmãos.
    return "Parentesco de 2º grau (possível avô<->neto ou irmãos)"
  } else if (dist === 3) {
    // Três passos: tio/tia <-> sobrinho, ou bisavô<->bisneto
    return "Parentesco de 3º grau (ex: tio e sobrinho)"
  } else if (dist === 4) {
    return "Primos de 1º grau"
  } else if (dist === 6) {
    return "Primos de 2º grau"
  } else {
    return `Possível parentesco complexo com distância de ${dist} passos`
  }
}
```

A função acima usa BFS para encontrar a distância em arestas entre A e B. Depois, inferimos rudimentarmente o parentesco pelo número de passos, usando suposições:

* 4 passos -> primos de primeiro grau (ex.: A->pai->avô<-pai<-B).
* 6 passos -> primos de segundo grau.
* 3 passos -> tio/sobrinho.
* etc.

Essa é uma simplificação grosseira, pois BFS não distingue se subimos ou descemos no caminho. Uma melhoria seria durante BFS armazenar também se foi "subida" ou "descida" para cada passo. Porém, para nosso curso introdutório, focamos na ideia.

### 4.2 Integração no Frontend (Análise de Parentesco)

Podemos disponibilizar essa função no frontend para o usuário testar graus de parentesco:

* Por exemplo, na página de detalhes de pessoa, permitir selecionar outra pessoa para comparar parentesco.

Implementação simples: em `[id].vue`, adicionar um seletor (dropdown ou input) para escolher outra pessoa (talvez via um `<v-autocomplete>` com lista de nomes). Ao selecionar, chamar a função `relationshipName` e exibir o resultado.

Exemplo (adição na seção de detalhes):

```html
<div class="mt-4">
  <h3>Calcular Parentesco</h3>
  <v-autocomplete :items="peopleOptions" v-model="selectedPersonId" label="Selecione outra pessoa" />
  <v-btn color="primary" @click="calcParentesco">Analisar Parentesco</v-btn>
  <p v-if="grauParentesco">{{ grauParentesco }}</p>
</div>
```

Script (dentro de `<script setup>` de `[id].vue`):

```ts
import { onMounted } from 'vue'
const peopleOptions = ref<{ label: string, value: number}[]>([])
const selectedPersonId = ref<number|null>(null)
const grauParentesco = ref<string>('')

onMounted(async () => {
  // Fetch lista de pessoas para preencher opções (poderia usar as já carregadas em outra página, mas para garantir atualizamos)
  const res = await $fetch(`${process.env.NUXT_PUBLIC_API_BASE}/items/people?fields=id,nome`)
  if (res.data) {
    peopleOptions.value = res.data.map((p: any) => ({ label: p.nome, value: p.id }))
  }
})

const calcParentesco = () => {
  if (selectedPersonId.value) {
    grauParentesco.value = relationshipName(person.value!.id, selectedPersonId.value, grafo)
  }
}
```

Aqui `relationshipName` é a função BFS que definimos e `grafo` seria o objeto de adjacências. Para montá-lo, podemos reutilizar dados:

* Podemos montar um grafo simples de parentesco básico a partir do Directus: percorrer `peopleOptions` e para cada pessoa incluir conexões pai/mãe/cônjuge se tiver. Talvez, melhor, chamar um endpoint que dê toda a árvore, mas faremos local:

  ```ts
  const grafo: Record<number, number[]> = {}
  // Preencher grafo: para cada person em res.data, se tem pai (idPai), faça grafo[p.id].push(idPai) e grafo[idPai].push(p.id), etc. Similar p.mãe, p.cônjuge.
  ```

  Precisaríamos que cada person na lista tenha campos de ids de pai, mãe, etc. Isso implica pedir via API todos com esses campos (ex: `fields=id,pai,pai.id,mae.id,conjuge.id` – se existe conjugal).
  Para simplificar, omitimos implementação detalhada. Suponha que de alguma forma construímos `grafo`.

Uma vez que `grafo` exista, a função `calcParentesco` usa o ID atual (`person.value.id`) e o escolhido para calcular.

**Nota:** Devido ao tempo e complexidade, se os dados de parentesco não estão todos disponíveis, esta parte pode ser mais teórica. Em um curso real, poderíamos fornecer um dataset pequeno dentro do front só para demonstrar a função de parentesco.

### 4.3 Conexões Familiares Complexas

Conexões complexas referem-se a casos como:

* **Casamentos cruzados:** ex: dois irmãos de uma família casam-se com duas irmãs de outra família – resultando em filhos que são "duplamente primos" (compartilham ambos pares de avós). Isso criaria múltiplos caminhos no grafo entre as pessoas (o BFS ainda achará o menor, mas existem caminhos alternativos).
* **Ancestral comum múltiplo:** ex: consanguinidade, famílias que se cruzam várias vezes.
* **Adoção:** relações não-sanguíneas podem ser marcadas de forma diferente.

Identificar isso automaticamente é complexo. Poderíamos, por exemplo, detectar se entre duas pessoas existem *dois* ancestrais comuns distintos no pedigree – indicando casamento de primos no passado, etc.

No nosso contexto, podemos mencionar:

* O sistema pode detectar **loops** no grafo (onde uma pessoa acaba sendo relacionada por mais de um caminho). Por exemplo, se BFS encontrar duas diferentes rotas curtas, isso indica uma conexão familiar complexa (p. ex., "Seu pai e sua mãe já eram parentes distantes antes do casamento").
* Essas análises vão além do escopo básico, mas um algoritmo de busca de múltiplos caminhos ou de interseção de conjuntos de ancestrais poderia ser empregado.

Para não deixar em aberto: poderíamos fornecer ao menos uma mensagem se detectar que duas pessoas têm mais de um ancestral comum:

* Pegar lista de ancestrais de A (até certo nível) e de B. Se encontrar dois ou mais nomes repetidos => "Conexão familiar múltipla detectada (possível casamento cruzado ou parentesco por múltiplas vias)".

### 4.4 Exercício Prático do Dia 4

**Tarefa:** Implementar e testar a função de cálculo de parentesco:

* Escreva a função `relationshipName` no arquivo `app/utils/kinship.ts` (ou no próprio script da página de detalhes) que receba duas pessoas e retorne uma string com o parentesco provável.
* Use casos de teste conhecidos para verificar: por exemplo, no dataset, identifique duas pessoas que sejam **primos de primeiro grau** e veja se a função retorna adequadamente.
* Tente identificar no grafo alguma conexão complexa (se tiver dados). Por exemplo, se encontrar que X é primo de Y por parte de pai e também por parte de mãe (casamento cruzado entre famílias), pode retornar algo como "Conexão dupla: primos por dois lados".

#### Solução do Exercício do Dia 4

Implementamos a função simplificada de parentesco:

```ts
// utils/kinship.ts
export function relationshipName(a: number, b: number, graph: Record<number, number[]>) {
  if (a === b) return "É a mesma pessoa";
  // BFS para distância
  const visited = new Set<number>()
  const queue: Array<{ id: number, dist: number }> = [{ id: a, dist: 0 }]
  while (queue.length) {
    const { id, dist } = queue.shift()!
    if (id === b) {
      // Encontrou B
      if (dist === 0) {
        return "Mesma pessoa"
      } else if (dist === 1) {
        return "Parentesco de 1º grau (pai/mãe/filho ou cônjuge)"
      } else if (dist === 2) {
        return "Parentesco de 2º grau (irmãos, avós ou netos)"
      } else if (dist === 3) {
        return "Parentesco de 3º grau (tio/tia e sobrinho, bisavós ou bisnetos)"
      } else if (dist === 4) {
        return "Primos de primeiro grau (compartilham avós)"
      } else if (dist === 6) {
        return "Primos de segundo grau (compartilham bisavós)"
      } else {
        return `Parentesco com distância de ${dist} ligações (complexo)`
      }
    }
    visited.add(id)
    for (const vizinho of (graph[id] || [])) {
      if (!visited.has(vizinho)) {
        queue.push({ id: vizinho, dist: dist + 1 })
        visited.add(vizinho)
      }
    }
  }
  return "Não há relação aparente"
}
```

Explicação: É similar ao desenvolvido anteriormente. Ela retorna frases baseadas no número de passos encontrados.

**Testes rápidos:**

* Suponha no dataset Araripina, a pessoa de ID 10 e ID 15 sejam primos de primeiro grau. BFS provavelmente retornaria dist=4 se a estrutura estiver completa. Então `relationshipName(10,15, graph)` -> "Primos de primeiro grau (compartilham avós)".

* Se testarmos alguém com seu avô, dist=2 (pessoa->pai->avô), retorna "Parentesco de 2º grau (avós ou netos)". Talvez poderíamos especializar a mensagem, mas ok.

* Um caso de tio e sobrinho: pessoa->pai->filho(B) = 2 arestas? Na verdade tio->pai comum->sobrinho é 2 passos (tio->pai comum, pai comum->sobrinho) BFS considera tio->pai (1) + pai->sobrinho (2) = 2, o que cairia em 2º grau (não diferenciando de avô), mas nosso texto "irmãos, avós ou netos" não menciona tios. Podemos ajustar: dist=2 também inclui tios? Vamos analisar:

  * A (tio) -> X (avô de B, pai de A) e X -> B (pai de B). Erro: se A é tio de B, A->pai (que é avô de B) =1, depois avô->B = 2, total 2. Então dist=2 para tio-sobrinho. Então sim, dist=2 englobou tio<->sobrinho também. Nosso texto genericamente disse "irmãos, avós ou netos". Poderíamos incluir "tios e sobrinhos" também no de 2º grau, já que civilmente tio-sobrinho é 3º grau, mas em nosso dist simplificado deu 2. Vemos limitações, mas informaremos genericamente.

* **Detecção de conexões múltiplas:** Este algoritmo não explicitamente detecta multiplas rotas. Para isso, teríamos que buscar um segundo caminho independente. Poderíamos rodar BFS novamente ignorando o primeiro ancestral comum encontrado... isso fica complexo. Mas se quiséssemos:

  * Uma ideia: encontrar *todos* ancestrais comuns de A e B até certa profundidade. Se mais de um comum distinto aparecer no conjunto de ancestrais, sinaliza casamento cruzado. Essa implementação seria offline (subir lista de ancestors de A e B e intersectar).
  * Exemplo: se ascendentes de A incluem João (bisavô) e ascendentes de B também incluem João e além disso outro nome Maria (que é ascendentes de ambos por outra linha). Então tem dois ancestrais comuns diferentes -> provavelmente parentesco duplo.
  * Poderíamos então alertar: "A e B têm mais de um ancestral comum - conexão familiar múltipla detectada.".

Deixaremos essa detecção descritiva: "Se o grafo mostra múltiplos caminhos ou ancestrais comuns, podemos identificar **casamentos cruzados** ou laços familiares múltiplos, mas isso requer análise adicional."

### 4.5 Conclusão do Dia 4

Hoje implementamos uma abordagem algorítmica para analisar parentesco. Apesar de simplificada, introduzimos conceitos de grafos e BFS na genealogia. Na prática, bibliotecas especializadas ou lógica mais elaborada seria necessária para cobrir todos os casos (por ex.: distinguir *primo-irmão* de *tio-avô* adequadamente). Também discutimos conexões complexas, entendendo que quando há **múltiplos ancestrais comuns** ou casamentos entre famílias, o grafo genealógico apresenta *ciclos*, indicando parentesco por mais de um caminho. Nesses cenários, nosso sistema poderia alertar o usuário sobre o parentesco múltiplo, embora não detalhamos essa implementação por completo.

## Dia 5 – Refinamento, Boas Práticas e Implantação

**Objetivos do dia:** Refatorar e organizar o projeto conforme Clean Architecture, adicionar quaisquer ajustes finais de acessibilidade/semântica, e implantar o projeto no Cloudflare Pages. Revisaremos as decisões tomadas para garantir compatibilidade futura e facilidade de manutenção.

### 5.1 Refatoração e Organização (Clean Architecture)

Vamos estruturar o código em camadas lógicas, seguindo princípios de **Clean Architecture**:

* **Entidades/Modelos (Domínio):** tipos e interfaces fundamentais (ex.: `Person`, `Family`), regras de negócio puras (ex.: função de cálculo de parentesco pode ser vista como parte do domínio).
* **Caso de Uso/Serviços:** lógica que orquestra operações; ex.: um serviço `FamilyTreeService` que contém métodos para obter pessoas do Directus, enviar convite, etc. Essas funções interagem com infraestruturas externas (API Directus) mas fornecem uma interface simples ao restante do app.
* **Interface (UI):** componentes Vue/Nuxt que exibem dados e capturam interações, chamando os serviços/casos de uso conforme necessário.
* **Infra (Gateway/API):** módulos específicos para comunicação com APIs externas (ex.: configurarmos um client do Directus ou utilizarmos `$fetch` diretamente nos serviços).

No contexto Nuxt, podemos implementar isso organizando o diretório `app`:

* Criar talvez uma pasta `app/composables/` ou `app/services/`:

  * `usePeople.ts`, `useFamilies.ts` – composables que encapsulam o fetching de pessoas/famílias. Por exemplo, `usePeople` poderia usar `useFetch` internamente e retornar a lista de pessoas e estado de loading.
* Mover a função de parentesco para `app/utils/kinship.ts` (já sugerido), separando do componente.
* Definir tipos (interfaces) em um arquivo único (`app/types/models.ts`) ou em contextos relevantes.

Exemplo de um composable de serviço simples:

```ts
// app/composables/useDirectus.ts
export const useDirectus = () => {
  const apiBase = process.env.NUXT_PUBLIC_API_BASE
  const listPeople = () => useFetch(`${apiBase}/items/people`)
  const getPerson = (id: number, fields?: string) => useFetch(`${apiBase}/items/people/${id}`, { query: { fields } })
  // ... outras chamadas (inviteUser, etc, que requereriam auth)
  return { listPeople, getPerson }
}
```

Isso centraliza as chamadas à API Directus. Poderíamos injectar autenticação aqui se necessário no futuro.

No **front**, os componentes então usam esses composables:

```ts
const { listPeople } = useDirectus()
const { data: peopleData, pending, error } = await listPeople()
```

Em vez de repetirmos URLs em cada componente, ganhamos um nível de abstração.

**Organização de diretórios sugerida:**

```
app/
  pages/...
  components/...
  composables/
    useDirectus.ts
    useInvite.ts (ex: lida com convite de usuário via Directus)
  utils/
    kinship.ts
  types/
    models.d.ts (export interface Person {...}, etc.)
```

*(Nuxt 3 permite `.d.ts` para declarar tipos globais ou a gente pode usar `export interface` e importar onde precisa.)*

Essa modularização segue a ideia de separar **domínio** (tipos, lógica pura) de **infra** (chamadas API) e de **UI** (componentes). Fica mais fácil de manter e testar.

### 5.2 Boas Práticas de Código e Acessibilidade

Revisemos alguns pontos para melhoria contínua:

* **HTML Semântico & A11y:** Checar se todas as imagens têm `alt` descritivo, todos inputs têm `<label>` associado (ou `aria-label`). Por exemplo, se tivéssemos fotos de perfil, usaríamos `<v-img src="..." alt="Foto de Fulano">`. Os componentes Vuetify geralmente são acessíveis por padrão, mas é bom validar com ferramentas (Lighthouse, axe) se há problemas.
* **Headings hierárquicos:** As páginas devem ter um h1 único (nossa página inicial tem h1, outras páginas têm h2 como título principal, o que está ok já que o layout da aplicação inteira pode considerar o nome do site como h1 global). Mantenha ordem de `<h2>..<h3>` sem pular indevidamente.
* **Contraste de cores:** Nosso esquema primary/secondary do Vuetify já cuida disso, mas certifique-se de bom contraste entre texto e fundo.
* **Feedback de carregamento:** Implementar loading spinners (ex.: `<v-progress-circular>`) nas páginas que fazem fetch pode melhorar UX. Ex: mostrar spinner enquanto `pending` de useFetch é true.
* **Tratar erros de API:** Exibir mensagens amigáveis se `error` for set (por exemplo, "Falha ao carregar dados, tente novamente mais tarde."). Atualmente ignoramos erro ou log no console apenas.

Aplicando alguns:

```html
<div v-if="pending">
  <v-progress-circular indeterminate color="primary" />
</div>
<div v-else>
  <v-list>...</v-list>
</div>
<div v-if="error">
  <p class="error">Erro ao carregar os dados. Por favor, verifique sua conexão.</p>
</div>
```

Assim, o usuário não fica olhando tela vazia se a rede estiver lenta.

* **Pinia para estado global:** Para uma app maior, poderia usar Pinia (store) para guardar a lista de pessoas carregadas, evitando refetch ao navegar entre páginas. No nosso caso, useFetch com SSR não é tão custoso e mantivemos simples. Mas saber que Pinia existe é bom (Nuxt 3 tem integração out-of-box para Pinia se criado).

### 5.3 Compatibilidade Futura (Nuxt 4)

Como configuramos `compatibilityVersion: 4` e já usamos o novo layout de pastas (`app/`), nosso projeto está alinhado com o Nuxt 4 alpha. Isso significa:

* Quando o Nuxt 4 for lançado oficialmente (estimado em Q2 2025), esperamos migrar sem grandes mudanças estruturais. Já adotamos `app/` em vez de `pages/` root, etc., então nosso código não depende de recursos legados.
* Ficar atento aos changelogs: por exemplo, se no Nuxt 4 mudar algo na forma de usar `useFetch` ou outros APIs, seguir as *migration steps*, mas até agora usamos principalmente recursos estáveis (Composition API, defineNuxtConfig).
* Atualização das dependências: garantir que Vuetify continue compatível com Nuxt 4 (o Vuetify 3.8 já funciona em Nuxt 3.x; para Nuxt 4 não deve ter problemas, possivelmente precisaremos atualizar Vuetify se sair versão nova).

Em suma, o projeto está **futuramente compatível** devido às escolhas de estrutura e uso de padrões modernos.

### 5.4 Implantação no Cloudflare Pages

Finalmente, hora do **deploy** 🚀. Recapitulando setup:

* Repositório GitHub (ou GitLab) com nosso código. Inclua o `.npmrc` ou `.yarnrc` se necessário, mas usando Bun, podemos simplesmente rodar build via Bun também.
* Cloudflare Pages: vá ao painel Pages, crie um novo projeto conectado ao repo.
* **Configurações de build:**

  * Build command: `npm run build` ou `bun run build`. (No `package.json`, o script "build" provavelmente já roda `nuxt build`).
  * Ou diretamente `nuxt build` se preferir.
  * Set the Node version to 16 (Cloudflare recommends Node 16 in Pages functions for now). Você pode criar um arquivo `.nvmrc` com "16" para ajudar CF a usar Node 16.
  * Output folder: by default, Nuxt build for SSR outputs a `.output/public` for static and a worker script for functions. Mas Cloudflare Pages detecta isso automaticamente com preset.

Nuxt possui integração out-of-the-box: ele detecta que está em Cloudflare Pages e ajusta Nitro (o servidor SSR) para gerar uma função worker. Como dito na documentação:

* Se usar integração Git, **nenhuma config extra é necessária**. Apenas certifique-se que o comando de build está certo. Cloudflare vai rodar `nuxt build` e implantar. Nitro configurará preset Cloudflare automaticamente.
* Para SSR edge, não usar `nuxt generate` (que faria SSG). Use `nuxt build` mesmo.
* Após o deploy, Cloudflare Pages terá seu app rodando com SSR nas Cloudflare Workers (distribuído globalmente, rápido).

**Variáveis de ambiente em produção:** Adicione a `NUXT_PUBLIC_API_BASE` no painel do Pages (Settings > Environment Variables) para que em build e runtime ela tenha o valor correto do endpoint Directus.

Após o deploy, teste a URL pública:

* A página inicial deve carregar.
* Teste as rotas de pessoas, famílias.
* A funcionalidade de busca e detalhes via SSR devem funcionar (pode testar sem cache para ver se SSR está buscando do Directus corretamente).
* Aproveite para rodar ferramentas de performance e acessibilidade (Cloudflare + Nuxt geralmente dão ótimo desempenho e boas notas no Lighthouse; nosso uso de componentes e algumas imagens/ícones não deve impactar muito).

### 5.5 Considerações Finais

Parabéns! Em 5 dias, construímos um projeto full-stack do zero, praticando:

* **HTML semântico e acessibilidade**, crucial para desenvolver aplicações web de qualidade.
* **Vuetify 3.8**, aplicando componentes prontos e utilitários CSS para ganhar produtividade e consistência visual.
* **Nuxt 3/4**, entendendo a estrutura de projeto, data fetching SSR, rotas dinâmicas, e preparando para futuras versões com compatibilidade garantida.
* **Integração com backend headless (Directus)**, consumindo APIs REST para dados real-time, e utilizando permissões adequadamente para segurança.
* **Algoritmos de parentesco**, transformando um problema do mundo real em lógica computacional (grafos e BFS) e vendo suas aplicações.
* **Clean Architecture**, organizando nosso código para ser escalável e fácil de manter, separando camadas de responsabilidade.

Ao final, obtivemos um sistema de árvore genealógica funcional: usuários podem pesquisar pessoas/famílias, ver relações e (em potencial) convidar novos membros. O código está preparado para crescer – por exemplo, poderíamos adicionar autenticação de usuários para edição de dados, ou visualizar a árvore de forma gráfica usando um componente de **tree view** (o Vuetify tem `<v-treeview>` que poderia mostrar descendência de forma hierárquica).

**Próximos passos e dicas:**

* Implementar de fato o fluxo de convite com segurança (provavelmente requer uma Cloud Function ou utilitário no Directus).
* Melhorar a análise de parentesco com todos os graus e casos (este é um ótimo desafio de programação!).
* Adicionar testes unitários para funções (ex.: testar que `relationshipName` retorna correto para cenários conhecidos).
* Manter documentação (um README no repositório explicando setup, env vars, etc., ajuda colaboradores).

Boa sorte e bons estudos! Continue praticando e aprimorando o projeto – a melhor forma de aprender é "colocar a mão na massa" constantemente.

**Referências Utilizadas:**

* Documentação do Vuetify (componentes e utilities).
* Documentação do Nuxt 3/4 (estrutura de diretórios, deploy no Cloudflare).
* Documentação do Directus (API de itens e convites).
* Artigo sobre genealogia e algoritmos de grafos.
* MDN sobre HTML acessível e semântico.

Todas essas nos ajudaram a fundamentar as decisões e implementar seguindo as melhores práticas atuais.

FIM.
