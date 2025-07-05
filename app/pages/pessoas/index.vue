<template>
  <v-main class="pa-0">
    <!-- Header da Página -->
    <v-banner class="bg-grey-lighten-4" lines="one">
      <v-container>
        <v-row align="center" class="py-8">
          <v-col cols="12" md="6">
            <v-card-title class="text-h4 font-weight-bold mb-2 pa-0 text-primary">
              <v-icon class="mr-2 text-primary" aria-hidden="true">mdi-account-group</v-icon>
              Pessoas Registradas
            </v-card-title>
            <v-card-subtitle class="text-body-1 text-medium-emphasis pa-0">
              {{ totalPessoas }} pessoas documentadas na base genealógica
            </v-card-subtitle>
          </v-col>
          <v-col cols="12" md="6" class="text-md-end">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              prepend-icon="mdi-plus"
              @click="abrirFormulario"
            >
              Adicionar Pessoa
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-banner>

    <!-- Busca e Filtros -->
    <v-form class="py-6 bg-white border-b-thin">
      <v-container>
 
       
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="searchQuery"
              label="Buscar por nome, sobrenome ou apelido"
              placeholder="Digite para buscar..."
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              clearable
              class="mb-4 mb-md-0"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="ordenacao"
              :items="opcoesOrdenacao"
              label="Ordenar por"
              variant="outlined"
              hide-details
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <!-- Lista de Pessoas -->
    <v-container class="py-6">
      <!-- Indicador de carregamento -->
      <v-alert
        v-if="carregando"
        type="info"
        variant="text"
        class="text-center py-12"
      >
        <v-progress-circular
          indeterminate
          color="primary"
          size="64"
          class="mb-4"
        />
        <v-alert-title class="text-body-1 text-medium-emphasis">
          Carregando pessoas...
        </v-alert-title>
      </v-alert>

      <!-- Lista vazia -->
      <v-alert
        v-else-if="pessoasFiltradas.length === 0"
        type="warning"
        variant="text"
        class="text-center py-12"
      >
        <v-icon size="64" class="text-grey-lighten-1 mb-4">
          mdi-account-search
        </v-icon>
        <v-alert-title class="text-h6 font-weight-medium mb-2">
          Nenhuma pessoa encontrada
        </v-alert-title>
        <template #text>
          <p class="text-body-2 text-medium-emphasis">
            Tente ajustar os termos de busca ou adicione uma nova pessoa
          </p>
        </template>
      </v-alert>

        <!-- Grid de Pessoas -->
        <v-row v-else>
          <v-col
            v-for="pessoa in pessoasFiltradas"
            :key="pessoa.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
          >
            <v-card
              class="h-100 hover-lift"
              elevation="2"
              rounded="lg"
              hover
              @click="selecionarPessoa(pessoa)"
              variant="elevated"
            >
              <v-card-text class="pa-4">
                <!-- Avatar -->
                <v-card-item class="text-center mb-3 pa-0">
                  <v-avatar
                    size="64"
                    :color="'primary'"
                    class="mb-2 elevation-2"
                  >
                  
                    <v-icon color="white" size="32">
                      mdi-account
                    </v-icon>
                  </v-avatar>
                </v-card-item>

                <!-- Nome -->
                <v-card-title class="text-h6 font-weight-medium text-center mb-2 pa-0 text-primary">
                  {{ pessoa.nome }}
                </v-card-title>

                <!-- Informações -->
                <v-card-subtitle class="text-center text-body-2 text-medium-emphasis mb-3 pa-0">
                  <div v-if="pessoa.nascimento" class="d-flex align-center justify-center mb-1">
                    <v-icon size="16" class="mr-1">mdi-calendar</v-icon>
                    {{ new Date(pessoa.nascimento) }}
                  </div>
                  <div v-if="pessoa.local" class="d-flex align-center justify-center">
                    <v-icon size="16" class="mr-1">mdi-map-marker</v-icon>
                    {{ pessoa.local }}
                  </div>
                </v-card-subtitle>

                <!-- Ações -->
                <v-card-actions class="justify-center pa-0">
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    @click.stop="visualizarDetalhes(pessoa)"
                    class="elevation-1"
                  >
                    <v-icon>mdi-eye</v-icon>
                    <v-tooltip activator="parent">Ver detalhes</v-tooltip>
                  </v-btn>
                  <v-btn
                    icon
                    size="small"
                    variant="text"
                    @click.stop="adicionarParente(pessoa)"
                    class="elevation-1"
                  >
                    <v-icon>mdi-account-plus</v-icon>
                    <v-tooltip activator="parent">Adicionar parente</v-tooltip>
                  </v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Paginação -->
        <v-card-actions v-if="totalPaginas > 1" class="justify-center mt-8 pa-0">
          <v-pagination
            v-model="paginaAtual"
            :length="totalPaginas"
            :total-visible="7"
            rounded="circle"
          />
        </v-card-actions>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// SEO Meta
useSeoMeta({
  title: 'Pessoas - Genealogia de Araripina',
  description: 'Lista de pessoas registradas na base genealógica de Araripina. Busque por nomes, sobrenomes e descubra conexões familiares.',
  ogTitle: 'Pessoas - Genealogia de Araripina',
  ogDescription: 'Explore nossa base de dados genealógica e descubra pessoas da região de Araripina'
})

// Interfaces
interface Pessoa {
  id: string
  nome: string
  nascimento: string
  local?: string
  apelido: string
}

interface OpcaoOrdenacao {
  title: string
  value: string
}

// Reactive state
const route = useRoute()
const config = useRuntimeConfig()

const searchQuery = ref<string>(
  Array.isArray(route.query.q) 
    ? route.query.q[0] || '' 
    : route.query.q || ''
)
const ordenacao = ref('nome')
const paginaAtual = ref(1)
const carregando = ref(true)
const pessoas = ref<Pessoa[] | undefined>([])

pessoas.value = await getPeoples()

// Constants
const ITENS_POR_PAGINA = 12

// Data
const opcoesOrdenacao: OpcaoOrdenacao[] = [
  { title: 'Nome (A-Z)', value: 'nome' },
  { title: 'Nome (Z-A)', value: 'nome-desc' },
  { title: 'Mais recentes', value: 'recente' },
  { title: 'Mais antigos', value: 'antigo' }
]

// Computed properties
const pessoasFiltradas = computed(() => {
  let resultado = [...pessoas.value]

  // Filtrar por busca
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    resultado = resultado.filter(pessoa => 
      pessoa.nome.toLowerCase().includes(query) ||
      pessoa.apelido.toLowerCase().includes(query) ||
      pessoa.local?.toLowerCase().includes(query)
    )
  }

  // Ordenar
  resultado.sort((a, b) => {
    switch (ordenacao.value) {
      case 'nome-desc':
        return b.nome.localeCompare(a.nome)
      case 'recente':
        return new Date(b.nascimento).getTime() - new Date(a.nascimento).getTime()
      case 'antigo':
        return new Date(a.nascimento).getTime() - new Date(b.nascimento).getTime()
      default:
        return a.nome.localeCompare(b.nome)
    }
  })

  // Paginar
  const inicio = (paginaAtual.value - 1) * ITENS_POR_PAGINA
  return resultado.slice(inicio, inicio + ITENS_POR_PAGINA)
})

const totalPessoas = computed(() => pessoas.value.length)

const totalPaginas = computed(() => 
  Math.ceil(totalPessoas.value / ITENS_POR_PAGINA)
)

// Methods
const carregarPessoas = async (): Promise<void> => {
  try {
    carregando.value = true
    
    // Dados mock para desenvolvimento
  
    // TODO: Substituir por chamada real à API
    // const { data } = await $fetch(`${config.public.apiBase}/items/people`)
    // pessoas.value = data
    
  } catch (error) {
    console.error('Erro ao carregar pessoas:', error)
  } finally {
    carregando.value = false
  }
}

const formatarData = (ano: number): string => {
  return ano.toString()
}

const selecionarPessoa = (pessoa: Pessoa): void => {
  navigateTo(`/pessoas/${pessoa.id}`)
}

const visualizarDetalhes = (pessoa: Pessoa): void => {
  navigateTo(`/pessoas/${pessoa.id}`)
}

const adicionarParente = (pessoa: Pessoa): void => {
  // TODO: Implementar modal de adicionar parente
  console.log('Adicionar parente para:', pessoa.nome)
}

const abrirFormulario = (): void => {
  // TODO: Implementar modal de adicionar pessoa
  console.log('Abrir formulário de nova pessoa')
}

async function getPeoples(p: number = 1) {
  try {
    const data: { data: Pessoa[] } = await $fetch(`${config.public.apiBase}/items/people`, 
      { 
        params: { 
          fields: ['pai.nome', 'mae.nome', 'falecimento', 'apelido', 'falecido', 'nome', 'id', 'status'],
          limit: -1,
          page: p
        } 
      })

    return data.data

  } catch (error) {
    console.error('Erro ao carregar pessoas:', error)
  }
}


// Lifecycle
onMounted(() => {
  carregarPessoas()
})
</script>