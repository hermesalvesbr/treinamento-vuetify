<template>
  <v-main class="pa-0">
    <!-- Hero Section -->
    <v-banner class="bg-blue-darken-3 text-white" lines="two">
      <v-container>
        <v-row align="center" style="min-height: 400px;">
          <v-col cols="12" md="6">
            <v-card-item class="pa-0">
              <v-card-title class="text-h3 font-weight-bold mb-4 pa-0 text-white">
               <h1 class="text-h3">Genealogia de Araripina</h1>
              </v-card-title>
              <v-card-subtitle class="text-h6 font-weight-light mb-6 pa-0 text-blue-lighten-4" style="white-space: normal;">
                Descubra suas raízes e explore a rica história familiar 
                do sertão pernambucano
              </v-card-subtitle>
              
              <!-- Busca Principal -->
              <v-form 
                class="mb-4" 
                @submit.prevent="executarBusca"
              >
                <v-card 
                  class="pa-4" 
                  rounded="lg" 
                  elevation="8"
                  color="white"
                >
                  <v-text-field
                    v-model="searchTerm"
                    label="Buscar pessoa ou família"
                    placeholder="Digite um nome ou sobrenome..."
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    @keydown.enter="executarBusca"
                    class="mb-2"
                  />
                  <v-btn
                    color="primary"
                    size="large"
                    block
                    type="submit"
                    :disabled="!searchTerm.trim()"
                    variant="elevated"
                  >
                    Buscar
                  </v-btn>
                </v-card>
              </v-form>
            </v-card-item>
          </v-col>
          
          <v-col cols="12" md="6" class="text-center">
            <v-icon 
              size="200" 
              class="text-white text-opacity-20"
            >
              mdi-family-tree
            </v-icon>
          </v-col>
        </v-row>
      </v-container>
    </v-banner>

    <!-- Estatísticas -->
    <v-container class="py-12">
      <v-row>
        <v-col 
          v-for="stat in estatisticas" 
          :key="stat.title"
          cols="12" 
          sm="6" 
          md="3"
        >
          <v-card 
            class="text-center h-100 hover-lift"
            elevation="2"
            rounded="lg"
            variant="elevated"
          >
            <v-card-item class="pa-6">
              <v-icon 
                :color="stat.color" 
                size="48" 
                class="mb-4"
              >
                {{ stat.icon }}
              </v-icon>
            </v-card-item>
            <v-card-title class="text-h4 font-weight-bold text-primary mb-2 pa-0">
              {{ stat.value }}
            </v-card-title>
            <v-card-subtitle class="text-body-1 text-medium-emphasis pa-0 pb-6">
              {{ stat.title }}
            </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-container>    <!-- Funcionalidades -->
    <section class="py-12 bg-grey-lighten-4">
      <v-container>
        <v-card-item class="text-center mb-12 pa-0">
          <v-card-title class="text-h4 font-weight-bold mb-4 pa-0">
            Explore a História
          </v-card-title>
          <v-card-subtitle class="text-h6 font-weight-light text-medium-emphasis pa-0">
            Ferramentas para descobrir e documentar sua genealogia
          </v-card-subtitle>
        </v-card-item>

        <v-row>
          <v-col 
            v-for="feature in funcionalidades" 
            :key="feature.title"
            cols="12" 
            md="4"
          >
            <v-card 
              class="h-100 hover-lift"
              elevation="2"
              rounded="lg"
              hover
              variant="elevated"
              color="white"
            >
              <v-card-item class="text-center pa-6">
                <v-avatar 
                  :color="feature.color" 
                  size="64" 
                  class="mb-4 elevation-4"
                >
                  <v-icon color="white" size="32">
                    {{ feature.icon }}
                  </v-icon>
                </v-avatar>
              </v-card-item>
              
              <v-card-title class="text-h6 font-weight-bold mb-3 text-center">
                {{ feature.title }}
              </v-card-title>
              
              <v-card-text class="text-body-2 text-medium-emphasis mb-4 text-center">
                {{ feature.description }}
              </v-card-text>
              
              <v-card-actions class="justify-center pb-6">
                <v-btn 
                  :color="feature.color"
                  variant="outlined"
                  :to="feature.link"
                  class="font-weight-medium"
                >
                  {{ feature.action }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// SEO Meta
useSeoMeta({
  title: 'Genealogia de Araripina - Descubra suas Raízes',
  description: 'Explore a história familiar do sertão pernambucano. Sistema público de genealogia da cidade de Araripina.',
  ogTitle: 'Genealogia de Araripina',
  ogDescription: 'Descubra suas raízes e explore a rica história familiar do sertão pernambucano',
  ogType: 'website'
})

// Interfaces
interface Estatistica {
  title: string
  value: string
  icon: string
  color: string
}

interface Funcionalidade {
  title: string
  description: string
  icon: string
  color: string
  action: string
  link: string
}

// Reactive state
const searchTerm = ref('')

// Data
const estatisticas: Estatistica[] = [
  {
    title: 'Pessoas Registradas',
    value: '2.847',
    icon: 'mdi-account-group',
    color: 'primary'
  },
  {
    title: 'Famílias Documentadas',
    value: '892',
    icon: 'mdi-home-group',
    color: 'secondary'
  },
  {
    title: 'Registros Históricos',
    value: '1.203',
    icon: 'mdi-file-document',
    color: 'success'
  },
  {
    title: 'Anos de História',
    value: '150+',
    icon: 'mdi-calendar-clock',
    color: 'info'
  }
]

const funcionalidades: Funcionalidade[] = [
  {
    title: 'Buscar Pessoas',
    description: 'Encontre indivíduos por nome, sobrenome ou apelido na base de dados genealógica.',
    icon: 'mdi-account-search',
    color: 'primary',
    action: 'Pesquisar',
    link: '/pessoas'
  },
  {
    title: 'Árvore Genealógica',
    description: 'Visualize conexões familiares em uma árvore interativa e navegável.',
    icon: 'mdi-family-tree',
    color: 'secondary',
    action: 'Explorar',
    link: '/arvore'
  },
  {
    title: 'História Local',
    description: 'Conheça mais sobre Araripina e suas famílias tradicionais.',
    icon: 'mdi-book-open-page-variant',
    color: 'success',
    action: 'Ler Mais',
    link: '/sobre'
  }
]

// Methods
const executarBusca = (): void => {
  if (searchTerm.value.trim()) {
    navigateTo(`/pessoas?q=${encodeURIComponent(searchTerm.value.trim())}`)
  }
}
</script>