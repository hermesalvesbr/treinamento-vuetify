<template>
  <v-app>
    <!-- Cabeçalho -->

    <v-app-bar color="primary" dark>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title>Árvore Genealógica - Araripina</v-toolbar-title>

        <template v-if="$vuetify.display.mdAndUp">
          <v-btn icon="mdi-magnify" variant="text"></v-btn>

          <v-btn icon="mdi-filter" variant="text"></v-btn>
        </template>

        <v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer"
        :location="$vuetify.display.mobile ? 'bottom' : undefined"
        temporary>        
        <v-list>
          <v-list-item><NuxtLink to="/" class="me-3" style="text-decoration:none; color: inherit;">Início</NuxtLink></v-list-item>
          <v-list-item><NuxtLink to="/sobre" class="me-3" style="text-decoration:none; color: inherit;">Sobre</NuxtLink></v-list-item>
          <v-list-item><NuxtLink to="/pessoas" class="me-3" style="text-decoration:none; color: inherit;">Pessoas</NuxtLink></v-list-item>
          <v-list-item><NuxtLink to="/familias" class="me-3" style="text-decoration:none; color: inherit;">Famílias</NuxtLink></v-list-item>
        </v-list>
      </v-navigation-drawer>
      

    <!-- Conteúdo principal -->
    <v-main class="pt-20 pl-10">
      <NuxtPage /> <!-- Aqui as páginas serão injetadas -->
    </v-main>

    <!-- Rodapé -->
    <v-footer class="pa-4">
      <span>&copy; 2025 Cidade de Araripina</span>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(false)
</script>
