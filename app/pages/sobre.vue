<template>
  <v-main class="pa-0">
    <!-- Header da Página -->
    <v-banner class="bg-blue-darken-3 text-white" lines="two">
      <v-container>
        <v-row align="center" class="py-16">
          <v-col cols="12" md="8" class="mx-auto text-center">
            <v-card-title class="text-h3 font-weight-bold mb-4 pa-0 text-white">
              Sobre o Projeto
            </v-card-title>
            <v-card-subtitle class="text-h6 font-weight-light pa-0 text-blue-lighten-4">
              Preservando a memória e história familiar de Araripina
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-banner>

    <!-- Conteúdo Principal -->
    <v-container class="py-12">
      <v-row>
        <v-col cols="12" md="8" class="mx-auto">
          <!-- Missão -->
          <v-card class="mb-8" elevation="2" rounded="lg">
            <v-card-item>
              <v-card-title class="d-flex align-center mb-4 pa-0">
                <v-icon color="primary" size="32" class="mr-3">
                  mdi-target
                </v-icon>
                Nossa Missão
              </v-card-title>
            </v-card-item>
            <v-card-text>
              Este projeto foi desenvolvido para catalogar e preservar a árvore genealógica 
              da cidade de Araripina. É um sistema público onde usuários podem pesquisar 
              indivíduos e famílias, descobrindo relações de parentesco e explorando a 
              rica história familiar do sertão pernambucano.
            </v-card-text>
          </v-card>

          <!-- Tecnologia -->
          <v-card class="mb-8 hover-lift" elevation="2" rounded="lg" variant="elevated">
            <v-card-item>
              <v-card-title class="d-flex align-center mb-4 pa-0 text-primary">
                <v-icon color="secondary" size="32" class="mr-3">
                  mdi-cog
                </v-icon>
                Tecnologia
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <p class="text-body-1 text-medium-emphasis mb-4">
                O frontend é construído com tecnologias modernas, utilizando HTML semântico 
                e seguindo boas práticas de acessibilidade e performance.
              </p>
              
              <v-row>
                <v-col cols="12" sm="6">
                  <v-list class="bg-transparent">
                    <v-list-subheader class="text-primary font-weight-medium">
                      Frontend
                    </v-list-subheader>
                    <v-list-item
                      v-for="tech in frontendTech"
                      :key="tech.name"
                      class="px-0"
                    >
                      <template #prepend>
                        <v-icon :color="tech.color" class="mr-2">
                          {{ tech.icon }}
                        </v-icon>
                      </template>
                      <v-list-item-title>{{ tech.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ tech.description }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
                
                <v-col cols="12" sm="6">
                  <v-list class="bg-transparent">
                    <v-list-subheader class="text-secondary font-weight-medium">
                      Infraestrutura
                    </v-list-subheader>
                    <v-list-item
                      v-for="infra in infraTech"
                      :key="infra.name"
                      class="px-0"
                    >
                      <template #prepend>
                        <v-icon :color="infra.color" class="mr-2">
                          {{ infra.icon }}
                        </v-icon>
                      </template>
                      <v-list-item-title>{{ infra.name }}</v-list-item-title>
                      <v-list-item-subtitle>{{ infra.description }}</v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- História de Araripina -->
          <v-card class="mb-8 hover-lift" elevation="2" rounded="lg" variant="elevated">
            <v-card-item>
              <v-card-title class="d-flex align-center mb-4 pa-0 text-primary">
                <v-icon color="success" size="32" class="mr-3">
                  mdi-map-marker
                </v-icon>
                Araripina
              </v-card-title>
            </v-card-item>
            <v-card-text>
              <p class="text-body-1 text-medium-emphasis mb-4">
                Araripina é uma cidade histórica localizada no sertão de Pernambuco, 
                conhecida por sua rica tradição cultural e importância econômica regional.
              </p>
              
              <v-row>
                <v-col 
                  v-for="fact in araripineFacts" 
                  :key="fact.title"
                  cols="12" 
                  sm="6" 
                  md="4"
                >
                  <v-card variant="outlined" class="text-center pa-4 h-100 hover-lift bg-grey-lighten-5">
                    <v-card-item class="pb-2">
                      <v-icon :color="fact.color" size="40" class="mb-2 elevation-2">
                        {{ fact.icon }}
                      </v-icon>
                    </v-card-item>
                    <v-card-title class="text-h6 font-weight-medium mb-1 pa-0 text-primary">
                      {{ fact.title }}
                    </v-card-title>
                    <v-card-subtitle class="text-body-2 text-medium-emphasis pa-0">
                      {{ fact.description }}
                    </v-card-subtitle>
                  </v-card>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- Call to Action -->
          <v-card 
            class="text-center bg-blue-darken-3 text-white elevation-8" 
            rounded="lg"
            variant="elevated"
          >
            <v-card-item class="pa-8">
              <v-card-title class="text-h5 font-weight-bold text-white mb-4 pa-0">
                Comece sua Jornada Genealógica
              </v-card-title>
              <v-card-subtitle class="text-body-1 mb-6 pa-0 text-blue-lighten-4">
                Explore nossa base de dados e descubra as conexões que ligam 
                você à história de Araripina
              </v-card-subtitle>
            </v-card-item>
            <v-card-actions class="justify-center pa-8 pt-0">
              <v-btn 
                color="white" 
                variant="elevated" 
                size="large"
                to="/pessoas"
                class="font-weight-medium text-primary elevation-4"
                prepend-icon="mdi-magnify"
              >
                Buscar Pessoas
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
// SEO Meta
useSeoMeta({
  title: 'Sobre o Projeto - Genealogia de Araripina',
  description: 'Conheça mais sobre o projeto de genealogia de Araripina, sua missão, tecnologia e a história da cidade.',
  ogTitle: 'Sobre - Genealogia de Araripina',
  ogDescription: 'Preservando a memória e história familiar de Araripina através da tecnologia',
  ogType: 'website'
})

// Interfaces
interface Technology {
  name: string
  description: string
  icon: string
  color: string
}

interface AraripineFact {
  title: string
  description: string
  icon: string
  color: string
}

// Data
const frontendTech: Technology[] = [
  {
    name: 'Nuxt 3',
    description: 'Framework Vue.js full-stack',
    icon: 'mdi-nuxt',
    color: 'success'
  },
  {
    name: 'Vuetify 3.8',
    description: 'UI Framework Material Design',
    icon: 'mdi-vuetify',
    color: 'primary'
  },
  {
    name: 'TypeScript',
    description: 'Tipagem estática para JavaScript',
    icon: 'mdi-language-typescript',
    color: 'info'
  },
  {
    name: 'Bun',
    description: 'Runtime JavaScript moderno',
    icon: 'mdi-run-fast',
    color: 'warning'
  }
]

const infraTech: Technology[] = [
  {
    name: 'Directus 11',
    description: 'CMS Headless',
    icon: 'mdi-database',
    color: 'secondary'
  },
  {
    name: 'Cloudflare Pages',
    description: 'Deploy e hospedagem',
    icon: 'mdi-cloud',
    color: 'orange'
  },
  {
    name: 'PostgreSQL',
    description: 'Banco de dados relacional',
    icon: 'mdi-elephant',
    color: 'blue'
  }
]

const araripineFacts: AraripineFact[] = [
  {
    title: 'Sertão Pernambucano',
    description: 'Localizada na região sertaneja',
    icon: 'mdi-cactus',
    color: 'success'
  },
  {
    title: 'Polo do Gesso',
    description: 'Centro de exploração mineral',
    icon: 'mdi-hammer',
    color: 'warning'
  },
  {
    title: 'História Centenária',
    description: 'Mais de 150 anos de registros',
    icon: 'mdi-clock-time-four',
    color: 'info'
  },
  {
    title: 'Tradição Cultural',
    description: 'Rica herança nordestina',
    icon: 'mdi-music',
    color: 'error'
  },
  {
    title: 'Famílias Tradicionais',
    description: 'Linhagens centenárias',
    icon: 'mdi-account-group',
    color: 'primary'
  },
  {
    title: 'Migração Histórica',
    description: 'Movimentos populacionais',
    icon: 'mdi-account-arrow-right',
    color: 'secondary'
  }
]
</script>