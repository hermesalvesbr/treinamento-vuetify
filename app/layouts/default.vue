<template>
  <v-app>
    <!-- Header Moderno -->
    <v-app-bar 
      color="white" 
      elevation="3"
      :height="64"
      class="border-b-thin"
      app
    >
      <v-container class="d-flex align-center py-0">
        <!-- Mobile menu button -->
        <v-app-bar-nav-icon 
          variant="text" 
          @click="toggleDrawer"
          class="d-lg-none mr-2"
          aria-label="Abrir menu de navegação"
        />

        <!-- Logo -->
        <v-card-item class="d-flex align-center pa-0 flex-grow-0">
          <v-icon class="mr-2 text-primary" aria-hidden="true">mdi-family-tree</v-icon>
          <span class="text-primary text-h6 font-weight-medium">Genealogia Araripina</span>
        </v-card-item>

        <!-- Spacer -->
        <v-spacer />

        <!-- Menu desktop -->
        <nav class="d-none d-lg-flex align-center" role="navigation" aria-label="Menu principal">
          <v-btn 
            v-for="item in navigationItems" 
            :key="item.value"
            :to="item.to"
            variant="text"
            class="mx-1"
            :aria-label="`Ir para ${item.title}`"
          >
            <v-icon class="mr-1" aria-hidden="true">{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
        </nav>

        <!-- Ações do usuário -->
        <v-btn 
          icon="mdi-magnify" 
          variant="text"
          class="ml-2"
          @click="openSearch"
          aria-label="Buscar pessoas"
        />
      </v-container>
    </v-app-bar>

    <!-- Navigation Drawer Mobile -->
    <v-navigation-drawer 
      v-model="drawer" 
      :location="$vuetify.display.mobile ? 'bottom' : 'start'"
      temporary
      class="elevation-3"
      role="navigation"
      aria-label="Menu de navegação móvel"
    >
      <v-card-item class="pa-4 border-b">
        <v-card-title class="d-flex align-center pa-0">
          <v-icon class="mr-2 text-primary" aria-hidden="true">mdi-family-tree</v-icon>
          <span class="text-h6 font-weight-medium">Menu</span>
        </v-card-title>
      </v-card-item>

      <v-list nav role="list">
        <v-list-item
          v-for="item in navigationItems"
          :key="item.value"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          rounded="xl"
          class="ma-2"
          role="listitem"
        />
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main class="bg-grey-lighten-5">
      <slot />
    </v-main>

    <!-- Footer Elegante -->
    <v-footer 
      color="grey-lighten-5" 
      class="border-t-thin"
      elevation="8"
      role="contentinfo"
    >
      <v-container class="pa-6">
        <v-row align="center">
          <v-col cols="12" md="6">
            <v-card-item class="d-flex align-center pa-0">
              <v-icon class="mr-2 text-primary" aria-hidden="true">mdi-family-tree</v-icon>
              <v-card-title class="text-body-2 font-weight-medium pa-0">
                Genealogia Araripina
              </v-card-title>
            </v-card-item>
            <v-card-subtitle class="text-caption text-medium-emphasis mt-1 mb-0 pa-0">
              Preservando a história familiar do sertão pernambucano
            </v-card-subtitle>
          </v-col>
          
          <v-col cols="12" md="6" class="text-md-end">
            <v-card-subtitle class="text-caption text-medium-emphasis mb-0 pa-0">
              &copy; {{ currentYear }} Cidade de Araripina
            </v-card-subtitle>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const drawer = ref(false)

// Navigation items
const navigationItems = [
  {
    title: 'Início',
    value: 'home',
    to: '/',
    icon: 'mdi-home'
  },
  {
    title: 'Pessoas',
    value: 'pessoas',
    to: '/pessoas',
    icon: 'mdi-account-group'
  },
  {
    title: 'Famílias',
    value: 'familias',
    to: '/familias',
    icon: 'mdi-family-tree'
  },
  {
    title: 'Sobre',
    value: 'sobre',
    to: '/sobre',
    icon: 'mdi-information'
  }
]

// Computed properties
const currentYear = computed(() => new Date().getFullYear())

// Methods
const toggleDrawer = (): void => {
  drawer.value = !drawer.value
}

const openSearch = (): void => {
  // TODO: Implementar modal de busca
  navigateTo('/pessoas')
}
</script>
